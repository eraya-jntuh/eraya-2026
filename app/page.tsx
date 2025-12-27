import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { FloatingRegisterButton } from "@/components/floating-register-button"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <ContactSection />
      <FloatingRegisterButton />
    </main>
  )
}
