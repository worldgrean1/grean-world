"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTheme } from "@/hooks/useTheme"
import { useWindowDimensions } from "@/hooks/useWindowDimensions"
import PremiumHeader from "@/components/premium/PremiumHeader"
import PremiumInteractiveDemo from "@/components/premium/PremiumInteractiveDemo"
import PremiumBackground from "@/components/premium/PremiumBackground"
import { LoadingScreen } from "./LoadingScreen"
import { HeroSection } from "./HeroSection"
import { ContactSection } from "./ContactSection"
import { ScrollIndicator } from "./ScrollIndicator"
import dynamic from "next/dynamic"

// Dynamic import for green page
const GreenPage = dynamic(
  () =>
    import("@/app/green/page").catch((error) => {
      console.error("Failed to load green page:", error)
      return {
        default: () => (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="text-center p-8">
              <div className="text-red-500 mb-4">⚠️</div>
              <h2 className="text-slate-900 dark:text-white text-xl mb-2">Page temporarily unavailable</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Please try refreshing the page</p>
            </div>
          </div>
        ),
      }
    }),
  { ssr: false, loading: () => null },
)

interface DesktopLayoutProps {
  // State
  isLoading: boolean
  loadingComplete: boolean
  slideOutActive: boolean
  showGreenPage: boolean
  greenPageLoaded: boolean
  isScrolling: boolean
  needsScrolling: boolean
  containerWidth: number
  containerHeight: number

  // Energy system state
  inverterActive: boolean
  switchActive: boolean
  booting: boolean

  // Refs
  mainContentRef: React.RefObject<HTMLDivElement>
  scrollContainerRef: React.RefObject<HTMLDivElement>
  cardRef: React.RefObject<HTMLDivElement>

  // Handlers
  onSwitchChange: (active: boolean) => void
  setGreenPageLoaded: (loaded: boolean) => void
}

/**
 * Desktop layout component with all desktop-specific logic
 */
export function DesktopLayout({
  isLoading,
  loadingComplete,
  slideOutActive,
  showGreenPage,
  greenPageLoaded,
  isScrolling,
  needsScrolling,
  containerWidth,
  containerHeight,
  inverterActive,
  switchActive,
  booting,
  mainContentRef,
  scrollContainerRef,
  cardRef,
  onSwitchChange,
  setGreenPageLoaded,
}: DesktopLayoutProps) {
  const router = useRouter()
  const { isDark } = useTheme()
  const { scrolled } = useWindowDimensions()

  // Enhanced preloading logic with better error handling
  // useEffect(() => {
  //   if (inverterActive && !greenPageLoaded) {
  //     const preloadGreenPage = async (attempt = 1) => {
  //       try {
  //         const module = await import("@/app/green/page")
  //         if (typeof module.default === "function") {
  //           setGreenPageLoaded(true)
  //           console.log("Green page preloaded successfully")
  //         }
  //       } catch (error) {
  //         console.error(`Failed to preload green page (attempt ${attempt}):`, error)
  //         if (error instanceof Error && error.name === "ChunkLoadError" && attempt < 3) {
  //           setTimeout(() => preloadGreenPage(attempt + 1), 1000 * attempt)
  //         } else {
  //           logError("Failed to preload green page after retries", error as Error)
  //         }
  //       }
  //     }

  //     const timeoutId = setTimeout(preloadGreenPage, 100)
  //     return () => clearTimeout(timeoutId)
  //   }
  // }, [inverterActive, greenPageLoaded, setGreenPageLoaded])

  return (
    <div
      ref={scrollContainerRef}
      className={`relative min-h-screen min-h-[100dvh] w-screen ${
        needsScrolling ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
      } ${isDark ? "bg-[#020617]" : "bg-white"} ${isScrolling ? "hide-scrollbar-during-animation" : ""}`}
      style={{
        background: isDark ? "#020617" : "#ffffff",
        scrollBehavior: "smooth",
      }}
    >
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} type="desktop" />

      {/* Animated Background */}
      {loadingComplete && (
        <motion.div
          className={`fixed inset-0 ${isDark ? "bg-[#020617]" : "bg-white"}`}
          style={{ zIndex: 5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: slideOutActive ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <PremiumBackground />
        </motion.div>
      )}

      {/* Main Site Content */}
      {loadingComplete && (
        <motion.div
          ref={mainContentRef}
          className={`relative z-10 ${isDark ? "bg-[#020617]" : "bg-white"} flex flex-col`}
          style={{ minHeight: "100vh" }}
          initial={{ opacity: 0 }}
          animate={{
            x: slideOutActive ? "-100%" : "0%",
            opacity: slideOutActive ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.8 }}
        >
          {/* Header */}
          <header className="w-full fixed top-0 left-0 z-30">
            <PremiumHeader scrolled={scrolled} />
          </header>

          {/* Main Content */}
          <main
            className={
              inverterActive
                ? "flex-1 flex flex-col items-center w-full pt-20 pb-8"
                : "flex-1 flex flex-col items-center justify-start w-full"
            }
            style={{
              minHeight: "100vh",
              paddingTop: "80px",
              paddingBottom: needsScrolling ? "2rem" : "1rem",
            }}
          >
            <motion.div
              layout
              className={`w-full flex flex-col items-center ${
                needsScrolling ? "overflow-visible min-h-screen" : "overflow-hidden h-full"
              }`}
              style={{
                paddingTop: !inverterActive ? "5vh" : "0",
                paddingBottom: "2rem",
              }}
            >
              {/* Hero Section */}
              <HeroSection inverterActive={inverterActive} booting={booting} />

              {/* Interactive Demo */}
              <motion.div
                layout
                ref={cardRef}
                className={`w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center ${
                  inverterActive && !booting ? "mt-20" : "mt-0"
                } ${!inverterActive ? "justify-center flex-1" : ""}`}
                style={{
                  minHeight: !inverterActive ? "auto" : inverterActive ? 400 : 480,
                  height: !inverterActive ? "auto" : undefined,
                  position: inverterActive ? "relative" : "static",
                  width: "100%",
                  maxWidth: "56rem",
                }}
                animate={{
                  y: inverterActive ? 0 : 0,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.5,
                }}
              >
                {containerWidth > 0 && containerHeight > 0 && (
                  <PremiumInteractiveDemo
                    showInfoPanel={false}
                    setShowInfoPanel={() => {}}
                    containerWidth={containerWidth}
                    containerHeight={containerHeight}
                    onSwitchChange={onSwitchChange}
                  />
                )}
              </motion.div>

              {/* Contact Section */}
              <ContactSection inverterActive={inverterActive} />
            </motion.div>
          </main>
        </motion.div>
      )}

      {/* Green Page Overlay */}
      <AnimatePresence>
        {showGreenPage && (
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ x: "100%" }}
            animate={{ x: slideOutActive ? "0%" : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.8 }}
          >
            <GreenPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <ScrollIndicator needsScrolling={needsScrolling} isScrolling={isScrolling} />
    </div>
  )
}
