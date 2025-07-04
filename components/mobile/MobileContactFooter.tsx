"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"
import { GreanCard } from "@/components/ui/grean-card"

export function MobileContactFooter() {
  const { isDark } = useTheme()

  return (
    <div className="relative z-40 bg-transparent h-20 flex-shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="px-4 pb-2 pt-1 h-full"
      >
        <div className="mx-auto max-w-[280px] h-full">
          <GreanCard
            pattern="dots"
            gradient
            className="relative backdrop-blur-md shadow-xl overflow-hidden border h-16 p-2"
            style={{
              backdropFilter: "blur(16px)",
              backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
              borderColor: isDark ? "rgba(61, 213, 109, 0.3)" : "rgba(43, 183, 87, 0.4)",
            }}
          >
            {/* Background accent elements */}
            <div className="absolute -bottom-3 -right-3 rounded-full w-12 h-12 bg-[#3DD56D]/8"></div>
            <div className="absolute -top-3 -left-3 rounded-full w-8 h-8 bg-[#3DD56D]/8"></div>

            {/* Horizontal layout for compact footer */}
            <div className="flex items-center justify-center h-full gap-3">
              {/* QR Code */}
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3DD56D] to-[#2bb757] rounded blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <img
                  src="/images/qr-greanworld.png"
                  alt="GREAN WORLD QR Code"
                  className="relative rounded shadow-md group-hover:scale-105 transition-all duration-300 w-10 h-10"
                  style={{ background: "white" }}
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col justify-center">
                <h3
                  className={`font-bold leading-tight mb-0.5 text-[11px] ${
                    isDark
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[var(--grean-primary)] to-[var(--grean-secondary)]"
                      : "text-[var(--grean-secondary)]"
                  }`}
                >
                  Contact GREAN WORLD
                </h3>
                <span className={`font-medium text-[9px] ${isDark ? "text-[#3DD56D]/80" : "text-[#2bb757]/90"}`}>
                  <motion.span
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    Scan for Contact Info
                  </motion.span>
                </span>
              </div>
            </div>
          </GreanCard>
        </div>
      </motion.div>
    </div>
  )
}
