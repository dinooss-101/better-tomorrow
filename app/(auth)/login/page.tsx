import type { Metadata } from "next"
import { LoginView } from "@/components/auth/login-view"

export const metadata: Metadata = {
  title: "Citizen Sign In · Ward Desk Access",
  description:
    "Sign in to the Mayang Imphal Civic Platform to track personal ward priorities, ground verification reports, and scholarship applications.",
}

export default function LoginPage() {
  return <LoginView />
}
