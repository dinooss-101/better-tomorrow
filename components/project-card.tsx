import React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectRecord } from "@/lib/types/project"
import { ProjectStatusBadge } from "@/components/project-status-badge"
import { Building2, FileText, Calendar, ExternalLink, MapPin } from "lucide-react"

interface ProjectCardProps {
  project: ProjectRecord
  showFullDetails?: boolean
}

export function ProjectCard({ project, showFullDetails = false }: ProjectCardProps) {
  const primarySource = project.sources.find((s) => s.isPrimaryEvidence) || project.sources[0]

  return (
    <Card
      id={project.slug}
      className="flex flex-col justify-between border-border/80 bg-card/80 transition-shadow hover:shadow-sm scroll-mt-20"
    >
      <CardHeader className="flex flex-col gap-3 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="text-xs font-medium text-muted-foreground">
            {project.recordType === "OFFICIAL_PROJECT" ? "Official Public Work" : "Proposed Constituency Initiative"}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            Verified: {project.stageVerificationDate}
          </span>
        </div>

        <CardTitle className="font-heading text-xl font-semibold leading-snug text-foreground">
          {project.title}
        </CardTitle>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 text-secondary" />
            {project.locality} {project.wardReference ? `(${project.wardReference})` : ""}
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="size-3.5 text-secondary" />
            {project.responsibleAuthority.name}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 text-sm text-foreground/85">
        <p className="leading-relaxed text-muted-foreground">
          {project.problemStatement}
        </p>

        <ProjectStatusBadge stage={project.currentStage} condition={project.currentCondition} />

        {project.delayExplanation && (
          <div className="rounded-none border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-900 dark:text-amber-200">
            <span className="font-semibold">Implementation Note:</span> {project.delayExplanation}
          </div>
        )}

        {showFullDetails && project.statusHistory && project.statusHistory.length > 0 && (
          <div className="flex flex-col gap-2 rounded-none border border-border/60 bg-muted/20 p-2.5 text-xs">
            <span className="font-semibold text-foreground">Status History Trail:</span>
            <div className="flex flex-col gap-1.5 divide-y divide-border/40">
              {project.statusHistory.map((hist, hIdx) => (
                <div key={hIdx} className="pt-1.5 first:pt-0 flex flex-col gap-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-foreground">{hist.stage} ({hist.condition})</span>
                    <span className="text-muted-foreground">{hist.effectiveDate}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{hist.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {primarySource && (
          <div className="flex flex-col gap-1 rounded-none border border-border/60 bg-muted/40 p-2.5 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <FileText className="size-3.5 text-secondary" />
              Primary Source Evidence:
            </span>
            <span className="truncate text-muted-foreground" title={primarySource.title}>
              {primarySource.title} {primarySource.documentNumber ? `(${primarySource.documentNumber})` : ""}
            </span>
            <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
              <span>Published: {primarySource.publicationDate}</span>
              <a
                href={primarySource.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-secondary hover:underline"
              >
                Inspect Official Document <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
        {project.fundingScheme ? (
          <span className="truncate">Scheme: {project.fundingScheme}</span>
        ) : (
          <span>Scheme: Subject to sanction</span>
        )}
        <Link
          href={`/progress#${project.slug}`}
          className="font-medium text-secondary hover:underline active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary min-h-9 flex items-center"
        >
          View Full Tracker
        </Link>
      </CardFooter>
    </Card>
  )
}
