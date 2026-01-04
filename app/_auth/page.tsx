"use client"

export const dynamic = "force-dynamic"



import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Mail, Lock, User, LogIn, UserPlus, X } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

function AuthPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSignIn, setIsSignIn] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isChecking, setIsChecking] = useState(true)
  const [user, setUser] = useState<any>(null)

  // Check for URL params (verification success/error)
  useEffect(() => {
    const verified = searchParams.get('verified')
    const errorParam = searchParams.get('error')
    
    if (verified === 'true') {
      setSuccess("Email verified successfully! You can now sign in.")
      setIsSignIn(true)
    } else if (errorParam === 'verification_failed') {
      setError("Email verification failed. Please try again or request a new verification link.")
    }
  }, [searchParams])

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setUser(session.user)
        }
      } catch (error: any) {
        console.error("Session check error:", error)
      } finally {
        setIsChecking(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

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
        setSuccess("Successfully signed in!")
        setUser(data.user)
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 1000)
      }
    } catch (err: any) {
      console.error("Sign in error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
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
            full_name: fullName || null,
          }, {
            onConflict: 'id'
          })
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
        }
        
        setSuccess("Account created! Please check your email to verify your account.")
        // Clear form
        setEmail("")
        setPassword("")
        setFullName("")
        setIsSignIn(true)
      }
    } catch (err: any) {
      console.error("Sign up error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-maroon fabric-texture">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  // If user is logged in, show account info
  if (user) {
    return (
      <div className="min-h-screen bg-maroon fabric-texture py-24">
        <div className="mx-auto max-w-md px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-gold/40 bg-maroon-dark/95 p-8 shadow-xl"
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                <User className="h-8 w-8 text-gold" />
              </div>
              <h1 className="font-display text-2xl font-bold text-gold">Welcome Back!</h1>
              <p className="mt-2 text-sm text-cream/60">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-gold/30 bg-maroon/50 p-4">
                <p className="text-sm text-cream/60">Email</p>
                <p className="font-semibold text-cream">{user.email}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gold/50 bg-transparent py-3 font-display text-sm tracking-wider text-gold transition-all hover:bg-gold/10"
              >
                <X className="h-4 w-4" />
                SIGN OUT
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/")}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 font-display text-sm tracking-wider text-maroon-dark transition-all hover:bg-gold-light"
              >
                GO TO HOME
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-maroon fabric-texture py-12 px-6">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-gold/40 bg-maroon-dark/95 p-8 shadow-xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold text-gold">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            <p className="mt-2 text-sm text-cream/60">ERAYA 2026</p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2 rounded-lg border border-gold/20 bg-maroon/50 p-1">
            <button
              onClick={() => {
                setIsSignIn(true)
                setError("")
                setSuccess("")
              }}
              className={`flex-1 rounded-md py-2 text-center font-display text-sm font-semibold transition-all ${
                isSignIn
                  ? "bg-gold text-maroon-dark"
                  : "text-cream/60 hover:text-gold"
              }`}
            >
              <LogIn className="mx-auto mb-1 h-4 w-4" />
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignIn(false)
                setError("")
                setSuccess("")
              }}
              className={`flex-1 rounded-md py-2 text-center font-display text-sm font-semibold transition-all ${
                !isSignIn
                  ? "bg-gold text-maroon-dark"
                  : "text-cream/60 hover:text-gold"
              }`}
            >
              <UserPlus className="mx-auto mb-1 h-4 w-4" />
              Sign Up
            </button>
          </div>

          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-400"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.form
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSignIn}
                className="space-y-6"
              >
                <div>
                  <label className="mb-2 block font-serif text-sm text-gold/80">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gold/30 bg-input pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif text-sm text-gold/80">Password</label>
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
                    <>
                      <LogIn className="h-4 w-4" />
                      SIGN IN
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSignUp}
                className="space-y-6"
              >
                <div>
                  <label className="mb-2 block font-serif text-sm text-gold/80">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold/40" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gold/30 bg-input pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif text-sm text-gold/80">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gold/30 bg-input pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif text-sm text-gold/80">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full rounded-lg border border-gold/30 bg-input pl-10 pr-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                      placeholder="•••••••• (min 6 characters)"
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
                      CREATING ACCOUNT...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      SIGN UP
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-6 text-center text-xs text-cream/40">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div />}>
      <AuthPageContent />
    </Suspense>
  )
}


