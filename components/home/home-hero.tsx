"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play, MapPin, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { TypewriterTitle } from "@/components/ui/typewriter-title"
import { ReplayIntroButton } from "@/components/home/cinematic-intro"

export function HomeHero() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isPlayingVideo && videoRef.current) {
      const vid = videoRef.current
      vid.muted = isMuted
      const playPromise = vid.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback: enforce muted autoplay if browser blocks audio
          if (videoRef.current) {
            videoRef.current.muted = true
            setIsMuted(true)
            videoRef.current.play().catch(() => {})
          }
        })
      }
    }
  }, [isPlayingVideo, isMuted])

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center border-b border-border bg-background min-h-0 md:min-h-[min(calc(100dvh-3.75rem),40rem)] 2xl:min-h-[min(calc(100dvh-3.75rem),44rem)] py-8 sm:py-10 md:py-12 2xl:py-14 in-data-[density=compact]:py-4 in-data-[density=compact]:sm:py-6 in-data-[density=compact]:md:py-8 overflow-hidden"
    >
      {/* Subtle Atmospheric Ambient Radial Light for 4K / Large Desktop Monitors */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)/0.035,transparent_75%)] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-10 w-full">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ================================================================ */}
          {/* LEFT 50%: Vision, Mandate & Sourced Provenance                   */}
          {/* ================================================================ */}
          <div className="flex flex-col items-start">
            {/* Civic Identifier Eyebrow */}
            <div className="mb-3.5 flex flex-wrap items-center gap-2 font-ui text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-primary">
                <span className="size-2 rounded-full bg-primary inline-block" />
                Mayang Imphal AC-23
              </span>
              <span className="text-border">·</span>
              <span className="text-muted-foreground font-medium uppercase tracking-wider">
                Municipal Area LGD 250326
              </span>
            </div>

            {/* 3-Line Hero Heading: Lines 1 & 2 Fixed, Line 3 Typewriter Animated (Strict Single-Line Lock) */}
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight uppercase flex flex-col items-start">
              <span className="block text-foreground whitespace-nowrap">A better Mayang Imphal</span>
              <span className="block text-foreground whitespace-nowrap">for our people through</span>
              <span className="relative block h-[1.2em] min-h-[1.2em] w-full overflow-hidden">
                <TypewriterTitle
                  as="span"
                  className="w-full justify-start items-center text-left font-display uppercase"
                  textClassName="inline-grid justify-items-start whitespace-nowrap font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight text-primary uppercase"
                  sequences={[
                    {
                      text: "statutory master plan.",
                      deleteAfter: true,
                      pauseAfter: 2800,
                    },
                    {
                      text: "municipal drainage.",
                      deleteAfter: true,
                      pauseAfter: 2400,
                    },
                    {
                      text: "student scholarships.",
                      deleteAfter: true,
                      pauseAfter: 2400,
                    },
                    {
                      text: "Future Labs STEM hubs.",
                      deleteAfter: true,
                      pauseAfter: 2400,
                    },
                    {
                      text: "12 municipal wards.",
                      deleteAfter: true,
                      pauseAfter: 2400,
                    },
                  ]}
                  typingSpeed={40}
                  deleteSpeed={25}
                  loopDelay={1000}
                />
              </span>
            </h1>

            {/* Refined Hero Subtitle (Public Sans) */}
            <p className="mt-3.5 max-w-lg font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal tracking-normal">
              Tracking municipal drainage outfalls, verified student scholarships, and Future Labs STEM workshops across Mayang Imphal&apos;s 12 wards.
            </p>

            {/* Concise Action CTAs (Montserrat) */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/development"
                className="font-ui inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99]"
              >
                <span>Master Plan 2045</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/progress"
                className="font-ui inline-flex min-h-10 items-center justify-center gap-2 border border-border bg-card px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99]"
              >
                <span>Civic Tracker</span>
              </Link>
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT 50%: Profile Image & Video Frame                          */}
          {/* ================================================================ */}
          <div className="w-full">
            {isPlayingVideo ? (
              <div className="relative w-full aspect-4/3 sm:aspect-16/11 bg-black border border-border shadow-xs overflow-hidden">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  muted={isMuted}
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/animation/video_message.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video playback.
                </video>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="inline-flex min-h-11 items-center gap-1 bg-black/85 hover:bg-black text-white text-[11px] px-2.5 py-1 font-mono border border-white/20 transition-colors active:scale-95"
                    aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                  >
                    {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-primary" />}
                    <span className="hidden sm:inline">{isMuted ? "Unmute" : "Muted"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(false)}
                    className="inline-flex min-h-11 items-center gap-1 bg-black/85 hover:bg-black text-white text-[11px] px-2.5 py-1 font-mono border border-white/20 transition-colors active:scale-95"
                    aria-label="Close video player"
                  >
                    <RotateCcw className="size-3" />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-4/3 sm:aspect-16/11 border border-border/80 bg-card shadow-xs overflow-hidden">
                {/* Architectural Corner Crop Marks */}
                <span className="absolute -top-1.5 -left-1.5 text-primary font-mono text-sm leading-none select-none z-10">
                  ┌
                </span>
                <span className="absolute -top-1.5 -right-1.5 text-primary font-mono text-sm leading-none select-none z-10">
                  ┐
                </span>
                <span className="absolute -bottom-1.5 -left-1.5 text-primary font-mono text-sm leading-none select-none z-10">
                  └
                </span>
                <span className="absolute -bottom-1.5 -right-1.5 text-primary font-mono text-sm leading-none select-none z-10">
                  ┘
                </span>

                {/* Profile Image */}
                <Image
                  src="/image/hero-image-profile.png"
                  alt="Dr. Khumujam Ratankumar Singh · MLA, Mayang Imphal AC-23"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                  priority
                />

                {/* Bottom Overlay: Label, Vision Intro & Video Trigger */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-between gap-2 bg-linear-to-t from-black/85 via-black/45 to-transparent px-3.5 pb-3 pt-8 sm:px-5 sm:pb-4 sm:pt-12">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-ui text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/95">
                      Dr. Khumujam Ratankumar Singh
                    </span>
                    <span className="flex items-center gap-1 font-ui text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/70">
                      <MapPin className="size-2.5" />
                      MLA · Mayang Imphal AC-23
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <ReplayIntroButton className="inline-flex min-h-11 items-center gap-1.5 border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-2.5 sm:px-3 py-1.5 text-[11px] font-ui font-semibold uppercase tracking-wider transition-colors cursor-pointer active:scale-95" />
                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo(true)}
                      className="inline-flex min-h-11 items-center gap-1.5 border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-2.5 sm:px-3 py-1.5 text-[11px] font-ui font-semibold uppercase tracking-wider transition-colors cursor-pointer active:scale-95"
                      aria-label="Play video message from Dr. Khumujam Ratankumar Singh"
                    >
                      <Play className="size-3 fill-current" />
                      <span>Video Brief</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
