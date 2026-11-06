"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, Sun, Moon } from "lucide-react"

interface NavLinkItem {
  href: string
  label: string
  exactPath?: string
}

const NAV_ITEMS: NavLinkItem[] = [
  { href: "/#mandate", label: "Mandate", exactPath: "/" },
  { href: "/development", label: "Plan", exactPath: "/development" },
  { href: "/future-labs", label: "Labs", exactPath: "/future-labs" },
  { href: "/progress", label: "Track", exactPath: "/progress" },
  { href: "/scholarships", label: "Scholars", exactPath: "/scholarships" },
  { href: "/about", label: "About", exactPath: "/about" },
  { href: "/contact", label: "Desk", exactPath: "/contact" },
]

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHash, setActiveHash] = useState("")

  useEffect(() => {
    const handleHash = () => {
      setActiveHash(window.location.hash)
    }
    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const hashPart = href.split("#")[1]
      if (pathname === "/") {
        e.preventDefault()
        const el = document.getElementById(hashPart)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
          window.history.pushState(null, "", `#${hashPart}`)
          setActiveHash(`#${hashPart}`)
        }
      }
    }
  }

  const isItemActive = (item: NavLinkItem) => {
    if (item.exactPath === "/") {
      return pathname === "/" && (!activeHash || item.href === `/#${activeHash.replace("#", "")}`)
    }
    return item.exactPath === pathname
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border text-foreground shadow-none transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Minimalist Logo Mark: Just BMI */}
        <Link
          href="/"
          className="font-headline text-lg sm:text-xl font-bold tracking-tight text-foreground hover:text-secondary transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          aria-label="BMI Home"
        >
          BMI
        </Link>

        {/* Minimalist Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 sm:gap-2 shrink-0"
        >
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-secondary ${
                  active
                    ? "text-foreground font-semibold border-b-2 border-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Section: Theme Toggle & Mobile Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="size-11 sm:size-8 p-0 rounded-none border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-secondary transition-colors"
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
                    className="size-11 sm:size-8 p-0 rounded-none border border-border bg-card text-foreground hover:bg-muted active:scale-95 focus-visible:outline-2 focus-visible:outline-secondary"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="size-4" />
                  </Button>
                }
              />
              <SheetContent
                side="right"
                className="w-72 max-w-[85vw] flex flex-col justify-between py-6 rounded-none bg-background border-l border-border text-foreground"
              >
                <div className="flex flex-col gap-6">
                  <SheetHeader className="text-left border-b border-border pb-3">
                    <SheetTitle className="font-headline text-lg font-bold text-foreground tracking-tight">
                      BMI
                    </SheetTitle>
                    <p className="text-xs text-muted-foreground">
                      Better Mayang Imphal
                    </p>
                  </SheetHeader>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col divide-y divide-border border border-border bg-card">
                    {NAV_ITEMS.map((item) => {
                      const active = isItemActive(item)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            handleNavClick(e, item.href)
                            setMobileOpen(false)
                          }}
                          className={`px-4 py-3 min-h-11 flex items-center text-sm font-medium transition-colors ${
                            active
                              ? "bg-muted text-foreground font-semibold border-l-2 border-secondary"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
