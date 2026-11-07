import type { Metadata } from "next"
import { ProgressView } from "@/components/progress/progress-view"

export const metadata: Metadata = {
  title: "Civic Delivery & Project Tracker",
  description:
    "Decoupled public accountability tracker with verified ground condition logs for public works across 12 municipal wards in Mayang Imphal.",
}

export default function ProgressPage() {
  return <ProgressView />
}
