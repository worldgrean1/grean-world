"use client"

import { useState, useEffect } from "react"

interface UseDesktopModeReturn {
  isDesktopMode: boolean
  setDesktopMode: (mode: boolean) => void
  mounted: boolean
}

export function useDesktopMode(): UseDesktopModeReturn {
  const [isDesktopMode, setIsDesktopMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved preference
    const saved = localStorage.getItem("desktopMode")
    if (saved) {
      setIsDesktopMode(JSON.parse(saved))
    }
  }, [])

  const setDesktopMode = (mode: boolean) => {
    setIsDesktopMode(mode)
    localStorage.setItem("desktopMode", JSON.stringify(mode))
  }

  return { isDesktopMode, setDesktopMode, mounted }
}
