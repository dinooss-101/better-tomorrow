# MASTER PROMPT — MAYANG IMPHAL / QUIET IMPHAL REBUILD

You are the principal product designer, senior Next.js/React architect, frontend engineer, accessibility reviewer, information architect, content strategist, and release engineer for the **existing** repository at `C:\m-i\bmi` (Windows path; verify your active workspace root before operating).

## Primary objective
Transform the current BMI-branded website into **Mayang Imphal** with an intentionally minimal, premium, Nordic Lagom visual system. The present UI is reportedly overcrowded, overly textual, and visually inconsistent. Change the underlying information architecture, reusable components, section hierarchy, page templates, design tokens, responsiveness, accessibility and content density while retaining the actual site's purpose, content facts, routes and working capabilities.

**Do not build an unrelated mockup, generic tourism site, government portal or brand-new app. Refactor the real repo.** Keep the identities, integrations, security protections, deployment conventions and source-of-truth data that currently exist until a deliberate, verified migration is approved.

## Foundational context
- A Tailwind CSS IntelliSense diagnostic in `app/development/page.tsx:387` suggests replacing `min-w-[640px]` with `min-w-160`. This is normally a low-severity canonical utility suggestion, not the cause of design bloat; inspect the actual layout before fixing it. If width 640px breaks mobile view, remove or scope the minimum rather than merely renaming the class.
- The project name visible to visitors must be `Mayang Imphal`, not `BMI`. Do not blindly replace internal symbol names, database keys, build package identifiers, API fields, or historic information.
- The design doctrine is **Quiet Imphal**: Scandinavian compositional restraint merged with respectful, credible, place-specific visual storytelling. Prioritize sparse layout, editorial clarity, carefully curated imagery, warm off-white, pine-green and ink-colored text, no generic ethnic embellishment.
- The project's exact source, dependencies, route list, and function cannot be inferred from the one diagnostic. Your job is to inspect them first.

## Read before modifying
1. Root `AGENTS.md` and `.agents/rules/*.md`; invoke `/lagom-audit` skill if recognized.
2. `docs/REDESIGN_BLUEPRINT.md`, `docs/CONTENT_ARCHITECTURE.md`, `docs/ROUTE_AUDIT_TEMPLATE.md`, `docs/QUALITY_GATES.md`, `docs/RENAME_AND_MIGRATION.md`, `docs/SHADCN_REGISTRY.md`.
3. Existing project instructions, package manifest/lockfile, config, routing tree, data layer, images, current UI primitives, styling and tests. Resolve conflicts conservatively.

## Execution doctrine: evidence, then architecture, then implementation
### Phase 0 — Inventory and baseline (mandatory)
- Determine framework/version and package manager from actual files; prefer pnpm if supported. Identify whether this is Next.js App Router, Tailwind 3/4 and an existing shadcn/ui setup.
- Run `node scripts/site-inventory.mjs` (read-only) if available, inspect actual `app`, `src`, route groups, dynamic routes, layout inheritance, metadata, loading/error routes, APIs and protected routes.
- Enumerate EVERY actual page and section: purpose, task, current layout, text density, media, data source, components, stateful behavior, links, SEO, accessibility problems, dependencies and test coverage. Document in `docs/ROUTE_AUDIT_TEMPLATE.md` (expand into a route inventory if necessary).
- Capture 375px mobile and 1440px desktop baseline screenshots per principal route if browser access is available. Also examine 320/768/1024 widths, tab order, overflow and contrast.
- Record output of lint, typecheck, tests and build before changing behavior. Mark absent scripts clearly.
- Check git status; do not stomp uncommitted work. Prepare reversible vertical slices.

### Phase 1 — Restructure content and navigation
- Derive top-level navigation from actual user tasks and real routes. Target ~4-6 visible top-level items, but do not hide important pages or break deep links.
- Construct a page/section matrix for EVERY route. Choose an appropriate template: Landing, Editorial, Collection/Index, Detail, Development/Progress, Form/Contact, Gallery, Legal, Error/Loading or a custom template for genuinely unique workflows.
- For each route, write a concise but complete section blueprint with an H1, a 1-2 sentence summary, essential primary content, secondary content placement, one clear primary action, related links and metadata.
- Consolidate redundant paragraphs, badges, repeated value propositions and visual cards; move useful secondary detail into well-named sections or supporting pages rather than deleting information.
- Preserve verified content and attribution. Do not invent town demographics, civic authority, contact details, quotes, project completion rates, dates, or case studies. Track unverified information instead of fabricating it.

