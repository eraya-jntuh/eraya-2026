"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft, Calendar, MapPin, Trophy, Users, Ticket } from "lucide-react"

interface EventDetailProps {
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
  event: {
    name: string
    description: string
    rules: string
    date: string
    venue: string
    prizePool: string
    teamSize: string
    entryFee: string
    image?: string
  }
}

export function EventDetailModal({ isOpen, onClose, onRegister, event }: EventDetailProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-[9999] overflow-y-auto md:inset-8 lg:inset-16"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="glass relative w-full max-w-3xl rounded-2xl border-2 border-gold/40 bg-maroon-dark/95 p-6 md:p-8">
                {/* Corner decorations */}
                <div className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-gold/50 rounded-tl-2xl" />
                <div className="absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-gold/50 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-gold/50 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-gold/50 rounded-br-2xl" />

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1, x: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="flex items-center gap-2 text-gold transition-colors hover:text-gold-light"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-serif text-sm">Back</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-gold transition-colors hover:text-gold-light"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Event Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-4 text-center font-display text-3xl font-bold tracking-wider text-gold md:text-4xl"
                >
                  {event.name}
                </motion.h2>

                {/* Decorative divider */}
                <div className="mx-auto mb-6 h-0.5 w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />

                {/* Event Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 overflow-hidden rounded-xl border border-gold/30"
                >
                  <img
                    src={event.image || "/placeholder.svg?height=300&width=600&query=cultural event stage performance"}
                    alt={event.name}
                    className="h-48 w-full object-cover md:h-64"
                  />
                </motion.div>

                {/* About Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="mb-3 font-display text-lg font-semibold text-gold">About</h3>
                  <p className="font-sans leading-relaxed text-cream/80">{event.description}</p>
                </motion.div>

                {/* Rules Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="mb-3 font-display text-lg font-semibold text-gold">Rules & Guidelines</h3>
                  <p className="font-sans leading-relaxed text-cream/80">{event.rules}</p>
                </motion.div>

                {/* Details Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3"
                >
                  {[
                    { icon: Calendar, label: "Date & Time", value: event.date },
                    { icon: MapPin, label: "Venue", value: event.venue },
                    { icon: Trophy, label: "Prize Pool", value: event.prizePool },
                    { icon: Users, label: "Team Size", value: event.teamSize },
                    { icon: Ticket, label: "Entry Fee", value: event.entryFee },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-gold/20 bg-maroon/50 p-4">
                      <item.icon className="mb-2 h-5 w-5 text-gold/60" />
                      <p className="font-serif text-xs text-gold/60">{item.label}</p>
                      <p className="font-sans text-sm font-medium text-cream">{item.value}</p>
                    </div>
                  ))}
                </motion.div>

                {/* Register Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRegister}
                  className="gold-glow w-full rounded-xl bg-gold py-4 font-display text-sm tracking-[0.2em] text-maroon-dark transition-all duration-300 hover:bg-gold-light"
                >
                  REGISTER NOW
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
