"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { playButtonClickSound } from "@/utils/sound"
import { useRouter } from "next/navigation"
import { useEnergySystemStore } from "@/store/energySystemStore"

// Inline Wall Switch Component
function InlineWallSwitch({
  isOn,
  onToggle,
  disabled = false,
  className = "",
}: {
  isOn: boolean
  onToggle: (value: boolean) => void
  disabled?: boolean
  className?: string
}) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (disabled) return

    playButtonClickSound()

    if (!isOn) {
      // Turn switch ON and redirect to green page
      onToggle(true)
      setTimeout(() => {
        router.push("/green")
      }, 300) // Small delay for visual feedback
    }
  }

  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: 90, height: 140 }}>
      {/* Wall Plate - Dark gray like the image */}
      <div
        className="absolute inset-0"
        style={{
          background: disabled
            ? "linear-gradient(145deg, #2d3748 0%, #1a202c 100%)"
            : "linear-gradient(145deg, #374151 0%, #1f2937 100%)",
          borderRadius: 8,
          border: "1px solid rgba(0, 0, 0, 0.2)",
          boxShadow: disabled
            ? "0 3px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04), inset 0 -1px 0 rgba(0, 0, 0, 0.2)"
            : "0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.3)",
          opacity: disabled ? 0.6 : 1,
        }}
      />

      {/* Switch Cutout/Recess - Large rectangular opening centered */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 70,
          height: 110,
          background: disabled
            ? "linear-gradient(145deg, #000000 0%, #0a0a0a 100%)"
            : "linear-gradient(145deg, #000000 0%, #111827 100%)",
          borderRadius: 6,
          boxShadow: disabled
            ? "inset 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 -1px 2px rgba(255, 255, 255, 0.01)"
            : "inset 0 4px 8px rgba(0, 0, 0, 0.8), inset 0 -2px 4px rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(0, 0, 0, 0.4)",
        }}
      />

      {/* Switch Paddle - White paddle CENTERED in the cutout */}
      <motion.div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: 64,
          height: 104,
          borderRadius: 4,
          background: disabled
            ? "linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 100%)"
            : isOn
              ? "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)"
              : "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
          boxShadow: disabled
            ? "0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
            : isOn
              ? "0 3px 6px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 12px rgba(61, 213, 109, 0.4)"
              : "0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          zIndex: 20,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
        animate={{
          x: "-50%",
          y: "-50%",
          rotateX: disabled ? 0 : isOn ? -1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: disabled ? 200 : 600,
          damping: disabled ? 60 : 40,
          mass: 0.4,
        }}
        onClick={handleClick}
      >
        {/* Position Indicator - Small dot like real switches */}
        <motion.div
          className="absolute"
          style={{
            width: 4,
            height: 4,
            left: "50%",
            transform: "translateX(-50%)",
            background: disabled
              ? "linear-gradient(145deg, #64748b 0%, #475569 100%)"
              : isOn
                ? "linear-gradient(145deg, #3DD56D 0%, #2bb757 100%)"
                : "linear-gradient(145deg, #9ca3af 0%, #6b7280 100%)",
            borderRadius: "50%",
            boxShadow: disabled
              ? "0 1px 1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : isOn
                ? "0 0 6px rgba(61, 213, 109, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                : "0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
          animate={{
            top: disabled ? "50%" : isOn ? "20%" : "75%",
            opacity: disabled ? 0.5 : isOn ? 1 : 0.7,
          }}
          transition={{
            type: "spring",
            stiffness: disabled ? 200 : 400,
            damping: 30,
          }}
        />
      </motion.div>

      {/* Screws - Corner screws like real wall switches */}
      {[
        { top: "6%", left: "10%" },
        { top: "6%", right: "10%" },
        { bottom: "6%", left: "10%" },
        { bottom: "6%", right: "10%" },
      ].map((position, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            ...position,
            width: 6,
            height: 6,
            background: disabled
              ? "linear-gradient(145deg, #475569 0%, #334155 100%)"
              : "linear-gradient(145deg, #6b7280 0%, #374151 100%)",
            borderRadius: "50%",
            boxShadow: disabled
              ? "inset 0 1px 1px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(255, 255, 255, 0.02)"
              : "inset 0 1px 2px rgba(0, 0, 0, 0.5), 0 1px 1px rgba(255, 255, 255, 0.05)",
            border: "0.5px solid rgba(0, 0, 0, 0.3)",
            opacity: disabled ? 0.7 : 1,
          }}
        >
          {/* Screw slot */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 3,
              height: 0.5,
              background: "rgba(0, 0, 0, 0.7)",
              borderRadius: 0.25,
            }}
          />
        </div>
      ))}

      {/* Subtle Glow Effect when ON - More realistic */}
      {isOn && !disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(61, 213, 109, 0.15) 0%, rgba(61, 213, 109, 0.05) 50%, transparent 80%)",
            borderRadius: 6,
            filter: "blur(6px)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Small disabled overlay indicator - KEEP THIS ONE */}
      {disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-red-500/20 text-red-300 text-[8px] px-1 py-0.5 rounded font-bold">DISABLED</div>
        </motion.div>
      )}
    </div>
  )
}

interface StaticSwitchNodeProps {
  position: { x: number; y: number }
  switchOn: boolean
  onSwitchChange?: (value: boolean) => void
  scale?: number
}

