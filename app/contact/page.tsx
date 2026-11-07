import type { Metadata } from "next"
import { ContactView } from "@/components/contact/contact-view"

export const metadata: Metadata = {
  title: "Constituency Desk & Grievances",
  description:
    "Constituency office hours, direct communication channels, and confidential or anonymous citizen grievance intake for Mayang Imphal.",
}

export default function ContactPage() {
  return <ContactView />
}
