---
name: Mayang Imphal
description: Nordic Lagom Minimalist civic platform for transparent planning, youth STEM, and verified progress
colors:
  primary: "#294f46"
  primary-foreground: "#ffffff"
  secondary: "#294f46"
  secondary-foreground: "#ffffff"
  background: "#f7f6f2"
  foreground: "#232b29"
  card: "#ffffff"
  card-foreground: "#232b29"
  popover: "#ffffff"
  popover-foreground: "#232b29"
  muted: "#e7ebe5"
  muted-foreground: "#47544f"
  accent: "#e7ebe5"
  accent-foreground: "#232b29"
  border: "#d7ddd7"
  input: "#d7ddd7"
  ring: "#294f46"
  destructive: "#a4352b"
  nordic-stone: "#f7f6f2"
  nordic-paper: "#ffffff"
  nordic-charcoal: "#232b29"
  nordic-fjord: "#294f46"
  nordic-pine: "#294f46"
  nordic-amber: "#b38c6d"
  nordic-sand: "#e7ebe5"
  logo-navy: "#170852"
  logo-red: "#fa2816"
typography:
  display:
    fontFamily: "var(--font-display), Oswald, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-headline), Oswald, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "var(--font-headline), Oswald, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0em"
  ui:
    fontFamily: "var(--font-ui), Montserrat, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.05em"
  label:
    fontFamily: "var(--font-ui), Montserrat, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
  caption:
    fontFamily: "var(--font-body), Public Sans, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "var(--font-body), Public Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "var(--font-mono), Geist Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  badge:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Mayang Imphal

## Overview

**Creative North Star: "The Civic Ledger"**

Mayang Imphal employs a **Nordic Lagom Minimalist** aesthetic rooted in architectural restraint, civic gravitas, and honest communication. Lagom—"not too little, not too much, just enough"—rejects empty tech decoration, artificial urgency, and AI visual clichés in favor of calm, high-contrast, editorial clarity.

Every layout is built on a rectilinear grid with zero rounded corners (`rounded-none`), evoking statutory municipal charters, town planning maps, and physical civic monuments. The interface recedes to let verified public records, scholarship deadlines, and spatial planning layers lead.

**Key Characteristics:**
- **Rectilinear Geometry:** Strict `rounded: 0px` across all buttons, cards, containers, and badges.
- **Nordic Pine & Stone Palette:** Warm limestone parchment, deep forest pine accents, and quiet dividing lines.
- **Dual-Status Clarity:** Clear visual separation between official state tenders and community proposals.
- **Architectural Typography:** Oswald for authoritative headlines, Montserrat for uppercase navigation, Public Sans for body text.

## Colors

The palette balances warm limestone surfaces with deep forest pine ink and burnished amber status alerts.

### Primary
- **Nordic Pine** (`#294f46` / `--primary`): Evergreen accent representing public stewardship, civic longevity, and primary action commitments.

### Secondary
- **Nordic Pine Subdued** (`#294f46` / `--secondary`): Secondary action anchor and high-visibility status indicators.

### Neutral
- **Nordic Stone** (`#f7f6f2` / `--background`): Light, warm limestone surface that eliminates screen glare and evokes natural archival paper.
- **Nordic Charcoal** (`#232b29` / `--foreground`): High-contrast mineral ink for effortless long-form reading.
- **Nordic Paper** (`#ffffff` / `--card`): Crisp white card beds anchored cleanly over the stone background plane.
- **Stone Border** (`#d7ddd7` / `--border`): Subtle architectural grid lines providing structure without visual noise.
- **Nordic Amber** (`#b38c6d` / `--nordic-amber`): Burnished earth gold for closing deadlines, statutory alerts, and review tags.

### Named Rules
**The Rarity of Pine Rule.** Primary pine fills are reserved for primary action commitments, key progress badges, and navigation focal points. At least 85% of the viewport remains neutral stone and crisp white.
**The No-Faux-Heritage Rule.** Never use simulated parchment stains, skeuomorphic crests, or artificial antique gradients. Dignity comes from geometric precision and honest data.

## Typography

**Display Font:** Oswald (with sans-serif)  
**Body Font:** Public Sans (with system-ui, sans-serif)  
**UI & Label Font:** Montserrat (with sans-serif)  
**Data & Mono Font:** Geist Mono (with monospace)

Character: Bold civic gravitas rooted in Nordic Lagom minimalism—Oswald provides tall, authoritative, architectural titles; Montserrat brings crisp uppercase tracking to navigation and labels; Public Sans ensures neutral legibility for long text; and Geist Mono formats coordinates and tender references.