export default function StaticSwitchNode({
  position,
  switchOn = false,
  onSwitchChange,
  scale = 1,
}: StaticSwitchNodeProps) {
  const { switchEnabled, powerFlowActive } = useEnergySystemStore()
  const energyColor = "#00ff9d"
  const glowColor = "rgba(0, 255, 157, 0.7)"

  // Calculate responsive dimensions based on scale and screen size
  const getResponsiveDimensions = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      if (width < 768) {
        // Mobile: ensure minimum touch target of 44px
        const minSize = 44
        const calculatedSize = 128 * scale
        const finalSize = Math.max(minSize, calculatedSize)
        return {
          width: finalSize,
          height: finalSize,
          touchPadding: Math.max(0, (minSize - calculatedSize) / 2),
        }
      }
    }
    // Desktop/Tablet: use calculated scale
    const size = 128 * scale
    return { width: size, height: size, touchPadding: 0 }
  }

  const [dimensions, setDimensions] = useState(getResponsiveDimensions())

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [scale])

  const nodeWidth = dimensions.width
  const nodeHeight = dimensions.height

  return (
    <div
      data-node-id="switch"
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-full h-full flex flex-col items-center justify-center select-none"
        style={{
          background: "transparent",
          transformStyle: "preserve-3d",
          padding: `${dimensions.touchPadding}px`,
          minWidth: "44px",
          minHeight: "44px",
        }}
      >
        {/* 3D Base Shadow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 70%)",
            transform: "translateZ(-20px) rotateX(90deg)",
            filter: "blur(8px)",
            zIndex: -2,
            opacity: switchEnabled ? 0.4 : 0.2,
          }}
        />

        {/* Enhanced Drop Shadow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 60%, transparent 80%)",
            transform: "translateY(8px) translateZ(-10px)",
            filter: "blur(12px)",
            zIndex: -1,
            opacity: switchEnabled ? 0.3 : 0.15,
          }}
        />

        {/* Enhanced 3D breathing glow effect - only active when enabled and power flow is active */}
        {switchEnabled && powerFlowActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: switchOn ? [0.3, 0.8] : [0.2, 0.5],
              scale: switchOn ? [0.9, 1.2] : [0.95, 1.1],
            }}
            transition={{
              duration: switchOn ? 3 : 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
            style={{
              background: switchOn
                ? `radial-gradient(circle, ${glowColor} 0%, rgba(0, 255, 157, 0.3) 40%, rgba(0, 255, 157, 0.1) 70%, transparent 90%)`
                : `radial-gradient(circle, rgba(0, 255, 157, 0.4) 0%, rgba(0, 255, 157, 0.2) 40%, rgba(0, 255, 157, 0.05) 70%, transparent 90%)`,
              filter: switchOn ? "blur(15px)" : "blur(12px)",
              transform: "translateZ(5px)",
              zIndex: 0,
            }}
          />
        )}

        {/* Enhanced energy pulse rings - only when enabled and power flow is active */}
        {switchEnabled && powerFlowActive && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: energyColor,
                  borderWidth: switchOn ? "2px" : "1px",
                  transform: `translateZ(${i * 2}px)`,
                  boxShadow: switchOn ? `0 0 ${10 + i * 5}px ${energyColor}` : `0 0 ${5 + i * 2}px ${energyColor}`,
                }}
                initial={{ opacity: 0.6, scale: 0.7 }}
                animate={{
                  opacity: switchOn ? [0.6, 0.2, 0] : [0.3, 0.1, 0],
                  scale: switchOn ? [0.7, 1.6] : [0.8, 1.3],
                }}
                transition={{
                  duration: switchOn ? 2.5 : 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.7,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* 3D Switch container with enhanced depth */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: "translateZ(10px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Switch base shadow for depth */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(145deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))",
              transform: "translateZ(-5px) translateY(2px)",
              filter: "blur(4px)",
              borderRadius: "12px",
              opacity: switchEnabled ? 0.2 : 0.1,
            }}
          />

          <InlineWallSwitch
            isOn={switchOn}
            disabled={!switchEnabled}
            onToggle={(value) => {
              if (onSwitchChange && switchEnabled) {
                onSwitchChange(value)
              }
            }}
            className="z-10"
          />
        </div>

        {/* Enhanced Power ON message with 3D effect */}
        {switchOn && switchEnabled && (
          <motion.div
            className="absolute right-0 bottom-1/2 transform translate-y-1/2 translate-x-full ml-2"
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              y: [0, -2],
            }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            transition={{
              duration: 0.4,
              y: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatType: "reverse",
              },
            }}
            style={{ transform: "translateZ(15px)" }}
          >
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg"
              style={{
                boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              animate={{
                boxShadow: [
                  "0 4px 12px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.2)",
                  "0 6px 16px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{
                  scale: [1, 1.2],
                  opacity: [1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
              />
              <span className="font-semibold tracking-wide">ON</span>
            </motion.div>
          </motion.div>
        )}

        {/* Waiting for power flow message */}
        {switchEnabled && !powerFlowActive && (
          <motion.div
            className="absolute right-0 bottom-1/2 transform translate-y-1/2 translate-x-full ml-2"
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ transform: "translateZ(15px)" }}
          >
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg border border-yellow-400/30">
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{
                  scale: [1, 1.2],
                  opacity: [1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
              />
              <span className="font-semibold tracking-wide">READY</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
