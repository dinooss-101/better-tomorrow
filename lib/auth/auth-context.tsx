"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { UserProfile, UserRole, RegisterPayload } from "@/lib/types/auth"
import { GrievanceTicket, GrievanceStatus } from "@/lib/types/dashboard"
import { PRESET_USERS, INITIAL_GRIEVANCES } from "@/lib/data/mock-user-data"

interface AuthContextType {
  user: UserProfile | null
  role: UserRole
  isAuthenticated: boolean
  isLoading: boolean
  login: (identifier: string, roleOverride?: UserRole) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  switchRole: (role: UserRole) => void
  logout: () => Promise<void>
  grievances: GrievanceTicket[]
  addGrievance: (ticket: Omit<GrievanceTicket, "id" | "createdAt" | "updatedAt">) => void
  updateGrievanceStatus: (id: string, status: GrievanceStatus, notes?: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY_USER = "mayang_imphal_auth_user"
const STORAGE_KEY_GRIEVANCES = "mayang_imphal_grievances"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return PRESET_USERS.citizen
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER)
      return storedUser ? JSON.parse(storedUser) : PRESET_USERS.citizen
    } catch {
      return PRESET_USERS.citizen
    }
  })

  const [grievances, setGrievances] = useState<GrievanceTicket[]>(() => {
    if (typeof window === "undefined") return INITIAL_GRIEVANCES
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GRIEVANCES)
      return stored ? JSON.parse(stored) : INITIAL_GRIEVANCES
    } catch {
      return INITIAL_GRIEVANCES
    }
  })

  const [isLoading, setIsLoading] = useState(false)

  const saveUser = (u: UserProfile | null) => {
    setUser(u)
    try {
      if (u) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u))
      } else {
        localStorage.removeItem(STORAGE_KEY_USER)
      }
    } catch {
      // storage unavailable
    }
  }

  const saveGrievances = (items: GrievanceTicket[]) => {
    setGrievances(items)
    try {
      localStorage.setItem(STORAGE_KEY_GRIEVANCES, JSON.stringify(items))
    } catch {
      // storage unavailable
    }
  }

  const login = async (identifier: string, roleOverride?: UserRole) => {
    setIsLoading(true)
    // Simulate network latency (200ms)
    await new Promise((res) => setTimeout(res, 200))

    let matchedUser: UserProfile = PRESET_USERS.citizen

    if (roleOverride === "ward_coordinator" || identifier.toLowerCase().includes("coord")) {
      matchedUser = PRESET_USERS.coordinator
    } else if (roleOverride === "desk_admin" || identifier.toLowerCase().includes("admin") || identifier.toLowerCase().includes("desk")) {
      matchedUser = PRESET_USERS.admin
    } else {
      matchedUser = {
        ...PRESET_USERS.citizen,
        phone: identifier.startsWith("+") ? identifier : `+91 ${identifier}`,
      }
    }

    saveUser(matchedUser)
    setIsLoading(false)
  }

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true)
    await new Promise((res) => setTimeout(res, 250))

    const newUser: UserProfile = {
      id: `usr_citizen_${Date.now()}`,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      role: "citizen",
      ward: payload.ward,
      joinedAt: new Date().toISOString(),
      dpdpConsentAt: new Date().toISOString(),
    }

    saveUser(newUser)
    setIsLoading(false)
  }

  const switchRole = (newRole: UserRole) => {
    if (newRole === "ward_coordinator") {
      saveUser(PRESET_USERS.coordinator)
    } else if (newRole === "desk_admin") {
      saveUser(PRESET_USERS.admin)
    } else {
      saveUser(PRESET_USERS.citizen)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    await new Promise((res) => setTimeout(res, 100))
    saveUser(null)
    setIsLoading(false)
  }

  const addGrievance = (ticket: Omit<GrievanceTicket, "id" | "createdAt" | "updatedAt">) => {
    const newTicket: GrievanceTicket = {
      ...ticket,
      id: `GRV-2026-${String(Math.floor(100 + Math.random() * 900))}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [newTicket, ...grievances]
    saveGrievances(updated)
  }

  const updateGrievanceStatus = (id: string, status: GrievanceStatus, notes?: string) => {
    const updated = grievances.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          updatedAt: new Date().toISOString(),
          ...(notes ? { fieldVerificationNotes: notes } : {}),
        }
      }
      return item
    })
    saveGrievances(updated)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "citizen",
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        switchRole,
        logout,
        grievances,
        addGrievance,
        updateGrievanceStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
