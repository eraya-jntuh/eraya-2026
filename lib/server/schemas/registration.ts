import { z } from 'zod'

export const registrationSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  // entryFee removed - now fetched server-side from events table
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required'),
  college: z.string().min(1, 'College is required'),
  year: z.string().min(1, 'Year is required'),
  branch: z.string().min(1, 'Branch is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  idempotencyKey: z.string().optional(), // Optional idempotency key for payment operations
})

export type RegistrationInput = z.infer<typeof registrationSchema>


