import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withErrorHandling } from '@/lib/server/http/handler'
import { contactSchema } from '@/lib/server/schemas/contact'
import { getRequestIp, getUserAgent } from '@/lib/server/http/request'
import { submitContactMessage } from '@/lib/server/services/contact-service'
import { rateLimiters } from '@/lib/server/http/rate-limit'

export const postContact = withErrorHandling(async (req: NextRequest) => {
  return rateLimiters.contact(req, async () => {
    const body = await req.json()
    const parsed = contactSchema.parse(body)

    const { error } = await submitContactMessage({
      ...parsed,
      userAgent: getUserAgent(req),
      ip: getRequestIp(req),
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 201 })
  })
})


