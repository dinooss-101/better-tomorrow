"use client"

import React, { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { MapPin, Clock, Mail, Phone, ArrowLeft, Send, Shield, Lock, EyeOff, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ContactPage() {
  const [category, setCategory] = useState("drainage")
  const [ward, setWard] = useState("ward-1")
  const [description, setDescription] = useState("")
  const [mode, setMode] = useState<"confidential" | "anonymous">("confidential")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const officeDetails = [
    {
      icon: MapPin,
      label: "Constituency Office",
      value: "Central Bazaar Corridor, Mayang Imphal",
    },
    {
      icon: Clock,
      label: "Open Grievance Hours",
      value: "Every Saturday, 08:30 AM to 12:30 PM",
    },
    {
      icon: Mail,
      label: "Correspondence",
      value: "desk@bettermayangimphal.org",
    },
    {
      icon: Phone,
      label: "Constituency Ward Desk",
      value: "Available during open office hours only",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-border bg-background pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8 min-h-11"
            >
              <ArrowLeft className="size-3.5" />
              Back to Mayang Imphal Platform
            </Link>

            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-secondary block mb-2">
                Direct access
              </span>
              <h1 className="font-headline text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.14]">
                Contact the constituency desk.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                Direct access to our ward team in Mayang Imphal. No gatekeepers. No agents. Log a priority or attend open office hours.
              </p>
            </div>
          </div>
        </section>

        {/* Office Info + Form */}
        <section className="border-b border-border bg-background py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

              {/* Left: Office Details */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-5">
                  {officeDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <div className="flex size-8 shrink-0 items-center justify-center border border-border bg-card text-secondary mt-0.5">
                        <item.icon className="size-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Ward Coverage */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-foreground block">Ward coverage (12 Wards)</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    {[
                      "Ward 1: Bazar Central",
                      "Ward 2: Chabung Company",
                      "Ward 3: Thana Leikai",
                      "Ward 4: Kokchai",
                      "Ward 5: Bengoon",
                      "Ward 6: Konchak",
                      "Ward 7: Chirai",
                      "Ward 8: Charoibung",
                      "Ward 9: Heigrumakhong",
                      "Ward 10: Moijing Corridor",
                      "Ward 11: Bengoon Mamang",
                      "Ward 12: Konchak Awang",
                    ].map((w) => (
                      <div key={w} className="border border-border/60 bg-muted/20 px-2.5 py-1.5 text-[11px]">
                        {w}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* DPDP Note */}
                <div className="border border-border/80 bg-muted/20 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <Shield className="size-3.5 text-secondary" />
                    <span>DPDP Act 2025 Compliant</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Zero Aadhaar harvesting. No family documents. No banking credentials collected at any point.
                  </p>
                </div>
              </div>

              {/* Right: Intake Form */}
              <div className="lg:col-span-7">
                <div className="mb-6">
                  <span className="text-xs font-semibold text-secondary block mb-1">
                    Citizen priority intake
                  </span>
                  <h2 className="font-headline text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                    Log a ward issue directly.
                  </h2>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Drainage, school labs, roads, or livelihood support. Every submission is reviewed at the weekly ward consultation.
                  </p>
                </div>

                <div className="border border-border bg-card p-4 sm:p-8 shadow-xs">
                  <div className="mb-4 inline-flex items-center gap-1.5 border border-border/80 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    <span>Demonstration prototype · Client-side preview</span>
                  </div>
                  {submitted ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="mx-auto flex size-12 items-center justify-center border border-secondary bg-secondary/10 text-secondary">
                        <CheckCircle className="size-6" />
                      </div>
                      <h3 className="font-headline text-xl font-semibold text-foreground">
                        Demonstration Preview Generated
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        This demonstration preview simulated a {mode === "confidential" ? "confidential token" : "anonymous session"}. In this public preview, no data is dispatched to staff. For official assistance, please attend Saturday open grievance hours at the Central Bazaar Corridor office.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false)
                          setDescription("")
                        }}
                        className="mt-2 text-xs font-semibold"
                      >
                        Reset demonstration
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label htmlFor="contact-cat" className="text-xs font-semibold text-foreground block">
                            Civic category
                          </label>
                          <select
                            id="contact-cat"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-border bg-background px-3 py-2.5 text-base sm:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
                          >
                            <option value="drainage">Drainage &amp; Flood Mitigation</option>
                            <option value="education">School STEM &amp; Future Labs</option>
                            <option value="roads">Ward Roads &amp; Streetlighting</option>
                            <option value="livelihood">Weaver &amp; Agrarian Support</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="contact-ward" className="text-xs font-semibold text-foreground block">
                            Ward location
                          </label>
                          <select
                            id="contact-ward"
                            value={ward}
                            onChange={(e) => setWard(e.target.value)}
                            className="w-full border border-border bg-background px-3 py-2.5 text-base sm:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
                          >
                            <option value="ward-1">Ward 1: Bazar Central</option>
                            <option value="ward-2">Ward 2: Chabung Company</option>
                            <option value="ward-3">Ward 3: Thana Leikai</option>
                            <option value="ward-4">Ward 4: Kokchai</option>
                            <option value="ward-5">Ward 5: Bengoon</option>
                            <option value="ward-6">Ward 6: Konchak</option>
                            <option value="ward-7">Ward 7: Chirai</option>
                            <option value="ward-8">Ward 8: Charoibung</option>
                            <option value="ward-9">Ward 9: Heigrumakhong</option>
                            <option value="ward-10">Ward 10: Moijing Corridor</option>
                            <option value="ward-11">Ward 11: Bengoon Mamang</option>
                            <option value="ward-12">Ward 12: Konchak Awang</option>
                            <option value="peripheral">Peripheral Boundary Area</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-desc" className="text-xs font-semibold text-foreground block">
                          Situation &amp; physical landmarks
                        </label>
                        <textarea
                          id="contact-desc"
                          rows={5}
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe the issue, physical landmarks, and estimated community impact..."
                          className="w-full border border-border bg-background p-3 text-base sm:text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-secondary resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-foreground block">
                          Submission privacy mode
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label
                            onClick={() => setMode("confidential")}
                            className="flex items-start gap-2.5 cursor-pointer py-1.5"
                          >
                            <input
                              type="radio"
                              name="contact-mode"
                              checked={mode === "confidential"}
                              onChange={() => setMode("confidential")}
                              className="mt-0.5 accent-secondary"
                            />
                            <div>
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                                <Lock className="size-3 text-secondary" />
                                <span>Confidential follow-up</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                                Encrypted token for correspondence without public name display.
                              </p>
                            </div>
                          </label>

                          <label
                            onClick={() => setMode("anonymous")}
                            className="flex items-start gap-2.5 cursor-pointer py-1.5"
                          >
                            <input
                              type="radio"
                              name="contact-mode"
                              checked={mode === "anonymous"}
                              onChange={() => setMode("anonymous")}
                              className="mt-0.5 accent-secondary"
                            />
                            <div>
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                                <EyeOff className="size-3 text-secondary" />
                                <span>Completely anonymous</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                                Zero identifying metadata or correspondence footprint preserved.
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border/40">
                        <span className="text-[11px] text-muted-foreground text-center sm:text-left">
                          Evaluated in local client session
                        </span>
                        <Button
                          type="submit"
                          className="px-6 py-2.5 min-h-11 text-xs font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          <span>Submit priority to desk</span>
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
