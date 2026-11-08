import React from "react"
import Link from "next/link"
import { Calendar, MapPin, Building2, ArrowRight } from "lucide-react"
import { Container, Section, SectionHeading, TextLink, StatusLabel } from "@/components/primitives"
import { ProjectRecord } from "@/lib/types/project"

interface HomeLedgerProps {
  projects: ProjectRecord[]
}

export function HomeLedger({ projects }: HomeLedgerProps) {
  return (
    <Section background="muted" border>
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-10">
          <SectionHeading
            eyebrow="Public Ledger"
            title="Recent municipal works and ground inspections."
            lead="Independent ground verification logs for public works across 12 wards. No paper-only declarations."
            className="mb-0"
          />
          <TextLink href="/progress" className="shrink-0">
            All Projects
          </TextLink>
        </div>

        {/* Clean, Cardless Editorial List with Hairline Dividers */}
        <div className="divide-y divide-border border-y border-border bg-card">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between gap-4 p-5 sm:p-6 transition-colors hover:bg-muted/30 md:flex-row md:items-center"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusLabel
                    variant={
                      p.currentStage === "COMPLETED"
                        ? "success"
                        : p.currentCondition === "DELAYED" || p.currentCondition === "DISPUTED"
                          ? "warning"
                          : "active"
                    }
                  >
                    {p.currentStage.replace("_", " ")}
                  </StatusLabel>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" />
                    Verified {p.stageVerificationDate}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold uppercase tracking-tight text-foreground sm:text-lg">
                  <Link href={`/progress#${p.slug}`} className="hover:text-primary transition-colors">
                    {p.title}
                  </Link>
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-sans">
                    <MapPin className="size-3 text-primary" />
                    {p.locality}
                  </span>
                  <span className="flex items-center gap-1 font-sans">
                    <Building2 className="size-3 text-primary" />
                    {p.responsibleAuthority.name}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-left md:text-right">
                <Link
                  href={`/progress#${p.slug}`}
                  className="font-ui text-xs font-semibold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Audit Log</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

