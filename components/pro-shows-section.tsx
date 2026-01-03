"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Music2, Mic, Sparkles } from "lucide-react"

const shows = [
    {
        day: "DAY 1",
        title: "Comedy Night",
        artist: "Ft. Top Comedian", // Placeholder
        time: "7:00 PM Onwards",
        image: "/proshows/comedy.jpg",
        icon: Mic,
        color: "from-purple-500 to-pink-500"
    },
    {
        day: "DAY 2",
        title: "Fusion Band",
        artist: "The Royal Symphony", // Placeholder
        time: "8:00 PM Onwards",
        image: "/proshows/band.jpg",
        icon: Music2,
        color: "from-blue-500 to-cyan-500"
    },
    {
        day: "DAY 3",
        title: "EDM Night",
        artist: "DJ Nucleya (TBC)", // Placeholder
        time: "9:00 PM Onwards",
        image: "/proshows/edm.jpg",
        icon: Sparkles,
        color: "from-orange-500 to-red-500"
    }
]

export function ProShowsSection() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section id="proshows" ref={containerRef} className="relative overflow-hidden bg-black py-32">
            {/* Background Effects */}
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-maroon/30 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <div className="mb-20 text-center">
                    <h2 className="mb-4 font-display text-5xl font-bold uppercase tracking-widest text-transparent 
                bg-clip-text bg-gradient-to-r from-gold via-cream to-gold md:text-7xl">
                        Technoholix
                    </h2>
                    <p className="font-serif text-lg text-gold/60">Where Technology Meets Culture</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {shows.map((show, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative h-[500px] overflow-hidden rounded-full border border-gold/20 bg-maroon-dark/20"
                        >
                            {/* Floating Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-transform duration-500 group-hover:scale-105">
                                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${show.color} shadow-lg shadow-gold/20`}>
                                    <show.icon className="h-8 w-8 text-white" />
                                </div>

                                <span className="mb-2 font-display text-4xl font-bold text-gold/20">{show.day}</span>
                                <h3 className="mb-2 font-display text-3xl font-bold text-cream">{show.title}</h3>
                                <p className="mb-4 text-xl font-medium text-gold">{show.artist}</p>
                                <p className="rounded-full border border-gold/30 bg-black/40 px-4 py-1 text-xs text-cream/60 backdrop-blur-md">
                                    {show.time}
                                </p>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-maroon/20 to-maroon/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
