import type { Metadata } from "next"
import { RegisterForm } from "@/components/register-form"

export const metadata: Metadata = {
  title: "Register Profile | Mayang Imphal",
  description:
    "Register a citizen profile to track personal ward priorities, municipal audits, and receive civic updates in Mayang Imphal (AC-23).",
}

export default function RegisterPage() {
  return (
    <main className="min-h-svh w-full flex flex-col items-center justify-center bg-muted/20 p-3 sm:p-5 md:p-6 selection:bg-secondary selection:text-secondary-foreground">
      <RegisterForm />
    </main>
  )
}

