"use client"

import { useState, useEffect } from "react"

interface MobileLayoutData {
  containerWidth: number
  containerHeight: number
  viewportHeight: number
  inverterPosition: { x: number; y: number }
  switchPosition: { x: number; y: number }
  powerFlowStart: { x: number; y: number }
  powerFlowEnd: { x: number; y: number }
  componentScale: number
  switchScale: number
  isReady: boolean
}

export function useMobileLayout(): MobileLayoutData {
  const [layoutData, setLayoutData] = useState<MobileLayoutData>({
    containerWidth: 375,
    containerHeight: 400,
    viewportHeight: 667,
    inverterPosition: { x: 187, y: 100 },
    switchPosition: { x: 187, y: 350 },
    powerFlowStart: { x: 187, y: 140 },
    powerFlowEnd: { x: 187, y: 310 },
    componentScale: 0.55,
    switchScale: 0.7,
    isReady: false,
  })

  useEffect(() => {
    const calculateLayout = () => {
      try {
        // Safe window access
        if (typeof window === "undefined") {
          setLayoutData((prev) => ({ ...prev, isReady: true }))
          return
        }

        const containerWidth = Math.max(320, window.innerWidth) // Minimum 320px
        const viewportHeight = Math.max(568, window.innerHeight) // Minimum 568px
        const isLandscape = containerWidth > viewportHeight

        // Fixed heights for header and footer
        const headerHeight = 64 // Height of MobileHeader
        const footerHeight = 80 // Height of MobileContactFooter
        const availableHeight = Math.max(300, viewportHeight - headerHeight - footerHeight)

        // Device-specific adjustments with safe fallbacks
        const getDeviceAdjustments = () => {
          try {
            // iPhone 5/SE (320×568px)
            if (containerWidth <= 320) {
              return {
                componentScale: 0.42,
                switchScale: 0.55,
                topOffset: 20,
                switchOffset: 100,
              }
            }

            // iPhone 6/7/8 (375×667px)
            if (containerWidth <= 375) {
              return {
                componentScale: 0.55,
                switchScale: 0.7,
                topOffset: 30,
                switchOffset: 120,
              }
            }

            // iPhone 6/7/8 Plus (414×736px)
            if (containerWidth <= 414) {
              return {
                componentScale: 0.6,
                switchScale: 0.75,
                topOffset: 35,
                switchOffset: 130,
              }
            }

            // iPhone X/11/12/13 (375×812px) - Tall screens
            if (containerWidth <= 375 && viewportHeight >= 800) {
              return {
                componentScale: 0.55,
                switchScale: 0.7,
                topOffset: 40,
                switchOffset: 140,
              }
            }

            // iPhone 14/15 Pro Max (430×932px)
            if (containerWidth >= 430) {
              return {
                componentScale: 0.65,
                switchScale: 0.8,
                topOffset: 50,
                switchOffset: 160,
              }
            }

            // Default fallback
            return {
              componentScale: 0.55,
              switchScale: 0.7,
              topOffset: 30,
              switchOffset: 120,
            }
          } catch (error) {
            console.error("Device adjustment error:", error)
            return {
              componentScale: 0.55,
              switchScale: 0.7,
              topOffset: 30,
              switchOffset: 120,
            }
          }
        }

        const { componentScale, switchScale, topOffset, switchOffset } = getDeviceAdjustments()
        const centerX = Math.max(50, Math.min(containerWidth / 2, containerWidth - 50))

        let inverterX: number, inverterY: number, switchX: number, switchY: number

        if (isLandscape) {
          // Landscape layout - side by side
          inverterX = Math.max(50, containerWidth * 0.25)
          switchX = Math.min(containerWidth - 50, containerWidth * 0.75)
          inverterY = switchY = Math.max(100, headerHeight + availableHeight * 0.5)
        } else {
          // Portrait layout - vertical arrangement
          // Inverter at top (aligned with Header)
          inverterX = centerX
          inverterY = Math.max(80, headerHeight + topOffset)

          // Switch positioned to align with top edge of Contact section
          switchX = centerX
          switchY = Math.max(200, Math.min(viewportHeight - 100, viewportHeight - footerHeight - switchOffset))
        }

        // Power Flow connection points - Centered between Inverter and Switch
        const powerFlowStart = {
          x: inverterX,
          y: Math.max(inverterY + 20, inverterY + (isLandscape ? 0 : 40 * componentScale)),
        }
        const powerFlowEnd = {
          x: switchX + (isLandscape ? -30 * componentScale : 50 * componentScale), // Move right 2x more for portrait
          y: Math.max(switchY - 20, switchY - (isLandscape ? 0 : 40 * componentScale)),
        }

        setLayoutData({
          containerWidth,
          containerHeight: availableHeight,
          viewportHeight,
          inverterPosition: { x: inverterX, y: inverterY },
          switchPosition: { x: switchX, y: switchY },
          powerFlowStart,
          powerFlowEnd,
          componentScale: Math.max(0.3, Math.min(componentScale, 1)),
          switchScale: Math.max(0.3, Math.min(switchScale, 1)),
          isReady: true,
        })
      } catch (error) {
        console.error("Layout calculation error:", error)
        // Safe fallback values
        setLayoutData({
          containerWidth: 375,
          containerHeight: 400,
          viewportHeight: 667,
          inverterPosition: { x: 187, y: 100 },
          switchPosition: { x: 187, y: 350 },
          powerFlowStart: { x: 187, y: 140 },
          powerFlowEnd: { x: 215, y: 310 }, // Adjusted fallback to be right of center
          componentScale: 0.55,
          switchScale: 0.7,
          isReady: true,
        })
      }
    }

    // Initial calculation with delay to ensure DOM is ready
    const timer = setTimeout(calculateLayout, 200)

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(calculateLayout, 300)
    }

    // Orientation change handler with longer delay
    const handleOrientationChange = () => {
      setTimeout(calculateLayout, 500)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      window.addEventListener("orientationchange", handleOrientationChange)
    }

    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("orientationchange", handleOrientationChange)
      }
    }
  }, [])

  return layoutData
}
