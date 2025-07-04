"use client"

import { motion } from "framer-motion"
import type { InverterState } from "../static-nodes/inverter/types"

interface InverterLCDProps {
  state: InverterState
  inverterOn: boolean
  booting: boolean
  dimensions: {
    isMobile: boolean
    scale: number
  }
}

export function InverterLCD({ state, inverterOn, booting, dimensions }: InverterLCDProps) {
  const formatNumber = (num: number, digits: number) => {
    return num.toString().padStart(digits, "0")
  }

  return (
    <motion.div
      className={`w-full ${dimensions.isMobile ? "h-[240px]" : "h-[280px]"} mb-4 p-2 relative overflow-hidden lcd-screen flex flex-col items-center justify-center`}
      style={{
        background: inverterOn ? "linear-gradient(145deg, #052e16, #064e3b)" : "linear-gradient(145deg, #000, #1a1a1a)",
        borderRadius: "8px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        opacity: inverterOn ? 1 : 0.5,
        filter: inverterOn ? "brightness(100%)" : "brightness(30%)",
        visibility: "visible",
        color: "#10b981",
        fontFamily: "monospace",
        transformStyle: "preserve-3d",
      }}
      animate={{
        boxShadow: inverterOn
          ? "inset 0 6px 16px rgba(0,0,0,0.7), inset 0 -2px 4px rgba(255,255,255,0.1), 0 0 20px rgba(0,255,128,0.4)"
          : "inset 0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.05)",
        transform: inverterOn ? "translateZ(5px)" : "translateZ(0px)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {/* LCD screen glow effect when inverter is on */}
      {inverterOn && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0, 255, 128, 0.05) 0%, transparent 60%)",
            zIndex: -1,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      {booting ? (
        <div className="flex flex-col items-center justify-center w-full h-full animate-pulse">
          <div
            className="text-emerald-300 text-base mb-6 font-bold"
            style={{ textShadow: "0 0 8px #10b981, 0 0 2px #fff" }}
          >
            POWER INITIALIZING
          </div>
          <div className="w-4/5 h-2 bg-emerald-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-emerald-400 animate-pulse"
              style={{ width: "100%", boxShadow: "0 0 8px #10b981" }}
            ></div>
          </div>
          <div className="text-[11px] text-emerald-200 mt-2 font-mono" style={{ textShadow: "0 0 4px #10b981" }}>
            SYSTEM BOOT SEQUENCE
          </div>
          <div
            className="absolute bottom-8 left-0 right-0 text-[10px] text-emerald-200 font-mono opacity-90"
            style={{ textShadow: "0 0 4px #10b981" }}
          >
            <div className="flex flex-col items-center">
              <div>CHECKING HARDWARE...</div>
              <div className="mt-1">LOADING FIRMWARE v3.2.1</div>
              <div className="mt-1">INITIALIZING POWER MODULES</div>
            </div>
          </div>
        </div>
      ) : inverterOn ? (
        <div className="flex flex-col h-full w-full text-emerald-400 relative">
          {/* Top mode icons/labels */}
          <div className="w-full flex justify-between mb-2">
            <div className="text-xs flex flex-col items-center text-emerald-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"></circle>
                <path d="M8 13C8.5 15 10 16 12 16C14 16 15.5 15 16 13" stroke="currentColor" strokeWidth="1.5"></path>
                <circle cx="9" cy="9" r="1.5" fill="currentColor"></circle>
                <circle cx="15" cy="9" r="1.5" fill="currentColor"></circle>
              </svg>
              <span className="text-[10px]">Normal</span>
            </div>
            <div className="text-xs flex flex-col items-center text-emerald-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"></rect>
                <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
              </svg>
              <span className="text-[10px]">PV Mode</span>
            </div>
            <div className="text-xs flex flex-col items-center text-emerald-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="8" y="6" width="8" height="12" stroke="currentColor" strokeWidth="1.5" fill="none"></rect>
                <line x1="10" y1="4" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5"></line>
                <line x1="14" y1="4" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"></line>
                <line x1="10" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.5"></line>
              </svg>
              <span className="text-[10px]">Batt. Mode</span>
            </div>
          </div>

          {/* Two-column grid for data */}
          <div className="grid grid-cols-2 gap-1 flex-1">
            <div className="flex flex-col justify-between">
              <div className="mb-1">
                <div className="text-xs flex items-center">AC INPUT</div>
                <div className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mr-1">
                    <path d="M12 3L12 7M12 7L9 7M12 7L15 7" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M5 21L19 21" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M5 7L7 7M17 7L19 7" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M7 7L7 16M17 7L17 16" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M7 11L17 11" stroke="currentColor" strokeWidth="1.5"></path>
                  </svg>
                  <div className="text-2xl font-digital">
                    00<span className="text-xs ml-1">Hz</span>
                  </div>
                </div>
              </div>
              <div className="mb-1">
                <div className="text-xs flex items-center">TOTAL ENERGY</div>
                <div className="text-2xl font-digital">
                  {formatNumber(Math.floor(state.totalEnergyGenerated * 100), 5)}
                  <span className="text-xs ml-1">kWh</span>
                </div>
              </div>
              <div className="mb-1">
                <div className="text-xs flex items-center">PV INPUT</div>
                <div className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mr-1">
                    <rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"></rect>
                    <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                    <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                    <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                    <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
                  </svg>
                  <div className="text-2xl font-digital">
                    48<span className="text-xs ml-1">Vdc</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="mb-1">
                <div className="text-xs flex items-center">AC OUTPUT</div>
                <div className="text-2xl font-digital">
                  50<span className="text-xs ml-1">Hz</span>
                </div>
              </div>
              <div className="mb-1">
                <div className="text-xs">LOAD CAP</div>
                <div className="text-2xl font-digital">
                  {formatNumber(state.loadPercentage, 3)}
                  <span className="text-xs ml-1">%</span>
                </div>
              </div>
              <div className="mb-1">
                <div className="text-xs flex items-center">BATT CAP</div>
                <div className="text-2xl font-digital">
                  {formatNumber(state.batteryLevel, 3)}
                  <span className="text-xs ml-1">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="mt-auto mb-1 border-t border-emerald-900/50 pt-1 text-[10px] flex justify-between">
            <div>TEMP: {formatNumber(state.temperature, 2)}°C</div>
            <div>FAN: {formatNumber(state.fanSpeed, 3)}%</div>
            <div>GRID MODE</div>
          </div>

          {/* Decorative SVG (optional) */}
          <div className="h-8 flex-shrink-0"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-700">OFF</div>
      )}
    </motion.div>
  )
}
