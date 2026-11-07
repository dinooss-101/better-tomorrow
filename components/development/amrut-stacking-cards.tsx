"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Droplets, Layers, Map, FileText, CheckCircle2, ExternalLink } from "lucide-react"

export interface AmrutLayerCardData {
  id: "DRAINAGE" | "ROADS" | "LAND_USE" | "BOUNDARY"
  number: string
  tag: string
  title: string
  subtitle: string
  description: string
  rfpClause: string
  statutoryStandard: string
  surveyDeliverable: string
  specs: string[]
  icon: React.ComponentType<{ className?: string }>
}

export const AMRUT_LAYERS: AmrutLayerCardData[] = [
  {
    id: "DRAINAGE",
    number: "01",
    tag: "01 / DRAINAGE",
    title: "Hydrological Contours & Drainage Outfalls",
    subtitle: "Mitigating monsoon waterlogging in low-lying depressions",
    description:
      "Field contour mapping identifies natural gravity discharge routes toward outfall canals. Essential to prevent construction across natural flood detention sinks.",
    rfpClause: "RFP Clause 4.3.4(b) · Topographic & Hydrological Analysis",
    statutoryStandard: "GIS Sub-Scheme Grade A · Hydrology & Gravity Gradients",
    surveyDeliverable: "High-resolution DEM with ≤ 0.5m contour resolution across all 12 wards.",
    specs: [
      "High-resolution DEM contour intervals ≤ 0.5m across natural basins",
      "Hydraulic cross-section surveys for primary outfalls and canals",
      "Monsoon flood retention sink demarcation in Wards 1, 3, and 7",
    ],
    icon: Droplets,
  },
  {
    id: "ROADS",
    number: "02",
    tag: "02 / ROADS",
    title: "Road Network Hierarchy & Right-of-Way (RoW)",
    subtitle: "Planned arterial corridors for school bus and emergency access",
    description:
      "Demarcates minimum carriageway widths and right-of-way reservations before uncoordinated building settlement creates permanent traffic bottlenecks.",
    rfpClause: "RFP Clause 4.3.4(c) · Circulation & Transport Network",
    statutoryStandard: "GIS Sub-Scheme Grade A · Carriageway & RoW Alignment",
    surveyDeliverable: "Gazetted Right-of-Way (RoW) road boundary register for all 12 wards.",
    specs: [
      "Arterial carriageway reservations: 12m–18m statutory right-of-way",
      "Secondary collector roads: 9m–12m access corridors across habitations",
      "Emergency vehicle & school bus clearance across internal settlement paths",
    ],
    icon: Layers,
  },
  {
    id: "LAND_USE",
    number: "03",
    tag: "03 / LAND USE",
    title: "Existing Land Use (ELU) & Cadastral Parcels",
    subtitle: "Georeferenced revenue village parcel overlays",
    description:
      "Satellite stereo imagery combined with ground-truthing to verify current residential, commercial, agricultural, and wetland boundaries.",
    rfpClause: "RFP Clause 4.3.2 · Base Map & ELU Formulation",
    statutoryStandard: "GIS Sub-Scheme Grade A · Cadastral Integration",
    surveyDeliverable: "Georeferenced cadastral layer overlaid onto 1:2000 cartographic base maps.",
    specs: [
      "Stereo satellite imagery with ground-truth verification points",
      "Revenue village dag and khasra parcel boundary geo-registration",
      "Demarcation of prime wet-paddy agricultural zones against unzoned fill",
    ],
    icon: Map,
  },
  {
    id: "BOUNDARY",
    number: "04",
    tag: "04 / BOUNDARY",
    title: "Municipal Extent & Contiguous Planning Zones",
    subtitle: "Delineating the preliminary ~70 sq. km planning scope",
    description:
      "Encompassing Mayang Imphal Municipal Council wards and peripheral contiguous habitations requiring coordinated civic sanitation and planning controls.",
    rfpClause: "RFP Clause 4.1 · Delineation of Planning Area",
    statutoryStandard: "GIS Sub-Scheme Grade A · Municipal Delineation",
    surveyDeliverable: "Statutory boundary notification defining the ~70 sq. km planning area.",
    specs: [
      "12 statutory wards under Mayang Imphal Municipal Council",
      "Peripheral contiguous habitations and peri-urban growth buffers",
      "Coordinated solid waste, sanitation, and drainage planning perimeter",
    ],
    icon: FileText,
  },
]

interface StackingCardProps {
  card: AmrutLayerCardData
  index: number
  totalCards: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  rfpUrl: string
}