### Hierarchy
- **Display** (Bold 700, 48px–56px / 3rem–3.5rem, 1.15 line-height, -0.02em tracking): Hero headlines and major portal banners.
- **Headline** (Bold 700, 32px–40px / 2rem–2.5rem, 1.2 line-height, -0.01em tracking): Page titles and primary section headers.
- **Title** (Semi-bold 600, 20px–24px / 1.25rem–1.5rem, 1.3 line-height): Subsections, modal titles, and card headers.
- **Body** (Regular 400, 14px–16px / 0.875rem–1rem, 1.6 line-height, max-w-3xl line length): Long-form explanatory reading and administrative descriptions.
- **Label / UI** (Semi-bold 600 / Medium 500, 11px–13px / 0.6875rem–0.8125rem, uppercase with 0.05em tracking): Navigation bars, status tags, form labels, and table headers.
- **Mono / Data** (Medium 500, 12px–14px / 0.75rem–0.875rem): GPS coordinates, GIS layer tags, tender IDs, and DPDP cryptographic hashes.

### Named Rules
**The 11px Floor Rule.** Functional text and labels never fall below 11px. Micro-text smaller than 11px is prohibited to ensure full WCAG 2.2 accessibility.
**The Dual-Font Nav Rule.** Navigation items pair Montserrat uppercase labels (`tracking-wider`) with Public Sans descriptive subtitles.

## Layout

- **Container Scale:** Wide dashboards and maps scale up to `max-w-7xl` (1280px); editorial narratives and form surfaces are constrained to `max-w-4xl` or `max-w-5xl`.
- **Rhythm & Spacing:** Generous whitespace between major sections (`py-12` to `py-16` comfortable, compacted automatically via `in-data-[density=compact]:py-8`).
- **12-Column Grid:** Asymmetric split layouts (e.g., 5-col sticky context + 7-col data stream) mirror statutory planning ledgers.
- **Zero Horizontal Overflow:** Mobile-first layout verified across 320px, 375px, 768px, 1024px, and 1440px viewports.

## Elevation & Depth

- **Tonal Layering over Shadows:** Elevation is achieved through contrasting background planes (Nordic Stone -> Card White -> Deep Navy) rather than fuzzy drop shadows.
- **Borders as Structure:** 1px stone borders (`border-border`) anchor interactive elements and cards to the grid.
- **Zero Floating Glows:** No chromatic radial halos or neon blur effects. All depth is structural and physically plausible.

## Shapes

- **Rectilinear Geometry:** Strictly `rounded-none` (`0px` border-radius) across buttons, input fields, badges, and cards.
- **Architectural Edge:** Straight lines convey stability, civic permanence, and transparency.

## Components

### Buttons
- **Shape:** Strictly rectilinear (`rounded-none`, 0px radius).
- **Primary:** Nordic Pine fill (`bg-primary`), crisp white typography (`text-primary-foreground`), 44px minimum touch target height.
- **Secondary / Outline:** Transparent background, 1px stone border (`border-border`), subtle hover fill.
- **Focus:** 2px solid ring with high-contrast offset for keyboard navigation.

### Cards / Containers
- **Corner Style:** Strictly rectilinear (`rounded-none`).
- **Background:** Solid white (`bg-card`) in light mode; deep night fjord (`bg-card`) in dark mode.
- **Border:** 1px stone border (`border-border`).
- **Internal Padding:** 24px (`p-6`) for standard cards; 16px (`p-4`) on mobile.

### Status Badges
- **Two-State Decoupling:**
  - *Proposed Initiative:* Amber tint (`bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30`).
  - *Officially Sanctioned:* Pine tint (`bg-primary/10 text-primary dark:text-emerald-400 border-primary/30`).
- **Typography:** Montserrat uppercase (`text-[11px] font-semibold tracking-wider`).

### Inputs / Fields
- **Style:** 1px stone border (`border-border`), neutral background, rectilinear edges.
- **Focus:** 1px ring in secondary pine (`focus:ring-secondary focus:outline-none`).
- **Touch Target:** Minimum 44px height (`min-h-11`).

## Do's and Don'ts

### Do:
- **Do** ground every civic claim with a verifiable tender reference, department notice, or official citation.
- **Do** maintain strict dual-status decoupling between community proposals and sanctioned public works.
- **Do** enforce minimum 44×44px interactive touch targets and visible focus indicators.
- **Do** keep functional UI text at or above the 11px accessibility floor.
- **Do** keep interactive button and card edges rectilinear (`rounded-none`).

### Don't:
- **Don't** use purple-to-cyan gradients, dark glowing halos, or floating spotlights.
- **Don't** nest cards within cards (avoid container-in-container visual bloat).
- **Don't** use bouncy or rubber-band animations; use subtle ease-out deceleration.
- **Don't** reduce functional UI text below 11px.
- **Don't** hide important statutory disclaimers in tiny unreadable smallprint.
