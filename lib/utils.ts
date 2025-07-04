import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to conditionally join class names
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Debounce function for performance optimization
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 *
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Format number with leading zeros
 *
 * @param num - Number to format
 * @param digits - Number of digits
 * @returns Formatted string
 */
export function formatNumber(num: number, digits: number): string {
  return num.toString().padStart(digits, "0")
}

/**
 * Check if device is mobile based on user agent
 *
 * @returns Boolean indicating if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Get responsive dimensions based on container size
 *
 * @param containerWidth - Container width
 * @param containerHeight - Container height
 * @param isMobile - Is mobile device
 * @returns Responsive dimensions object
 */
export function getResponsiveDimensions(containerWidth: number, containerHeight: number, isMobile = false) {
  const scale = Math.max(0.7, Math.min(containerWidth / 1200, containerHeight / 800))

  return {
    scale,
    containerWidth,
    containerHeight,
    isMobile,
    // Calculate component positions
    centerX: containerWidth / 2,
    centerY: containerHeight / 2,
  }
}
