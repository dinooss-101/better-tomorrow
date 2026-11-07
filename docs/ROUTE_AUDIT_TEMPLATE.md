# Page-by-Page Route Audit & Baseline Inventory

**Repository:** Mayang Imphal (`C:\m-i\bmi`)  
**Audit Date:** 2026-11-06  
**Toolchain:** Next.js 16.4.2 (Turbopack, App Router), React 19, Tailwind CSS v4, shadcn/ui, pnpm 9+  
**Status:** Gate 3 Production Refactor Completed (All Routes Verified)

---

## Route Inventory Matrix

| Path | Existing Purpose | Interactive Features | Data/API Dependencies | Refactored Layout | Architecture | Test Coverage | Status |
|---|---|---|---|---|---|---|---|
| `/` | Civic front door & mandate | Theme toggle, smooth nav, intake desk | Static imports, local state | 5-section Quiet Imphal editorial structure | Thin server route + decomposed components | Build, Lint, Typecheck, Test | Verified |
| `/development` | Master Plan 2045, drainage & civic works | Stage filtering, accordions, jurisdiction table | Static project models (`initiatives.ts`) | Warm editorial hero, responsive table | Thin server route + `development-view.tsx` | Build, Lint, Typecheck, Test | Verified |
| `/future-labs` | STEM innovation labs & Atal Tinkering Labs | Tab switching, interest registration dialog | Static tracks (`initiatives.ts`) | Editorial track containers, tabbed switching | Thin server route + `future-labs-view.tsx` | Build, Lint, Typecheck, Test | Verified |
| `/progress` | Decoupled civic progress tracker | Category/stage dropdown filters, search query, share URL copy | Mock projects (`lib/data/projects.ts`) | Calm editorial hero, de-carded project ledger | Thin server route + `progress-view.tsx` | Build, Lint, Typecheck, Test | Verified |
| `/scholarships` | Central/State scholarship directory | Level & cycle dropdown filters, live search, application modal | Mock scholarships (`lib/data/scholarships.ts`) | Calm editorial hero, de-carded scholarship cards | Thin server route + `scholarships-view.tsx` | Build, Lint, Typecheck, Test | Verified |
| `/about` | Statutory compliance, operator disclosures, DPDP privacy | Sticky sub-nav anchor scrolling | Static legal/disclosure copy | 65ch reading column, hairline dividers | Server component with sticky anchor nav | Build, Lint, Typecheck, Test | Verified |
| `/contact` | Grievance intake & constituency desk | Category/ward selection, confidential/anonymous toggle | Local state form handler | Warm editorial hero, accessible intake form | Thin server route + `contact-view.tsx` | Build, Lint, Typecheck, Test | Verified |

---

## Detailed Route Breakdowns

### 1. `/` (Home)
- **URL & Route File:** `/`, `app/page.tsx`, layout chain: `app/layout.tsx` -> `components/site-header.tsx` -> `components/footer-2.tsx`.
- **User Job-to-be-Done:** Discover the civic mandate, leadership commitments, core pillars, public ledger, and access key initiative portals.
- **Existing Sections:**
  1. Politician Hero (`HeroSection`)
  2. The Mandate & Statement (`PoliticianStatement`)
  3. Photojournalism Field Journal (`PoliticianGallery`)
  4. Three Flagship Pillars (`PoliticianPillars`)
  5. Decoupled Accountability Ledger (`PoliticianLedger`)
  6. Documented Ward Voices (`PoliticianVoices`)
  7. FAQs (`FAQs`)
  8. Direct Citizen Priority Intake (`PoliticianIntake`)
- **Key Components:** `SiteHeader`, `HeroSection`, `Politician*`, `FAQs`, `Footer`.
- **Branding Status:** Header and Footer migrated to "Mayang Imphal". Page title updated to "Mayang Imphal · Civic Leadership Platform (2027)".
- **Lagom Refactor Plan:** Consolidate redundant cards, streamline reading line length to 65ch, preserve all 8 functional blocks while simplifying visual framing.

