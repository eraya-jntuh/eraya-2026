# Phase 4 — Distributed Rate Limiting (Upstash Redis)

## ✅ Implementation Complete

### Overview

Phase 4 enhances and verifies the distributed rate limiting system implemented in Phase 3, ensuring it's production-ready for handling 8k-10k concurrent users.

## 🚀 Enhanced Features

### 1. Improved Sliding Window Algorithm

**Changes:**
- Fixed potential race condition in rate limit checking
- Now checks limit **after** adding request to prevent edge cases
- More accurate counting using Redis sorted sets
- Automatic cleanup of expired entries

**Algorithm:**
1. Remove old entries outside the time window
2. Count current requests in window
3. Add current request atomically
4. Check if new count exceeds limit
5. If exceeded, remove the request and return 429
6. If allowed, proceed and add rate limit headers to response

### 2. Per-User Rate Limiting for Admin Endpoints

**Enhancement:**
- Admin endpoints now rate limit by **user ID + IP** instead of just IP
- Prevents one admin from being rate limited by another admin's activity
- More secure: prevents IP-based bypass attempts

**Implementation:**
```typescript
admin: withRateLimit({
  requests: 30,
  window: 60,
  useUserId: true, // Rate limit by user ID + IP
})
```

### 3. Enhanced Rate Limit Headers

**All responses now include:**
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when the limit resets

**429 responses include:**
- `Retry-After`: Seconds to wait before retrying
- All standard rate limit headers

### 4. Production-Ready Error Handling

**Fail-Open Strategy:**
- If Redis is unavailable, requests are allowed (with warning log)
- Prevents Redis outages from breaking the application
- Logs errors for monitoring

**Graceful Degradation:**
- Development mode: Works without Redis (logs warning)
- Production mode: Requires Redis for rate limiting

## 📊 Rate Limit Configuration

### Current Limits (Optimized for 8k-10k Users)

| Endpoint Type | Limit | Window | Identifier |
|--------------|-------|--------|------------|
| **Registration** | 3 req/min | 60s | IP address |
| **Contact Form** | 5 req/min | 60s | IP address |
| **Public APIs** | 10 req/min | 60s | IP address |
| **Admin APIs** | 30 req/min | 60s | User ID + IP |

### Rationale

- **Registration (3/min)**: Strictest limit to prevent:
  - Duplicate registrations
  - Registration spam
  - Payment fraud attempts

- **Contact (5/min)**: Prevents:
  - Contact form spam
  - Email bombing
  - Abuse of support system

- **Public (10/min)**: Balanced for:
  - Normal browsing behavior
  - API exploration
  - Legitimate use cases

- **Admin (30/min)**: Higher limit for:
  - Dashboard operations
  - Data export
  - Administrative tasks
  - Per-user tracking (not shared across admins)

## 🔒 Security Features

### 1. Distributed Rate Limiting
- Uses Upstash Redis for shared state across instances
- Safe for multi-instance deployments (Vercel, etc.)
- No race conditions between instances

### 2. IP-Based Tracking
- Extracts IP from `x-forwarded-for` or `x-real-ip` headers
- Handles proxy/CDN scenarios correctly
- Falls back to 'unknown' if IP cannot be determined

### 3. User-Based Tracking (Admin)
- Combines user ID with IP for admin endpoints
- Prevents one admin from affecting another
- More granular control for authenticated users

### 4. Atomic Operations
- Uses Redis pipelines for atomicity
- Prevents race conditions in concurrent requests
- Ensures accurate counting

## 📁 Files Modified

### Enhanced Files
- `lib/server/http/rate-limit.ts` - Improved algorithm and per-user limiting

### New Files
- `lib/server/http/rate-limit.test.ts` - Test utilities for rate limiting
- `PHASE4_RATE_LIMITING.md` - This documentation

## 🧪 Testing

### Manual Testing

