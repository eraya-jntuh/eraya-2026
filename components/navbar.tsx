"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { SidePanel } from "./side-panel"
import { supabase } from "@/lib/supabase/client"

const navItems = [
  { label: "MERCHANDISE", href: "#merchandise" },
  { label: "COMPETITIONS", href: "#events" },
  { label: "ACCOMMODATION", href: "#accommodation" },
  { label: "CONTACT US", href: "#contact" },
]

export function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check auth status
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass border-b border-gold/20" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Hamburger Menu */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPanelOpen(true)}
            className="group flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-gold transition-all group-hover:w-7 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            <span className="block h-0.5 w-6 bg-gold transition-all group-hover:w-5 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            <span className="block h-0.5 w-6 bg-gold transition-all group-hover:w-7 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </motion.button>

          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="font-display text-xl font-bold tracking-wider text-gold md:text-2xl"
          >
            ERAYA
          </motion.a>

          {/* Nav Items - Desktop */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative font-serif text-sm tracking-wider text-gold transition-colors hover:text-gold-light"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              </motion.a>
            ))}
            
            {/* Auth Button */}
            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <span className="font-serif text-sm text-cream/80">{user.email}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSignOut}
                  className="rounded-lg border border-gold/30 bg-transparent px-4 py-2 font-serif text-sm text-gold transition-colors hover:bg-gold/10"
                >
                  <LogOut className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.a
                href="/auth"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-gold/30 bg-transparent px-4 py-2 font-serif text-sm text-gold transition-colors hover:bg-gold/10"
              >
                <User className="h-4 w-4" />
                SIGN IN
              </motion.a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsPanelOpen(true)} className="text-gold lg:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>{isPanelOpen && <SidePanel onClose={() => setIsPanelOpen(false)} />}</AnimatePresence>
    </>
  )
}
