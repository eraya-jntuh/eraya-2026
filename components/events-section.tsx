"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Music, Palette, Mic2, Camera, Drama, Gamepad2, Lightbulb, Trophy } from "lucide-react"
import { EventDetailModal } from "./event-detail-modal"
import { RegistrationForm } from "./registration-form"

const events = [
  {
    id: 1,
    name: "Mic Drop – Poetry Slam",
    description: "A live spoken-word poetry event where participants perform original poetry with complete freedom of expression. Mic Drop celebrates voice, rhythm, emotion, and presence, turning words into a powerful stage experience.",
    rules: [
      "Individual participation only.",
      "Each participant must perform one original poem.",
      "Time limit of 2–3 minutes per performance.",
      "Poems may be memorized or read.",
      "No props or background music unless explicitly specified by organizers.",
      "Content must be appropriate and respectful."
    ],
    date: "Coming Soon",
    venue: "Coming Soon",
    prizePool: "Coming Soon",
    teamSize: "Solo",
    entryFee: "Coming Soon",
    icon: Music,
  },
  {
    id: 2,
    name: "Literary Among Us – Trust No Narrator",
    description: "A narrative-based deduction event inspired by the game Among Us. Participants rely on observation, interpretation, and logical reasoning to uncover deception hidden within literary clues and storytelling twists.",
    rules: [
      "Individual participation only.",
      "Each participant is assigned a secret role (Reader or Impostor).",
      "Readers receive truthful narrative clues.",
      "Impostors receive altered or misleading information.",
      "Participants must analyze clues and identify inconsistencies.",
      "Final decisions must be justified with reasoning.",
      "The event concludes with a final role reveal."
    ],
    date: "Coming Soon",
    venue: "Coming Soon",
    prizePool: "Coming Soon",
    teamSize: "Solo",
    entryFee: "Coming Soon",
    icon: Palette,
  },
  {
    id: 3,
    name: "Battle of Bands",
    description: "Battle of Bands is a high-energy live music competition where bands showcase their musical talent, stage presence, and originality. The event celebrates teamwork, creativity, and performance excellence across genres and languages.",
    rules: [
      "Cross-college bands are not allowed to participate.",
      "Each band must have a minimum of 3 members and a maximum of 8 members.",
      "Use of pre-recorded music, loopers, or sequencers is strictly prohibited.",
      "Each team may have a maximum of 2 roadies to assist with moving equipment.",
      "Bands must bring their own instruments and gear; organizers are not responsible for damage, loss, or misplacement.",
      "Bands may perform songs in any language.",
      "Original compositions are encouraged.",
      "Purely instrumental performances are allowed.",
      "Use of profanity or explicit language is strictly prohibited.",
      "Obscene, vulgar, or indecent behavior can lead to loss of points or disqualification.",
      "Use of illegal substances is strictly prohibited and will result in immediate disqualification.",
      "A standard 5-piece drum kit with a single kick pedal will be provided.",
      "Bands may bring their own double kick pedal if required."
    ],
    date: "Coming Soon",
    venue: "Coming Soon",
    prizePool: "Coming Soon",
    teamSize: "3–8 Members",
    entryFee: "Coming Soon",
    icon: Mic2,
  },
  {
    id: 4,
    name: "The Second Take (Cinematic Choreography)",
    description: "The Second Take is a cinematic dance competition where teams recreate iconic movie dance sequences on stage. The focus is on high-fidelity recreation—capturing the original frame, vibe, expressions, costumes, and overall cinematic aura while performing live.",
    rules: [
      "Team size must be between 4 and 8 members.",
      "Teams must select an iconic movie song and recreate the choreography on stage.",
      "Maximum performance duration is 5 minutes.",
      "High-fidelity recreation of the original movie scene is expected.",
      "Costumes and props should be relevant to the chosen movie scene.",
      "Obscene or vulgar gestures, costumes, or expressions will result in immediate disqualification.",
      "Use of fire, fluids, powders, or sharp objects on stage is strictly prohibited.",
      "Teams must report backstage at least 30 minutes before their performance.",
      "Late reporting may result in point deduction.",
      "Judges’ decisions are final and binding."
    ],
    date: "Coming Soon",
    venue: "Coming Soon",
    prizePool: "Coming Soon",
    teamSize: "Coming Soon",
    entryFee: "Coming Soon",
    icon: Camera,
  },
  {
    id: 5,
    name: "Dance Battle – The Team Battles",
    description: "Dance Battle is a high-intensity team-versus-team knockout competition where crews battle through multiple rounds in a tournament format. Teams showcase technique, creativity, coordination, and performance impact across street and western dance styles.",
    rules: [
      "Team size must be between 4 and 8 members.",
      "Permitted styles include Western, Hip-Hop, Popping, Breaking, Locking, Whacking, and other street styles.",
      "Classical, folk, and mass beat styles are not permitted.",
      "The event follows a knockout tournament format.",
      "Division A and Division B knockouts will be held on Day 01.",
      "Winners of both divisions will face off in the Grand Finale on Day 02.",
      "Each team performance is limited to 3 minutes in knockout rounds.",
      "Grand Finale performances may extend up to 7 minutes.",
      "Obscene or vulgar gestures, costumes, or expressions will result in immediate disqualification.",
      "Use of fire, fluids, powders, or sharp objects on stage is strictly prohibited.",
      "Teams must report backstage at least 30 minutes before their performance.",
      "Judges’ decisions are final and binding."
    ],
    date: "Coming Soon",
    venue: "Coming Soon",
    prizePool: "Coming Soon",
    teamSize: "4–8 Members",
    entryFee: "Coming Soon",
    icon: Drama,
  },
  {
    id: 6,
    name: "ChitraKatha – Short Film Contest",
    description: "ChitraKatha is a short film competition organized as part of Eraya 2026, celebrating storytelling through cinema. The contest invites original short films from college students and features both online and offline screening rounds, culminating in a grand finale at JNTUH.",
    rules: [
      "Open to all college students.",
      "Film duration must be a minimum of 8 minutes and a maximum of 20 minutes.",
      "Theme can be specific or open-themed.",
      "Accepted formats are MP4 or MOV in HD quality (720p or 1080p).",
      "Films may be in any language; non-English or non-regional films must include subtitles.",
      "Submissions must be recent original work created only by the participating team members.",
      "Each participant or team may submit only one entry.",
      "No vulgar, offensive, or discriminatory content is allowed.",
      "Use of copyrighted music or clips is prohibited unless proper permission is obtained.",
      "Late submissions will not be considered.",
      "Organizers’ and judges’ decisions are final.",
      "By submitting, participants grant the college the right to screen their films."
    ],
    date: "Coming Soon",
    venue:  "Coming Soon",
    prizePool: "Coming Soon",
    teamSize: "Solo/Team",
    entryFee: "Coming Soon",
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
