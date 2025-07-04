"use client"

import type React from "react"

import { useEffect } from "react"
import { UI_SETTINGS } from "@/utils/constants"

/**
 * Custom hook for handling scroll events and content height monitoring
 */
export function useScrollHandling({
  shouldShowMobileLayout,
  loadingComplete,
  mainContentRef,
  setIsScrolling,
  setContentHeight,
  setViewportHeight,
}: {
  shouldShowMobileLayout: boolean
  loadingComplete: boolean
  mainContentRef: React.RefObject<HTMLDivElement>
  setIsScrolling: (scrolling: boolean) => void
  setContentHeight: (height: number) => void
  setViewportHeight: (height: number) => void
}) {
  // Monitor content height and viewport for scroll detection
  useEffect(() => {
    const updateDimensions = () => {
      if (mainContentRef.current && !shouldShowMobileLayout) {
        const newContentHeight = mainContentRef.current.scrollHeight
        const newViewportHeight = window.innerHeight

        setContentHeight(newContentHeight)
        setViewportHeight(newViewportHeight)

        // Debug logging
        console.log("Content dimensions:", {
          contentHeight: newContentHeight,
          viewportHeight: newViewportHeight,
          needsScroll: newContentHeight > newViewportHeight,
        })
      }
    }

    if (loadingComplete && !shouldShowMobileLayout) {
      const timer = setTimeout(updateDimensions, 500)
      window.addEventListener("resize", updateDimensions)

      return () => {
        clearTimeout(timer)
        window.removeEventListener("resize", updateDimensions)
      }
    }
  }, [loadingComplete, shouldShowMobileLayout, mainContentRef, setContentHeight, setViewportHeight])

  // Handle scroll events for desktop
  useEffect(() => {
    if (shouldShowMobileLayout) return

    const handleScroll = () => {
      setIsScrolling(true)

      const timer = setTimeout(() => {
        setIsScrolling(false)
      }, UI_SETTINGS.SCROLL_DEBOUNCE)

      return () => clearTimeout(timer)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [shouldShowMobileLayout, setIsScrolling])
}
