"use client"

import React, { useState } from "react"
import { Send, Shield, Lock, EyeOff, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PoliticianIntake() {
  const [category, setCategory] = useState("drainage")
  const [ward, setWard] = useState("ward-1")
  const [description, setDescription] = useState("")
  const [mode, setMode] = useState<"confidential" | "anonymous">("confidential")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28" id="constituent-desk">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-headline text-2xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Direct constituent desk.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Log local ward issues, drainage blockages, or school lab requests directly with our team in Mayang Imphal.
          </p>
        </div>

        {/* DPDP Privacy Badge Banner */}
        <div className="border border-border/80 bg-muted/20 p-3.5 mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-secondary shrink-0" />
            <span>Digital Personal Data Protection Act 2025 compliant</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-muted-foreground">Zero Aadhaar harvesting</span>
        </div>

        {/* Form Container with Single Containment Layer */}
        <div className="border border-border bg-card p-4 sm:p-10 shadow-xs">
          <div className="mb-4 inline-flex items-center gap-1.5 border border-border/80 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <span>Demonstration prototype · Client-side preview</span>
          </div>
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="mx-auto flex size-12 items-center justify-center border border-secondary bg-secondary/10 text-secondary">
                <CheckCircle className="size-6" />
              </div>
              <h3 className="font-headline text-xl font-semibold text-foreground">
                Demonstration Preview Generated
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                This client-side preview generated a simulated {mode === "confidential" ? "confidential token" : "anonymous session"}. In this public demonstration, no record is transmitted. For official assistance, please attend Saturday open grievance hours at the Central Bazaar Corridor office.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  setDescription("")
                }}
                className="mt-3 text-xs font-semibold"
              >
                Reset demonstration
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Civic Category */}
                <div className="space-y-1.5">
                  <label htmlFor="civic-cat" className="text-xs font-semibold text-foreground block">
                    Civic category
                  </label>
                  <select
                    id="civic-cat"
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

                {/* Ward Selection */}
                <div className="space-y-1.5">
                  <label htmlFor="civic-ward" className="text-xs font-semibold text-foreground block">
                    Ward location
                  </label>
                  <select
                    id="civic-ward"
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

              {/* Description */}
              <div className="space-y-1.5">
                <label htmlFor="civic-desc" className="text-xs font-semibold text-foreground block">
                  Situation &amp; physical landmarks
                </label>
                <textarea
                  id="civic-desc"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue, physical landmarks, and estimated community impact..."
                  className="w-full border border-border bg-background p-3 text-base sm:text-xs text-foreground placeholder:text-muted-foreground/75 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              {/* Privacy Mode */}
              <fieldset className="space-y-2 border-0 p-0 m-0">
                <legend className="text-xs font-semibold text-foreground block mb-1">
                  Submission privacy mode
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-2.5 cursor-pointer py-1.5">
                    <input
                      type="radio"
                      name="intake-mode"
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

                  <label className="flex items-start gap-2.5 cursor-pointer py-1.5">
                    <input
                      type="radio"
                      name="intake-mode"
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
              </fieldset>

              {/* Submit */}
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
    </section>
  )
}
