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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"

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
      setError("Please enter a valid 10-digit mobile number.")
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
      setError("Please enter email and password.")
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
    <div className={cn("w-full max-w-3xl mx-auto flex flex-col gap-4", className)} {...props}>
      {/* Return Link */}
      <div>
        <Link
          href="/"
          className="font-ui inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to portal
        </Link>
      </div>

      {/* Main Minimalist Split Card */}
      <Card className="overflow-hidden p-0 rounded-none border border-border/80 bg-card shadow-xs">
        <CardContent className="grid p-0 md:grid-cols-12 min-h-115">
          {/* Form Column */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              {/* Logo & Calm Heading */}
              <div>
                <Link href="/" className="inline-block mb-3">
                  <TextLogo size="sm" />
                </Link>
                <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  Sign In
                </h1>
                <p className="font-sans text-xs text-muted-foreground mt-1">
                  Access your constituency casework docket and ground audits.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div
                  role="alert"
                  className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-sans text-destructive dark:text-red-400"
                >
                  {error}
                </div>
              )}

              {/* Form Body */}
              {authMethod === "otp" ? (
                !otpSent ? (
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone" className="text-xs font-medium">
                        Mobile Number
                      </Label>
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
                          className="pl-11 h-10 font-mono text-xs"
                          required
                          autoFocus
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full h-10 font-ui uppercase tracking-wider text-xs font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin mr-1.5" /> Sending...
                        </>
                      ) : (
                        "Get One-Time Passcode"
                      )}
                    </Button>
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMethod("password")
                          setError("")
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                      >
                        Use secretariat email instead
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="otp" className="text-xs font-medium">
                          6-Digit Code
                        </Label>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-xs text-primary dark:text-emerald-400 hover:underline"
                        >
                          Change
                        </button>
                      </div>
                      <Input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        className="h-10 font-mono text-center tracking-widest text-base"
                        required
                        autoFocus
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full h-10 font-ui uppercase tracking-wider text-xs font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin mr-1.5" /> Verifying...
                        </>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </Button>
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMethod("password")
                          setError("")
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                      >
                        Use secretariat email instead
                      </button>
                    </div>
                  </form>
                )
              ) : (
                <form onSubmit={handlePasswordLogin} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-xs font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@bmi.app"
                      className="h-10 text-xs"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password" className="text-xs font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 text-xs"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full h-10 font-ui uppercase tracking-wider text-xs font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin mr-1.5" /> Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod("otp")
                        setError("")
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                    >
                      Use mobile OTP instead
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Understated Demo Switcher */}
            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-ui text-[11px] uppercase tracking-wider text-muted-foreground/80">
                Demo:
              </span>
              <div className="flex items-center gap-2 font-ui text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => handleQuickPersona("citizen")}
                  disabled={isSubmitting}
                  className="hover:text-foreground transition-colors"
                >
                  Citizen
                </button>
                <span className="text-border">·</span>
                <button
                  type="button"
                  onClick={() => handleQuickPersona("ward_coordinator")}
                  disabled={isSubmitting}
                  className="hover:text-foreground transition-colors"
                >
                  Coordinator
                </button>
                <span className="text-border">·</span>
                <button
                  type="button"
                  onClick={() => handleQuickPersona("desk_admin")}
                  disabled={isSubmitting}
                  className="hover:text-foreground transition-colors"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>

          {/* Serene Visual Column */}
          <div className="md:col-span-5 relative hidden md:block overflow-hidden bg-muted border-l border-border/60">
            <Image
              src="/image/constituency-open-desk.png"
              alt="Mayang Imphal Constituency Desk"
              fill
              priority
              sizes="(max-width: 1024px) 350px, 400px"
              className="object-cover"
            />
            {/* Subtle scrim only at the bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-[11px] font-sans text-white/90">
              Mayang Imphal · AC-23 Desk
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Footer */}
      <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 pt-1">
        <span>
          New constituent?{" "}
          <Link
            href="/register"
            className="text-foreground underline underline-offset-4 font-medium hover:text-primary dark:hover:text-emerald-400"
          >
            Register
          </Link>
        </span>
        <span className="text-border">·</span>
        <span className="text-[11px]">DPDP Act 2023 Compliant</span>
      </div>
    </div>
  )
}
