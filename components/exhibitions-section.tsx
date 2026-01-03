"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Atom, Rocket, Brain, Radio } from "lucide-react"

const exhibitions = [
    {
        title: "ISRO Space Zone",
        category: "Space Tech",
        description: "Explore models of Chandrayaan-3 and Aditya-L1 missions straight from ISRO scientists.",
        image: "/exhibitions/space.jpg", // Placeholder
        icon: Rocket
    },
    {
        title: "Robotics Arena",
        category: "Automation",
        description: "Witness industrial arms, humanoid robots, and Boston Dynamics-inspired quadrupeds in action.",
        image: "/exhibitions/robotics.jpg",
        icon: Brain
    },
    {
        title: "Sustain-Tech",
        category: "Green Energy",
        description: "Innovative projects focused on renewable energy, EV charging, and waste management.",
        image: "/exhibitions/energy.jpg",
        icon: Atom
    },
    {
        title: "5G & IoT Hub",
        category: "Connectivity",
        description: "Experience the future of connected cities with live demos of 5G applications.",
        image: "/exhibitions/iot.jpg",
        icon: Radio
    },
]

export function ExhibitionsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="exhibitions" className="relative overflow-hidden bg-maroon-dark py-24 md:py-32">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <span className="mb-2 block font-serif text-sm tracking-[0.2em] text-gold">DISCOVER THE FUTURE</span>
                        <h2 className="font-display text-4xl font-bold text-cream md:text-5xl lg:text-6xl">
                            TECH <span className="text-gold">EXHIBITIONS</span>
                        </h2>
                    </div>
                    <p className="mt-4 max-w-md font-serif text-sm text-cream/60 md:mt-0 md:text-right">
                        Immerse yourself in cutting-edge technology and witness groundbreaking innovations from across the nation.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2">
                    {exhibitions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative h-80 overflow-hidden rounded-2xl border border-gold/20 bg-black/40"
                        >
                            {/* Background Overlay (would be image) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark via-maroon-dark/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />

                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-full bg-gold/20 p-2 text-gold backdrop-blur-md">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium text-gold/80 bg-black/30 backdrop-blur-sm">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="mb-2 font-display text-3xl font-bold text-cream">{item.title}</h3>
                                <p className="max-w-lg font-serif text-sm text-cream/70">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
