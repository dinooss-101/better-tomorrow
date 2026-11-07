"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer-2"
import { Container, Section } from "@/components/primitives"
import { Button } from "@/components/ui/button"
import { AlertCircle, RotateCcw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log unexpected client error in production/staging monitoring
    console.error("Application error boundary caught:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-secondary selection:text-secondary-foreground">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center">
        <Section border={false} spacing="spacious" className="w-full">
          <Container size="narrow" className="text-center flex flex-col items-center">
            <div className="size-10 border border-amber-600/30 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 flex items-center justify-center mb-4">
              <AlertCircle className="size-5" />
            </div>

            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
              System Notice
            </span>

            <h1 className="font-headline text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-3">
              Unable to Render View
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              An unexpected display issue occurred while presenting this civic view. Your session data remains safe.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={() => reset()}
                className="rounded-none text-xs font-semibold min-h-10 px-4 inline-flex items-center gap-1.5"
              >
                <RotateCcw className="size-3.5" />
                <span>Retry</span>
              </Button>

              <Link
                href="/"
                className="inline-flex items-center justify-center text-xs font-semibold border border-border bg-card px-4 py-2 min-h-10 text-foreground hover:bg-muted/40 transition-colors"
              >
                Overview
              </Link>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

