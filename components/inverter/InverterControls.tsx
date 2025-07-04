"use client"

import { motion } from "framer-motion"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { playButtonClickSound } from "@/utils/sound"

interface InverterControlsProps {
  inverterOn: boolean
  onInverterChange: (on: boolean) => void
  onCycleMode: () => void
  onCycleDisplayOption: () => void
  dimensions: {
    isMobile: boolean
    scale: number
  }
}

export function InverterControls({
  inverterOn,
  onInverterChange,
  onCycleMode,
  onCycleDisplayOption,
  dimensions,
}: InverterControlsProps) {
  const { booting, startEnergySystem } = useEnergySystemStore()

  const handleConf = () => {
    if (!booting && !inverterOn) {
      playButtonClickSound()
      onCycleMode()
    }
  }

  const handleSelect = () => {
    if (!booting && !inverterOn) {
      playButtonClickSound()
      onCycleDisplayOption()
    }
  }

  const handleStop = () => {
    if (!booting) {
      playButtonClickSound()
      onInverterChange(false)
    }
  }

  const handleStart = () => {
    if (!booting && !inverterOn) {
      playButtonClickSound()
      startEnergySystem() // Use the new coordinated startup sequence
    }
  }

  return (
    <div className={`w-full flex ${dimensions.isMobile ? "justify-around" : "justify-between"} mt-4`}>
      {/* CONF Button with 3D effects */}
      <div className="flex flex-col items-center">
        <motion.button
          tabIndex={0}
          className={`${dimensions.isMobile ? "w-10 h-10" : "w-12 h-12"} relative focus:outline-none`}
          onClick={handleConf}
          disabled={booting || inverterOn}
          whileHover={!booting && !inverterOn ? { scale: 1.05, y: -1 } : {}}
          whileTap={!booting && !inverterOn ? { scale: 0.95, y: 1 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            style={{
              backgroundColor: "#1e293b",
              border: "2px solid #3b82f6",
              transformStyle: "preserve-3d",
              opacity: booting || inverterOn ? 0.5 : 1,
            }}
            className={`${dimensions.isMobile ? "w-8 h-8" : "w-10 h-10"} mx-auto rounded-full flex items-center justify-center`}
            animate={{
              boxShadow:
                !booting && !inverterOn
                  ? [
                      "0 0 8px #3b82f6, 0 1px 1px #fff1 inset, 0 4px 8px rgba(0,0,0,0.3)",
                      "0 0 12px #3b82f6, 0 1px 1px #fff1 inset, 0 6px 12px rgba(0,0,0,0.4)",
                    ]
                  : "0 0 4px #3b82f6, 0 1px 1px #fff1 inset, 0 2px 4px rgba(0,0,0,0.2)",
            }}
            transition={{
              duration: 2,
              repeat: !booting && !inverterOn ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 6L8 12L14 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.button>
        <span className={`text-xs mt-1 ${booting || inverterOn ? "text-blue-400/50" : "text-blue-400"}`}>CONF</span>
      </div>

      {/* SELECT Button with 3D effects */}
      <div className="flex flex-col items-center">
        <motion.button
          tabIndex={0}
          className={`${dimensions.isMobile ? "w-10 h-10" : "w-12 h-12"} relative focus:outline-none`}
          onClick={handleSelect}
          disabled={booting || inverterOn}
          whileHover={!booting && !inverterOn ? { scale: 1.05, y: -1 } : {}}
          whileTap={!booting && !inverterOn ? { scale: 0.95, y: 1 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            style={{
              backgroundColor: "#1e293b",
              border: "2px solid #14b8a6",
              transformStyle: "preserve-3d",
              opacity: booting || inverterOn ? 0.5 : 1,
            }}
            className={`${dimensions.isMobile ? "w-8 h-8" : "w-10 h-10"} mx-auto rounded-full flex items-center justify-center`}
            animate={{
              boxShadow:
                !booting && !inverterOn
                  ? [
                      "0 0 8px #14b8a6, 0 1px 1px #fff1 inset, 0 4px 8px rgba(0,0,0,0.3)",
                      "0 0 12px #14b8a6, 0 1px 1px #fff1 inset, 0 6px 12px rgba(0,0,0,0.4)",
                    ]
                  : "0 0 4px #14b8a6, 0 1px 1px #fff1 inset, 0 2px 4px rgba(0,0,0,0.2)",
            }}
            transition={{
              duration: 2,
              repeat: !booting && !inverterOn ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 5L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.button>
        <span className={`text-xs mt-1 ${booting || inverterOn ? "text-teal-400/50" : "text-teal-400"}`}>SELECT</span>
      </div>

      {/* STOP Button with 3D effects */}
      <div className="flex flex-col items-center">
        <motion.button
          tabIndex={0}
          className={`${dimensions.isMobile ? "w-10 h-10" : "w-12 h-12"} relative focus:outline-none`}
          onClick={handleStop}
          disabled={booting}
          whileHover={!booting ? { scale: 1.05, y: -1 } : {}}
          whileTap={!booting ? { scale: 0.95, y: 2 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            style={{
              backgroundColor: "#1e293b",
              border: "2px solid #ef4444",
              transformStyle: "preserve-3d",
              opacity: booting ? 0.5 : 1,
            }}
            className={`${dimensions.isMobile ? "w-8 h-8" : "w-10 h-10"} mx-auto rounded-full flex items-center justify-center`}
            animate={{
              boxShadow: !booting
                ? [
                    "0 0 10px #ef4444, 0 1px 1px #fff1 inset, 0 4px 8px rgba(0,0,0,0.3)",
                    "0 0 15px #ef4444, 0 1px 1px #fff1 inset, 0 6px 12px rgba(0,0,0,0.4)",
                  ]
                : "0 0 5px #ef4444, 0 1px 1px #fff1 inset, 0 2px 4px rgba(0,0,0,0.2)",
              y: !booting ? [1, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: !booting ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.button>
        <span className={`text-xs mt-1 font-medium ${booting ? "text-red-400/50" : "text-red-400"}`}>STOP</span>
      </div>

      {/* Enhanced START Button */}
      <div className="flex flex-col items-center relative">
        {/* Enhanced floating info message with arrow, only when inverter is OFF and not booting */}
        {!inverterOn && !booting && (
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="bg-emerald-700 text-white text-xs px-3 py-2 rounded shadow-lg mb-1 font-semibold relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded blur opacity-30"></div>
              <span className="relative">
                Click <span className="font-bold text-emerald-200">START</span> to begin
              </span>
            </div>
            {/* Enhanced Arrow SVG */}
            <motion.svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                y: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <path d="M16 0V18" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
              <path d="M8 10L16 18L24 10" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
            </motion.svg>
          </motion.div>
        )}

        {/* Booting indicator */}
        {booting && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-blue-700 text-white text-xs px-3 py-2 rounded shadow-lg mb-1 font-semibold">
              <span>System Starting...</span>
            </div>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <motion.button
          className={`${dimensions.isMobile ? "w-10 h-10" : "w-12 h-12"} relative focus:outline-none`}
          tabIndex={0}
          onClick={handleStart}
          disabled={booting || inverterOn}
          whileHover={!booting && !inverterOn ? { scale: 1.08, y: -2 } : {}}
          whileTap={!booting && !inverterOn ? { scale: 0.92, y: 1 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            style={{
              backgroundColor: "#1e293b",
              border: booting ? "2px solid #3b82f6" : "2px solid #22c55e",
              transformStyle: "preserve-3d",
              opacity: inverterOn ? 0.5 : 1,
            }}
            className={`${dimensions.isMobile ? "w-8 h-8" : "w-10 h-10"} mx-auto rounded-full flex items-center justify-center`}
            animate={{
              boxShadow: booting
                ? [
                    "0 0 10px #3b82f6, 0 1px 1px #fff1 inset, 0 0 10px #3b82f655 inset, 0 4px 8px rgba(0,0,0,0.3)",
                    "0 0 15px #3b82f6, 0 1px 1px #fff1 inset, 0 0 15px #3b82f655 inset, 0 6px 12px rgba(0,0,0,0.4)",
                  ]
                : !inverterOn
                  ? [
                      "0 0 10px #22c55e, 0 1px 1px #fff1 inset, 0 0 10px #10b98155 inset, 0 4px 8px rgba(0,0,0,0.3)",
                      "0 0 15px #22c55e, 0 1px 1px #fff1 inset, 0 0 15px #10b98155 inset, 0 6px 12px rgba(0,0,0,0.4)",
                    ]
                  : "0 0 5px #22c55e, 0 1px 1px #fff1 inset, 0 0 5px #10b98155 inset, 0 2px 4px rgba(0,0,0,0.2)",
              scale: booting ? [1, 1.02] : !inverterOn ? [1, 1.02] : 1,
              rotate: booting ? [0, 360] : 0,
            }}
            transition={{
              duration: booting ? 1 : 2,
              repeat: booting ? Number.POSITIVE_INFINITY : !inverterOn ? Number.POSITIVE_INFINITY : 0,
              ease: booting ? "linear" : "easeInOut",
              repeatType: booting ? "loop" : "reverse",
            }}
          >
            {booting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7H17V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.div>
        </motion.button>
        <span
          className={`text-xs mt-1 font-medium ${
            booting ? "text-blue-400" : inverterOn ? "text-emerald-400/50" : "text-emerald-400"
          }`}
        >
          {booting ? "BOOT" : "START"}
        </span>
      </div>
    </div>
  )
}
