"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X, MapPin } from "lucide-react"
import { MapBox } from "@/components/map/map-box"

interface MapModalProps {
    isOpen: boolean
    onClose: () => void
    locationName: string
    coordinates?: [number, number]
}

export function MapModal({ isOpen, onClose, locationName, coordinates }: MapModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
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
                            <Dialog.Panel className="w-full max-w-5xl h-[80vh] transform overflow-hidden rounded-2xl bg-[#1a0505] border border-gold/20 p-6 text-left shadow-2xl transition-all flex flex-col">
                                <div className="flex justify-between items-center mb-4 shrink-0">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cream to-gold flex items-center gap-2"
                                    >
                                        <MapPin className="h-6 w-6 text-gold" />
                                        NAVIGATE TO: <span className="text-gold">{locationName}</span>
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 text-gold/60 hover:bg-gold/10 hover:text-gold transition-colors"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="flex-1 w-full rounded-xl overflow-hidden border border-white/10 relative">
                                    {/* Map Container */}
                                    {coordinates ? (
                                        <MapBox targetLocation={coordinates} targetName={locationName} />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-white/50">
                                            Location coordinates not available
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 shrink-0 text-center">
                                    <p className="text-cream/60 text-sm font-serif">
                                        <span className="text-gold">Tip:</span> Allow location access to see your current position on the campus map.
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
