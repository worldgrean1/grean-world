"use client"

import { create } from "zustand"

interface EnergySystemState {
  inverterActive: boolean
  switchActive: boolean
  switchEnabled: boolean // New: Controls whether switch can be interacted with
  showHeroSection: boolean
  showTagSection: boolean
  booting: boolean
  animationsPaused: boolean
  powerFlowActive: boolean // New: Tracks power flow state
  setInverterActive: (active: boolean) => void
  setSwitchActive: (active: boolean) => void
  setSwitchEnabled: (enabled: boolean) => void // New: Enable/disable switch
  setShowHeroSection: (show: boolean) => void
  setShowTagSection: (show: boolean) => void
  setBooting: (booting: boolean) => void
  setPowerFlowActive: (active: boolean) => void // New: Control power flow
  toggleAnimations: () => void
  deactivateFullSystem: () => void
  startEnergySystem: () => void // New: Complete startup sequence
}

export const useEnergySystemStore = create<EnergySystemState>((set, get) => ({
  inverterActive: false,
  switchActive: false,
  switchEnabled: false, // Switch starts disabled
  showHeroSection: false,
  showTagSection: false,
  booting: false,
  animationsPaused: false,
  powerFlowActive: false,

  setInverterActive: (active) => {
    set({ inverterActive: active })

    // If inverter is turned off, disable switch and stop power flow
    if (!active) {
      set({
        switchActive: false,
        switchEnabled: false,
        powerFlowActive: false,
        showHeroSection: false,
        showTagSection: false,
      })
    }
  },

  setSwitchActive: (active) => {
    const { switchEnabled } = get()
    // Only allow switch activation if it's enabled
    if (switchEnabled || !active) {
      set({ switchActive: active })
    }
  },

  setSwitchEnabled: (enabled) => set({ switchEnabled: enabled }),

  setShowHeroSection: (show) => set({ showHeroSection: show }),

  setShowTagSection: (show) => set({ showTagSection: show }),

  setBooting: (booting) => set({ booting }),

  setPowerFlowActive: (active) => set({ powerFlowActive: active }),

  toggleAnimations: () => set((state) => ({ animationsPaused: !state.animationsPaused })),

  deactivateFullSystem: () =>
    set({
      inverterActive: false,
      switchActive: false,
      switchEnabled: false,
      showHeroSection: false,
      showTagSection: false,
      booting: false,
      powerFlowActive: false,
    }),

  // New: Complete energy system startup sequence
  startEnergySystem: () => {
    const { setBooting, setInverterActive, setSwitchEnabled, setPowerFlowActive } = get()

    // Step 1: Start booting sequence
    setBooting(true)

    // Step 2: After 2 seconds, activate inverter
    setTimeout(() => {
      setBooting(false)
      setInverterActive(true)

      // Step 3: After another 1 second, start power flow
      setTimeout(() => {
        setPowerFlowActive(true)

        // Step 4: After power flow starts, enable the switch
        setTimeout(() => {
          setSwitchEnabled(true)
        }, 500) // 0.5 second delay for power flow to be visible
      }, 1000) // 1 second delay after inverter activation
    }, 2000) // 2 second boot sequence
  },
}))
