"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth/auth-context"
import { WardNumber } from "@/lib/types/auth"
import { WARD_OPTIONS } from "@/lib/data/mock-user-data"
import { TextLogo } from "@/components/text-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const { register, isLoading } = useAuth()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [ward, setWard] = useState<WardNumber>(5)
  const [dpdpConsent, setDpdpConsent] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter your full name.")
      return
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit mobile number.")
      return
    }
    if (!dpdpConsent) {
      setError("Please acknowledge the statutory DPDP consent to proceed.")
      return
    }
    setError("")
    setIsSubmitting(true)

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
      setError("Failed to create profile. Please check your details.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("w-full max-w-3xl mx-auto flex flex-col gap-2.5 sm:gap-3", className)} {...props}>
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
        <CardContent className="grid p-0 md:grid-cols-12 items-stretch">
          {/* Form Column */}
          <div className="md:col-span-7 p-5 sm:p-6 md:p-7 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {/* Logo & Calm Heading */}
              <div>
                <Link href="/" className="inline-block mb-1.5">
                  <TextLogo size="sm" />
                </Link>
                <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
                  Citizen Profile
                </h1>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Enroll to log ward priority issues and track constituency casework.
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

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Row 1: Full Name & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="name" className="text-xs font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Khumukcham Sanajaoba"
                      className="h-9 text-xs"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="reg-phone" className="text-xs font-medium">
                      Mobile Number
                    </Label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground pointer-events-none">
                        +91
                      </span>
                      <Input
                        id="reg-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98620 12345"
                        className="pl-10 h-9 font-mono text-xs"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Residential Ward & Optional Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="ward" className="text-xs font-medium">
                      Residential Ward
                    </Label>
                    <select
                      id="ward"
                      value={ward}
                      onChange={(e) => setWard(Number(e.target.value) as WardNumber)}
                      className="h-9 w-full border border-input bg-transparent px-2 text-xs rounded-none font-sans text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                    >
                      {WARD_OPTIONS.map((opt) => (
                        <option key={opt.ward} value={opt.ward} className="bg-background text-foreground">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="reg-email" className="text-xs font-medium">
                      Email <span className="text-muted-foreground font-normal">(Optional)</span>
                    </Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="h-9 text-xs"
                    />
                  </div>
                </div>

                {/* DPDP Consent */}
                <div className="pt-0.5">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={dpdpConsent}
                      onChange={(e) => setDpdpConsent(e.target.checked)}
                      className="size-3.5 mt-0.5 rounded-none border-input text-primary focus:ring-primary accent-primary shrink-0"
                    />
                    <span className="text-[11px] font-sans text-muted-foreground leading-tight">
                      I consent to contact processing for municipal casework triage under the <strong>DPDP Act 2023</strong>.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full h-9 font-ui uppercase tracking-wider text-xs font-semibold mt-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin mr-1.5" /> Enrolling...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </form>
            </div>

            {/* Bottom Form Link */}
            <div className="pt-2.5 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span>Already registered?</span>
              <Link
                href="/login"
                className="font-ui text-xs font-semibold uppercase tracking-wider text-primary hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Serene Visual Column */}
          <div className="md:col-span-5 relative hidden md:block overflow-hidden bg-muted border-l border-border/60">
            <Image
              src="/image/civic-audit-field-verification.png"
              alt="Mayang Imphal Citizen Enrollment and Ground Verification"
              fill
              priority
              sizes="(max-width: 1024px) 350px, 400px"
              className="object-cover"
            />
            {/* Subtle scrim only at the bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-[11px] font-sans text-white/90">
              Mayang Imphal · Citizen Directory
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Footer */}
      <div className="text-center text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-1">
        <span>Mayang Imphal Civic Leadership Platform</span>
        <span className="text-border">·</span>
        <span className="text-[11px]">DPDP Act 2023 Compliant</span>
      </div>
    </div>
  )
}

