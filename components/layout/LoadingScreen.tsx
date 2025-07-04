"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useTheme } from "@/hooks/useTheme"

interface LoadingScreenProps {
  isLoading: boolean
  type?: "desktop" | "mobile"
}

/**
 * Reusable loading screen component for both desktop and mobile
 */
export function LoadingScreen({ isLoading, type = "desktop" }: LoadingScreenProps) {
  const { isDark } = useTheme()

  const isDesktop = type === "desktop"
  const logoSize = isDesktop ? 128 : 80
  const titleSize = isDesktop ? "text-6xl md:text-7xl lg:text-8xl" : "text-2xl"
  const subtitleSize = isDesktop ? "text-xl" : "text-sm"
  const dotSize = isDesktop ? "w-3 h-3" : "w-2 h-2"
  const loadingTextSize = isDesktop ? "text-lg" : "text-sm"

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key={`${type}-loading-screen`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          style={{ zIndex: isDesktop ? 100 : 50 }}
        >
          <div className="flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className={`relative w-${logoSize === 128 ? "32" : "20"} h-${logoSize === 128 ? "32" : "20"}`}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: {
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3DD56D]/30 to-[#2bb757]/30 blur-xl animate-pulse" />
                <Image
                  src="/images/grean-logo-icon.png"
                  alt="GREAN WORLD Logo"
                  width={logoSize}
                  height={logoSize}
                  className="relative z-10 object-contain drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className={`${titleSize} font-black leading-none mb-3`}>
                <span className="text-[#3DD56D]">GREAN</span>
                <span className="text-white ml-1">WORLD</span>
              </h1>
              <p className={`${subtitleSize} text-gray-400 tracking-wide`}>ENERGY TECHNOLOGY PLC</p>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              className="mt-8 flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`${dotSize} bg-[#3DD56D] rounded-full`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className={`mt-4 ${loadingTextSize} text-gray-500`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Initializing Energy Systems...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