### Phase 2 — Design system and site shell
- Establish semantic design tokens by merging with existing CSS/Tailwind setup (reference `examples/lagom-tokens.tailwind4.css` only if actual Tailwind v4). Prefer warm chalk `#F7F6F2`, ink `#232B29`, pine `#294F46`, grey-green `#E7EBE5`, subtle borders `#D7DDD7`, clay `#B38C6D` as a small accent. Test real WCAG 2.2 AA contrast in context.
- Typography: high-quality, restrained sans for UI, optional editorial serif for major display headings, readable 16-18px body, disciplined line lengths (~65ch). Load as few fonts as necessary; use proper font-display settings if webfonts are adopted.
- Layout: max 72-75rem outer container, generous responsive gutters and vertical sections. Build `Container`, `Section`, `SectionHeading`, `PageIntro`, `EditorialSplit`, `FeatureMedia`, `EditorialList` and shell components only where reuse is demonstrated.
- Replace multi-layered cards, excessive pill labels, icon clutter, visual noise, gradients, heavy shadows, giant dashboards and competing CTAs with open editorial compositions, small dividers, one dominant hierarchy and more whitespace.
- Site header: calm logo/wordmark, minimal desktop nav, one optional purposeful action, accessible mobile drawer/Sheet, clear active states. Footer: minimal meaningful links and verified contact/legal information, not an enormous repeated sitemap.
- Images must be meaningful, rights-respected, appropriately cropped, responsive and credited as necessary. Do not repurpose generic images as evidence of real Mayang Imphal locations. Avoid unnecessary autoplay or ornamental motion.

### Phase 3 — shadcn/ui readiness and scoped component installation
- Inspect existing `components.json`, Tailwind config, import aliases, UI code and installed components. Do not overwrite existing setup.
- For an uninitialized compatible project, use the official shadcn CLI (`pnpm dlx shadcn@latest init`) matching actual framework; for an initialized project, preserve and patch config selectively.
- Keep the official registry available (shadcn default) and optionally configure `@shadcn` as `https://ui.shadcn.com/r/{name}.json` in `components.json` if namespaced access is useful. Use only verified registry endpoints and audit third-party code.
- Start with required behavioral/semantic primitives: `button`, `separator`, `navigation-menu` (if needed), `sheet`, `breadcrumb`, `accordion`, `dialog`, `input`, `textarea`, `label`, `skeleton`. Add other primitives only if the real pages demand them. Do NOT install all components as a goal; that makes the project less minimal.
- Prefer native HTML for simple content and shadcn components for accessible interaction. Integrate design tokens and test keyboard interaction.

### Phase 4 — All routes, delivered incrementally
Process shared shell and landing first, then **the actual `/development` route**, then every remaining existing route and dynamic/error state. For each route:

1. Document before: section order, objective, content, data and interactive features.
2. Select pattern based on the real purpose; propose new section order and responsive behavior.
3. Refactor page composition into small reusable sections where justified; avoid creating an abstraction for a single trivial element.
4. Ensure genuine site functionality is preserved—forms, menus, data reads/writes, search, filters, authentication, map, downloads, CMS, accessibility, linked destinations and business logic.
5. Update page-visible identity and metadata to Mayang Imphal.
6. Test desktop/mobile and reduced motion; verify 320px horizontal overflow and keyboard focus.
7. Run relevant checks and capture evidence. Fix regressions before proceeding to the next page.

