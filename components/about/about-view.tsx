import React from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, Scale, CheckCircle2 } from "lucide-react"

export function AboutView() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Hero: Quiet Imphal Editorial Style */}
        <section
          id="hero"
          className="relative flex flex-col justify-center border-b border-border bg-background min-h-0 md:min-h-[min(calc(100dvh-3.75rem),40rem)] 2xl:min-h-[min(calc(100dvh-3.75rem),44rem)] py-8 sm:py-10 md:py-12 2xl:py-14 in-data-[density=compact]:py-4 in-data-[density=compact]:sm:py-6 in-data-[density=compact]:md:py-8 overflow-hidden"
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
                    Governance &amp; Compliance
                  </span>
                  <span className="text-muted-foreground/80">/</span>
                  <span className="font-ui text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Statutory Transparency Record
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight uppercase">
                  About Mayang Imphal
                </h1>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5 max-w-2xl font-normal tracking-normal">
                  Platform identity, operator disclosures, statutory boundaries,
                  DPDP privacy policy, and public compliance standards for Mayang
                  Imphal.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#identity"
                    className="inline-flex min-h-11 items-center justify-center rounded-none bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:scale-95 transition-colors"
                  >
                    Platform Disclosures
                  </a>
                  <a
                    href="#corrections"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-none border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-80 transition-colors"
                  >
                    <span>Submit Evidence</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-xs xl:max-w-sm border border-border/80 bg-card p-2.5 sm:p-3 shadow-xs">
                  <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden bg-muted/20">
                    <Image
                      src="/image/Leadership_Portrait.png"
                      alt="Constituency delimitation and jurisdictional scope of Mayang Imphal (AC-23), Imphal West"
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-2.5 border-t border-border/40 pt-2 text-center text-[11px] font-sans text-muted-foreground">
                    Constituency Jurisdiction &amp; Scope · AC-23 Mayang Imphal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Quick Anchor Bar (< lg screens only) */}
        <div className="lg:hidden sticky top-14 sm:top-15 z-30 border-b border-border bg-background/95 py-2.5 backdrop-blur-sm sm:py-3.5">
          <div className="mx-auto flex max-w-5xl items-center gap-5 overflow-x-auto px-4 text-xs font-ui font-semibold uppercase tracking-wider text-muted-foreground sm:gap-6 sm:px-6">
            <a href="#identity" className="shrink-0 py-1 hover:text-foreground">
              01. Identity
            </a>
            <a href="#statutory" className="shrink-0 py-1 hover:text-foreground">
              02. Boundaries
            </a>
            <a href="#dpdp" className="shrink-0 py-1 hover:text-foreground">
              03. DPDP
            </a>
            <a href="#election" className="shrink-0 py-1 hover:text-foreground">
              04. ECI
            </a>
            <a href="#corrections" className="shrink-0 py-1 hover:text-foreground">
              05. Corrections
            </a>
          </div>
        </div>

        {/* 2-Column Editorial Master Layout on Desktop / Ultrawide */}
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 2xl:gap-16 items-start">
            {/* Left Column: Sticky Editorial Rail (Desktop & Ultrawide) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-20 self-start space-y-6">
              {/* Document Index Card */}
              <div className="border border-border bg-card p-5 2xl:p-6 shadow-xs space-y-4">
                <div className="border-b border-border/60 pb-3">
                  <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-primary">
                    Transparency Dossier
                  </span>
                  <h3 className="font-display text-base font-bold uppercase tracking-tight text-foreground mt-0.5">
                    Statutory Index
                  </h3>
                </div>

                <nav aria-label="Governance Sections" className="space-y-1 font-ui text-xs font-medium">
                  <a
                    href="#identity"
                    className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors uppercase tracking-wider"
                  >
                    <span>01. Platform Identity</span>
                    <ArrowRight className="size-3 opacity-60" />
                  </a>
                  <a
                    href="#statutory"
                    className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors uppercase tracking-wider"
                  >
                    <span>02. Demarcation &amp; Scope</span>
                    <ArrowRight className="size-3 opacity-60" />
                  </a>
                  <a
                    href="#dpdp"
                    className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors uppercase tracking-wider"
                  >
                    <span>03. DPDP 2023 Privacy</span>
                    <ArrowRight className="size-3 opacity-60" />
                  </a>
                  <a
                    href="#election"
                    className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors uppercase tracking-wider"
                  >
                    <span>04. ECI &amp; MCC Neutrality</span>
                    <ArrowRight className="size-3 opacity-60" />
                  </a>
                  <a
                    href="#corrections"
                    className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors uppercase tracking-wider"
                  >
                    <span>05. Corrections Intake</span>
                    <ArrowRight className="size-3 opacity-60" />
                  </a>
                </nav>
              </div>

              {/* Verified Operator Metadata Panel */}
              <div className="border border-border/80 bg-muted/20 p-5 2xl:p-6 space-y-3.5 text-xs font-sans">
                <div className="font-ui text-[11px] font-bold uppercase tracking-wider text-secondary">
                  Operator Disclosures
                </div>
                <div className="space-y-2.5 text-muted-foreground">
                  <div>
                    <span className="block font-semibold text-foreground font-ui text-[11px] uppercase tracking-wider">
                      Constituency Scope
                    </span>
                    <span>AC-23 Mayang Imphal, Imphal West</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-foreground font-ui text-[11px] uppercase tracking-wider">
                      Municipal Code
                    </span>
                    <span className="font-mono text-[11px]">LGD 250326 (12 Wards)</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-foreground font-ui text-[11px] uppercase tracking-wider">
                      Desk Office
                    </span>
                    <span>Central Bazaar Corridor, Mayang Imphal 795132</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-foreground font-ui text-[11px] uppercase tracking-wider">
                      Official Contact
                    </span>
                    <span className="font-mono text-[11px] text-foreground">desk@bettermayangimphal.org</span>
                  </div>
                </div>
              </div>

              {/* Fast Action Card */}
              <div className="border border-border bg-card p-5 space-y-3">
                <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-chart-3 block">
                  Public Oversight
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Found an outdated figure or broken source citation? Submit supporting gazette or tender documentation.
                </p>
                <a
                  href="#corrections"
                  className="inline-flex w-full min-h-10 items-center justify-center gap-1.5 border border-border bg-muted/30 px-3 py-2 text-xs font-ui font-semibold uppercase tracking-wider text-foreground hover:bg-muted/60 transition-colors"
                >
                  <span>Submit Gazette Evidence</span>
                  <ArrowRight className="size-3" />
                </a>
              </div>
            </aside>

            {/* Right Column: Structured Disclosures */}
            <div className="lg:col-span-8 space-y-16 lg:space-y-20">
              {/* Section 1: Platform Identity */}
              <section id="identity" className="scroll-mt-24 space-y-6 sm:space-y-8">
                <div className="border-b border-border/70 pb-4">
                  <span className="font-ui text-xs font-bold uppercase tracking-wider text-secondary block mb-1.5">
                    01 / Platform Governance
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                    Who Operates Mayang Imphal?
                  </h2>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  <strong>Mayang Imphal</strong> is established as a{" "}
                  <strong>civic-advocacy and public-information platform</strong>. Its
                  purpose is to connect the constituency development priorities of Mayang
                  Imphal with future-ready opportunities in STEM education, verified
                  scholarships, and evidence-based urban planning.
                </p>

                <div className="grid grid-cols-1 gap-5 border border-border bg-card p-6 sm:p-8 sm:grid-cols-2 shadow-xs">
                  <div>
                    <span className="mb-1.5 block font-ui text-xs font-bold text-secondary uppercase tracking-wider">
                      Jurisdictional Scope
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Mayang Imphal Assembly Constituency (AC-23), Imphal West
                      District, Manipur.
                    </p>
                  </div>
                  <div>
                    <span className="mb-1.5 block font-ui text-xs font-bold text-secondary uppercase tracking-wider">
                      Operational Headquarters
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Central Bazaar Corridor, Mayang Imphal, Manipur 795132.
                    </p>
                  </div>
                  <div>
                    <span className="mb-1.5 block font-ui text-xs font-bold text-secondary uppercase tracking-wider">
                      Editorial &amp; Grievance Contact
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      desk@bettermayangimphal.org · Public inquiries processed weekly.
                    </p>
                  </div>
                  <div>
                    <span className="mb-1.5 block font-ui text-xs font-bold text-secondary uppercase tracking-wider">
                      Statutory Affiliation
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Independent citizen initiative; not an executive department of the
                      State Government.
                    </p>
                  </div>
                </div>

                <div className="border border-secondary/30 bg-secondary/5 p-5 sm:p-6 text-xs sm:text-sm leading-relaxed text-muted-foreground font-sans">
                  <strong className="block text-foreground font-ui uppercase tracking-wider font-bold mb-1">
                    Core Commitment:
                  </strong>
                  Every public claim, project budget, and deadline displayed on this
                  platform is tied to verifiable public sources (Gazette notifications,
                  Legislative Assembly starred questions, AMRUT 2.0 state tenders, or
                  National Scholarship Portal guidelines).
                </div>
              </section>

              {/* Section 2: Statutory Boundaries & Exclusions */}
              <section id="statutory" className="scroll-mt-24 space-y-6 sm:space-y-8 pt-8 border-t border-border/60">
                <div className="border-b border-border/70 pb-4">
                  <div className="mb-1.5 flex items-center gap-2 text-xs font-ui font-semibold tracking-wider text-secondary uppercase">
                    <Scale className="size-3.5" />
                    <span>02 / Demarcation of Responsibilities</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                    What This Platform Can and Cannot Do
                  </h2>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  To avoid misleading citizens, we clearly declare our administrative
                  limitations and operating boundaries:
                </p>

                <div className="space-y-5">
                  <div className="space-y-3 border border-border bg-card p-6 sm:p-8 shadow-xs">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-ui uppercase tracking-wider font-bold text-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      <span>What We CAN Do:</span>
                    </div>
                    <ul className="list-disc space-y-2 pl-6 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <li>
                        Publish verified government gazettes, RFP links, and scholarship
                        eligibility criteria.
                      </li>
                      <li>
                        Track physical ground conditions of sanctioned public works and
                        report deviations.
                      </li>
                      <li>
                        Aggregate citizen ward priorities and present them during
                        municipal consultation windows.
                      </li>
                      <li>
                        Organize non-partisan community STEM literacy workshops for local
                        high school students.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 border border-border bg-card p-6 sm:p-8 shadow-xs">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-ui uppercase tracking-wider font-bold text-foreground">
                      <ShieldCheck className="size-4 shrink-0 text-chart-3" />
                      <span>What We CANNOT Do (Statutory Exclusions):</span>
                    </div>
                    <ul className="list-disc space-y-2 pl-6 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <li>
                        We are NOT an official government department and cannot award
                        commercial contracts.
                      </li>
                      <li>
                        We CANNOT disburse scholarships directly; applications must
                        proceed through official national portals (NSP, etc.).
                      </li>
                      <li>
                        We CANNOT replace the statutory grievance redressal mechanisms of
                        the Manipur Municipal Council or ECI.
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground italic">
                  Mayang Imphal acts as a civic monitoring bridge, holding public records
                  to the light and providing citizens with the tools to participate
                  constructively in municipal consultations.
                </p>
              </section>

              {/* Section 3: DPDP Privacy Policy */}
              <section id="dpdp" className="scroll-mt-24 space-y-6 sm:space-y-8 pt-8 border-t border-border/60">
                <div className="border-b border-border/70 pb-4">
                  <div className="mb-1.5 flex items-center gap-2 text-xs font-ui font-semibold tracking-wider text-secondary uppercase">
                    <Lock className="size-3.5" />
                    <span>03 / Privacy &amp; Data Ethics</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                    Digital Personal Data Protection (DPDP) Standards
                  </h2>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  In proactive alignment with the core principles of the{" "}
                  <strong className="text-foreground">
                    Digital Personal Data Protection (DPDP) Act, 2023
                  </strong>{" "}
                  and statutory phased enforcement timelines, Mayang Imphal operates under
                  strict data minimization standards:
                </p>

                <div className="space-y-4 font-sans text-xs sm:text-sm text-muted-foreground">
                  <div className="border border-border bg-card p-5 shadow-xs">
                    <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold text-xs">
                      1. Zero Tracker Monetization:
                    </strong>
                    We do not use commercial ad pixels, behavioral profiling scripts, or
                    cross-site tracking cookies.
                  </div>

                  <div className="border border-border bg-card p-5 shadow-xs">
                    <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold text-xs">
                      2. Anonymous Civic Submissions:
                    </strong>
                    Citizens can submit locality priorities and field observations without
                    providing an email, phone number, or name. When contact details are
                    optionally provided, they are stored in restricted access tables and
                    never published or shared with third parties.
                  </div>

                  <div className="border border-border bg-card p-5 shadow-xs">
                    <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold text-xs">
                      3. Student Safeguarding:
                    </strong>
                    Student registrations for Future Labs workshops require verifiable
                    parent or guardian consent. We never publish lists of applicant names,
                    home addresses, or academic performance scores.
                  </div>

                  <div className="border border-border bg-card p-5 shadow-xs">
                    <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold text-xs">
                      4. Right to Erasure:
                    </strong>
                    Any citizen whose contact details were submitted for constituency
                    follow-ups may request complete data deletion at any time by emailing{" "}
                    <span className="font-mono text-foreground">desk@bettermayangimphal.org</span>.
                  </div>
                </div>
              </section>

              {/* Section 4: Election Compliance */}
              <section id="election" className="scroll-mt-24 space-y-6 sm:space-y-8 pt-8 border-t border-border/60">
                <div className="border-b border-border/70 pb-4">
                  <span className="font-ui text-xs font-bold uppercase tracking-wider text-secondary block mb-1.5">
                    04 / Neutrality Mandate
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                    Election Commission of India (ECI) Compliance &amp; MCC
                  </h2>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  To maintain complete integrity during and outside election cycles,
                  Mayang Imphal adheres strictly to Election Commission of India guidelines
                  and the Model Code of Conduct (MCC):
                </p>

                <div className="space-y-4 border border-border bg-card p-6 sm:p-8 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed shadow-xs">
                  <div>
                    <strong className="text-foreground font-ui uppercase tracking-wider font-bold block mb-1">
                      Public Asset Neutrality:
                    </strong>{" "}
                    No government funding, state machinery, or municipal equipment is
                    utilized to promote any individual political candidate on this
                    platform.
                  </div>
                  <div className="border-t border-border/60 pt-3.5">
                    <strong className="text-foreground font-ui uppercase tracking-wider font-bold block mb-1">
                      Model Code of Conduct Standstill:
                    </strong>{" "}
                    Upon the announcement of general or bye-elections by the ECI, all policy
                    proposal workflows and public works reporting conform to statutory
                    campaign silence and expenditure disclosure mandates.
                  </div>
                </div>
              </section>

              {/* Section 5: Corrections Policy */}
              <section id="corrections" className="scroll-mt-24 space-y-6 sm:space-y-8 pt-8 border-t border-border/60">
                <div className="border-b border-border/70 pb-4">
                  <span className="font-ui text-xs font-bold uppercase tracking-wider text-secondary block mb-1.5">
                    05 / Sourcing Integrity
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                    Corrections &amp; Evidence Submissions
                  </h2>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Civic accountability depends on factual accuracy. If you identify an
                  error in a project sanction date, responsible line agency, budget amount,
                  or scholarship deadline, please notify us immediately with supporting
                  documentation:
                </p>

                <div className="flex flex-col items-start justify-between gap-5 border border-border bg-card p-6 sm:p-8 sm:flex-row sm:items-center shadow-xs">
                  <div>
                    <div className="text-sm font-ui uppercase tracking-wider font-bold text-foreground">
                      Submit Official Documentation or Corrections
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-muted-foreground mt-1">
                      desk@bettermayangimphal.org · Subject: [Data Correction Request]
                    </div>
                  </div>
                  <a
                    href="mailto:desk@bettermayangimphal.org?subject=Data%20Correction%20Request"
                    className="inline-flex shrink-0 items-center justify-center rounded-none bg-primary px-6 py-3 text-xs font-ui uppercase tracking-wider font-bold text-primary-foreground hover:bg-primary/90 min-h-11 transition-colors"
                  >
                    Submit Evidence
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

