'use client'

import { useDemoMode } from '@/lib/demo-mode-context'
import { motion } from 'framer-motion'

export default function DemoModeToggle() {
  const { mode, setMode } = useDemoMode()

  return (
    <div className="flex items-center justify-center gap-6 bg-gradient-to-r from-scoreboard via-gray-900 to-scoreboard rounded-xl px-8 py-5 border-2 border-gray-700 shadow-lg">
      <span className="text-sm text-gray-300 font-scoreboard uppercase tracking-wider font-bold">Demo Mode:</span>

      <div className="flex items-center gap-6">
        {/* Traditional OAuth Radio */}
        <button
          onClick={() => setMode('traditional')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className={`relative w-6 h-6 rounded-full border-3 transition-all ${
            mode === 'traditional'
              ? 'border-red-500 bg-red-600/20'
              : 'border-gray-600 bg-gray-800/50 group-hover:border-gray-500'
          }`}>
            <motion.div
              initial={false}
              animate={{
                scale: mode === 'traditional' ? 1 : 0,
                opacity: mode === 'traditional' ? 1 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute inset-1 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50"
            />
          </div>
          <span className={`flex items-center gap-2 text-sm font-bold font-scoreboard uppercase transition-colors ${
            mode === 'traditional'
              ? 'text-red-300'
              : 'text-gray-500 group-hover:text-gray-400'
          }`}>
            <span className="text-lg">⚠️</span>
            <span>Traditional OAuth</span>
          </span>
        </button>

        {/* XAA Radio */}
        <button
          onClick={() => setMode('xaa')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className={`relative w-6 h-6 rounded-full border-3 transition-all ${
            mode === 'xaa'
              ? 'border-green-500 bg-green-600/20'
              : 'border-gray-600 bg-gray-800/50 group-hover:border-gray-500'
          }`}>
            <motion.div
              initial={false}
              animate={{
                scale: mode === 'xaa' ? 1 : 0,
                opacity: mode === 'xaa' ? 1 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute inset-1 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50"
            />
          </div>
          <span className={`flex items-center gap-2 text-sm font-bold font-scoreboard uppercase transition-colors ${
            mode === 'xaa'
              ? 'text-green-300'
              : 'text-gray-500 group-hover:text-gray-400'
          }`}>
            <span className="text-lg">✅</span>
            <span>Cross App Access</span>
          </span>
        </button>
      </div>
    </div>
  )
}
