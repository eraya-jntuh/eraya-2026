"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { GoldenParticles } from "./golden-particles"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-maroon fabric-texture damask-pattern">
      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Golden particles */}
      <GoldenParticles />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Main Logo/Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-display text-6xl font-bold tracking-[0.2em] text-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] md:text-8xl lg:text-9xl"
        >
          ERAYA
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-2 font-display text-2xl tracking-[0.3em] text-gold/80 md:text-3xl"
        >
          2026
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-xl font-serif text-lg italic text-gold/90 md:text-xl"
        >
          [PASTE FEST TAGLINE HERE]
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 font-serif text-lg tracking-widest text-cream/80 md:text-xl"
        >
          January 30-31, 2026
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#events"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gold-glow mt-12 rounded-full border-2 border-gold bg-transparent px-10 py-4 font-display text-sm tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-maroon-dark hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
        >
          REGISTER NOW
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: { delay: 2, duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <a href="#events" className="flex flex-col items-center text-gold/60 transition-colors hover:text-gold">
          <span className="mb-2 font-serif text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </motion.div>
    </section>
  )
}
