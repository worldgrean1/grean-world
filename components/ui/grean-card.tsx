"use client"

import type React from "react"

import { motion } from "framer-motion"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GreanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pattern?: "dots" | "grid" | "none"
  gradient?: boolean
  children: React.ReactNode
}

export const GreanCard = forwardRef<HTMLDivElement, GreanCardProps>(
  ({ className, pattern = "none", gradient = false, children, ...props }, ref) => {
    const baseClasses = "rounded-lg border p-6 shadow-sm"

    const patternClasses = {
      dots: "bg-[radial-gradient(circle_at_1px_1px,rgba(61,213,109,0.15)_1px,transparent_0)] bg-[length:20px_20px]",
      grid: "bg-[linear-gradient(rgba(61,213,109,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(61,213,109,0.1)_1px,transparent_1px)] bg-[length:20px_20px]",
      none: "",
    }

    const gradientClass = gradient
      ? "bg-gradient-to-br from-white/80 to-green-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm"
      : "bg-white dark:bg-slate-900"

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          gradientClass,
          patternClasses[pattern],
          "border-green-200/30 dark:border-green-800/30",
          className,
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)

GreanCard.displayName = "GreanCard"
