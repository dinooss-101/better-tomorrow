import type { Metadata } from "next"
import { DevelopmentView } from "@/components/development/development-view"

export const metadata: Metadata = {
  title: "AMRUT 2.0 GIS Master Plan 2045",
  description:
    "Statutory town planning, hydrological contour surveys, and infrastructure demarcations for Mayang Imphal (AC-23), Manipur.",
}

export default function DevelopmentPage() {
  return <DevelopmentView />
}
