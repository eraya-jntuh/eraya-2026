export default function SponsorsSection() {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Sponsors
          </h2>
  
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            We are grateful to our sponsors for supporting Eraya 2026 and
            making this cultural fest possible.
          </p>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Sponsor Logo Placeholder */}
            <div className="border rounded-lg p-6 flex items-center justify-center h-28">
              <span className="text-muted-foreground">Sponsor Logo</span>
            </div>
  
            <div className="border rounded-lg p-6 flex items-center justify-center h-28">
              <span className="text-muted-foreground">Sponsor Logo</span>
            </div>
  
            <div className="border rounded-lg p-6 flex items-center justify-center h-28">
              <span className="text-muted-foreground">Sponsor Logo</span>
            </div>
  
            <div className="border rounded-lg p-6 flex items-center justify-center h-28">
              <span className="text-muted-foreground">Sponsor Logo</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
  