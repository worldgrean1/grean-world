"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { useDesktopMode } from "@/hooks/useDesktopMode"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import { useMobileGestures } from "@/hooks/useMobileGestures"
import { usePageState } from "@/hooks/usePageState"
import { useScrollHandling } from "@/hooks/useScrollHandling"
import { DesktopLayout } from "@/components/layout/DesktopLayout"
import { logError } from "@/utils/error-logging"
import dynamic from "next/dynamic"
import "@/styles/animations.css"

// Official Brand CSS - Moved to a constant for better maintainability
const BRAND_CSS = `
  :root {
    --grean-primary: #3dd56d;
    --grean-secondary: #2bb757;
    --grean-accent: #23a455;
    --scrollbar-width: 8px;
    --scrollbar-track: rgba(0, 0, 0, 0.1);
    --scrollbar-thumb: rgba(61, 213, 109, 0.6);
    --scrollbar-thumb-hover: rgba(61, 213, 109, 0.8);
  }

  html, body {
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
  }

  html {
    background: #ffffff;
  }

  html.dark {
    background: #020617;
    --scrollbar-track: rgba(255, 255, 255, 0.05);
    --scrollbar-thumb: rgba(61, 213, 109, 0.4);
    --scrollbar-thumb-hover: rgba(61, 213, 109, 0.6);
  }

  .light body {
    background: #ffffff !important;
  }

  .dark body {
    background: #020617 !important;
  }

  .dark {
    color-scheme: dark;
  }

  .dark * {
    --tw-bg-opacity: 1;
  }
  
  /* Mobile-specific scrollbar styles */
  @media (max-width: 767px) {
    html, body {
      overflow-x: hidden !important;
      overflow-y: auto !important;
      height: auto !important;
    }
    
    ::-webkit-scrollbar {
      width: 4px !important;
      display: block !important;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--scrollbar-track) !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb) !important;
      border-radius: 2px !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: var(--scrollbar-thumb-hover) !important;
    }
    
    html {
      scrollbar-width: thin !important;
      scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track) !important;
    }
  }
  
  /* Desktop: Custom styled scrollbars */
  @media (min-width: 768px) {
    html, body {
      overflow-x: hidden !important;
      overflow-y: auto !important;
      height: 100vh !important;
      width: 100vw !important;
    }
    
    ::-webkit-scrollbar {
      width: var(--scrollbar-width) !important;
      display: block !important;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--scrollbar-track) !important;
      border-radius: 4px !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb) !important;
      border-radius: 4px !important;
      transition: background-color 0.2s ease !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: var(--scrollbar-thumb-hover) !important;
    }
    
    html {
      scrollbar-width: thin !important;
      scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track) !important;
    }
  }
  
  * {
    scroll-behavior: smooth;
  }
  
  .hide-scrollbar-during-animation {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .hide-scrollbar-during-animation::-webkit-scrollbar {
    display: none;
  }
`

// Dynamically import the mobile component to avoid SSR issues
const MobileLandingDemo = dynamic(() => import("@/components/premium/MobileLandingDemo"), {
  ssr: false,
  loading: () => null,
})

/**
 * Main landing page component - Refactored for better maintainability
 */
export default function LandingPage() {
  const router = useRouter()

  // Mobile detection and desktop mode preference
  const isMobile = useIsMobile()
  const { isDesktopMode, mounted } = useDesktopMode()

  // Determine layout type
  const shouldShowMobileLayout = mounted && isMobile && !isDesktopMode

  // Page state management
  const pageState = usePageState()

  // Scroll handling
  useScrollHandling({
    shouldShowMobileLayout,
    loadingComplete: pageState.loadingComplete,
    mainContentRef: pageState.mainContentRef,
    setIsScrolling: pageState.setIsScrolling,
    setContentHeight: pageState.setContentHeight,
    setViewportHeight: pageState.setViewportHeight,
  })

  // Inject official brand CSS
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = BRAND_CSS
    document.head.appendChild(styleElement)

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  // Initialize keyboard shortcuts
  useKeyboardShortcuts({
    onSpacePress: pageState.toggleAnimations,
    enabled: true,
  })

  // Initialize mobile gestures for navigation
  useMobileGestures({
    onSwipeLeft: () => {
      if (!pageState.switchActive) {
        pageState.setSwitchActive(true)
      }
    },
    onSwipeRight: () => {
      if (pageState.switchActive) {
        pageState.setSwitchActive(false)
      } else if (pageState.inverterActive) {
        pageState.setInverterActive(false)
      }
    },
    enabled: true,
  })

  // Enhanced preloading logic with better error handling
  useEffect(() => {
    if (pageState.inverterActive && !pageState.greenPageLoaded) {
      const preloadGreenPage = async (attempt = 1) => {
        try {
          const module = await import("@/app/green/page")
          if (typeof module.default === "function") {
            pageState.setGreenPageLoaded(true)
            console.log("Green page preloaded successfully")
          }
        } catch (error) {
          console.error(`Failed to preload green page (attempt ${attempt}):`, error)
          if (error instanceof Error && error.name === "ChunkLoadError" && attempt < 3) {
            setTimeout(() => preloadGreenPage(attempt + 1), 1000 * attempt)
          } else {
            logError("Failed to preload green page after retries", error as Error)
          }
        }
      }

      const timeoutId = setTimeout(preloadGreenPage, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [pageState.inverterActive, pageState.greenPageLoaded, pageState.setGreenPageLoaded])

  // Handle switch change - redirect to green page when turned ON
  const handleSwitchChange = (active: boolean) => {
    if (active) {
      router.push("/green")
    }
  }

  // Early return for mobile layout
  if (shouldShowMobileLayout) {
    return <MobileLandingDemo />
  }

  // Early return while mounting to prevent flicker
  if (!mounted) {
    return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]" />
  }

  // Render desktop layout
  return (
    <DesktopLayout
      // State
      isLoading={pageState.isLoading}
      loadingComplete={pageState.loadingComplete}
      slideOutActive={pageState.slideOutActive}
      showGreenPage={pageState.showGreenPage}
      greenPageLoaded={pageState.greenPageLoaded}
      isScrolling={pageState.isScrolling}
      needsScrolling={pageState.needsScrolling}
      containerWidth={pageState.containerWidth}
      containerHeight={pageState.containerHeight}
      // Energy system state
      inverterActive={pageState.inverterActive}
      switchActive={pageState.switchActive}
      booting={pageState.booting}
      // Refs
      mainContentRef={pageState.mainContentRef}
      scrollContainerRef={pageState.scrollContainerRef}
      cardRef={pageState.cardRef}
      // Handlers
      onSwitchChange={handleSwitchChange}
      setGreenPageLoaded={pageState.setGreenPageLoaded}
    />
  )
}
