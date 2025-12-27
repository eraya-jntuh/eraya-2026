"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Ticket } from "lucide-react"

export function FloatingRegisterButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#events"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="gold-glow-intense fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-maroon-dark shadow-lg transition-all hover:bg-gold-light md:h-auto md:w-auto md:gap-2 md:px-6 md:py-3"
        >
          <Ticket className="h-6 w-6" />
          <span className="hidden font-display text-sm tracking-wider md:inline">REGISTER</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
