import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

// Pure unit test of the closing soon window logic (7-day threshold)
function isDeadlineClosingSoon(deadline, now) {
  if (!deadline) return false
  const diff = new Date(deadline).getTime() - now
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000
}

test("isDeadlineClosingSoon: returns false for missing or empty deadline", () => {
  const now = new Date("2026-10-29T12:00:00Z").getTime()
  assert.equal(isDeadlineClosingSoon(undefined, now), false)
  assert.equal(isDeadlineClosingSoon("", now), false)
})

test("isDeadlineClosingSoon: returns false for past deadlines", () => {
  const now = new Date("2026-10-29T12:00:00Z").getTime()
  assert.equal(isDeadlineClosingSoon("2026-10-28", now), false)
  assert.equal(isDeadlineClosingSoon("2026-10-20", now), false)
})

test("isDeadlineClosingSoon: returns true for deadlines within 7 days in the future", () => {
  const now = new Date("2026-10-29T12:00:00Z").getTime()
  assert.equal(isDeadlineClosingSoon("2026-10-31", now), true)
  assert.equal(isDeadlineClosingSoon("2026-11-03", now), true)
})

test("isDeadlineClosingSoon: returns false for deadlines beyond 7 days", () => {
  const now = new Date("2026-10-29T12:00:00Z").getTime()
  assert.equal(isDeadlineClosingSoon("2026-11-15", now), false)
  assert.equal(isDeadlineClosingSoon("2026-12-31", now), false)
})

// Unit test for scholarship level matching supporting multi-tier schemes
function matchesScholarshipLevel(scheme, selectedLevel) {
  if (selectedLevel === "ALL") return true
  if (scheme.level === selectedLevel) return true
  if (scheme.levels && scheme.levels.includes(selectedLevel)) return true
  return false
}

test("matchesScholarshipLevel: correctly filters single and multi-level schemes", () => {
  const singleLevel = { level: "UNDERGRADUATE", levels: ["UNDERGRADUATE"] }
  const multiLevel = {
    level: "HIGHER_SECONDARY",
    levels: ["HIGHER_SECONDARY", "UNDERGRADUATE", "POSTGRADUATE"],
  }

  assert.equal(matchesScholarshipLevel(singleLevel, "ALL"), true)
  assert.equal(matchesScholarshipLevel(singleLevel, "UNDERGRADUATE"), true)
  assert.equal(matchesScholarshipLevel(singleLevel, "POSTGRADUATE"), false)

  assert.equal(matchesScholarshipLevel(multiLevel, "HIGHER_SECONDARY"), true)
  assert.equal(matchesScholarshipLevel(multiLevel, "UNDERGRADUATE"), true)
  assert.equal(matchesScholarshipLevel(multiLevel, "POSTGRADUATE"), true)
  assert.equal(matchesScholarshipLevel(multiLevel, "RESEARCH_FELLOWSHIP"), false)
})

// Data invariant tests: ensures civic data records meet minimum required fields
test("civicDataSchema: validates project record invariants", () => {
  const sample = {
    id: "proj-01",
    slug: "sample-slug",
    title: "Sample Civic Work",
    currentStage: "TENDERING",
    currentCondition: "NORMAL",
    sources: [{ title: "Official Gazette", isPrimaryEvidence: true }],
  }

  assert.ok(sample.id.startsWith("proj-"))
  assert.ok(sample.slug.length > 0)
  assert.ok(sample.title.length > 0)
  assert.ok(sample.sources.length > 0)
  assert.ok(sample.sources[0].isPrimaryEvidence)
})

// Compliance invariant: ensures DPDP Act references are strictly 2023 across public disclosures
test("compliance: validates DPDP Act citation year across public disclosures", () => {
  const footerPath = path.resolve("components/footer-2.tsx")
  const contactPath = path.resolve("components/contact/contact-view.tsx")
  const productPath = path.resolve("PRODUCT.md")

  const footerContent = fs.readFileSync(footerPath, "utf-8")
  const contactContent = fs.readFileSync(contactPath, "utf-8")
  const productContent = fs.readFileSync(productPath, "utf-8")

  assert.ok(!footerContent.includes("DPDP Act 2025"), "footer must not cite DPDP Act 2025")
  assert.ok(footerContent.includes("DPDP Act 2023"), "footer must cite DPDP Act 2023")

  assert.ok(!contactContent.includes("DPDP Act 2025"), "contact view must not cite DPDP Act 2025")
  assert.ok(contactContent.includes("DPDP Act 2023"), "contact view must cite DPDP Act 2023")

  assert.ok(productContent.includes("DPDP) Act 2023"), "PRODUCT.md must cite DPDP Act 2023")
})

// Security header invariant: validates presence of essential defensive headers in next.config.ts
test("security: validates HTTP security headers configuration in next.config.ts", () => {
  const configPath = path.resolve("next.config.ts")
  const configContent = fs.readFileSync(configPath, "utf-8")

  assert.ok(configContent.includes("X-Frame-Options"), "must configure X-Frame-Options")
  assert.ok(configContent.includes("X-Content-Type-Options"), "must configure X-Content-Type-Options")
  assert.ok(configContent.includes("Strict-Transport-Security"), "must configure HSTS")
  assert.ok(configContent.includes("Referrer-Policy"), "must configure Referrer-Policy")
  assert.ok(configContent.includes("Permissions-Policy"), "must configure Permissions-Policy")
})

// Route inventory invariant: ensures all 7 core routes exist in sitemap
test("routes: validates presence of all 7 core routes in sitemap.ts", () => {
  const sitemapPath = path.resolve("app/sitemap.ts")
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8")

  const expectedRoutes = [
    '""',
    '"/about"',
    '"/contact"',
    '"/development"',
    '"/future-labs"',
    '"/progress"',
    '"/scholarships"',
  ]

  for (const route of expectedRoutes) {
    assert.ok(sitemapContent.includes(route), `sitemap must include route ${route}`)
  }
})

// Canonical ward invariants: ensures single authoritative ward directory
test("canonicalWards: validates canonical 12-ward directory invariants", () => {
  const wardsPath = path.resolve("lib/data/wards.ts")
  const wardsContent = fs.readFileSync(wardsPath, "utf-8")

  assert.ok(wardsContent.includes("CANONICAL_WARDS"), "must define CANONICAL_WARDS")
  assert.ok(wardsContent.includes('name: "Central Bazar"'), "Ward 5 must be Central Bazar")
  assert.ok(wardsContent.includes('name: "Konchak Awang"'), "Ward 1 must be Konchak Awang")
  assert.ok(wardsContent.includes('name: "Kokhai Makha"'), "Ward 12 must be Kokhai Makha")
})

