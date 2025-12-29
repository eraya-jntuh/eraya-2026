import { createServerClient } from '@/lib/supabase/server'

export interface Event {
  id: string
  name: string
  entry_fee: number // Single entry fee for all students
  is_active: boolean
  created_at: string
  updated_at: string
}

/**
 * Fetch event by name from database
 */
export async function getEventByName(eventName: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('name', eventName)
    .eq('is_active', true)
    .single()

  return { data: data as Event | null, error }
}

/**
 * Get entry fee for an event (single fee for all students)
 */
export async function getEventEntryFee(eventName: string): Promise<{ fee: number | null; error: any }> {
  const { data, error } = await getEventByName(eventName)
  
  if (error || !data) {
    return { fee: null, error: error || new Error('Event not found') }
  }

  return { fee: data.entry_fee, error: null }
}

