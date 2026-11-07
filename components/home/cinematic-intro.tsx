"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { AnimatePresence, useReducedMotion } from "motion/react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Sparkles, X } from "lucide-react"

export function CinematicIntro() {
  const [isDismissed, setIsDismissed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const curtainRef = useRef<HTMLDivElement>(null)
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Elements for Phase 1 & 2 Build
  const buildBlockRef = useRef<HTMLDivElement>(null)
  const buildLine1Ref = useRef<HTMLHeadingElement>(null)
  const buildLine2Ref = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const coordsRef = useRef<HTMLDivElement>(null)

  // Elements for Phase 4 Slam (Candidate 3-Row Title)
  const slamBlockRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRow1Ref = useRef<HTMLSpanElement>(null)
  const titleRow2Ref = useRef<HTMLSpanElement>(null)
  const titleRow3Ref = useRef<HTMLSpanElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const bottomProgressRef = useRef<HTMLDivElement>(null)

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem("bmi_intro_seen", "true")
      document.documentElement.classList.add("bmi-intro-seen")
    } catch {
      // Ignore storage restrictions
    }

    if (masterTimelineRef.current) {
      masterTimelineRef.current.kill()
    }

    if (curtainRef.current) {
      gsap.to(curtainRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => setIsDismissed(true),
      })
    } else {
      setIsDismissed(true)
    }
  }, [])

  // Check on mount if user already experienced intro or prefers reduced motion
  useEffect(() => {
    const checkTimer = setTimeout(() => {
      if (shouldReduceMotion) {
        setIsDismissed(true)
        return
      }

      try {
        if (sessionStorage.getItem("bmi_intro_seen") === "true") {
          setIsDismissed(true)
          return
        }
      } catch {
        // Ignore
      }
    }, 0)

    // Keyboard escape listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault()
        dismiss()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    // Replay intro listener
    const handleReplay = () => {
      try {
        sessionStorage.removeItem("bmi_intro_seen")
        document.documentElement.classList.remove("bmi-intro-seen")
      } catch {
        // Ignore
      }
      setIsDismissed(false)
      if (masterTimelineRef.current) {
        masterTimelineRef.current.restart()
      }
    }
    window.addEventListener("bmi:replay-intro", handleReplay)

    return () => {
      clearTimeout(checkTimer)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("bmi:replay-intro", handleReplay)
    }
  }, [shouldReduceMotion, dismiss])

  // GSAP Master Timeline (10.5s Total Cinematic Orchestration)
  useGSAP(
    () => {
      if (isDismissed || shouldReduceMotion) return

      // Initial element state resets to eliminate text collision and overlap
      gsap.set(curtainRef.current, { opacity: 1, yPercent: 0 })

      // Phase 1/2 starts active and centered
      gsap.set(buildBlockRef.current, { display: "flex", autoAlpha: 1, scale: 0.95 })
      gsap.set(buildLine1Ref.current, { opacity: 0, letterSpacing: "0.20em" })
      gsap.set(buildLine2Ref.current, { opacity: 0, y: 14, scale: 0.95 })
      gsap.set(progressLineRef.current, { scaleX: 0 })
      gsap.set(coordsRef.current, { opacity: 0, y: -8 })

      // Phase 4 Slam block starts completely removed from flow (display: none)
      gsap.set(slamBlockRef.current, { display: "none", autoAlpha: 0 })
      gsap.set(flashRef.current, { opacity: 0, scale: 0.4 })
      gsap.set(eyebrowRef.current, { opacity: 0, y: -12 })

      // 3-Row Candidate Name Initial Springs
      gsap.set(titleRow1Ref.current, { opacity: 0, scale: 1.7, y: -20 })
      gsap.set(titleRow2Ref.current, { opacity: 0, scale: 1.7, y: -22 })
      gsap.set(titleRow3Ref.current, { opacity: 0, scale: 1.8, y: -25 })

      gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 })
      gsap.set(sublineRef.current, { opacity: 0, y: 10 })
      gsap.set(bottomProgressRef.current, { scaleX: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem("bmi_intro_seen", "true")
            document.documentElement.classList.add("bmi-intro-seen")
          } catch {
            // Ignore
          }
          setIsDismissed(true)
        },
      })
      masterTimelineRef.current = tl

      // Global hairline progress tracker (0.0s -> 10.5s)
      tl.to(
        bottomProgressRef.current,
        { scaleX: 1, duration: 10.5, ease: "none" },
        0
      )

      // ================================================================
      // PHASE 1: BUILD-UP LINE 1 (0.0s – 3.2s)
      // "FOR A BETTER MAYANG IMPHAL" breathes in with cinematic tracking
      // ================================================================
      tl.to(coordsRef.current, { opacity: 0.8, y: 0, duration: 1.0, ease: "power2.out" }, 0.3)
      tl.to(
        buildLine1Ref.current,
        {
          opacity: 1,
          letterSpacing: "0.46em",
          duration: 3.0,
          ease: "power2.out",
        },
        0.4
      )
      tl.to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 3.0,
          ease: "power1.inOut",
        },
        0.4
      )

      // ================================================================
      // PHASE 2: BUILD-UP LINE 2 & RISING TENSION (3.4s – 5.8s)
      // "FOR TOMORROW" cuts in with emerald energy
      // ================================================================
      tl.to(
        buildLine2Ref.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "back.out(1.5)",
        },
        3.4
      )
      tl.to(
        buildBlockRef.current,
        {
          scale: 1.06,
          duration: 2.4,
          ease: "power1.out",
        },
        3.4
      )

      // Quick tension build release before silence - cleanly hide build block
      tl.to(
        buildBlockRef.current,
        {
          autoAlpha: 0,
          scale: 1.15,
          duration: 0.3,
          ease: "power2.in",
          display: "none",
        },
        5.8
      )

      // ================================================================
      // PHASE 3: THE CUT TO TOTAL SILENCE (6.1s – 6.7s, 600ms Peak Tension)
      // Pure stillness hold. Complete silence before the slam.
      // ================================================================

      // ================================================================
      // PHASE 4: THE BASS DROP SLAM & 3-ROW IDENTITY DETONATION (6.7s – 9.7s)
      // Radial shockwave burst + 3-Row Candidate Name with heavy spring inertia
      // ================================================================
      tl.set(slamBlockRef.current, { display: "flex", autoAlpha: 1 }, 6.7)

      // Shockwave Flash Burst
      tl.fromTo(
        flashRef.current,
        { opacity: 0.95, scale: 0.4 },
        { opacity: 0, scale: 2.8, duration: 0.75, ease: "power2.out" },
        6.7
      )

      // Subtle Impact Camera Shake
      tl.to(
        curtainRef.current,
        {
          x: "+=6",
          yoyo: true,
          repeat: 4,
          duration: 0.035,
          ease: "power1.inOut",
        },
        6.7
      )

      // Eyebrow Pill Drops In
      tl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        6.75
      )

      // CANDIDATE NAME SLAM - 3 MAJESTIC ROWS WITH STAGGERED SPRING INERTIA
      // Row 1: DR. KHUMUJAM
      tl.to(
        titleRow1Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          ease: "back.out(2.2)",
        },
        6.7
      )

      // Row 2: RATANKUMAR
      tl.to(
        titleRow2Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          ease: "back.out(2.2)",
        },
        6.8
      )

      // Row 3: SINGH (Glowing Accent)
      tl.to(
        titleRow3Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          ease: "back.out(2.2)",
        },
        6.9
      )

      // Cutting Dividing Rules Slicing Horizontally Open
      tl.to(
        dividerRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.65,
          ease: "power3.out",
        },
        7.15
      )

      // Subtitle Sourced Provenance Reveal
      tl.to(
        sublineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        7.45
      )

      // ================================================================
      // PHASE 5: CURTAIN WIPE & SMOOTH UNVEILING (9.7s – 10.5s)
      // Dissolves upward seamlessly into the fully pre-rendered civic home page
      // ================================================================
      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        9.7
      )
    },
    { scope: curtainRef, dependencies: [isDismissed, shouldReduceMotion] }
  )

  if (isDismissed) {
    return null
  }

  return (
    <AnimatePresence>
      <div
        id="cinematic-curtain"
        ref={curtainRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f6f2] dark:bg-[#070b09] text-foreground dark:text-white select-none overflow-hidden transition-colors"
        role="dialog"
        aria-label="Mayang Imphal Vision Intro"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/20 pointer-events-none" />

        {/* Dynamic Grain Texture Emulation */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* Top Civic Mandate Marker */}
        <div className="absolute top-6 left-6 z-20 hidden sm:flex items-center gap-2 text-[10px] font-ui uppercase tracking-widest text-muted-foreground dark:text-white/50">
          <span className="size-1.5 rounded-full bg-primary dark:bg-emerald-500 animate-pulse" />
          <span>Mayang Imphal AC-23 · LGD 250326</span>
        </div>

        {/* Skip Intro Button */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-6 right-6 z-20 inline-flex items-center gap-1.5 border border-border bg-card/80 hover:bg-card text-foreground/80 hover:text-foreground dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white/80 dark:hover:text-white px-3 py-1.5 text-[10px] font-ui font-semibold uppercase tracking-widest transition-colors backdrop-blur-sm cursor-pointer shadow-xs"
          aria-label="Skip introduction"
        >
          <span>Skip [ESC]</span>
          <X className="size-3" />
        </button>

        {/* ================================================================ */}
        {/* PHASE 1 & 2: THE BUILD-UP CONTAINER                              */}
        {/* ================================================================ */}
        <div
          ref={buildBlockRef}
          className="flex flex-col items-center justify-center text-center px-6 max-w-2xl origin-center"
        >
          {/* Coordinates Header */}
          <div
            ref={coordsRef}
            className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-primary/80 dark:text-emerald-400/80 font-medium"
          >
            24°46&apos;N 93°53&apos;E · HORIZON 2045
          </div>

          {/* Build Line 1: Tracked Line that Breathes In */}
          <h2
            ref={buildLine1Ref}
            className="font-ui text-xs sm:text-sm font-bold uppercase text-foreground/80 dark:text-white/80 tracking-widest"
          >
            For A Better Mayang Imphal
          </h2>

          {/* Central Progress Line */}
          <div className="mt-4 h-px w-32 bg-border dark:bg-white/15 overflow-hidden rounded-full">
            <div
              ref={progressLineRef}
              className="h-full w-full bg-linear-to-r from-primary/30 via-primary to-primary/30 dark:from-emerald-500/30 dark:via-emerald-400 dark:to-emerald-500/30 origin-left"
            />
          </div>

          {/* Build Line 2: Cuts in during Phase 2 */}
          <div
            ref={buildLine2Ref}
            className="mt-4 opacity-0 flex items-center gap-2 text-primary dark:text-emerald-400 font-display text-lg sm:text-2xl font-bold uppercase tracking-widest"
          >
            <Sparkles className="size-4 animate-pulse text-primary dark:text-emerald-400" />
            <span>For Tomorrow</span>
            <Sparkles className="size-4 animate-pulse text-primary dark:text-emerald-400" />
          </div>
        </div>

        {/* ================================================================ */}
        {/* PHASE 4: THE BASS DROP SLAM CONTAINER (Initial CSS: hidden)       */}
        {/* ================================================================ */}
        <div
          ref={slamBlockRef}
          className="hidden flex-col items-center justify-center text-center px-4 max-w-4xl z-10"
        >
          {/* Shockwave Flash Burst */}
          <div
            ref={flashRef}
            className="absolute -inset-32 bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-primary/20 via-primary/10 to-transparent dark:from-white/60 dark:via-emerald-400/25 rounded-full pointer-events-none"
          />

          {/* Eyebrow Pill */}
          <div
            ref={eyebrowRef}
            className="mb-5 sm:mb-6 inline-flex items-center gap-2 border border-primary/20 bg-primary/5 dark:border-white/20 dark:bg-white/5 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-widest text-primary dark:text-emerald-400 backdrop-blur-xs"
          >
            <span className="size-1.5 rounded-full bg-primary dark:bg-emerald-400 animate-ping inline-block" />
            <span>Civic Leadership &amp; Mandate</span>
          </div>

          {/* THE POLITICIAN NAME SLAM: 3 MAJESTIC ROWS */}
          <h1 className="flex flex-col items-center justify-center font-display uppercase tracking-tight leading-[0.92] text-center select-none">
            <span
              ref={titleRow1Ref}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground/80 dark:text-white/90 tracking-normal drop-shadow-xs dark:drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
            >
              Dr. Khumujam
            </span>
            <span
              ref={titleRow2Ref}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#170852] dark:text-white mt-1 sm:mt-2 tracking-tight drop-shadow-sm dark:drop-shadow-[0_10px_35px_rgba(255,255,255,0.25)]"
            >
              Ratankumar
            </span>
            <span
              ref={titleRow3Ref}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-primary dark:text-emerald-400 mt-1 sm:mt-2 tracking-tight drop-shadow-sm dark:drop-shadow-[0_12px_45px_rgba(52,211,153,0.35)]"
            >
              Singh
            </span>
          </h1>

          {/* The Cutting Line Beneath */}
          <div
            ref={dividerRef}
            className="mt-6 sm:mt-8 flex w-full max-w-lg items-center justify-center gap-4 origin-center"
          >
            <span className="h-px flex-1 bg-linear-to-r from-transparent via-foreground/30 to-foreground/60 dark:via-white/50 dark:to-white/70" />
            <span className="font-ui text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-foreground/90 dark:text-white/90 whitespace-nowrap">
              Mayang Imphal AC-23 · For The People
            </span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent via-foreground/30 to-foreground/60 dark:via-white/50 dark:to-white/70" />
          </div>

          {/* Provenanced Subtitle */}
          <p
            ref={sublineRef}
            className="mt-3.5 sm:mt-4 font-sans text-xs text-muted-foreground dark:text-white/60 tracking-normal"
          >
            Statutory Town Planning · Municipal Infrastructure · Youth Education
          </p>
        </div>

        {/* Global Hairline Timeline Bar at Bottom (10.5s total) */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10 dark:bg-white/10">
          <div
            ref={bottomProgressRef}
            className="h-full bg-linear-to-r from-primary via-primary/80 to-primary dark:from-emerald-500 dark:via-emerald-400 dark:to-emerald-300 origin-left"
          />
        </div>
      </div>
    </AnimatePresence>
  )
}

/**
 * Reusable button to replay the cinematic vision intro anytime on demand
 */
export function ReplayIntroButton({ className }: { className?: string }) {
  const triggerReplay = () => {
    try {
      sessionStorage.removeItem("bmi_intro_seen")
      document.documentElement.classList.remove("bmi-intro-seen")
    } catch {
      // Ignore
    }
    window.dispatchEvent(new CustomEvent("bmi:replay-intro"))
  }

  return (
    <button
      type="button"
      onClick={triggerReplay}
      className={className}
      aria-label="Replay Mayang Imphal vision intro"
    >
      <Sparkles className="size-3 text-primary dark:text-emerald-400" />
      <span>Vision Intro</span>
    </button>
  )
}
