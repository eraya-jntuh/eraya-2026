import { Redis } from '@upstash/redis'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getRequestIp } from './request'
import { createServerClient } from '@/lib/supabase/server'

// Lazy initialization of Upstash Redis client
let redis: Redis | null = null

function getRedisClient(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  }
  
  return redis
}

export type RateLimitConfig = {
  requests: number // Number of requests allowed
  window: number // Time window in seconds
  identifier?: (req: NextRequest) => Promise<string> | string // Custom identifier function
  useUserId?: boolean // If true, also rate limit by authenticated user ID
}

/**
 * Get rate limit identifier - combines IP and optionally user ID
 */
async function getRateLimitIdentifier(
  req: NextRequest,
  config: RateLimitConfig
): Promise<string> {
  if (config.identifier) {
    return await config.identifier(req)
  }

  const ip = getRequestIp(req) || 'unknown'
  
  // If useUserId is enabled, try to get user ID from session
  if (config.useUserId) {
    try {
      const supabase = await createServerClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        return `user:${user.id}:${ip}`
      }
    } catch {
      // If auth fails, fall back to IP only
    }
  }
  
  return ip
}

/**
 * Rate limiting middleware using Upstash Redis (distributed, safe for multi-instance)
 * Uses sliding window algorithm with sorted sets for accurate rate limiting
 * 
 * @param config - Rate limit configuration
 * @returns Middleware function that checks rate limits and returns 429 if exceeded
 */
export function withRateLimit(config: RateLimitConfig) {
  return async (req: NextRequest, handler: () => Promise<Response>): Promise<Response> => {
    // Skip rate limiting if Redis is not configured (development fallback)
    const redisClient = getRedisClient()
    if (!redisClient) {
      console.warn('Rate limiting disabled: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set')
      return handler()
    }

    try {
      // Get identifier (IP address by default, or custom function, optionally with user ID)
      const identifier = await getRateLimitIdentifier(req, config)

      const key = `rate_limit:${identifier}`
      const now = Date.now()
      const windowStart = now - config.window * 1000

      // Use Redis pipeline for atomic operations (sliding window algorithm)
      const pipeline = redisClient.pipeline()
      
      // Remove old entries outside the window
      pipeline.zremrangebyscore(key, 0, windowStart)
      
      // Count current requests in window (before adding new request)
      pipeline.zcard(key)
      
      // Add current request with unique member to prevent collisions
      const requestId = `${now}-${Math.random().toString(36).substring(7)}`
      pipeline.zadd(key, { score: now, member: requestId })
      
      // Set expiry on the key (cleanup after window expires)
      pipeline.expire(key, config.window)
      
      // Execute pipeline atomically
      const results = await pipeline.exec()
      const currentCount = (results[1] as number) || 0
      const newCount = currentCount + 1 // Count after adding this request

      // Check if limit exceeded (check after adding to prevent race conditions)
      if (newCount > config.requests) {
        // Remove the request we just added since it exceeded the limit
        await redisClient.zrem(key, requestId)
        
        // Calculate time until next request is allowed
        const oldestRequest = await redisClient.zrange(key, 0, 0, { withScores: true })
        const resetTime = oldestRequest.length > 0 
          ? Math.ceil((oldestRequest[0] as any).score / 1000) + config.window
          : Math.floor(now / 1000) + config.window

        return NextResponse.json(
          {
            error: 'Too many requests. Please try again later.',
            retryAfter: config.window,
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(config.window),
              'X-RateLimit-Limit': String(config.requests),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': String(resetTime),
            },
          }
        )
      }

      // Request allowed, proceed with handler
      const response = await handler()
      
      // Add rate limit headers to successful responses
      const remaining = Math.max(0, config.requests - newCount)
      const resetTime = Math.floor(now / 1000) + config.window
      
      response.headers.set('X-RateLimit-Limit', String(config.requests))
      response.headers.set('X-RateLimit-Remaining', String(remaining))
      response.headers.set('X-RateLimit-Reset', String(resetTime))
      
      return response
    } catch (error) {
      // If Redis fails, log error but allow request (fail open for availability)
      console.error('Rate limiting error:', error)
      return handler()
    }
  }
}

/**
 * Pre-configured rate limiters for different endpoint types
 * Optimized for 8k-10k concurrent users with burst protection
 */
export const rateLimiters = {
  // Public endpoints: 10 requests per minute per IP
  public: withRateLimit({
    requests: 10,
    window: 60, // 1 minute
  }),

  // Contact form: 5 requests per minute per IP (stricter to prevent spam)
  contact: withRateLimit({
    requests: 5,
    window: 60, // 1 minute
  }),

  // Admin endpoints: 30 requests per minute per user (uses user ID + IP)
  // Higher limit for authenticated admin users
  admin: withRateLimit({
    requests: 30,
    window: 60, // 1 minute
    useUserId: true, // Rate limit by user ID + IP for better security
  }),

  // Registration endpoint: 3 requests per minute per IP (very strict to prevent abuse)
  // Critical endpoint - strictest limits to prevent duplicate registrations
  registration: withRateLimit({
    requests: 3,
    window: 60, // 1 minute
  }),
}

