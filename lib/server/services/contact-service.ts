import type { ContactInput } from '@/lib/server/schemas/contact'
import { insertContactMessage } from '@/lib/server/repos/contact-repo'

export async function submitContactMessage(input: ContactInput & { userAgent: string | null; ip: string | null }) {
  return await insertContactMessage(input)
}


