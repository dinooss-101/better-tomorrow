import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata: Metadata = {
  title: "Ward Dashboard · Civic Portal",
  description:
    "Mayang Imphal civic leadership dashboard for tracking ward priorities, ground audits, and municipal infrastructure status.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}
