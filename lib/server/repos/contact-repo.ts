import { createServerClient } from '@/lib/supabase/server'
import type { ContactInput } from '@/lib/server/schemas/contact'

export async function insertContactMessage(input: ContactInput & { userAgent: string | null; ip: string | null }) {
  const supabase = await createServerClient()
  return await supabase.from('contact_messages').insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    message: input.message,
    user_agent: input.userAgent,
    ip: input.ip,
  })
}


