import React from "react"
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
    <article
      id={project.slug}
      className="flex flex-col justify-between border border-border bg-card p-6 sm:p-8 transition-colors hover:border-secondary/60 scroll-mt-20 gap-5"
    >
      <div className="flex flex-col gap-3.5 pb-5 border-b border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="text-[11px] font-ui font-semibold uppercase tracking-wider text-muted-foreground rounded-none px-2.5 py-1">
            {project.recordType === "OFFICIAL_PROJECT" ? "Official Public Work" : "Proposed Constituency Initiative"}
          </Badge>
          <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
            <Calendar className="size-3" />
            Verified: {project.stageVerificationDate}
          </span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug text-foreground">
          {project.title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-xs font-ui uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-secondary" />
            {project.locality} {project.wardReference ? `(${project.wardReference})` : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="size-3.5 text-secondary" />
            {project.responsibleAuthority.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-2 text-xs sm:text-sm text-foreground/85">
        <p className="font-sans leading-relaxed text-muted-foreground">
          {project.problemStatement}
        </p>

        <ProjectStatusBadge stage={project.currentStage} condition={project.currentCondition} />

        {project.delayExplanation && (
          <div className="border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
            <span className="font-semibold font-ui uppercase tracking-wider">Implementation Note:</span> {project.delayExplanation}
          </div>
        )}

        {showFullDetails && (project.fundingScheme || project.budgetSanctionedLakhs || project.targetCompletionDate) && (
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border/40 pt-3 font-mono">
            {project.fundingScheme && <span>Scheme: {project.fundingScheme}</span>}
            {project.budgetSanctionedLakhs && <span>Sanctioned: ₹{project.budgetSanctionedLakhs}L</span>}
            {project.targetCompletionDate && <span>Target: {project.targetCompletionDate}</span>}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 max-w-[85%] font-ui">
          <FileText className="size-3.5 text-secondary shrink-0" />
          <span className="truncate">Evidence: {primarySource.title}</span>
        </div>
        {primarySource.sourceUrl && (
          <a
            href={primarySource.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-secondary hover:underline shrink-0 font-ui font-semibold uppercase tracking-wider"
          >
            <span>Gazette Ref</span>
            <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </article>
  )
}
