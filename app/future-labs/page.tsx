import type { Metadata } from "next"
import { FutureLabsView } from "@/components/future-labs/future-labs-view"

export const metadata: Metadata = {
  title: "Mayang Imphal Future Labs & STEM",
  description:
    "Proposed community electronics and computer labs aligned with NITI Aayog Atal Tinkering Labs (ATL) framework in Mayang Imphal.",
}

export default function FutureLabsPage() {
  return <FutureLabsView />
}
