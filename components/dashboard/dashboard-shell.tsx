"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { TextLogo } from "@/components/text-logo"
import { Button } from "@/components/ui/button"
import { DevAccountSwitcher } from "@/components/auth/dev-account-switcher"
import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle,
  UserCheck,
  LogOut,
  ArrowLeft,
  Shield,
  Menu,
  X,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, role, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDevSwitcher, setShowDevSwitcher] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const navItems = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/dashboard/grievances",
      label: "Ward Grievances",
      icon: ClipboardList,
      exact: false,
    },
    {
      href: "/dashboard/verifications",
      label: "Ground Audits",
      icon: CheckCircle,
      exact: false,
    },
    {
      href: "/dashboard/profile",
      label: "Citizen Data Vault",
      icon: UserCheck,
      exact: false,
    },
  ]

  const roleLabels = {
    citizen: "Citizen",
    ward_coordinator: "Ward Coordinator",
    desk_admin: "Desk Admin",
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-secondary selection:text-secondary-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            {/* Left: Brand + Section Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/" className="shrink-0 flex items-center">
                <TextLogo size="sm" />
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-xs font-ui text-muted-foreground border-l border-border/80 pl-3.5">
                <span className="font-semibold text-foreground uppercase tracking-wider">
                  Civic Portal
                </span>
                <span>/</span>
                <span className="uppercase tracking-wider">AC-23</span>
              </div>
            </div>

            {/* Right: User Role Badge + Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Role Badge */}
              <div className="hidden md:flex items-center gap-1.5 border border-border/70 px-2 py-0.5 text-xs bg-muted/20">
                <Shield className="size-3 text-primary dark:text-emerald-400" />
                <span className="font-ui text-[10px] font-semibold uppercase tracking-wider text-foreground">
                  {roleLabels[role]}
                </span>
                {user?.ward && (
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="size-2.5" /> W{user.ward}
                  </span>
                )}
              </div>

              {/* Dev Switcher Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDevSwitcher(!showDevSwitcher)}
                className="h-7.5 px-2.5 rounded-none text-[10px] font-ui uppercase font-semibold border-dashed text-muted-foreground hover:text-foreground"
              >
                Switch Role
              </Button>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                title="Sign out of portal"
                className="h-7.5 px-2 rounded-none text-xs font-ui text-muted-foreground hover:text-foreground flex items-center gap-1.5"
              >
                <LogOut className="size-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-1.5 text-muted-foreground hover:text-foreground"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dev Switcher Drawer Panel */}
        {showDevSwitcher && (
          <div className="border-t border-border bg-muted/40 p-3 sm:p-4">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <DevAccountSwitcher />
            </div>
          </div>
        )}

        {/* Secondary Navigation Bar (Desktop) */}
        <div className="hidden sm:block border-t border-border/70 bg-card/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <nav className="flex items-center gap-1 overflow-x-auto py-0.5">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-xs font-ui font-semibold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors",
                      isActive
                        ? "border-primary text-primary dark:text-emerald-400 font-bold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <Link
              href="/"
              className="text-xs font-ui font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="size-3" /> Public Portal
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-border bg-card p-4 space-y-2">
            <div className="p-2 border border-border/60 bg-muted/30 text-xs mb-3 flex items-center justify-between">
              <div>
                <strong className="block text-foreground">{user?.name}</strong>
                <span className="text-[11px] text-muted-foreground font-ui uppercase">
                  {roleLabels[role]} · Ward {user?.ward || "General"}
                </span>
              </div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2.5 text-xs font-ui font-semibold uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <div className="pt-3 border-t border-border mt-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center gap-2 p-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> Return to Public Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        {children}
      </main>

      {/* Dashboard Footer */}
      <footer className="border-t border-border/70 py-4 px-4 sm:px-6 lg:px-8 text-xs font-sans text-muted-foreground">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Mayang Imphal AC-23 Civic Dashboard · LGD 250326</span>
          <span className="flex items-center gap-3">
            <Link href="/about#dpdp" className="hover:underline">DPDP Compliance</Link>
            <span>·</span>
            <Link href="/about#statutory" className="hover:underline">Statutory Demarcation</Link>
          </span>
        </div>
      </footer>
    </div>
  )
}
