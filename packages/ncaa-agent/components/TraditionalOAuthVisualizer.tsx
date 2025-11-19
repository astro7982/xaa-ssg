'use client'

import { motion } from 'framer-motion'

export default function TraditionalOAuthVisualizer() {
  return (
    <div className="h-full bg-gradient-to-br from-red-900/20 via-gray-900 to-red-900/20 rounded-lg border-2 border-red-500/40 p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">⚠️</span>
        <h2 className="text-xl font-bold text-red-200 uppercase tracking-wide">
          Traditional OAuth Flow
        </h2>
      </div>

      <div className="space-y-4">
        {/* User */}
        <FlowNode
          icon="👤"
          title="User"
          subtitle="Initiates request"
          color="blue"
        />

        <FlowArrow label="Asks for data" dashed />

        {/* App */}
        <FlowNode
          icon="🤖"
          title="AI Agent"
          subtitle="Needs access to NCAA data"
          color="blue"
        />

        <FlowArrow label="No direct trust!" warning />

        {/* First Consent Screen */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-900/20 border-2 border-yellow-500/40 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚠️</span>
            <h3 className="text-sm font-bold text-yellow-200">CONSENT SCREEN #1</h3>
          </div>
          <p className="text-xs text-yellow-100/80">
            NCAA Stats API wants to access your account
          </p>
          <p className="text-xs text-red-300 mt-2">
            🔓 No IdP visibility • Token stored in app
          </p>
        </motion.div>

        <FlowArrow label="User clicks 'Allow'" />

        {/* OAuth Server 1 */}
        <FlowNode
          icon="🔐"
          title="NCAA OAuth Server"
          subtitle="localhost:5001"
          color="red"
        />

        <FlowArrow label="Issues access token directly" />

        {/* Second Consent Screen */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-yellow-900/20 border-2 border-yellow-500/40 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚠️</span>
            <h3 className="text-sm font-bold text-yellow-200">CONSENT SCREEN #2</h3>
          </div>
          <p className="text-xs text-yellow-100/80">
            Analytics Platform wants to access your data
          </p>
          <p className="text-xs text-red-300 mt-2">
            🔓 Another token bypass • No centralized control
          </p>
        </motion.div>

        <FlowArrow label="User clicks 'Allow' again" />

        {/* Analytics Server */}
        <FlowNode
          icon="📊"
          title="Analytics OAuth Server"
          subtitle="Third-party service"
          color="red"
        />

        <FlowArrow label="Another token issued" />

        {/* Back to App */}
        <FlowNode
          icon="🤖"
          title="AI Agent"
          subtitle="Now has tokens from 2 sources"
          color="blue"
        />

        <FlowArrow label="Makes API calls" />

        {/* Data */}
        <FlowNode
          icon="🏈"
          title="NCAA Data"
          subtitle="Finally returns data"
          color="green"
        />

        {/* Problem Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-red-900/20 border-2 border-red-500/60 rounded-lg p-4"
        >
          <h3 className="text-sm font-bold text-red-200 mb-3 flex items-center gap-2">
            <span>❌</span>
            <span>Problems with This Flow:</span>
          </h3>
          <ul className="space-y-2 text-xs text-red-100/80">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span><strong>Multiple consent screens</strong> - Friction for every integration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span><strong>No IdP visibility</strong> - IT cannot see or control these connections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span><strong>Token sprawl</strong> - Tokens stored across multiple apps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span><strong>Impossible for automation</strong> - Server-based agents can't show consent screens</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

interface FlowNodeProps {
  icon: string
  title: string
  subtitle: string
  color: 'blue' | 'red' | 'green'
}

function FlowNode({ icon, title, subtitle, color }: FlowNodeProps) {
  const colors = {
    blue: 'from-blue-600 to-blue-700 border-blue-500/60',
    red: 'from-red-600 to-red-700 border-red-500/60',
    green: 'from-green-600 to-green-700 border-green-500/60',
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`bg-gradient-to-r ${colors[color]} border-2 rounded-lg p-4 shadow-lg`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <p className="text-xs text-gray-200/80">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  )
}

interface FlowArrowProps {
  label: string
  dashed?: boolean
  warning?: boolean
}

function FlowArrow({ label, dashed = false, warning = false }: FlowArrowProps) {
  return (
    <div className="flex items-center gap-3 pl-12">
      <div className="flex flex-col items-center">
        <div className={`w-0.5 h-8 ${warning ? 'bg-red-500' : dashed ? 'bg-gray-600' : 'bg-gray-500'} ${dashed ? 'opacity-50' : ''}`} />
        <div className={`${warning ? 'text-red-500' : 'text-gray-500'} text-xl`}>↓</div>
      </div>
      <span className={`text-xs ${warning ? 'text-red-300 font-bold' : 'text-gray-400'}`}>{label}</span>
    </div>
  )
}
