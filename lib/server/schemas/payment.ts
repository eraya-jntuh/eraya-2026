import { z } from 'zod'

/**
 * Schema for creating a payment order
 * All amounts are server-calculated, client only provides registration reference
 */
export const createOrderSchema = z.object({
  registrationId: z.string().uuid('Invalid registration ID'),
  idempotencyKey: z.string().min(1, 'Idempotency key is required'),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>

/**
 * Payment status enum
 */
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'

