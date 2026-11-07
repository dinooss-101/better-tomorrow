import React from "react"
import Link from "next/link"
import { MapPin, Clock, Mail, ShieldCheck, ArrowRight } from "lucide-react"
import { Container, Section, TextLink } from "@/components/primitives"

export function HomeContactPanel() {
  return (
    <Section border={false}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 lg:col-span-7">
            <p className="font-ui text-xs font-semibold tracking-wider text-primary uppercase dark:text-emerald-400">
              Constituency Desk &amp; Transparency
            </p>
            <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-foreground uppercase sm:text-3xl lg:text-4xl">
              Open grievance desk and direct citizen inquiry.
            </h2>
            <p className="max-w-xl font-sans text-xs leading-relaxed font-normal text-muted-foreground sm:text-sm">
              Public service begins with presence. We maintain regular physical
              office hours every Saturday morning for constituent inquiries,
              municipal feedback, and scholarship guidance.
            </p>

            <div className="space-y-2.5 pt-2 font-sans text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 shrink-0 text-primary dark:text-emerald-400" />
                <span>Central Bazaar Corridor, Mayang Imphal, Manipur</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 shrink-0 text-primary dark:text-emerald-400" />
                <span>Every Saturday: 08:30 AM to 12:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 shrink-0 text-primary dark:text-emerald-400" />
                <span>desk@bettermayangimphal.org</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 shrink-0 text-primary dark:text-emerald-400" />
                <span>
                  DPDP Act 2025 compliant · Confidential or anonymous options
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/contact"
                className="inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-5 py-2 font-ui text-xs font-semibold tracking-widest text-primary-foreground uppercase transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span>Contact Desk</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-10 items-center justify-center gap-2 border border-border bg-card px-5 py-2 font-ui text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span>Disclosures</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4 border border-border bg-card p-6 lg:col-span-5">
            <span className="block font-ui text-xs font-semibold tracking-wider text-primary uppercase dark:text-emerald-400">
              STATUTORY NOTICE
            </span>
            <h3 className="font-display text-base font-bold tracking-tight text-foreground uppercase">
              Citizen Participation in Town Planning
            </h3>
            <p className="font-sans text-xs leading-relaxed text-muted-foreground">
              Under the Manipur Town &amp; Country Planning Act and AMRUT 2.0
              guidelines, draft GIS master maps are published for mandatory
              60-day public objection and suggestion windows before gazette
              notification.
            </p>
            <div className="pt-2">
              <TextLink href="/about#statutory">
                Legal Boundaries
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
