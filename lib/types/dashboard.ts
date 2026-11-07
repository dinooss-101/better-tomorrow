import { WardNumber } from "./auth"

export type GrievanceStatus =
  | "PROPOSED"
  | "UNDER_REVIEW"
  | "FIELD_VERIFIED"
  | "DISPATCHED_TO_MUNICIPALITY"
  | "RESOLVED"

export type GrievancePriority = "ROUTINE" | "URGENT" | "CRITICAL"

export type GrievanceCategory =
  | "WATER_AND_DRAINAGE"
  | "ROAD_CONNECTIVITY"
  | "MUNICIPAL_SERVICES"
  | "EDUCATION_STEM"

export interface GrievanceTicket {
  id: string
  citizenId: string
  citizenName: string
  citizenContact: string
  ward: WardNumber
  locality: string
  title: string
  description: string
  category: GrievanceCategory
  priority: GrievancePriority
  status: GrievanceStatus
  createdAt: string
  updatedAt: string
  assignedCoordinator?: string
  fieldVerificationNotes?: string
  verificationPhotoUrl?: string
  officialDispatchReference?: string
}

export interface WardMetric {
  ward: WardNumber
  totalIssues: number
  verifiedIssues: number
  resolvedIssues: number
  activeGroundAudits: number
}
