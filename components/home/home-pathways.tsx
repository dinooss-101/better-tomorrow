import React from "react"
import Image from "next/image"
import { Layers, CheckCircle2, GraduationCap } from "lucide-react"
import { Container, Section, SectionHeading, TextLink } from "@/components/primitives"

export function HomePathways() {
  return (
    <Section background="muted" border>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Core Focus Areas"
              title="Three pillars for sustainable town development."
              lead="Grounded planning and decoupled public accountability for our households, agrarian families, and students."
            />
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm border border-border/80 bg-card p-2.5 shadow-xs">
              <div className="relative aspect-square w-full overflow-hidden bg-muted/20">
                <Image
                  src="/image/loktak-wetland-ecology.png"
                  alt="Agrarian waterways and Loktak basin ecology in Mayang Imphal"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2 border-t border-border/40 pt-1.5 text-center text-[11px] font-sans text-muted-foreground uppercase tracking-wider">
                Loktak Basin Agrarian Hydrology · Mayang Imphal
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Pathway 1 */}
          <div className="flex flex-col justify-between border-t border-primary/40 dark:border-emerald-500/40 pt-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-ui font-semibold uppercase tracking-wider text-primary dark:text-emerald-400">
                <Layers className="size-4" />
                <span>01 / URBAN PLANNING</span>
              </div>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground leading-snug">
                AMRUT 2.0 Master Plan 2045
              </h3>
              <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
                Class-III statutory town planning covering ~70 sq km. Enforcing arterial drainage surveys and flood-resistant zoning before concrete works begin.
              </p>
            </div>
            <div className="mt-6">
              <TextLink href="/development">Planning Specs</TextLink>
            </div>
          </div>

          {/* Pathway 2 */}
          <div className="flex flex-col justify-between border-t border-primary/40 dark:border-emerald-500/40 pt-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-ui font-semibold uppercase tracking-wider text-primary dark:text-emerald-400">
                <CheckCircle2 className="size-4" />
                <span>02 / ACCOUNTABILITY</span>
              </div>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground leading-snug">
                Decoupled Civic Tracker
              </h3>
              <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
                Independent ground verification logs tracking physical execution against administrative sanctions across roads, culverts, and waterworks.
              </p>
            </div>
            <div className="mt-6">
              <TextLink href="/progress">Active Projects</TextLink>
            </div>
          </div>

          {/* Pathway 3 */}
          <div className="flex flex-col justify-between border-t border-primary/40 dark:border-emerald-500/40 pt-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-ui font-semibold uppercase tracking-wider text-primary dark:text-emerald-400">
                <GraduationCap className="size-4" />
                <span>03 / EDUCATION &amp; STEM</span>
              </div>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground leading-snug">
                Scholarships &amp; Future Labs
              </h3>
              <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
                Verified central and state scholarship directory alongside community Atal Tinkering Labs (ATL) electronics and computer literacy workshops.
              </p>
            </div>
            <div className="mt-6">
              <TextLink href="/scholarships">Scholarships</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

