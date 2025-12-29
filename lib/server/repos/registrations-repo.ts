import { createServerClient } from '@/lib/supabase/server'
import type { RegistrationInput } from '@/lib/server/schemas/registration'

export async function insertRegistration(
  input: RegistrationInput & { 
    userAgent: string | null
    ip: string | null
    entryFee: string // Now required - server-calculated
  }
) {
  const supabase = await createServerClient()
  return await supabase.from('event_registrations').insert({
    event_name: input.eventName,
    entry_fee: input.entryFee, // Server-calculated fee (no longer optional)
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    college: input.college,
    year: input.year,
    branch: input.branch,
    transaction_id: input.transactionId,
    user_agent: input.userAgent,
    ip: input.ip,
    payment_status: 'PENDING', // Default payment status
  })
}

/**
 * Get registration by ID
 */
export async function getRegistrationById(registrationId: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('event_registrations')
    .select('*')
    .eq('id', registrationId)
    .single()

  return { data, error }
}
