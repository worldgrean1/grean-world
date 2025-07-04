"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface MobileLoadingScreenProps {
  isLoading?: boolean
  onLoadingComplete?: () => void
}

export function MobileLoadingScreen({ isLoading = true, onLoadingComplete }: MobileLoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
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
                className="relative w-20 h-20"
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
                  width={80}
                  height={80}
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
              <h1 className="text-2xl font-bold mb-2">
                <span className="text-[#3DD56D]">GREAN</span>
                <span className="text-white ml-1">WORLD</span>
              </h1>
              <p className="text-sm text-gray-400 tracking-wide">ENERGY TECHNOLOGY PLC</p>
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
                  className="w-2 h-2 bg-[#3DD56D] rounded-full"
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
              className="mt-4 text-sm text-gray-500"
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
