import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Citizen Sign In & Ward Desk | Mayang Imphal",
  description:
    "Sign in to track logged civic priorities, view ground audit verification reports, and manage ward casework in Mayang Imphal (AC-23).",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4 sm:p-6 md:p-10 selection:bg-secondary selection:text-secondary-foreground">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </main>
  )
}
