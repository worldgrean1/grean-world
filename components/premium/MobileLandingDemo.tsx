"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { useMobileGestures } from "@/hooks/useMobileGestures"
import { useDesktopMode } from "@/hooks/useDesktopMode"
import { useRouter } from "next/navigation"
import { useTheme } from "@/hooks/useTheme"
import { playButtonClickSound } from "@/utils/sound"
import { MobileLoadingScreen } from "@/components/mobile/MobileLoadingScreen"
import { MobileHeader } from "@/components/mobile/MobileHeader"
import { MobileEnergySystem } from "@/components/mobile/MobileEnergySystem"
import { MobileContactFooter } from "@/components/mobile/MobileContactFooter"

interface MobileLandingDemoProps {
  className?: string
}

export default function MobileLandingDemo({ className = "" }: MobileLandingDemoProps) {
  const router = useRouter()
  const { isDark } = useTheme()

  // Loading state
  const [isLoading, setIsLoading] = useState(true)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Desktop mode control
  const { setDesktopMode } = useDesktopMode()

  // Energy system state
  const { deactivateFullSystem } = useEnergySystemStore()

  // Loading effect with error handling
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => {
          setLoadingComplete(true)
        }, 500)
      }, 2500)

      return () => clearTimeout(timer)
    } catch (err) {
      console.error("Loading error:", err)
      setError("Failed to initialize application")
      setIsLoading(false)
    }
  }, [])

  // Mobile gestures with error handling
  useMobileGestures({
    onSwipeUp: () => {
      try {
        handleExploreMore()
      } catch (err) {
        console.error("Gesture error:", err)
      }
    },
    enabled: loadingComplete && !error,
  })

  // Handle explore more action
  const handleExploreMore = () => {
    try {
      playButtonClickSound()
      router.push("/green")
    } catch (err) {
      console.error("Navigation error:", err)
    }
  }

  // Handle reset
  const handleReset = () => {
    try {
      deactivateFullSystem()
      playButtonClickSound()
    } catch (err) {
      console.error("Reset error:", err)
    }
  }

  // Handle desktop mode switch
  const handleDesktopMode = () => {
    try {
      playButtonClickSound()
      setDesktopMode(true)
    } catch (err) {
      console.error("Desktop mode error:", err)
    }
  }

  // Error fallback
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden ${isDark ? "bg-slate-900" : "bg-white"} ${className}`}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
            }`}
            animate={{
              background: isDark
                ? [
                    "linear-gradient(45deg, #0f172a, #1e293b, #334155)",
                    "linear-gradient(135deg, #1e293b, #334155, #0f172a)",
                    "linear-gradient(225deg, #334155, #0f172a, #1e293b)",
                    "linear-gradient(315deg, #0f172a, #1e293b, #334155)",
                  ]
                : [
                    "linear-gradient(45deg, #f0fdf4, #ecfdf5, #d1fae5)",
                    "linear-gradient(135deg, #ecfdf5, #d1fae5, #f0fdf4)",
                    "linear-gradient(225deg, #d1fae5, #f0fdf4, #ecfdf5)",
                    "linear-gradient(315deg, #f0fdf4, #ecfdf5, #d1fae5)",
                  ],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-green-400/20" : "bg-green-600/30"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Grid pattern overlay */}
          <div
            className={`absolute inset-0 opacity-5 ${isDark ? "bg-green-400" : "bg-green-600"}`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Loading Screen */}
      <MobileLoadingScreen isLoading={isLoading} onLoadingComplete={() => setLoadingComplete(true)} />

      {/* Main Content - Only show after loading */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            {/* Header */}
            <MobileHeader />

            {/* Energy System */}
            <MobileEnergySystem />

            {/* Contact Footer */}
            <MobileContactFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
