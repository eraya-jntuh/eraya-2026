"use client"

import { useState, Fragment } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Download, Clock, ChevronRight, X, ExternalLink, List } from "lucide-react"
import { MapModal } from "@/components/ui/map-modal"
import { RegistrationForm } from "@/components/registration-form"
import { Dialog, Transition } from "@headlessui/react"

type Event = {
    id: string
    title: string
    subtitle?: string
    time?: string
    description: string
    location: string
    locationDescription: string
    osmLink: string
    coordinates: [number, number]
    pdfPath?: string
    day: 1 | 2
    entryFee: string
}

const events: Event[] = [
    // Day 1
    {
        id: "d1-admaking",
        title: "Ad Making",
        description: "Showcase your creativity by crafting compelling advertisements that capture attention.",
        location: "J Hub",
        locationDescription: "J Hub is located near the campus main entrance, adjacent to the library block.",
        osmLink: "https://www.openstreetmap.org/search?query=J-Hub%20JNTUH",
        coordinates: [17.4938, 78.3920],
        day: 1,
        entryFee: "₹100"
    },
    {
        id: "d1-dance",
        title: "Dance Battles",
        subtitle: "(Elitefeet)",
        description: "Rhythm, energy, and style collide in this epic dance face-off.",
        location: "SIT/Pylon",
        locationDescription: "SIT Auditorium / Pylon Grounds. Follow signs towards the Science & Technology block.",
        osmLink: "https://www.openstreetmap.org/search?query=School%20of%20Information%20Technology%20JNTUH",
        coordinates: [17.4950, 78.3960],
        pdfPath: "/events/Elite feet Competitions.pdf",
        day: 1,
        entryFee: "₹500"
    },
    {
        id: "d1-standup",
        title: "Stand Up",
        description: "Prepare for an evening of laughter and wit with our lineup.",
        location: "Audi",
        locationDescription: "Main Auditorium, central block.",
        osmLink: "https://www.openstreetmap.org/search?query=JNTUH%20Auditorium",
        coordinates: [17.4960, 78.3910],
        day: 1,
        entryFee: "₹200"
    },
    {
        id: "d1-amongus",
        title: "Among Us",
        subtitle: "(Ephemera)",
        description: "Trust no one. Find the imposter before it's too late.",
        location: "J Hub",
        locationDescription: "J Hub is located near the campus main entrance, adjacent to the library block.",
        osmLink: "https://www.openstreetmap.org/search?query=J-Hub%20JNTUH",
        coordinates: [17.4938, 78.3920],
        pdfPath: "/events/Ephemera_Events.pdf",
        day: 1,
        entryFee: "₹100"
    },

    // Day 2
    {
        id: "d2-shortfilm",
        title: "Short Film",
        subtitle: "(Chitrkatha)",
        description: "Stories brought to life on the silver screen.",
        location: "Audi",
        locationDescription: "Main Auditorium, central block.",
        osmLink: "https://www.openstreetmap.org/search?query=JNTUH%20Auditorium",
        coordinates: [17.4960, 78.3910],
        pdfPath: "/events/ChitrKatha.pdf",
        day: 2,
        entryFee: "₹300"
    },
    {
        id: "d2-bob",
        title: "Battle of Bands",
        subtitle: "(BOB)",
        description: "The ultimate musical showdown. Who will rule the stage?",
        location: "Main Stage",
        locationDescription: "Open Air Theatre / Main Stage area.",
        osmLink: "https://www.openstreetmap.org/search?query=JNTUH%20Auditorium", // Fallback to Audi area if main stage not found
        coordinates: [17.4960, 78.3910],
        pdfPath: "/events/Battle of bands.pdf",
        day: 2,
        entryFee: "₹1000"
    },
    {
        id: "d2-esports",
        title: "E Sports",
        description: "Competitive gaming at its finest. May the best team win.",
        location: "SIT",
        locationDescription: "SIT Computer Labs, 2nd Floor.",
        osmLink: "https://www.openstreetmap.org/search?query=School%20of%20Information%20Technology%20JNTUH",
        coordinates: [17.4950, 78.3960],
        day: 2,
        entryFee: "₹200"
    },
    {
        id: "d2-poetry",
        title: "Poetry Slam",
        subtitle: "(Ephemera)",
        description: "Verses that touch the soul, spoken with passion.",
        location: "J Hub",
        locationDescription: "J Hub is located near the campus main entrance, adjacent to the library block.",
        osmLink: "https://www.openstreetmap.org/search?query=J-Hub%20JNTUH",
        coordinates: [17.4938, 78.3920],
        pdfPath: "/events/Ephemera_Events.pdf",
        day: 2,
        entryFee: "₹100"
    }
]

