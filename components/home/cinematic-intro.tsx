"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, useReducedMotion } from "motion/react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { RotateCcw, X } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP)
}

export function CinematicIntro() {
  const [isDismissed, setIsDismissed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const curtainRef = useRef<HTMLDivElement>(null)
  const skipBtnRef = useRef<HTMLButtonElement>(null)
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

  // Check on mount if user already experienced intro
  useEffect(() => {
    // Check if navigated from another page with ?replay=1 or ?intro=1
    if (typeof window !== "undefined") {
      const search = window.location.search
      if (search.includes("replay=1") || search.includes("intro=1")) {
        try {
          sessionStorage.removeItem("bmi_intro_seen")
          window.history.replaceState({}, "", window.location.pathname)
        } catch {
          // Ignore
        }
        return
      }
    }

    const checkTimer = setTimeout(() => {
      try {
        if (sessionStorage.getItem("bmi_intro_seen") === "true") {
          setIsDismissed(true)
          return
        }
      } catch {
        // Ignore
      }
    }, 0)

    // Replay intro custom event listener
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
      window.removeEventListener("bmi:replay-intro", handleReplay)
    }
  }, [])

  // Manage keyboard listener and focus trap ONLY while intro is actively visible
  useEffect(() => {
    if (isDismissed) return

    // Auto-focus skip button for keyboard and screen-reader accessibility
    skipBtnRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault()
        dismiss()
      } else if (e.key === "Tab") {
        // Trap focus inside the intro curtain
        e.preventDefault()
        skipBtnRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isDismissed, dismiss])

  // GSAP Master Timeline (Punchy, Reliable Cinematic Orchestration)
  useGSAP(
    () => {
      if (isDismissed) return

      // Initial element state resets to eliminate text collision and overlap
      gsap.set(curtainRef.current, { opacity: 1, yPercent: 0 })

      if (shouldReduceMotion) {
        // Accessible, gentle fade presentation (3.6s total) without intense shake/flashes
        gsap.set(buildBlockRef.current, { display: "flex", autoAlpha: 1, scale: 1 })
        gsap.set(buildLine1Ref.current, { opacity: 0, letterSpacing: "0.20em" })
        gsap.set(buildLine2Ref.current, { opacity: 0, y: 0, scale: 1 })
        gsap.set(progressLineRef.current, { scaleX: 0 })
        gsap.set(coordsRef.current, { opacity: 0, y: 0 })
        gsap.set(slamBlockRef.current, { display: "none", autoAlpha: 0 })
        gsap.set(titleRow1Ref.current, { opacity: 0, scale: 1, y: 0 })
        gsap.set(titleRow2Ref.current, { opacity: 0, scale: 1, y: 0 })
        gsap.set(titleRow3Ref.current, { opacity: 0, scale: 1, y: 0 })
        gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 })
        gsap.set(sublineRef.current, { opacity: 0, y: 0 })
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

        tl.to(bottomProgressRef.current, { scaleX: 1, duration: 3.6, ease: "none" }, 0)
        tl.to(coordsRef.current, { opacity: 0.9, duration: 0.4 }, 0.2)
        tl.to(buildLine1Ref.current, { opacity: 1, duration: 0.8 }, 0.3)
        tl.to(progressLineRef.current, { scaleX: 1, duration: 1.0 }, 0.3)
        tl.to(buildLine2Ref.current, { opacity: 1, duration: 0.8 }, 0.8)

        tl.to(buildBlockRef.current, { autoAlpha: 0, duration: 0.3, display: "none" }, 1.8)
        tl.set(slamBlockRef.current, { display: "flex", autoAlpha: 1 }, 1.9)
        tl.to(eyebrowRef.current, { opacity: 1, duration: 0.3 }, 1.9)
        tl.to(titleRow1Ref.current, { opacity: 1, duration: 0.4 }, 2.0)
        tl.to(titleRow2Ref.current, { opacity: 1, duration: 0.4 }, 2.1)
        tl.to(titleRow3Ref.current, { opacity: 1, duration: 0.4 }, 2.2)
        tl.to(dividerRef.current, { opacity: 1, scaleX: 1, duration: 0.4 }, 2.3)
        tl.to(sublineRef.current, { opacity: 1, duration: 0.4 }, 2.4)
        tl.to(curtainRef.current, { opacity: 0, y: -30, duration: 0.5, ease: "power2.inOut" }, 3.1)
        return
      }

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
      gsap.set(titleRow1Ref.current, { opacity: 0, scale: 1.5, y: -16 })
      gsap.set(titleRow2Ref.current, { opacity: 0, scale: 1.5, y: -18 })
      gsap.set(titleRow3Ref.current, { opacity: 0, scale: 1.6, y: -20 })

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

      // Global hairline progress tracker (0.0s -> 7.8s)
      tl.to(
        bottomProgressRef.current,
        { scaleX: 1, duration: 7.8, ease: "none" },
        0
      )

      // ================================================================
      // PHASE 1: BUILD-UP LINE 1 (0.0s – 2.4s)
      // ================================================================
      tl.to(coordsRef.current, { opacity: 0.8, y: 0, duration: 0.8, ease: "power2.out" }, 0.2)
      tl.to(
        buildLine1Ref.current,
        {
          opacity: 1,
          letterSpacing: "0.36em",
          duration: 2.2,
          ease: "power2.out",
        },
        0.3
      )
      tl.to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 2.2,
          ease: "power1.inOut",
        },
        0.3
      )

      // ================================================================
      // PHASE 2: BUILD-UP LINE 2 & RISING TENSION (2.4s – 4.0s)
      // ================================================================
      tl.to(
        buildLine2Ref.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        2.4
      )
      tl.to(
        buildBlockRef.current,
        {
          scale: 1.05,
          duration: 1.5,
          ease: "power1.out",
        },
        2.4
      )

      // Clean hide build block before slam
      tl.to(
        buildBlockRef.current,
        {
          autoAlpha: 0,
          scale: 1.12,
          duration: 0.25,
          ease: "power2.in",
          display: "none",
        },
        3.9
      )

      // ================================================================
      // PHASE 4: THE BASS DROP SLAM & 3-ROW IDENTITY DETONATION (4.2s – 6.8s)
      // ================================================================
      tl.set(slamBlockRef.current, { display: "flex", autoAlpha: 1 }, 4.2)

      tl.fromTo(
        flashRef.current,
        { opacity: 0.9, scale: 0.4 },
        { opacity: 0, scale: 2.6, duration: 0.65, ease: "power2.out" },
        4.2
      )

      tl.to(
        curtainRef.current,
        {
          x: "+=5",
          yoyo: true,
          repeat: 3,
          duration: 0.035,
          ease: "power1.inOut",
        },
        4.2
      )

      tl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        4.25
      )

      tl.to(
        titleRow1Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          ease: "back.out(2.0)",
        },
        4.2
      )

      tl.to(
        titleRow2Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          ease: "back.out(2.0)",
        },
        4.3
      )

      tl.to(
        titleRow3Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          ease: "back.out(2.0)",
        },
        4.4
      )

      tl.to(
        dividerRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.55,
          ease: "power3.out",
        },
        4.65
      )

      tl.to(
        sublineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        4.9
      )

      // ================================================================
      // PHASE 5: CURTAIN WIPE & SMOOTH UNVEILING (6.8s – 7.6s)
      // ================================================================
      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          opacity: 0,
          duration: 0.75,
          ease: "power3.inOut",
        },
        6.8
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
        onClick={dismiss}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f6f2] dark:bg-[#070b09] text-foreground dark:text-white select-none overflow-hidden transition-colors cursor-pointer"
        role="dialog"
        aria-modal="true"
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
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 text-[10px] sm:text-[11px] font-ui uppercase tracking-widest text-muted-foreground dark:text-white/50">
          <span className="size-1.5 rounded-none bg-primary dark:bg-emerald-500" />
          <span>Mayang Imphal AC-23 · LGD 250326</span>
        </div>

        {/* Skip Intro Button - Mobile Optimized >=44x44px Hit Target */}
        <button
          ref={skipBtnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            dismiss()
          }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 border border-border bg-card/90 hover:bg-card text-foreground dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white px-3.5 py-2 text-xs font-ui font-semibold uppercase tracking-widest transition-colors backdrop-blur-md cursor-pointer shadow-sm active:scale-95"
          aria-label="Skip introduction"
        >
          <span className="sm:hidden">Skip</span>
          <span className="hidden sm:inline">Skip [ESC]</span>
          <X className="size-3.5" />
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
            className="mb-4 font-mono text-[11px] tracking-[0.3em] uppercase text-primary/80 dark:text-emerald-400/80 font-medium"
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
            className="mt-4 opacity-0 flex items-center justify-center text-primary dark:text-emerald-400 font-display text-lg sm:text-2xl font-bold uppercase tracking-widest"
          >
            <span>For Tomorrow</span>
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
            className="mb-5 sm:mb-6 inline-flex items-center gap-2 border border-primary/20 bg-primary/5 dark:border-white/20 dark:bg-white/5 px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-widest text-primary dark:text-emerald-400 backdrop-blur-xs"
          >
            <span className="size-1.5 rounded-none bg-primary dark:bg-emerald-400 inline-block" />
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
  const router = useRouter()

  const triggerReplay = () => {
    try {
      sessionStorage.removeItem("bmi_intro_seen")
      document.documentElement.classList.remove("bmi-intro-seen")
    } catch {
      // Ignore
    }

    // If triggered from another route (e.g. /progress, /scholarships), navigate to home with replay flag
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.push("/?replay=1")
      return
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
      <RotateCcw className="size-3 text-primary dark:text-emerald-400" />
      <span>Vision Intro</span>
    </button>
  )
}
