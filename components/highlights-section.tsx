"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { QrCode, Mic2, Music, Ticket, Star, Calendar, MapPin, Clock } from "lucide-react"
import { RegistrationForm } from "@/components/registration-form"

export function HighlightsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [showPassRegistration, setShowPassRegistration] = useState(false)

    return (
        <section id="highlights" className="relative overflow-hidden bg-black py-24 md:py-32">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-12 text-center"
                >
                    <h2 className="font-display text-4xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold md:text-5xl lg:text-6xl drop-shadow-lg">
                        HIGHLIGHTS
                    </h2>
                    <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </motion.div>

                {/* Event Marquee */}
                <div className="relative mb-20 w-full overflow-hidden border-y border-gold/10 bg-white/5 py-4 backdrop-blur-sm">
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

                    <div className="flex animate-marquee whitespace-nowrap">
                        {[
                            "BATTLE OF BANDS", "DANCE BATTLES", "SHORT FILM CONTEST", "STAND UP COMEDY",
                            "PRO SHOW", "POETRY SLAM", "SPYLENCE", "MEME WARS", "AD MAKING",
                            "CINEMATIC DANCE", "E-SPORTS", "PHOTOGRAPHY"
                        ].map((item, i) => (
                            <span key={i} className="mx-8 font-display text-sm font-bold tracking-[0.2em] text-gold/60">
                                {item} <span className="ml-8 text-gold/20">•</span>
                            </span>
                        ))}
                        {[
                            "BATTLE OF BANDS", "DANCE BATTLES", "SHORT FILM CONTEST", "STAND UP COMEDY",
                            "PRO SHOW", "POETRY SLAM", "SPYLENCE", "MEME WARS", "AD MAKING",
                            "CINEMATIC DANCE", "E-SPORTS", "PHOTOGRAPHY"
                        ].map((item, i) => (
                            <span key={`dup-${i}`} className="mx-8 font-display text-sm font-bold tracking-[0.2em] text-gold/60">
                                {item} <span className="ml-8 text-gold/20">•</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-32">
                    {/* SECTION 1: ENTRY PASS */}
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-bold tracking-widest text-gold text-uppercase">
                                <Ticket className="h-3 w-3 fill-gold" />
                                OFFICIAL ACCESS
                            </div>
                            <h3 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight">
                                Your Gateway to <br /> <span className="text-gold">Eraya 2026</span>
                            </h3>
                            <p className="font-serif text-lg text-cream/70 leading-relaxed max-w-xl">
                                Get your official entry pass to access all common areas, spectate events, and experience the cultural extravaganza.
                                This pass generates a unique QR code linked to your profile setup.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-3 rounded-xl bg-white/5 px-5 py-3 border border-white/10">
                                    <QrCode className="h-6 w-6 text-gold" />
                                    <div>
                                        <div className="text-xs text-cream/40 uppercase tracking-wider">Format</div>
                                        <div className="font-bold text-cream">Digital QR</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-white/5 px-5 py-3 border border-white/10">
                                    <Star className="h-6 w-6 text-gold" />
                                    <div>
                                        <div className="text-xs text-cream/40 uppercase tracking-wider">Validity</div>
                                        <div className="font-bold text-cream">Both Days</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowPassRegistration(true)}
                                className="mt-8 group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gold px-10 py-4 font-display text-sm font-bold tracking-widest text-maroon-dark transition-all hover:bg-white hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                            >
                                <span className="relative z-10">GET ENTRY PASS</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative mx-auto w-full max-w-md"
                        >
                            <div className="relative aspect-[3/4] rounded-3xl border border-gold/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md p-8 shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />

                                <div className="h-full flex flex-col justify-between relative z-10 border border-white/10 rounded-2xl p-6 bg-black/20">
                                    <div className="text-center">
                                        <div className="font-display text-2xl font-bold text-gold tracking-widest mb-1">ERAYA</div>
                                        <div className="font-serif text-xs text-cream/50 tracking-[0.3em]">2026 EDITION</div>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center py-8">
                                        <div className="w-48 h-48 rounded-xl bg-white p-2 shadow-lg rotate-0 transition-transform hover:rotate-2 duration-500">
                                            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                                <QrCode className="h-16 w-16 text-gray-300" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                                        <div className="flex justify-between text-xs font-mono text-cream/60">
                                            <span>ADMIT ONE</span>
                                            <span>#ERAYA26</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* SECTION 2: STAND UP */}
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1 relative mx-auto w-full max-w-md"
                        >
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-800 border-2 border-gold/20 shadow-2xl relative group hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
                                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                    <Mic2 className="h-24 w-24 text-white/10" />
                                    <span className="absolute bottom-1/3 font-display text-4xl font-bold text-white/5 rotate-[-15deg]">LAUGH</span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <div className="font-display text-3xl font-bold text-white mb-2">STAR PERFORMER</div>
                                    <div className="text-gold font-serif italic">Live Standup Comedy</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2 space-y-6 lg:text-right"
                        >
                            <div className="flex items-center gap-2 justify-start lg:justify-end">
                                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-purple-400 text-uppercase">
                                    <Mic2 className="h-3 w-3" />
                                    COMEDY NIGHT
                                </div>
                            </div>
                            <h3 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight">
                                Unfiltered Laughter <br /> <span className="text-purple-400">Live on Stage</span>
                            </h3>
                            <p className="font-serif text-lg text-cream/70 leading-relaxed ml-auto max-w-xl">
                                Join us for an evening of hysterical punchlines and relatable stories.
                                Our headline act promises to keep you in splits. Don't miss the biggest comedy event of the fest.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4 lg:ml-auto max-w-md">
                                <div className="flex items-center gap-3 lg:flex-row-reverse">
                                    <Calendar className="h-5 w-5 text-gold" />
                                    <div className="text-sm text-cream/80">Feb 26, 2026</div>
                                </div>
                                <div className="flex items-center gap-3 lg:flex-row-reverse">
                                    <Clock className="h-5 w-5 text-gold" />
                                    <div className="text-sm text-cream/80">6:00 PM Onwards</div>
                                </div>
                                <div className="flex items-center gap-3 lg:flex-row-reverse col-span-2 justify-start lg:justify-end">
                                    <MapPin className="h-5 w-5 text-gold" />
                                    <div className="text-sm text-cream/80">Main Auditorium</div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-start lg:justify-end">
                                <a
                                    href="#timeline"
                                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-3 font-display text-sm font-bold tracking-wider text-gold transition-all hover:bg-gold hover:text-maroon-dark"
                                >
                                    VIEW TIMELINE
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* SECTION 3: CONCERT */}
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 text-uppercase">
                                <Music className="h-3 w-3" />
                                PRO SHOW
                            </div>
                            <h3 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight">
                                Electrifying Beats <br /> <span className="text-blue-400">Under the Stars</span>
                            </h3>
                            <p className="font-serif text-lg text-cream/70 leading-relaxed max-w-xl">
                                Experience the magic of live music with our star artist.
                                From soulful melodies to high-energy tracks, get ready to dance the night away.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4 max-w-md">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-gold" />
                                    <div className="text-sm text-cream/80">Feb 27, 2026</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-gold" />
                                    <div className="text-sm text-cream/80">7:00 PM Onwards</div>
                                </div>
                                <div className="flex items-center gap-3 col-span-2">
                                    <MapPin className="h-5 w-5 text-gold" />
                                    <div className="text-sm text-cream/80">Open Air Theatre</div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <a
                                    href="#timeline"
                                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-3 font-display text-sm font-bold tracking-wider text-gold transition-all hover:bg-gold hover:text-maroon-dark"
                                >
                                    VIEW TIMELINE
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative mx-auto w-full max-w-md"
                        >
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-800 border-2 border-gold/20 shadow-2xl relative group hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
                                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                    <Music className="h-24 w-24 text-white/10" />
                                    <span className="absolute bottom-1/3 font-display text-4xl font-bold text-white/5 rotate-[15deg] tracking-widest">LIVE</span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <div className="font-display text-3xl font-bold text-white mb-2">HEADLINER</div>
                                    <div className="text-gold font-serif italic">Musical Extravaganza</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    {/* SECTION 4: FLAGSHIP COMPETITIONS */}
                    <div className="pt-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-12 text-center"
                        >
                            <h3 className="font-display text-3xl font-bold tracking-[0.1em] text-gold mb-4">
                                FLAGSHIP COMPETITIONS
                            </h3>
                            <p className="font-serif text-cream/60 max-w-2xl mx-auto">
                                Witness the fiercest battles and creative showcases.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "BATTLE OF BANDS", icon: Music, desc: "The ultimate musical showdown.", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", image: "/qrs/bob.jfif" },
                                { title: "DANCE BATTLES", icon: Star, desc: "Elite feet rhythmic face-off.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", image: "/qrs/dance.jfif" },
                                { title: "SHORT FILM", icon: Ticket, desc: "Stories on the silver screen.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", image: "/qrs/chtrakatha.jfif" },
                                { title: "CINEMATIC DANCE", icon: QrCode, desc: "Recreating iconic movie scenes.", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", image: "/qrs/second_take.jfif" }
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    href="#events"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`group relative overflow-hidden rounded-xl border ${item.border} ${item.bg} transition-all hover:scale-105 hover:bg-white/10 flex flex-col`}
                                >
                                    {/* Image Area */}
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 z-20 rounded-lg bg-black/60 p-2 backdrop-blur-md border border-white/10">
                                            <item.icon className={`h-5 w-5 ${item.color}`} />
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <h4 className="mb-2 font-display text-lg font-bold text-cream group-hover:text-gold transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-cream/60 font-serif mb-4 flex-1">
                                            {item.desc}
                                        </p>
                                        <div className="flex items-center text-xs font-bold text-gold tracking-wider uppercase mt-auto">
                                            View Details <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RegistrationForm
                isOpen={showPassRegistration}
                onClose={() => setShowPassRegistration(false)}
                eventName="Eraya Entry Pass"
                entryFee="₹100"
            />
        </section>
    )
}
