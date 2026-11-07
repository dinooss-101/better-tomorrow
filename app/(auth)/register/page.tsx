import type { Metadata } from "next"
import { RegisterView } from "@/components/auth/register-view"

export const metadata: Metadata = {
  title: "Register Citizen Profile · Ward Tracking",
  description:
    "Register for a citizen profile on the Mayang Imphal Civic Platform to track personal ward priorities, municipal audits, and scholarship updates.",
}

export default function RegisterPage() {
  return <RegisterView />
}
