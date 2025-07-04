"use client"

import type React from "react"

/**
 * Enhanced error logging and monitoring utilities
 */

export interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  sessionId?: string
  timestamp?: number
  userAgent?: string
  url?: string
}

export interface ErrorReport {
  message: string
  stack?: string
  context: ErrorContext
  severity: "low" | "medium" | "high" | "critical"
}

/**
 * Log error with enhanced context information
 *
 * @param message - Error message
 * @param error - Error object
 * @param context - Additional context
 * @param severity - Error severity level
 */
export function logError(
  message: string,
  error: Error,
  context: ErrorContext = {},
  severity: ErrorReport["severity"] = "medium",
) {
  const errorReport: ErrorReport = {
    message,
    stack: error.stack,
    context: {
      ...context,
      timestamp: Date.now(),
      userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    },
    severity,
  }

  // Console logging with color coding
  const colors = {
    low: "#10b981", // green
    medium: "#f59e0b", // yellow
    high: "#ef4444", // red
    critical: "#dc2626", // dark red
  }

  console.group(`%c[GREAN WORLD] ${severity.toUpperCase()} ERROR`, `color: ${colors[severity]}; font-weight: bold`)
  console.error(`Message: ${message}`)
  console.error(`Error:`, error)
  console.table(errorReport.context)
  console.groupEnd()

  // In production, send to monitoring service
  if (process.env.NODE_ENV === "production") {
    sendToMonitoringService(errorReport)
  }
}

/**
 * Log warning with context
 *
 * @param message - Warning message
 * @param details - Additional details
 * @param context - Error context
 */
export function logWarning(message: string, details?: any, context: ErrorContext = {}) {
  console.group(`%c[GREAN WORLD] WARNING`, "color: #f59e0b; font-weight: bold")
  console.warn(`Message: ${message}`)
  if (details) console.warn("Details:", details)
  if (Object.keys(context).length > 0) console.table(context)
  console.groupEnd()
}

/**
 * Log info with context
 *
 * @param message - Info message
 * @param details - Additional details
 * @param context - Error context
 */
export function logInfo(message: string, details?: any, context: ErrorContext = {}) {
  console.group(`%c[GREAN WORLD] INFO`, "color: #3b82f6; font-weight: bold")
  console.info(`Message: ${message}`)
  if (details) console.info("Details:", details)
  if (Object.keys(context).length > 0) console.table(context)
  console.groupEnd()
}

/**
 * Performance logging utility
 *
 * @param label - Performance label
 * @param fn - Function to measure
 * @returns Function result
 */
export async function logPerformance<T>(label: string, fn: () => T | Promise<T>): Promise<T> {
  const start = performance.now()

  try {
    const result = await fn()
    const duration = performance.now() - start

    console.log(
      `%c[GREAN WORLD] PERFORMANCE: ${label}`,
      "color: #10b981; font-weight: bold",
      `${duration.toFixed(2)}ms`,
    )

    return result
  } catch (error) {
    const duration = performance.now() - start
    logError(`Performance measurement failed for ${label}`, error as Error, {
      component: "PerformanceLogger",
      action: label,
    })
    throw error
  }
}

/**
 * Send error report to monitoring service (placeholder)
 * In a real application, this would integrate with services like Sentry, LogRocket, etc.
 *
 * @param errorReport - Error report to send
 */
async function sendToMonitoringService(errorReport: ErrorReport) {
  try {
    // Placeholder for actual monitoring service integration
    // Example: Sentry, LogRocket, DataDog, etc.

    // For now, we'll just log that we would send it
    console.log("📊 Would send to monitoring service:", errorReport)

    // Example implementation:
    // await fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorReport)
    // })
  } catch (monitoringError) {
    console.error("Failed to send error to monitoring service:", monitoringError)
  }
}

/**
 * React Error Boundary helper
 */
export class ErrorBoundaryLogger {
  static logComponentError(error: Error, errorInfo: React.ErrorInfo, componentName: string) {
    logError(
      "React component error",
      error,
      {
        component: componentName,
        action: "render",
        stack: errorInfo.componentStack,
      },
      "high",
    )
  }
}

/**
 * Global error handler setup
 */
export function setupGlobalErrorHandling() {
  if (typeof window === "undefined") return

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    logError("Unhandled promise rejection", new Error(event.reason), { action: "unhandledrejection" }, "high")
  })

  // Handle global JavaScript errors
  window.addEventListener("error", (event) => {
    logError(
      "Global JavaScript error",
      event.error || new Error(event.message),
      {
        action: "globalerror",
        url: event.filename,
        line: event.lineno?.toString(),
        column: event.colno?.toString(),
      },
      "high",
    )
  })
}
