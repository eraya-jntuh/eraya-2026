"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { X, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

interface QRModalProps {
    isOpen: boolean
    onClose: () => void
    eventName: string
    qrImage?: string
    registerLink?: string
}

export function QRModal({ isOpen, onClose, eventName, qrImage, registerLink }: QRModalProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        if (registerLink) {
            navigator.clipboard.writeText(registerLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border-2 border-gold/40 bg-maroon-dark/95 p-6 text-left align-middle shadow-xl transition-all">

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-4 rounded-full p-1 text-gold/60 transition-colors hover:bg-gold/10 hover:text-gold"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <Dialog.Title
                                    as="h3"
                                    className="mb-6 text-center font-display text-xl font-bold leading-6 text-gold"
                                >
                                    Scan to Register for {eventName}
                                </Dialog.Title>

                                <div className="mt-2 flex flex-col items-center gap-6">
                                    {/* QR Code Container */}
                                    <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-white p-2 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                        {qrImage ? (
                                            <img
                                                src={qrImage}
                                                alt={`${eventName} QR Code`}
                                                className="h-64 w-64 object-contain"
                                            />
                                        ) : (
                                            <div className="flex h-64 w-64 items-center justify-center bg-gray-100 text-gray-400">
                                                <span className="text-sm">QR Code Not Available</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                                    {/* Link Container */}
                                    {registerLink && (
                                        <div className="w-full space-y-2">
                                            <p className="text-center font-serif text-sm text-gold/80">
                                                Or use the direct link
                                            </p>
                                            <div className="flex items-center gap-2 rounded-lg border border-gold/20 bg-black/20 p-2">
                                                <div className="flex-1 truncate text-xs text-cream/70 font-mono pl-2">
                                                    {registerLink}
                                                </div>
                                                <button
                                                    onClick={handleCopy}
                                                    className="rounded p-1.5 text-gold hover:bg-gold/10 transition-colors"
                                                    title="Copy Link"
                                                >
                                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                </button>
                                                <a
                                                    href={registerLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded p-1.5 text-gold hover:bg-gold/10 transition-colors"
                                                    title="Open Link"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-center text-xs text-cream/40 px-4">
                                        Scan the QR code with your phone camera or click the link to proceed with registration.
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
