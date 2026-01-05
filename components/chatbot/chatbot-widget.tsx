"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Bot, ChevronDown, User, Sparkles } from "lucide-react"

// Simple RAG Stub: Knowledge Base
const KNOWLEDGE_BASE = [
    { keywords: ["register", "signup", "join"], answer: "You can register for events by clicking the 'Register' button in the Events section. We accept payments via Razorpay (UPI, Cards)." },
    { keywords: ["price", "cost", "fee", "entry"], answer: "Entry fees vary by event. Tech Quiz is ₹50, Hackathon is ₹200. Check the specific event card for details." },
    { keywords: ["date", "when", "time"], answer: "Eraya 2026 is happening from March 15th to March 19th, 2026. The schedule is packed with events!" },
    { keywords: ["location", "venue", "where"], answer: "The fest is held at JNTU Hyderabad campus. Key venues include the Main Auditorium and Engineering Block B." },
    { keywords: ["workshop", "learn"], answer: "We have workshops on AI, Cloud, Cybersec, and more. Check the 'Workshops' section." },
    { keywords: ["proshow", "concert", "singer", "star"], answer: "Technoholix features Comedy Night, a Fusion Band, and an EDM Night. Don't miss the pro-shows!" },
    { keywords: ["contact", "help", "support"], answer: "You can reach us via the Contact section or email us at support@eraya.org." },
]

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: "bot" | "user"; content: string }[]>([
        { role: "bot", content: "Hi! I'm Maya, your Eraya guide. Ask me about events, workshops, or navigation!" },
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = input.trim()
        setMessages((prev) => [...prev, { role: "user", content: userMessage }])
        setInput("")
        setIsTyping(true)

        // Simulate RAG / AI processing delay
        setTimeout(() => {
            const lowerInput = userMessage.toLowerCase()
            let botResponse = "I'm not sure about that. Try asking about events, fees, or dates!"

            // Simple Keyword Matching (RAG Stub)
            const match = KNOWLEDGE_BASE.find(item => item.keywords.some(k => lowerInput.includes(k)))
            if (match) {
                botResponse = match.answer
            }

            // Navigation Logic
            if (lowerInput.includes("take me to") || lowerInput.includes("go to") || lowerInput.includes("navigate to")) {
                if (lowerInput.includes("event") || lowerInput.includes("competit")) {
                    botResponse = "Sure! Taking you to the Events section."
                    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
                } else if (lowerInput.includes("workshop")) {
                    botResponse = "Focusing on Workshops now."
                    document.getElementById("workshops")?.scrollIntoView({ behavior: "smooth" })
                } else if (lowerInput.includes("contact")) {
                    botResponse = "Scrolling down to Contact info."
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                } else if (lowerInput.includes("sponsor")) {
                    botResponse = "Here are our sponsors."
                    document.getElementById("sponsors")?.scrollIntoView({ behavior: "smooth" })
                } else if (lowerInput.includes("exhibition") || lowerInput.includes("tech")) {
                    botResponse = "Check out these innovations!"
                    document.getElementById("exhibitions")?.scrollIntoView({ behavior: "smooth" })
                } else if (lowerInput.includes("pro") || lowerInput.includes("show") || lowerInput.includes("dance")) {
                    botResponse = "Let's party! Taking you to Pro-Shows."
                    document.getElementById("proshows")?.scrollIntoView({ behavior: "smooth" })
                }
            }

            setMessages((prev) => [...prev, { role: "bot", content: botResponse }])
            setIsTyping(false)
        }, 1000)
    }

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="mb-4 flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl border border-gold/40 bg-maroon-dark/95 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-96"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-gold/20 bg-maroon/50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/30">
                                        <Bot className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-gold">Maya AI</h3>
                                        <p className="text-xs text-cream/60 flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-1 text-gold/60 hover:bg-gold/10 hover:text-gold"
                                >
                                    <ChevronDown className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                                                    ? "bg-gold text-maroon-dark rounded-br-none font-medium"
                                                    : "bg-white/10 text-cream rounded-bl-none border border-gold/10"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-1 rounded-2xl bg-white/10 px-4 py-3 rounded-bl-none border border-gold/10">
                                            <span className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce delay-100" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce delay-200" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSend} className="border-t border-gold/20 bg-maroon/30 p-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about events, fees..."
                                        className="w-full rounded-full border border-gold/30 bg-black/40 px-4 py-3 pr-12 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gold p-2 text-maroon-dark transition-all hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="mt-2 text-center text-[10px] text-cream/30">AI can make mistakes. Check important info.</p>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:bg-gold-light"
                >
                    {isOpen ? <X className="h-6 w-6 text-maroon-dark" /> : <Sparkles className="h-6 w-6 text-maroon-dark" />}
                </motion.button>
            </div>
        </>
    )
}
