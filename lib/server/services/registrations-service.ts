import type { RegistrationInput } from '@/lib/server/schemas/registration'
import { insertRegistration } from '@/lib/server/repos/registrations-repo'
import { validateEvent, getServerSideEntryFee } from './events-service'
import { getIdempotencyRecord, storeIdempotencyRecord, hashRequest } from '@/lib/server/repos/idempotency-repo'

export interface SubmitRegistrationResult {
  success: boolean
  error?: string
  entryFee?: number
  idempotencyKey?: string
  cachedResponse?: { status: number; body: any }
}

/**
 * Submit registration with server-side validation and pricing
 */
export async function submitRegistration(
  input: RegistrationInput & { userAgent: string | null; ip: string | null }
): Promise<SubmitRegistrationResult> {
  // Step 1: Validate event exists and is active
  const eventValidation = await validateEvent(input.eventName)
  if (!eventValidation.valid) {
    return { success: false, error: eventValidation.error || 'Invalid event' }
  }

  // Step 2: Get server-side entry fee (ignore any client-provided value)
  const feeResult = await getServerSideEntryFee(input.eventName)
  if (feeResult.error || feeResult.fee === null) {
    return { success: false, error: feeResult.error?.message || 'Failed to get entry fee' }
  }

  // Step 3: Check idempotency if key is provided
  if (input.idempotencyKey) {
    const idempotencyRecord = await getIdempotencyRecord(input.idempotencyKey)
    if (idempotencyRecord.data) {
      // Return cached response
      try {
        const cachedBody = JSON.parse(idempotencyRecord.data.response_body)
        return {
          success: true,
          cachedResponse: {
            status: idempotencyRecord.data.response_status,
            body: cachedBody,
          },
          idempotencyKey: input.idempotencyKey,
        }
      } catch {
        // If parsing fails, continue with new request
      }
    }
  }

  // Step 4: Insert registration with server-side entry fee
  const { error } = await insertRegistration({
    ...input,
    entryFee: feeResult.fee.toString(), // Store server-calculated fee
    userAgent: input.userAgent,
    ip: input.ip,
  })

  if (error) {
    return { success: false, error: error.message || 'Failed to save registration' }
  }

  // Step 5: Store idempotency record if key provided
  if (input.idempotencyKey) {
    const requestHash = hashRequest(input)
    const responseBody = JSON.stringify({ success: true, message: 'Registration submitted successfully' })
    await storeIdempotencyRecord(input.idempotencyKey, requestHash, 201, responseBody)
  }

  return {
    success: true,
    entryFee: feeResult.fee,
    idempotencyKey: input.idempotencyKey,
  }
}


