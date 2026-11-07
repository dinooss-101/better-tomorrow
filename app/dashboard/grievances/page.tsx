import type { Metadata } from "next"
import { GrievancesView } from "@/components/dashboard/grievances-view"

export const metadata: Metadata = {
  title: "Ward Grievances & Priority Ledger · Mayang Imphal",
  description:
    "Explore community drainage, road connectivity, and municipal maintenance issues logged across Mayang Imphal Wards 1 to 12.",
}

export default function GrievancesPage() {
  return <GrievancesView />
}
