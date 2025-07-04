import React from "react"
/**
 * Performance optimization utilities
 */

/**
 * Preload an image for better performance
 *
 * @param src - Image source URL
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous" // Prevent CORS issues
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preload multiple images
 *
 * @param sources - Array of image source URLs
 * @returns Promise that resolves when all images are loaded
 */
export async function preloadImages(sources: string[]): Promise<void> {
  const promises = sources.map(preloadImage)
  await Promise.all(promises)
}

/**
 * Lazy load a component with error boundary
 *
 * @param importFn - Dynamic import function
 * @param fallback - Fallback component
 * @returns Lazy loaded component
 */
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType,
) {
  return React.lazy(async () => {
    try {
      return await importFn()
    } catch (error) {
      console.error("Failed to load component:", error)
      // Return fallback or empty component
      return {
        default: fallback || (() => null),
      }
    }
  })
}

/**
 * Optimize animation frame requests
 */
export class AnimationFrameManager {
  private callbacks = new Set<() => void>()
  private rafId: number | null = null

  add(callback: () => void) {
    this.callbacks.add(callback)
    this.scheduleFrame()
  }

  remove(callback: () => void) {
    this.callbacks.delete(callback)
    if (this.callbacks.size === 0 && this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  private scheduleFrame() {
    if (this.rafId) return

    this.rafId = requestAnimationFrame(() => {
      this.callbacks.forEach((callback) => {
        try {
          callback()
        } catch (error) {
          console.error("Animation frame callback error:", error)
        }
      })
      this.rafId = null
      if (this.callbacks.size > 0) {
        this.scheduleFrame()
      }
    })
  }
}

// Global animation frame manager instance
export const animationFrameManager = new AnimationFrameManager()

/**
 * Memory-efficient event listener manager
 */
export class EventListenerManager {
  private listeners = new Map<string, Set<EventListener>>()

  add(element: EventTarget, event: string, listener: EventListener, options?: AddEventListenerOptions) {
    const key = `${event}-${element.constructor.name}`
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }

    this.listeners.get(key)!.add(listener)
    element.addEventListener(event, listener, options)
  }

  remove(element: EventTarget, event: string, listener: EventListener) {
    const key = `${event}-${element.constructor.name}`
    const listeners = this.listeners.get(key)

    if (listeners) {
      listeners.delete(listener)
      if (listeners.size === 0) {
        this.listeners.delete(key)
      }
    }

    element.removeEventListener(event, listener)
  }

  removeAll() {
    this.listeners.clear()
  }
}
