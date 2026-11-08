import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Sign In | Mayang Imphal",
  description:
    "Sign in to access your constituency casework docket and ground audits in Mayang Imphal (AC-23).",
}

export default function LoginPage() {
  return (
    <main className="min-h-svh w-full flex flex-col items-center justify-center bg-muted/20 p-4 sm:p-6 lg:p-8 selection:bg-secondary selection:text-secondary-foreground">
      <LoginForm />
    </main>
  )
}
