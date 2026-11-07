# Mayang Imphal — Project Agent Instructions

## Mission
Refactor the existing BMI web application into **Mayang Imphal**: a fast, accessible, calm, locally grounded digital experience using Nordic Lagom principles. This is a redesign of an EXISTING application, not permission to discard or silently replace features, data, routes, integrations, or content.

## Source of truth / uncertainty
1. Inspect `package.json`, lockfile, `app/` (including `app/development/page.tsx`), `src/`, components, styles, assets, routes, data integrations, tests, deployment, `components.json`, and other agent rules before editing.
2. Detect framework, Tailwind version, package manager, shadcn configuration, and all routes; do not assume a template matches the repository. Prefer the existing package manager and lockfile. For this project, prefer `pnpm` unless repo evidence contradicts it.
3. Read `docs/REDESIGN_BLUEPRINT.md` and `docs/QUALITY_GATES.md` before implementation. `docs/ROUTE_AUDIT_TEMPLATE.md` describes the mandatory page-by-page inventory.
4. Unknown facts about the town, community, organizations, programmes, metrics, and contact details remain unverified. Do not invent them for prettier layouts. Preserve sourced factual content.
5. If instructions conflict with existing functional requirements, document the conflict and preserve behavior while proposing an intentional migration.

## Non-negotiable product principles
- **Lagom**: enough, never more. Prioritize one useful idea per section, whitespace, restraint, strong typography, hierarchy, and purposeful imagery.
- **Mayang Imphal identity**: brand name visible as "Mayang Imphal". Local imagery and cultural facts require provenance and respectful presentation. Do not substitute generic faux-heritage decoration.
- **Progressive disclosure**: short summaries lead to deeper routes; do not delete essential information simply to reduce word count.
- **Responsive**: mobile-first at 320/375/768/1024/1440px; no accidental horizontal page scroll.
- **Accessible**: target WCAG 2.2 AA; semantic headings, keyboard operability, visible focus, reduced motion, appropriate contrast, meaningful alt text.
- **Performant**: server rendering and accessible native elements by default; client components only where behavior requires them; avoid unnecessary dependencies and JS animation.
- **Stable**: preserve external URLs, internal routes, semantics, forms, data services, auth/security and SEO unless a migration is explicit and tested.

## Engineering standards
- TypeScript strictness is not to be weakened. No `any`, disabled ESLint rules, broad `@ts-ignore`, or unreviewed package upgrades as shortcuts.
- Organize by feature/domain and shared UI boundaries. Keep routes thin; place domain data and transformation logic outside presentation.
- Reuse existing architecture unless clear duplication, coupling, or performance evidence justifies a change. No speculative global rewrite.
- Use semantic design tokens, not one-off colors/padding in every page. Avoid duplicating navigation/content constants.
- Use shadcn/ui selectively as **source-owned components**, not as a mandate to import every registry item. Initialize only if needed; preserve/merge existing `components.json` and styles.
- Never modify database schemas, delete records, rename backend identifiers, rotate credentials, or deploy without explicit necessity and a reversible plan.
- Treat Tailwind canonical-class hints as low priority. Inspect responsive intent before replacing `min-w-[640px]` with `min-w-160`; a fixed minimum may be wrong for the UI.

## Required working procedure
1. **Audit first**: produce route/component inventory, feature checklist, content density report, design anti-patterns, accessibility/performance findings, and dependency/registry status. Capture screenshots where browser access is available.
2. **Design system second**: define semantic color/typography/spacing/radii tokens and shared layout primitives. Validate existing components against them.
3. **Refactor by vertical slice**: header + landing page, then `development`, then each real route. Use one small coherent change set per slice; validate functionality before continuing.
4. **Rename safely**: change brand-facing BMI occurrences to Mayang Imphal across metadata, nav, footer, headings, structured data, manifests, tests, emails, social image copy, and accessibility labels. Keep internal identifiers where renaming would break contracts until explicitly migrated.
5. **Verify**: run repository-specific lint/typecheck/test/build and browser checks. Report exact commands and results; if unavailable, mark as unverified rather than claiming success.
6. **Report**: show changed files, before/after route screenshots (if possible), component removals, retained functionality, measured quality deltas, residual risks, and rollback steps.

## Rules and skills
When relevant, apply `.agents/rules/design-system.md`, `.agents/rules/architecture.md`, and `.agents/rules/content-and-brand.md`.
Use `/.agents/skills/lagom-audit` conceptually (or invoke `/lagom-audit`), then `/lagom-refactor`, then `/release-verify`.

## Prohibited shortcuts
- Do not replace the whole project with a static mockup or remove working features.
- Do not mass-install all shadcn components, force a framework migration, or overwrite existing config blindly.
- Do not hide essential accessibility, legal, source, or data information to satisfy an aesthetic preference.
- Do not invent town claims, KPIs, project completion rates, organisation claims or placeholder testimonials.
- Do not claim the entire redesign is complete after only modifying one page or fixing a linter hint.
