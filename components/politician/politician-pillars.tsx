import React from "react"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PoliticianPillars() {
  const pillars = [
    {
      num: "01",
      title: "Mayang Imphal Future Labs & Youth STEM",
      description:
        "Equipping every high school student with computational and electronics literacy in direct synergy with NITI Aayog Atal Tinkering Labs (ATL).",
      category: "Education Policy",
      imageLocation: "Mayang Imphal High Schools",
      imageTitle: "Students testing prototype microcontroller circuits and telemetry sensors",
      imageHint: "1200 × 900 · 4:3 Lab Workshop",
      href: "/future-labs",
    },
    {
      num: "02",
      title: "Loktak Basin & Agrarian Ecology",
      description:
        "Modernizing farming through solar-powered canal irrigation and protecting wetland bio-reserves while expanding Bengoon handloom export markets.",
      category: "Livelihoods & Ecology",
      imageLocation: "Kokchai & Bengoon",
      imageTitle: "Reviewing solar canal pump installations with local water user groups",
      imageHint: "1200 × 900 · 4:3 Agrarian Review",
      href: "/progress",
    },
    {
      num: "03",
      title: "AMRUT 2.0 GIS Master Plan 2045",
      description:
        "Class-III statutory town planning covering ~70 sq km. Enforcing arterial drainage surveys and flood-resistant zoning before concrete works begin.",
      category: "Urban Infrastructure",
      imageLocation: "Town Planning Cell",
      imageTitle: "Joint review of GIS contour drainage runoff models with municipal planners",
      imageHint: "1200 × 900 · 4:3 Technical Session",
      href: "/development",
    },
  ]

  return (
    <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28" id="pillars">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="font-headline text-2xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Three pillars for a resilient Mayang Imphal.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Focused, measurable commitments for our youth, agrarian families, and municipal planning.
          </p>
        </div>

        {/* Spacious, Non-Overcrowded Cards */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {pillars.map((p, idx) => {
            const isReversed = idx % 2 === 1
            return (
              <div
                key={p.num}
                className="grid gap-8 lg:grid-cols-12 lg:gap-14 items-center"
              >
                {/* Visual Image Placeholder Column */}
                <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="border border-border bg-card p-2.5 shadow-xs">
                    <ImagePlaceholder
                      aspectRatio="16/9"
                      category={p.category}
                      location={p.imageLocation}
                      title={p.imageTitle}
                      hint={p.imageHint}
                    />
                  </div>
                </div>

                {/* Clean, Airy Copy Column */}
                <div className={`flex flex-col justify-center lg:col-span-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                  <span className="text-xs font-bold text-secondary mb-2">
                    Priority {p.num}
                  </span>

                  <h3 className="font-headline text-xl sm:text-2xl font-semibold text-foreground tracking-tight mb-3">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <div>
                    <Link
                      href={p.href}
                      className="inline-flex items-center gap-1.5 py-2.5 min-h-11 text-xs font-semibold text-foreground hover:text-secondary focus-visible:outline-2 focus-visible:outline-secondary transition-colors"
                    >
                      <span>Explore details</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
