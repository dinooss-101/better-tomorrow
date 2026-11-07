import React from "react"
import { Badge } from "@/components/ui/badge"
import { ProjectStage, OperationalCondition } from "@/lib/types/project"

interface ProjectStatusBadgeProps {
  stage: ProjectStage
  condition: OperationalCondition
  className?: string
}

export function ProjectStatusBadge({ stage, condition, className }: ProjectStatusBadgeProps) {
  const getStageLabel = (s: ProjectStage) => {
    switch (s) {
      case "PROPOSED":
        return "Proposed Initiative"
      case "UNDER_REVIEW":
        return "Under Review"
      case "ADMINISTRATIVE_APPROVAL":
        return "Administrative Approval Accorded"
      case "FINANCIAL_SANCTION":
        return "Financial Sanction Granted"
      case "TENDERING":
        return "Tendering / RFP in Progress"
      case "IMPLEMENTATION":
        return "Works in Progress"
      case "COMPLETED":
        return "Verified Completed"
      case "CANCELLED":
        return "Shelved / Cancelled"
      default:
        return s
    }
  }

  const getConditionBadge = (c: OperationalCondition) => {
    switch (c) {
      case "NORMAL":
        return (
          <Badge variant="outline" className="border-emerald-600/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            Normal Schedule
          </Badge>
        )
      case "DELAYED":
        return (
          <Badge variant="outline" className="border-amber-600/30 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 gap-1.5">
            <span className="size-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
            Reported Delay
          </Badge>
        )
      case "ON_HOLD":
        return (
          <Badge variant="outline" className="border-rose-600/30 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 gap-1.5">
            <span className="size-1.5 rounded-full bg-rose-600 dark:bg-rose-400" />
            On Hold
          </Badge>
        )
      case "UNDER_VERIFICATION":
        return (
          <Badge variant="outline" className="border-blue-600/30 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 gap-1.5">
            <span className="size-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Verification Pending
          </Badge>
        )
      case "DISPUTED":
        return (
          <Badge variant="outline" className="border-purple-600/30 bg-purple-50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 gap-1.5">
            <span className="size-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
            Scope Disputed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className || ""}`}>
      <Badge variant="outline" className="font-medium text-foreground bg-muted/40 border-border">
        Stage: {getStageLabel(stage)}
      </Badge>
      {getConditionBadge(condition)}
    </div>
  )
}
