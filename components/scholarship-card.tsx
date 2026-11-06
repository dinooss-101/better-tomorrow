import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
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

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const isClosingSoon = isDeadlineClosingSoon(scholarship.studentDeadline)

  return (
    <Card className="flex flex-col justify-between border-border/80 bg-card/90 transition-shadow hover:shadow-sm">
      <CardHeader className="flex flex-col gap-2.5 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="text-[11px] font-semibold text-secondary">
            AY {scholarship.academicYear}
          </Badge>
          <div className="flex items-center gap-1.5">
            {scholarship.applicationCycle === "RENEWAL" && (
              <Badge variant="secondary" className="text-[11px]">
                Renewal Cycle Only
              </Badge>
            )}
            {scholarship.applicationCycle === "FRESH" && (
              <Badge variant="secondary" className="text-[11px]">
                Fresh Applications Only
              </Badge>
            )}
            {scholarship.applicationCycle === "FRESH_AND_RENEWAL" && (
              <Badge variant="secondary" className="text-[11px]">
                Fresh & Renewal
              </Badge>
            )}
          </div>
        </div>

        <CardTitle className="font-heading text-lg font-semibold leading-snug text-foreground">
          {scholarship.name}
        </CardTitle>

        <CardDescription className="text-xs font-medium text-secondary dark:text-emerald-400">
          Official Sponsor: {scholarship.officialSponsor}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3.5 text-sm">
        <p className="line-clamp-3 leading-relaxed text-muted-foreground">
          {scholarship.eligibilitySummary}
        </p>

        {scholarship.keyExclusions && (
          <p className="text-xs text-muted-foreground/80 italic">
            Note: {scholarship.keyExclusions}
          </p>
        )}

        <div className="flex flex-col gap-1.5 rounded-none border border-border/60 bg-muted/30 p-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="size-3.5 text-secondary" />
              Student Application Deadline:
            </span>
            <span className={`font-mono font-medium ${isClosingSoon ? "text-amber-700 dark:text-amber-400" : "text-foreground"}`}>
              {scholarship.studentDeadline || "Announced by Portal"}
            </span>
          </div>

          {scholarship.institutionVerificationDeadline && (
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Institute Verification:</span>
              <span className="font-mono">{scholarship.institutionVerificationDeadline}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2.5 border-t border-border/60 pt-3">
        <div className="flex w-full items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Verified on NSP: {scholarship.lastVerifiedAt}
          </span>
          <span className="truncate max-w-37.5">{scholarship.targetGroup}</span>
        </div>

        <a
          href={scholarship.officialApplicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-none bg-primary py-2.5 min-h-11 text-xs font-medium text-primary-foreground hover:bg-primary/90"
        >
          Apply via Official Portal <ExternalLink className="size-3.5" />
        </a>
      </CardFooter>
    </Card>
  )
}
