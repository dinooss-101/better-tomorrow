"use client"

import React from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { UserRole } from "@/lib/types/auth"
import { Shield, User, HardHat, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function DevAccountSwitcher({ className }: { className?: string } = {}) {
  const { role, switchRole } = useAuth()

  const roles: { id: UserRole; label: string; sub: string; icon: React.ElementType }[] = [
    {
      id: "citizen",
      label: "Citizen",
      sub: "Ward 5 (Bazar)",
      icon: User,
    },
    {
      id: "ward_coordinator",
      label: "Coordinator",
      sub: "Ward 8 (Field)",
      icon: HardHat,
    },
    {
      id: "desk_admin",
      label: "Desk Admin",
      sub: "AC-23 Secretariat",
      icon: Shield,
    },
  ]

  return (
    <div className={cn("border border-border/80 bg-muted/30 p-3 sm:p-4", className)}>
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          Test Account Switcher
        </span>
        <span className="font-ui text-[11px] text-muted-foreground">Click to simulate role</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {roles.map((r) => {
          const Icon = r.icon
          const isActive = role === r.id
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => switchRole(r.id)}
              className={cn(
                "flex items-center justify-between p-2 text-left border transition-all text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isActive
                  ? "border-primary bg-primary/10 text-foreground font-semibold"
                  : "border-border/60 bg-background hover:bg-muted/50 text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Icon className={cn("size-3.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                <div className="truncate">
                  <div className="leading-tight">{r.label}</div>
                  <div className="text-[11px] text-muted-foreground font-normal truncate">{r.sub}</div>
                </div>
              </div>
              {isActive && <Check className="size-3 text-primary shrink-0 ml-1" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
