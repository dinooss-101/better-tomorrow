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
    <div className="space-y-5 sm:space-y-6 max-w-3xl">
      {/* Header */}
      <div className="border-b border-border/70 pb-4 sm:pb-5">
        <div className="flex items-center gap-2 text-[11px] font-ui text-primary dark:text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
          <span>Mayang Imphal AC-23</span>
          <span>·</span>
          <span>DPDP Act 2023 Controls</span>
        </div>
        <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
          Citizen Data Vault &amp; Profile
        </h1>
        <p className="font-sans text-xs text-muted-foreground mt-0.5 max-w-xl">
          Full transparency over your registered contact details, data processing consent, and statutory data sovereignty controls.
        </p>
      </div>

      {/* Account Details Card Composed with Avatar & Badge */}
      <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
        <CardHeader className="p-4 sm:p-5 border-b border-border/70 pb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 rounded-none border border-border/70 shrink-0">
              <AvatarFallback className="rounded-none bg-primary/10 text-primary dark:text-emerald-400 font-ui font-bold text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-sans font-bold text-sm sm:text-base text-foreground leading-tight">
                {user?.name || "Constituency Resident"}
              </CardTitle>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline" className="rounded-none text-[9px] font-ui uppercase font-semibold h-4 px-1">
                  Role: {user?.role || "citizen"}
                </Badge>
                {user?.id && (
                  <span className="font-mono text-[10px] text-muted-foreground">ID: {user.id}</span>
                )}
              </div>
            </div>
          </div>

          {user?.ward && (
            <Badge variant="outline" className="rounded-none text-[10px] font-ui font-semibold uppercase px-2 py-0.5 flex items-center gap-1">
              <MapPin className="size-2.5 text-primary dark:text-emerald-400" />
              Ward {user.ward}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Registered Mobile Phone
              </span>
              <span className="font-mono text-foreground font-medium">{user?.phone || "+91 98620 XXXXX"}</span>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Email Address
              </span>
              <span className="text-foreground font-medium">{user?.email || "Not specified (Optional)"}</span>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Citizen Enrollment Date
              </span>
              <span className="text-foreground font-medium">
                {user?.joinedAt
                  ? new Date(user.joinedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Active Session"}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground block text-[10px] font-ui uppercase font-semibold tracking-wider">
                Statutory Consent Status
              </span>
              <Badge variant="default" className="rounded-none text-[9px] font-ui uppercase font-semibold h-5 px-1.5 flex items-center gap-1 w-fit">
                <CheckCircle2 className="size-2.5" /> DPDP 2023 Consent Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DPDP Sovereign Controls Card */}
      <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
        <CardHeader className="p-4 sm:p-5 border-b border-border/70 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary dark:text-emerald-400 shrink-0" />
            <CardTitle className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-foreground">
              Statutory Data Rights (Sections 11 &amp; 12)
            </CardTitle>
          </div>
          <p className="text-xs font-sans text-muted-foreground mt-0.5">
            As a citizen of Mayang Imphal, you retain complete sovereignty over all information submitted to our ward desk.
          </p>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 space-y-4">
          {/* Action 1: Export Data */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
            <div>
              <div className="font-ui font-semibold text-xs uppercase text-foreground">
                1. Right to Access &amp; Portability
              </div>
              <p className="text-xs font-sans text-muted-foreground mt-0.5 max-w-md">
                Download a complete JSON export of your profile, consent timestamps, and logged casework.
              </p>
            </div>

            <Button
              onClick={handleExportData}
              variant="outline"
              className="rounded-none h-8 px-3 text-xs font-ui font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-xs"
            >
              <Download className="size-3" />
              <span>{downloadSuccess ? "Vault Exported!" : "Export Vault (.json)"}</span>
            </Button>
          </div>

          {/* Action 2: Right to Erasure */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-ui font-semibold text-xs uppercase text-destructive flex items-center gap-1.5">
                <AlertTriangle className="size-3" />
                2. Right to Erasure (Statutory Deletion)
              </div>
              <p className="text-xs font-sans text-muted-foreground mt-0.5 max-w-md">
                Permanently delete your profile record, mobile number, and personal identifying details from this platform.
              </p>
            </div>

            <Button
              onClick={handleErasureRequest}
              variant="destructive"
              className="rounded-none h-8 px-3 text-xs font-ui font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-xs"
            >
              <Trash2 className="size-3" />
              <span>{erasureConfirmed ? "Purging..." : "Delete Profile"}</span>
            </Button>
          </div>
        </CardContent>

        <div className="border-t border-border/60 py-2.5 px-4 sm:px-5 bg-muted/20 flex items-center justify-between text-[11px] font-sans text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3 text-primary dark:text-emerald-400" />
            End-to-end client-side privacy architecture
          </span>
          <span className="font-mono text-[10px]">DPDP-2023-SEC-12</span>
        </div>
      </Card>
    </div>
  )
}
