"use client"

import { useState, useEffect } from "react"

interface WindowDimensions {
  windowWidth: number
  windowHeight: number
  scrolled: boolean
}

export function useWindowDimensions(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    windowWidth: 0,
    windowHeight: 0,
    scrolled: false,
  })

  useEffect(() => {
    function handleResize() {
      setDimensions((prev) => ({
        ...prev,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      }))
    }

    function handleScroll() {
      setDimensions((prev) => ({
        ...prev,
        scrolled: window.scrollY > 50,
      }))
    }

    // Set initial dimensions
    handleResize()
    handleScroll()

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return dimensions
}
