"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"

interface ScrollIndicatorProps {
  needsScrolling: boolean
  isScrolling: boolean
  isMobile?: boolean
}

/**
 * Scroll indicator component for desktop when content overflows
 */
export function ScrollIndicator({ needsScrolling, isScrolling, isMobile = false }: ScrollIndicatorProps) {
  const { isDark } = useTheme()

  if (!needsScrolling || isMobile) {
    return null
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-30 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isScrolling ? 0.3 : 0.8, scale: isScrolling ? 0.9 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex flex-col items-center gap-2 p-3 rounded-lg backdrop-blur-md ${
          isDark ? "bg-slate-900/80 border border-green-500/30" : "bg-white/80 border border-green-600/30"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isDark ? "text-green-400" : "text-green-600"}`}
        >
          <path d="M7 13l3 3 3-3" />
          <path d="M7 6l3 3 3-3" />
        </svg>
        <span className={`text-xs font-medium ${isDark ? "text-green-400" : "text-green-600"}`}>Scroll</span>
      </div>
    </motion.div>
  )
}
