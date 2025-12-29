import { unauthorized } from '@/lib/server/http/errors'
import { isAdmin } from '@/lib/supabase/auth-helpers'
import { selectMessages, selectRegistrations } from '@/lib/server/repos/admin-repo'

export async function requireAdmin() {
  const ok = await isAdmin()
  if (!ok) throw unauthorized('Unauthorized. Admin access required.')
}

export async function getAllRegistrations() {
  await requireAdmin()
  return await selectRegistrations()
}

export async function getAllMessages() {
  await requireAdmin()
  return await selectMessages()
}


