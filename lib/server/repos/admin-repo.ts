import { createServerClient } from '@/lib/supabase/server'

export async function selectRegistrations() {
  const supabase = await createServerClient()
  return await supabase.from('event_registrations').select('*').order('created_at', { ascending: false })
}

export async function selectMessages() {
  const supabase = await createServerClient()
  return await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
}


