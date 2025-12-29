import { createServerClient } from './server'

// Check if user is authenticated and has admin role (SSR-safe via cookie-bound Supabase client).
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createServerClient()

    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData.user) return false

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userData.user.id)
      .single()

    if (profileError || !profile) return false
    return profile.role === 'admin'
  } catch {
    return false
  }
}

export async function getUser() {
  const supabase = await createServerClient()
  return await supabase.auth.getUser()
}