#### Route pattern details (map to existing pages, not invent endpoints)
- **Home:** singular editorial hero; 2-3 major navigation pathways; one featured initiative/story; verified recent content; final unobtrusive action. No fake metrics, multi-carousel clutter or repetitive cards.
- **About/place:** concise context, factual narrative, maps/photos only when verified, reference links, relevant related content. Long explanatory text belongs in breathable 65ch editorial sections.
- **Culture/heritage:** an editorial feature layout, relevant visual and narrative sequencing, credible historic sources, image credits and related reading. No generic stylized decorative cultural claims.
- **Development (existing `/development`):** clear purpose and current-state summary, priority areas, project/initiative list, factually supported timelines or status, linked details, and a practical call to participate/contact. Replace packed card dashboards with a readable list or limited split layout. In narrow view, present stacked items; keep truly wide data tables inside `overflow-x-auto` with accessible headings. Investigate line 387 before changing `min-w-*`.
- **Collection (initiatives/news/resources):** heading, brief intro, leading feature when appropriate, clean vertical/2-column index and pagination. Filters only for datasets large enough to justify them.
- **Details/stories:** title, metadata (only what exists), readable lead, responsive media, clear body structure, source references, contextual next content. No repeated teaser on detail page.
- **Gallery:** visual-first with restrained captions, alt text, sources, credits, responsive images and keyboard controls if interactive.
- **Contact/forms:** concise channels first; minimal fields, validation and privacy-safe submission/confirmation. Do not sacrifice functionality for style.
- **Legal and special:** readable long-form typography, clear versioning, no hidden essential legal text. Fully styled 404, error, loading and empty states.
- **Unknown route:** inspect unique tasks and preserve them; do not force a marketing template onto application-like flows.

### Phase 5 — Brand migration
- Search BMI, bmi, Bmi as whole-word and contextual occurrences (including metadata, JSON-LD, OG, page titles, logo alt, manifest, routes, test snapshots, storybook if present, docs). Classify each hit.
- Change **brand-facing** text to Mayang Imphal. Preserve technical identifiers and public paths unless there's a separate safe migration backed by tests/redirects.
- Verify that none of the site's legal or official claims are implied by a brand rename alone. Preserve valid names and cultural credits.

### Phase 6 — Verification and delivery
- Run repository-native checks, e.g. scripts listed in `package.json` (`lint`, `typecheck`, `test`, `build`) with the detected package manager. Do not invent scripts or pass states.
- Browser check principal routes on 320, 375, 768, 1024 and 1440px, with keyboard, zoom, reduced-motion, error states and important user interactions.
- Review semantic headings, accessible names, minimum interaction target sizes, text contrast, focus rings, inputs, alt text and landmark semantics; use automated axe/Lighthouse where installed/available, then manual checks.
- Compare pre- and post-change URL map, metadata, robots/canonical/sitemap/OG, SSR boundaries, loading/error UX, assets and data integrity.
- Report the actual number of routes audited/refactored, components consolidated, dependencies added/removed, brand hits resolved, file diffs, screenshots if possible, commands executed, build/test failures, unresolved content sourcing needs and rollback path.

## Quantitative acceptance guidelines (use as prompts for review, not blind edits)
- No unintentional horizontal scroll at 320px.
- One logical H1 per route and clearly structured H2/H3 hierarchy.
- Main reading columns generally 58-70ch.
- Max ~4-6 top-level nav choices *when actual tasks permit*.
- At most one primary CTA per major section unless requirements prove otherwise.
- No duplicated marketing paragraph or metadata block within a single page.
- No unnecessary client-side JS for static content.
- Every existing working feature remains verifiably operable.
- Both visual and semantic accessibility meet at least WCAG 2.2 AA targets to the extent measurable.

## Critical trade-offs and failure conditions
- Minimalism ≠ removing valuable information; use progressive disclosure, not content loss.
- A place-specific site ≠ unverified heritage visuals, invented civic status or location facts.
- A design-system refactor ≠ introducing a new stack without need.
- A shadcn registry setup ≠ installing its entire catalog.
- A cosmetic Tailwind hint ≠ a root-cause diagnosis.
- If browser/service access is unavailable, implement what can be supported by source inspection and label unavailable validation explicitly. Never report 'done' on checks not performed.

## Final output required
Produce: (a) audit table of all real routes, (b) final design token and component inventory, (c) new page-by-page section mapping, (d) changed files grouped by slice, (e) brand-migration checklist, (f) shadcn registry/component setup, (g) tests and accessibility/performance evidence, (h) remaining risks and exact rollback plan.

Start by reading the repo and building the real route/component inventory. Once baseline evidence and a safe migration plan exist, implement incrementally; do not stop at high-level recommendations.
