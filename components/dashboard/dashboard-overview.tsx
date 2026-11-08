"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth/auth-context"
import { WARD_METRICS } from "@/lib/data/mock-user-data"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight,
  Plus,
  ShieldCheck,
  MapPin,
  ExternalLink,
} from "lucide-react"

export function DashboardOverview() {
  const { user, role, grievances } = useAuth()

  const totalGrievances = grievances.length
  const verifiedCount = grievances.filter(
    (g) => g.status === "FIELD_VERIFIED" || g.status === "DISPATCHED_TO_MUNICIPALITY"
  ).length
  const resolvedCount = grievances.filter((g) => g.status === "RESOLVED").length
  const pendingCount = grievances.filter(
    (g) => g.status === "PROPOSED" || g.status === "UNDER_REVIEW"
  ).length

  const verificationRate = totalGrievances > 0 ? Math.round((verifiedCount / totalGrievances) * 100) : 0
  const resolutionRate = totalGrievances > 0 ? Math.round((resolvedCount / totalGrievances) * 100) : 0

  const statusVariantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    PROPOSED: "outline",
    UNDER_REVIEW: "secondary",
    FIELD_VERIFIED: "default",
    DISPATCHED_TO_MUNICIPALITY: "secondary",
    RESOLVED: "default",
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Welcome & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-6 sm:pb-7">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-ui text-primary dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <span>Mayang Imphal AC-23</span>
            <span>·</span>
            <span>Constituency Docket</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
            {role === "citizen"
              ? `Welcome, ${user?.name || "Citizen"}`
              : `${role === "ward_coordinator" ? "Coordinator Desk" : "Secretariat Central Overview"}`}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-xl leading-relaxed">
            {role === "citizen"
              ? `Tracking community priorities, infrastructure verifications, and casework status for Ward ${user?.ward || 5}.`
              : "Municipal works ground monitoring, field verification queues, and citizen grievance coordination across Wards 1 through 12."}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 pt-1 sm:pt-0">
          <Link href="/dashboard/grievances">
            <Button className="rounded-none h-10 px-4 text-xs font-ui font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shadow-xs">
              <Plus className="size-3.5" />
              <span>Log Priority</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Composed with Progress Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Metric 1: Total Intake */}
        <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
          <CardHeader className="p-5 sm:p-6 pb-2.5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-ui text-xs font-bold uppercase tracking-wider">Active Intake</span>
              <ClipboardList className="size-4 text-primary dark:text-emerald-400" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-1">
              {totalGrievances}
            </div>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-0 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans">
              <span>{pendingCount} awaiting initial field visit</span>
              <Badge variant="outline" className="rounded-none text-[10px] font-ui uppercase font-semibold h-5 px-1.5">
                Wards 1–12
              </Badge>
            </div>
            <Progress value={totalGrievances > 0 ? 100 : 0} className="h-1 bg-muted" />
          </CardContent>
        </Card>

        {/* Metric 2: Field Verified */}
        <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
          <CardHeader className="p-5 sm:p-6 pb-2.5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-ui text-xs font-bold uppercase tracking-wider">Field Verified</span>
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-1">
              {verifiedCount}
            </div>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-0 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans">
              <span>{verificationRate}% verified with ground notes</span>
              <span className="font-mono text-[10px] text-foreground font-semibold">{verificationRate}%</span>
            </div>
            <Progress value={verificationRate} className="h-1 bg-muted" />
          </CardContent>
        </Card>

        {/* Metric 3: Works Resolved */}
        <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
          <CardHeader className="p-5 sm:p-6 pb-2.5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-ui text-xs font-bold uppercase tracking-wider">Works Resolved</span>
              <Clock className="size-4 text-primary dark:text-emerald-400" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-1">
              {resolvedCount}
            </div>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-0 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-sans">
              <span>{resolutionRate}% closed in line coordination</span>
              <span className="font-mono text-[10px] text-foreground font-semibold">{resolutionRate}%</span>
            </div>
            <Progress value={resolutionRate} className="h-1 bg-muted" />
          </CardContent>
        </Card>
      </div>

      {/* Saturday Clinic Notice Alert */}
      <Alert className="rounded-none border-border/80 bg-card/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3">
          <Calendar className="size-4.5 text-primary dark:text-emerald-400 shrink-0" />
          <div>
            <AlertTitle className="text-xs sm:text-sm font-semibold text-foreground">
              Open Grievance Clinic: Every Saturday 08:30 AM – 12:30 PM
            </AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Central Bazar (Ward 5 Desk) · Walk-in casework triage with constituency coordinators.
            </AlertDescription>
          </div>
        </div>
        <Link
          href="/contact"
          className="font-ui text-xs uppercase font-semibold text-primary dark:text-emerald-400 hover:underline shrink-0 flex items-center gap-1.5 py-1"
        >
          <span>Schedule &amp; Location</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </Alert>

      {/* Main Grid: Recent Submissions + Ward Status Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* Left Column: Recent Grievances (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                Recent Submissions
              </h2>
            </div>
            <Link
              href="/dashboard/grievances"
              className="text-xs font-ui font-semibold uppercase tracking-wider text-primary dark:text-emerald-400 hover:underline flex items-center gap-1.5"
            >
              <span>View All ({grievances.length})</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {grievances.slice(0, 4).map((ticket) => {
              const citizenInitials = ticket.citizenName
                ? ticket.citizenName
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                : `W${ticket.ward}`

              return (
                <Card
                  key={ticket.id}
                  className="rounded-none border-border/80 bg-card p-4 sm:p-5 hover:border-primary/40 transition-colors shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-start gap-3 min-w-0">
                      <Avatar className="size-8 rounded-none border border-border/70 shrink-0 mt-0.5">
                        <AvatarFallback className="rounded-none bg-muted text-[11px] font-ui font-bold text-foreground">
                          {citizenInitials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <span className="font-mono text-[10px] text-muted-foreground font-semibold">
                            {ticket.id}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <Badge
                            variant="outline"
                            className="rounded-none text-[9px] font-ui uppercase font-semibold h-4 px-1.5 flex items-center gap-1"
                          >
                            <MapPin className="size-2 text-primary dark:text-emerald-400" />
                            Ward {ticket.ward} ({ticket.locality})
                          </Badge>
                        </div>
                        <h3 className="font-sans font-semibold text-xs sm:text-sm text-foreground leading-snug">
                          {ticket.title}
                        </h3>
                      </div>
                    </div>

                    <Badge
                      variant={statusVariantMap[ticket.status] || "outline"}
                      className="rounded-none text-[9px] font-ui uppercase font-semibold tracking-wider px-2 py-0.5 shrink-0"
                    >
                      {ticket.status.replace(/_/g, " ")}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-muted-foreground line-clamp-2 leading-relaxed">
                    {ticket.description}
                  </p>

                  {ticket.fieldVerificationNotes && (
                    <div className="mt-3.5 pt-2.5 border-t border-border/50 text-[11px] font-sans text-foreground/80 flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ticket.fieldVerificationNotes}</span>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>

        {/* Right Column: Ward 1-12 Metrics & Statutory Context (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ward Coverage Table Composed with shadcn Table */}
          <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
            <CardHeader className="p-4 sm:p-5 border-b border-border/60 pb-3.5">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight text-foreground">
                  Municipal Ward Coverage
                </CardTitle>
                <Badge variant="outline" className="rounded-none font-ui text-[9px] uppercase tracking-wider font-semibold">
                  12 Wards Total
                </Badge>
              </div>
              <CardDescription className="text-[11px] text-muted-foreground mt-1">
                Casework resolution rates and verified issues across territorial wards.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="max-h-72 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border/70 text-[10px] font-ui uppercase">
                      <TableHead className="h-9 text-left py-1.5 pl-4 font-semibold text-foreground">Ward</TableHead>
                      <TableHead className="h-9 text-center py-1.5 font-semibold text-foreground">Intake</TableHead>
                      <TableHead className="h-9 text-center py-1.5 font-semibold text-foreground">Verified</TableHead>
                      <TableHead className="h-9 text-right py-1.5 pr-4 font-semibold text-foreground">Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {WARD_METRICS.map((wm) => {
                      const wardRate = Math.round((wm.resolvedIssues / wm.totalIssues) * 100)
                      return (
                        <TableRow key={wm.ward} className="border-b border-border/40 hover:bg-muted/30">
                          <TableCell className="py-2.5 pl-4 font-ui font-semibold text-foreground text-[11px]">
                            Ward {wm.ward}
                          </TableCell>
                          <TableCell className="py-2.5 text-center text-muted-foreground text-[11px]">
                            {wm.totalIssues}
                          </TableCell>
                          <TableCell className="py-2.5 text-center text-primary dark:text-emerald-400 font-semibold text-[11px]">
                            {wm.verifiedIssues}
                          </TableCell>
                          <TableCell className="py-2.5 pr-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Progress value={wardRate} className="w-12 h-1 bg-muted hidden sm:block" />
                              <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                {wardRate}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>

            <div className="text-[10px] font-sans text-muted-foreground border-t border-border/60 py-2.5 px-4 text-center bg-muted/20">
              Mayang Imphal Municipal Council · LGD 250326
            </div>
          </Card>

          {/* DPDP Privacy Notice Card */}
          <Alert className="rounded-none border-border/70 bg-card/60 p-4 sm:p-5 text-xs">
            <AlertTitle className="flex items-center gap-2 font-ui text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
              <ShieldCheck className="size-4 text-primary dark:text-emerald-400 shrink-0" />
              <span>DPDP Compliance</span>
            </AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
              Casework is processed under statutory DPDP Act 2023 controls. Citizens may export or request erasure in the{" "}
              <Link
                href="/dashboard/profile"
                className="text-primary dark:text-emerald-400 underline font-semibold inline-flex items-center gap-0.5 whitespace-nowrap"
              >
                <span>Citizen Data Vault</span>
                <ExternalLink className="size-2.5" />
              </Link>
              .
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
