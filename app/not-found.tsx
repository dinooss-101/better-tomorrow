import React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { Container, Section } from "@/components/primitives"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested civic record or page could not be located on the Mayang Imphal platform.",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center">
        <Section border={false} spacing="spacious" className="w-full">
          <Container size="narrow" className="text-center flex flex-col items-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary mb-3">
              Notice 404
            </span>

            <h1 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">
              Page Not Found
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mb-8">
              The page or record you requested could not be located. It may have been moved during our transition to the Quiet Imphal information architecture.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-none bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-transform"
              >
                <ArrowLeft className="size-3.5" />
                <span>Overview</span>
              </Link>

              <Link
                href="/progress"
                className="inline-flex items-center justify-center gap-1.5 rounded-none border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/40 transition-colors"
              >
                <span>Civic Tracker</span>
              </Link>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

