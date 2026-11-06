import React from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Scale,
  CheckCircle2,
} from "lucide-react"

export default function AboutPage() {
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
                <Badge variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground text-xs font-medium rounded-none">
                  Governance &amp; Compliance
                </Badge>
                <span className="text-xs text-primary-foreground/80">Statutory Transparency Record</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-primary-foreground leading-tight">
                About BETTER MAYANG IMPHAL
              </h1>

              <p className="text-sm sm:text-base text-primary-foreground/85 leading-relaxed">
                Platform identity, operator disclosures, statutory boundaries, DPDP privacy policy, and public compliance standards for Mayang Imphal.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Anchor Navigation */}
        <div className="sticky top-14 z-30 border-b border-border/60 bg-background/95 backdrop-blur-sm py-2 sm:py-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-6 overflow-x-auto text-xs font-medium text-muted-foreground">
            <a href="#identity" className="hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary shrink-0 min-h-9 flex items-center py-1">Operator Identity</a>
            <a href="#statutory" className="hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary shrink-0 min-h-9 flex items-center py-1">Statutory Boundaries</a>
            <a href="#dpdp" className="hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary shrink-0 min-h-9 flex items-center py-1">DPDP Privacy &amp; Safeguarding</a>
            <a href="#election" className="hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary shrink-0 min-h-9 flex items-center py-1">ECI Compliance</a>
            <a href="#corrections" className="hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary shrink-0 min-h-9 flex items-center py-1">Corrections Policy</a>
          </div>
        </div>

        {/* Section 1: Platform Identity */}
        <section id="identity" className="py-14 bg-background border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Who Operates BETTER MAYANG IMPHAL?
              </h2>
            </div>

            <div className="prose prose-slate dark:prose-invert text-xs sm:text-sm leading-relaxed text-muted-foreground flex flex-col gap-4">
              <p>
                <strong>BETTER MAYANG IMPHAL</strong> is established as a <strong>hybrid civic-advocacy and public-information platform</strong>. Its purpose is to connect the constituency development priorities of Mayang Imphal with future-ready opportunities in STEM education, international scholarships, and evidence-based urban planning.
              </p>

              <div className="rounded-none border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-semibold block mb-1">Clear Public Notice on Platform Standing:</span>
                This website is <strong>not</strong> an official portal of the Government of Manipur, the Mayang Imphal Municipal Council, or any state department. It does not speak on behalf of statutory bodies and does not possess executive powers to sanction tenders, expend public revenue, or grant regulatory approvals.
              </div>

              <p>
                The platform operates under editorial oversight committed to factual accuracy:
              </p>

              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>
                  <strong>Evidence Grounding:</strong> All reports on public infrastructure cite verifiable government sources (such as the Town Planning Department RFP for AMRUT 2.0 or official tenders).
                </li>
                <li>
                  <strong>Proposed vs Approved:</strong> Unfunded or experimental community concepts (such as Mayang Imphal Future Labs or the Diaspora Mentorship Circle) are explicitly marked <em>&ldquo;Proposed Initiative · In Assessment&rdquo;</em> so citizens are never misled into believing an idea is an already-funded official program.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Statutory Boundaries */}
        <section id="statutory" className="py-14 bg-muted/30 border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Statutory Boundaries &amp; Jurisdictions
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex flex-col gap-4">
              <p>
                Democratic governance functions best when citizens know exactly which institution holds responsibility for which public service:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="rounded-none border border-border/80 bg-card p-4 flex flex-col gap-2">
                  <div className="font-semibold text-xs text-secondary">
                    Municipal Council (MIMC)
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Under the 74th Constitutional Amendment, the Municipal Council is responsible for internal ward sanitation, market cleanliness, domestic waste disposal, and local drainage gutters.
                  </p>
                </div>

                <div className="rounded-none border border-border/80 bg-card p-4 flex flex-col gap-2">
                  <div className="font-semibold text-xs text-secondary">
                    State Government Departments
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Executive departments (PWD, Water Resources, Town Planning, School Education) execute major public works tenders, arterial roads, primary flood control dykes, and the GIS Master Plan.
                  </p>
                </div>

                <div className="rounded-none border border-border/80 bg-card p-4 flex flex-col gap-2">
                  <div className="font-semibold text-xs text-secondary">
                    Legislative Representation
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Elected representatives review government bills, raise constituency questions, advocate for departmental allocations, and disburse MLA Local Area Development (LAD) grants.
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                BETTER MAYANG IMPHAL acts as a civic monitoring bridge, holding public records to the light and providing citizens with the tools to participate constructively in municipal consultations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: DPDP Privacy & Safeguarding */}
        <section id="dpdp" className="py-14 bg-background border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                DPDP Act Compliance &amp; Child Safeguarding
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex flex-col gap-4">
              <p>
                In compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and international best practices for civic data handling, BETTER MAYANG IMPHAL operates under strict data minimization standards:
              </p>

              <div className="flex flex-col gap-3">
                <div className="rounded-none border border-border/70 bg-card p-4 flex items-start gap-3">
                  <Lock className="size-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground text-xs block mb-0.5">Anonymous Civic Submissions:</strong>
                    <span className="text-xs text-muted-foreground">
                      Citizens can submit locality priorities and field observations without providing an email, phone number, or name. When contact details are optionally provided, they are stored in restricted access tables and never published or shared with third parties.
                    </span>
                  </div>
                </div>

                <div className="rounded-none border border-border/70 bg-card p-4 flex items-start gap-3">
                  <ShieldCheck className="size-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground text-xs block mb-0.5">Mandatory Parental Consent for Minors:</strong>
                    <span className="text-xs text-muted-foreground">
                      Any student under the age of 18 registering interest in STEM workshops, coding sessions, or scholarship mentoring must provide a parent or legal guardian&apos;s explicit consent. No personal data of minors is processed for profiling or commercial purposes.
                    </span>
                  </div>
                </div>

                <div className="rounded-none border border-border/70 bg-card p-4 flex items-start gap-3">
                  <Scale className="size-4 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground text-xs block mb-0.5">Screened Diaspora Mentorship Protocol:</strong>
                    <span className="text-xs text-muted-foreground">
                      Volunteer mentors from the Manipuri diaspora undergo credential verification. All student interactions occur exclusively in group settings on institutional platforms. Unsupervised private direct messaging between adult mentors and secondary students is strictly prohibited.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: ECI Compliance */}
        <section id="election" className="py-14 bg-muted/30 border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Election Commission of India (ECI) Compliance Record
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex flex-col gap-4">
              <p>
                To maintain complete integrity during and outside election cycles, BETTER MAYANG IMPHAL adheres strictly to Election Commission of India guidelines and the Model Code of Conduct (MCC):
              </p>

              <div className="rounded-none border border-border/80 bg-card p-5 flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-xs">
                    <strong>Zero Public Fund Utilization:</strong> This website is hosted and developed without the use of Government of Manipur, Municipal Council, or legislative secretarial funds.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-xs">
                    <strong>Model Code of Conduct Neutrality:</strong> During any notified election period, no newly announced government works or policy decisions will be represented as completed achievements, and official government machinery will not be utilized for platform activities.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-xs">
                    <strong>Transparent Attribution:</strong> The operators of this platform do not falsely claim non-partisan NGO status while operating political platforms; conversely, civic public-interest documents are maintained with strict factual neutrality.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Corrections & Contact */}
        <section id="corrections" className="py-14 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Corrections &amp; Evidence Submissions
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex flex-col gap-4">
              <p>
                We welcome scrutiny. If you are an engineer, government officer, municipal councilor, or resident with updated documentation (work order, revised tender date, or gazette notification) that differs from what is published here, we commit to reviewing and updating the record promptly.
              </p>

              <div className="rounded-none border border-border/80 bg-muted/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-foreground text-sm">Submit Official Documentation or Corrections</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Cite the specific project ID, scheme slug, and official document reference.
                  </div>
                </div>

                <Link
                  href="/#constituent-desk"
                  className="inline-flex shrink-0 items-center justify-center rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-xs font-semibold active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Submit Evidence Note
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
