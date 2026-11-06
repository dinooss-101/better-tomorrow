import React from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import HeroSection from "@/components/hero-section-8"
import { PoliticianStatement } from "@/components/politician/politician-statement"
import { PoliticianGallery } from "@/components/politician/politician-gallery"
import { PoliticianPillars } from "@/components/politician/politician-pillars"
import { PoliticianLedger } from "@/components/politician/politician-ledger"
import { PoliticianVoices } from "@/components/politician/politician-voices"
import { PoliticianIntake } from "@/components/politician/politician-intake"
import FAQs from "@/components/faqs-1"
import Footer from "@/components/footer-2"

export const metadata: Metadata = {
  title: "Better Mayang Imphal · Civic Leadership Platform (2027)",
  description:
    "Official constituent platform for Mayang Imphal: transparent governance, statutory GIS Master Plan 2045, STEM future labs, and decoupled public accountability.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />
      <main>
        {/* 1. Politician Hero: Spacious, Visual & Clear Mandate */}
        <HeroSection />

        {/* 2. The Mandate: Personal Statement & Portrait */}
        <PoliticianStatement />

        {/* 3. In the Community: Tabbed Photojournalism Field Journal */}
        <PoliticianGallery />

        {/* 4. Three Core Pillars: Flagship Policies with Large Photo Placeholders */}
        <PoliticianPillars />

        {/* 5. Decoupled Accountability: Bold Metrics & Ground Verification */}
        <PoliticianLedger />

        {/* 6. Documented Ward Submissions */}
        <PoliticianVoices />

        {/* 7. Direct Answers to Common Questions */}
        <FAQs />

        {/* 8. Direct Constituent Desk: Citizen Priority Intake */}
        <PoliticianIntake />
      </main>
      <Footer />
    </div>
  )
}
