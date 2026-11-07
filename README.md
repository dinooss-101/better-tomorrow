# Mayang Imphal — Google Antigravity Redesign Pack

**Purpose:** ready-to-adapt instructions and implementation references for transforming an existing BMI-branded Next.js/React project into a low-density, Nordic Lagom **Mayang Imphal** site.

**Status:** This pack was authored from the single provided diagnostic, not an inspection of `C:\m-i\bmi`. No product code, routes, screenshots, package versions, existing `AGENTS.md` or `components.json` were available; no actual repo files have been changed. All route archetypes are proposals pending source inspection.

## Quick installation (safe order)

1. Create a git branch or backup of the existing project before merging these files.
2. Copy root `AGENTS.md`, `.agents/rules/`, `.agents/skills/`, `docs/`, `prompts/`, `scripts/` into the project **after reviewing conflicts**. If `AGENTS.md` already exists, merge its valuable content with the new rules instead of silently replacing it.
3. Place `examples/` as reference material, NOT as automatically active configuration. `examples/components.next-tailwind4.json` is **not** an authoritative replacement for any existing `components.json`.
4. Open the project root in Google Antigravity IDE, use `/lagom-audit` or paste `prompts/MASTER_ANTIGRAVITY_PROMPT.md` contents in the agent. The prompt should first inventory existing routes, CSS, features and dependencies.
5. After audit, use `/lagom-refactor` for controlled vertical slices and `/release-verify` at the end.
6. In the real app, inspect `components.json`, then initialize/merge shadcn/ui only when appropriate. Read `docs/SHADCN_REGISTRY.md`.

## Included tree

```text
AGENTS.md
.agents/
  rules/
    design-system.md
    architecture.md
    content-and-brand.md
  skills/
    lagom-audit/SKILL.md
    lagom-refactor/SKILL.md
    release-verify/SKILL.md
docs/
  REDESIGN_BLUEPRINT.md
  CONTENT_ARCHITECTURE.md
  ROUTE_AUDIT_TEMPLATE.md
  QUALITY_GATES.md
  RENAME_AND_MIGRATION.md
  SHADCN_REGISTRY.md
examples/
  components.next-tailwind4.json
  lagom-tokens.tailwind4.css
prompts/
  MASTER_ANTIGRAVITY_PROMPT.md
scripts/
  site-inventory.mjs
```

## Tooling notes verified against official docs (November 2026)
- Google Antigravity recognizes workspace `AGENTS.md`, `.agents/rules/*.md`, `.agents/skills/<name>/SKILL.md`: https://antigravity.google/docs/rules/ and https://antigravity.google/docs/skills
- Legacy `.agents/workflows/*.md` is retired as of 19 October 2026; favor skills: https://antigravity.google/docs/migration/workflows-to-skills
- shadcn/ui configuration and registry namespaces: https://ui.shadcn.com/docs/components-json and https://ui.shadcn.com/docs/registry/namespace
- Tailwind minimum width: https://tailwindcss.com/docs/min-width

## Core rule
**Audit before edits, preserve functional behavior, verify before claiming success.**
