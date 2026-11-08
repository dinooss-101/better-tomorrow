"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  ArrowRight,
  Map,
  Layers,
  Droplets,
} from "lucide-react"
import { AmrutStackingCards } from "./amrut-stacking-cards"

export function DevelopmentView() {
  const rfpUrl =
    "https://www.tpmanipur.mn.gov.in/media/filer_public/9d/ca/9dca6f40-e750-4a2d-af92-62afb313ad85/rfp_gis_based_master_plan_-_amrut_20_manipur.pdf"

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
                    AMRUT 2.0 Sub-Scheme
                  </span>
                  <span className="text-muted-foreground/80">/</span>
                  <span className="font-ui text-xs text-muted-foreground font-semibold uppercase tracking-wider">Class-III Town Master Plan</span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight uppercase">
                  Mayang Imphal Master Plan 2045
                </h1>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5 max-w-2xl font-normal tracking-normal">
                  Statutory GIS-based urban planning framework formulated under the Ministry of Housing &amp; Urban Affairs (MoHUA) AMRUT 2.0 guidelines. Delineating drainage corridors, road rights-of-way, and agricultural preservation zones for the next two decades.
                </p>

                {/* Quick Guide Navigation */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-ui text-xs">
                  <span className="text-muted-foreground font-medium text-[11px] uppercase tracking-wider">Plan Outline:</span>
                  <a href="#mandate" className="text-primary hover:underline font-semibold uppercase tracking-wider text-[11px]">
                    1. What is Proposed?
                  </a>
                  <span className="text-border">·</span>
                  <a href="#survey-layers" className="text-primary hover:underline font-semibold uppercase tracking-wider text-[11px]">
                    2. 4 Survey Layers
                  </a>
                  <span className="text-border">·</span>
                  <a href="#jurisdiction" className="text-primary hover:underline font-semibold uppercase tracking-wider text-[11px]">
                    3. Who Does What?
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={rfpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "sm" }), "rounded-none bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center gap-1.5")}
                  >
                    <FileText className="size-3.5" />
                    <span>Download RFP</span>
                    <ExternalLink className="size-3 opacity-60 ml-0.5" />
                  </a>
                  <span className="text-xs text-muted-foreground">
                    Town Planning Dept., Govt. of Manipur · Ref No. 2/374/TP-MasterPlan/AMRUT-2.0
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-xs xl:max-w-sm border border-border/80 bg-card p-2.5 sm:p-3 shadow-xs">
                  <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden bg-muted/20">
                    <Image
                      src="/image/master-plan-gis-survey.png"
                      alt="Mayang Imphal Master Plan 2045 GIS Survey and Cartography"
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-2.5 border-t border-border/40 pt-2 text-center text-[11px] font-sans text-muted-foreground">
                    GIS Master Plan Cartography · MoHUA AMRUT 2.0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Statutory Framework */}
        <section id="mandate" className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 border-b border-border/60">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary tracking-wider uppercase font-ui">
                <Layers className="size-3.5" />
                <span>Statutory Mandate</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground mt-2">
                Why a GIS Master Plan Matters to Every Household
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-2xl">
                Without a published GIS Master Plan, public funds are frequently wasted on uncoordinated drain construction that leads to dead ends or backs up floodwater during peak monsoon rains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="border-t border-secondary/40 pt-6 space-y-3">
                <div className="text-xs font-ui text-secondary font-bold uppercase tracking-wider">01 / DRAINAGE</div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">Flood Contours First</h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Requires contractors to align ward drain depths to natural gravity gradients leading to regional outfalls, preventing localized pooling in residential settlements.
                </p>
              </div>

              <div className="border-t border-secondary/40 pt-6 space-y-3">
                <div className="text-xs font-ui text-secondary font-bold uppercase tracking-wider">02 / CONNECTIVITY</div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">Protected Right-of-Way</h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Gazettes arterial road widths before private construction encroaches, ensuring school buses, ambulances, and fire tenders can navigate all 12 wards safely.
                </p>
              </div>

              <div className="border-t border-secondary/40 pt-6 space-y-3">
                <div className="text-xs font-ui text-secondary font-bold uppercase tracking-wider">03 / ECOLOGY</div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">Agricultural Protection</h3>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Statutorily protects prime agricultural land and wet paddy fields across Mayang Imphal from arbitrary landfilling and unzoned commercial expansion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The 4 Core Survey Layers (Stacking Cards Parallax) */}
        <section id="survey-layers" className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 bg-muted/20 border-b border-border/60">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary tracking-wider uppercase font-ui">
                <Map className="size-3.5" />
                <span>Geospatial Survey Layers</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground mt-2">
                The 4 Core Survey Layers Required by AMRUT 2.0
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl">
                Scroll through the 4 statutory field surveys required under MoHUA guidelines before capital works and municipal infrastructure can be sanctioned:
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-4 text-xs font-ui text-muted-foreground">
                <span className="font-medium uppercase tracking-wider text-foreground">Scope: ~70 sq. km</span>
                <span className="text-border">·</span>
                <span className="uppercase tracking-wider">12 Municipal Wards</span>
                <span className="text-border">·</span>
                <span className="uppercase tracking-wider">MoHUA Sub-Scheme Grade A</span>
              </div>
            </div>

            {/* Scroll-Driven Stacking Card Parallax */}
            <AmrutStackingCards rfpUrl={rfpUrl} />
          </div>
        </section>

        {/* Section 3: Drainage Hotspot & Technical Specs */}
        <section className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 border-b border-border/60">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-secondary tracking-wider uppercase font-ui">
                  <Droplets className="size-3.5" />
                  <span>Immediate Priority</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                  The Critical Drainage Corridor: Central Bazar to Primary Outfall
                </h2>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  During peak monsoon months (June to September), water from higher elevations pools in Ward 1, Ward 3, and Ward 7 due to silted culverts and disconnected roadside trenches.
                </p>

                <div className="space-y-4 pt-2 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-secondary font-bold shrink-0">A.</span>
                    <span><strong className="text-foreground">Pre-Monsoon Desiltation:</strong> Mechanized silt clearing of the 3.8 km main corridor must be completed by May 15 each year.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-secondary font-bold shrink-0">B.</span>
                    <span><strong className="text-foreground">Culvert Widening:</strong> Reconstructing narrow 600mm RCC pipe culverts to 1200mm box culverts at major bazaar intersections.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-secondary font-bold shrink-0">C.</span>
                    <span><strong className="text-foreground">Gravity Retention Basins:</strong> Designating natural low-lying retention ponds to buffer excess surface runoff before it overflows road surfaces.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/progress"
                    className="font-ui inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary hover:underline"
                  >
                    <span>Active Works</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <ImagePlaceholder
                  src="/image/drainage-hydrology-outfall.png"
                  alt="Field hydrological inspection of primary gravity drainage outfall channels"
                  aspectRatio="1/1"
                  category="Ground Engineering"
                  location="Chabrou & Bazar Outfalls"
                  title="Field hydrological inspection of primary gravity drainage outfall channels"
                  hint="Field Engineering Survey"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Accountability Demarcation Table */}
        <section id="jurisdiction" className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 bg-background border-b border-border/60">
          <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
                Understanding Who Does What in Mayang Imphal
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-2xl">
                Clear civic accountability prevents shifting responsibility. Below is the constitutional demarcation of powers across municipal, state, and legislative authorities:
              </p>
            </div>

            <div className="sm:hidden mb-2.5 text-[11px] font-ui uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span>Scroll horizontally to view complete table</span>
              <ArrowRight className="size-3" />
            </div>

            <div className="overflow-x-auto rounded-none border border-border/80 bg-card shadow-xs">
              <table className="w-full min-w-160 text-left text-xs sm:text-sm">
                <thead className="bg-muted/60 text-foreground font-ui font-bold uppercase tracking-wider border-b border-border/80">
                  <tr>
                    <th className="p-4 sm:p-5">Jurisdictional Body</th>
                    <th className="p-4 sm:p-5">Key Responsibilities</th>
                    <th className="p-4 sm:p-5">What They Do NOT Control</th>
                    <th className="p-4 sm:p-5">Citizen Interface</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-border/60 text-muted-foreground font-sans">
                  <tr className="hover:bg-muted/20">
                    <td className="p-4 sm:p-5 font-semibold text-foreground">
                      Mayang Imphal Municipal Council (MIMC)
                      <span className="block text-[11px] font-ui font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Local Urban Body</span>
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Internal ward drains, daily market maintenance, sanitation &amp; solid waste collection, street lighting, local trade licenses.
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Major state highways, high-voltage transmission lines, district hospital funding, state police.
                    </td>
                    <td className="p-4 sm:p-5 font-medium">
                      Ward Councilor &amp; Municipal Executive Officer
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/20">
                    <td className="p-4 sm:p-5 font-semibold text-foreground">
                      Public Works Department (PWD)
                      <span className="block text-[11px] font-ui font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">State Line Agency</span>
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Major arterial roads, state highways passing through Mayang Imphal, major RCC bridges across rivers, major government building construction.
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Internal colony pathways, household trash collection, municipal trade license issuance.
                    </td>
                    <td className="p-4 sm:p-5 font-medium">
                      Executive Engineer (EE), PWD Division
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/20">
                    <td className="p-4 sm:p-5 font-semibold text-foreground">
                      Water Resources Department (WRD / IFCD)
                      <span className="block text-[11px] font-ui font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Irrigation &amp; Flood Control</span>
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Major river embankments, river dredging, primary drainage outfalls, barrage sluice gates.
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Neighborhood roadside open drains, residential pipe water supply connections.
                    </td>
                    <td className="p-4 sm:p-5 font-medium">
                      Executive Engineer (EE), Flood Control
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/20">
                    <td className="p-4 sm:p-5 font-semibold text-foreground">
                      Town Planning Department
                      <span className="block text-[11px] font-ui font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">AMRUT 2.0 Nodal Agency</span>
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Statutory GIS Master Plan formulation, land use zoning classifications, spatial base map publication, planning notification gazettes.
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Routine civil repairs, day-to-day garbage clearing, municipal tax assessments.
                    </td>
                    <td className="p-4 sm:p-5 font-medium">
                      Chief Town Planner, Govt. of Manipur
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/20">
                    <td className="p-4 sm:p-5 font-semibold text-foreground">
                      Elected MLA / Legislative Office
                      <span className="block text-[11px] font-ui font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Constituency Leadership</span>
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Legislative scrutiny, policy advocacy, securing central/state budget sanctions, holding line agencies accountable, MLA Local Area Development Fund allocation.
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed">
                      Direct executive administration of municipal contracts or line agency day-to-day work orders.
                    </td>
                    <td className="p-4 sm:p-5 font-medium">
                      Constituency Office &amp; Open Grievance Desk
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Citizen Action & Participation */}
        <section className="py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14 bg-muted/20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground">
              Have Your Say Before the Master Plan is Gazetted
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
              Under statutory planning rules, every citizen has the right to inspect draft land use proposals and submit objections or suggestions before the plan receives final government notification.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "default" }), "rounded-none bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-ui uppercase tracking-wider font-bold min-h-11 px-6 flex items-center gap-2")}
              >
                <span>Feedback</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/progress"
                className={cn(buttonVariants({ variant: "outline", size: "default" }), "rounded-none border-border/80 bg-card text-xs font-ui uppercase tracking-wider font-bold min-h-11 px-6")}
              >
                Track Progress
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
