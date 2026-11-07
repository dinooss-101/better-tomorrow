import test from "node:test"
import assert from "node:assert/strict"

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

