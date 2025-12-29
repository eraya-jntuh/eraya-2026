import { cookies } from 'next/headers'
import { createServerClient as createSsrClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * SSR-safe Supabase client for API routes and server components.
 * Uses Next.js cookie store so `auth.getUser()` / `auth.getSession()` works server-side.
 */
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSsrClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // `cookies().set` can throw in some static contexts; API routes should be fine.
        }
      },
    },
  })
}

