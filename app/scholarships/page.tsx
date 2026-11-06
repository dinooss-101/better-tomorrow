"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { ScholarshipCard } from "@/components/scholarship-card"
import { mockScholarships } from "@/lib/data/scholarships"
import type { ScholarshipLevel } from "@/lib/types/scholarship"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { RegisterInterestDialog } from "@/components/modals/register-interest-dialog"
import {
  ArrowLeft,
  Search,
  GraduationCap,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Check,
  Download,
  Share2,
  RotateCcw,
} from "lucide-react"

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCycle, setSelectedCycle] = useState<string>("ALL")
  const [selectedLevel, setSelectedLevel] = useState<ScholarshipLevel | "ALL">("ALL")
  const [copied, setCopied] = useState(false)

  const cycleLabels: Record<string, string> = {
    ALL: "All Cycles (Fresh & Renewal)",
    FRESH: "Fresh Applications Only",
    RENEWAL: "Renewal Applications Only",
  }

  const levelLabels: Record<ScholarshipLevel | "ALL", string> = {
    ALL: "All Academic Levels",
    HIGHER_SECONDARY: "Class 11 & 12 (Higher Secondary)",
    UNDERGRADUATE: "Undergraduate / Degree Courses",
    POSTGRADUATE: "Postgraduate / Master's Courses",
    RESEARCH_FELLOWSHIP: "Research / Ph.D. Fellowship",
  }

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter((scheme) => {
      // Cycle Filter
      if (selectedCycle !== "ALL") {
        if (selectedCycle === "FRESH" && scheme.applicationCycle === "RENEWAL") return false
        if (selectedCycle === "RENEWAL" && scheme.applicationCycle === "FRESH") return false
      }

      // Level Filter
      if (selectedLevel !== "ALL") {
        const matchesLevel =
          scheme.level === selectedLevel ||
          Boolean(scheme.levels?.includes(selectedLevel))
        if (!matchesLevel) return false
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = scheme.name.toLowerCase().includes(q)
        const matchesSponsor = scheme.officialSponsor.toLowerCase().includes(q)
        const matchesTarget = scheme.targetGroup.toLowerCase().includes(q)
        const matchesSummary = scheme.eligibilitySummary.toLowerCase().includes(q)
        if (!matchesName && !matchesSponsor && !matchesTarget && !matchesSummary) return false
      }

      return true
    })
  }, [searchQuery, selectedCycle, selectedLevel])

  const handleCopyDeadlines = async () => {
    const text = filteredScholarships
      .map((s) => `${s.name} | Deadline: ${s.studentDeadline || "TBA"} | Sponsor: ${s.officialSponsor} | Portal: scholarships.gov.in`)
      .join("\n\n")
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch {
        // clipboard access unavailable or denied
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Hero */}
        <div className="bg-primary text-primary-foreground py-12 sm:py-16 md:py-20 border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/80 hover:text-primary-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors w-fit"
              >
                <ArrowLeft className="size-3.5" /> Back to Overview
              </Link>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-none border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground text-xs font-medium">
                  Academic Year 2026 to 2027
                </Badge>
                <span className="text-xs text-primary-foreground/80">National Scholarship Portal Verified</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-primary-foreground leading-tight">
                Scholarships &amp; Global Pathways
              </h1>

              <p className="text-sm sm:text-base text-primary-foreground/85 leading-relaxed">
                Direct, transparent access to central and state scholarship schemes for students of Mayang Imphal, paired with screened mentorship to connect national and international higher education opportunities.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <RegisterInterestDialog initialProgramType="SCHOLARSHIP_ALERT">
                  <Button className="rounded-none bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs sm:text-sm font-semibold min-h-11 justify-center active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50">
                    Get Deadline Alerts via Email
                  </Button>
                </RegisterInterestDialog>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-primary-foreground/80 hover:text-primary-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary py-2.5 px-3 min-h-11 border border-primary-foreground/30 rounded-none transition-colors"
                >
                  <span>Visit National Scholarship Portal</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Directory Controls & Listings with Dropdown Menus */}
        <section className="py-8 sm:py-12 bg-background border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filter Controls Bar */}
            <div className="rounded-none border border-border/80 bg-card p-4 sm:p-5 mb-8 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                {/* Search Field */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3 top-3 sm:top-2.5 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by scheme name, sponsor, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-base sm:text-sm h-10 sm:h-9 rounded-none"
                  />
                </div>

                {/* Application Cycle Dropdown Menu */}
                <div className="md:col-span-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" size="sm" className="w-full justify-between h-10 sm:h-9 text-xs font-normal border-border bg-background rounded-none">
                          <span className="truncate">{cycleLabels[selectedCycle]}</span>
                          <ChevronDown className="size-3.5 opacity-60 shrink-0" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] sm:w-60 max-w-xs p-1 bg-popover border border-border/80 shadow-md rounded-none">
                      <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                        Filter by Application Cycle
                      </DropdownMenuLabel>
                      {Object.entries(cycleLabels).map(([key, label]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => setSelectedCycle(key)}
                          className="flex items-center justify-between text-xs py-1.5 px-2 rounded-none cursor-pointer"
                        >
                          <span className="truncate">{label}</span>
                          {selectedCycle === key && <Check className="size-3.5 text-secondary shrink-0" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Study Level Dropdown Menu */}
                <div className="md:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" size="sm" className="w-full justify-between h-10 sm:h-9 text-xs font-normal border-border bg-background rounded-none">
                          <span className="truncate">{levelLabels[selectedLevel]}</span>
                          <ChevronDown className="size-3.5 opacity-60 shrink-0" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] sm:w-64 max-w-xs p-1 bg-popover border border-border/80 shadow-md rounded-none">
                      <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                        Filter by Study Level
                      </DropdownMenuLabel>
                      {(Object.entries(levelLabels) as [ScholarshipLevel | "ALL", string][]).map(([key, label]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => setSelectedLevel(key)}
                          className="flex items-center justify-between text-xs py-1.5 px-2 rounded-none cursor-pointer"
                        >
                          <span className="truncate">{label}</span>
                          {selectedLevel === key && <Check className="size-3.5 text-secondary shrink-0" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Data Actions Dropdown Menu */}
                <div className="md:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" size="sm" className="w-full justify-between h-10 sm:h-9 text-xs font-medium border-border bg-background rounded-none">
                          <span className="inline-flex items-center gap-1.5">
                            <Download className="size-3.5 text-secondary" />
                            <span>Export</span>
                          </span>
                          <ChevronDown className="size-3.5 opacity-60 shrink-0" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] sm:w-60 max-w-xs p-1 bg-popover border border-border/80 shadow-md rounded-none">
                      <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                        Scholarship Data Options
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={handleCopyDeadlines}
                        className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-none cursor-pointer"
                      >
                        <Share2 className="size-3.5 text-muted-foreground" />
                        <span>{copied ? "Deadlines Copied!" : "Copy Active Deadlines"}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem
                        render={
                          <a
                            href="https://scholarships.gov.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs py-1.5 px-2 rounded-none cursor-pointer"
                          />
                        }
                      >
                        <span>Open National Portal</span>
                        <ExternalLink className="size-3 text-muted-foreground" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Active Results Summary */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs text-muted-foreground">
                <span>
                  Showing <strong>{filteredScholarships.length}</strong> of {mockScholarships.length} verified schemes
                </span>
                {(searchQuery || selectedCycle !== "ALL" || selectedLevel !== "ALL") && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCycle("ALL")
                      setSelectedLevel("ALL")
                    }}
                    className="inline-flex items-center gap-1 text-secondary hover:underline font-medium cursor-pointer"
                  >
                    <RotateCcw className="size-3" />
                    <span>Reset all filters</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scheme Cards Grid */}
            {filteredScholarships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.map((sch) => (
                  <ScholarshipCard key={sch.id} scholarship={sch} />
                ))}
              </div>
            ) : (
              <div className="rounded-none border border-dashed border-border p-12 text-center flex flex-col items-center justify-center gap-3">
                <GraduationCap className="size-10 text-muted-foreground" />
                <h3 className="font-heading text-lg font-semibold text-foreground">No matching schemes found</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Try adjusting your search keywords or switching filters back to &ldquo;All Cycles&rdquo;.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCycle("ALL")
                    setSelectedLevel("ALL")
                  }}
                  className="mt-2 text-xs rounded-none"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Essential Documents & Checklist */}
        <section className="py-14 bg-muted/30 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Before You Apply on the National Scholarship Portal
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                Most scholarship rejections occur due to document mismatches. Prepare these four items in advance:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-none border border-border/80 bg-card p-4 flex flex-col gap-2">
                <div className="font-mono font-semibold text-xs text-secondary">01. Income Certificate</div>
                <h4 className="font-heading text-sm font-semibold text-foreground">Valid Revenue Authority Certificate</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Issued by a competent Sub-Divisional Officer (SDO) or Deputy Commissioner. Ensure it is within the current financial year.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-4 flex flex-col gap-2">
                <div className="font-mono font-semibold text-xs text-secondary">02. Permanent Residence</div>
                <h4 className="font-heading text-sm font-semibold text-foreground">Domicile / PRC (Manipur)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Essential for Ishan Uday and NEC Merit schemes. Domicile certificates must match the student&apos;s name and parents&apos; names exactly.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-4 flex flex-col gap-2">
                <div className="font-mono font-semibold text-xs text-nordic-amber">03. Aadhaar-Seeded Account</div>
                <h4 className="font-heading text-sm font-semibold text-foreground">Active DBT Bank Account</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The applicant&apos;s bank account must be linked to Aadhaar (NPCI mapping) for Direct Benefit Transfer disbursement.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-4 flex flex-col gap-2">
                <div className="font-mono font-semibold text-xs text-secondary">04. AISHE / UDISE Code</div>
                <h4 className="font-heading text-sm font-semibold text-foreground">Registered Institute</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Confirm that your college or higher secondary school has an active Nodal Officer registered on the NSP portal for verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diaspora Mentoring & Safeguarding */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-none border border-border/80 bg-card p-8 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-secondary/30 text-secondary text-xs font-medium rounded-none">
                      Proposed Mentorship Circle
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">Community Initiative</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                    Connecting Mayang Imphal Youth to Global Diaspora Mentors
                  </h2>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Higher education is about more than filling out scholarship forms. Our proposed mentor network connects aspiring college applicants with Manipuri researchers, software engineers, and civil service scholars who have navigated competitive admissions across India and abroad.
                  </p>

                  <div className="rounded-none border border-border/70 bg-muted/30 p-4 flex items-start gap-3">
                    <ShieldCheck className="size-5 text-secondary shrink-0 mt-0.5" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground block mb-0.5">Strict Child Safeguarding &amp; Screening Policy:</strong>
                      All volunteer mentors undergo identity and professional verification. In compliance with the Digital Personal Data Protection (DPDP) Act and international child safeguarding standards, all interactions with secondary school students are conducted as supervised group workshops with parental consent. Direct private unrecorded communication with minors is strictly prohibited.
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <RegisterInterestDialog initialProgramType="DIASPORA_MENTOR">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold py-3 rounded-none active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50">
                      Volunteer as a Diaspora Mentor
                    </Button>
                  </RegisterInterestDialog>

                  <RegisterInterestDialog initialProgramType="FUTURE_LABS">
                    <Button size="lg" variant="outline" className="w-full text-xs sm:text-sm font-semibold py-3 rounded-none active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50">
                      Student / Parent Guidance Registration
                    </Button>
                  </RegisterInterestDialog>

                  <span className="text-[11px] text-center text-muted-foreground">
                    Non-commercial civic initiative · Zero fees
                  </span>
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
