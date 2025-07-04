"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"
import { TypingTextAnimation } from "@/components/animations/text/TypingTextAnimation"

interface HeroSectionProps {
  inverterActive: boolean
  booting: boolean
  isMobile?: boolean
}

/**
 * Hero section component with typing animations
 */
export function HeroSection({ inverterActive, booting, isMobile = false }: HeroSectionProps) {
  const { isDark } = useTheme()

  if (!inverterActive || booting || isMobile) {
    return null
  }

  return (
    <motion.div
      layout
      animate={{ height: 280 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ width: "100%" }}
    >
      <AnimatePresence>
        <motion.section
          key="hero-section"
          layout
          className="hero-section-container w-full max-w-4xl mx-auto px-4 sm:px-6 mt-16 pt-12 pb-10 mb-8"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ position: "absolute", left: 0, right: 0 }}
        >
          <div className="flex flex-col items-center text-center px-4">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-2 flex flex-col sm:flex-row items-center justify-center gap-2 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              <span className="inline-block">
                <TypingTextAnimation text="Intelligent Energy Systems" speed="medium" />
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-zap w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${
                  isDark ? "text-green-500" : "text-[#2bb757]"
                }`}
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
            </h1>
            <p
              className={`text-xl leading-relaxed max-w-3xl mx-auto mb-2 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <span className={`${isDark ? "text-green-400" : "text-[#2bb757] font-semibold"}`}>
                <span className="inline-block">
                  <TypingTextAnimation text="At GREAN WORLD" speed="medium" />
                </span>
              </span>{" "}
              Energy Technology, we don't just sell solar — we deliver intelligent energy systems built for reliability,
              efficiency, and a{" "}
              <span className={`${isDark ? "text-green-400" : "text-[#2bb757] font-semibold"}`}>
                sustainable future.
              </span>
            </p>
          </div>
        </motion.section>
      </AnimatePresence>
    </motion.div>
  )
}
