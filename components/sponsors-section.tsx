"use client"

import { motion } from "framer-motion"

const sponsors = [
    { name: "Tech Giant 1", tier: "Title Sponsor", logo: "https://via.placeholder.com/200x100?text=TITLE+SPONSOR" },
    { name: "Bank Partner", tier: "Powered By", logo: "https://via.placeholder.com/200x100?text=POWERED+BY" },
    { name: "Code Corp", tier: "Associate Sponsor", logo: "https://via.placeholder.com/150x80?text=ASSOCIATE" },
    { name: "Future Systems", tier: "Associate Sponsor", logo: "https://via.placeholder.com/150x80?text=ASSOCIATE" },
    { name: "Media House", tier: "Media Partner", logo: "https://via.placeholder.com/150x80?text=MEDIA" },
    { name: "Beverage Co", tier: "Refreshment Partner", logo: "https://via.placeholder.com/150x80?text=REFRESHMENT" },
]

export function SponsorsSection() {
    return (
        <section id="sponsors" className="relative bg-cream py-24">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" /> {/* Texture */}

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl font-bold tracking-[0.1em] text-maroon md:text-5xl">
                        OUR <span className="text-gold-dark">PARTNERS</span>
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-24 bg-maroon" />
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {sponsors.map((sponsor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ grayscale: 0, scale: 1.05 }}
                            className="flex h-32 w-64 items-center justify-center rounded-xl bg-white p-6 shadow-md grayscale transition-all duration-300 hover:shadow-xl"
                        >
                            {/* 
                           In a real app, use next/image. 
                           For now using text/placeholder divs to avoid broken images if placeholders fail 
                        */}
                            <div className="text-center">
                                <h4 className="font-display text-lg font-bold text-maroon-dark">{sponsor.name}</h4>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">{sponsor.tier}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="mb-6 font-serif text-maroon-dark/70">Interested in partnering with Eraya 2026?</p>
                    <button className="rounded-full bg-maroon px-8 py-3 font-display text-sm font-semibold tracking-wider text-cream transition-colors hover:bg-maroon-dark">
                        BECOME A SPONSOR
                    </button>
                </div>
            </div>
        </section>
    )
}
