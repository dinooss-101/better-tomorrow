"use client"

import React, { createContext, useContext, useSyncExternalStore, useCallback } from "react"

export type DensityMode = "spacious" | "compact"

interface DensityContextType {
  density: DensityMode
  toggleDensity: () => void
  setDensity: (mode: DensityMode) => void
}

const DensityContext = createContext<DensityContextType | undefined>(undefined)

const STORAGE_KEY = "mayang-imphal-density"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot(): DensityMode {
  try {
    const val = localStorage.getItem(STORAGE_KEY)
    if (val === "compact" || val === "spacious") return val
  } catch {
    // storage unavailable
  }
  return "spacious"
}

function getServerSnapshot(): DensityMode {
  return "spacious"
}

export function DensityProvider({ children }: { children: React.ReactNode }) {
  const density = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setDensity = useCallback((mode: DensityMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode)
      document.documentElement.setAttribute("data-density", mode)
      window.dispatchEvent(new Event("storage"))
    } catch {
      // storage unavailable
    }
  }, [])

  const toggleDensity = useCallback(() => {
    setDensity(density === "spacious" ? "compact" : "spacious")
  }, [density, setDensity])

  // Sync data-density attribute on DOM <html> element
  React.useEffect(() => {
    document.documentElement.setAttribute("data-density", density)
  }, [density])

  return (
    <DensityContext.Provider value={{ density, toggleDensity, setDensity }}>
      {children}
    </DensityContext.Provider>
  )
}

export function useDensity() {
  const context = useContext(DensityContext)
  if (!context) {
    return {
      density: "spacious" as DensityMode,
      toggleDensity: () => {},
      setDensity: () => {},
    }
  }
  return context
}
