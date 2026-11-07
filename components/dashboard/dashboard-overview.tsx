"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth/auth-context"
import { WARD_METRICS } from "@/lib/data/mock-user-data"
import { Button } from "@/components/ui/button"
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight,
  Plus,
  ShieldCheck,
  MapPin,
} from "lucide-react"

export function DashboardOverview() {
  const { user, role, grievances } = useAuth()

  const totalGrievances = grievances.length
  const verifiedCount = grievances.filter((g) => g.status === "FIELD_VERIFIED" || g.status === "DISPATCHED_TO_MUNICIPALITY").length
  const resolvedCount = grievances.filter((g) => g.status === "RESOLVED").length
  const pendingCount = grievances.filter((g) => g.status === "PROPOSED" || g.status === "UNDER_REVIEW").length

  return (
    <div className="space-y-8">
      {/* Welcome & Context Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-ui text-primary dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <span>Mayang Imphal AC-23</span>
            <span>·</span>
            <span>Constituency Docket</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
            {role === "citizen" ? `Welcome, ${user?.name || "Citizen"}` : `${role === "ward_coordinator" ? "Coordinator Desk" : "Secretariat Central Overview"}`}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1">
            {role === "citizen"
              ? `Tracking community priorities, infrastructure verifications, and scholarship opportunities for Ward ${user?.ward || 5}.`
              : "Municipal works ground monitoring, field verification queues, and citizen grievance coordination."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/dashboard/grievances">
            <Button className="rounded-none min-h-11 text-xs font-ui font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <Plus className="size-4" />
              <span>Log Priority Issue</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Issues */}
        <div className="border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="font-ui text-xs font-bold uppercase tracking-wider">Active Intake</span>
            <ClipboardList className="size-4 text-primary dark:text-emerald-400" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-foreground">{totalGrievances}</div>
            <div className="text-[11px] text-muted-foreground font-sans mt-1">
              {pendingCount} awaiting initial field review
            </div>
          </div>
        </div>

        {/* Card 2: Ground Verified */}
        <div className="border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="font-ui text-xs font-bold uppercase tracking-wider">Field Verified</span>
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-foreground">{verifiedCount}</div>
            <div className="text-[11px] text-muted-foreground font-sans mt-1">
              Physical inspection notes attached
            </div>
          </div>
        </div>

        {/* Card 3: Resolved */}
        <div className="border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="font-ui text-xs font-bold uppercase tracking-wider">Works Resolved</span>
            <Clock className="size-4 text-primary dark:text-emerald-400" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-foreground">{resolvedCount}</div>
            <div className="text-[11px] text-muted-foreground font-sans mt-1">
              Closed in municipal collaboration
            </div>
          </div>
        </div>

        {/* Card 4: Next Saturday Intake */}
        <div className="border border-border bg-card p-5 shadow-xs flex flex-col justify-between bg-primary/5">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
              Open Grievance Clinic
            </span>
            <Calendar className="size-4 text-primary dark:text-emerald-400" />
          </div>
          <div>
            <div className="font-display text-xl font-bold text-foreground">Every Saturday</div>
            <div className="text-[11px] text-muted-foreground font-sans mt-1">
              08:30 AM – 12:30 PM · Central Bazar
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Submissions + Ward Status Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Grievances (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div>
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                Recent Constituency Submissions
              </h2>
              <span className="text-xs text-muted-foreground font-sans">
                Real-time citizen reports and field verification status across AC-23
              </span>
            </div>
            <Link
              href="/dashboard/grievances"
              className="text-xs font-ui font-semibold uppercase tracking-wider text-primary dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {grievances.slice(0, 4).map((ticket) => {
              const statusBadges = {
                PROPOSED: "bg-muted text-muted-foreground border-border",
                UNDER_REVIEW: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
                FIELD_VERIFIED: "bg-primary/10 text-primary dark:text-emerald-400 border-primary/30",
                DISPATCHED_TO_MUNICIPALITY: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30",
                RESOLVED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
              }

              return (
                <div
                  key={ticket.id}
                  className="border border-border bg-card p-4 hover:border-primary/50 transition-colors shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[11px] text-muted-foreground font-semibold">
                          {ticket.id}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-[11px] font-ui uppercase font-semibold text-muted-foreground flex items-center gap-1">
                          <MapPin className="size-3 text-primary dark:text-emerald-400" />
                          Ward {ticket.ward} ({ticket.locality})
                        </span>
                      </div>
                      <h3 className="font-sans font-semibold text-sm text-foreground leading-snug">
                        {ticket.title}
                      </h3>
                    </div>

                    <span
                      className={`text-[11px] font-ui uppercase font-bold tracking-wider px-2 py-0.5 border shrink-0 ${statusBadges[ticket.status]}`}
                    >
                      {ticket.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <p className="text-xs font-sans text-muted-foreground line-clamp-2 leading-relaxed">
                    {ticket.description}
                  </p>

                  {ticket.fieldVerificationNotes && (
                    <div className="mt-2.5 pt-2 border-t border-border/60 text-[11px] font-sans text-foreground/80 flex items-start gap-1.5">
                      <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ticket.fieldVerificationNotes}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Ward 1-12 Metrics & Statutory Context (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ward Coverage Table */}
          <div className="border border-border bg-card p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="font-display text-sm font-bold uppercase tracking-tight text-foreground">
                Municipal Ward Coverage (AC-23)
              </h3>
              <span className="font-ui text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                12 Wards Total
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto pr-1">
              <table className="w-full text-xs font-sans">
                <thead className="border-b border-border text-muted-foreground text-[11px] font-ui uppercase">
                  <tr>
                    <th className="text-left py-1.5">Ward</th>
                    <th className="text-center py-1.5">Logged</th>
                    <th className="text-center py-1.5">Verified</th>
                    <th className="text-right py-1.5">Resolved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {WARD_METRICS.map((wm) => (
                    <tr key={wm.ward} className="hover:bg-muted/40">
                      <td className="py-2 font-ui font-semibold text-foreground">Ward {wm.ward}</td>
                      <td className="py-2 text-center text-muted-foreground">{wm.totalIssues}</td>
                      <td className="py-2 text-center text-primary dark:text-emerald-400 font-semibold">{wm.verifiedIssues}</td>
                      <td className="py-2 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{wm.resolvedIssues}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-[11px] font-sans text-muted-foreground border-t border-border/60 pt-2 text-center">
              Mayang Imphal Municipal Council · LGD Code 250326
            </div>
          </div>

          {/* DPDP Privacy & Statutory Boundary Notice */}
          <div className="border border-secondary/30 bg-secondary/5 p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wider text-foreground">
              <ShieldCheck className="size-3.5 text-primary dark:text-emerald-400" />
              <span>DPDP Statutory Compliance</span>
            </div>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed">
              Every priority reported through this dashboard is preserved under statutory privacy controls. Citizens may export records or exercise their right to erasure at any time in the{" "}
              <Link href="/dashboard/profile" className="text-primary dark:text-emerald-400 underline font-semibold">
                Citizen Data Vault
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
