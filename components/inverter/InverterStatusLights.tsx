"use client"

interface InverterStatusLightsProps {
  gridConnected: boolean
  solarConnected: boolean
  batteryConnected: boolean
  faultCondition: boolean
}

export function InverterStatusLights({
  gridConnected,
  solarConnected,
  batteryConnected,
  faultCondition,
}: InverterStatusLightsProps) {
  return (
    <div className="w-full flex justify-between mb-4">
      {/* Grid/AC LED */}
      <div
        style={{
          backgroundColor: gridConnected ? "#22c55e" : "#1e293b",
          opacity: gridConnected ? 1 : 0.3,
          boxShadow: gridConnected ? "0 0 8px #22c55e" : "none",
        }}
        className="w-6 h-6 rounded-full flex items-center justify-center relative"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"></rect>
          <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
          <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
          <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
        </svg>
      </div>

      {/* PV/Solar LED */}
      <div
        style={{
          backgroundColor: solarConnected ? "#fde047" : "#1e293b",
          opacity: solarConnected ? 1 : 0.3,
          boxShadow: solarConnected ? "0 0 8px #fde047" : "none",
        }}
        className="w-6 h-6 rounded-full flex items-center justify-center relative"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5"></path>
          <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5"></path>
          <path d="M5 19L19 5" stroke="currentColor" strokeWidth="1.5"></path>
        </svg>
      </div>

      {/* Battery LED */}
      <div
        style={{
          backgroundColor: batteryConnected ? "#38bdf8" : "#1e293b",
          opacity: batteryConnected ? 1 : 0.3,
          boxShadow: batteryConnected ? "0 0 8px #38bdf8" : "none",
        }}
        className="w-6 h-6 rounded-full flex items-center justify-center relative"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="7" width="12" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"></rect>
          <line x1="10" y1="4" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5"></line>
          <line x1="14" y1="4" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5"></line>
          <line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5"></line>
          <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5"></line>
        </svg>
      </div>

      {/* Fault/Warning LED */}
      <div
        style={{
          backgroundColor: faultCondition ? "#ef4444" : "#1e293b",
          opacity: faultCondition ? 1 : 0.3,
          boxShadow: faultCondition ? "0 0 8px #ef4444" : "none",
        }}
        className="w-6 h-6 rounded-full flex items-center justify-center relative"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 4L22 20H2L12 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
          <line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"></line>
          <line x1="12" y1="16" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5"></line>
        </svg>
      </div>
    </div>
  )
}
