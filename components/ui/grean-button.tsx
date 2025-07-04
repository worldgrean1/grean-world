"use client"

import type React from "react"

import { motion } from "framer-motion"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GreanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export const GreanButton = forwardRef<HTMLButtonElement, GreanButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      primary: "bg-[#3DD56D] text-white hover:bg-[#2bb757] shadow-lg hover:shadow-xl",
      secondary: "bg-[#2bb757] text-white hover:bg-[#23a455] shadow-md hover:shadow-lg",
      outline: "border border-[#3DD56D] text-[#3DD56D] hover:bg-[#3DD56D] hover:text-white",
    }

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-lg",
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

GreanButton.displayName = "GreanButton"
