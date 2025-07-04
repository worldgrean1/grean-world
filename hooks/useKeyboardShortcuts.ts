"use client"

import { useEffect } from "react"

interface UseKeyboardShortcutsProps {
  onSpacePress?: () => void
  enabled?: boolean
}

export function useKeyboardShortcuts({ onSpacePress, enabled = true }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    if (!enabled) return

    function handleKeyPress(event: KeyboardEvent) {
      if (event.code === "Space" && onSpacePress) {
        event.preventDefault()
        onSpacePress()
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [onSpacePress, enabled])
}
