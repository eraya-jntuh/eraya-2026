import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withErrorHandling } from '@/lib/server/http/handler'
import { createServerClient } from '@/lib/supabase/server'
import { rateLimiters } from '@/lib/server/http/rate-limit'

export const POST = withErrorHandling(async (req: NextRequest) => {
  return rateLimiters.admin(req, async () => {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
      return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  })
})


