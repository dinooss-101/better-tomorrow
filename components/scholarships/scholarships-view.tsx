"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
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
  DropdownMenuGroup,
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

export function ScholarshipsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCycle, setSelectedCycle] = useState<string>("ALL")
  const [selectedLevel, setSelectedLevel] = useState<ScholarshipLevel | "ALL">(
    "ALL"
  )
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
        if (selectedCycle === "FRESH" && scheme.applicationCycle === "RENEWAL")
          return false
        if (selectedCycle === "RENEWAL" && scheme.applicationCycle === "FRESH")
          return false
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
        const matchesSummary = scheme.eligibilitySummary
          .toLowerCase()
          .includes(q)
        if (
          !matchesName &&
          !matchesSponsor &&
          !matchesTarget &&
          !matchesSummary
        )
          return false
      }

      return true
    })
  }, [searchQuery, selectedCycle, selectedLevel])

  const handleCopyDeadlines = async () => {
    const text = filteredScholarships
      .map(
        (s) =>
          `${s.name} | Deadline: ${s.studentDeadline || "TBA"} | Sponsor: ${s.officialSponsor} | Portal: scholarships.gov.in`
      )
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
        <section
          id="hero"
          className="relative flex flex-col justify-center border-b border-border bg-background min-h-0 md:min-h-[min(calc(100dvh-3.75rem),40rem)] 2xl:min-h-[min(calc(100dvh-3.75rem),44rem)] py-8 sm:py-10 md:py-12 2xl:py-14 in-data-[density=compact]:py-4 in-data-[density=compact]:sm:py-6 in-data-[density=compact]:md:py-8 overflow-hidden"
        >
          {/* Subtle Atmospheric Ambient Radial Light for 4K / Large Desktop Monitors */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)/0.035,transparent_75%)] pointer-events-none" />
          <div className="relative mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10 w-full">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-2.5 sm:gap-3.5 lg:col-span-7">
                <Link
                  href="/"
                  className="inline-flex w-fit items-center gap-1.5 font-ui text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:opacity-80"
                >
                  <ArrowLeft className="size-3.5" /> Overview
                </Link>

                <div className="flex items-center gap-2">
                  <span className="font-ui text-xs font-semibold tracking-wider text-primary uppercase">
                    Academic Year 2026 to 2027
                  </span>
                  <span className="text-muted-foreground/80">/</span>
                  <span className="font-ui text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    National Scholarship Portal Verified
                  </span>
                </div>

                <h1 className="font-display text-2xl leading-tight font-bold tracking-tight text-foreground uppercase sm:text-3xl lg:text-3xl xl:text-4xl">
                  Scholarships &amp; Global Pathways
                </h1>

                <p className="mt-1.5 max-w-xl font-sans text-xs leading-relaxed font-normal tracking-normal text-muted-foreground sm:text-sm">
                  Direct, transparent access to central and state scholarship
                  schemes for students of Mayang Imphal, paired with screened
                  mentorship for higher education opportunities.
                </p>

                <div className="flex w-full flex-col items-stretch gap-3 pt-1.5 sm:w-auto sm:flex-row sm:items-center">
                  <RegisterInterestDialog initialProgramType="SCHOLARSHIP_ALERT">
                    <Button className="min-h-10 justify-center rounded-none font-ui text-xs font-semibold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:scale-95 disabled:opacity-50 px-5">
                      Get Alerts
                    </Button>
                  </RegisterInterestDialog>
                  <a
                    href="https://scholarships.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-none border border-border px-3.5 py-2 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-80"
                  >
                    <span>NSP Portal</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none border border-border/80 bg-card p-2.5 sm:p-3 shadow-xs">
                  <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden bg-muted/20">
                    <Image
                      src="/image/scholarship-academic-aspiration.png"
                      alt="Mayang Imphal academic scholar pursuing higher education pathways"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 384px, 480px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-2.5 border-t border-border/40 pt-2 text-center text-[11px] font-sans text-muted-foreground">
                    Merit Progression · Mayang Imphal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Controls & Listings with Dropdown Menus */}
        <section className="border-b border-border/60 bg-background py-12 sm:py-16 lg:py-20 in-data-[density=compact]:py-8 in-data-[density=compact]:sm:py-12">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            {/* Filter Controls Bar */}
            <div className="mb-10 sm:mb-14 rounded-none border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
              <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-12">
                {/* Search Field */}
                <div className="relative md:col-span-5">
                  <Search className="absolute top-3.5 left-3.5 size-4 text-muted-foreground sm:top-3" />
                  <Input
                    placeholder="Search by scheme name, sponsor, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 rounded-none pl-10 text-base sm:h-10 sm:text-sm"
                    aria-label="Search scholarships by scheme name, sponsor, or keyword"
                  />
                </div>

                {/* Application Cycle Dropdown Menu */}
                <div className="md:col-span-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-11 w-full justify-between rounded-none border-border bg-background text-xs font-ui uppercase tracking-wider font-semibold sm:h-10 px-3.5"
                        >
                          <span className="truncate">
                            {cycleLabels[selectedCycle]}
                          </span>
                          <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] max-w-xs rounded-none border border-border/80 bg-popover p-1.5 shadow-md sm:w-60 font-ui">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
                          Filter by Application Cycle
                        </DropdownMenuLabel>
                        {Object.entries(cycleLabels).map(([key, label]) => (
                          <DropdownMenuItem
                            key={key}
                            onClick={() => setSelectedCycle(key)}
                            className="flex cursor-pointer items-center justify-between rounded-none px-2.5 py-2 text-xs"
                          >
                            <span className="truncate">{label}</span>
                            {selectedCycle === key && (
                              <Check className="size-3.5 shrink-0 text-secondary" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Study Level Dropdown Menu */}
                <div className="md:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-11 w-full justify-between rounded-none border-border bg-background text-xs font-ui uppercase tracking-wider font-semibold sm:h-10 px-3.5"
                        >
                          <span className="truncate">
                            {levelLabels[selectedLevel]}
                          </span>
                          <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] max-w-xs rounded-none border border-border/80 bg-popover p-1.5 shadow-md sm:w-64 font-ui">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
                          Filter by Study Level
                        </DropdownMenuLabel>
                        {(
                          Object.entries(levelLabels) as [
                            ScholarshipLevel | "ALL",
                            string,
                          ][]
                        ).map(([key, label]) => (
                          <DropdownMenuItem
                            key={key}
                            onClick={() => setSelectedLevel(key)}
                            className="flex cursor-pointer items-center justify-between rounded-none px-2.5 py-2 text-xs"
                          >
                            <span className="truncate">{label}</span>
                            {selectedLevel === key && (
                              <Check className="size-3.5 shrink-0 text-secondary" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Data Actions Dropdown Menu */}
                <div className="md:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-11 w-full justify-between rounded-none border-border bg-background text-xs font-ui uppercase tracking-wider font-semibold sm:h-10 px-3.5"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <Download className="size-3.5 text-secondary" />
                            <span>Export</span>
                          </span>
                          <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] max-w-xs rounded-none border border-border/80 bg-popover p-1.5 shadow-md sm:w-60 font-ui">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
                          Scholarship Data Options
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={handleCopyDeadlines}
                          className="flex cursor-pointer items-center gap-2 rounded-none px-2.5 py-2 text-xs"
                        >
                          <Share2 className="size-3.5 text-muted-foreground" />
                          <span>
                            {copied
                              ? "Deadlines Copied!"
                              : "Copy Active Deadlines"}
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem
                          render={
                            <a
                              href="https://scholarships.gov.in"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex cursor-pointer items-center justify-between rounded-none px-2.5 py-2 text-xs"
                            />
                          }
                        >
                          <span>Open National Portal</span>
                          <ExternalLink className="size-3 text-muted-foreground" />
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Active Results Summary */}
              <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-5 text-xs text-muted-foreground font-ui">
                <span className="uppercase tracking-wider">
                  Showing <strong className="text-foreground">{filteredScholarships.length}</strong> of{" "}
                  {mockScholarships.length} verified schemes
                </span>
                {(searchQuery ||
                  selectedCycle !== "ALL" ||
                  selectedLevel !== "ALL") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCycle("ALL")
                      setSelectedLevel("ALL")
                    }}
                    className="inline-flex cursor-pointer items-center gap-1 font-bold uppercase tracking-wider text-secondary hover:underline"
                  >
                    <RotateCcw className="size-3" />
                    <span>Reset filters</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scheme Cards Grid: 2 Columns on Laptop/Desktop, 4 Columns on 4K/3XL */}
            {filteredScholarships.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 3xl:grid-cols-4">
                {filteredScholarships.map((sch) => (
                  <ScholarshipCard key={sch.id} scholarship={sch} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-none border border-dashed border-border p-16 text-center">
                <GraduationCap className="size-10 text-muted-foreground" />
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">
                  No matching schemes found
                </h3>
                <p className="max-w-sm font-sans text-xs sm:text-sm text-muted-foreground">
                  Try adjusting your search keywords or switching filters back
                  to &ldquo;All Cycles&rdquo;.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCycle("ALL")
                    setSelectedLevel("ALL")
                  }}
                  className="mt-3 rounded-none text-xs font-ui uppercase tracking-wider font-semibold min-h-10 px-5"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Essential Documents & Checklist */}
        <section className="border-b border-border/60 bg-muted/30 py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="mb-12 sm:mb-16 max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                Before You Apply on the National Scholarship Portal
              </h2>
              <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                Most scholarship rejections occur due to document mismatches.
                Prepare these four items in advance:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-3 rounded-none border border-border/80 bg-card p-6 sm:p-7">
                <div className="font-ui text-xs font-bold uppercase tracking-wider text-secondary">
                  01. Income Certificate
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                  Valid Revenue Certificate
                </h4>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Issued by a competent Sub-Divisional Officer (SDO) or Deputy
                  Commissioner. Ensure it is within the current financial year.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-none border border-border/80 bg-card p-6 sm:p-7">
                <div className="font-ui text-xs font-bold uppercase tracking-wider text-secondary">
                  02. Permanent Residence
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                  Domicile / PRC (Manipur)
                </h4>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Essential for Ishan Uday and NEC Merit schemes. Domicile
                  certificates must match the student&apos;s name and
                  parents&apos; names exactly.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-none border border-border/80 bg-card p-6 sm:p-7">
                <div className="font-ui text-xs font-bold uppercase tracking-wider text-chart-3">
                  03. Aadhaar-Seeded Account
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                  Active DBT Bank Account
                </h4>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  The applicant&apos;s bank account must be linked to Aadhaar
                  (NPCI mapping) for Direct Benefit Transfer disbursement.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-none border border-border/80 bg-card p-6 sm:p-7">
                <div className="font-ui text-xs font-bold uppercase tracking-wider text-secondary">
                  04. AISHE / UDISE Code
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                  Registered Institute
                </h4>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Confirm that your college or higher secondary school has an
                  active Nodal Officer registered on the NSP portal for
                  verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diaspora Mentoring & Safeguarding */}
        <section className="bg-background py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="rounded-none border border-border/80 bg-card p-8 shadow-xs sm:p-12">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="flex flex-col gap-5 lg:col-span-8">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-none border-secondary/30 text-xs font-ui font-semibold uppercase tracking-wider text-secondary px-2.5 py-1"
                    >
                      Proposed Mentorship Circle
                    </Badge>
                    <span className="font-ui text-xs uppercase tracking-wider text-muted-foreground">
                      Community Initiative
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                    Connecting Mayang Imphal Youth to Global Diaspora Mentors
                  </h2>

                  <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Higher education is about more than filling out scholarship
                    forms. Our proposed mentor network connects aspiring college
                    applicants with Manipuri researchers, software engineers,
                    and civil service scholars who have navigated competitive
                    admissions across India and abroad.
                  </p>

                  <div className="flex items-start gap-3.5 rounded-none border border-border/70 bg-muted/30 p-5 sm:p-6">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-secondary" />
                    <div className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      <strong className="mb-1 block text-foreground font-ui uppercase tracking-wider font-bold">
                        Strict Child Safeguarding &amp; Screening Policy:
                      </strong>
                      All volunteer mentors undergo identity and professional
                      verification. In compliance with the Digital Personal Data
                      Protection (DPDP) Act and international child safeguarding
                      standards, all interactions with secondary school students
                      are conducted as supervised group workshops with parental
                      consent. Direct private unrecorded communication with
                      minors is strictly prohibited.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-4">
                  <RegisterInterestDialog initialProgramType="DIASPORA_MENTOR">
                    <Button
                      size="lg"
                      className="w-full rounded-none bg-primary py-3.5 text-xs font-ui uppercase tracking-wider font-bold text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:scale-95 disabled:opacity-50 min-h-12"
                    >
                      Volunteer
                    </Button>
                  </RegisterInterestDialog>

                  <RegisterInterestDialog initialProgramType="FUTURE_LABS">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full rounded-none py-3.5 text-xs font-ui uppercase tracking-wider font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:scale-95 disabled:opacity-50 min-h-12"
                    >
                      Guidance
                    </Button>
                  </RegisterInterestDialog>

                  <span className="text-center font-ui text-[11px] uppercase tracking-wider text-muted-foreground">
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
