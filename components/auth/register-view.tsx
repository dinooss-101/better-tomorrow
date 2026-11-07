"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { WardNumber } from "@/lib/types/auth"
import { TextLogo } from "@/components/text-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"

const WARD_OPTIONS: { ward: WardNumber; label: string }[] = [
  { ward: 1, label: "Ward 1 · Konchak Awang Leikai" },
  { ward: 2, label: "Ward 2 · Konchak Makha Leikai" },
  { ward: 3, label: "Ward 3 · Heituppokpi & Bazar West" },
  { ward: 4, label: "Ward 4 · Bazaar South & Bridge" },
  { ward: 5, label: "Ward 5 · Central Bazar Corridor" },
  { ward: 6, label: "Ward 6 · Chanam Pukhri Mapan" },
  { ward: 7, label: "Ward 7 · Chirai Awang Leikai" },
  { ward: 8, label: "Ward 8 · Chirai Makha & Canal" },
  { ward: 9, label: "Ward 9 · Thana Maning Leikai" },
  { ward: 10, label: "Ward 10 · Wangoi Boundary East" },
  { ward: 11, label: "Ward 11 · Kokhai Awang Leikai" },
  { ward: 12, label: "Ward 12 · Kokhai Makha & Wetlands" },
]

export function RegisterView() {
  const router = useRouter()
  const { register, isLoading } = useAuth()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [ward, setWard] = useState<WardNumber>(5)
  const [dpdpConsent, setDpdpConsent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please provide your full name.")
      return
    }
    if (!phone.trim()) {
      setError("Please provide a valid 10-digit mobile number.")
      return
    }
    if (!dpdpConsent) {
      setError("You must acknowledge the DPDP statutory consent to register.")
      return
    }
    setError("")

    try {
      await register({
        name,
        phone: phone.startsWith("+") ? phone : `+91 ${phone}`,
        email: email.trim() || undefined,
        ward,
        dpdpConsent,
      })
      router.push("/dashboard")
    } catch {
      setError("Failed to create profile. Please check details.")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-secondary selection:text-secondary-foreground">
      {/* Top Bar */}
      <header className="border-b border-border bg-background/95 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <TextLogo size="sm" />
          </Link>
          <Link
            href="/"
            className="font-ui inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to Overview
          </Link>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400 block mb-1.5">
                New Citizen Enrollment
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground leading-tight">
                Register for Ward Tracking
              </h1>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5">
                Join our verified citizen directory to submit ward priority issues, verify sanctioned municipal works, and receive direct scholarship notifications.
              </p>
            </div>

            <div className="space-y-3 border border-border bg-card p-5">
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-foreground block">
                Citizen Benefits:
              </span>
              <ul className="space-y-2 text-xs font-sans text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-primary dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Real-time status updates on filed drainage &amp; road grievances.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-primary dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct alerts when central or state scholarship windows open.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-primary dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Priority registration for Future Labs youth STEM workshops.</span>
                </li>
              </ul>
            </div>

            <div className="border border-border/80 bg-muted/20 p-4 text-xs font-sans text-muted-foreground">
              <div className="flex items-center gap-2 font-ui uppercase font-bold text-foreground text-[11px] mb-1">
                <ShieldCheck className="size-3.5 text-primary dark:text-emerald-400" />
                <span>Statutory DPDP Safeguard</span>
              </div>
              Citizens have full statutory rights under DPDP 2023, including right to access, right to correct, and right to instant erasure via your dashboard.
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 border border-border bg-card p-6 sm:p-8 shadow-xs">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground mb-4">
              Citizen Enrollment Form
            </h2>

            {error && (
              <div className="mb-4 border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive font-sans">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                  Full Name (as per record) *
                </label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Khumukcham Sanajaoba"
                  className="rounded-none text-sm h-11"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                    Mobile Phone *
                  </label>
                  <Input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98620 XXXXX"
                    className="rounded-none text-sm h-11"
                  />
                </div>

                <div>
                  <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                    Email Address (Optional)
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="rounded-none text-sm h-11"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                  Residential Ward (Mayang Imphal Municipal Area) *
                </label>
                <select
                  value={ward}
                  onChange={(e) => setWard(Number(e.target.value) as WardNumber)}
                  className="w-full h-11 border border-input bg-background px-3 text-sm rounded-none font-sans text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {WARD_OPTIONS.map((opt) => (
                    <option key={opt.ward} value={opt.ward}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  Select your residential ward for localized infrastructure tracking.
                </span>
              </div>

              {/* DPDP Consent */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dpdpConsent}
                    onChange={(e) => setDpdpConsent(e.target.checked)}
                    className="size-4 mt-0.5 rounded-none border-border text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-sans text-muted-foreground leading-relaxed select-none">
                    I consent to the collection and processing of my contact information strictly for municipal casework and scholarship updates in accordance with the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-none min-h-11 text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
              >
                {isLoading ? "Creating Profile..." : "Complete Registration & Enter Dashboard"}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>Already have an account?</span>
              <Link
                href="/login"
                className="font-ui font-semibold text-primary dark:text-emerald-400 hover:text-foreground uppercase tracking-wider inline-flex items-center gap-1"
              >
                Sign In Instead <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-4 px-4 text-center text-xs font-sans text-muted-foreground">
        Mayang Imphal Constituency Desk · Assembly Constituency AC-23 · LGD 250326
      </footer>
    </div>
  )
}
