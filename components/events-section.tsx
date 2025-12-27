"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Music, Palette, Mic2, Camera, Drama, Gamepad2, Lightbulb, Trophy } from "lucide-react"
import { EventDetailModal } from "./event-detail-modal"
import { RegistrationForm } from "./registration-form"

const events = [
  {
    id: 1,
    name: "[EVENT_NAME_PLACEHOLDER_1]",
    description: "[PASTE EVENT_1 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_1 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Music,
  },
  {
    id: 2,
    name: "[EVENT_NAME_PLACEHOLDER_2]",
    description: "[PASTE EVENT_2 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_2 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Palette,
  },
  {
    id: 3,
    name: "[EVENT_NAME_PLACEHOLDER_3]",
    description: "[PASTE EVENT_3 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_3 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Mic2,
  },
  {
    id: 4,
    name: "[EVENT_NAME_PLACEHOLDER_4]",
    description: "[PASTE EVENT_4 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_4 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Camera,
  },
  {
    id: 5,
    name: "[EVENT_NAME_PLACEHOLDER_5]",
    description: "[PASTE EVENT_5 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_5 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Drama,
  },
  {
    id: 6,
    name: "[EVENT_NAME_PLACEHOLDER_6]",
    description: "[PASTE EVENT_6 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_6 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Gamepad2,
  },
  {
    id: 7,
    name: "[EVENT_NAME_PLACEHOLDER_7]",
    description: "[PASTE EVENT_7 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_7 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Lightbulb,
  },
  {
    id: 8,
    name: "[EVENT_NAME_PLACEHOLDER_8]",
    description: "[PASTE EVENT_8 DESCRIPTION HERE]",
    rules: "[PASTE EVENT_8 RULES HERE]",
    date: "[EVENT_DATE_TIME]",
    venue: "[EVENT_VENUE]",
    prizePool: "[PRIZE_POOL]",
    teamSize: "[TEAM_SIZE]",
    entryFee: "[ENTRY_FEE]",
    icon: Trophy,
  },
]

function EventCard({
  event,
  index,
  onLearnMore,
}: {
  event: (typeof events)[0]
  index: number
  onLearnMore: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative overflow-hidden rounded-xl border-2 border-gold/30 bg-maroon-dark/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
    >
      {/* Corner decorations */}
      <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-gold/40" />
      <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-gold/40" />
      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-gold/40" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-gold/40" />

      {/* Icon */}
      <div className="mb-4 flex justify-center">
        <div className="rounded-full border border-gold/40 bg-gold/10 p-4 transition-all duration-300 group-hover:bg-gold/20 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <event.icon className="h-8 w-8 text-gold" />
        </div>
      </div>

      {/* Content */}
      <h3 className="mb-3 text-center font-display text-lg font-semibold tracking-wide text-gold">{event.name}</h3>
      <p className="mb-6 line-clamp-3 text-center font-sans text-sm leading-relaxed text-cream/70">
        {event.description}
      </p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLearnMore}
        className="w-full rounded-lg border border-gold/50 bg-transparent py-2 font-serif text-sm tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-maroon-dark"
      >
        Learn More
      </motion.button>
    </motion.div>
  )
}

export function EventsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)

  const handleLearnMore = (event: (typeof events)[0]) => {
    setSelectedEvent(event)
    setShowDetail(true)
  }

  const handleRegister = () => {
    setShowDetail(false)
    setShowRegistration(true)
  }

  return (
    <section id="events" className="relative overflow-hidden bg-maroon fabric-texture py-24 md:py-32">
      {/* Decorative top border */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Decorative pattern overlay */}
      <div className="pointer-events-none absolute inset-0 damask-pattern opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.2em] text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] md:text-5xl lg:text-6xl">
            EVENTS
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} onLearnMore={() => handleLearnMore(event)} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gold-glow rounded-full border-2 border-gold bg-transparent px-10 py-4 font-display text-sm tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-maroon-dark"
          >
            VIEW ALL EVENTS
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          onRegister={handleRegister}
          event={selectedEvent}
        />
      )}

      {/* Registration Form */}
      {selectedEvent && (
        <RegistrationForm
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
          eventName={selectedEvent.name}
          entryFee={selectedEvent.entryFee}
        />
      )}
    </section>
  )
}
