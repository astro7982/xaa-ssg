'use client'

import { createContext, useContext, useState, useRef, ReactNode } from 'react'

export type DemoMode = 'traditional' | 'xaa'

interface SessionMetrics {
  consentScreens: number
  timeWasted: number // in seconds
  clicksRequired: number
}

interface DemoModeContextType {
  mode: DemoMode
  setMode: (mode: DemoMode) => void
  metrics: SessionMetrics
  incrementConsentScreens: () => void
  addTimeWasted: (seconds: number) => void
  incrementClicks: () => void
  resetMetrics: () => void
  setOnModeChange: (callback: () => void) => void
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined)

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DemoMode>('traditional')
  const [metrics, setMetrics] = useState<SessionMetrics>({
    consentScreens: 0,
    timeWasted: 0,
    clicksRequired: 0
  })
  const onModeChangeRef = useRef<(() => void) | undefined>(undefined)

  const incrementConsentScreens = () => {
    setMetrics(prev => ({
      ...prev,
      consentScreens: prev.consentScreens + 1
    }))
  }

  const addTimeWasted = (seconds: number) => {
    setMetrics(prev => ({
      ...prev,
      timeWasted: prev.timeWasted + seconds
    }))
  }

  const incrementClicks = () => {
    setMetrics(prev => ({
      ...prev,
      clicksRequired: prev.clicksRequired + 1
    }))
  }

  const resetMetrics = () => {
    setMetrics({
      consentScreens: 0,
      timeWasted: 0,
      clicksRequired: 0
    })
  }

  const handleSetMode = (newMode: DemoMode) => {
    setMode(newMode)
    resetMetrics()
    // Call the callback to reset chat messages
    if (onModeChangeRef.current) {
      onModeChangeRef.current()
    }
  }

  const setOnModeChange = (callback: () => void) => {
    onModeChangeRef.current = callback
  }

  return (
    <DemoModeContext.Provider
      value={{
        mode,
        setMode: handleSetMode,
        metrics,
        incrementConsentScreens,
        addTimeWasted,
        incrementClicks,
        resetMetrics,
        setOnModeChange
      }}
    >
      {children}
    </DemoModeContext.Provider>
  )
}

export function useDemoMode() {
  const context = useContext(DemoModeContext)
  if (!context) {
    throw new Error('useDemoMode must be used within DemoModeProvider')
  }
  return context
}
