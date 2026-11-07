import React from "react"
import { cn } from "@/lib/utils"

interface TextLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

/**
 * TextLogo reproduces the exact visual lockup of the civic leadership identity:
 * Line 1: "DR. KHUMUJAM" in navy (Montserrat 900)
 * Line 2: "RATANKUMAR" in navy (Montserrat 900)
 * Line 3: "SINGH" in vermilion red (Montserrat 900) +
 *         "/" vector slash in navy +
 *         stacked "FOR" / "THE PEOPLE" in italic vermilion red (Montserrat 900 Italic)
 *
 * Fully reactive to light/dark mode via var(--logo-navy) and var(--logo-red).
 */
export function TextLogo({ className, size = "md" }: TextLogoProps) {
  const sizeClasses = {
    sm: "text-[7px] sm:text-[7.5px]",
    md: "text-[8.5px] sm:text-[9px] lg:text-[9.5px]",
    lg: "text-[12px] sm:text-[15px] lg:text-[17px]",
  }[size]

  return (
    <span
      role="img"
      aria-label="Dr. Khumujam Ratankumar Singh / For The People"
      className={cn(
        "inline-flex flex-col select-none font-ui leading-none tracking-tight",
        sizeClasses,
        className
      )}
    >
      {/* Line 1: DR. KHUMUJAM */}
      <span
        className="font-black uppercase tracking-[-0.03em] text-[0.96em] leading-none"
        style={{ color: "var(--logo-navy)" }}
        aria-hidden="true"
      >
        Dr. Khumujam
      </span>

      {/* Line 2: RATANKUMAR */}
      <span
        className="font-black uppercase tracking-[-0.03em] text-[1.12em] leading-none mt-[-0.03em]"
        style={{ color: "var(--logo-navy)" }}
        aria-hidden="true"
      >
        Ratankumar
      </span>

      {/* Line 3: SINGH / FOR THE PEOPLE */}
      <span
        className="flex items-center gap-[0.18em] mt-[-0.02em] leading-none"
        aria-hidden="true"
      >
        {/* SINGH */}
        <span
          className="font-black uppercase tracking-[-0.04em] text-[1.72em] leading-[0.85]"
          style={{ color: "var(--logo-red)" }}
        >
          Singh
        </span>

        {/* Thick Geometric Vector Slash (exact 15° forward slant matching reference) */}
        <svg
          viewBox="0 0 16 48"
          fill="currentColor"
          className="h-[1.46em] w-[0.42em] shrink-0 self-center"
          style={{ color: "var(--logo-navy)" }}
          aria-hidden="true"
        >
          <polygon points="12.5,2 16,2 3.5,46 0,46" />
        </svg>

        {/* Stacked "FOR" / "THE PEOPLE" in bold italic red */}
        <span
          className="flex flex-col font-black italic uppercase text-[0.52em] leading-[0.86] shrink-0"
          style={{ color: "var(--logo-red)" }}
        >
          <span className="tracking-[0.04em]">For</span>
          <span className="whitespace-nowrap tracking-[-0.03em]">The People</span>
        </span>
      </span>
    </span>
  )
}
