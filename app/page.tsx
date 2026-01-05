import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TimelineSection } from "@/components/timeline-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { ContactSection } from "@/components/contact-section"
import { FloatingRegisterButton } from "@/components/floating-register-button"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"

export default function Home() {
  return (
    <main className="min-h-screen bg-maroon text-cream selection:bg-gold selection:text-maroon">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SponsorsSection />
      <ContactSection />
      <FloatingRegisterButton />
      <ChatbotWidget />
    </main>
  )
}
