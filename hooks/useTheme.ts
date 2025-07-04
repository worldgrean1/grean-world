"use client"

import { useState, useEffect } from "react"

interface UseThemeReturn {
  isDark: boolean
  isLight: boolean
  theme: "light" | "dark"
  toggleTheme: () => void
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark")
    } else if (systemPrefersDark) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return {
    isDark: theme === "dark",
    isLight: theme === "light",
    theme,
    toggleTheme,
  }
}
