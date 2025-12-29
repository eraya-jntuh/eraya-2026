# Phase 5 — Razorpay Payments Implementation

## ✅ Implementation Complete

### Overview

Phase 5 implements secure, production-ready Razorpay payment integration following strict security principles:
- **Never trust frontend values** - All amounts server-calculated
- **Webhook-based verification** - Payments confirmed only via webhooks
- **Idempotency enforced** - Duplicate payments impossible
- **Clean architecture** - Follows route → controller → service → repo pattern

## 🔒 Security Principles

### 1. Server-Side Trust Only
- ✅ All payment amounts calculated from `events` table
- ✅ Client never sends amount or payment status
- ✅ Registration marked as paid **only** via webhook

### 2. Webhook Verification
- ✅ Razorpay webhook signatures verified using HMAC SHA256
- ✅ Raw request body used for signature verification
- ✅ Invalid signatures rejected with 401

### 3. Idempotency
- ✅ Payment orders use idempotency keys
- ✅ Duplicate requests return cached response
- ✅ Prevents duplicate Razorpay orders

### 4. Database Integrity
- ✅ Payment records linked to registrations via foreign key
- ✅ Payment status tracked in both `payments` and `event_registrations`
- ✅ RLS policies enforce access control

## 📊 Database Schema

### Payments Table

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  registration_id UUID REFERENCES event_registrations(id),
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10, 2),  -- Server-calculated
  currency TEXT DEFAULT 'INR',
  status TEXT CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'CANCELLED')),
  payment_method TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ
);
```

### Event Registrations (Updated)

Added `payment_status` column:
- `PENDING` - Payment not yet initiated
- `PAID` - Payment confirmed via webhook
- `FAILED` - Payment failed
- `CANCELLED` - Payment cancelled

## 🔄 Payment Flow

### Step 1: Create Order

**Endpoint:** `POST /api/payments/create-order`

**Request:**
```json
{
  "registrationId": "uuid-of-registration",
  "idempotencyKey": "unique-key-per-attempt"
}
```

**Server Process:**
1. ✅ Validate idempotency key (return cached if exists)
2. ✅ Fetch registration from database
3. ✅ Fetch event and calculate amount server-side
4. ✅ Create Razorpay order with server-calculated amount
5. ✅ Store payment record with status `PENDING`
6. ✅ Store idempotency record
7. ✅ Return order details to client

**Response:**
```json
{
  "orderId": "order_abc123",
  "amount": 50.00,
  "currency": "INR",
  "keyId": "rzp_test_..."
}
```

**Rate Limiting:** 3 requests/minute (same as registration)

### Step 2: Payment Completion (Webhook Only)

**Endpoint:** `POST /api/payments/webhook`

**Razorpay Webhook Events:**
- `payment.captured` - Payment successful
- `payment.failed` - Payment failed

**Server Process:**
1. ✅ Verify webhook signature (HMAC SHA256)
2. ✅ Parse webhook payload
3. ✅ Find payment record by `razorpay_order_id`
4. ✅ Verify payment not already processed
5. ✅ Update payment status (`PAID` or `FAILED`)
6. ✅ Update registration `payment_status`
7. ✅ Store payment details (payment_id, signature, method)

**Security:**
- ✅ Signature verification required
- ✅ No rate limiting (webhook called by Razorpay)
- ✅ Idempotent processing (duplicate webhooks ignored)

## 📁 Files Created

### Database
- `migrations/004_create_payments_table.sql` - Payments table and indexes

### Schemas
- `lib/server/schemas/payment.ts` - Payment request schemas

### Repositories
- `lib/server/repos/payments-repo.ts` - Payment data access layer

### Services
- `lib/server/services/payments-service.ts` - Payment business logic
  - `createPaymentOrder()` - Create Razorpay order
  - `verifyWebhookSignature()` - Verify webhook signature
  - `processPaymentWebhook()` - Process webhook events

### Controllers
- `lib/server/controllers/payments-controller.ts` - Payment API handlers

### API Routes
- `app/api/payments/create-order/route.ts` - Order creation endpoint
- `app/api/payments/webhook/route.ts` - Webhook endpoint

### Tests
- `lib/server/services/payments-service.test.ts` - Payment flow tests

## 🔧 Configuration

### Environment Variables

Add to `.env.local`:

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_...          # From Razorpay Dashboard > Settings > API Keys
RAZORPAY_KEY_SECRET=...                # Keep secret!
RAZORPAY_WEBHOOK_SECRET=...           # From Razorpay Dashboard > Settings > Webhooks
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...  # Public key (safe to expose)
```

### Razorpay Setup

