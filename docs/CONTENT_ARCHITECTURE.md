# Content Architecture and Information Governance

## Central source principle
Avoid duplicating page titles, feature labels, addresses, initiative descriptions and navigation metadata across page components. Prefer a canonical typed content configuration for static items, with the existing CMS/database as source of truth if present. Do not create a second competing content store.

## Minimal models (conceptual; adapt to actual data source)

- `SiteIdentity`: displayName, logoAsset, description, locale, verifiedContact channels, socialLinks, metadataDefaults, contentOwner.
- `NavigationItem`: label, href, priority, sublinks, visibility and active-route rules.
- `EditorialItem`: slug, title, dek, body, publishedAt, updatedAt, sourceRefs, mediaAsset, rights.
- `DevelopmentItem`: slug, title, category, summary, status (`verified` only), milestones, updates, sources, contact, asset references.
- `PlaceItem`: canonicalName, altNames, overview, location fields, image permissions, sourceRefs.
- `MediaAsset`: src, width, height, altText, credit, license, focal point; factual photos must be verified.
- `PageMetadata`: title, description, canonical route, OG asset, indexability.

## Content audit
1. Create list of every existing content field and its origin.
2. Identify repeated content and placeholders; do not silently overwrite trusted text.
3. Assign every page one clear task and one search intent.
4. Write summary-first copy, then progressive-detail content below.
5. Establish a "needs verification" status for town history, government/community programmes, numbers, legal/civic statements and addresses.
6. Ensure culturally sensitive imagery, dress references and attribution are precise and permissioned.

## Editorial language
Use short, concrete statements. Prefer "Current projects" to "Transforming tomorrow through strategic development". If no sourced progress or status exists, use neutral descriptive language and never invent a badge like "Completed" or "In Progress".

## SEO/metadata
Rename title templates to Mayang Imphal; preserve verified canonical URLs and robots decisions. Add structured data only for factual, correctly typed entities supported by real organization/website data. Do not assert official municipal authority without proof.
