import type { Metadata } from "next"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export const metadata: Metadata = {
  title: "Constituency Overview · Ward Dashboard",
  description:
    "Real-time tracking of Mayang Imphal ward priorities, municipal ground verifications, and community casework.",
}

export default function DashboardPage() {
  return <DashboardOverview />
}
