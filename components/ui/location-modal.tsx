"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X, MapPin } from "lucide-react"

interface LocationModalProps {
    isOpen: boolean
    onClose: () => void
    locationName: string
    locationDescription: string
}

export function LocationModal({ isOpen, onClose, locationName, locationDescription }: LocationModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-maroon-dark/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-cream p-6 text-left align-middle shadow-xl transition-all border border-gold/30">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-display font-bold text-maroon-dark flex items-center gap-2"
                                    >
                                        <MapPin className="h-5 w-5 text-gold-dark" />
                                        {locationName}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1 text-maroon-dark hover:bg-maroon/10 transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm text-maroon/80 font-serif">
                                        {locationDescription}
                                    </p>
                                </div>

                                <div className="mt-6 aspect-video bg-maroon/5 rounded-lg border border-gold/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                        {/* Abstract map pattern */}
                                        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#grid)" className="text-maroon" />
                                        </svg>
                                    </div>
                                    <span className="text-maroon font-semibold font-display relative z-10">JNTU College Map Visualization</span>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-xs text-maroon/60 italic">Interactive map coming soon</p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
