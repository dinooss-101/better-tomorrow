import React from "react"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react"

export function PoliticianStatement() {
  const pledges = [
    "Open door grievance hearings every Saturday morning.",
    "Decoupled reporting: honest ground condition on every public work.",
    "Strict DPDP compliance: zero data harvesting from students.",
  ]

  return (
    <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28" id="mandate">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Editorial Portrait Placeholder */}
          <div className="lg:col-span-5">
            <div className="max-w-xs sm:max-w-sm mx-auto">
              <ImagePlaceholder
                aspectRatio="4/5"
                src="/image/Leadership_Portrait.png"
                alt="Leadership portrait: candidate in community dialogue with ward residents, Mayang Imphal"
                category="Leadership Portrait"
                location="Mayang Imphal Central"
                title="Candidate in community dialogue with ward residents"
                hint="1200 × 1500 · 4:5 Editorial Portrait"
                priority
              />
              <p className="mt-2.5 text-[11px] text-muted-foreground text-center">
                Press &amp; gazette publication archive
              </p>
            </div>
          </div>

          {/* Clean, Non-Text-Heavy Statement */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <blockquote className="font-headline text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground leading-[1.24] tracking-tight">
              &ldquo;Public service is not a trophy of power. It is a quiet, daily accounting to every household in Mayang Imphal.&rdquo;
            </blockquote>

            <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
              We offer our community a governance model built on transparency, technical competence, and regular presence across all 12 municipal wards.
            </p>

            <Separator className="my-6" />

            {/* Three Airy Pledges */}
            <div className="flex flex-col gap-3">
              {pledges.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="flex size-4 shrink-0 items-center justify-center border border-secondary/40 bg-secondary/10 text-secondary">
                    <Check className="size-2.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
              <div>
                <div className="font-headline text-base font-semibold text-foreground">
                  Representative Candidate
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Mayang Imphal Constituency (AC-23)
                </div>
              </div>
              <span className="border border-border/80 px-2.5 py-1 text-[11px] text-muted-foreground">
                Affidavit Audited
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
