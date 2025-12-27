"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft, ArrowRight, Copy, Check, QrCode, Loader2 } from "lucide-react"

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  entryFee: string
}

export function RegistrationForm({ isOpen, onClose, eventName, entryFee }: RegistrationFormProps) {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    branch: "",
    transactionId: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setStep(1)
      setShowSuccess(false)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Invalid phone number"
    if (!formData.college.trim()) newErrors.college = "College is required"
    if (!formData.year) newErrors.year = "Year is required"
    if (!formData.branch.trim()) newErrors.branch = "Branch is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("[UPI_ID_PLACEHOLDER]")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.transactionId.trim()) {
      setErrors({ transactionId: "Transaction ID is required" })
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const inputClasses =
    "w-full rounded-lg border border-gold/30 bg-input px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-[9999] flex items-center justify-center overflow-y-auto md:inset-8"
          >
            <div className="glass relative w-full max-w-lg rounded-2xl border-2 border-gold/40 bg-maroon-dark/95 p-6 md:p-8">
              {/* Corner decorations */}
              <div className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-gold/50 rounded-tl-2xl" />
              <div className="absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-gold/50 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-gold/50 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-gold/50 rounded-br-2xl" />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute right-4 top-4 text-gold transition-colors hover:text-gold-light"
              >
                <X className="h-5 w-5" />
              </motion.button>

              {/* Success State */}
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-bold text-gold">Registration Successful!</h3>
                  <p className="mb-6 text-cream/70">You have successfully registered for {eventName}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="rounded-lg bg-gold px-8 py-3 font-display text-sm tracking-wider text-maroon-dark"
                  >
                    CLOSE
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {/* Progress Indicator */}
                  <div className="mb-6 flex items-center justify-center gap-2">
                    <div className={`h-2 w-2 rounded-full transition-colors ${step >= 1 ? "bg-gold" : "bg-gold/30"}`} />
                    <div className={`h-0.5 w-8 transition-colors ${step >= 2 ? "bg-gold" : "bg-gold/30"}`} />
                    <div className={`h-2 w-2 rounded-full transition-colors ${step >= 2 ? "bg-gold" : "bg-gold/30"}`} />
                  </div>
                  <p className="mb-6 text-center font-serif text-sm text-gold/60">Step {step} of 2</p>

                  {/* Form Title */}
                  <h3 className="mb-6 text-center font-display text-xl font-bold text-gold">
                    Register for {eventName}
                  </h3>

                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.form
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="mb-1 block font-serif text-sm text-gold/80">Full Name</label>
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className={inputClasses}
                          />
                          {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
                        </div>

                        <div>
                          <label className="mb-1 block font-serif text-sm text-gold/80">Email</label>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputClasses}
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="mb-1 block font-serif text-sm text-gold/80">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={inputClasses}
                          />
                          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                        </div>

                        <div>
                          <label className="mb-1 block font-serif text-sm text-gold/80">College/University</label>
                          <input
                            type="text"
                            placeholder="Your college name"
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            className={inputClasses}
                          />
                          {errors.college && <p className="mt-1 text-xs text-red-400">{errors.college}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1 block font-serif text-sm text-gold/80">Year of Study</label>
                            <select
                              value={formData.year}
                              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                              className={inputClasses}
                            >
                              <option value="">Select Year</option>
                              <option value="1st">1st Year</option>
                              <option value="2nd">2nd Year</option>
                              <option value="3rd">3rd Year</option>
                              <option value="4th">4th Year</option>
                              <option value="pg">Postgrad</option>
                            </select>
                            {errors.year && <p className="mt-1 text-xs text-red-400">{errors.year}</p>}
                          </div>

                          <div>
                            <label className="mb-1 block font-serif text-sm text-gold/80">Branch</label>
                            <input
                              type="text"
                              placeholder="CSE, ECE, etc."
                              value={formData.branch}
                              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                              className={inputClasses}
                            />
                            {errors.branch && <p className="mt-1 text-xs text-red-400">{errors.branch}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block font-serif text-sm text-gold/80">Competition</label>
                          <input type="text" value={eventName} disabled className={`${inputClasses} opacity-60`} />
                        </div>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNext}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 font-display text-sm tracking-wider text-maroon-dark transition-all hover:bg-gold-light"
                        >
                          NEXT
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        {/* Summary */}
                        <div className="rounded-lg border border-gold/30 bg-maroon/50 p-4">
                          <h4 className="mb-3 font-display text-sm font-semibold text-gold">Registration Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-cream/60">Event</span>
                              <span className="text-cream">{eventName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-cream/60">Entry Fee</span>
                              <span className="font-semibold text-gold">{entryFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-cream/60">Participant</span>
                              <span className="text-cream">{formData.fullName}</span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Section */}
                        <div>
                          <h4 className="mb-4 font-display text-lg font-semibold text-gold">Complete Payment</h4>

                          <div className="grid grid-cols-2 gap-4">
                            {/* UPI ID */}
                            <div className="rounded-lg border border-gold/30 bg-maroon/50 p-4">
                              <p className="mb-2 font-serif text-xs text-gold/60">UPI ID</p>
                              <div className="flex items-center gap-2">
                                <code className="text-sm text-cream">[UPI_ID_PLACEHOLDER]</code>
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={handleCopyUPI}
                                  className="text-gold"
                                >
                                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </motion.button>
                              </div>
                            </div>

                            {/* QR Code */}
                            <div className="flex flex-col items-center rounded-lg border border-gold/30 bg-maroon/50 p-4">
                              <QrCode className="mb-2 h-12 w-12 text-gold/60" />
                              <p className="font-serif text-xs text-gold/60">Scan QR Code</p>
                            </div>
                          </div>

                          <p className="mt-4 text-center font-serif text-xs text-cream/60">
                            Scan QR code or use UPI ID to complete payment
                          </p>
                        </div>

                        {/* Transaction ID */}
                        <div>
                          <label className="mb-1 block font-serif text-sm text-gold/80">Transaction ID</label>
                          <input
                            type="text"
                            placeholder="Enter transaction ID after payment"
                            value={formData.transactionId}
                            onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                            className={inputClasses}
                          />
                          {errors.transactionId && <p className="mt-1 text-xs text-red-400">{errors.transactionId}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(1)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gold/50 py-3 font-display text-sm tracking-wider text-gold transition-all hover:bg-gold/10"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            BACK
                          </motion.button>

                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold py-3 font-display text-sm tracking-wider text-maroon-dark transition-all hover:bg-gold-light disabled:opacity-60"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                SUBMITTING...
                              </>
                            ) : (
                              "CONFIRM REGISTRATION"
                            )}
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
