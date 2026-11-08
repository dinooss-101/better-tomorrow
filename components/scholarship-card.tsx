import { Badge } from "@/components/ui/badge"
import { ScholarshipScheme } from "@/lib/types/scholarship"
import { Calendar, ExternalLink, ShieldCheck } from "lucide-react"

interface ScholarshipCardProps {
  scholarship: ScholarshipScheme
}

// Captured once at module load - stable across re-renders (7-day window, staleness is irrelevant)
const NOW = Date.now()

function isDeadlineClosingSoon(deadline: string | undefined): boolean {
  if (!deadline) return false
  const diff = new Date(deadline).getTime() - NOW
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000
}

function isDeadlinePassed(deadline: string | undefined): boolean {
  if (!deadline) return false
  return new Date(deadline).getTime() < NOW
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const isClosingSoon = isDeadlineClosingSoon(scholarship.studentDeadline)
  const isPassed = isDeadlinePassed(scholarship.studentDeadline)

  return (
    <article className="group flex flex-col justify-between h-full border border-border bg-card p-6 sm:p-8 transition-all duration-200 hover:border-primary/50 hover:shadow-2xs gap-6">
      <div className="flex flex-col gap-3 pb-4 border-b border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="rounded-none text-[11px] font-ui font-semibold uppercase tracking-wider text-primary px-2.5 py-1">
            AY {scholarship.academicYear}
          </Badge>
          <div className="flex items-center gap-1.5 font-ui">
            {isPassed ? (
              <Badge variant="outline" className="rounded-none text-[10px] font-ui font-semibold uppercase tracking-wider px-2 py-0.5 border-muted-foreground/40 text-muted-foreground">
                Cycle Closed · Past Deadline
              </Badge>
            ) : isClosingSoon ? (
              <Badge className="rounded-none text-[10px] font-ui font-semibold uppercase tracking-wider px-2 py-0.5 bg-chart-3/15 text-chart-3 border border-chart-3/40">
                Closing Soon
              </Badge>
            ) : (
              <Badge variant="secondary" className="rounded-none text-[10px] font-ui font-semibold uppercase tracking-wider px-2 py-0.5">
                Active Cycle
              </Badge>
            )}
            {scholarship.applicationCycle === "RENEWAL" && (
              <Badge variant="outline" className="rounded-none text-[10px] font-ui font-semibold uppercase tracking-wider px-1.5 py-0.5">
                Renewal Only
              </Badge>
            )}
          </div>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug text-foreground">
          {scholarship.name}
        </h3>

        <p className="text-xs font-ui font-semibold uppercase tracking-wider text-primary">
          Official Sponsor: {scholarship.officialSponsor}
        </p>
      </div>

      <div className="flex flex-col gap-4 text-sm flex-1">
        <p className="font-sans leading-relaxed text-muted-foreground text-xs sm:text-sm">
          {scholarship.eligibilitySummary}
        </p>

        {scholarship.keyExclusions && (
          <p className="text-xs text-muted-foreground italic font-sans">
            Note: {scholarship.keyExclusions}
          </p>
        )}

        <div className="flex flex-col gap-2 rounded-none border border-border/60 bg-muted/30 p-3 sm:p-3.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground font-ui uppercase tracking-wider text-[11px]">
              <Calendar className="size-3.5 text-primary" />
              Student Deadline:
            </span>
            <span className={`font-mono font-medium ${isClosingSoon ? "text-chart-3" : isPassed ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {scholarship.studentDeadline || "Announced by Portal"}
            </span>
          </div>

          {scholarship.institutionVerificationDeadline && (
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-ui uppercase tracking-wider text-[11px]">Institute Verification:</span>
              <span className="font-mono">{scholarship.institutionVerificationDeadline}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border/60 pt-4 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-muted-foreground font-ui">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="size-3.5 text-primary shrink-0" />
            Verified on NSP: {scholarship.lastVerifiedAt}
          </span>
          <span className="sm:text-right uppercase tracking-wider font-medium text-foreground/80 sm:text-muted-foreground">{scholarship.targetGroup}</span>
        </div>

        <a
          href={scholarship.officialApplicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-primary py-3 min-h-11 text-xs font-ui font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span>{isPassed ? "Inspect NSP Guidelines" : "Apply on Portal"}</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </article>
  )
}
