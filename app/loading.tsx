import React from "react"
import { Container, Section } from "@/components/primitives"

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background">
      <Section border={false} spacing="compact" className="w-full">
        <Container size="narrow" className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-muted/60 animate-pulse" />
            <div className="h-8 w-3/4 max-w-md bg-muted animate-pulse" />
            <div className="h-4 w-full max-w-lg bg-muted/50 animate-pulse" />
          </div>

          <div className="pt-8 space-y-4">
            <div className="h-20 w-full border border-border/40 bg-card/60 animate-pulse" />
            <div className="h-20 w-full border border-border/40 bg-card/60 animate-pulse" />
          </div>
        </Container>
      </Section>
    </div>
  )
}

