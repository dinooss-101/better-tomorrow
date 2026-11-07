import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Container: Centered max-width boundary with responsive padding            */
/* -------------------------------------------------------------------------- */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide"
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  const maxWidth = {
    narrow: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-5xl",
  }[size]

  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", maxWidth, className)}
      {...props}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Section: Semantic vertical content rhythm with quiet dividers             */
/* -------------------------------------------------------------------------- */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  border?: boolean
  spacing?: "default" | "compact" | "spacious"
  background?: "default" | "muted" | "surface"
}

export function Section({
  className,
  border = true,
  spacing = "default",
  background = "default",
  children,
  ...props
}: SectionProps) {
  const spacingStyles = {
    compact: "py-10 sm:py-14",
    default: "py-16 sm:py-24 lg:py-28 in-data-[density=compact]:py-10 in-data-[density=compact]:sm:py-14",
    spacious: "py-20 sm:py-28 lg:py-36 in-data-[density=compact]:py-12 in-data-[density=compact]:sm:py-16",
  }[spacing]

  const bgStyles = {
    default: "bg-background text-foreground",
    muted: "bg-muted/30 text-foreground",
    surface: "bg-card text-foreground",
  }[background]

  return (
    <section
      className={cn(
        spacingStyles,
        bgStyles,
        border && "border-b border-border",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* SectionHeading: Standardized Quiet Imphal section hierarchy               */
/* -------------------------------------------------------------------------- */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  lead?: string
  align?: "left" | "center"
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wider text-primary dark:text-emerald-400">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight uppercase">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-muted-foreground font-normal">
          {lead}
        </p>
      )}
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* TextLink: Accessible text link with transition arrow                      */
/* -------------------------------------------------------------------------- */
export interface TextLinkProps extends React.ComponentProps<typeof Link> {
  external?: boolean
}

export function TextLink({
  className,
  children,
  external,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-1.5 font-ui text-xs font-semibold uppercase tracking-wider text-primary dark:text-emerald-400 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-secondary",
        className
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/* StatusLabel: Restrained, non-pill factual status badge                    */
/* -------------------------------------------------------------------------- */
export interface StatusLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "active" | "success" | "warning"
}

export function StatusLabel({
  className,
  variant = "neutral",
  children,
  ...props
}: StatusLabelProps) {
  const variantStyles = {
    neutral: "border-border bg-muted/40 text-muted-foreground",
    active: "border-secondary/40 bg-secondary/10 text-secondary",
    success: "border-emerald-600/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    warning: "border-amber-600/30 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  }[variant]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none border px-2 py-0.5 font-ui text-[11px] font-semibold uppercase tracking-wider",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* EditorialSplit: Two-column asymmetrical editorial layout                  */
/* -------------------------------------------------------------------------- */
export interface EditorialSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean
}

export function EditorialSplit({
  className,
  reverse = false,
  children,
  ...props
}: EditorialSplitProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:grid-cols-12 lg:gap-14",
        reverse && "lg:[&>*:first-child]:order-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

