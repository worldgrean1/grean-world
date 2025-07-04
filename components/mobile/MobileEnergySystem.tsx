"use client"

import { motion } from "framer-motion"
import StaticInverterNode from "@/components/static-nodes/inverter"
import StaticSwitchNode from "@/components/static-nodes/static-switch-node"
import PowerFlowAnimation from "@/components/animations/power-flow-animation"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { useMobileLayout } from "@/hooks/useMobileLayout"

export function MobileEnergySystem() {
  const { inverterActive, switchActive, setInverterActive, setSwitchActive } = useEnergySystemStore()

  const {
    inverterPosition,
    switchPosition,
    powerFlowStart,
    powerFlowEnd,
    componentScale,
    switchScale,
    containerHeight,
    isReady,
  } = useMobileLayout()

  const handleInverterChange = (active: boolean) => {
    setInverterActive(active)
  }

  const handleSwitchChange = (active: boolean) => {
    setSwitchActive(active)
  }

  if (!isReady) {
    return (
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-green-400 text-sm">Loading energy system...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full flex-1 overflow-hidden"
      style={{ minHeight: Math.max(containerHeight, 400) }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Power Flow Animation - Centered between Inverter and Switch */}
      <PowerFlowAnimation
        inverterOn={inverterActive}
        inverterPosition={powerFlowStart}
        switchPosition={powerFlowEnd}
        scale={componentScale}
      />

      {/* Inverter Component - Positioned at Top (aligned with Header) */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute"
        style={{
          left: `${Math.max(0, Math.min(inverterPosition.x, window?.innerWidth || 375))}px`,
          top: `${Math.max(0, inverterPosition.y)}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <StaticInverterNode
          position={{ x: 0, y: 0 }}
          inverterOn={inverterActive}
          onInverterChange={handleInverterChange}
          scale={Math.max(0.3, Math.min(componentScale, 1))}
        />
      </motion.div>

      {/* Switch Component - Positioned to align with top edge of Contact section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute"
        style={{
          left: `${Math.max(0, Math.min(switchPosition.x, window?.innerWidth || 375))}px`,
          top: `${Math.max(0, switchPosition.y)}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <StaticSwitchNode
          position={{ x: 0, y: 0 }}
          switchOn={switchActive}
          onSwitchChange={handleSwitchChange}
          scale={Math.max(0.3, Math.min(switchScale, 1))}
        />
      </motion.div>
    </motion.div>
  )
}
