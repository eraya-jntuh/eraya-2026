/**
 * Rate Limiting Test Utilities
 * 
 * This file contains test helpers for verifying rate limiting behavior.
 * Run these tests to ensure rate limiting works correctly under load.
 */

import type { NextRequest } from 'next/server'

/**
 * Test rate limiting by making multiple requests
 * This is a helper function for integration tests
 */
export async function testRateLimit(
  makeRequest: () => Promise<Response>,
  expectedLimit: number,
  windowSeconds: number = 60
): Promise<{
  success: boolean
  passed: number
  blocked: number
  errors: string[]
}> {
  const results = {
    success: false,
    passed: 0,
    blocked: 0,
    errors: [] as string[],
  }

  // Make requests up to limit + 2 (to verify blocking works)
  const requestsToMake = expectedLimit + 2
  const responses: Response[] = []

  for (let i = 0; i < requestsToMake; i++) {
    try {
      const response = await makeRequest()
      responses.push(response)
      
      if (response.status === 429) {
        results.blocked++
        
        // Verify rate limit headers
        const limit = response.headers.get('X-RateLimit-Limit')
        const remaining = response.headers.get('X-RateLimit-Remaining')
        const reset = response.headers.get('X-RateLimit-Reset')
        
        if (!limit || !remaining || !reset) {
          results.errors.push(`Missing rate limit headers on request ${i + 1}`)
        }
      } else if (response.ok) {
        results.passed++
      }
    } catch (error) {
      results.errors.push(`Request ${i + 1} failed: ${error}`)
    }
  }

  // Verify expected behavior
  if (results.passed > expectedLimit) {
    results.errors.push(
      `Expected at most ${expectedLimit} requests to pass, but ${results.passed} passed`
    )
  }

  if (results.blocked === 0 && requestsToMake > expectedLimit) {
    results.errors.push('No requests were blocked despite exceeding limit')
  }

  results.success = results.errors.length === 0
  return results
}

/**
 * Create a mock NextRequest for testing
 */
export function createMockRequest(
  ip: string = '127.0.0.1',
  headers: Record<string, string> = {}
): NextRequest {
  const url = 'http://localhost:3000/api/test'
  const requestHeaders = new Headers({
    'x-forwarded-for': ip,
    ...headers,
  })

  return new NextRequest(url, {
    method: 'GET',
    headers: requestHeaders,
  })
}

