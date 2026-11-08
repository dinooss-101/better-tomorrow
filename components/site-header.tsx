"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useDensity } from "@/components/density-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Menu, Sun, Moon, ChevronDown, Send, ArrowRight, UnfoldVertical, FoldVertical, User, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextLogo } from "@/components/text-logo"
import { useAuth } from "@/lib/auth/auth-context"

interface NavSubItem {
  href: string
  label: string
  description: string
  badge?: string
}

interface NavGroup {
  id: string
  label: string
  items: NavSubItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: "planning",
    label: "Civic Plan",
    items: [
      {
        href: "/development",
        label: "Master Plan 2045",
        description: "AMRUT 2.0 GIS town plan, drainage corridors & ward zoning",
        badge: "GIS Master Plan",
      },
      {
        href: "/progress",
        label: "Civic Tracker",
        description: "Live status of municipal works, budget utilization & ward audits",
        badge: "Accountability",
      },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    items: [
      {
        href: "/scholarships",
        label: "Scholarships",
        description: "Verified higher education grants, state aid & merit scholarship directory",
        badge: "Directory",
      },
      {
        href: "/future-labs",
        label: "Future Labs",
        description: "Atal Tinkering Labs, robotics hubs & youth technology incubation",
        badge: "STEM Hub",
      },
    ],
  },
  {
    id: "governance",
    label: "Governance",
    items: [
      {
        href: "/about",
        label: "Mandate & Profile",
        description: "Assembly Constituency AC-23 profile, MLA leadership & disclosures",
        badge: "AC-23",
      },
      {
        href: "/contact",
        label: "Constituency Desk",
        description: "Citizen priority intake, Saturday open grievance hours & DPDP compliance",
        badge: "Open Desk",
      },
    ],
  },
]

const emptySubscribe = () => () => {}

