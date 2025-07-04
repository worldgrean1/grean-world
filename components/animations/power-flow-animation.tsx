"use client"

import { motion } from "framer-motion"
import { useEnergySystemStore } from "@/store/energySystemStore"

interface PowerFlowAnimationProps {
  inverterOn: boolean
  inverterPosition: { x: number; y: number }
  switchPosition: { x: number; y: number }
  scale: number
}

export default function PowerFlowAnimation({
  inverterOn,
  inverterPosition,
  switchPosition,
  scale,
}: PowerFlowAnimationProps) {
  const { powerFlowActive } = useEnergySystemStore()

  const energyColor = "#00ff9d"
  const glowColor = "rgba(0, 255, 157, 0.7)"
  const particleCount = 5

  // Only show power flow when both inverter is on AND power flow is active
  const showPowerFlow = inverterOn && powerFlowActive

  // Calculate if this is likely a mobile layout based on positions
  const isMobileLayout = Math.abs(inverterPosition.x - switchPosition.x) < 100

  // Calculate cable curve control points
  const midX = (inverterPosition.x + switchPosition.x) / 2
  const midY = (inverterPosition.y + switchPosition.y) / 2

  // Adjust curve based on layout orientation
  const controlY = isMobileLayout
    ? midY + 20 // For vertical mobile layout, move control point down
    : inverterPosition.y + 40 // For horizontal desktop layout, move control point down more

  const cableOffset = 3 // Distance between parallel cables

  // Move both start and end points down
  const startPointX = inverterPosition.x + 30 // Move start point to the right of inverter center
  const startPointY = inverterPosition.y + 50 // Move start point down by 50 pixels
  const endPointX = isMobileLayout ? switchPosition.x - 30 : switchPosition.x // Move end point to the left on mobile
  const endPointY = switchPosition.y + 60 // Move end point down by 60 pixels (increased from 30)

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        <defs>
          {/* Gradient definition for the power line */}
          <linearGradient id="powerLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: energyColor, stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#4ade80", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: energyColor, stopOpacity: 1 }} />
          </linearGradient>

          {/* Cable texture pattern */}
          <pattern id="cablePattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 4 L8 4" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
          </pattern>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Energy pulse effect */}
          <filter id="energyPulse">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow"
            />
            <feBlend in="SourceGraphic" in2="glow" mode="normal" />
          </filter>

          {/* Cable shadow */}
          <filter id="cableShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Background cable lines - Always visible but dimmed when no power flow */}
        <g style={{ filter: "url(#cableShadow)" }}>
          {/* Lower cable */}
          <path
            d={`M${startPointX} ${startPointY + cableOffset} 
                Q ${midX} ${controlY + cableOffset}, ${endPointX} ${endPointY + cableOffset}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
            opacity={showPowerFlow ? 1 : 0.3}
          />
          {/* Upper cable */}
          <path
            d={`M${startPointX} ${startPointY - cableOffset} 
                Q ${midX} ${controlY - cableOffset}, ${endPointX} ${endPointY - cableOffset}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
            opacity={showPowerFlow ? 1 : 0.3}
          />
          {/* Cable texture */}
          <path
            d={`M${startPointX} ${startPointY} 
                Q ${midX} ${controlY}, ${endPointX} ${endPointY}`}
            fill="none"
            stroke="url(#cablePattern)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity={showPowerFlow ? 0.3 : 0.1}
          />
        </g>

        {/* Main power line - Enhanced visibility when power flows */}
        <path
          d={`M${startPointX} ${startPointY} 
              Q ${midX} ${controlY}, ${endPointX} ${endPointY}`}
          stroke={showPowerFlow ? "url(#powerLineGradient)" : "#1e293b"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity={showPowerFlow ? 1 : 0.3}
          style={{
            filter: showPowerFlow ? "url(#glow)" : "none",
          }}
        />

        {/* Energy pulse effect - Only when power flows */}
        {showPowerFlow && (
          <motion.path
            d={`M${startPointX} ${startPointY} 
                Q ${midX} ${controlY}, ${endPointX} ${endPointY}`}
            stroke={glowColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              strokeWidth: ["8px", "12px", "8px"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              filter: "url(#energyPulse)",
            }}
          />
        )}

        {/* Energy particles - Only when power flows */}
        {showPowerFlow &&
          Array.from({ length: particleCount }).map((_, i) => (
            <g key={`particle-group-${i}`}>
              {/* Main particle */}
              <motion.circle
                r="4"
                fill={energyColor}
                initial={{ opacity: 0.8 }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * (2 / particleCount),
                }}
                style={{
                  filter: "url(#glow)",
                }}
              >
                <animateMotion
                  dur={`${2 + i * 0.2}s`}
                  repeatCount="indefinite"
                  path={`M${startPointX} ${startPointY} Q ${midX} ${controlY}, ${endPointX} ${endPointY}`}
                />
              </motion.circle>

              {/* Particle trail */}
              <motion.circle
                r="6"
                fill="transparent"
                stroke={glowColor}
                strokeWidth="2"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * (1.5 / particleCount),
                }}
              >
                <animateMotion
                  dur={`${2 + i * 0.2}s`}
                  repeatCount="indefinite"
                  path={`M${startPointX} ${startPointY} Q ${midX} ${controlY}, ${endPointX} ${endPointY}`}
                />
              </motion.circle>
            </g>
          ))}

        {/* Power indicator - Only when power flows */}
        {showPowerFlow && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <rect
              x={(startPointX + endPointX) / 2 - 45}
              y={(startPointY + endPointY) / 2 - 40}
              width="90"
              height="22"
              rx="4"
              fill="rgba(0, 20, 24, 0.9)"
              stroke={energyColor}
              strokeWidth="1"
            />
            <text
              x={(startPointX + endPointX) / 2}
              y={(startPointY + endPointY) / 2 - 25}
              fontSize="12"
              fontFamily="monospace"
              fontWeight="500"
              textAnchor="middle"
              fill={energyColor}
              style={{
                filter: "url(#glow)",
              }}
            >
              POWER FLOW
            </text>
          </motion.g>
        )}

        {/* Connection nodes with cable connectors - Enhanced visibility */}
        {[0, 0.5, 1].map((progress, i) => {
          // Calculate positions along the path
          const x = startPointX + progress * (endPointX - startPointX)
          const y = startPointY + progress * (endPointY - startPointY) + progress * (progress - 1) * 8 // Curve adjustment
          return (
            <g key={`connection-${i}`}>
              {/* Cable connector housing */}
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#1e293b"
                stroke="#2d3748"
                strokeWidth="1"
                opacity={showPowerFlow ? 1 : 0.5}
              />
              {/* Connection point */}
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={showPowerFlow ? energyColor : "#1e293b"}
                opacity={showPowerFlow ? 1 : 0.5}
                style={{
                  filter: showPowerFlow ? "url(#glow)" : "none",
                }}
              />
              {showPowerFlow && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="transparent"
                  stroke={glowColor}
                  strokeWidth="2"
                  initial={{ opacity: 0.3, scale: 1 }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
