# Quality Gates — Definition of Done

## Gate 0: Baseline
- [ ] Save repo backup or git branch; record commit and clean/dirty worktree.
- [ ] Record package manager, node version, framework and Tailwind/shadcn version.
- [ ] Enumerate routes/components and integrations, including `/development`.
- [ ] Capture baseline screenshots or document lack of browser access.
- [ ] Record existing lint/typecheck/test/build scripts and their current results.

## Gate 1: Design and content
- [ ] Semantic color, type, spacing and layout system created without breaking existing usage.
- [ ] Site identity is Mayang Imphal in visible brand positions and SEO metadata.
- [ ] Every real route has an approved section order preserving actual features.
- [ ] Repeated copy is consolidated without hiding critical details.
- [ ] Cultural claims, statistics, progress and images are verified or explicitly unverified.

## Gate 2: Functional regression
- [ ] Every existing route resolves; no unplanned 404 or changed URLs.
- [ ] All links, forms, menus, search, filters, auth, CMS/API flows remain functional.
- [ ] No forced fixed-width viewport overflow at 320/375/768/1024/1440px.
- [ ] Loading, errors, empty states, 404, and success states are designed.
- [ ] Data persistence and API/security boundaries remain unchanged unless explicitly migrated.

## Gate 3: Accessibility and production
- [ ] Keyboard-only nav, focus, visible labels, meaningful headings and landmarks.
- [ ] WCAG 2.2 AA checks, including text/nontext contrast, zoom and reduced motion.
- [ ] Correct page titles, metadata, sitemap, robots, canonicals, OpenGraph and image dimensions.
- [ ] Images have rights/credits, correctly scoped alt text and sizing.
- [ ] Run repo-native lint, typecheck, tests and build; do not claim pass if not run.
- [ ] Record changed file list, screenshots, limitations, rollback plan.

## Release report format
`Audit status | Routes migrated X/Y | Features preserved | Registry changes | Brand changes | Lint | Typecheck | Tests | Build | A11y | Performance evidence | Open risks`.
