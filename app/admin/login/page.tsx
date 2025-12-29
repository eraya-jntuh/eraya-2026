"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Mail, Lock } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(true)

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (session) {
          // Check if user is admin
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()

          if (profile && profile.role === 'admin') {
            router.push("/admin")
            return
          }
        }
      } catch (error: any) {
        console.error("Session check error:", error)
      } finally {
        setIsChecking(false)
      }
    }

    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setIsLoading(false)
        return
      }

        if (data.session) {
          // Check if user is admin
          let { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single()

          // If profile doesn't exist, create it (fallback)
          if (profileError && profileError.code === 'PGRST116' || !profile) {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .upsert({
                id: data.session.user.id,
                role: 'user',
              }, {
                onConflict: 'id'
              })
              .select('role')
              .single()
            if (createError || !newProfile) {
              await supabase.auth.signOut()
              setError("Access denied. Admin privileges required.")
              setIsLoading(false)
              return
            }
            profile = newProfile
          }

          if (profileError || !profile || profile.role !== 'admin') {
          await supabase.auth.signOut()
          setError("Access denied. Admin privileges required.")
          setIsLoading(false)
          return
        }

        // Redirect to admin dashboard
        router.push("/admin")
        router.refresh()
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-maroon">
        <div className="text-gold">Checking session...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-maroon fabric-texture p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border-2 border-gold/40 bg-maroon-dark/95 p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-gold">Admin Login</h1>
          <p className="mt-2 text-sm text-cream/60">ERAYA 2026 Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block font-serif text-sm text-gold/80">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gold/30 bg-input pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-serif text-sm text-gold/80">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gold/30 bg-input pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={isLoading ? {} : { scale: 1.02 }}
            whileTap={isLoading ? {} : { scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 font-display text-sm tracking-wider text-maroon-dark transition-all hover:bg-gold-light disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                SIGNING IN...
              </>
            ) : (
              "SIGN IN"
            )}
          </motion.button>
        </form>

        <div className="mt-6 space-y-3">
          <p className="text-center text-xs text-cream/40">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={async () => {
                if (!email || !password) {
                  setError("Please enter email and password to sign up")
                  return
                }
                setIsLoading(true)
                setError("")
                try {
                  const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                  })
                  if (signUpError) {
                    setError(signUpError.message)
                    setIsLoading(false)
                    return
                  }
                  if (data.user) {
                    // Create profile if it doesn't exist
                    const { error: profileError } = await supabase
                      .from('profiles')
                      .upsert({
                        id: data.user.id,
                        role: 'user',
                      }, {
                        onConflict: 'id'
                      })
                    if (profileError) {
                      console.error('Profile creation error:', profileError)
                    }
                    setError("Account created! Please check your email to confirm, then run the SQL command to promote yourself to admin (see env.example for instructions).")
                  }
                } catch (err) {
                  console.error("Signup error:", err)
                  setError("An unexpected error occurred. Please try again.")
                } finally {
                  setIsLoading(false)
                }
              }}
              className="text-gold hover:underline"
            >
              Sign up
            </button>
          </p>
          <p className="text-center text-xs text-cream/30">
            After signing up, you'll need to run a SQL command to get admin access.
            See env.example for instructions.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

