import test from "node:test"
import assert from "node:assert/strict"

// Mobile number validation logic
function isValidIndianMobile(phone) {
  if (!phone) return false
  const clean = phone.replace(/[\s\-\+]/g, "")
  // Accepts 10 digits or 12 digits starting with 91
  if (/^[6-9]\d{9}$/.test(clean)) return true
  if (/^91[6-9]\d{9}$/.test(clean)) return true
  return false
}

test("isValidIndianMobile: correctly validates 10-digit Indian mobile formats", () => {
  assert.equal(isValidIndianMobile("9862012345"), true)
  assert.equal(isValidIndianMobile("+91 98620 12345"), true)
  assert.equal(isValidIndianMobile("919862012345"), true)
  assert.equal(isValidIndianMobile("12345"), false)
  assert.equal(isValidIndianMobile("abcdefghij"), false)
  assert.equal(isValidIndianMobile(""), false)
  assert.equal(isValidIndianMobile(undefined), false)
})

// Role privilege checks
function canAuditGrievance(role) {
  return role === "ward_coordinator" || role === "desk_admin"
}

function canDispatchToMunicipality(role) {
  return role === "desk_admin"
}

test("rolePrivileges: enforces correct role boundary hierarchy", () => {
  assert.equal(canAuditGrievance("citizen"), false)
  assert.equal(canAuditGrievance("ward_coordinator"), true)
  assert.equal(canAuditGrievance("desk_admin"), true)

  assert.equal(canDispatchToMunicipality("citizen"), false)
  assert.equal(canDispatchToMunicipality("ward_coordinator"), false)
  assert.equal(canDispatchToMunicipality("desk_admin"), true)
})

// DPDP Consent validation
function validateRegistrationPayload(payload) {
  if (!payload.name || payload.name.trim().length === 0) {
    return { valid: false, error: "Name required" }
  }
  if (!isValidIndianMobile(payload.phone)) {
    return { valid: false, error: "Valid mobile required" }
  }
  if (!payload.ward || payload.ward < 1 || payload.ward > 12) {
    return { valid: false, error: "Ward must be between 1 and 12" }
  }
  if (!payload.dpdpConsent) {
    return { valid: false, error: "DPDP statutory consent required" }
  }
  return { valid: true }
}

test("validateRegistrationPayload: rejects registration without explicit DPDP consent", () => {
  const missingConsent = {
    name: "Sanatomba Singh",
    phone: "9862012345",
    ward: 5,
    dpdpConsent: false,
  }
  assert.equal(validateRegistrationPayload(missingConsent).valid, false)
  assert.equal(validateRegistrationPayload(missingConsent).error, "DPDP statutory consent required")

  const validPayload = {
    name: "Sanatomba Singh",
    phone: "9862012345",
    ward: 5,
    dpdpConsent: true,
  }
  assert.equal(validateRegistrationPayload(validPayload).valid, true)
})