1. **Create Razorpay Account:**
   - Go to https://razorpay.com/
   - Sign up and complete KYC

2. **Get API Keys:**
   - Dashboard > Settings > API Keys
   - Generate test keys (for development)
   - Copy `Key ID` and `Key Secret`

3. **Configure Webhook:**
   - Dashboard > Settings > Webhooks
   - Add webhook URL: `https://yourdomain.com/api/payments/webhook`
   - Select events: `payment.captured`, `payment.failed`
   - Copy webhook secret

4. **Update Environment:**
   - Add keys to `.env.local`
   - Deploy with environment variables set

## 🧪 Testing

### Manual Testing

#### 1. Test Order Creation

```bash
# Create a registration first (via /api/registrations)
# Then create payment order:

curl -X POST http://localhost:3000/api/payments/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "registrationId": "your-registration-id",
    "idempotencyKey": "test-key-123"
  }'
```

**Expected Response:**
```json
{
  "orderId": "order_abc123",
  "amount": 50.00,
  "currency": "INR",
  "keyId": "rzp_test_..."
}
```

#### 2. Test Idempotency

```bash
# Make same request twice with same idempotencyKey
# Second request should return cached response (200 instead of 201)
```

#### 3. Test Webhook (Local)

Use Razorpay webhook testing tool or ngrok:

```bash
# Install ngrok
ngrok http 3000

# Update Razorpay webhook URL to ngrok URL
# Trigger test payment in Razorpay dashboard
```

### Automated Tests

Run payment service tests:

```typescript
import { runPaymentTests } from '@/lib/server/services/payments-service.test'

const results = await runPaymentTests()
console.log(results)
```

## 🚨 Failure Scenarios

### 1. Registration Not Found
- **Error:** `Registration not found`
- **Status:** 404
- **Action:** Verify registration ID

### 2. Event Not Found/Inactive
- **Error:** `Event not found or inactive`
- **Status:** 500
- **Action:** Check events table

### 3. Invalid Webhook Signature
- **Error:** `Invalid signature`
- **Status:** 401
- **Action:** Verify `RAZORPAY_WEBHOOK_SECRET`

### 4. Duplicate Payment
- **Behavior:** Webhook processed idempotently
- **Result:** Payment status unchanged (already `PAID` or `FAILED`)

### 5. Razorpay API Failure
- **Error:** Razorpay error message
- **Status:** 500
- **Action:** Check Razorpay dashboard for issues

## 📈 Production Checklist

Before going live:

- [ ] Switch to Razorpay live keys (not test keys)
- [ ] Configure production webhook URL
- [ ] Test webhook signature verification
- [ ] Verify idempotency works correctly
- [ ] Monitor payment success/failure rates
- [ ] Set up alerts for webhook failures
- [ ] Test payment flow end-to-end
- [ ] Verify database indexes are created
- [ ] Check RLS policies are active

## 🔍 Monitoring

### Key Metrics

1. **Payment Success Rate:** `PAID / (PAID + FAILED)`
2. **Webhook Processing Time:** Time to process webhook
3. **Failed Webhooks:** Invalid signatures or processing errors
4. **Duplicate Orders:** Idempotency key hits

### Database Queries

```sql
-- Payment success rate
SELECT 
  status,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
FROM payments
GROUP BY status;

-- Recent payments
SELECT * FROM payments
ORDER BY created_at DESC
LIMIT 10;

-- Failed payments
SELECT * FROM payments
WHERE status = 'FAILED'
ORDER BY failed_at DESC;
```

## 🚫 What NOT to Do

❌ **Never trust client payment status**
- Always verify via webhook

❌ **Never use client-provided amounts**
- Always calculate from `events` table

❌ **Never skip signature verification**
- All webhooks must be verified

❌ **Never process payments without idempotency**
- Always use idempotency keys

❌ **Never mark registration as paid from frontend**
- Only webhook can update payment status

## ✅ Verification

All security requirements met:

- ✅ Server-side amount calculation
- ✅ Webhook signature verification
- ✅ Idempotency enforcement
- ✅ Clean architecture followed
- ✅ Database integrity maintained
- ✅ RLS policies active
- ✅ Rate limiting applied (order creation)
- ✅ Comprehensive error handling

## 📝 Next Steps

Phase 5 is complete. The payment system is:

- **Secure** - No client-trusted values
- **Reliable** - Idempotent operations
- **Verified** - Webhook-based confirmation
- **Production-ready** - Follows best practices

**Optional Enhancements (Future):**
- Payment retry mechanism
- Refund handling
- Payment analytics dashboard
- Email notifications on payment success/failure

