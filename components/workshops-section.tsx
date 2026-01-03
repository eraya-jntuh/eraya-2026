"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, Database, Cloud, Code, LineChart, Globe, Shield, Bot } from "lucide-react"

const workshops = [
    {
        title: "AI & Machine Learning",
        description: "Hands-on session on building neural networks and deploying AI models.",
        icon: Bot,
        date: "March 15, 2026",
    },
    {
        title: "Cloud Computing",
        description: "Master AWS and Azure fundamentals with industry experts.",
        icon: Cloud,
        date: "March 15, 2026",
    },
    {
        title: "Cybersecurity",
        description: "Learn ethical hacking, penetration testing, and network security.",
        icon: Shield,
        date: "March 16, 2026",
    },
    {
        title: "Blockchain Dev",
        description: "Build decentralized applications (DApps) and smart contracts.",
        icon: Database,
        date: "March 16, 2026",
    },
    {
        title: "IoT & Robotics",
        description: "Interface sensors with Arduino and Raspberry Pi for smart home projects.",
        icon: Cpu,
        date: "March 17, 2026",
    },
    {
        title: "Full Stack Web",
        description: "Modern web development with Next.js, React, and Supabase.",
        icon: Globe,
        date: "March 17, 2026",
    },
    {
        title: "Data Science",
        description: "Data analysis, visualization, and predictive modeling using Python.",
        icon: LineChart,
        date: "March 18, 2026",
    },
    {
        title: "App Development",
        description: "Cross-platform mobile app development using Flutter and React Native.",
        icon: Code,
        date: "March 18, 2026",
    },
]

function WorkshopCard({ workshop, index }: { workshop: typeof workshops[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-xl border border-gold/30 bg-maroon-dark/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:bg-maroon-dark/80"
        >
            {/* Glow effect */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20" />

            <div className="mb-4 inline-block rounded-lg bg-gold/10 p-3 text-gold">
                <workshop.icon className="h-8 w-8" />
            </div>

            <h3 className="mb-2 font-display text-xl font-bold text-gold">{workshop.title}</h3>
            <p className="mb-4 font-serif text-sm text-cream/70">{workshop.description}</p>

            <div className="mt-auto flex items-center justify-between border-t border-gold/10 pt-4 text-xs font-semibold tracking-wider text-gold/80">
                <span>{workshop.date}</span>
                <span className="group-hover:translate-x-1 transition-transform">REGISTER →</span>
            </div>
        </motion.div>
    )
}

export function WorkshopsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="workshops" className="relative overflow-hidden bg-maroon py-24 md:py-32">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #d4af37 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <span className="mb-4 inline-block font-serif text-sm font-bold tracking-[0.2em] text-gold/80">LEARN & GROW</span>
                    <h2 className="font-display text-4xl font-bold tracking-[0.1em] text-cream drop-shadow-lg md:text-5xl lg:text-6xl">
                        WORKSHOPS
                    </h2>
                    <div className="mx-auto mt-6 h-1 w-24 bg-gold" />
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {workshops.map((workshop, index) => (
                        <WorkshopCard key={workshop.title} workshop={workshop} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
