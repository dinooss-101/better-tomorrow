# Page-by-Page Route Audit Template

This must be filled in from the actual repo **before** route rewrites.

| Path | Existing purpose | Interactive features | Data/API dependencies | Current layout/UX issues | New pattern | Test coverage | Status |
|---|---|---|---|---|---|---|---|
| `/development` | inspect source | inspect source | inspect source | reported bloated; verify with screenshot | Development | inspect | not audited |

For EVERY discovered route (including nested/dynamic routes, errors and auth):

```md
## [Route]
- URL, route file, layout chain:
- User job-to-be-done:
- Existing sections in order:
- Existing visible components:
- Source of text/data/images:
- Internal/external links and critical behaviors:
- Mobile/desktop issues (with evidence):
- Accessibility/SEO issues:
- Proposed content cuts, moves, consolidation (justify each):
- New section order and visual pattern:
- Risk (low/medium/high), regression tests:
- Before/after screenshots and commands:
- Result / blockers:
```

Aggregate reports:
- Route count; dynamic/static; public/protected; 404/500 states.
- Global header/footer/layout count and duplicate navigation labels.
- Overlong line counts, repeated Tailwind patterns, `min-w-*` and `overflow` hotspots.
- Design-system components installed / duplicated / unused.
- Branding/metadata audit and SEO redirects where appropriate.
- Lighthouse/axe findings if browser tooling is available.
