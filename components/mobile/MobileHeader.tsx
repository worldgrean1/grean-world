"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "@/hooks/useTheme"

export function MobileHeader() {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative z-20 flex justify-center items-center pt-3 pb-1 h-16"
    >
      <div className="flex items-center gap-2">
        <motion.div className="logo-container relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div className="logo-glow-effect"></div>
          <div className="relative w-8 h-8">
            <Image
              src="/images/grean-logo-icon.png"
              alt="GREAN WORLD Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        </motion.div>
        <div>
          <motion.div className="flex flex-col" transition={{ duration: 0.5 }}>
            <div className="flex items-center">
              <span className={`text-[#3DD56D] font-bold tracking-wide text-base`}>GREAN</span>
              <span className={`font-bold tracking-wide ml-1 text-base ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                WORLD
              </span>
            </div>
            <p className={`tracking-wide text-[10px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              ENERGY TECHNOLOGY PLC
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
