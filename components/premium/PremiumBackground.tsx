"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"

export default function PremiumBackground() {
  const { isDark } = useTheme()

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
        }`}
        animate={{
          background: isDark
            ? [
                "linear-gradient(45deg, #0f172a, #1e293b, #334155)",
                "linear-gradient(135deg, #1e293b, #334155, #0f172a)",
                "linear-gradient(225deg, #334155, #0f172a, #1e293b)",
                "linear-gradient(315deg, #0f172a, #1e293b, #334155)",
              ]
            : [
                "linear-gradient(45deg, #f0fdf4, #ecfdf5, #d1fae5)",
                "linear-gradient(135deg, #ecfdf5, #d1fae5, #f0fdf4)",
                "linear-gradient(225deg, #d1fae5, #f0fdf4, #ecfdf5)",
                "linear-gradient(315deg, #f0fdf4, #ecfdf5, #d1fae5)",
              ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-green-400/20" : "bg-green-600/30"}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className={`absolute inset-0 opacity-10 ${isDark ? "bg-green-400" : "bg-green-600"}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}
