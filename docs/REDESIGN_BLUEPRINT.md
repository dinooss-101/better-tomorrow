# Mayang Imphal — Quiet Imphal Design Blueprint

Status: proposal pending inspection of source code and verification of business/content requirements. This is **not** a claim about actual routes or existing features.

## 1. North star
A calm, useful digital front door for Mayang Imphal. Nordic Lagom in interaction density; grounded in the visual and cultural reality of the place. The visual language is editorial, not dashboard-like, not a tourism-ad cliché, and not an unsubstantiated public-government impersonation.

**Design success:** on every page, the visitor knows where they are, what matters, and what useful action to take within a few seconds. Information is still complete when needed.

## 2. Core composition
- Spacious wordmark and restrained navigation; sticky only if measured helpful.
- Hero uses one concrete headline, one short lead, one relevant image (optional), one primary action, one secondary text link.
- Main content alternates 1-column editorial paragraphs, open 2-column split, full-bleed imagery, indexes/lists and quiet rules. Avoid grids of indistinguishable cards.
- Quiet footer: brand, navigation, contact source, legal links, attribution.
- Consistent section header: eyebrow (optional), H2, one supporting sentence at most, optional text link.

## 3. Visual tokens (starting references, contrast-test before adoption)

| Role | Value | Purpose |
|------|-------|---------|
| background | `#F7F6F2` | warm chalk |
| surface | `#FFFFFF` | forms and data surfaces only |
| primary | `#294F46` | pine-green action and emphasis |
| foreground | `#232B29` | ink text |
| muted surface | `#E7EBE5` | soft mist |
| muted foreground | `#525E59` | secondary text; verify contrast |
| border | `#D7DDD7` | hairline separators |
| accent | `#B38C6D` | quiet clay for minor editorial accents, not small-text color |
| destructive | `#A4352B` | error/destructive actions |

Typography: system/Geist-like humanist sans for interface; optional Newsreader/Georgia-like editorial serif for large headlines. Do not import multiple external font families without measuring cost. Body 16-18px, line height 1.55-1.7; H1 clamp(2.5rem, 5vw, 5.25rem); H2 clamp(1.85rem, 3vw, 3rem). Do not use giant headings on every route.

Layout: centered max-width 72-75rem; text line length 58-70ch; mobile horizontal padding 20px minimum where viewport permits; desktop ~40-48px. Spacing system: 4/8/12/16/24/32/48/64/80/96/112px, consumed as semantic section spacing rather than duplicated magic values.

Elevation and radius: zero or nearly zero shadow by default; 1px borders. Mostly small/medium corner radius (4-10px) for controls. A photo can have no rounding. Avoid pill buttons unless their interaction semantics benefit from it.

Motion: 120-220ms easing for hover/focus, no scroll-jacking or default reveal animation; `prefers-reduced-motion: reduce` respected. One understated transition is enough.

## 4. Navigation
Inspect actual route tree and real tasks before deciding labels. Ideal public top level is **4-6 destinations**, using meaningful nouns. Indicative ONLY:

Home | About | Development | Stories | Explore | Contact

Do not invent pages or delete existing destinations solely to match this example. Nest lower-use links contextually; provide meaningful search/filter controls only if dataset warrants them. Mobile navigation: accessible Sheet/drawer with keyboard focus handling and no hidden content.

## 5. Route/page pattern matrix
These are patterns to **map onto every discovered route**, not a fabricated list of the site's existing URLs.

| Pattern | Section order | Key constraints |
|---|---|---|
| Home `/` | Hero -> 2-3 key pathways -> featured story/initiative -> latest credible update -> quiet CTA | At most 5 content sections before footer; no KPI confetti |
| About / place profile | H1 + lead -> orientation/context -> map or landmark image when applicable -> verified facts -> related resources | Source historical/cultural facts; 65ch reading column |
| Culture / heritage | Editorial hero -> illustrated/photographed narrative -> factual chronology -> references -> related reading | Verify cultural attributions and image rights |
| Development `/development` (confirmed) | Clear current-state overview -> priority categories -> project status list -> details/updates -> participation/contact | No 640px minimum width on whole mobile page; data tables may scroll within their own wrappers |
| Initiative/programme index | Intro -> category filters if genuinely useful -> restrained editorial list -> pagination | Don't add filters for tiny datasets |
| Initiative/programme detail | Title + status only if verified -> summary -> problem/context -> outcomes/progress with sources -> updates -> contact | Avoid invented counters/progress |
| News/stories index | Editorial lead -> lead feature -> chronological list -> pagination/next | Avoid repeated introductory paragraphs |
| News/story detail | Label/date -> H1 -> lead -> hero media -> readable article -> citations -> related stories | Semantic article and share metadata |
| Directory/resources | Search if needed -> categories -> accessible list/details -> optional map -> contact | Verify addresses/hours, distinguish public/private entries |
| Gallery | Curated feature -> responsive media grid -> meaningful captions and credit | Lazy loading and licenses, keyboard-accessible lightbox only if required |
| Contact/forms | H1 + direct channels -> minimal form -> confirmation/error states -> location details if verified | Data handling/privacy notices, spam protection and validation |
| Legal/policy | Plain language page heading -> date/version -> semantic long-form headings | No critical content hidden in accordions |
| 404/errors/loading | Human explanation -> clear recovery route; non-blocking skeletons | Do not break global shell |
| Existing custom pages | Select closest pattern; preserve unique functional workflow | No force-fitting special pages into marketing sections |

## 6. Shared primitives
- `SiteShell`, `SiteHeader`, `SiteFooter`, `MobileNav`
- `Container`, `Section`, `SectionHeading`, `Eyebrow`, `TextLink`
- `PageIntro`, `EditorialSplit`, `FeatureMedia`, `EditorialList`, `ContentGrid`
- `StatusLabel` (only sourced facts), `RelatedLinks`, `ContactPanel`
- `FormField` and accessible feedback states

Do NOT create every primitive without usage: consolidate real duplication first. Use shadcn/ui for behavior primitives and maintain ownership of component source.

## 7. Density and content budgets (heuristics, not reasons to delete information)
- Main nav: 4-6 items unless user tests show otherwise.
- One H1 per page.
- Lead: ~20-40 words.
- Standard section: one H2, optional 15-25 word introduction, then substantive content.
- CTAs: one primary per section, optional secondary text link.
- On card/list previews: title + a single concise supporting field; detailed metadata belongs on detail page.
- 80%+ of repeated decorative containers should be candidates for removal, but retain forms, controls, warning states, and genuine independent data units.

## 8. Quality/accessibility/performance
- Test keyboard-only navigation, screen reader semantics, focus traps, headings, alt text, reduced motion, zoom and responsive layout.
- WCAG 2.2 AA target: regular text 4.5:1 contrast, large text 3:1, UI non-text 3:1 when applicable.
- Prefer semantic HTML, React Server Components where supported, optimized images, delayed non-critical widgets, no unnecessary animation libraries.
- Check Core Web Vitals using actual browser metrics where feasible; optimize rather than claim preset scores.

## 9. Evidence-based design review
For every route record: `route`, `purpose`, `audience task`, `current screenshot`, `information hierarchy issues`, `duplicate component patterns`, `new template`, `retained features`, `added/removal decisions`, `mobile screenshot`, `a11y checks`, `acceptance results`.
