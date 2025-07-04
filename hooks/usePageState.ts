"use client"

import { useState, useEffect, useRef } from "react"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { UI_SETTINGS } from "@/utils/constants"

/**
 * Custom hook to manage page-level state and effects
 */
export function usePageState() {
  // Component state
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [prevBulbState, setPrevBulbState] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [showEnergyAnimation, setShowEnergyAnimation] = useState(false)
  const [powerFlowToEdge, setPowerFlowToEdge] = useState(false)
  const [showGreenPage, setShowGreenPage] = useState(false)
  const [greenPageLoaded, setGreenPageLoaded] = useState(false)
  const [slideOutActive, setSlideOutActive] = useState(false)

  // Loading states
  const [isLoading, setIsLoading] = useState(true)
  const [loadingComplete, setLoadingComplete] = useState(false)

  // Scroll state
  const [isScrolling, setIsScrolling] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  // Container dimensions
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  // Refs
  const demoRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const featureRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const mainContentRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Get energy system state
  const {
    inverterActive,
    switchActive,
    showHeroSection,
    showTagSection,
    setInverterActive,
    setSwitchActive,
    booting,
    animationsPaused,
    toggleAnimations,
  } = useEnergySystemStore()

  // Initialize loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setLoadingComplete(true)
    }, UI_SETTINGS.LOADING_DURATION)

    return () => clearTimeout(timer)
  }, [])

  // Track previous bulb state for animations
  useEffect(() => {
    setPrevBulbState(inverterActive)
  }, [inverterActive])

  // Show Green Page in background when inverter is active
  useEffect(() => {
    if (inverterActive) {
      setShowGreenPage(true)
    } else {
      setSlideOutActive(false)
      setShowGreenPage(false)
    }
  }, [inverterActive])

  // Cycle through feature buttons when switch is active
  useEffect(() => {
    if (!switchActive) {
      setActiveFeature(null)
      return
    }

    const features = ["solarPower", "energyStorage", "smartGrids", "sustainability", "cleanEnergy"]
    let currentIndex = 0

    const interval = setInterval(() => {
      setActiveFeature(features[currentIndex])
      currentIndex = (currentIndex + 1) % features.length
    }, 3000)

    return () => clearInterval(interval)
  }, [switchActive])

  // Reset animation completion state when bulb is turned off
  useEffect(() => {
    if (!inverterActive) {
      setAnimationCompleted(false)
    }
  }, [inverterActive])

  // Update container dimensions
  useEffect(() => {
    function updateSize() {
      if (cardRef.current) {
        setContainerWidth(cardRef.current.offsetWidth)
        setContainerHeight(cardRef.current.offsetHeight)
      }

      const newViewportHeight = window.innerHeight
      setViewportHeight(newViewportHeight)

      if (mainContentRef.current) {
        const totalContentHeight = mainContentRef.current.scrollHeight
        const availableHeight = newViewportHeight

        if (totalContentHeight > availableHeight) {
          document.body.style.overflowY = "auto"
        }
      }
    }

    if (loadingComplete) {
      const timer = setTimeout(updateSize, 100)
      window.addEventListener("resize", updateSize)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("resize", updateSize)
      }
    }
  }, [loadingComplete, inverterActive, switchActive])

  // Calculate if content needs scrolling
  const needsScrolling = contentHeight > viewportHeight && contentHeight > 0

  return {
    // State
    showInfoPanel,
    setShowInfoPanel,
    activeFeature,
    setActiveFeature,
    prevBulbState,
    setPrevBulbState,
    animationCompleted,
    setAnimationCompleted,
    isPageLoaded,
    setIsPageLoaded,
    showEnergyAnimation,
    setShowEnergyAnimation,
    powerFlowToEdge,
    setPowerFlowToEdge,
    showGreenPage,
    setShowGreenPage,
    greenPageLoaded,
    setGreenPageLoaded,
    slideOutActive,
    setSlideOutActive,
    isLoading,
    setIsLoading,
    loadingComplete,
    setLoadingComplete,
    isScrolling,
    setIsScrolling,
    contentHeight,
    setContentHeight,
    viewportHeight,
    setViewportHeight,
    containerWidth,
    setContainerWidth,
    containerHeight,
    setContainerHeight,
    needsScrolling,

    // Refs
    demoRef,
    diagramRef,
    featureRefs,
    mainContentRef,
    scrollContainerRef,
    cardRef,

    // Store state
    inverterActive,
    switchActive,
    showHeroSection,
    showTagSection,
    setInverterActive,
    setSwitchActive,
    booting,
    animationsPaused,
    toggleAnimations,
  }
}
