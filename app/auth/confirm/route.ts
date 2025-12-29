import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = '/auth'

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = await createServerClient()

    const { data: verifyData, error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    })

    if (!error && verifyData?.user) {
      // Create profile if it doesn't exist (after email confirmation)
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: verifyData.user.id,
          role: 'user',
        }, {
          onConflict: 'id'
        })
      if (profileError) {
        console.error('Profile creation error after email confirmation:', profileError)
      }
      
      redirectTo.searchParams.set('verified', 'true')
      return NextResponse.redirect(redirectTo)
    }
  }

  // Return to auth page with error
  redirectTo.pathname = '/auth'
  redirectTo.searchParams.set('error', 'verification_failed')
  return NextResponse.redirect(redirectTo)
}

