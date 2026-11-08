"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { UserRole } from "@/lib/types/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  User,
  Settings,
  Shield,
  LogOut,
  MapPin,
  Check,
  Database,
  Bell,
  Eye,
  Sliders,
  ClipboardList,
  CheckCircle,
} from "lucide-react"

export function DashboardUserNav() {
  const router = useRouter()
  const { user, role, logout, switchRole } = useAuth()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [offlineSync, setOfflineSync] = useState(true)
  const [telemetry, setTelemetry] = useState(false)
  const [smsAlerts, setSmsAlerts] = useState(true)

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const roleLabels: Record<UserRole, string> = {
    citizen: "Citizen Resident",
    ward_coordinator: "Ward Coordinator",
    desk_admin: "Desk Secretariat",
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    : "MI"

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="size-9 flex items-center justify-center rounded-none border border-border/80 bg-background hover:bg-muted/40 transition-colors focus-visible:outline-2 focus-visible:outline-primary cursor-pointer select-none relative group"
          aria-label="User profile, settings, and account menu"
          title={`${user?.name || "Constituent"} (${roleLabels[role]})`}
        >
          {/* Square Avatar UI */}
          <Avatar className="size-full rounded-none border-0">
            <AvatarFallback className="rounded-none bg-primary/10 text-primary font-ui text-xs font-bold uppercase tracking-wider group-hover:bg-primary/20 transition-colors">
              {initials}
            </AvatarFallback>
          </Avatar>
          {/* Active online status indicator */}
          <span className="absolute bottom-0 right-0 size-2 bg-primary rounded-none ring-1 ring-background" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-72 min-w-72 p-2 rounded-none border border-border/80 bg-popover shadow-lg"
        >
          {/* Identity Header */}
          <DropdownMenuLabel className="p-2 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-xs text-foreground truncate">
                {user?.name || "Constituency Resident"}
              </span>
              <Badge
                variant="outline"
                className="rounded-none text-[9px] font-ui uppercase font-semibold h-4 px-1"
              >
                {role === "citizen" ? "Citizen" : role === "ward_coordinator" ? "Coordinator" : "Admin"}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              {user?.ward && (
                <span className="flex items-center gap-0.5">
                  <MapPin className="size-2.5 text-primary" />
                  Ward {user.ward}
                </span>
              )}
              {user?.phone && (
                <>
                  <span>·</span>
                  <span>{user.phone}</span>
                </>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="my-1" />

          {/* Core Navigation Items */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 p-2 text-xs"
              onClick={() => router.push("/dashboard/profile")}
            >
              <User className="size-3.5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">Citizen Profile</div>
                <div className="text-[10px] text-muted-foreground">Ward enrollment &amp; credentials</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 p-2 text-xs"
              onClick={() => router.push("/dashboard/grievances")}
            >
              <ClipboardList className="size-3.5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">Ward Grievances</div>
                <div className="text-[10px] text-muted-foreground">Casework docket &amp; new intake</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 p-2 text-xs"
              onClick={() => router.push("/dashboard/verifications")}
            >
              <CheckCircle className="size-3.5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">Ground Audits</div>
                <div className="text-[10px] text-muted-foreground">Photographic site inspections</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 p-2 text-xs"
              onClick={() => router.push("/dashboard/profile#statutory")}
            >
              <Database className="size-3.5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">Data Vault &amp; DPDP</div>
                <div className="text-[10px] text-muted-foreground">Export JSON or Right to Erasure</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 p-2 text-xs"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="size-3.5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">Dashboard Settings</div>
                <div className="text-[10px] text-muted-foreground">Notifications &amp; preferences</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1" />

          {/* Quick Role Simulation Switcher */}
          <DropdownMenuLabel className="px-2 py-1 text-[10px] font-ui uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>Simulate Role</span>
            <Shield className="size-3 text-muted-foreground" />
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer flex items-center justify-between p-2 text-xs"
              onClick={() => switchRole("citizen")}
            >
              <span className={role === "citizen" ? "font-bold text-foreground" : "text-muted-foreground"}>
                Citizen Resident (Ward 5)
              </span>
              {role === "citizen" && <Check className="size-3 text-primary" />}
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer flex items-center justify-between p-2 text-xs"
              onClick={() => switchRole("ward_coordinator")}
            >
              <span className={role === "ward_coordinator" ? "font-bold text-foreground" : "text-muted-foreground"}>
                Ward Coordinator (Ward 8)
              </span>
              {role === "ward_coordinator" && <Check className="size-3 text-primary" />}
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer flex items-center justify-between p-2 text-xs"
              onClick={() => switchRole("desk_admin")}
            >
              <span className={role === "desk_admin" ? "font-bold text-foreground" : "text-muted-foreground"}>
                Desk Secretariat (Central)
              </span>
              {role === "desk_admin" && <Check className="size-3 text-primary" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1" />

          {/* Sign Out Action */}
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer flex items-center gap-2 p-2 text-xs text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="size-3.5 shrink-0" />
            <span className="font-semibold">Sign Out of Portal</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dashboard Settings Modal Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-md p-4 sm:p-6 rounded-none border border-border/80 bg-card shadow-lg">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Sliders className="size-4 text-primary" />
              <DialogTitle className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                Dashboard &amp; Privacy Settings
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure personal notification alerts, offline storage synchronization, and statutory privacy controls.
            </DialogDescription>
          </DialogHeader>

          <div className="py-3 space-y-3.5 text-xs font-sans">
            {/* Setting 1: Offline Sync */}
            <div className="flex items-start justify-between gap-3 p-3 border border-border/60 bg-muted/20">
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Database className="size-3.5 text-primary" />
                  Local State Persistence
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Caches active casework tickets in browser LocalStorage for instant offline retrieval during field audits.
                </p>
              </div>
              <input
                type="checkbox"
                checked={offlineSync}
                onChange={(e) => setOfflineSync(e.target.checked)}
                className="mt-1 size-4 rounded-none border-input text-primary accent-primary"
              />
            </div>

            {/* Setting 2: SMS Alerts */}
            <div className="flex items-start justify-between gap-3 p-3 border border-border/60 bg-muted/20">
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Bell className="size-3.5 text-primary" />
                  Casework Status Notifications
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Receive SMS updates whenever a ward coordinator attaches physical inspection notes to your logged issues.
                </p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="mt-1 size-4 rounded-none border-input text-primary accent-primary"
              />
            </div>

            {/* Setting 3: Telemetry */}
            <div className="flex items-start justify-between gap-3 p-3 border border-border/60 bg-muted/20">
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Eye className="size-3.5 text-primary" />
                  Anonymous Drainage Analytics
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Share aggregated, non-identifying waterlogging frequency metrics to support the AMRUT 2.0 GIS baseline.
                </p>
              </div>
              <input
                type="checkbox"
                checked={telemetry}
                onChange={(e) => setTelemetry(e.target.checked)}
                className="mt-1 size-4 rounded-none border-input text-primary accent-primary"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row items-center justify-end gap-2 border-t border-border/60 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSettingsOpen(false)}
              className="rounded-none text-xs h-8 px-3 font-ui uppercase"
            >
              Close
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setSettingsOpen(false)}
              className="rounded-none text-xs h-8 px-3 font-ui uppercase font-semibold bg-primary text-primary-foreground"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
