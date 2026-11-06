"use client"

import React from "react"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function PoliticianGallery() {
  return (
    <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28" id="community-action">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header with Generous Negative Space */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="font-headline text-2xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Everyday work across all 12 wards.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            True representation begins on the ground. A documented photographic record of our field consultations and ward inspections.
          </p>
        </div>

        {/* Tabbed Photojournalism for Generous Spacing & No Overcrowding */}
        <Tabs defaultValue="consultations" className="w-full">
          <div className="mb-8 flex items-center justify-between border-b border-border pb-3 gap-2 overflow-x-auto">
            <TabsList className="bg-muted/40 p-1 border border-border/60 w-max shrink-0">
              <TabsTrigger value="consultations" className="text-xs px-3 py-1.5 min-h-[36px] sm:min-h-0">
                Citizen consultations
              </TabsTrigger>
              <TabsTrigger value="infrastructure" className="text-xs px-3 py-1.5 min-h-[36px] sm:min-h-0">
                Public works &amp; ecology
              </TabsTrigger>
              <TabsTrigger value="youth" className="text-xs px-3 py-1.5 min-h-[36px] sm:min-h-0">
                Youth &amp; open office
              </TabsTrigger>
            </TabsList>
            <span className="hidden sm:inline-block text-xs text-muted-foreground shrink-0">
              6 Documented Deployments
            </span>
          </div>

          {/* Tab 1: Citizen Consultations */}
          <TabsContent value="consultations" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <div className="border border-border bg-card p-4">
                <ImagePlaceholder
                  aspectRatio="4/3"
                  category="Market Consultations"
                  location="Bazar Corridor · Ward 1"
                  title="Morning listening walk with local merchants and street vendors"
                  hint="1200 × 900 · 4:3 Documentary"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Bazar Central Corridor</span>
                  <span>Ward 1</span>
                </div>
              </div>

              <div className="border border-border bg-card p-4">
                <ImagePlaceholder
                  aspectRatio="4/3"
                  category="Livelihoods"
                  location="Bengoon Cluster · Ward 5"
                  title="Dialogue with women weavers and self-help group artisans"
                  hint="1200 × 900 · 4:3 Cooperative Session"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Bengoon Handloom Cluster</span>
                  <span>Ward 5</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Public Works & Ecology */}
          <TabsContent value="infrastructure" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <div className="border border-border bg-card p-4">
                <ImagePlaceholder
                  aspectRatio="4/3"
                  category="Flood Mitigation"
                  location="Chabung Company · Ward 2"
                  title="Pre-monsoon drainage culvert and runoff desiltation inspection"
                  hint="1200 × 900 · 4:3 Field Inspection"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Chabung Company Zone</span>
                  <span>Ward 2</span>
                </div>
              </div>

              <div className="border border-border bg-card p-4">
                <ImagePlaceholder
                  aspectRatio="4/3"
                  category="Loktak Ecology"
                  location="Konchak Zone · Ward 6"
                  title="Wetland ecology and fisheries consultation along Loktak buffer zones"
                  hint="1200 × 900 · 4:3 Agrarian Review"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Konchak Buffer Corridor</span>
                  <span>Ward 6</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Youth & Open Office */}
          <TabsContent value="youth" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <div className="border border-border bg-card p-4">
                <ImagePlaceholder
                  aspectRatio="4/3"
                  category="Future Labs"
                  location="Thana Leikai · Ward 3"
                  title="Microcontroller breadboard assembly with secondary schoolers"
                  hint="1200 × 900 · 4:3 STEM Workshop"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Thana Leikai Complex</span>
                  <span>Ward 3</span>
                </div>
              </div>

              <div className="border border-border bg-card p-4">
                <ImagePlaceholder
                  aspectRatio="4/3"
                  category="Constituent Redressal"
                  location="Mayang Imphal Central"
                  title="Saturday open grievance redressal without gatekeepers"
                  hint="1200 × 900 · 4:3 Civic Redressal"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Mayang Imphal Central Office</span>
                  <span>Weekly</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
