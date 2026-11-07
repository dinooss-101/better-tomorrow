"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Droplets, Layers, Map, FileText, ExternalLink } from "lucide-react"

export interface AmrutLayerCardData {
  id: "DRAINAGE" | "ROADS" | "LAND_USE" | "BOUNDARY"
  number: string
  tag: string
  title: string
  description: string
  rfpClause: string
  surveyDeliverable: string
  highlights: { value: string; label: string }[]
  icon: React.ComponentType<{ className?: string }>
}

export const AMRUT_LAYERS: AmrutLayerCardData[] = [
  {
    id: "DRAINAGE",
    number: "01",
    tag: "01 / DRAINAGE & HYDROLOGY",
    title: "Hydrological Contours & Drainage Outfalls",
    description:
      "Field contour mapping identifies natural gravity discharge routes to outfall canals, preventing construction across natural flood detention basins in Wards 1, 3, and 7.",
    rfpClause: "RFP Clause 4.3.4(b)",
    surveyDeliverable: "High-resolution DEM with ≤ 0.5m contour resolution across all 12 wards.",
    highlights: [
      { value: "≤ 0.5m DEM", label: "Contour Resolution" },
      { value: "Primary Outfalls", label: "Hydraulic Cross-Sections" },
      { value: "Wards 1, 3 & 7", label: "Retention Sinks" },
    ],
    icon: Droplets,
  },
  {
    id: "ROADS",
    number: "02",
    tag: "02 / ROADS & MOBILITY",
    title: "Road Network Hierarchy & Right-of-Way",
    description:
      "Demarcates statutory right-of-way reservations and minimum carriageway widths before settlement creates permanent traffic bottlenecks for emergency access and school transport.",
    rfpClause: "RFP Clause 4.3.4(c)",
    surveyDeliverable: "Gazetted road boundary and statutory right-of-way (RoW) register.",
    highlights: [
      { value: "12m–18m RoW", label: "Arterial Carriageways" },
      { value: "9m–12m RoW", label: "Collector Habitations" },
      { value: "Bus & Emergency", label: "Minimum Clearance" },
    ],
    icon: Layers,
  },
  {
    id: "LAND_USE",
    number: "03",
    tag: "03 / LAND USE & CADASTRE",
    title: "Existing Land Use & Cadastral Parcels",
    description:
      "Satellite stereo imagery combined with ground-truthing to georeference revenue village dag and khasra parcels, statutorily protecting prime wet-paddy fields from unzoned landfill.",
    rfpClause: "RFP Clause 4.3.2",
    surveyDeliverable: "Georeferenced cadastral layer overlaid onto 1:2000 cartographic base maps.",
    highlights: [
      { value: "1:2000 Scale", label: "Cartographic Base Map" },
      { value: "Dag & Khasra", label: "Village Parcel Integration" },
      { value: "Wet Paddy Zones", label: "Statutory Preservation" },
    ],
    icon: Map,
  },
  {
    id: "BOUNDARY",
    number: "04",
    tag: "04 / BOUNDARY & PERIMETER",
    title: "Municipal Extent & Contiguous Planning Zones",
    description:
      "Delineates the ~70 sq. km planning scope across all 12 Municipal Council wards and peripheral growth corridors, establishing a unified perimeter for drainage, roads, and solid waste.",
    rfpClause: "RFP Clause 4.1",
    surveyDeliverable: "Statutory boundary notification defining the ~70 sq. km planning perimeter.",
    highlights: [
      { value: "~70 sq. km", label: "Total Planning Scope" },
      { value: "12 Wards", label: "Municipal Council Area" },
      { value: "Peri-Urban Buffer", label: "Coordinated Sanitation" },
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
  const topOffset = `calc(${index * 20}px)`

  return (
    <div
      className={
        shouldReduceMotion
          ? "relative mb-6 last:mb-0"
          : "relative lg:sticky lg:top-24 flex items-start justify-center mb-6 lg:mb-0 lg:h-[62vh] lg:min-h-100 lg:max-h-120 pb-6"
      }
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          top: shouldReduceMotion ? undefined : topOffset,
        }}
        className="relative w-full max-w-4xl rounded-none border border-border bg-card/95 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-sm ring-1 ring-border/40 origin-top transition-colors"
      >
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center border border-border bg-muted/40 text-primary dark:text-emerald-400">
              <IconComponent className="size-3.5" />
            </div>
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
              {card.tag}
            </span>
          </div>

          <Badge
            variant="outline"
            className="text-primary dark:text-emerald-400 border-primary/30 dark:border-emerald-400/30 bg-primary/5 text-[11px] font-mono rounded-none py-0.5 px-2"
          >
            {card.rfpClause}
          </Badge>
        </div>

        {/* Main Card Content */}
        <div className="space-y-4">
          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-foreground leading-snug">
            {card.title}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {card.description}
          </p>

          {/* Minimalist 3-Metric Specification Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            {card.highlights.map((h, i) => (
              <div
                key={i}
                className="border border-border/60 bg-muted/20 p-3 sm:p-3.5 flex flex-col gap-1 rounded-none"
              >
                <span className="font-mono text-xs sm:text-[13px] font-bold text-foreground">
                  {h.value}
                </span>
                <span className="font-ui text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                  {h.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Deliverable Bar */}
          <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground font-sans">
              <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-foreground">
                Deliverable:
              </span>
              <span className="text-xs">{card.surveyDeliverable}</span>
            </div>

            <a
              href={rfpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary dark:text-emerald-400 font-ui text-[11px] font-bold uppercase tracking-wider hover:underline ml-auto"
            >
              <span>View RFP</span>
              <ExternalLink className="size-3" />
            </a>
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
        const targetScale = 1 - (AMRUT_LAYERS.length - i) * 0.025
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
