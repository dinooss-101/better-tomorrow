import type { Metadata } from "next"
import { AboutView } from "@/components/about/about-view"

export const metadata: Metadata = {
  title: "Statutory Disclosures & Governance",
  description:
    "Platform identity, operator disclosures, statutory boundaries, DPDP privacy policy, and public compliance standards for Mayang Imphal.",
}

export default function AboutPage() {
  return <AboutView />
}
