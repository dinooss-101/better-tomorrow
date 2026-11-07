import React from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { ArrowLeft, ShieldCheck, Lock, Scale, CheckCircle2 } from "lucide-react"

export function AboutView() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Hero: Quiet Imphal Editorial Style */}
        <div className="border-b border-border bg-background py-10 text-foreground sm:py-12 md:py-14 lg:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex max-w-3xl flex-col gap-4">
              <Link
                href="/"
                className="font-ui inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary dark:text-emerald-400 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:opacity-80"
              >
                <ArrowLeft className="size-3.5" /> Overview
              </Link>

              <div className="flex items-center gap-2">
                <span className="font-ui text-xs font-semibold tracking-wider text-primary dark:text-emerald-400 uppercase">
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

              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-3.5 max-w-2xl font-normal tracking-normal">
                Platform identity, operator disclosures, statutory boundaries,
                DPDP privacy policy, and public compliance standards for Mayang
                Imphal.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Anchor Navigation */}
        <div className="sticky top-14 sm:top-15 z-30 border-b border-border bg-background/95 py-2.5 backdrop-blur-sm sm:py-3.5">
          <div className="mx-auto flex max-w-5xl items-center gap-5 overflow-x-auto px-4 text-xs font-ui font-semibold uppercase tracking-wider text-muted-foreground sm:gap-8 sm:px-6 lg:px-8">
            <a
              href="#identity"
              className="flex min-h-10 shrink-0 items-center py-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-80"
            >
              Operator Identity
            </a>
            <a
              href="#statutory"
              className="flex min-h-10 shrink-0 items-center py-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-80"
            >
              Statutory Boundaries
            </a>
            <a
              href="#dpdp"
              className="flex min-h-10 shrink-0 items-center py-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-80"
            >
              DPDP Privacy &amp; Safeguarding
            </a>
            <a
              href="#election"
              className="flex min-h-10 shrink-0 items-center py-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-80"
            >
              ECI Compliance
            </a>
            <a
              href="#corrections"
              className="flex min-h-10 shrink-0 items-center py-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary active:opacity-80"
            >
              Corrections Policy
            </a>
          </div>
        </div>

        {/* Section 1: Platform Identity */}
        <section
          id="identity"
          className="border-b border-border bg-background py-16 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left: Leadership Portrait */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-sm border border-border bg-card p-3 shadow-xs">
                  <div className="relative aspect-square w-full overflow-hidden bg-muted/20">
                    <Image
                      src="/image/Leadership_Portrait.png"
                      alt="Dr. Khumujam Ratankumar Singh in community dialogue with ward residents, Mayang Imphal"
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-2.5 border-t border-border/40 pt-2 text-center text-xs font-sans text-muted-foreground">
                    Civic leadership dialogue with ward residents · Mayang Imphal (AC-23)
                  </div>
                </div>
              </div>

              {/* Right: Narrative & Scope */}
              <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-7">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                    Who Operates Mayang Imphal?
                  </h2>
                </div>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  <strong>Mayang Imphal</strong> is established as a{" "}
                  <strong>
                    civic-advocacy and public-information platform
                  </strong>
                  . Its purpose is to connect the constituency development
                  priorities of Mayang Imphal with future-ready opportunities in
                  STEM education, verified scholarships, and evidence-based
                  urban planning.
                </p>

                <div className="grid grid-cols-1 gap-5 border border-border bg-card p-6 sm:p-8 sm:grid-cols-2">
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
                      desk@bettermayangimphal.org · Public inquiries processed
                      weekly.
                    </p>
                  </div>
                  <div>
                    <span className="mb-1.5 block font-ui text-xs font-bold text-secondary uppercase tracking-wider">
                      Statutory Affiliation
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Independent citizen initiative; not an executive department
                      of the State Government.
                    </p>
                  </div>
                </div>

                <div className="border border-secondary/30 bg-secondary/5 p-5 sm:p-6 text-xs sm:text-sm leading-relaxed text-muted-foreground font-sans">
                  <strong className="block text-foreground font-ui uppercase tracking-wider font-bold mb-1">
                    Core Commitment:
                  </strong>
                  Every public claim, project budget, and deadline displayed on
                  this platform is tied to verifiable public sources (Gazette
                  notifications, Legislative Assembly starred questions, AMRUT
                  2.0 state tenders, or National Scholarship Portal guidelines).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Statutory Boundaries & Exclusions */}
        <section
          id="statutory"
          className="border-b border-border bg-muted/20 py-16 sm:py-24 lg:py-28"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-ui font-semibold tracking-wider text-secondary uppercase">
                <Scale className="size-3.5" />
                <span>Demarcation of Responsibilities</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                What This Platform Can and Cannot Do
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              To avoid misleading citizens, we clearly declare our
              administrative limitations:
            </p>

            <div className="space-y-6">
              <div className="space-y-3 border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-ui uppercase tracking-wider font-bold text-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>What We CAN Do:</span>
                </div>
                <ul className="list-disc space-y-2 pl-6 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <li>
                    Publish verified government gazettes, RFP links, and
                    scholarship eligibility criteria.
                  </li>
                  <li>
                    Track physical ground conditions of sanctioned public works
                    and report deviations.
                  </li>
                  <li>
                    Aggregate citizen ward priorities and present them during
                    municipal consultation windows.
                  </li>
                  <li>
                    Organize non-partisan community STEM literacy workshops for
                    local high school students.
                  </li>
                </ul>
              </div>

              <div className="space-y-3 border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-ui uppercase tracking-wider font-bold text-foreground">
                  <ShieldCheck className="size-4 shrink-0 text-amber-600" />
                  <span>What We CANNOT Do (Statutory Exclusions):</span>
                </div>
                <ul className="list-disc space-y-2 pl-6 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <li>
                    We are NOT an official government department and cannot
                    award commercial contracts.
                  </li>
                  <li>
                    We CANNOT disburse scholarships directly; applications must
                    proceed through official national portals (NSP, etc.).
                  </li>
                  <li>
                    We CANNOT replace the statutory grievance redressal
                    mechanisms of the Manipur Municipal Council or ECI.
                  </li>
                </ul>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground italic">
              Mayang Imphal acts as a civic monitoring bridge, holding public
              records to the light and providing citizens with the tools to
              participate constructively in municipal consultations.
            </p>
          </div>
        </section>

        {/* Section 3: DPDP Privacy Policy */}
        <section
          id="dpdp"
          className="border-b border-border bg-background py-16 sm:py-24 lg:py-28"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-ui font-semibold tracking-wider text-secondary uppercase">
                <Lock className="size-3.5" />
                <span>Privacy &amp; Data Ethics</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                Digital Personal Data Protection (DPDP) Standards
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              In compliance with the{" "}
              <strong className="text-foreground">Digital Personal Data Protection (DPDP) Act, 2023</strong>{" "}
              and international best practices for civic data handling, Mayang
              Imphal operates under strict data minimization standards:
            </p>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-muted-foreground">
              <div className="border-t border-border pt-4">
                <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold">
                  1. Zero Tracker Monetization:
                </strong>
                We do not use commercial ad pixels, behavioral profiling
                scripts, or cross-site tracking cookies.
              </div>

              <div className="border-t border-border pt-4">
                <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold">
                  2. Anonymous Civic Submissions:
                </strong>
                Citizens can submit locality priorities and field observations
                without providing an email, phone number, or name. When contact
                details are optionally provided, they are stored in restricted
                access tables and never published or shared with third parties.
              </div>

              <div className="border-t border-border pt-4">
                <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold">
                  3. Student Safeguarding:
                </strong>
                Student registrations for Future Labs workshops require
                verifiable parent or guardian consent. We never publish lists of
                applicant names, home addresses, or academic performance scores.
              </div>

              <div className="border-t border-border pt-4">
                <strong className="mb-1.5 block text-foreground font-ui uppercase tracking-wider font-bold">
                  4. Right to Erasure:
                </strong>
                Any citizen whose contact details were submitted for
                constituency follow-ups may request complete data deletion at
                any time by emailing desk@bettermayangimphal.org.
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Election Compliance */}
        <section
          id="election"
          className="border-b border-border bg-muted/20 py-16 sm:py-24 lg:py-28"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                Election Commission of India (ECI) Compliance &amp; MCC
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              To maintain complete integrity during and outside election cycles,
              Mayang Imphal adheres strictly to Election Commission of India
              guidelines and the Model Code of Conduct (MCC):
            </p>

            <div className="space-y-4 border border-border bg-card p-6 sm:p-8 font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground font-ui uppercase tracking-wider font-bold block mb-1">Public Asset Neutrality:</strong> No government funding,
                state machinery, or municipal equipment is utilized to promote
                any individual political candidate on this platform.
              </p>
              <p className="border-t border-border/60 pt-3">
                <strong className="text-foreground font-ui uppercase tracking-wider font-bold block mb-1">Model Code of Conduct Standstill:</strong> Upon the
                announcement of general or bye-elections by the ECI, all policy
                proposal workflows and public works reporting conform to
                statutory campaign silence and expenditure disclosure mandates.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Corrections Policy */}
        <section id="corrections" className="bg-background py-16 sm:py-24 lg:py-28">
          <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                Corrections &amp; Evidence Submissions
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              Civic accountability depends on factual accuracy. If you identify
              an error in a project sanction date, responsible line agency,
              budget amount, or scholarship deadline, please notify us
              immediately with supporting documentation:
            </p>

            <div className="flex flex-col items-start justify-between gap-5 border border-border bg-card p-6 sm:p-8 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-ui uppercase tracking-wider font-bold text-foreground">
                  Submit Official Documentation or Corrections
                </div>
                <div className="font-sans text-xs sm:text-sm text-muted-foreground mt-1">
                  desk@bettermayangimphal.org · Subject: [Data Correction
                  Request]
                </div>
              </div>
              <a
                href="mailto:desk@bettermayangimphal.org?subject=Data%20Correction%20Request"
                className="inline-flex shrink-0 items-center justify-center rounded-none bg-primary px-6 py-3 text-xs font-ui uppercase tracking-wider font-bold text-primary-foreground hover:bg-primary/90 min-h-11"
              >
                Submit Evidence
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

