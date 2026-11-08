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
          <Badge variant="outline" className="border-chart-1/30 bg-chart-1/10 text-chart-1 gap-1.5">
            <span className="size-1.5 rounded-full bg-chart-1" />
            Normal Schedule
          </Badge>
        )
      case "DELAYED":
        return (
          <Badge variant="outline" className="border-chart-3/30 bg-chart-3/10 text-chart-3 gap-1.5">
            <span className="size-1.5 rounded-full bg-chart-3" />
            Reported Delay
          </Badge>
        )
      case "ON_HOLD":
        return (
          <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive gap-1.5">
            <span className="size-1.5 rounded-full bg-destructive" />
            On Hold
          </Badge>
        )
      case "UNDER_VERIFICATION":
        return (
          <Badge variant="outline" className="border-chart-4/30 bg-chart-4/10 text-chart-4 gap-1.5">
            <span className="size-1.5 rounded-full bg-chart-4" />
            Verification Pending
          </Badge>
        )
      case "DISPUTED":
        return (
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
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
