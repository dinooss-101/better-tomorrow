# shadcn/ui — Selective Registry and Component Setup

Official: https://ui.shadcn.com/docs/components-json ; https://ui.shadcn.com/docs/installation/next ; https://ui.shadcn.com/docs/registry/namespace

## Why not install everything?
shadcn/ui provides source components, not a required all-in-one runtime. Adding every component creates dependency and maintenance surface, increases potential styling conflicts and has no benefit to an editorial site. Install the primitives actually used by the audited pages.

## Detection before mutation
1. Inspect `components.json`, existing `components/ui`, `package.json`, `app/globals.css` or equivalent, `tsconfig.json` aliases, Tailwind major version and lockfile.
2. If shadcn is not initialized, in the correct workspace directory run `pnpm dlx shadcn@latest init` interactively; accept settings matching the actual project, not guessed defaults.
3. If already initialized, merge only missing config. Do not overwrite `components.json` or CSS tokens.
4. shadcn components are maintained inside the project. Review CLI diffs; ensure no overwrite of locally customized primitives.

## Suggested first-party install set (only where used)
```bash
pnpm dlx shadcn@latest add button separator navigation-menu sheet breadcrumb accordion dialog input textarea label skeleton
```

Optional after audit: `badge`, `tabs`, `select`, `popover`, `tooltip`, `pagination`, `table`, `scroll-area`, `alert`, `card` (only when semantically justified). Avoid `card` everywhere. Match component availability to installed CLI; check docs/registry before adding.

## Official registry configuration
The official shadcn source may be used without custom registry configuration. A namespaced example is:

```json
"registries": {
  "@shadcn": "https://ui.shadcn.com/r/{name}.json"
}
```

Place under `components.json` only if namespaced use is desired and compatible. Public third-party registries should be allowed only after source/security review; the user did not request third-party kits.

## Config example
See `examples/components.next-tailwind4.json` — **reference only**. It assumes Next.js App Router, Tailwind v4 and root-level `@/*` aliases. It must be merged/adapted following the actual repository config. Tailwind v3 uses a different `tailwind.config` setting; `src/*` setups need a different alias and CSS path.

## Validation
Check `pnpm dlx shadcn@latest ...` installed paths; run existing tests, typecheck and build. Compare color tokens, focus states and mobile navigation, and remove unreferenced generated components once safe.
