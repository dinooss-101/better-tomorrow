"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth/auth-context"
import { UserRole } from "@/lib/types/auth"
import { TextLogo } from "@/components/text-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Phone,
  Mail,
  ArrowLeft,
  ShieldCheck,
  User,
  HardHat,
  Shield,
  Loader2,
} from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const { login, isLoading } = useAuth()

  const [authMethod, setAuthMethod] = useState<"otp" | "password">("otp")
  const [phone, setPhone] = useState("98620 12345")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("123456")
  const [email, setEmail] = useState("admin@bmi.app")
  const [password, setPassword] = useState("••••••••")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number.")
      return
    }
    setError("")
    setOtpSent(true)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim() || otp.length < 4) {
      setError("Please enter the 6-digit verification code.")
      return
    }
    setError("")
    setIsSubmitting(true)
    try {
      await login(phone, "citizen")
      router.push("/dashboard")
    } catch {
      setError("Authentication failed. Please verify your code.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password.")
      return
    }
    setError("")
    setIsSubmitting(true)
    try {
      const roleOverride: UserRole = email.includes("admin")
        ? "desk_admin"
        : email.includes("coord")
        ? "ward_coordinator"
        : "citizen"
      await login(email, roleOverride)
      router.push("/dashboard")
    } catch {
      setError("Invalid administrative credentials.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickPersona = async (role: UserRole) => {
    setError("")
    setIsSubmitting(true)
    try {
      if (role === "desk_admin") {
        await login("admin@bmi.app", "desk_admin")
      } else if (role === "ward_coordinator") {
        await login("coordinator@mayangimphal.org", "ward_coordinator")
      } else {
        await login("98620 12345", "citizen")
      }
      router.push("/dashboard")
    } catch {
      setError("Simulation failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {/* Return to Portal Link */}
      <div className="flex items-center justify-between px-1">
        <Link
          href="/"
          className="font-ui inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Return to Mayang Imphal Portal
        </Link>
        <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
          AC-23 Civic Docket
        </span>
      </div>

      <Card className="overflow-hidden p-0 rounded-none border border-border/80 bg-card shadow-xs">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Column 1: Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <FieldGroup>
              {/* Header */}
              <div className="flex flex-col gap-2">
                <Link href="/" className="inline-block w-fit mb-1">
                  <TextLogo size="sm" />
                </Link>
                <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  Sign In to Ward Desk
                </h1>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Track registered constituency priorities, inspect field verification audit logs, and access public casework.
                </p>
              </div>

              {/* Method Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-muted/60 border border-border/60">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod("otp")
                    setError("")
                  }}
                  className={cn(
                    "font-ui py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5",
                    authMethod === "otp"
                      ? "bg-background text-foreground shadow-2xs border border-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Phone className="size-3.5" /> Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod("password")
                    setError("")
                  }}
                  className={cn(
                    "font-ui py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5",
                    authMethod === "password"
                      ? "bg-background text-foreground shadow-2xs border border-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Mail className="size-3.5" /> Secretariat
                </button>
              </div>

              {/* Error Alert */}
              {error && (
                <div
                  role="alert"
                  className="border border-destructive/30 bg-destructive/10 p-2.5 text-xs font-sans text-destructive dark:text-red-400 leading-normal"
                >
                  {error}
                </div>
              )}

              {/* Primary Form */}
              {authMethod === "otp" ? (
                !otpSent ? (
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-3">
                    <Field>
                      <FieldLabel htmlFor="phone">Citizen Mobile Number</FieldLabel>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground pointer-events-none">
                          +91
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98620 12345"
                          className="pl-12 font-mono"
                          required
                          autoFocus
                        />
                      </div>
                      <FieldDescription>
                        A 6-digit verification code will be sent to your mobile.
                      </FieldDescription>
                    </Field>
                    <Field>
                      <Button
                        type="submit"
                        className="w-full font-ui uppercase tracking-wider"
                        disabled={isSubmitting || isLoading}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin mr-1.5" /> Sending...
                          </>
                        ) : (
                          "Get One-Time Passcode"
                        )}
                      </Button>
                    </Field>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
                    <Field>
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="otp">Enter 6-Digit Code</FieldLabel>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="font-ui text-[11px] font-semibold text-primary dark:text-emerald-400 hover:underline"
                        >
                          Change Number
                        </button>
                      </div>
                      <Input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        className="font-mono text-center tracking-widest text-base"
                        required
                        autoFocus
                      />
                      <FieldDescription>
                        Simulated code: <span className="font-mono font-bold text-foreground">123456</span>
                      </FieldDescription>
                    </Field>
                    <Field>
                      <Button
                        type="submit"
                        className="w-full font-ui uppercase tracking-wider"
                        disabled={isSubmitting || isLoading}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin mr-1.5" /> Verifying...
                          </>
                        ) : (
                          "Verify Code & Enter Dashboard"
                        )}
                      </Button>
                    </Field>
                  </form>
                )
              ) : (
                <form onSubmit={handlePasswordLogin} className="flex flex-col gap-3">
                  <Field>
                    <FieldLabel htmlFor="email">Administrative Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@bmi.app"
                      required
                      autoFocus
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <span className="text-[11px] text-muted-foreground font-ui">
                        AC-23 Master Key
                      </span>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      className="w-full font-ui uppercase tracking-wider"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin mr-1.5" /> Signing In...
                        </>
                      ) : (
                        "Sign In as Secretariat Officer"
                      )}
                    </Button>
                  </Field>
                </form>
              )}

              {/* Instant Persona Switcher */}
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card *:data-[slot=field-separator-content]:text-[11px] *:data-[slot=field-separator-content]:uppercase *:data-[slot=field-separator-content]:tracking-wider">
                1-Click Role Simulation
              </FieldSeparator>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => handleQuickPersona("citizen")}
                  disabled={isSubmitting}
                  className="flex flex-col h-auto py-2 px-1 items-center justify-center text-center gap-1 rounded-none border-border"
                >
                  <User className="size-3.5 text-muted-foreground" />
                  <span className="font-ui text-[11px] font-bold leading-tight">Citizen</span>
                  <span className="text-[11px] text-muted-foreground scale-90">Ward 4</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => handleQuickPersona("ward_coordinator")}
                  disabled={isSubmitting}
                  className="flex flex-col h-auto py-2 px-1 items-center justify-center text-center gap-1 rounded-none border-border"
                >
                  <HardHat className="size-3.5 text-muted-foreground" />
                  <span className="font-ui text-[11px] font-bold leading-tight">Coordinator</span>
                  <span className="text-[11px] text-muted-foreground scale-90">Ward 7</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => handleQuickPersona("desk_admin")}
                  disabled={isSubmitting}
                  className="flex flex-col h-auto py-2 px-1 items-center justify-center text-center gap-1 rounded-none border-border"
                >
                  <Shield className="size-3.5 text-muted-foreground" />
                  <span className="font-ui text-[11px] font-bold leading-tight">Desk Admin</span>
                  <span className="text-[11px] text-muted-foreground scale-90">Central</span>
                </Button>
              </div>

              {/* Registration Link */}
              <FieldDescription className="text-center pt-1 text-xs">
                First-time constituent?{" "}
                <Link
                  href="/register"
                  className="text-foreground font-semibold underline underline-offset-4 hover:text-primary dark:hover:text-emerald-400"
                >
                  Register new citizen profile
                </Link>
              </FieldDescription>
            </FieldGroup>
          </div>

          {/* Column 2: Visual Editorial Panel */}
          <div className="relative hidden md:flex flex-col justify-between bg-muted overflow-hidden border-l border-border/80">
            <Image
              src="/image/constituency-open-desk.png"
              alt="Mayang Imphal Constituency Open Desk citizen intake"
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 450px"
              className="object-cover"
            />
            {/* Tone Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 z-10" />

            {/* Overlay Content */}
            <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-between h-full text-white">
              {/* Top Tag */}
              <div className="flex items-center justify-between">
                <span className="font-ui text-[11px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-xs px-2.5 py-1 border border-white/20">
                  Ward 5 Central Bazar Desk
                </span>
                <span className="font-mono text-[11px] text-white/80">
                  AC-23 Secretariat
                </span>
              </div>

              {/* Bottom Documentary Highlights */}
              <div className="flex flex-col gap-3">
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-serif italic text-base leading-snug text-white/95">
                    &ldquo;Every registered civic priority is tracked with photographic evidence and direct administrative accountability.&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20 text-[11px] font-sans text-white/80">
                  <div>
                    <span className="font-mono font-bold text-white block text-sm">12 Wards</span>
                    <span>Constituency Ground Audits</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-white block text-sm">Saturday</span>
                    <span>Weekly Citizen Clinic</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-white/70">
                  <ShieldCheck className="size-3.5 shrink-0 text-emerald-400" />
                  <span>Citizen Data Vault · DPDP Act 2023 Sec. 6 Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statutory Privacy Footnote */}
      <p className="text-balance text-center text-[11px] font-sans text-muted-foreground px-4">
        Protected under the Digital Personal Data Protection Act 2023. By signing in, you access your authenticated constituency records.{" "}
        <Link href="/about" className="underline underline-offset-2 hover:text-foreground">
          Civic Charter
        </Link>
        {" "}·{" "}
        <Link href="/contact" className="underline underline-offset-2 hover:text-foreground">
          Secretariat Support
        </Link>
      </p>
    </div>
  )
}