// ... (imports)

export function TimelineSection() {
    const [activeDay, setActiveDay] = useState<1 | 2>(1)
    const [selectedLocation, setSelectedLocation] = useState<{ name: string; coordinates: [number, number] } | null>(null)
    const [isAllEventsOpen, setIsAllEventsOpen] = useState(false)
    const [registrationEvent, setRegistrationEvent] = useState<Event | null>(null)

    const filteredEvents = events.filter((e) => e.day === activeDay)

    return (
        <section id="timeline" className="relative bg-maroon-dark py-24 overflow-hidden">
            {/* ... (background and headers same as before) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-maroon/20 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-display text-4xl font-bold tracking-[0.1em] text-cream md:text-6xl drop-shadow-lg">
                            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">TIMELINE</span>
                        </h2>
                        <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </motion.div>
                </div>

                {/* Day Switcher */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex rounded-full bg-maroon/40 p-1 border border-white/10 backdrop-blur-md shadow-2xl">
                        {[1, 2].map((day) => (
                            <button
                                key={day}
                                onClick={() => setActiveDay(day as 1 | 2)}
                                className={`relative rounded-full px-10 py-3 font-display text-sm font-bold tracking-wider transition-all duration-300 ${activeDay === day
                                    ? "text-maroon-dark shadow-lg scale-105"
                                    : "text-cream/60 hover:text-cream hover:bg-white/5"
                                    }`}
                            >
                                {activeDay === day && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-yellow-400"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">DAY {day} (JAN {day === 1 ? '30' : '31'})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    <AnimatePresence mode="wait">
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1"
                            >
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-display text-2xl font-bold text-cream group-hover:text-gold transition-colors">
                                                {event.title}
                                            </h3>
                                            {event.subtitle && (
                                                <span className="text-sm font-serif italic text-gold/80 block -mt-1 mb-2">
                                                    {event.subtitle}
                                                </span>
                                            )}
                                        </div>
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20 text-gold shadow-inner">
                                            <Calendar className="h-6 w-6" />
                                        </div>
                                    </div>

                                    <p className="text-cream/80 font-serif mb-6 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="mb-6 flex items-center gap-2">
                                        <span className="inline-flex items-center rounded-md bg-gold/10 px-2 py-1 text-xs font-medium text-gold ring-1 ring-inset ring-gold/20">
                                            Entry: {event.entryFee}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-white/10 pt-6">
                                        <button
                                            onClick={() => setSelectedLocation({ name: event.location, coordinates: event.coordinates })}
                                            className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors group/loc"
                                        >
                                            <MapPin className="h-4 w-4" />
                                            <span className="underline decoration-dotted decoration-gold/50 underline-offset-4 group-hover/loc:decoration-gold">
                                                {event.location}
                                            </span>
                                        </button>

                                        <div className="flex gap-2">
                                            {event.pdfPath && (
                                                <a
                                                    href={event.pdfPath}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-maroon-dark transition-all"
                                                    title="Download Brochure"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            )}
                                            <button
                                                onClick={() => setRegistrationEvent(event)}
                                                className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold tracking-wider text-maroon-dark hover:bg-white hover:text-maroon transition-all duration-300 shadow-lg hover:shadow-gold/20"
                                            >
                                                REGISTER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All Events Button */}
                <div className="mt-16 text-center">
                    <button
                        onClick={() => setIsAllEventsOpen(true)}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-maroon px-8 py-4 font-display text-sm font-bold tracking-widest text-cream transition-all hover:bg-maroon-light shadow-lg hover:shadow-gold/20"
                    >
                        <span className="relative z-10">VIEW ALL EVENTS</span>
                        <List className="h-4 w-4 relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                    </button>
                </div>
            </div>

            <MapModal
                isOpen={!!selectedLocation}
                onClose={() => setSelectedLocation(null)}
                locationName={selectedLocation?.name || ""}
                coordinates={selectedLocation?.coordinates}
            />

            {registrationEvent && (
                <RegistrationForm
                    isOpen={!!registrationEvent}
                    onClose={() => setRegistrationEvent(null)}
                    eventName={registrationEvent.title}
                    entryFee={registrationEvent.entryFee}
                />
            )}

            <AllEventsModal
                isOpen={isAllEventsOpen}
                onClose={() => setIsAllEventsOpen(false)}
                onLocationClick={(name, coords) => {
                    setSelectedLocation({ name, coordinates: coords })
                }}
                onRegister={(event) => setRegistrationEvent(event)}
            />
        </section>
    )
}

function AllEventsModal({ isOpen, onClose, onLocationClick, onRegister }: { isOpen: boolean; onClose: () => void; onLocationClick: (name: string, coords: [number, number]) => void; onRegister: (event: Event) => void }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[60]" onClose={onClose}>
                {/* ... (backdrop same as before) */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-maroon-dark/90 backdrop-blur-md" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-[#1a0505] border border-gold/20 p-8 text-left shadow-2xl transition-all">
                                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                    <Dialog.Title className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream to-gold">
                                        ALL EVENTS
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 text-gold/60 hover:bg-gold/10 hover:text-gold transition-colors"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 text-gold/60 font-display text-sm tracking-widest uppercase">
                                                <th className="py-4 px-4">Event Name</th>
                                                <th className="py-4 px-4">Day</th>
                                                <th className="py-4 px-4">Location</th>
                                                <th className="py-4 px-4">Fee</th>
                                                <th className="py-4 px-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-cream/80 font-serif">
                                            {events.map((event) => (
                                                <tr key={event.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-4 px-4 font-semibold text-lg">
                                                        {event.title}
                                                        {event.subtitle && <span className="block text-xs text-white/40 font-normal italic">{event.subtitle}</span>}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${event.day === 1 ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
                                                            Day {event.day}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <button
                                                            onClick={() => onLocationClick(event.location, event.coordinates)}
                                                            className="flex items-center gap-2 group/pin hover:text-gold transition-colors text-left"
                                                            title="View on Campus Map"
                                                        >
                                                            <MapPin className="h-4 w-4 text-gold/60 group-hover/pin:text-gold" />
                                                            {event.location}
                                                            <ExternalLink className="h-3 w-3 opacity-0 group-hover/pin:opacity-100 transition-opacity" />
                                                        </button>
                                                    </td>
                                                    <td className="py-4 px-4 text-gold/80 font-mono">
                                                        {event.entryFee}
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <div className="flex justify-end gap-3 items-center">
                                                            {event.pdfPath && (
                                                                <a
                                                                    href={event.pdfPath}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-gold/60 hover:text-gold transition-colors"
                                                                    title="Download Brochure"
                                                                >
                                                                    <Download className="h-5 w-5" />
                                                                </a>
                                                            )}
                                                            <button
                                                                onClick={() => onRegister(event)}
                                                                className="rounded-full bg-gold/10 px-4 py-2 text-xs font-bold text-gold hover:bg-gold hover:text-maroon-dark transition-all"
                                                            >
                                                                REGISTER
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
