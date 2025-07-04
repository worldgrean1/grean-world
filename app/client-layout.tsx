"use client"

import type React from "react"
import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { setupGlobalErrorHandling, logInfo } from "@/utils/error-logging"
import { initializeAudioSystem } from "@/utils/sound"
import { preloadImages } from "@/utils/performance"

/**
 * Client-side layout component with enhanced initialization
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize global error handling
    setupGlobalErrorHandling()

    // Initialize audio system
    initializeAudioSystem()

    // Preload critical images
    const criticalImages = ["/images/grean-logo-icon.png", "/images/qr-greanworld.png", "/logos/grean-world-logo.png"]

    preloadImages(criticalImages).catch((error) => {
      console.warn("Failed to preload some images:", error)
    })

    // Log successful initialization
    logInfo("Application initialized successfully", {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    })
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
      {children}
    </ThemeProvider>
  )
}
