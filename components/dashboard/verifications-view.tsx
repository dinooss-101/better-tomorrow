"use client"

import React from "react"
import Image from "next/image"
import { useAuth } from "@/lib/auth/auth-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, MapPin, Camera, FileText, ShieldAlert } from "lucide-react"

export function VerificationsView() {
  const { grievances } = useAuth()

  const verifiedTickets = grievances.filter(
    (g) => g.status === "FIELD_VERIFIED" || g.status === "DISPATCHED_TO_MUNICIPALITY" || g.status === "RESOLVED"
  )

  const verificationAuditGallery = [
    {
      title: "Central Bazar Drainage Silt Outfall Audit",
      location: "Ward 5 · Central Bazar Commercial Strip",
      image: "/image/drainage-hydrology-outfall.png",
      date: "26 Oct 2026",
      status: "FIELD_VERIFIED",
      ref: "MIMC/WD-05/DRN/2026/14",
      notes: "Measured 45cm accumulated silt choking the primary box culvert. Municipal suction machine requested.",
    },
    {
      title: "Physical Ground Evidence Inspection",
      location: "Ward 8 · Chirai Agricultural Bund",
      image: "/image/civic-audit-field-verification.png",
      date: "14 Oct 2026",
      status: "DISPATCHED_TO_MUNICIPALITY",
      ref: "WRD/IMP-W/DR-8/2026/088",
      notes: "Retaining slab breach surveyed with Water Resources Dept engineer. 15 farming households covered.",
    },
    {
      title: "AMRUT 2.0 GIS Master Plan Ward Demarcations",
      location: "Wards 1–12 · Full Municipal Jurisdiction",
      image: "/image/master-plan-gis-survey.png",
      date: "Statutory 2045 Baseline",
      status: "STATUTORY_GIS",
      ref: "Town Planning Dept / Ref 2/374",
      notes: "Hydrological contours, high flood level (HFL 768.5m), and buffer zones verified against satellite cartography.",
    },
  ]

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="border-b border-border/70 pb-6 sm:pb-7">
        <div className="flex items-center gap-2 text-[11px] font-ui text-primary dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
          <span>Mayang Imphal AC-23</span>
          <span>·</span>
          <span>Field Audit Docket</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
          Ground Verifications &amp; Field Audits
        </h1>
        <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-xl leading-relaxed">
          Physical site inspections, photographic evidence logs, and line-agency dispatch records separating ground conditions from municipal paperwork.
        </p>
      </div>

      {/* Field Inspection Protocol Standards Composed with Card */}
      <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/70">
          <div className="p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-foreground">
              <Camera className="size-4 text-primary dark:text-emerald-400" />
              <span>1. Geotagged Photography</span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
              Every verified complaint requires on-site photography documenting drainage choke points, road cracks, or facility status.
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-foreground">
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>2. Ward Team Inspection</span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
              Ward coordinators physically visit the site within 48 hours of intake and record affected household counts.
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-foreground">
              <FileText className="size-4 text-primary dark:text-emerald-400" />
              <span>3. Public File Reference</span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
              Dispatches to the Municipal Council or Water Resources Dept are tied to traceable official file dispatch numbers.
            </p>
          </div>
        </div>
      </Card>

      {/* Photo Evidence Records Composed with Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <h2 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
            Verified Field Evidence
          </h2>
          <Badge variant="outline" className="rounded-none text-[10px] font-ui uppercase font-semibold">
            Photographic Records
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verificationAuditGallery.map((item, idx) => (
            <Card
              key={idx}
              className="rounded-none border-border/80 bg-card p-4 sm:p-5 shadow-xs space-y-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/20 border border-border/40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-ui">
                    <span className="flex items-center gap-1 font-semibold text-primary dark:text-emerald-400">
                      <MapPin className="size-3" /> {item.location}
                    </span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-sans font-semibold text-sm text-foreground leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans text-muted-foreground leading-relaxed pt-1">
                    {item.notes}
                  </p>
                </div>
              </div>

              <div className="border-t border-border/60 pt-3 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                <span>Ref: {item.ref}</span>
                <Badge
                  variant="default"
                  className="rounded-none text-[9px] font-ui uppercase font-semibold h-5 px-2"
                >
                  VERIFIED
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Verified Tickets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <h2 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
            Verified Audit Trail
          </h2>
          <span className="font-ui text-xs text-muted-foreground">
            {verifiedTickets.length} ground-verified entries
          </span>
        </div>

        {verifiedTickets.length === 0 ? (
          <Alert className="rounded-none border-border/70 bg-card p-6 text-center flex flex-col items-center justify-center gap-2">
            <ShieldAlert className="size-6 text-muted-foreground mb-0.5" />
            <AlertTitle className="text-sm font-semibold text-foreground">No verified records yet</AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground">
              Tickets verified by ward coordinators will appear in this audit log.
            </AlertDescription>
          </Alert>
        ) : (
          <Card className="rounded-none border-border/80 bg-card p-0 divide-y divide-border/60 shadow-xs">
            {verifiedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 hover:bg-muted/20 transition-colors"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <strong className="text-foreground">{ticket.id}</strong>
                    <span>·</span>
                    <Badge variant="outline" className="rounded-none text-[9px] font-ui uppercase font-semibold h-4 px-1.5">
                      Ward {ticket.ward} ({ticket.locality})
                    </Badge>
                  </div>
                  <h3 className="font-sans font-semibold text-sm text-foreground">
                    {ticket.title}
                  </h3>
                  {ticket.fieldVerificationNotes && (
                    <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                      Inspection finding: &ldquo;{ticket.fieldVerificationNotes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2.5">
                  {ticket.officialDispatchReference && (
                    <span className="text-[10px] font-mono text-muted-foreground px-2.5 py-1 bg-muted/40 border border-border/70">
                      {ticket.officialDispatchReference}
                    </span>
                  )}
                  <Badge
                    variant="default"
                    className="rounded-none text-[9px] font-ui uppercase font-semibold px-2.5 py-0.5"
                  >
                    {ticket.status.replace(/_/g, " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  )
}
