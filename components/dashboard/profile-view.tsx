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
} from "lucide-react"

export function ProfileView() {
  const { user, eraseUserData, grievances } = useAuth()
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [erasureConfirmed, setErasureConfirmed] = useState(false)

  const handleExportData = () => {
    const userGrievances = grievances.filter((g) => g.citizenId === user?.id)
    const exportPayload = {
      platform: "Mayang Imphal Civic Leadership Platform (AC-23)",
      statutoryFramework: "Digital Personal Data Protection Act 2023 (DPDP Act 2023)",
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
    // In accordance with DPDP Act 2023, permanently purges profile and personal casework from storage
    if (
      confirm(
        "Are you sure you wish to exercise your statutory Right to Erasure? This will permanently delete your stored profile, casework, and personal details under the DPDP Act 2023."
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

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="border-b border-border/70 pb-6 sm:pb-7">
        <div className="flex items-center gap-2 text-[11px] font-ui text-primary font-bold uppercase tracking-wider mb-1">
          <span>Mayang Imphal AC-23</span>
          <span>·</span>
          <span>DPDP Act 2023 Controls</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
          Citizen Data Vault &amp; Profile
        </h1>
        <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-xl leading-relaxed">
          Full transparency over your registered contact details, data processing consent, and statutory data sovereignty controls.
        </p>
      </div>

      {/* Account Details Card Composed with Avatar & Badge */}
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
                {user?.name || "Constituency Resident"}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="rounded-none text-[9px] font-ui uppercase font-semibold h-4.5 px-1.5">
                  Role: {user?.role || "citizen"}
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
              Ward {user.ward}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm font-sans">
            <div className="space-y-1.5">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Registered Mobile Phone
              </span>
              <span className="font-mono text-foreground font-medium text-xs sm:text-sm">{user?.phone || "+91 98620 XXXXX"}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Email Address
              </span>
              <span className="text-foreground font-medium text-xs sm:text-sm">{user?.email || "Not specified (Optional)"}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Citizen Enrollment Date
              </span>
              <span className="text-foreground font-medium text-xs sm:text-sm">
                {user?.joinedAt
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
                Statutory Consent Status
              </span>
              <Badge variant="default" className="rounded-none text-[9px] font-ui uppercase font-semibold h-5 px-2 flex items-center gap-1.5 w-fit">
                <CheckCircle2 className="size-3" /> DPDP 2023 Consent Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DPDP Sovereign Controls Card */}
      <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
        <CardHeader className="p-5 sm:p-6 border-b border-border/70 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4.5 text-primary shrink-0" />
            <CardTitle className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-foreground">
              Statutory Data Rights (Sections 11 &amp; 12)
            </CardTitle>
          </div>
          <p className="text-xs sm:text-sm font-sans text-muted-foreground mt-1 leading-relaxed">
            As a citizen of Mayang Imphal, you retain complete sovereignty over all information submitted to our ward desk.
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
                Download a complete JSON export of your profile, consent timestamps, and logged casework.
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
                2. Right to Erasure (Statutory Deletion)
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
            End-to-end client-side privacy architecture
          </span>
          <span className="font-mono text-[10px]">DPDP-2023-SEC-12</span>
        </div>
      </Card>
    </div>
  )
}
