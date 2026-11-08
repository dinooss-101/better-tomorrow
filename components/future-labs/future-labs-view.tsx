"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { RegisterInterestDialog } from "@/components/modals/register-interest-dialog"
import { futureLabsTracks, launchMilestones } from "@/lib/data/initiatives"
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  CheckCircle2,
  HardDrive,
  School,
} from "lucide-react"

export function FutureLabsView() {
  const [activeTab, setActiveTab] = useState(futureLabsTracks[0].id)

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
              <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-7">
                <Link
                  href="/"
                  className="font-ui inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors w-fit"
                >
                  <ArrowLeft className="size-3.5" /> Overview
                </Link>

                <div className="flex items-center gap-2">
                  <span className="font-ui text-xs font-semibold uppercase tracking-wider text-primary">
                    Proposed initiative · In assessment
                  </span>
                  <span className="text-muted-foreground/80">/</span>
                  <span className="font-ui text-xs text-muted-foreground font-semibold uppercase tracking-wider">Phase 1 Feasibility Study</span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight uppercase">
                  Mayang Imphal Future Labs
                </h1>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5 max-w-2xl font-normal tracking-normal">
                  A community-centered STEM, physical robotics, and responsible AI learning initiative designed to equip Mayang Imphal students with practical digital capabilities grounded in real local challenges.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <RegisterInterestDialog initialProgramType="FUTURE_LABS">
                    <Button className="rounded-none text-xs sm:text-sm font-semibold min-h-11 justify-center active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 px-5">
                      Request School Workshop
                    </Button>
                  </RegisterInterestDialog>
                  <a
                    href="#roadmap"
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary py-2.5 px-3 min-h-11 border border-border rounded-none transition-colors"
                  >
                    <span>Roadmap</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none border border-border/80 bg-card p-2.5 sm:p-3 shadow-xs">
                  <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden bg-muted/20">
                    <Image
                      src="/image/future-labs-stem-workshop.png"
                      alt="Mayang Imphal students engaged in hands-on STEM robotics and computational learning"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 384px, 480px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-2.5 border-t border-border/40 pt-2 text-center text-[11px] font-sans text-muted-foreground">
                    Applied Electronics &amp; Robotics Prototyping · Future Labs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Trend vs Local Reality Context */}
        <section className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 bg-muted/30 border-b border-border/60">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              <div className="rounded-none border border-border/80 bg-card p-6 sm:p-8 flex flex-col gap-3">
                <h3 className="font-display font-bold uppercase tracking-tight text-lg text-foreground">
                  WEF 2025 Future of Jobs
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  AI, big data, network engineering, and applied technological literacy represent the fastest-growing job skill domains through 2030 globally.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-6 sm:p-8 flex flex-col gap-3">
                <h3 className="font-display font-bold uppercase tracking-tight text-lg text-foreground">
                  Practical Hardware Access
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Many local students study computing purely as theoretical bookwork. Hands-on coding and circuit wiring require low-cost, resilient physical kits.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-6 sm:p-8 flex flex-col gap-3">
                <h3 className="font-display font-bold uppercase tracking-tight text-lg text-foreground">
                  Offline-First Learning
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Curricula and software bundles are architected to run reliably on standard PCs without dependent constant broadband connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Curriculum Deep Dive */}
        <section className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 bg-background border-b border-border/60">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                Three Progressive Age Tracks
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
                Structured to build capability sequentially: from block-based algorithmic patterns to physical microcontroller sensors and exploratory data science.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="mb-10 w-full overflow-x-auto pb-1">
                <TabsList className="bg-muted p-1 rounded-none flex flex-nowrap w-max gap-1.5 h-auto font-ui">
                  {futureLabsTracks.map((t) => (
                    <TabsTrigger key={t.id} value={t.id} className="text-xs uppercase tracking-wider font-bold px-5 py-2.5 min-h-11 rounded-none shrink-0">
                      {t.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {futureLabsTracks.map((t) => (
                <TabsContent key={t.id} value={t.id} className="focus-visible:outline-none">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    <div className="lg:col-span-8 border border-border bg-card p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-col gap-3 mb-8">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs font-ui font-semibold uppercase tracking-wider text-secondary border-secondary/30 rounded-none px-2.5 py-1">
                            {t.ageGroup}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-mono">Term Length: 12 Weeks</span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                          {t.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-sans">
                          <strong className="font-ui uppercase tracking-wider text-foreground">Prerequisites:</strong> {t.prerequisites}
                        </p>
                      </div>

                      <div className="flex flex-col gap-8">
                        <div>
                          <h4 className="text-xs font-ui uppercase tracking-wider font-bold text-muted-foreground mb-4">
                            Core Modules
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {t.coreTopics.map((topic, i) => (
                              <div key={i} className="flex items-start gap-3 rounded-none border border-border/60 bg-muted/30 p-3.5 text-xs">
                                <CheckCircle2 className="size-4 text-secondary shrink-0 mt-0.5" />
                                <span className="font-medium text-foreground">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-none border border-secondary/30 bg-secondary/5 p-6 flex flex-col gap-4">
                          <span className="text-xs font-ui uppercase tracking-wider font-bold text-secondary flex items-center gap-1.5">
                            <Cpu className="size-4" /> Capstone Project Brief
                          </span>
                          <h5 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">
                            {t.handsOnProject.title}
                          </h5>
                          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {t.handsOnProject.description}
                          </p>
                          <div className="rounded-none bg-background/80 border border-border/60 p-3.5 text-xs text-muted-foreground">
                            <strong className="font-ui uppercase tracking-wider text-foreground">Hardware Feasibility &amp; Offline Note:</strong> {t.handsOnProject.feasibilityNote}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                      <div className="border border-border bg-muted/20 p-6 flex flex-col gap-4">
                        <h4 className="text-sm font-ui uppercase tracking-wider font-bold text-foreground flex items-center gap-2">
                          <School className="size-4 text-secondary" />
                          School Partnership Model
                        </h4>
                        <div className="flex flex-col gap-3 font-sans text-xs text-muted-foreground leading-relaxed">
                          <p>
                            Participating secondary schools in Mayang Imphal nominate student cohorts and participating science/IT instructors.
                          </p>
                          <p>
                            Educators receive teaching stipends, structured lesson guides, and diagnostic support from external volunteer specialists.
                          </p>
                        </div>
                        <div className="pt-3 border-t border-border/50">
                          <RegisterInterestDialog initialProgramType="FUTURE_LABS">
                            <Button size="sm" variant="outline" className="w-full text-xs font-ui uppercase tracking-wider font-bold min-h-10 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50 rounded-none">
                              Inquiry
                            </Button>
                          </RegisterInterestDialog>
                        </div>
                      </div>

                      <div className="rounded-none border border-border/80 bg-card p-5 text-xs text-muted-foreground flex flex-col gap-2.5">
                        <span className="font-ui font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                          <HardDrive className="size-3.5 text-secondary" />
                          Zero Personal Device Barrier
                        </span>
                        <p className="font-sans leading-relaxed">
                          Students do not need personal laptops. All project exercises are designed to run during scheduled computer periods in shared school labs.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* 5-Stage Implementation Roadmap */}
        <section id="roadmap" className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 bg-muted/30 border-b border-border/60">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                Five-Stage Implementation Roadmap
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
                We believe in staged accountability. No program is scaled before its baseline audit is finished and its pilot outcomes are verified.
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              {launchMilestones.map((m, index) => {
                const isCurrent = m.status === "CURRENT_ASSESSMENT"
                return (
                  <div
                    key={m.phase}
                    className={`rounded-none border p-6 sm:p-8 transition ${
                      isCurrent
                        ? "border-secondary bg-card shadow-md"
                        : "border-border/80 bg-card/70 opacity-90"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-border/60">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex size-11 items-center justify-center rounded-none font-ui text-sm font-bold ${
                            isCurrent
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          0{index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold font-ui uppercase tracking-wider text-muted-foreground">
                              {m.phase}
                            </span>
                            {isCurrent && (
                              <Badge variant="outline" className="border-secondary/40 bg-secondary/10 text-secondary text-[11px] font-ui uppercase tracking-wider font-semibold rounded-none">
                                CURRENT ASSESSMENT
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground mt-1">
                            {m.title}
                          </h3>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground font-ui uppercase tracking-wider">
                        {isCurrent ? "Status: Active Community Consultations" : "Status: Staged Post-Pilot"}
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                      {m.description}
                    </p>

                    <div className="rounded-none bg-muted/30 border border-border/50 p-4 sm:p-5">
                      <span className="text-xs font-ui uppercase tracking-wider font-bold text-foreground block mb-3">
                        Key Milestones &amp; Verification Deliverables:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                        {m.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="text-secondary font-bold">•</span>
                            <span className="leading-relaxed">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Public Disclosures & FAQ */}
        <section className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 bg-background">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <Accordion className="w-full">
              <AccordionItem value="faq-1" className="py-2">
                <AccordionTrigger className="text-sm sm:text-base font-ui uppercase tracking-wider font-bold text-left">
                  Is Mayang Imphal Future Labs an official Government scheme?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
                  No. Mayang Imphal Future Labs is currently a proposed civic initiative in pre-pilot assessment. It is not an approved Government of Manipur or Central Government scheme. It seeks to coordinate community and philanthropic support to assist local schools.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="py-2">
                <AccordionTrigger className="text-sm sm:text-base font-ui uppercase tracking-wider font-bold text-left">
                  How are student participants selected?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
                  Selection protocols will be established in partnership with participating school principals, prioritizing student curiosity, attendance, and balanced gender participation across local wards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="py-2">
                <AccordionTrigger className="text-sm sm:text-base font-ui uppercase tracking-wider font-bold text-left">
                  How can local teachers or diaspora mentors get involved?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
                  Educators and technical professionals can register interest using the interest form. Volunteer mentors undergo identity screening and adhere to student safeguarding policies.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

