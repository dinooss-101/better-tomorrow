import type { Metadata } from "next"
import { VerificationsView } from "@/components/dashboard/verifications-view"

export const metadata: Metadata = {
  title: "Ground Verifications & Field Audits · Mayang Imphal",
  description:
    "Explore physical field verification evidence, site photography, and line agency dispatch references across Mayang Imphal (AC-23).",
}

export default function VerificationsPage() {
  return <VerificationsView />
}
