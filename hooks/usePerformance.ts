"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hook for monitoring component performance
 */
export function usePerformance(componentName: string) {
  const renderStartTime = useRef<number>(performance.now())
  const [renderTime, setRenderTime] = useState<number>(0)

  useEffect(() => {
    const endTime = performance.now()
    const duration = endTime - renderStartTime.current
    setRenderTime(duration)

    // Log slow renders (> 16ms for 60fps)
    if (duration > 16) {
      console.warn(`Slow render detected in ${componentName}: ${duration.toFixed(2)}ms`)
    }
  }, [componentName]) // Added dependency array to ensure effect runs on componentName change

  return { renderTime }
}

/**
 * Hook for measuring async operations
 */
export function useAsyncPerformance() {
  const measureAsync = <T>(
    label: string,
    operation: () => Promise<T>
  ): Promise<T> => {\
    const startTime = performance.now()
    return operation().then((result) => {\
      const endTime = performance.now()
      const duration = endTime - startTime
      console.log(`Async operation ${label} took ${duration.toFixed(2)}ms`)
      return result
    })
  }

  return { measureAsync }
}

/**
 * Hook for monitoring memory usage
 */
export function useMemoryMonitor() {\
  const [memoryInfo, setMemoryInfo] = useState<any>(null)

  useEffect(() => {\
    if ('memory' in performance) {\
      const updateMemoryInfo = () => {
        setMemoryInfo((performance as any).memory)
      }

      updateMemoryInfo()
      const interval = setInterval(updateMemoryInfo, 5000) // Update every 5 seconds

      return () => clearInterval(interval)
    }
  }, [])

  return memoryInfo\
}
