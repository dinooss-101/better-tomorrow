"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  Send,
  Shield,
  Lock,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CANONICAL_WARDS } from "@/lib/data/wards"
import { useAuth } from "@/lib/auth/auth-context"
import { WardNumber } from "@/lib/types/auth"
import { GrievanceCategory } from "@/lib/types/dashboard"

export function ContactView() {
  const { user, addGrievance } = useAuth()
  const [category, setCategory] = useState("drainage")
  const [ward, setWard] = useState<number>(5)
  const [description, setDescription] = useState("")
  const [mode, setMode] = useState<"confidential" | "anonymous">("confidential")
  const [submitted, setSubmitted] = useState(false)
  const [createdTicketId, setCreatedTicketId] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const wardNum = Number(ward) as WardNumber
    const targetWard = CANONICAL_WARDS.find((w) => w.ward === wardNum) || CANONICAL_WARDS[4]
    const categoryMap: Record<string, GrievanceCategory> = {
      drainage: "WATER_AND_DRAINAGE",
      education: "EDUCATION_STEM",
      roads: "ROAD_CONNECTIVITY",
      livelihood: "MUNICIPAL_SERVICES",
    }

    const generatedId = `DEMO-2026-${Date.now().toString().slice(-4)}`

    addGrievance({
      citizenId: user?.id || `demo_cit_${Date.now()}`,
      citizenName: mode === "anonymous" ? "Anonymous Constituent" : (user?.name || "Constituency Resident"),
      citizenContact: mode === "anonymous" ? "Hidden (Anonymous)" : (user?.phone || "+91 98620 XXXXX"),
      ward: targetWard.ward,
      locality: `${targetWard.name} (${targetWard.keyLandmark})`,
      title: description.length > 55 ? `${description.slice(0, 52).trim()}...` : description,
      description,
      category: categoryMap[category] || "WATER_AND_DRAINAGE",
      priority: "ROUTINE",
      status: "PROPOSED",
    })

    setCreatedTicketId(generatedId)
    setSubmitted(true)
  }

  const officeDetails = [
    {
      icon: MapPin,
      label: "Constituency Office",
      value: "Central Bazaar Corridor, Ward 5, Mayang Imphal",
    },
    {
      icon: Clock,
      label: "Open Grievance Hours",
      value: "Every Saturday, 08:30 AM to 12:30 PM",
    },
    {
      icon: Mail,
      label: "Constituent Correspondence",
      value: "desk@bettermayangimphal.org",
    },
    {
      icon: Phone,
      label: "Saturday Casework Desk",
      value: "+91 98620 12345 (Office Hours Only)",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section
          id="hero"
          className="relative flex flex-col justify-center border-b border-border bg-background min-h-0 md:min-h-[min(calc(100dvh-3.75rem),48rem)] 2xl:min-h-[min(calc(100dvh-3.75rem),54rem)] py-8 sm:py-10 md:py-14 2xl:py-20 3xl:py-24 in-data-[density=compact]:py-4 in-data-[density=compact]:sm:py-6 in-data-[density=compact]:md:py-8 overflow-hidden"
        >
          {/* Subtle Atmospheric Ambient Radial Light for 4K / Large Desktop Monitors */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)/0.035,transparent_75%)] pointer-events-none" />
          <div className="relative mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10 w-full">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-7">
                <Link
                  href="/"
                  className="font-ui inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors w-fit"
                >
                  <ArrowLeft className="size-3.5" /> Overview
                </Link>

                <div className="flex items-center gap-2">
                  <span className="font-ui text-xs font-semibold uppercase tracking-wider text-primary">
                    Direct access
                  </span>
                  <span className="text-muted-foreground/80">/</span>
                  <span className="font-ui text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Open Constituency Desk
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight uppercase">
                  Contact the constituency desk.
                </h1>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5 max-w-2xl font-normal tracking-normal">
                  Public service begins with presence. We maintain regular physical office hours every Saturday morning for constituent inquiries, municipal feedback, and scholarship guidance.
                </p>

                {/* Operator Delimitation Banner */}
                <div className="mt-2 border-l-2 border-primary bg-muted/30 p-3 text-[11px] font-sans text-muted-foreground leading-relaxed">
                  <div className="flex items-center gap-1.5 font-ui font-semibold text-foreground uppercase tracking-wider text-[10px] mb-0.5">
                    <Building2 className="size-3 text-primary" />
                    <span>Statutory Execution Notice</span>
                  </div>
                  This desk is operated by the Constituency Office of Dr. Khumujam Ratankumar Singh, MLA (Mayang Imphal AC-23) for citizen casework and transparency facilitation. Statutory municipal sanitation and civil works are executed by the Mayang Imphal Municipal Council (MIMC) and state line departments.
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#intake"
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-2 font-ui text-xs font-semibold tracking-wider text-primary-foreground uppercase transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <span>Log Issue Below</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                  <a
                    href="mailto:desk@bettermayangimphal.org"
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-card px-5 py-2 font-ui text-xs font-semibold tracking-wider text-foreground uppercase transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <Mail className="size-3.5 text-primary" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-xs xl:max-w-sm border border-border/80 bg-card p-2.5 sm:p-3 shadow-xs">
                  <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden bg-muted/20">
                    <Image
                      src="/image/constituency-office-intake.png"
                      alt="Dr. Khumujam Ratankumar Singh meeting residents at Saturday grievance desk in Mayang Imphal"
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-2.5 border-t border-border/40 pt-2 text-center text-[11px] font-sans text-muted-foreground">
                    Open Office &amp; Grievance Intake · Ward 5, Central Bazar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Info + Form */}
        <section id="intake" className="border-b border-border bg-background py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">

              {/* Left: Office Details */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-6">
                  {officeDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex size-9 shrink-0 items-center justify-center border border-border bg-card text-primary mt-0.5">
                        <item.icon className="size-4" />
                      </div>
                      <div>
                        <div className="text-xs font-ui font-semibold uppercase tracking-wider text-foreground">{item.label}</div>
                        <div className="font-sans text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Canonical Ward Directory */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-ui font-semibold uppercase tracking-wider text-foreground block">
                      Canonical Ward Coverage (12 Wards)
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">LGD 250326</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground font-sans">
                    {CANONICAL_WARDS.map((w) => (
                      <div key={w.ward} className="border border-border/60 bg-muted/20 px-2.5 py-1.5 text-xs">
                        <div className="font-semibold text-foreground font-ui">
                          Ward {w.ward}: {w.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate" title={w.keyLandmark}>
                          {w.keyLandmark}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Privacy Assurance */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-primary" />
                    <span className="text-xs font-ui font-semibold uppercase tracking-wider text-foreground">DPDP Principles Alignment</span>
                  </div>
                  <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                    Operated in proactive alignment with the Digital Personal Data Protection Act 2023 (DPDP Act 2023) principles. Personal contact data is collected strictly for grievance verification and triage follow-ups.
                  </p>
                </div>
              </div>

              {/* Right: Intake Form */}
              <div className="lg:col-span-7">
                <div className="mb-8">
                  <span className="font-ui text-xs font-bold uppercase tracking-wider text-primary block mb-1.5">
                    Citizen priority intake
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground leading-tight">
                    Log a ward issue directly.
                  </h2>
                  <p className="mt-2.5 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Drainage outfalls, school labs, road culverts, or agrarian support. Every submission is reviewed at the weekly ward casework consultation.
                  </p>
                </div>

                <div className="border border-border bg-card p-6 sm:p-10 lg:p-12 shadow-xs">
                  {/* Public Demonstration Notice */}
                  <div className="mb-6 flex items-start gap-2.5 border border-primary/30 bg-primary/5 p-3 text-xs font-sans text-foreground">
                    <AlertCircle className="size-4 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-ui font-bold uppercase tracking-wider text-[11px] text-primary">
                        Demonstration Prototype · Live Client-Side Docket
                      </div>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        Submissions below log directly into your browser session&apos;s active casework docket. You can inspect and triage the ticket in real time within the Casework Queue.
                      </p>
                    </div>
                  </div>

                  {submitted ? (
                    <div className="text-center py-10 space-y-5">
                      <div className="mx-auto flex size-14 items-center justify-center border border-primary bg-primary/10 text-primary">
                        <CheckCircle className="size-7" />
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase">
                          {createdTicketId}
                        </span>
                        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                          Casework Ticket Generated
                        </h3>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Your submission has been logged into the local session docket. You can inspect this ticket, assign ward coordinators, and record verification notes directly in the Casework Dashboard.
                      </p>
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                          href="/dashboard/grievances"
                          className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-2 font-ui text-xs font-semibold tracking-wider text-primary-foreground uppercase transition-all hover:bg-primary/90"
                        >
                          <span>View in Casework Queue</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSubmitted(false)
                            setDescription("")
                          }}
                          className="text-xs font-ui uppercase tracking-wider font-bold min-h-11 px-5"
                        >
                          Log Another Issue
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-7">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="contact-cat" className="text-xs font-ui uppercase tracking-wider font-semibold text-foreground block">
                            Civic category
                          </label>
                          <select
                            id="contact-cat"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-border bg-background px-3.5 py-3 text-base sm:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-11 font-sans"
                          >
                            <option value="drainage">Drainage &amp; Flood Mitigation</option>
                            <option value="education">School STEM &amp; Future Labs</option>
                            <option value="roads">Ward Roads &amp; Streetlighting</option>
                            <option value="livelihood">Weaver &amp; Agrarian Support</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="contact-ward" className="text-xs font-ui uppercase tracking-wider font-semibold text-foreground block">
                            Ward location (Canonical Directory)
                          </label>
                          <select
                            id="contact-ward"
                            value={ward}
                            onChange={(e) => setWard(Number(e.target.value))}
                            className="w-full border border-border bg-background px-3.5 py-3 text-base sm:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-11 font-sans"
                          >
                            {CANONICAL_WARDS.map((w) => (
                              <option key={w.ward} value={w.ward}>
                                Ward {w.ward}: {w.name} · {w.keyLandmark}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="contact-desc" className="text-xs font-ui uppercase tracking-wider font-semibold text-foreground block">
                          Situation &amp; physical landmarks
                        </label>
                        <textarea
                          id="contact-desc"
                          rows={5}
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe the issue, physical landmarks (e.g. culvert opposite market shed), and community impact..."
                          className="w-full border border-border bg-background p-3.5 text-base sm:text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none font-sans leading-relaxed"
                        />
                      </div>

                      <div className="space-y-3">
                        <span className="text-xs font-ui uppercase tracking-wider font-semibold text-foreground block">
                          Submission privacy mode
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <label
                            onClick={() => setMode("confidential")}
                            className="flex items-start gap-3 cursor-pointer py-1.5"
                          >
                            <input
                              type="radio"
                              name="contact-mode"
                              checked={mode === "confidential"}
                              onChange={() => setMode("confidential")}
                              className="mt-1 accent-primary"
                            />
                            <div>
                              <div className="flex items-center gap-1.5 text-xs font-ui font-semibold uppercase tracking-wider text-foreground">
                                <Lock className="size-3 text-primary" />
                                <span>Confidential follow-up</span>
                              </div>
                              <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
                                Encrypted token for correspondence without public name display.
                              </p>
                            </div>
                          </label>

                          <label
                            onClick={() => setMode("anonymous")}
                            className="flex items-start gap-3 cursor-pointer py-1.5"
                          >
                            <input
                              type="radio"
                              name="contact-mode"
                              checked={mode === "anonymous"}
                              onChange={() => setMode("anonymous")}
                              className="mt-1 accent-primary"
                            />
                            <div>
                              <div className="flex items-center gap-1.5 text-xs font-ui font-semibold uppercase tracking-wider text-foreground">
                                <EyeOff className="size-3 text-primary" />
                                <span>Completely anonymous</span>
                              </div>
                              <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
                                Zero identifying metadata or correspondence footprint preserved.
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-border/40">
                        <span className="font-ui text-xs uppercase tracking-wider text-muted-foreground text-center sm:text-left">
                          Simulated in local browser session
                        </span>
                        <Button
                          type="submit"
                          className="px-8 py-3 min-h-12 text-xs font-ui font-bold uppercase tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          <span>Log Issue to Docket</span>
                          <Send className="size-3.5" />
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
