"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Radio, Calendar, MapPin, ArrowRight } from "lucide-react"

// Define a simplified Event type for the ticker
interface TickerEvent {
    id: string
    title: string
    location: string
    startTime: Date // Date object for comparison
    endTime: Date
    status: "live" | "upcoming"
}

// Mock data - In a real app, this would come from the database or props
// For 2026, we can't really show "Live" unless we fake the current date 
// or set these to the actual future dates and show "Upcoming".
// To demonstrate the "Live" feature for the user NOW, I will use dates that mimic "Now" 
// if I were demoing, but for production code, I should use the real Feb 2026 dates.
// However, the user wants to see "which event is going at right now". 
// Since Feb 2026 is in the future, nothing is "live". 
// I will implement logic to show the *next* upcoming event or a "Demo Live" event if requested.
// For now, I'll implement the strict logic: checks current system time against Feb 26-27, 2026.
// It will likely show nothing or "See Schedule" unless we are in Feb 2026.

// Wait, strictly speaking, if I ship this, it will be empty until 2026.
// Maybe I should hide it if no event is live? Yes.
// But to verify it works, I might need a "demo" flag.

export function LiveEventTicker() {
    const [currentEvent, setCurrentEvent] = useState<TickerEvent | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Hardcoded schedule for Feb 26-27, 2026
        // We'll define start/end times here.
        const eventsConfig = [
            {
                id: "d1-inauguration",
                title: "Inauguration Ceremony",
                location: "Main Auditorium",
                start: "2026-02-26T09:00:00",
                end: "2026-02-26T11:00:00"
            },
            {
                id: "d1-hackathon",
                title: "Hackathon Kickoff",
                location: "J Hub",
                start: "2026-02-26T11:00:00",
                end: "2026-02-27T11:00:00" // 24 hours
            },
            {
                id: "d1-dance",
                title: "Dance Battles",
                location: "SIT/Pylon",
                start: "2026-02-26T14:00:00",
                end: "2026-02-26T18:00:00"
            },
            {
                id: "d1-standup",
                title: "Stand Up Comedy",
                location: "Main Auditorium",
                start: "2026-02-26T18:00:00",
                end: "2026-02-26T20:00:00"
            },
            {
                id: "d2-concert",
                title: "Pro Show Concert",
                location: "Open Air Theatre",
                start: "2026-02-27T19:00:00",
                end: "2026-02-27T22:00:00"
            }
        ]

        const checkLiveEvent = () => {
            const now = new Date()
            // For demo/testing purposes, you might uncomment this to force a date
            // const now = new Date("2026-02-26T10:00:00") 

            const live = eventsConfig.find(e => {
                const start = new Date(e.start)
                const end = new Date(e.end)
                return now >= start && now <= end
            })

            if (live) {
                setCurrentEvent({
                    id: live.id,
                    title: live.title,
                    location: live.location,
                    startTime: new Date(live.start),
                    endTime: new Date(live.end),
                    status: "live"
                })
                setIsVisible(true)
            } else {
                // Optional: Show next upcoming event?
                // The request asked for "which event is going at right now".
                // If none, we might hide.
                setIsVisible(false)
                setCurrentEvent(null)
            }
        }

        checkLiveEvent()
        const interval = setInterval(checkLiveEvent, 60000) // Check every minute
        return () => clearInterval(interval)
    }, [])

    if (!isVisible || !currentEvent) return null

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-none"
        >
            <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-red-500/30 bg-black/80 p-2 pr-6 shadow-2xl backdrop-blur-md">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                    <div className="absolute h-full w-full rounded-full bg-red-500 opacity-20 animate-ping" />
                    <Radio className="h-5 w-5 text-red-500" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">HAPPENING NOW</span>
                        <span className="h-1 w-1 rounded-full bg-cream/30" />
                        <span className="truncate text-xs text-cream/60">{currentEvent.location}</span>
                    </div>
                    <div className="font-display text-sm font-bold text-cream truncate">
                        {currentEvent.title}
                    </div>
                </div>

                <a
                    href="#timeline"
                    className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-maroon-dark transition-colors"
                    title="View in Timeline"
                >
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </motion.div>
    )
}
