"use client"

import { useRef } from "react"
import { useEnergySystemStore } from "@/store/energySystemStore"
import StaticSwitchNode from "@/components/static-nodes/static-switch-node"
import StaticInverterNode from "@/components/static-nodes/inverter"
import PowerFlowAnimation from "@/components/animations/power-flow-animation"

import { playButtonClickSound } from "@/utils/sound"
import { useIsMobile } from "@/hooks/use-mobile"

interface PremiumInteractiveDemoProps {
  showInfoPanel: boolean
  setShowInfoPanel: (show: boolean) => void
  containerWidth: number
  containerHeight: number
  showEnergyAnimation?: boolean
  setShowEnergyAnimation?: (show: boolean) => void
  onSwitchChange?: (active: boolean) => void
}

export default function PremiumInteractiveDemo({
  showInfoPanel,
  setShowInfoPanel,
  containerWidth,
  containerHeight,
  onSwitchChange,
}: PremiumInteractiveDemoProps) {
  const demoRef = useRef<HTMLDivElement>(null)

  const isMobile = useIsMobile()

  const { inverterActive, switchActive, setInverterActive, setSwitchActive } = useEnergySystemStore()

  // Calculate component positions with mobile-specific adjustments
  const getComponentPositions = () => {
    // Use a larger scale for better visibility
    const scale = Math.max(0.7, Math.min(containerWidth / 1200, containerHeight / 800))

    // Center the components in the container
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    if (isMobile) {
      // Mobile layout: Stack components vertically with inverter at top
      // Position inverter at the very top of the container - moved up 1x
      const inverterX = centerX
      const inverterY = Math.max(30, containerHeight * 0.1) // Moved up - closer to top (10% from top, minimum 30px)

      // Position switch at the bottom with proper spacing
      const switchX = centerX
      const switchY = Math.min(containerHeight - 80, containerHeight * 0.85) // Ensure space from bottom

      // PowerFlow connects them vertically through center
      const powerFlowStartY = inverterY + 80 // Start below inverter
      const powerFlowEndY = switchY - 80 // End above switch

      return {
        inverterPosition: { x: inverterX, y: inverterY },
        switchPosition: { x: switchX, y: switchY },
        powerFlowStart: { x: centerX, y: powerFlowStartY },
        powerFlowEnd: { x: centerX + 50, y: powerFlowEndY }, // Slight offset for visual appeal
        scale,
      }
    } else {
      // Desktop layout: Keep original horizontal layout with improvements
      const inverterX = centerX - containerWidth * 0.3 // Position inverter left of center
      const switchX = centerX + containerWidth * 0.25 // Position switch right of center
      const inverterY = centerY - containerHeight * 0.3 // Move inverter up slightly
      const powerFlowY = centerY - containerHeight * 0.1 // Center power flow vertically
      const switchY = centerY // Keep switch centered

      return {
        inverterPosition: { x: inverterX, y: inverterY },
        switchPosition: { x: switchX, y: switchY },
        powerFlowStart: { x: inverterX + 50, y: powerFlowY }, // Start from inverter edge
        powerFlowEnd: { x: switchX - 50, y: powerFlowY }, // End at switch edge
        scale,
      }
    }
  }

  const { inverterPosition, switchPosition, powerFlowStart, powerFlowEnd, scale } = getComponentPositions()

  // Handle inverter activation
  const handleInverterChange = (active: boolean) => {
    setInverterActive(active)
    playButtonClickSound()
  }

  // Handle switch activation
  const handleSwitchChange = (active: boolean) => {
    setSwitchActive(active)
    playButtonClickSound()

    if (onSwitchChange) {
      onSwitchChange(active)
    }
  }

  return (
    <div
      ref={demoRef}
      className="relative flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        minHeight: isMobile ? "500px" : "480px", // Reduced mobile height since no hero section
        margin: "0 auto",
        boxSizing: "border-box",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center", // Align to top on mobile
        justifyContent: "center",
        position: "relative",
        paddingTop: isMobile ? "10px" : "0", // Minimal top padding on mobile
        paddingBottom: isMobile ? "20px" : "0", // Add bottom padding on mobile
      }}
    >
      {/* Power Flow Animation */}
      <PowerFlowAnimation
        inverterOn={inverterActive}
        inverterPosition={powerFlowStart}
        switchPosition={powerFlowEnd}
        scale={scale}
      />

      {/* Inverter Component */}
      <div
        className="absolute"
        style={{
          left: `${inverterPosition.x}px`,
          top: `${inverterPosition.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <StaticInverterNode
          position={{ x: 0, y: 0 }}
          inverterOn={inverterActive}
          onInverterChange={handleInverterChange}
          scale={scale}
          key={inverterActive ? "on" : "off"}
        />
      </div>

      {/* Switch Component */}
      <div
        className="absolute"
        style={{
          left: `${switchPosition.x}px`,
          top: `${switchPosition.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <StaticSwitchNode
          position={{ x: 0, y: 0 }}
          switchOn={switchActive}
          onSwitchChange={handleSwitchChange}
          scale={isMobile ? scale * 2 * 0.8 : scale * 2} // Reduce by 20% on mobile (0.8 = 80% of original)
        />
      </div>
    </div>
  )
}
