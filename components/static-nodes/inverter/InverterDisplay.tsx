"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { InverterState } from "./types"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { InverterLCD } from "@/components/inverter/InverterLCD"
import { InverterControls } from "@/components/inverter/InverterControls"
import { InverterStatusLights } from "@/components/inverter/InverterStatusLights"
import { useInverterState } from "@/hooks/useInverterState"

interface InverterDisplayProps {
  state: InverterState
  inverterOn: boolean
  scale: number
  onInverterChange: (on: boolean) => void
  onCycleMode: () => void
  onCycleDisplayOption: () => void
}

export function InverterDisplay({
  state,
  inverterOn,
  scale,
  onInverterChange,
  onCycleMode,
  onCycleDisplayOption,
}: InverterDisplayProps) {
  // Use global booting state from store
  const { booting } = useEnergySystemStore()

  // Add hover state for 3D effects
  const [hovered, setHovered] = useState(false)

  const { getResponsiveDimensions } = useInverterState({
    inverterOn,
    gridConnected: state.gridConnected,
    solarConnected: state.solarConnected,
    batteryConnected: state.batteryConnected,
    loadPercentage: state.loadPercentage,
    batteryLevel: state.batteryLevel,
    totalEnergyGenerated: state.totalEnergyGenerated,
    temperature: state.temperature,
    fanSpeed: state.fanSpeed,
    mode: state.mode,
  })

  // Responsive dimensions based on screen size
  const [dimensions, setDimensions] = useState(getResponsiveDimensions())

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [getResponsiveDimensions])

  return (
    <motion.div
      className="relative mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        background: "linear-gradient(145deg, rgb(217 218 222), rgb(150 156 167))",
        borderRadius: "15px",
        border: "1px solid rgb(107 112 131)",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        boxShadow: inverterOn
          ? "0 20px 40px rgba(0,0,0,0.45), 0 10px 20px rgba(0,0,0,0.35), inset 0 2px 3px rgba(255,255,255,0.15), 0 0 30px rgba(74, 222, 128, 0.5)"
          : hovered
            ? "0 12px 25px rgba(0,0,0,0.35), 0 6px 10px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.12)"
            : "0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
        rotateX: hovered ? -1 : 0,
        rotateY: hovered ? 1 : 0,
        scale: hovered ? 1.02 : 1,
        y: hovered ? -2 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Enhanced 3D base shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 60%, transparent 80%)",
          transform: "translateY(15px) translateZ(-20px) rotateX(90deg)",
          filter: "blur(15px)",
          zIndex: -2,
        }}
        animate={{
          opacity: hovered ? 0.6 : 0.4,
          scale: hovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Pulsing glow effect when inverter is on */}
      {inverterOn && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.1) 0%, transparent 70%)",
            zIndex: -1,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Subtle idle floating animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          y: [0, -1.5, 0],
          rotateZ: [0, 0.3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Top mounting bracket */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${300 * dimensions.scale}px`,
          height: `${20 * dimensions.scale}px`,
          background: "#0f172a",
          borderRadius: "5px 5px 0 0",
          display: "flex",
          justifyContent: "space-between",
          padding: `0 ${40 * dimensions.scale}px`,
        }}
      >
        {/* Mounting holes */}
        <div
          className="bg-gray-700 rounded-full"
          style={{
            width: `${16 * dimensions.scale}px`,
            height: `${32 * dimensions.scale}px`,
            transform: `translateY(-${4 * dimensions.scale}px)`,
          }}
        ></div>
        <div
          className="bg-gray-700 rounded-full"
          style={{
            width: `${16 * dimensions.scale}px`,
            height: `${32 * dimensions.scale}px`,
            transform: `translateY(-${4 * dimensions.scale}px)`,
          }}
        ></div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: `${96 * dimensions.scale}px`,
          background: "#0f172a",
          borderRadius: "0 0 15px 15px",
          clipPath: "polygon(0 40%, 100% 40%, 100% 100%, 0 100%)",
        }}
      ></div>

      {/* Enhanced 3D Control panel */}
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
        style={{
          width: `${dimensions.isMobile ? 320 * dimensions.scale : 280 * dimensions.scale}px`,
          height: `${400 * dimensions.scale}px`,
          background: "linear-gradient(145deg, #0f172a, #1e293b)",
          borderRadius: "15px",
          padding: `${dimensions.isMobile ? 12 * dimensions.scale : 15 * dimensions.scale}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          boxShadow: inverterOn
            ? "inset 0 3px 8px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.1), 0 0 20px rgba(74, 222, 128, 0.3)"
            : "inset 0 1px 3px rgba(0,0,0,0.3), inset 0 -1px 1px rgba(255,255,255,0.05)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {/* Status indicators row (icons) */}
        <InverterStatusLights
          gridConnected={state.gridConnected}
          solarConnected={state.solarConnected}
          batteryConnected={state.batteryConnected}
          faultCondition={state.faultCondition}
        />

        {/* Enhanced 3D LCD screen area */}
        <InverterLCD state={state} inverterOn={inverterOn} booting={booting} dimensions={dimensions} />

        {/* Enhanced 3D Control buttons row */}
        <InverterControls
          inverterOn={inverterOn}
          onInverterChange={onInverterChange}
          onCycleMode={onCycleMode}
          onCycleDisplayOption={onCycleDisplayOption}
          dimensions={dimensions}
        />
      </motion.div>
    </motion.div>
  )
}
