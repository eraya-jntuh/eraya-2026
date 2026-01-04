import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { ContactSection } from "@/components/contact-section"
import { FloatingRegisterButton } from "@/components/floating-register-button"
import SponsorsSection from "@/components/sponsors-section"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <SponsorsSection />
      <ContactSection />
      <FloatingRegisterButton />
    </main>
  )
}
