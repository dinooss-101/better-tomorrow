import type { Metadata } from "next"
import { ProfileView } from "@/components/dashboard/profile-view"

export const metadata: Metadata = {
  title: "Citizen Data Vault & DPDP Profile · Mayang Imphal",
  description:
    "Statutory data access, portability export, and right to erasure controls under the Digital Personal Data Protection (DPDP) Act 2023.",
}

export default function ProfilePage() {
  return <ProfileView />
}
