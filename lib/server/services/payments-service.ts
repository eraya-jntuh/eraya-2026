import Razorpay from 'razorpay'
import crypto from 'crypto'
import { getRegistrationById } from '@/lib/server/repos/registrations-repo'
import { getEventByName } from '@/lib/server/repos/events-repo'
import {
  createPayment,
  getPaymentByOrderId,
  updatePaymentStatus,
  updateRegistrationPaymentStatus,
} from '@/lib/server/repos/payments-repo'
import { getIdempotencyRecord, storeIdempotencyRecord, hashRequest } from '@/lib/server/repos/idempotency-repo'
import type { PaymentStatus } from '@/lib/server/schemas/payment'

// Initialize Razorpay instance
function getRazorpayInstance(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured')
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

/**
 * Create a Razorpay order for a registration
 * All amounts are server-calculated from events table
 */
export async function createPaymentOrder(input: {
  registrationId: string
  idempotencyKey: string
}) {
  // Step 1: Check idempotency
  const idempotencyRecord = await getIdempotencyRecord(input.idempotencyKey)
  if (idempotencyRecord.data) {
    try {
      const cachedBody = JSON.parse(idempotencyRecord.data.response_body)
      return {
        success: true,
        cached: true,
        data: cachedBody,
      }
    } catch {
      // If parsing fails, continue with new request
    }
  }

  // Step 2: Get registration
  const { data: registration, error: regError } = await getRegistrationById(input.registrationId)
  if (regError || !registration) {
    return {
      success: false,
      error: 'Registration not found',
    }
  }

  // Step 3: Get event and calculate amount server-side
  const { data: event, error: eventError } = await getEventByName(registration.event_name)
  if (eventError || !event) {
    return {
      success: false,
      error: 'Event not found or inactive',
    }
  }

  // Step 4: Convert amount to paise (Razorpay uses smallest currency unit)
  const amountInRupees = parseFloat(event.entry_fee.toString())
  const amountInPaise = Math.round(amountInRupees * 100)

  // Step 5: Create Razorpay order
  try {
    const razorpay = getRazorpayInstance()
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `reg_${input.registrationId.substring(0, 8)}`,
      notes: {
        registration_id: input.registrationId,
        event_name: registration.event_name,
        email: registration.email,
      },
    })

    // Step 6: Store payment record
    const { error: paymentError } = await createPayment({
      registrationId: input.registrationId,
      razorpayOrderId: order.id,
      amount: amountInRupees,
      currency: 'INR',
    })

    if (paymentError) {
      return {
        success: false,
        error: 'Failed to create payment record',
      }
    }

    // Step 7: Store idempotency record
    const responseData = {
      orderId: order.id,
      amount: amountInRupees,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    }
    const responseBody = JSON.stringify(responseData)
    await storeIdempotencyRecord(
      input.idempotencyKey,
      hashRequest(input),
      201,
      responseBody,
      3600 // 1 hour TTL for payment orders
    )

    return {
      success: true,
      data: responseData,
    }
  } catch (error: any) {
    console.error('Razorpay order creation error:', error)
    return {
      success: false,
      error: error?.error?.description || 'Failed to create payment order',
    }
  }
}

/**
 * Verify Razorpay webhook signature
 * Razorpay signs the raw request body with HMAC SHA256
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET
  if (!keySecret) {
    return false
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(rawBody)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

/**
 * Process payment webhook event
 */
export async function processPaymentWebhook(event: {
  event: string
  payload: {
    order: {
      entity: {
        id: string
        amount: number
        amount_paid: number
        status: string
      }
    }
    payment: {
      entity: {
        id: string
        order_id: string
        status: string
        method: string
      }
    }
  }
}) {
  // Only process payment.captured and payment.failed events
  if (event.event !== 'payment.captured' && event.event !== 'payment.failed') {
    return {
      success: false,
      error: 'Unsupported event type',
    }
  }

  const orderId = event.payload.payment.entity.order_id
  const paymentId = event.payload.payment.entity.id
  const paymentStatus = event.payload.payment.entity.status
  const paymentMethod = event.payload.payment.entity.method

  // Get payment record
  const { data: payment, error: paymentError } = await getPaymentByOrderId(orderId)
  if (paymentError || !payment) {
    return {
      success: false,
      error: 'Payment record not found',
    }
  }

  // Verify payment is not already processed
  if (payment.status === 'PAID' || payment.status === 'FAILED') {
    return {
      success: true,
      message: 'Payment already processed',
      data: payment,
    }
  }

  // Determine status
  let status: PaymentStatus = 'PENDING'
  if (event.event === 'payment.captured' && paymentStatus === 'captured') {
    status = 'PAID'
  } else if (event.event === 'payment.failed' || paymentStatus === 'failed') {
    status = 'FAILED'
  }

  // Update payment status
  const { error: updateError } = await updatePaymentStatus(orderId, status, {
    razorpayPaymentId: paymentId,
    paymentMethod,
  })

  if (updateError) {
    return {
      success: false,
      error: 'Failed to update payment status',
    }
  }

  // Update registration payment status
  const { error: regUpdateError } = await updateRegistrationPaymentStatus(
    payment.registration_id,
    status
  )

  if (regUpdateError) {
    console.error('Failed to update registration payment status:', regUpdateError)
    // Don't fail the webhook, payment is already updated
  }

  return {
    success: true,
    data: {
      paymentId,
      orderId,
      status,
    },
  }
}

