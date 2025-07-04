/**
 * Application constants and configuration
 */

// Brand colors from design system
export const BRAND_COLORS = {
  PRIMARY: "#3DD56D",
  SECONDARY: "#2bb757",
  ACCENT: "#23a455",
  SUCCESS: "#22c55e",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#3b82f6",
} as const

// Animation durations for consistency
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  EXTRA_SLOW: 0.8,
} as const

// Breakpoints matching Tailwind CSS
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const

// Component sizing constants
export const COMPONENT_SIZES = {
  INVERTER: {
    WIDTH: 400,
    HEIGHT: 590,
    MIN_SCALE: 0.35,
    MAX_SCALE: 1.0,
  },
  SWITCH: {
    WIDTH: 128,
    HEIGHT: 128,
    MIN_SCALE: 0.5,
    MAX_SCALE: 2.0,
  },
} as const

// Audio settings
export const AUDIO_SETTINGS = {
  BUTTON_CLICK_VOLUME: 0.3,
  TYPING_VOLUME: 0.2,
  ENABLED: true,
} as const

// Contact information
export const CONTACT_INFO = {
  PHONES: ["+251 913 330000", "+251 910 212989"],
  EMAILS: ["info@greanworld.com", "sileshi@greanworld.com"],
  ADDRESS: "Addis Ababa, Ethiopia",
  SOCIAL: {
    FACEBOOK: "https://facebook.com/greanworld.et",
    TWITTER: "https://twitter.com/GreanWorld",
    LINKEDIN: "https://linkedin.com/company/greanworld",
    INSTAGRAM: "https://instagram.com/greanworldet",
  },
} as const

// Loading and animation settings
export const UI_SETTINGS = {
  LOADING_DURATION: 2500,
  TYPING_SPEEDS: {
    SLOW: 100,
    MEDIUM: 50,
    FAST: 30,
  },
  SCROLL_DEBOUNCE: 150,
} as const
