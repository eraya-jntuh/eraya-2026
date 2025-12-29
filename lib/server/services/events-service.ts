import { getEventByName, getEventEntryFee } from '@/lib/server/repos/events-repo'

/**
 * Validate that an event exists and is active
 */
export async function validateEvent(eventName: string) {
  const { data, error } = await getEventByName(eventName)
  
  if (error) {
    return { valid: false, error: 'Failed to validate event' }
  }
  
  if (!data) {
    return { valid: false, error: 'Event not found or inactive' }
  }
  
  return { valid: true, event: data, error: null }
}

/**
 * Get server-side entry fee for an event (single fee for all students)
 * This replaces client-trusted pricing
 */
export async function getServerSideEntryFee(eventName: string) {
  const { fee, error } = await getEventEntryFee(eventName)
  
  if (error || fee === null) {
    return { fee: null, error: error || new Error('Failed to get entry fee') }
  }
  
  return { fee, error: null }
}

