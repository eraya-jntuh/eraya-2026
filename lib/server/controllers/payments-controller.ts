import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withErrorHandling } from '@/lib/server/http/handler'
import { createOrderSchema } from '@/lib/server/schemas/payment'
import { createPaymentOrder, processPaymentWebhook, verifyWebhookSignature } from '@/lib/server/services/payments-service'
import { rateLimiters } from '@/lib/server/http/rate-limit'
import { getRequestIp } from '@/lib/server/http/request'

/**
 * POST /api/payments/create-order
 * Create a Razorpay order for a registration
 */
export const createOrder = withErrorHandling(async (req: NextRequest) => {
  return rateLimiters.registration(req, async () => {
    const body = await req.json()
    const parsed = createOrderSchema.parse(body)

    const result = await createPaymentOrder({
      registrationId: parsed.registrationId,
      idempotencyKey: parsed.idempotencyKey,
    })

    // Handle idempotency: return cached response if available
    if (result.cached) {
      return NextResponse.json(result.data, { status: 200 })
    }

    // Handle errors
    if (!result.success) {
      if (result.error?.includes('not found')) {
        return NextResponse.json({ error: result.error }, { status: 404 })
      }
      return NextResponse.json(
        { error: result.error || 'Failed to create payment order' },
        { status: 500 }
      )
    }

    return NextResponse.json(result.data, { status: 201 })
  })
})

/**
 * POST /api/payments/webhook
 * Handle Razorpay webhook events
 * 
 * IMPORTANT: This endpoint should NOT be rate limited as it's called by Razorpay
 * We verify the webhook signature instead for security
 */
export const webhook = withErrorHandling(async (req: NextRequest) => {
  try {
    // Get raw body for signature verification
    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }

    // Verify webhook signature using raw body
    const { verifyWebhookSignature } = await import('@/lib/server/services/payments-service')
    const isValid = verifyWebhookSignature(rawBody, signature)
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse body after verification
    const body = JSON.parse(rawBody)
    const orderId = body?.payload?.payment?.entity?.order_id
    const paymentId = body?.payload?.payment?.entity?.id

    if (!orderId || !paymentId) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
    }

    // Process webhook
    const { processPaymentWebhook } = await import('@/lib/server/services/payments-service')
    const result = await processPaymentWebhook(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to process webhook' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: result.data }, { status: 200 })
  } catch (error: any) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
})

