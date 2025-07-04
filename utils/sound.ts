"use client"

import { AUDIO_SETTINGS } from "./constants"

/**
 * Enhanced sound utility functions with better error handling and performance
 */

// Audio context for Web Audio API fallbacks
let audioContext: AudioContext | null = null

/**
 * Initialize audio context (lazy loading)
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn("Web Audio API not supported")
      return null
    }
  }

  return audioContext
}

/**
 * Play button click sound with enhanced error handling
 */
export function playButtonClickSound(): void {
  if (!AUDIO_SETTINGS.ENABLED || typeof window === "undefined") return

  try {
    // Try HTML5 Audio first (more reliable)
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/button-click-AdQc1yXKue6lUVgw4w9AhwIH9aJWRn.wav")
    audio.volume = AUDIO_SETTINGS.BUTTON_CLICK_VOLUME

    // Use promise-based play with fallback
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to Web Audio API
        fallbackButtonSound()
      })
    }
  } catch (error) {
    // Final fallback
    fallbackButtonSound()
  }
}

/**
 * Play typing sound with enhanced error handling
 */
export function playTypingSound(): void {
  if (!AUDIO_SETTINGS.ENABLED || typeof window === "undefined") return

  try {
    // Try HTML5 Audio first
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/typing-9Pav19edtrZhSxX0MoVaHeylrB2wnQ.wav")
    audio.volume = AUDIO_SETTINGS.TYPING_VOLUME

    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to Web Audio API
        fallbackTypingSound()
      })
    }
  } catch (error) {
    // Final fallback
    fallbackTypingSound()
  }
}

/**
 * Fallback button sound using Web Audio API
 */
function fallbackButtonSound(): void {
  const context = getAudioContext()
  if (!context) return

  try {
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    // Button click sound characteristics
    oscillator.frequency.setValueAtTime(800, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, context.currentTime + 0.1)

    gainNode.gain.setValueAtTime(AUDIO_SETTINGS.BUTTON_CLICK_VOLUME, context.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1)

    oscillator.start(context.currentTime)
    oscillator.stop(context.currentTime + 0.1)
  } catch (error) {
    // Silent fallback - don't log as this is expected in some environments
  }
}

/**
 * Fallback typing sound using Web Audio API
 */
function fallbackTypingSound(): void {
  const context = getAudioContext()
  if (!context) return

  try {
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    // Typing sound characteristics
    oscillator.frequency.setValueAtTime(1200, context.currentTime)

    gainNode.gain.setValueAtTime(AUDIO_SETTINGS.TYPING_VOLUME, context.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05)

    oscillator.start(context.currentTime)
    oscillator.stop(context.currentTime + 0.05)
  } catch (error) {
    // Silent fallback
  }
}

/**
 * Preload audio files for better performance
 */
export function preloadAudioFiles(): void {
  if (!AUDIO_SETTINGS.ENABLED || typeof window === "undefined") return

  const audioFiles = ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/button-click-AdQc1yXKue6lUVgw4w9AhwIH9aJWRn.wav", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/typing-9Pav19edtrZhSxX0MoVaHeylrB2wnQ.wav"]

  audioFiles.forEach((src) => {
    try {
      const audio = new Audio(src)
      audio.preload = "auto"
      audio.load()
    } catch (error) {
      // Ignore preload errors
    }
  })
}

/**
 * Audio manager for better resource management
 */
export class AudioManager {
  private static instance: AudioManager
  private audioPool: Map<string, HTMLAudioElement[]> = new Map()
  private maxPoolSize = 3

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }

  /**
   * Get or create audio element from pool
   */
  private getAudioElement(src: string): HTMLAudioElement | null {
    if (typeof window === "undefined") return null

    let pool = this.audioPool.get(src)
    if (!pool) {
      pool = []
      this.audioPool.set(src, pool)
    }

    // Find available audio element
    let audio = pool.find((a) => a.paused || a.ended)

    if (!audio && pool.length < this.maxPoolSize) {
      try {
        audio = new Audio(src)
        audio.preload = "auto"
        pool.push(audio)
      } catch (error) {
        return null
      }
    }

    return audio || null
  }

  /**
   * Play sound with pooling
   */
  playSound(src: string, volume = 0.5): void {
    if (!AUDIO_SETTINGS.ENABLED) return

    const audio = this.getAudioElement(src)
    if (!audio) return

    try {
      audio.volume = volume
      audio.currentTime = 0
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handle play failure silently
        })
      }
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Cleanup audio resources
   */
  cleanup(): void {
    this.audioPool.forEach((pool) => {
      pool.forEach((audio) => {
        audio.pause()
        audio.src = ""
      })
    })
    this.audioPool.clear()
  }
}

// Export singleton instance
export const audioManager = AudioManager.getInstance()

/**
 * Initialize audio system
 */
export function initializeAudioSystem(): void {
  if (typeof window === "undefined") return

  // Preload audio files
  preloadAudioFiles()

  // Setup cleanup on page unload
  window.addEventListener("beforeunload", () => {
    audioManager.cleanup()
  })
}
