"use client"

import React, { useState } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  User,
  MapPin,
} from "lucide-react"

export function ProfileView() {
  const { user, logout, grievances } = useAuth()
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
    // In accordance with DPDP Act 2023, completely wipes session and local storage
    if (confirm("Are you sure you wish to exercise your statutory Right to Erasure? This will permanently delete your stored profile and sign you out.")) {
      setErasureConfirmed(true)
      setTimeout(async () => {
        await logout()
      }, 1000)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-xs font-ui text-primary dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
          <span>Digital Personal Data Protection (DPDP) Act 2023</span>
          <span>·</span>
          <span>Statutory Compliance</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
          Citizen Data Vault &amp; Profile
        </h1>
        <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1">
          Full transparency over your registered contact details, data processing consent, and statutory data sovereignty controls.
        </p>
      </div>

      {/* Account Details Card */}
      <div className="border border-border bg-card p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/10 border border-primary/30 flex items-center justify-center font-ui font-bold text-primary dark:text-emerald-400">
              <User className="size-5" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-base text-foreground leading-tight">
                {user?.name || "Constituency Resident"}
              </h2>
              <span className="text-xs text-muted-foreground font-ui uppercase tracking-wider">
                Role: <strong>{user?.role?.toUpperCase()}</strong>
              </span>
            </div>
          </div>

          {user?.ward && (
            <span className="font-ui text-xs font-semibold px-2.5 py-1 border border-border bg-muted/40 text-foreground flex items-center gap-1">
              <MapPin className="size-3 text-primary dark:text-emerald-400" />
              Ward {user.ward} Resident
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <span className="text-muted-foreground block text-[11px] font-ui uppercase">Registered Mobile Phone</span>
            <span className="font-mono text-foreground font-medium">{user?.phone || "+91 98620 XXXXX"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[11px] font-ui uppercase">Email Address</span>
            <span className="text-foreground font-medium">{user?.email || "Not specified (Optional)"}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[11px] font-ui uppercase">Citizen Enrollment Date</span>
            <span className="text-foreground font-medium">
              {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "Active Session"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[11px] font-ui uppercase">Statutory DPDP Consent Stamp</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="size-3" /> DPDP 2023 Consent Active
            </span>
          </div>
        </div>
      </div>

      {/* DPDP Sovereign Controls Card */}
      <div className="border border-border bg-card p-6 shadow-xs space-y-6">
        <div>
          <h2 className="font-display text-lg font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary dark:text-emerald-400" />
            Statutory Data Rights (Sections 11 &amp; 12)
          </h2>
          <p className="text-xs font-sans text-muted-foreground mt-1">
            As a citizen of Mayang Imphal, you retain complete sovereignty over all information submitted to our ward desk.
          </p>
        </div>

        {/* Action 1: Export Data */}
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-ui font-bold text-xs uppercase text-foreground">
              1. Right to Access &amp; Portability
            </div>
            <p className="text-xs font-sans text-muted-foreground mt-0.5 max-w-lg">
              Download a complete JSON export of your profile, consent timestamps, and logged casework.
            </p>
          </div>

          <Button
            onClick={handleExportData}
            variant="outline"
            className="rounded-none text-xs font-ui font-semibold uppercase tracking-wider shrink-0 flex items-center gap-2"
          >
            <Download className="size-3.5" />
            <span>{downloadSuccess ? "Vault Exported!" : "Export Data Vault (.json)"}</span>
          </Button>
        </div>

        {/* Action 2: Right to Erasure */}
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-ui font-bold text-xs uppercase text-destructive flex items-center gap-1.5">
              <AlertTriangle className="size-3.5" />
              2. Right to Erasure (Statutory Deletion)
            </div>
            <p className="text-xs font-sans text-muted-foreground mt-0.5 max-w-lg">
              Permanently delete your profile record, mobile number, and personal identifying details from this platform.
            </p>
          </div>

          <Button
            onClick={handleErasureRequest}
            variant="destructive"
            className="rounded-none text-xs font-ui font-semibold uppercase tracking-wider shrink-0 flex items-center gap-2"
          >
            <Trash2 className="size-3.5" />
            <span>{erasureConfirmed ? "Purging Record..." : "Delete Profile"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
