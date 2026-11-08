"use client"

import React from "react"
import Image from "next/image"
import { useAuth } from "@/lib/auth/auth-context"
import { CheckCircle2, MapPin, Camera, FileText } from "lucide-react"

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
    <div className="space-y-6 sm:space-y-7">
      {/* Header */}
      <div className="border-b border-border/70 pb-4 sm:pb-5">
        <div className="flex items-center gap-2 text-[11px] font-ui text-primary dark:text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
          <span>Mayang Imphal AC-23</span>
          <span>·</span>
          <span>Evidence-Based Governance</span>
        </div>
        <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
          Ground Verifications &amp; Field Audits
        </h1>
        <p className="font-sans text-xs text-muted-foreground mt-0.5 max-w-xl">
          Physical site inspections, photographic evidence logs, and line-agency dispatch records separating ground conditions from municipal paperwork.
        </p>
      </div>

      {/* Field Inspection Protocol Standards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border border-border/80 bg-card p-3.5 sm:p-4">
        <div className="space-y-1">
          <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <Camera className="size-3 text-primary dark:text-emerald-400" />
            1. Geotagged Photography
          </span>
          <p className="text-xs font-sans text-muted-foreground leading-relaxed">
            Every verified complaint requires on-site photography documenting drainage choke points, road cracks, or facility status.
          </p>
        </div>

        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/70 pt-2.5 sm:pt-0 sm:pl-3.5">
          <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-primary dark:text-emerald-400" />
            2. Ward Team Inspection
          </span>
          <p className="text-xs font-sans text-muted-foreground leading-relaxed">
            Ward coordinators physically visit the site within 48 hours of intake and record affected household counts.
          </p>
        </div>

        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/70 pt-2.5 sm:pt-0 sm:pl-3.5">
          <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <FileText className="size-3 text-primary dark:text-emerald-400" />
            3. Public File Reference
          </span>
          <p className="text-xs font-sans text-muted-foreground leading-relaxed">
            Dispatches to the Municipal Council or Water Resources Dept are tied to traceable official file dispatch numbers.
          </p>
        </div>
      </div>

      {/* Photo Evidence Records */}
      <div className="space-y-3">
        <h2 className="font-display text-base font-bold uppercase tracking-tight text-foreground">
          Verified Field Evidence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {verificationAuditGallery.map((item, idx) => (
            <div
              key={idx}
              className="border border-border/80 bg-card p-3 shadow-xs space-y-2.5 flex flex-col justify-between"
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

                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-ui">
                    <span className="flex items-center gap-1 font-semibold text-primary dark:text-emerald-400">
                      <MapPin className="size-2.5" /> {item.location}
                    </span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-sans font-semibold text-xs text-foreground leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans text-muted-foreground leading-relaxed pt-0.5">
                    {item.notes}
                  </p>
                </div>
              </div>

              <div className="border-t border-border/60 pt-2 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
                <span>Ref: {item.ref}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-ui text-[10px] uppercase">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Verified Tickets List */}
      <div className="space-y-3">
        <h2 className="font-display text-base font-bold uppercase tracking-tight text-foreground">
          Verified Audit Trail
        </h2>

        <div className="border border-border/80 bg-card divide-y divide-border/60">
          {verifiedTickets.map((ticket) => (
            <div key={ticket.id} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                  <strong className="text-foreground">{ticket.id}</strong>
                  <span>·</span>
                  <span>Ward {ticket.ward} ({ticket.locality})</span>
                </div>
                <h3 className="font-sans font-semibold text-xs sm:text-sm text-foreground">
                  {ticket.title}
                </h3>
                {ticket.fieldVerificationNotes && (
                  <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                    Inspection finding: &ldquo;{ticket.fieldVerificationNotes}&rdquo;
                  </p>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2.5">
                {ticket.officialDispatchReference && (
                  <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 bg-muted/30 border border-border/70">
                    {ticket.officialDispatchReference}
                  </span>
                )}
                <span className="text-[10px] font-ui font-semibold uppercase px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary dark:text-emerald-400">
                  {ticket.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
