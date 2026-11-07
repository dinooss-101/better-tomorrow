"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { TextLogo } from "@/components/text-logo"
import { DevAccountSwitcher } from "@/components/auth/dev-account-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, ShieldCheck, Phone, Mail, KeyRound } from "lucide-react"

export function LoginView() {
  const router = useRouter()
  const { login, isLoading } = useAuth()

  const [authMethod, setAuthMethod] = useState<"otp" | "password">("otp")
  const [phone, setPhone] = useState("98620 12345")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("1234")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      setError("Please enter a valid mobile number.")
      return
    }
    setError("")
    setOtpSent(true)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim()) {
      setError("Please enter the verification code.")
      return
    }
    setError("")
    try {
      await login(phone)
      router.push("/dashboard")
    } catch {
      setError("Failed to sign in. Please try again.")
    }
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password.")
      return
    }
    setError("")
    try {
      await login(email)
      router.push("/dashboard")
    } catch {
      setError("Failed to sign in. Please try again.")
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

      {/* Main Split Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Editorial Identity Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400 block mb-1.5">
                Mayang Imphal Civic Portal
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground leading-tight">
                Citizen Sign In &amp; Ward Desk
              </h1>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5">
                Direct access to track your logged constituency priorities, ground verification reports, and registered scholarship applications.
              </p>
            </div>

            {/* Framed Documentary Image */}
            <div className="relative border border-border/80 bg-card p-2.5 shadow-xs">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/20">
                <Image
                  src="/image/constituency-open-desk.png"
                  alt="Mayang Imphal Constituency Open Desk citizen intake"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-2 border-t border-border/40 pt-1.5 text-center text-[11px] font-sans text-muted-foreground">
                Constituency Intake Desk · Ward 5, Central Bazar
              </div>
            </div>

            {/* DPDP Safeguarding Statement */}
            <div className="border border-border bg-card p-4 text-xs font-sans text-muted-foreground leading-relaxed flex items-start gap-3">
              <ShieldCheck className="size-4 shrink-0 text-primary dark:text-emerald-400 mt-0.5" />
              <div>
                <strong className="text-foreground block font-ui uppercase tracking-wider text-[11px] mb-0.5">
                  DPDP Act 2023 Compliant
                </strong>
                Your phone number is utilized strictly for constituency casework updates. We never share, sell, or advertise with citizen data.
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 border border-border bg-card p-6 sm:p-8 shadow-xs">
            {/* Dev Account Switcher for Instant Testing */}
            <DevAccountSwitcher />

            {/* Method Tabs */}
            <div className="flex border-b border-border mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod("otp")
                  setError("")
                }}
                className={`flex-1 py-2.5 text-xs font-ui font-semibold uppercase tracking-wider border-b-2 -mb-px flex items-center justify-center gap-1.5 transition-colors ${
                  authMethod === "otp"
                    ? "border-primary text-primary dark:text-emerald-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Phone className="size-3.5" /> Mobile OTP (Recommended)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMethod("password")
                  setError("")
                }}
                className={`flex-1 py-2.5 text-xs font-ui font-semibold uppercase tracking-wider border-b-2 -mb-px flex items-center justify-center gap-1.5 transition-colors ${
                  authMethod === "password"
                    ? "border-primary text-primary dark:text-emerald-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="size-3.5" /> Staff Email / Password
              </button>
            </div>

            {error && (
              <div className="mb-4 border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive font-sans">
                {error}
              </div>
            )}

            {authMethod === "otp" ? (
              !otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                      Citizen Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground select-none">
                        +91
                      </span>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98620 12345"
                        className="pl-12 rounded-none text-sm h-11"
                        autoFocus
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-1 block">
                      Works across Airtel, Jio, and BSNL networks in Manipur.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-none min-h-11 text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <span>Send Verification Code</span>
                    <ArrowRight className="size-3.5 ml-1" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 bg-muted/40 border border-border text-xs flex justify-between items-center">
                    <div>
                      <span className="text-muted-foreground">Code sent to: </span>
                      <strong className="text-foreground">+91 {phone}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-primary dark:text-emerald-400 underline font-semibold text-xs"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                      Enter 4-Digit Code
                    </label>
                    <Input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="1234"
                      className="rounded-none text-center font-mono text-lg tracking-widest h-12"
                      autoFocus
                    />
                    <span className="text-[11px] text-muted-foreground mt-1 block text-center">
                      Demo simulation code: <code className="font-bold text-foreground">1234</code>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-none min-h-11 text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isLoading ? "Verifying..." : "Verify & Open Dashboard"}
                  </Button>
                </form>
              )
            ) : (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                    Official Email / Desk ID
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="desk@bettermayangimphal.org"
                    className="rounded-none text-sm h-11"
                  />
                </div>

                <div>
                  <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1.5">
                    Security Passphrase
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="rounded-none text-sm h-11 pr-10"
                    />
                    <KeyRound className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-none min-h-11 text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? "Signing In..." : "Sign In to Dashboard"}
                </Button>
              </form>
            )}

            {/* Bottom Register CTA */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>New to Mayang Imphal Civic Platform?</span>
              <Link
                href="/register"
                className="font-ui font-semibold text-primary dark:text-emerald-400 hover:text-foreground uppercase tracking-wider inline-flex items-center gap-1"
              >
                Register Citizen Profile <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-border py-4 px-4 text-center text-xs font-sans text-muted-foreground">
        Mayang Imphal Constituency Desk · Assembly Constituency AC-23 · LGD 250326
      </footer>
    </div>
  )
}