### 2. `/development` (Civic & Master Plan)
- **URL & Route File:** `/development`, `app/development/page.tsx`.
- **User Job-to-be-Done:** Understand urban planning, drainage master plan, statutory demarcation of powers, and civic project status.
- **Diagnostic Inspection:** Line 387 `min-w-160` (formerly `min-w-[640px]`) wrapped inside `overflow-x-auto` container for the 4-column jurisdiction table. Confirmed responsive on mobile via internal horizontal scroll wrapper without breaking page layout.
- **Current Issues:** High line count (514 lines), multiple nested card grids.
- **Lagom Refactor Plan:** Streamline card containers into clean editorial sections, preserve jurisdiction table and milestone timelines.

### 3. `/future-labs` (STEM Labs)
- **URL & Route File:** `/future-labs`, `app/future-labs/page.tsx`.
- **User Job-to-be-Done:** Review curriculum, equipment, school coverage, and register interest for youth innovation centres.
- **Key Components:** `Tabs`, `Accordion`, `RegisterInterestDialog`.
- **Current Issues:** 349 lines, multi-level card encapsulation.
- **Lagom Refactor Plan:** Present tracks in a calm vertical narrative with tabbed switching.

### 4. `/progress` (Accountability Tracker)
- **URL & Route File:** `/progress`, `app/progress/page.tsx`.
- **User Job-to-be-Done:** Search and filter active constituency projects across stages (sanctioned, in-progress, delivered) with ground verification logs.
- **Key Components:** `ProjectCard`, `DropdownMenu`, `PrioritySubmissionDialog`.
- **Current Issues:** 380 lines, excessive card wrappers.
- **Lagom Refactor Plan:** Refactor to clean list/index presentation while keeping search, filtering, and priority submission modal.

### 5. `/scholarships` (Scholarship Directory)
- **URL & Route File:** `/scholarships`, `app/scholarships/page.tsx`.
- **User Job-to-be-Done:** Search central and state scholarships, check eligibility criteria, and link to official application portals (NSP, etc.).
- **Key Components:** `ScholarshipCard`, `DropdownMenu`, `RegisterInterestDialog`.
- **Current Issues:** 427 lines, dense repetition of card borders.
- **Lagom Refactor Plan:** Use clean horizontal data rows with progressive disclosure for criteria.

### 6. `/about` (Statutory & Compliance)
- **URL & Route File:** `/about`, `app/about/page.tsx`.
- **User Job-to-be-Done:** Review legal boundaries, operator disclosures, DPDP compliance, and RTI/statutory records.
- **Key Components:** Sticky sub-nav anchor links, statutory badge indicators.
- **Current Issues:** 272 lines, dense paragraphs.
- **Lagom Refactor Plan:** Enforce 65ch editorial typography with generous vertical rhythm and clean section dividers.

### 7. `/contact` (Constituency Desk)
- **URL & Route File:** `/contact`, `app/contact/page.tsx`.
- **User Job-to-be-Done:** Submit grievances (confidential or anonymous) and check constituency office open hours and locations.
- **Key Components:** Grievance intake form, mode toggle (`confidential` vs `anonymous`).
- **Lagom Refactor Plan:** Keep form inputs fully accessible, clean borders, prominent hours and location details.

---

## Aggregate Post-Refactor Metrics

- **Total Inspected Files:** 86
- **Public Routes:** 7 (`/`, `/about`, `/contact`, `/development`, `/future-labs`, `/progress`, `/scholarships`)
- **Route Mode:** All 10 routes compile as static prerendered HTML (`○ Static`).
- **Client Boundaries (`"use client"`):** 16 (clean server/client split with SSR metadata on all routes)
- **Large Page Files (>300 lines):** 0 (eliminated from 5 files previously)
- **Card Primitives Mentioned:** 12 (reduced by >90% from 123)
- **Long JSX Paragraphs (>250 chars):** 13 (paced with editorial rhythm)
- **Brand Status:**
  - Header logo: `Mayang Imphal` (migrated)
  - Footer mark: `Mayang Imphal` (migrated)
  - Page titles: `%s | Mayang Imphal` (migrated)
  - Content references: Zero "BMI" or "BETTER MAYANG IMPHAL" in application source files
  - Internal keys/data: Preserved for contract stability
- **Verification Status:**
  - `pnpm typecheck`: PASS (0 errors)
  - `pnpm lint`: PASS (0 errors, 0 warnings)
  - `pnpm test`: PASS (5/5 tests passed)
  - `pnpm build`: PASS (Turbopack production build, 10 static pages)
