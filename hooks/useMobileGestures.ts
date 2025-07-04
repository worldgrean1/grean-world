"use client"

import { useEffect } from "react"

interface UseMobileGesturesProps {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  enabled?: boolean
}

export function useMobileGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  enabled = true,
}: UseMobileGesturesProps) {
  useEffect(() => {
    if (!enabled) return

    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0

    function handleTouchStart(event: TouchEvent) {
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    }

    function handleTouchEnd(event: TouchEvent) {
      endX = event.changedTouches[0].clientX
      endY = event.changedTouches[0].clientY

      const deltaX = endX - startX
      const deltaY = endY - startY
      const minSwipeDistance = 50

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight()
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft()
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown()
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp()
          }
        }
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, enabled])
}
