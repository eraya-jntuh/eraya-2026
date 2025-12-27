"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X, ChevronRight, Instagram, Linkedin, Twitter } from "lucide-react"

const mainLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Clubs", href: "#clubs" },
  { label: "Contact", href: "#contact" },
]

const events = [
  "[EVENT_NAME_PLACEHOLDER_1]",
  "[EVENT_NAME_PLACEHOLDER_2]",
  "[EVENT_NAME_PLACEHOLDER_3]",
  "[EVENT_NAME_PLACEHOLDER_4]",
  "[EVENT_NAME_PLACEHOLDER_5]",
  "[EVENT_NAME_PLACEHOLDER_6]",
  "[EVENT_NAME_PLACEHOLDER_7]",
  "[EVENT_NAME_PLACEHOLDER_8]",
]

export function SidePanel({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 z-[9999] h-full w-[350px] max-w-[80vw] border-r-[3px] border-gold/50 bg-maroon fabric-texture"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gold/30 p-6">
            <h2 className="font-display text-2xl font-bold tracking-wider text-gold">ERAYA 2026</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gold transition-colors hover:text-gold-light"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Main Links */}
          <div className="border-b border-gold/30 p-6">
            <nav className="flex flex-col gap-4">
              {mainLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={onClose}
                  className="group font-serif text-lg uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </span>
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Events Section */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="mb-4 font-display text-sm uppercase tracking-widest text-gold">Events</h3>
            <div className="flex flex-col gap-2">
              {events.map((event, index) => (
                <motion.a
                  key={event}
                  href={`#event-${index + 1}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-cream/80 transition-all hover:bg-gold/10 hover:pl-4 hover:text-gold"
                >
                  <span>{event}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gold/30 p-6">
            <div className="flex items-center justify-center gap-6">
              {[Instagram, Linkedin, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gold transition-colors hover:text-gold-light"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
