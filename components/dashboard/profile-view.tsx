"use client"

import React, { useState } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ShieldCheck,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Lock,
  UserCheck,
  Building2,
  Key,
  ShieldAlert,
} from "lucide-react"
import { getWardByNumber } from "@/lib/data/wards"

export function ProfileView() {
  const { user, role, switchRole, eraseUserData, grievances } = useAuth()
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [erasureConfirmed, setErasureConfirmed] = useState(false)

  const isStaff = role === "desk_admin" || role === "ward_coordinator"

  const handleExportData = () => {
    const userGrievances = grievances.filter((g) => g.citizenId === user?.id)
    const exportPayload = {
      platform: "Mayang Imphal Civic Leadership Platform (AC-23)",
      frameworkAlignment: "Digital Personal Data Protection Act 2023 (DPDP Act 2023) Principles",
      exportedAt: new Date().toISOString(),
      userProfile: user,
      submittedCasework: userGrievances,
      consentRecord: {
        purpose: "CIVIC_GRIEVANCE_TRIAGE_AND_SCHOLARSHIP_NOTIFICATIONS",
        grantedAt: user?.dpdpConsentAt,
        storageMode: "Anonymized Civic Docket",
      },
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `mayang_imphal_data_vault_${user?.id || "citizen"}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()

    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3000)
  }

  const handleErasureRequest = async () => {
    if (
      confirm(
        "Are you sure you wish to exercise your Right to Erasure? This will permanently delete your stored profile, casework, and personal details under data protection principles."
      )
    ) {
      setErasureConfirmed(true)
      setTimeout(async () => {
        await eraseUserData()
      }, 600)
    }
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    : "MI"

  const assignedWard = user?.ward ? getWardByNumber(user.ward) : null

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="border-b border-border/70 pb-6 sm:pb-7">
        <div className="flex items-center gap-2 text-[11px] font-ui text-primary font-bold uppercase tracking-wider mb-1">
          <span>Mayang Imphal AC-23</span>
          <span>·</span>
          <span>{isStaff ? "Staff Workspace Credentials" : "DPDP Alignment & Privacy Rights"}</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
          {isStaff ? "Staff Account & Access Controls" : "Citizen Data Vault & Profile"}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-xl leading-relaxed">
          {isStaff
            ? "Administrative session overview, assigned ward jurisdiction, casework audit permissions, and operator credentials."
            : "Full transparency over your registered contact details, data processing consent, and statutory data sovereignty controls."}
        </p>
      </div>

      {/* Account Details Card */}
      <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
        <CardHeader className="p-5 sm:p-6 border-b border-border/70 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <Avatar className="size-11 rounded-none border border-border/70 shrink-0">
              <AvatarFallback className="rounded-none bg-primary/10 text-primary font-ui font-bold text-xs sm:text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-sans font-bold text-base sm:text-lg text-foreground leading-tight">
                {user?.name || (isStaff ? "Constituency Desk Secretariat" : "Constituency Resident")}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={isStaff ? "default" : "outline"}
                  className="rounded-none text-[9px] font-ui uppercase font-semibold h-4.5 px-1.5"
                >
                  Role: {role.replace("_", " ")}
                </Badge>
                {user?.id && (
                  <span className="font-mono text-[10px] text-muted-foreground">ID: {user.id}</span>
                )}
              </div>
            </div>
          </div>

          {user?.ward && (
            <Badge variant="outline" className="rounded-none text-[10px] font-ui font-semibold uppercase px-2.5 py-1 flex items-center gap-1.5 w-fit">
              <MapPin className="size-3 text-primary" />
              Ward {user.ward}: {assignedWard?.name || "Constituency Sector"}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm font-sans">
            <div className="space-y-1.5">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                {isStaff ? "Official Desk Phone" : "Registered Mobile Phone"}
              </span>
              <span className="font-mono text-foreground font-medium text-xs sm:text-sm">{user?.phone || "+91 98620 XXXXX"}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Contact Email
              </span>
              <span className="text-foreground font-medium text-xs sm:text-sm">{user?.email || "desk@bettermayangimphal.org"}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                {isStaff ? "Designated Jurisdiction" : "Citizen Enrollment Date"}
              </span>
              <span className="text-foreground font-medium text-xs sm:text-sm">
                {isStaff
                  ? role === "desk_admin"
                    ? "All 12 Municipal Wards (AC-23)"
                    : `Ward ${user?.ward || 8} Focus Area`
                  : user?.joinedAt
                  ? new Date(user.joinedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Active Session"}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Session Authentication
              </span>
              <Badge variant="default" className="rounded-none text-[9px] font-ui uppercase font-semibold h-5 px-2 flex items-center gap-1.5 w-fit">
                <CheckCircle2 className="size-3" /> {isStaff ? "Verified Staff Session" : "DPDP Consent Active"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Branch: Staff Account vs Citizen Data Vault */}
      {isStaff ? (
        /* Staff Account & Security Workspace Controls */
        <div className="space-y-6">
          <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
            <CardHeader className="p-5 sm:p-6 border-b border-border/70 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="size-4.5 text-primary shrink-0" />
                <CardTitle className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-foreground">
                  Constituency Operator Credentials &amp; Responsibilities
                </CardTitle>
              </div>
              <p className="text-xs sm:text-sm font-sans text-muted-foreground mt-1 leading-relaxed">
                As a desk operator, you hold authorized access to intake triage, field verification notes, and municipal dispatch dockets.
              </p>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border/60 bg-muted/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-wider text-foreground">
                    <UserCheck className="size-4 text-primary" />
                    <span>Casework Permissions</span>
                  </div>
                  <ul className="text-xs font-sans text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                    <li>Review incoming citizen issue submissions</li>
                    <li>Update grievance status (Under Review, Field Verified, Resolved)</li>
                    <li>Record physical inspection notes and photos</li>
                    <li>Dispatch verified files to Mayang Imphal Municipal Council (MIMC)</li>
                  </ul>
                </div>

                <div className="border border-border/60 bg-muted/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 font-ui font-semibold text-xs uppercase tracking-wider text-foreground">
                    <ShieldAlert className="size-4 text-primary" />
                    <span>Statutory Boundary Notice</span>
                  </div>
                  <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                    This desk facilitates citizen advocacy and casework tracking. Statutory public works execution remains exclusively with the executive officers of the line departments and Mayang Imphal Municipal Council.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60">
                <div>
                  <div className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-wide text-foreground">
                    Role Simulation Switcher
                  </div>
                  <p className="text-xs font-sans text-muted-foreground mt-0.5">
                    Preview the platform experience from different stakeholder perspectives.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => switchRole("citizen")}
                    className="rounded-none text-xs font-ui uppercase font-semibold h-8"
                  >
                    Citizen Persona
                  </Button>
                  <Button
                    size="sm"
                    variant={role === "ward_coordinator" ? "default" : "outline"}
                    onClick={() => switchRole("ward_coordinator")}
                    className="rounded-none text-xs font-ui uppercase font-semibold h-8"
                  >
                    Coordinator
                  </Button>
                  <Button
                    size="sm"
                    variant={role === "desk_admin" ? "default" : "outline"}
                    onClick={() => switchRole("desk_admin")}
                    className="rounded-none text-xs font-ui uppercase font-semibold h-8"
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </CardContent>

            <div className="border-t border-border/60 py-3 px-5 sm:px-6 bg-muted/20 flex items-center justify-between text-xs font-sans text-muted-foreground">
              <span className="flex items-center gap-2">
                <Key className="size-3.5 text-primary" />
                Staff Session Authenticated (Local Workspace)
              </span>
              <span className="font-mono text-[10px]">OPERATOR-SECRETARIAT-AC23</span>
            </div>
          </Card>
        </div>
      ) : (
        /* Citizen Data Vault & Sovereignty Controls */
        <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
          <CardHeader className="p-5 sm:p-6 border-b border-border/70 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4.5 text-primary shrink-0" />
              <CardTitle className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-foreground">
                Data Sovereignty &amp; Privacy Controls
              </CardTitle>
            </div>
            <p className="text-xs sm:text-sm font-sans text-muted-foreground mt-1 leading-relaxed">
              As a constituent of Mayang Imphal, you retain complete sovereignty over all information submitted to our casework desk.
            </p>
          </CardHeader>

          <CardContent className="p-5 sm:p-6 space-y-5">
            {/* Action 1: Export Data */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div>
                <div className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-wide text-foreground">
                  1. Right to Access &amp; Portability
                </div>
                <p className="text-xs font-sans text-muted-foreground mt-1 max-w-md leading-relaxed">
                  Download a complete JSON export of your profile, consent timestamps, and logged casework records.
                </p>
              </div>

              <Button
                onClick={handleExportData}
                variant="outline"
                className="rounded-none min-h-11 sm:min-h-9 h-11 sm:h-9 px-4 text-xs font-ui font-semibold uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 shadow-xs w-full sm:w-auto active:scale-95"
              >
                <Download className="size-3.5" />
                <span>{downloadSuccess ? "Vault Exported!" : "Export Vault (.json)"}</span>
              </Button>
            </div>

            {/* Action 2: Right to Erasure */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-ui font-semibold text-xs sm:text-sm uppercase tracking-wide text-destructive flex items-center gap-1.5">
                  <AlertTriangle className="size-3.5" />
                  2. Right to Erasure (Data Deletion)
                </div>
                <p className="text-xs font-sans text-muted-foreground mt-1 max-w-md leading-relaxed">
                  Permanently delete your profile record, mobile number, and personal identifying details from this platform.
                </p>
              </div>

              <Button
                onClick={handleErasureRequest}
                variant="destructive"
                className="rounded-none min-h-11 sm:min-h-9 h-11 sm:h-9 px-4 text-xs font-ui font-semibold uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 shadow-xs w-full sm:w-auto active:scale-95"
              >
                <Trash2 className="size-3.5" />
                <span>{erasureConfirmed ? "Purging..." : "Delete Profile"}</span>
              </Button>
            </div>
          </CardContent>

          <div className="border-t border-border/60 py-3 px-5 sm:px-6 bg-muted/20 flex items-center justify-between text-xs font-sans text-muted-foreground">
            <span className="flex items-center gap-2">
              <Lock className="size-3.5 text-primary" />
              Proactive alignment with DPDP Act 2023 principles
            </span>
            <span className="font-mono text-[10px]">DPDP-ALIGNMENT-SEC-12</span>
          </div>
        </Card>
      )}
    </div>
  )
}