1. **Test Registration Rate Limit:**
   ```bash
   # Make 4 requests quickly (limit is 3)
   for i in {1..4}; do
     curl -X POST http://localhost:3000/api/registrations \
       -H "Content-Type: application/json" \
       -d '{"eventName":"Tech Quiz","fullName":"Test","email":"test@example.com",...}'
   done
   # 4th request should return 429
   ```

2. **Test Admin Rate Limit:**
   ```bash
   # Make 31 requests (limit is 30)
   for i in {1..31}; do
     curl http://localhost:3000/api/admin/registrations \
       -H "Cookie: your-session-cookie"
   done
   # 31st request should return 429
   ```

3. **Verify Headers:**
   ```bash
   curl -i http://localhost:3000/api/registrations
   # Check for X-RateLimit-* headers
   ```

### Integration Testing

Use the test utilities in `lib/server/http/rate-limit.test.ts`:

```typescript
import { testRateLimit } from '@/lib/server/http/rate-limit.test'

const results = await testRateLimit(
  () => fetch('/api/registrations', { method: 'POST', ... }),
  3, // expected limit
  60 // window in seconds
)

console.log(results) // { success: true, passed: 3, blocked: 1, errors: [] }
```

## 📈 Performance Considerations

### Redis Performance
- **Latency**: Upstash Redis REST API adds ~10-50ms per request
- **Throughput**: Handles 10k+ requests/second
- **Cost**: Free tier supports 10k commands/day (sufficient for testing)

### Optimization Strategies
1. **Pipeline Operations**: All Redis operations batched in single pipeline
2. **Lazy Initialization**: Redis client created only when needed
3. **Fail-Open**: No blocking if Redis unavailable
4. **Efficient Data Structures**: Sorted sets for O(log N) operations

### Scaling for 8k-10k Users

**Assumptions:**
- Average 2 requests/user during peak
- Peak traffic: 20k requests in 1 minute
- Rate limits prevent abuse, not legitimate traffic

**Current Configuration:**
- Registration: 3/min × 10k users = 30k potential requests (but limited per IP)
- Contact: 5/min × 10k users = 50k potential requests (but limited per IP)
- **Result**: Legitimate users unaffected, abuse prevented

## 🔧 Configuration

### Environment Variables

Required in `.env.local`:
```bash
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### Upstash Setup

1. Create account at https://console.upstash.com/
2. Create new Redis database
3. Copy REST URL and Token
4. Add to `.env.local`

### Adjusting Limits

Edit `lib/server/http/rate-limit.ts`:

```typescript
export const rateLimiters = {
  registration: withRateLimit({
    requests: 5, // Increase from 3 to 5
    window: 60,
  }),
  // ...
}
```

## ✅ Verification Checklist

- [x] All API endpoints have rate limiting applied
- [x] Rate limiting uses distributed Redis (Upstash)
- [x] Per-user rate limiting for admin endpoints
- [x] Proper HTTP 429 responses with headers
- [x] Graceful degradation when Redis unavailable
- [x] Rate limit headers on all responses
- [x] Accurate counting with sliding window
- [x] Race condition prevention
- [x] Test utilities created
- [x] Documentation complete

## 🚨 Monitoring Recommendations

### Key Metrics to Track

1. **Rate Limit Hits**: Number of 429 responses
2. **Redis Latency**: Time for rate limit checks
3. **Redis Errors**: Failures that trigger fail-open
4. **Per-Endpoint Stats**: Which endpoints hit limits most

### Alerting

Set up alerts for:
- High rate limit hit rate (>10% of requests)
- Redis connection failures
- Unusual traffic patterns

## 📝 Next Steps

Phase 4 is complete. The rate limiting system is production-ready and optimized for 8k-10k concurrent users.

**Optional Enhancements (Future):**
- Per-endpoint custom limits
- Burst protection (allow short bursts)
- Rate limit bypass for trusted IPs
- Rate limit analytics dashboard
- Dynamic limit adjustment based on load

