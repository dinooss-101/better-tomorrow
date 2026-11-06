"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { ProjectCard } from "@/components/project-card"
import { mockProjects } from "@/lib/data/projects"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { PrioritySubmissionDialog } from "@/components/modals/priority-submission-dialog"
import {
  ArrowLeft,
  Search,
  BarChart3,
  MessageSquarePlus,
  ChevronDown,
  Download,
  Share2,
  Check,
  RotateCcw,
} from "lucide-react"

export default function ProgressPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
  const [selectedStage, setSelectedStage] = useState<string>("ALL")
  const [copied, setCopied] = useState(false)

  const categoryLabels: Record<string, string> = {
    ALL: "All Categories",
    WATER_AND_DRAINAGE: "Water & Drainage Outfalls",
    ROAD_CONNECTIVITY: "Roads & School Connectivity",
    MUNICIPAL_SERVICES: "Municipal Services & AMRUT",
    EDUCATION_STEM: "Education & STEM Labs",
  }

  const stageLabels: Record<string, string> = {
    ALL: "All Stages",
    PROPOSED: "Proposed Initiative",
    ADMINISTRATIVE_APPROVAL: "Admin Approval",
    FINANCIAL_SANCTION: "Financial Sanction",
    TENDERING: "Tendering / RFP",
    IMPLEMENTATION: "Works in Progress",
    COMPLETED: "Completed",
  }

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Category filter
      if (selectedCategory !== "ALL" && project.category !== selectedCategory) {
        return false
      }

      // Stage filter
      if (selectedStage !== "ALL" && project.currentStage !== selectedStage) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = project.title.toLowerCase().includes(q)
        const matchLocality = project.locality.toLowerCase().includes(q)
        const matchProblem = project.problemStatement.toLowerCase().includes(q)
        const matchAuthority = project.responsibleAuthority.name.toLowerCase().includes(q)
        if (!matchTitle && !matchLocality && !matchProblem && !matchAuthority) return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, selectedStage])

  const handleCopyAllCitations = async () => {
    const text = filteredProjects
      .map((p) => `[${p.id}] ${p.title} | Authority: ${p.responsibleAuthority.name} | Stage: ${p.currentStage} | Source: ${p.sources[0]?.title} (${p.sources[0]?.publicationDate})`)
      .join("\n")
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard unavailable or denied - silently ignore
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Hero */}
        <div className="bg-primary text-primary-foreground py-12 sm:py-16 md:py-20 border-b border-border/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/80 hover:text-primary-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors w-fit"
              >
                <ArrowLeft className="size-3.5" /> Back to Overview
              </Link>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-none border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground text-xs font-medium">
                  Public Transparency
                </Badge>
                <span className="text-xs text-primary-foreground/80">Two-Dimensional Evidence Model</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-primary-foreground leading-tight">
                Verified Progress Tracker
              </h1>

              <p className="text-sm sm:text-base text-primary-foreground/85 leading-relaxed">
                Tracking municipal drainage, road connectivity, and community initiatives in Mayang Imphal with primary source citations, separating administrative files from ground conditions.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <PrioritySubmissionDialog>
                  <Button className="rounded-none bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs sm:text-sm font-semibold min-h-11 justify-center active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50">
                    Report a Project Delay or Issue
                  </Button>
                </PrioritySubmissionDialog>
                <a
                  href="#methodology"
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-primary-foreground/80 hover:text-primary-foreground active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary py-2.5 px-3 min-h-11 border border-primary-foreground/30 rounded-none transition-colors"
                >
                  Review Status Methodology <BarChart3 className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar with Dropdown Menus */}
        <section className="py-8 sm:py-12 bg-background border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-none border border-border/80 bg-card p-4 sm:p-5 mb-8 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                {/* Search Input */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3 top-3 sm:top-2.5 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by project name, ward, locality, or authority..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-base sm:text-sm h-10 sm:h-9 active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50"
                  />
                </div>

                {/* Category Dropdown Menu */}
                <div className="md:col-span-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" size="sm" className="w-full justify-between h-10 sm:h-9 text-xs font-normal border-border bg-background active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50 rounded-none">
                          <span className="truncate">{categoryLabels[selectedCategory]}</span>
                          <ChevronDown className="size-3.5 opacity-60 shrink-0" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] sm:w-64 max-w-xs p-1 bg-popover border border-border/80 shadow-md rounded-none">
                      <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                        Filter by category
                      </DropdownMenuLabel>
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => setSelectedCategory(key)}
                          className="flex items-center justify-between text-xs py-1.5 px-2 rounded-none cursor-pointer active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                        >
                          <span className="truncate">{label}</span>
                          {selectedCategory === key && <Check className="size-3.5 text-secondary shrink-0" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stage Dropdown Menu */}
                <div className="md:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" size="sm" className="w-full justify-between h-10 sm:h-9 text-xs font-normal border-border bg-background active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50 rounded-none">
                          <span className="truncate">{stageLabels[selectedStage]}</span>
                          <ChevronDown className="size-3.5 opacity-60 shrink-0" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] sm:w-56 max-w-xs p-1 bg-popover border border-border/80 shadow-md rounded-none">
                      <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                        Filter by stage
                      </DropdownMenuLabel>
                      {Object.entries(stageLabels).map(([key, label]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => setSelectedStage(key)}
                          className="flex items-center justify-between text-xs py-1.5 px-2 rounded-none cursor-pointer active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                        >
                          <span className="truncate">{label}</span>
                          {selectedStage === key && <Check className="size-3.5 text-secondary shrink-0" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Data Actions Dropdown Menu */}
                <div className="md:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" size="sm" className="w-full justify-between h-10 sm:h-9 text-xs font-medium border-border bg-background active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50 rounded-none">
                          <span className="inline-flex items-center gap-1.5">
                            <Download className="size-3.5 text-secondary" />
                            <span>Export</span>
                          </span>
                          <ChevronDown className="size-3.5 opacity-60 shrink-0" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-[calc(100vw-2.5rem)] sm:w-60 max-w-xs p-1 bg-popover border border-border/80 shadow-md rounded-none">
                      <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
                        Export and citations
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={handleCopyAllCitations}
                        className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-none cursor-pointer active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                      >
                        <Share2 className="size-3.5 text-muted-foreground" />
                        <span>{copied ? "Copied Citations!" : "Copy Document Citations"}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Status Row */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs text-muted-foreground">
                <span>
                  Showing <strong>{filteredProjects.length}</strong> of {mockProjects.length} tracked records
                </span>
                {(searchQuery || selectedCategory !== "ALL" || selectedStage !== "ALL") && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("ALL")
                      setSelectedStage("ALL")
                    }}
                    className="inline-flex items-center gap-1 text-secondary hover:underline font-medium cursor-pointer active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  >
                    <RotateCcw className="size-3" />
                    <span>Reset all filters</span>
                  </button>
                )}
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} showFullDetails />
                ))}
              </div>
            ) : (
              <div className="rounded-none border border-dashed border-border p-12 text-center flex flex-col items-center justify-center gap-3">
                <BarChart3 className="size-10 text-muted-foreground" />
                <h3 className="font-heading text-lg font-semibold text-foreground">No matching project records</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Try adjusting your search terms or clearing the stage and category filters.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("ALL")
                    setSelectedStage("ALL")
                  }}
                  className="mt-2 text-xs rounded-none active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Methodology & Integrity Architecture */}
        <section id="methodology" className="py-16 bg-muted/30 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-1">
                The Verification Standard: Sourcing, Not Rhetoric
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Public progress trackers frequently suffer from confirmation bias or premature completion claims. BETTER MAYANG IMPHAL enforces four factual verification rules:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-none border border-border/80 bg-card p-6 flex flex-col gap-2">
                <div className="font-mono text-xs font-semibold text-secondary">Rule 01</div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  Primary Source Requirement
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every project record must link to an official Gazette notice, tender invitation (NIT), work order, or legislative question answer. Speeches and press releases are not accepted as evidence of administrative stage.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-6 flex flex-col gap-2">
                <div className="font-mono text-xs font-semibold text-secondary">Rule 02</div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  Separating Stage from Condition
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A project may officially be in &ldquo;Implementation&rdquo; according to department files, but simultaneously marked &ldquo;Delayed&rdquo; or &ldquo;On Hold&rdquo; on this tracker if utility line shifting or waterlogging has halted physical works.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-6 flex flex-col gap-2">
                <div className="font-mono text-xs font-semibold text-secondary">Rule 03</div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  Clear Authority Attribution
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Projects explicitly list the statutory body responsible (PWD, Municipal Council, Water Resources Dept). BETTER MAYANG IMPHAL never claims credit for statutory state department works.
                </p>
              </div>

              <div className="rounded-none border border-border/80 bg-card p-6 flex flex-col gap-2">
                <div className="font-mono text-xs font-semibold text-nordic-amber">Rule 04</div>
                <h4 className="font-heading text-base font-bold text-foreground">
                  Clear &ldquo;Proposed&rdquo; Distinction
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Constituency initiatives under exploratory study (such as Mayang Imphal Future Labs) are labeled <span className="font-medium text-foreground">&ldquo;Proposed Initiative · In Assessment&rdquo;</span> to prevent confusing community concepts with sanctioned works.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Citizen Field Reporting CTA */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-none border border-secondary/30 bg-secondary/10 text-secondary">
              <MessageSquarePlus className="size-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Have New Information on a Tracked Project?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed">
              If a culvert has been completed, a road surface is degrading, or work has stopped, share your observation with us to update our evidence log.
            </p>
            <PrioritySubmissionDialog>
              <Button size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold px-6 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50">
                Submit a Field Observation
              </Button>
            </PrioritySubmissionDialog>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
