import { createServerClient } from '@/lib/supabase/server'
import type { PaymentStatus } from '@/lib/server/schemas/payment'

export interface Payment {
  id: string
  registration_id: string
  razorpay_order_id: string
  razorpay_payment_id: string | null
  razorpay_signature: string | null
  amount: number
  currency: string
  status: PaymentStatus
  payment_method: string | null
  created_at: string
  updated_at: string
  paid_at: string | null
  failed_at: string | null
}

/**
 * Create a payment record with PENDING status
 */
export async function createPayment(input: {
  registrationId: string
  razorpayOrderId: string
  amount: number
  currency?: string
}) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('payments')
    .insert({
      registration_id: input.registrationId,
      razorpay_order_id: input.razorpayOrderId,
      amount: input.amount,
      currency: input.currency || 'INR',
      status: 'PENDING',
    })
    .select()
    .single()

  return { data: data as Payment | null, error }
}

/**
 * Get payment by Razorpay order ID
 */
export async function getPaymentByOrderId(razorpayOrderId: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('razorpay_order_id', razorpayOrderId)
    .single()

  return { data: data as Payment | null, error }
}

/**
 * Get payment by registration ID
 */
export async function getPaymentByRegistrationId(registrationId: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('registration_id', registrationId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return { data: data as Payment | null, error }
}

/**
 * Update payment status (used by webhook)
 */
export async function updatePaymentStatus(
  razorpayOrderId: string,
  status: PaymentStatus,
  paymentData?: {
    razorpayPaymentId?: string
    razorpaySignature?: string
    paymentMethod?: string
  }
) {
  const supabase = await createServerClient()
  
  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (status === 'PAID') {
    updateData.paid_at = new Date().toISOString()
    updateData.razorpay_payment_id = paymentData?.razorpayPaymentId || null
    updateData.razorpay_signature = paymentData?.razorpaySignature || null
    updateData.payment_method = paymentData?.paymentMethod || null
  } else if (status === 'FAILED') {
    updateData.failed_at = new Date().toISOString()
  }

  if (paymentData?.razorpayPaymentId) {
    updateData.razorpay_payment_id = paymentData.razorpayPaymentId
  }
  if (paymentData?.razorpaySignature) {
    updateData.razorpay_signature = paymentData.razorpaySignature
  }
  if (paymentData?.paymentMethod) {
    updateData.payment_method = paymentData.paymentMethod
  }

  const { data, error } = await supabase
    .from('payments')
    .update(updateData)
    .eq('razorpay_order_id', razorpayOrderId)
    .select()
    .single()

  return { data: data as Payment | null, error }
}

/**
 * Update registration payment status
 */
export async function updateRegistrationPaymentStatus(
  registrationId: string,
  status: PaymentStatus
) {
  const supabase = await createServerClient()
  const { error } = await supabase
    .from('event_registrations')
    .update({ payment_status: status })
    .eq('id', registrationId)

  return { error }
}