function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const { density, toggleDensity } = useDensity()
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMounted = useIsMounted()
  const isAuth = isMounted && isAuthenticated

  const handleReplayIntro = () => {
    setMobileOpen(false)
    try {
      sessionStorage.removeItem("bmi_intro_seen")
      document.documentElement.classList.remove("bmi-intro-seen")
    } catch {
      // Ignore
    }
    if (pathname !== "/") {
      router.push("/?replay=1")
      return
    }
    window.dispatchEvent(new CustomEvent("bmi:replay-intro"))
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      const heroEl = document.getElementById("hero")
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border text-foreground shadow-none transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 min-h-14 sm:min-h-15 flex items-center justify-between gap-4">
        {/* ================================================================ */}
        {/* BRAND TEXT LOGO LOCKUP                                          */}
        {/* ================================================================ */}
        <Link
          href="/#hero"
          onClick={handleLogoClick}
          className="group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-0.5 cursor-pointer"
          aria-label="Mayang Imphal Home · Dr. Khumujam Ratankumar Singh"
        >
          <TextLogo />
        </Link>

        {/* ================================================================ */}
        {/* GROUPED DESKTOP NAVIGATION                                       */}
        {/* ================================================================ */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1.5 lg:gap-2.5 shrink-0"
        >
          {/* Overview Direct Link */}
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={cn(
              "font-ui uppercase tracking-wider px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary",
              pathname === "/"
                ? "text-foreground border-b-2 border-primary dark:border-emerald-400"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Overview
          </Link>

          {/* Grouped Dropdowns */}
          {NAV_GROUPS.map((group) => {
            const isGroupActive = group.items.some((item) => pathname === item.href)
            return (
              <DropdownMenu key={group.id}>
                <DropdownMenuTrigger
                  openOnHover
                  delay={120}
                  closeDelay={150}
                  className={cn(
                    "font-ui uppercase tracking-wider px-3 py-1.5 text-xs font-semibold transition-colors inline-flex items-center gap-1 group outline-none focus-visible:outline-2 focus-visible:outline-primary cursor-pointer data-popup-open:text-foreground",
                    isGroupActive
                      ? "text-foreground border-b-2 border-primary dark:border-emerald-400"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span>{group.label}</span>
                  <ChevronDown className="size-3 text-muted-foreground group-hover:text-foreground group-data-popup-open:rotate-180 transition-transform duration-150" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="w-72 sm:w-80 p-1.5 rounded-none border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-border"
                >
                  <div className="px-2.5 py-1.5 border-b border-border/60 mb-1 flex items-center justify-between">
                    <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </span>
                    <span className="font-ui text-[11px] uppercase tracking-wider text-primary dark:text-emerald-400 font-semibold">
                      Mayang Imphal AC-23
                    </span>
                  </div>
                  {group.items.map((subItem) => {
                    const active = pathname === subItem.href
                    return (
                      <DropdownMenuItem
                        key={subItem.href}
                        render={<Link href={subItem.href} />}
                        className={cn(
                          "p-2.5 rounded-none flex flex-col items-start gap-0.5 hover:bg-muted/60 focus:bg-muted cursor-pointer transition-colors",
                          active && "bg-muted/80 border-l-2 border-primary dark:border-emerald-400"
                        )}
                      >
                        <div className="w-full flex items-center justify-between">
                          <span className="font-ui text-xs font-semibold uppercase tracking-wider text-foreground">
                            {subItem.label}
                          </span>
                          {subItem.badge && (
                            <span className="font-ui text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 border border-border/80 bg-background text-muted-foreground">
                              {subItem.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-sans text-[11px] text-muted-foreground leading-snug">
                          {subItem.description}
                        </span>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          })}
        </nav>

        {/* ================================================================ */}
        {/* RIGHT CONTROLS: Quick Desk Action, Theme Toggle, Mobile Trigger  */}
        {/* ================================================================ */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Civic Portal / Dashboard Link */}
          <Link
            href={isAuth ? "/dashboard" : "/login"}
            suppressHydrationWarning
            className="hidden sm:inline-flex font-ui uppercase tracking-widest text-[11px] font-semibold items-center gap-1.5 border border-border bg-card px-3 py-2 text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary min-h-9"
          >
            <User className="size-3 text-primary dark:text-emerald-400" />
            <span suppressHydrationWarning>{isAuth ? "Dashboard" : "Sign In"}</span>
          </Link>

          {/* Quick Desk Action Button */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex font-ui uppercase tracking-widest text-[11px] font-semibold items-center gap-1.5 border border-border bg-card px-3.5 py-2 text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary min-h-9"
          >
            <Send className="size-3 text-primary dark:text-emerald-400" />
            <span>Desk</span>
          </Link>

          {/* Breathing Room / Density Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDensity}
            aria-label={
              density === "spacious"
                ? "Comfort view active. Click for compact mode"
                : "Compact view active. Click for spacious mode"
            }
            title={density === "spacious" ? "Spacing: Comfort (Spacious)" : "Spacing: Compact"}
            className="min-h-11 min-w-11 sm:min-h-9 sm:min-w-9 sm:size-9 p-0 rounded-none border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-primary transition-colors flex items-center justify-center"
          >
            {density === "spacious" ? (
              <UnfoldVertical className="size-3.5 text-foreground" />
            ) : (
              <FoldVertical className="size-3.5 text-foreground" />
            )}
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="min-h-11 min-w-11 sm:min-h-9 sm:min-w-9 sm:size-9 p-0 rounded-none border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-primary transition-colors flex items-center justify-center"
          >
            <Sun className="size-3.5 rotate-0 scale-100 motion-safe:transition-transform motion-reduce:transition-none duration-200 dark:-rotate-90 dark:scale-0 text-foreground" />
            <Moon className="absolute size-3.5 rotate-90 scale-0 motion-safe:transition-transform motion-reduce:transition-none duration-200 dark:rotate-0 dark:scale-100 text-foreground" />
          </Button>

          {/* Mobile Sheet Trigger */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-h-11 min-w-11 sm:min-h-9 sm:min-w-9 sm:size-9 p-0 rounded-none border border-border bg-card text-foreground hover:bg-muted active:scale-95 focus-visible:outline-2 focus-visible:outline-primary flex items-center justify-center"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="size-4" />
                  </Button>
                }
              />
              <SheetContent
                side="right"
                className="w-80 max-w-[85vw] flex flex-col justify-between p-6 rounded-none bg-background border-l border-border text-foreground overflow-y-auto"
              >
                <div className="flex flex-col gap-5">
                  <SheetHeader className="text-left border-b border-border pb-4">
                    <div className="flex items-start gap-3">
                      <Link
                        href="/#hero"
                        onClick={(e) => {
                          setMobileOpen(false)
                          handleLogoClick(e)
                        }}
                        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-0.5 cursor-pointer"
                        aria-label="Mayang Imphal Home · Dr. Khumujam Ratankumar Singh"
                      >
                        <TextLogo />
                      </Link>
                      <SheetTitle className="sr-only">
                        Dr. Khumujam Ratankumar Singh · Mayang Imphal AC-23
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  {/* Grouped Mobile Navigation */}
                  <nav className="flex flex-col gap-4">
                    {/* Top Mobile Quick Links: Overview & Vision Intro */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "font-ui uppercase tracking-wider px-3 py-2.5 min-h-11 text-xs font-semibold flex items-center justify-between border border-border bg-card transition-colors",
                          pathname === "/"
                            ? "bg-muted text-foreground border-l-2 border-primary dark:border-emerald-400"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span>Overview</span>
                        <ArrowRight className="size-3 text-muted-foreground" />
                      </Link>
                      <button
                        type="button"
                        onClick={handleReplayIntro}
                        className="font-ui uppercase tracking-wider px-3 py-2.5 min-h-11 text-xs font-semibold flex items-center justify-between border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer text-left active:scale-[0.98]"
                      >
                        <span className="flex items-center gap-1.5">
                          <RotateCcw className="size-3 text-primary dark:text-emerald-400" />
                          <span>Vision Intro</span>
                        </span>
                      </button>
                    </div>

                    {/* Nav Groups */}
                    {NAV_GROUPS.map((group) => (
                      <div key={group.id} className="space-y-1.5">
                        <span className="font-ui text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 px-1 block">
                          {group.label}
                        </span>
                        <div className="border border-border bg-card divide-y divide-border/60">
                          {group.items.map((subItem) => {
                            const active = pathname === subItem.href
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  "p-3 flex flex-col gap-0.5 transition-colors",
                                  active
                                    ? "bg-muted text-foreground border-l-2 border-primary dark:border-emerald-400"
                                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-ui text-xs font-semibold uppercase tracking-wider text-foreground">
                                    {subItem.label}
                                  </span>
                                  {subItem.badge && (
                                    <span className="font-ui text-[11px] uppercase tracking-wider px-1.5 py-0.5 border border-border/80 bg-background text-muted-foreground">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="font-sans text-[11px] text-muted-foreground leading-snug">
                                  {subItem.description}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Bottom Controls in Mobile Drawer */}
                <div className="pt-4 border-t border-border mt-4 space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Reading Comfort
                    </span>
                    <button
                      type="button"
                      onClick={toggleDensity}
                      className="font-ui text-xs font-semibold uppercase tracking-wider text-primary dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
                    >
                      {density === "spacious" ? (
                        <>
                          <UnfoldVertical className="size-3.5" />
                          <span>Spacious</span>
                        </>
                      ) : (
                        <>
                          <FoldVertical className="size-3.5" />
                          <span>Compact</span>
                        </>
                      )}
                    </button>
                  </div>
                  <Link
                    href={isAuth ? "/dashboard" : "/login"}
                    onClick={() => setMobileOpen(false)}
                    suppressHydrationWarning
                    className="font-ui uppercase tracking-widest text-xs font-semibold w-full flex items-center justify-center gap-2 border border-border bg-card px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                  >
                    <User className="size-3.5 text-primary dark:text-emerald-400" />
                    <span suppressHydrationWarning>{isAuth ? "Citizen Dashboard" : "Sign In to Ward Portal"}</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="font-ui uppercase tracking-widest text-xs font-semibold w-full flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Send className="size-3.5" />
                    <span>Log Priority</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
