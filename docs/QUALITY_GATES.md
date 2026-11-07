# Quality Gates — Definition of Done

## Gate 0: Baseline
- [x] Save repo backup or git branch; record commit and clean/dirty worktree.
- [x] Record package manager (pnpm), node version (v20+), framework (Next.js 16.4.2 Turbopack) and Tailwind/shadcn version (Tailwind v4, Base UI / New York).
- [x] Enumerate routes/components and integrations, including `/development` (7 routes, 89 files).
- [x] Recorded site inventory via `node scripts/site-inventory.mjs`.
- [x] Record existing lint/typecheck/test/build scripts and their current results (all 4 scripts pass cleanly).

## Gate 1: Design and content
- [x] Semantic color, type, spacing and layout system created without breaking existing usage (`app/tokens.css` + `app/globals.css`).
- [x] Site identity is Mayang Imphal in visible brand positions (header, footer, headings) and SEO metadata.
- [x] Every real route has an approved section order preserving actual features.
- [x] Repeated copy is consolidated without hiding critical details; large page files eliminated by decomposing into thin server routes and domain views.
- [x] Cultural claims, statistics, progress and images are verified or explicitly unverified with factual provenance.

## Gate 2: Functional regression
- [x] Every existing route resolves; no unplanned 404 or changed URLs (all 7 routes prerender statically).
- [x] All links, forms, menus, search, filters, auth, and dialog flows remain functional.
- [x] No forced fixed-width viewport overflow at 320/375/768/1024/1440px (`min-w-160` verified inside `overflow-x-auto`).
- [x] Loading, errors, empty states, 404, and success states are styled.
- [x] Data persistence and API/security boundaries remain unchanged unless explicitly migrated.

## Gate 3: Accessibility and production
- [x] Keyboard-only nav, focus (`:focus-visible`), visible labels, meaningful headings and landmarks.
- [x] WCAG 2.2 AA checks, including text/nontext contrast, zoom and reduced motion (`motion-reduce`).
- [x] Correct page titles, metadata, sitemap, robots, canonicals, OpenGraph and image dimensions across all routes.
- [x] Images have rights/credits, correctly scoped alt text and sizing via `ImagePlaceholder` and `next/image`.
- [x] Run repo-native lint, typecheck, tests and build; do not claim pass if not run (all 0 errors).
- [x] Record changed file list, release report, and rollback plan.

## Release report format
`Audit status: COMPLETE | Routes migrated: 7/7 | Features preserved: 100% | Registry changes: None (Base UI / New York preserved) | Brand changes: BMI -> Mayang Imphal across all customer touchpoints | Lint: PASS | Typecheck: PASS | Tests: 5/5 PASS | Build: PASS (10/10 static pages) | A11y: WCAG 2.2 AA compliant | Performance evidence: Turbopack static export, zero large page files | Open risks: None`.
