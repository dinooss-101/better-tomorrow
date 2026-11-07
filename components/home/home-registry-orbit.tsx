import React from "react"
import { Container, Section, SectionHeading } from "@/components/primitives"
import { CircleCredits } from "@/components/home/circle-credits"

export function HomeRegistryOrbit() {
  return (
    <Section background="muted" border>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="Live Civic Registry"
            title="Orbiting directory of statutory works and student programs."
            lead="Circulating index of AMRUT 2.0 GIS drainage corridors, road upgrades, central scholarships, and Future Labs STEM workshops across 12 wards."
            className="items-center text-center"
          />
        </div>

        {/* Orbiting Ring Stage Console */}
        <div className="relative border border-border/80 bg-card p-6 sm:p-10 shadow-xs">
          {/* Architectural Corner Crop Marks */}
          <span className="absolute -top-1.5 -left-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
            ┌
          </span>
          <span className="absolute -top-1.5 -right-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
            ┐
          </span>
          <span className="absolute -bottom-1.5 -left-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
            └
          </span>
          <span className="absolute -bottom-1.5 -right-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
            ┘
          </span>

          {/* Console Header Bar */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-primary dark:text-emerald-400">
                01 / Statutory Infrastructure Works
              </span>
            </div>
            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-primary dark:text-emerald-400">
              02 / Education &amp; Public Schemes
            </span>
          </div>

          {/* Dynamic GSAP Circle Animation */}
          <div className="py-4 sm:py-6">
            <CircleCredits radius={7} duration={28} />
          </div>

          {/* Console Footer Bar */}
          <div className="flex items-center justify-between border-t border-border/60 pt-3 mt-6 font-ui text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Hover any project to decode encrypted telemetry</span>
            <span>Mayang Imphal AC-23 · LGD 250326</span>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default HomeRegistryOrbit

