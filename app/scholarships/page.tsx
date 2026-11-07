import type { Metadata } from "next"
import { ScholarshipsView } from "@/components/scholarships/scholarships-view"

export const metadata: Metadata = {
  title: "Verified Scholarship Directory",
  description:
    "Central and State scholarship registry: eligibility rules, application portals, and verified disbursement schedules for Mayang Imphal students.",
}

export default function ScholarshipsPage() {
  return <ScholarshipsView />
}