function StackingCard({
  card,
  index,
  progress,
  range,
  targetScale,
  rfpUrl,
}: StackingCardProps) {
  const scale = useTransform(progress, range, [1, targetScale])
  const shouldReduceMotion = useReducedMotion()
  const IconComponent = card.icon

  // Compact cascade offset so stacked cards peek neatly without consuming excessive height
  const topOffset = `calc(${index * 16}px)`

  return (
    <div
      className={
        shouldReduceMotion
          ? "relative mb-6 last:mb-0"
          : "relative lg:sticky lg:top-20 flex items-start justify-center mb-6 lg:mb-0 lg:h-[72vh] lg:min-h-120 lg:max-h-140 pb-4"
      }
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          top: shouldReduceMotion ? undefined : topOffset,
        }}
        className="relative w-full max-w-5xl rounded-none border border-border bg-card p-5 sm:p-6 lg:p-7 shadow-lg ring-1 ring-border/50 origin-top transition-colors"
      >
        {/* Architectural Corner Crop Marks */}
        <span className="absolute -top-1.5 -left-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
          ┌
        </span>
        <span className="absolute -top-1.5 -right-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
          ┐
        </span>
        <span className="absolute -bottom-1.5 -left-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
          └
        </span>
        <span className="absolute -bottom-1.5 -right-1.5 text-primary dark:text-emerald-400 font-mono text-sm leading-none select-none">
          ┘
        </span>

        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/70 pb-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
              {card.tag}
            </span>
            <span className="text-border">·</span>
            <Badge
              variant="outline"
              className="text-primary dark:text-emerald-400 border-primary/30 dark:border-emerald-400/30 bg-primary/5 text-[10px] sm:text-[11px] font-mono rounded-none py-0 px-1.5"
            >
              {card.rfpClause}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 font-ui text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <IconComponent className="size-3 text-primary dark:text-emerald-400" />
            <span>AMRUT 2.0 Horizon 2045</span>
          </div>
        </div>

        {/* Two-Column Card Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Scope, Title, Subtitle, Description & Specs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-tight text-foreground leading-snug">
                {card.title}
              </h3>
              <p className="font-ui text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary dark:text-emerald-400 mt-1">
                {card.subtitle}
              </p>
              <p className="font-sans text-xs sm:text-[13px] text-muted-foreground leading-relaxed mt-2.5">
                {card.description}
              </p>
            </div>

            {/* Field Specifications Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <span className="font-ui text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                Mandatory Field Survey Requirements
              </span>
              <ul className="space-y-1.5 font-sans text-xs text-foreground">
                {card.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="size-3 text-primary dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Meta Bar */}
            <div className="pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-ui text-muted-foreground">
              <div>
                <span className="uppercase tracking-wider">Standard: </span>
                <span className="font-bold text-foreground uppercase tracking-wider">
                  {card.statutoryStandard}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Survey Parameter Frame */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-border/80 bg-muted/20 p-4 sm:p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Survey Specification
                </span>
                <span className="font-mono text-[10px] text-primary dark:text-emerald-400 font-semibold">
                  GIS Layer #{card.number} / 04
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between py-0.5 border-b border-border/40">
                  <span className="text-muted-foreground">Coverage Area</span>
                  <span className="font-semibold text-foreground">~70 sq. km</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-border/40">
                  <span className="text-muted-foreground">Constituency</span>
                  <span className="font-semibold text-foreground">Mayang Imphal AC-23</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-border/40">
                  <span className="text-muted-foreground">Wards Covered</span>
                  <span className="font-semibold text-foreground">12 Municipal Wards</span>
                </div>
              </div>

              <div className="pt-1.5">
                <span className="font-ui text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                  Statutory Deliverable
                </span>
                <p className="font-sans text-[11px] text-muted-foreground leading-relaxed border-l-2 border-primary dark:border-emerald-400 pl-2.5 py-0.5">
                  {card.surveyDeliverable}
                </p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-[10px] font-ui">
              <span className="text-muted-foreground uppercase tracking-wider font-semibold">
                Nodal: Town Planning Dept.
              </span>
              <a
                href={rfpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary dark:text-emerald-400 font-bold uppercase tracking-wider hover:underline"
              >
                <span>Official RFP</span>
                <ExternalLink className="size-2.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function AmrutStackingCards({ rfpUrl }: { rfpUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={containerRef} className="relative w-full">
      {AMRUT_LAYERS.map((card, i) => {
        // Earlier cards scale down slightly as later cards stack on top
        const targetScale = 1 - (AMRUT_LAYERS.length - i) * 0.03
        return (
          <StackingCard
            key={card.id}
            card={card}
            index={i}
            totalCards={AMRUT_LAYERS.length}
            progress={scrollYProgress}
            range={[i * 0.22, 1]}
            targetScale={targetScale}
            rfpUrl={rfpUrl}
          />
        )
      })}
    </div>
  )
}
