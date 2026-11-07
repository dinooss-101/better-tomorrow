"use client"

import React, { useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Play, Pause } from "lucide-react"

gsap.registerPlugin(useGSAP)

export const DEFAULT_PROJECTS = [
  "AMRUT 2.0 GIS Master Plan",
  "Loktak Basin Outfall Survey",
  "Central Bazar Box Culvert",
  "Ward 3 Low-Lying Drainage",
  "Chabung Link Road Upgrade",
  "Bengoon Gravity Basin",
  "Moijing Drainage Outfall",
  "Inter-Ward Link Road PWD",
  "Thana Leikai Outfall Dredge",
  "Charoibung Road Surfacing",
  "Konchak Outfall Channel",
  "Heigrumakhong Drainage",
  "Ward 7 Monsoon Works",
  "Bazar Junction Utility Shift",
]

export const DEFAULT_PROGRAMS = [
  "Ishan Uday UGC Scholarship",
  "NEC Merit Higher Education",
  "Post-Matric SC/ST/OBC Aid",
  "Mayang Future Labs STEM",
  "Atal Tinkering Robotics",
  "National Scholarship Portal",
  "Saturday Open Grievance Desk",
  "Class-III Town Master Plan",
  "Secondary Computing Pilot",
  "State Periodic Renewal",
  "DPDP Act Privacy Standard",
  "12 Wards Civic Audit",
  "Loktak Hydrology Survey",
  "Citizen Priority Intake",
]

/** Line height in em; the hole radius and gutter are measured in it. */
const LINE = 1.6
/** Half the gap between the columns where the hole doesn't reach, in em. */
const GUTTER = 0.45

const GLYPHS = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,".split("")
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

const SCRAMBLE = { repeat: 3, repeatDelay: 0.04, delayStep: 0.025 }

export interface CircleCreditsProps {
  left?: string[]
  right?: string[]
  /** Radius of the hole, in rows. */
  radius?: number
  /** Seconds for one full lap round the hole. */
  duration?: number
  className?: string
}

