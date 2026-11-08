import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Sign In | Mayang Imphal",
  description:
    "Sign in to access your constituency casework docket and ground audits in Mayang Imphal (AC-23).",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-muted/20 py-12 sm:py-16 md:py-24 px-4 sm:px-6 selection:bg-secondary selection:text-secondary-foreground">
      <LoginForm />
    </main>
  )
}
