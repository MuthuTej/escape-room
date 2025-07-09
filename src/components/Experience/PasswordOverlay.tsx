import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  password: string
  onPasswordChange: (val: string) => void
  onSubmit: () => void
  time: number
}

export const PasswordOverlay = ({ password, onPasswordChange, onSubmit, time }: Props) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showModal])

  return (
    <>
      {/* Always-visible Password Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-4 z-50 px-8 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-mono text-xl rounded shadow-lg"
      >
        🔐 Enter Password
      </button>

      {/* Password Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              className="relative w-full max-w-md px-6 py-8 rounded-lg shadow-2xl bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-cyan-500 hover:text-cyan-300 text-xl font-bold"
              >
                ✕
              </button>

              {/* Glitch Title */}
              <h2
                className="glitch text-cyan-400 text-lg font-mono mb-2 tracking-widest"
                data-text="🔐 Security Challenge"
              >
                🔐 Security Challenge
              </h2>

              {/* Riddle Prompt */}
              <p className="text-gray-300 text-sm font-mono mb-4">
                To proceed, solve the riddle:<br />
                <span className="text-cyan-300 italic">
                  Enter the password ...
                </span>
              </p>

              {/* Password Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onSubmit()
                  setShowModal(false)
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 px-3 py-2 rounded-md font-mono text-sm text-cyan-100 bg-gray-800 border border-cyan-500/20 placeholder:text-cyan-400 focus:outline-none focus:ring focus:ring-cyan-500/40"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded shadow font-mono"
                >
                  Enter
                </button>
              </form>

              {/* Time Display */}
              <div className="mt-4 text-xs text-cyan-300 font-mono">
                🕒 Time Elapsed: {time}s
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
