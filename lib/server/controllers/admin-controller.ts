import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withErrorHandling } from '@/lib/server/http/handler'
import { getAllMessages, getAllRegistrations } from '@/lib/server/services/admin-service'
import { rateLimiters } from '@/lib/server/http/rate-limit'

export const getAdminRegistrations = withErrorHandling(async (req: NextRequest) => {
  return rateLimiters.admin(req, async () => {
    const { data, error } = await getAllRegistrations()
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
    }
    return NextResponse.json({ registrations: data || [] })
  })
})

export const getAdminMessages = withErrorHandling(async (req: NextRequest) => {
  return rateLimiters.admin(req, async () => {
    const { data, error } = await getAllMessages()
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }
    return NextResponse.json({ messages: data || [] })
  })
})