export function CircleCredits({
  left = DEFAULT_PROJECTS,
  right = DEFAULT_PROGRAMS,
  radius = 6,
  duration = 24,
  className,
}: CircleCreditsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const rows = Math.max(left.length, right.length)
  const middle = (rows - 1) / 2

  const togglePause = useCallback(() => {
    if (!tweenRef.current) return
    if (isPaused) {
      tweenRef.current.play()
      setIsPaused(false)
    } else {
      tweenRef.current.pause()
      setIsPaused(true)
    }
  }, [isPaused])

  // Slots along the track, clockwise: 0 … rows-1 run up the left side
  // (bottom → top), rows … 2·rows-1 run down the right side (top → bottom).
  const leftSlot = (row: number) => rows - 1 - row
  const rightSlot = (row: number) => rows + row

  useGSAP(
    () => {
      const root = containerRef.current
      const stage = root?.querySelector<HTMLElement>("[data-stage]")
      if (!root || !stage) return

      const names = gsap.utils.toArray<HTMLElement>("[data-name]", root)
      const slots = names.map((el) => Number(el.dataset.slot))
      const setX = names.map((el) => gsap.quickSetter(el, "x", "px"))
      const setY = names.map((el) => gsap.quickSetter(el, "y", "px"))
      const setOpacity = names.map((el) => gsap.quickSetter(el, "opacity"))
      const total = rows * 2

      let em = 0
      let cx = 0
      let cy = 0
      let widths: number[] = []
      const measure = () => {
        em = parseFloat(getComputedStyle(stage).fontSize)
        cx = stage.clientWidth / 2
        cy = stage.clientHeight / 2
        widths = names.map((el) => el.offsetWidth)
      }

      // distance from the centre line to a name's inner edge at a (fractional) row
      const insetAt = (row: number) => {
        const d = row - middle
        const reach = Math.sqrt(Math.max(0, radius * radius - d * d))
        return Math.max(GUTTER, reach * LINE) * em
      }

      const lap = { progress: 0 }
      const layout = () => {
        names.forEach((el, i) => {
          const s = (slots[i] + lap.progress * total) % total
          const k = Math.floor(s)
          const f = s - k
          const w = widths[i]
          let row: number
          let x: number
          let opacity = 1

          if (k < rows - 1) {
            // left side, climbing
            row = rows - 1 - k - f
            x = -insetAt(row) - w
          } else if (k === rows - 1) {
            // top: climb half a row out of the left column while fading, then
            // fall half a row into the right column while fading back in
            const out = f < 0.5
            row = out ? -f : f - 1
            x = out ? -insetAt(row) - w : insetAt(row)
            opacity = Math.abs(1 - 2 * f)
          } else if (k < total - 1) {
            // right side, falling
            row = k - rows + f
            x = insetAt(row)
          } else {
            // bottom: the same handover, right column → left column
            const out = f < 0.5
            row = out ? rows - 1 + f : rows - f
            x = out ? insetAt(row) : -insetAt(row) - w
            opacity = Math.abs(1 - 2 * f)
          }

          setX[i](cx + x)
          setY[i](cy + ((row - middle) * LINE - LINE / 2) * em)
          setOpacity[i](opacity)
        })
      }

      measure()
      layout()
      // the font scales with the container, so widths and insets go stale on resize
      const resize = new ResizeObserver(() => {
        measure()
        layout()
      })
      resize.observe(stage)

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return () => resize.disconnect()
      }

      tweenRef.current = gsap.to(lap, {
        progress: 1,
        duration,
        ease: "power2.inOut",
        repeat: -1,
        onUpdate: layout,
      })

      gsap.from(gsap.utils.toArray<HTMLElement>("[data-inner]", root), {
        opacity: 0,
        filter: "blur(4px)",
        duration: 1.1,
        ease: "power2.inOut",
        delay: (_, el: HTMLElement) =>
          0.15 + Math.abs(Number(el.dataset.row) - middle) * 0.06,
        clearProps: "filter",
      })

      const cleanups = names.map((name) => {
        const chars = gsap.utils
          .toArray<HTMLElement>("[data-char]", name)
          .map((el) => ({ el, original: el.textContent ?? "" }))

        const scramble = () => {
          chars.forEach(({ el, original }, i) => {
            gsap.killTweensOf(el)
            el.textContent = original
            // pin the slot to the real letter's width so a wide symbol can't
            // change the name's width (its inner edge is what traces the circle)
            el.style.width = `${el.getBoundingClientRect().width}px`
            gsap.fromTo(
              el,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.03,
                repeat: SCRAMBLE.repeat,
                repeatRefresh: true,
                repeatDelay: SCRAMBLE.repeatDelay,
                delay: i * SCRAMBLE.delayStep,
                ease: "power1.out",
                textContent: randomGlyph,
                onComplete: () => {
                  el.textContent = original
                  el.style.width = ""
                },
              }
            )
          })
        }

        name.addEventListener("mouseenter", scramble)
        return () => {
          name.removeEventListener("mouseenter", scramble)
          chars.forEach(({ el, original }) => {
            gsap.killTweensOf(el)
            el.textContent = original
            el.style.width = ""
          })
        }
      })

      return () => {
        resize.disconnect()
        cleanups.forEach((cleanup) => cleanup())
      }
    },
    {
      scope: containerRef,
      dependencies: [left.join("|"), right.join("|"), radius, duration],
    }
  )

  const renderName = (text: string | undefined, slot: number, row: number) =>
    text ? (
      <span
        key={slot}
        data-name
        data-slot={slot}
        className="absolute top-0 left-0 cursor-default select-none transition-colors hover:text-primary dark:hover:text-emerald-400"
        style={{ lineHeight: LINE }}
      >
        <span data-inner data-row={row} className="inline-block">
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            {Array.from(text).map((char, i) =>
              char === " " ? (
                " "
              ) : (
                <span key={i} data-char className="inline-block text-center">
                  {char}
                </span>
              )
            )}
          </span>
        </span>
      </span>
    ) : null

  return (
    <div ref={containerRef} className={`@container w-full overflow-hidden ${className ?? ""}`}>
      <div
        data-stage
        className="relative w-full font-ui font-medium whitespace-nowrap text-foreground/80 text-[clamp(7px,1.4cqw,10.5px)] tracking-wider uppercase"
        style={{ height: `${(rows + 1) * LINE}em` }}
      >
        {/* Center Circular Hole Radar Anchor with Accessible Motion Pause/Play */}
        <button
          type="button"
          onClick={togglePause}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center cursor-pointer select-none z-10 size-20 rounded-full border border-dashed border-border/80 bg-background/90 p-2 shadow-2xs hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
          aria-label={isPaused ? "Resume registry motion" : "Pause registry motion"}
          title={isPaused ? "Resume motion" : "Pause motion"}
        >
          <span className="font-ui text-[11px] font-bold uppercase tracking-widest text-primary dark:text-emerald-400 flex items-center gap-1">
            Registry
            {isPaused ? <Play className="size-2.5 fill-current" /> : <Pause className="size-2.5 fill-current" />}
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-tight text-foreground">
            AC-23
          </span>
          <span className="font-ui text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
            {isPaused ? "Paused" : "Active"}
          </span>
        </button>

        {Array.from({ length: rows }, (_, row) => [
          renderName(left[row], leftSlot(row), row),
          renderName(right[row], rightSlot(row), row),
        ])}
      </div>
    </div>
  )
}

export default CircleCredits

