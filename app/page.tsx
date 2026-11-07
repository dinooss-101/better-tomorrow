import React from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { HomeHero } from "@/components/home/home-hero"
import { CinematicIntro } from "@/components/home/cinematic-intro"
import { HomePathways } from "@/components/home/home-pathways"
import { HomeEcologicalBrief } from "@/components/home/home-ecological-brief"
import { HomeRegistryOrbit } from "@/components/home/home-registry-orbit"
import { HomeLedger } from "@/components/home/home-ledger"
import { HomeContactPanel } from "@/components/home/home-contact-panel"
import { mockProjects } from "@/lib/data/projects"

export const metadata: Metadata = {
  title: "Mayang Imphal · Civic Leadership Platform",
  description:
    "Statutory town planning, municipal drainage works, verified student scholarships, and public accountability for Mayang Imphal (AC-23), Manipur.",
}

export default function HomePage() {
  const featuredProjects = mockProjects.slice(0, 4)

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-secondary-foreground">
      <CinematicIntro />
      <SiteHeader />
      <main>
        <HomeHero />
        <HomePathways />
        <HomeEcologicalBrief />
        <HomeRegistryOrbit />
        <HomeLedger projects={featuredProjects} />
        <HomeContactPanel />
      </main>
      <Footer />
    </div>
  )
}
