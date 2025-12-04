'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  show: boolean
  remainingMinutes: number
  onDismiss: () => void
}

export default function SessionTimeoutWarning({ show, remainingMinutes, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg shadow-2xl border-2 border-amber-400 p-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">⏰</div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm mb-1">
                  Session Timeout Warning
                </h3>
                <p className="text-amber-100 text-xs mb-3">
                  Your session will expire in <strong className="text-white">{remainingMinutes} minute{remainingMinutes !== 1 ? 's' : ''}</strong> due to inactivity.
                  Move your mouse or click anywhere to stay signed in.
                </p>
                <button
                  onClick={onDismiss}
                  className="px-3 py-1.5 bg-white text-orange-700 rounded-md text-xs font-semibold
                    hover:bg-amber-50 transition-colors"
                >
                  I'm Still Here
                </button>
              </div>
              <button
                onClick={onDismiss}
                className="text-white hover:text-amber-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
