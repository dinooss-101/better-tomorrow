export type UserRole = "citizen" | "ward_coordinator" | "desk_admin"

export type WardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface UserProfile {
  id: string
  name: string
  phone: string
  email?: string
  role: UserRole
  ward?: WardNumber
  joinedAt: string
  dpdpConsentAt: string
}

export interface UserSession {
  user: UserProfile
  token: string
  expiresAt: string
}

export interface LoginCredentials {
  identifier: string
  otpOrPassword?: string
}

export interface RegisterPayload {
  name: string
  phone: string
  email?: string
  ward: WardNumber
  dpdpConsent: boolean
}

export interface DPDPConsentRecord {
  userId: string
  timestamp: string
  version: string
  ipAnonymized: boolean
  purpose: "CIVIC_GRIEVANCE_TRIAGE_AND_SCHOLARSHIP_NOTIFICATIONS"
}
