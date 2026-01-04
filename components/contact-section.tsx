"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Mail, Instagram, Linkedin, Twitter, Send, Loader2, Check, AlertCircle } from "lucide-react"

const teamLeads = [
  {
    name: "Umme Ateeya",
    role: "Convener",
    phone: "8374285244",
    avatar: "/professional-portrait-gradient.jpg"
  },
  {
    name: "Uday Sameer",
    role: "[ROLE_PLACEHOLDER_2]",
    phone: "6281958181",
    avatar: "/professional-portrait-gradient.jpg",
  },
  {
    name: "Rhutvich Sharma",
    role: "[ROLE_PLACEHOLDER_3]",
    phone: "8500152754",
    avatar: "/professional-portrait-gradient.jpg",
  },
  {
    name: "Parthiv Kondeti",
    role: "[ROLE_PLACEHOLDER_4]",
    phone: "9492099999",
    avatar: "/professional-portrait-gradient.jpg",
  },
  {
    name: "[LEAD_NAME_PLACEHOLDER_5]",
    role: "[ROLE_PLACEHOLDER_5]",
    phone: "[PHONE_PLACEHOLDER_5]",
    email: "[EMAIL_PLACEHOLDER_5]",
    avatar: "/professional-portrait-gradient.jpg",
  },
  {
    name: "[LEAD_NAME_PLACEHOLDER_6]",
    role: "[ROLE_PLACEHOLDER_6]",
    phone: "[PHONE_PLACEHOLDER_6]",
    email: "[EMAIL_PLACEHOLDER_6]",
    avatar: "/professional-portrait-gradient.jpg",
  },
]

function LeadCard({ lead, index }: { lead: (typeof teamLeads)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass rounded-xl border border-gold/30 p-5 transition-all duration-300 hover:border-gold/50"
    >
      <div className="flex items-center gap-4">
        {/* Avatar with gradient border */}
        <div className="relative shrink-0">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-gold to-gold-dark" />
          <img
            src={lead.avatar || "/placeholder.svg"}
            alt={lead.name}
            className="relative h-14 w-14 rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h4 className="font-display text-sm font-semibold tracking-wide text-gold">{lead.name}</h4>
          <p className="text-xs text-cream/60">{lead.role}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <a
          href={`tel:${lead.phone}`}
          className="flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-gold"
        >
          <Phone className="h-4 w-4 text-gold/60" />
          {lead.phone}
        </a>
        <a
          href={`mailto:${lead.email}`}
          className="flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-gold"
        >
          <Mail className="h-4 w-4 text-gold/60" />
          {lead.email}
        </a>
      </div>
    </motion.div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 400 && data.details) {
          const errorMessages = data.details.map((err: { message: string }) => err.message).join(', ')
          setSubmitStatus({ type: 'error', message: errorMessages })
          setIsSubmitting(false)
          return
        }

        // Generic error
        setSubmitStatus({ 
          type: 'error', 
          message: data.error || 'Failed to send message. Please try again.' 
        })
        setIsSubmitting(false)
        return
      }

      // Success
      setSubmitStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' })
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" })
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)
    } catch (error: any) {
      console.error('Contact form error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="glass rounded-xl border border-gold/30 p-6 md:p-8"
    >
      <h3 className="mb-6 font-display text-xl font-semibold tracking-wide text-gold">Quick Contact</h3>

      <div className="space-y-4">
        {[
          { name: "name", label: "Name", type: "text", placeholder: "Your Name" },
          { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
          { name: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
        ].map((field) => (
          <div key={field.name}>
            <label className="mb-1 block font-serif text-sm text-gold/80">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              className="w-full rounded-lg border border-gold/30 bg-input px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
        ))}

        <div>
          <label className="mb-1 block font-serif text-sm text-gold/80">Message</label>
          <textarea
            placeholder="Your message..."
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full resize-none rounded-lg border border-gold/30 bg-input px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
          />
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div
            className={`rounded-lg border p-3 text-sm ${
              submitStatus.type === 'success'
                ? 'border-green-500/50 bg-green-500/10 text-green-400'
                : 'border-red-500/50 bg-red-500/10 text-red-400'
            }`}
          >
            <div className="flex items-center gap-2">
              {submitStatus.type === 'success' ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={isSubmitting ? {} : { scale: 1.02 }}
          whileTap={isSubmitting ? {} : { scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 font-display text-sm tracking-wider text-maroon-dark transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              SENDING...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              SEND MESSAGE
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  )
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="relative overflow-hidden bg-maroon fabric-texture py-24 md:py-32">
      {/* Floating mandala patterns */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23D4AF37' strokeWidth='1'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23D4AF37' strokeWidth='1'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23D4AF37' strokeWidth='1'/%3E%3C/svg%3E")`,
            backgroundSize: "contain",
          }}
        />
      </div>

      {/* Ornate border frame */}
      <div className="absolute inset-8 rounded-3xl border border-gold/20 md:inset-16" />
      <div className="absolute inset-10 rounded-2xl border border-gold/10 md:inset-20" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.2em] text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] md:text-5xl lg:text-6xl">
            CONTACT US
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Team Leads */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6 font-display text-xl font-semibold tracking-wide text-gold"
            >
              Festival Coordinators
            </motion.h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {teamLeads.map((lead, index) => (
                <LeadCard key={lead.name} lead={lead} index={index} />
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <p className="mb-4 font-serif text-sm text-gold/60">Follow us on social media</p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -3 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Contact Form */}
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 border-t border-gold/20 pt-8"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-serif text-sm text-cream/60">© 2026 ERAYA | JNTU Hyderabad</p>

            <div className="flex gap-6">
              {["Privacy Policy", "Terms", "FAQ"].map((link) => (
                <a key={link} href="#" className="font-serif text-sm text-cream/60 transition-colors hover:text-gold">
                  {link}
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {[Instagram, Linkedin, Twitter].map((Icon, index) => (
                <a key={index} href="#" className="text-cream/60 transition-colors hover:text-gold">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </section>
  )
}
