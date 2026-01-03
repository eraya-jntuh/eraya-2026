"use client"

import { motion } from "framer-motion"
import { Users, Sparkles, Building2 } from "lucide-react"

export function AboutSection() {
    return (
        <section id="about" className="relative overflow-hidden bg-maroon py-24 md:py-32">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
            <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-4xl font-bold tracking-[0.2em] text-gold drop-shadow-lg md:text-5xl lg:text-6xl"
                    >
                        ABOUT ERAYA
                    </motion.h2>
                    <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
                    {/* Eraya Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-gold/10 border border-gold/30">
                                <Sparkles className="h-6 w-6 text-gold" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-cream">The Spirit of Eraya</h3>
                        </div>
                        <p className="font-serif text-lg leading-relaxed text-cream/80 text-justify">
                            Eraya 2026 is JNTU Hyderabad's premier cultural festival, a celebration of art, music,
                            dance, and innovation. It is a melting pot of talent where students from across the
                            nation converge to showcase their skills, compete, and create memories that last a lifetime.
                            This year, we embark on a journey to explore new horizons of creativity and expression.
                        </p>
                        <p className="font-serif text-lg leading-relaxed text-cream/80 text-justify">
                            With a dazzling array of events ranging from electrifying dance battles to soul-stirring
                            musical performances, and from thought-provoking workshops to mesmerizing art exhibitions,
                            Eraya promises an experience like no other.
                        </p>
                    </motion.div>

                    {/* JNTUH Description */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-gold/10 border border-gold/30">
                                <Building2 className="h-6 w-6 text-gold" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-cream">About JNTUH</h3>
                        </div>
                        <p className="font-serif text-lg leading-relaxed text-cream/80 text-justify">
                            Jawaharlal Nehru Technological University Hyderabad (JNTUH) stands as a beacon of academic
                            excellence and technical innovation. Established with a vision to develop quality engineering
                            education, it has grown into a prestigious institution that fosters not just technical acumen
                            but also holistic development.
                        </p>
                        <p className="font-serif text-lg leading-relaxed text-cream/80 text-justify">
                            The university campus, sprawling and vibrant, provides the perfect backdrop for Eraya,
                            blending the rigor of engineering with the vibrancy of culture.
                        </p>
                    </motion.div>
                </div>

                {/* Stats / Highlights (Optional - based on common fest PPTs) */}
                <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
                    {[
                        { label: "Events", value: "50+" },
                        { label: "Footfall", value: "10,000+" },
                        { label: "Colleges", value: "100+" },
                        { label: "Prize Pool", value: "₹5 Lakhs+" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                            className="text-center"
                        >
                            <div className="font-display text-4xl font-bold text-gold">{stat.value}</div>
                            <div className="mt-2 font-serif text-sm tracking-wider text-cream/60 uppercase">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
