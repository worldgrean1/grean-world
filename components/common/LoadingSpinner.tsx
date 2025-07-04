"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "secondary" | "white" | "gray"
  className?: string
  label?: string
}

/**
 * Reusable loading spinner component with consistent styling
 */
export function LoadingSpinner({
  size = "md",
  color = "primary",
  className,
  label = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  }

  const colorClasses = {
    primary: "text-[var(--grean-primary)]",
    secondary: "text-[var(--grean-secondary)]",
    white: "text-white",
    gray: "text-gray-500",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          "border-2 border-current border-t-transparent rounded-full",
          sizeClasses[size],
          colorClasses[color],
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        aria-label={label}
        role="status"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

/**
 * Full-screen loading overlay
 */
export function LoadingOverlay({
  message = "Loading...",
  className,
}: {
  message?: string
  className?: string
}) {
  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingSpinner size="xl" />
      <motion.p
        className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </motion.div>
  )
}
