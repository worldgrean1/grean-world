"use client"

import { useState, useEffect } from "react"
import type { InverterState, InverterMode } from "@/components/static-nodes/inverter/types"

interface UseInverterStateProps {
  inverterOn: boolean
  gridConnected?: boolean
  solarConnected?: boolean
  batteryConnected?: boolean
  loadPercentage?: number
  efficiency?: number
  inputVoltage?: number
  outputVoltage?: number
  frequency?: number
  batteryLevel?: number
  batteryCharging?: boolean
  totalEnergyGenerated?: number
  temperature?: number
  fanSpeed?: number
  mode?: InverterMode
}

export function useInverterState({
  inverterOn,
  gridConnected = true,
  solarConnected = true,
  batteryConnected = true,
  loadPercentage = 45,
  efficiency = 95,
  inputVoltage = 48,
  outputVoltage = 230,
  frequency = 50,
  batteryLevel = 85,
  batteryCharging = false,
  totalEnergyGenerated = 1234.56,
  temperature = 35,
  fanSpeed = 60,
  mode = "normal",
}: UseInverterStateProps) {
  const [state, setState] = useState<InverterState>({
    gridConnected,
    solarConnected,
    batteryConnected,
    temperature,
    loadPercentage,
    efficiency,
    inputVoltage,
    outputVoltage,
    inputFrequency: frequency,
    outputFrequency: frequency,
    batteryLevel,
    batteryCharging,
    totalEnergyGenerated,
    fanSpeed,
    mode,
    selectedMode: 0,
    faultCondition: false,
    screenActive: inverterOn,
    configMode: false,
    displayOption: 0,
    screenBrightness: 100,
    bootupPhase: 0,
    hovered: false,
    showActivatePrompt: !inverterOn,
  })

  const [selectedMode, setSelectedMode] = useState(0)
  const [displayOption, setDisplayOption] = useState(0)

  // Simulate dynamic data updates when inverter is on
  useEffect(() => {
    if (!inverterOn) return

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        loadPercentage: Math.max(20, Math.min(95, prev.loadPercentage + (Math.random() - 0.5) * 10)),
        batteryLevel: Math.max(10, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 2)),
        temperature: Math.max(25, Math.min(65, prev.temperature + (Math.random() - 0.5) * 3)),
        fanSpeed: Math.max(30, Math.min(100, prev.fanSpeed + (Math.random() - 0.5) * 15)),
        totalEnergyGenerated: prev.totalEnergyGenerated + Math.random() * 0.01,
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [inverterOn])

  // Update screen active state
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      screenActive: inverterOn,
      showActivatePrompt: !inverterOn,
    }))
  }, [inverterOn])

  const cycleMode = () => {
    const modes: InverterMode[] = ["normal", "pv", "battery"]
    const nextModeIndex = (selectedMode + 1) % modes.length
    setSelectedMode(nextModeIndex)
    setState((prev) => ({
      ...prev,
      mode: modes[nextModeIndex],
      selectedMode: nextModeIndex,
    }))
  }

  const cycleDisplayOption = () => {
    const nextOption = (displayOption + 1) % 4
    setDisplayOption(nextOption)
    setState((prev) => ({
      ...prev,
      displayOption: nextOption,
    }))
  }

  const getResponsiveDimensions = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      if (width < 768) {
        return { width: "280px", height: "420px", scale: 0.7, isMobile: true }
      } else if (width < 1024) {
        return { width: "320px", height: "472px", scale: 0.8, isMobile: false }
      }
    }
    return { width: "400px", height: "590px", scale: 1, isMobile: false }
  }

  return {
    state,
    cycleMode,
    cycleDisplayOption,
    getResponsiveDimensions,
  }
}
