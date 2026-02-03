import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LEVEL_RIDDLES, LEVEL_HINTS } from '../../constants/levels'

interface Props {
  password: string
  onPasswordChange: (val: string) => void
  onSubmit: () => void
  time: number
  currentLevel: number
  smoothedPosition: { x: number; y: number }
}

export const PasswordOverlay = ({
  password,
  onPasswordChange,
  onSubmit,
  time,
  currentLevel,
  smoothedPosition,
}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto'
    if (!showModal) setShowHint(false) // Reset hint when closing modal
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showModal])

  return (
    <>
      {/* Trigger Button */}
      {((smoothedPosition.x >= 635 &&
        smoothedPosition.x <= 735 &&
        smoothedPosition.y >= 352 &&
        smoothedPosition.y <= 450 &&
        currentLevel === 1) ||
        (smoothedPosition.x >= 320 &&
          smoothedPosition.x <= 450 &&
          smoothedPosition.y <= 480 &&
          smoothedPosition.y >= 416 &&
          currentLevel === 2) ||
        (smoothedPosition.x >= 352 &&
          smoothedPosition.x <= 447 &&
          smoothedPosition.y <= 447 &&
          smoothedPosition.y >= 383 &&
          currentLevel === 3)) && (
          <motion.button
            onClick={() => setShowModal(true)}
            className="fixed top-4 right-4 z-50 font-cyber text-green-400 bg-black bg-opacity-80 border border-green-500/30 text-xl font-bold rounded-lg !px-6 !py-3 shadow-[0_0_10px_#00ff88] hover:shadow-[0_0_20px_#00ff88] transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              opacity: [1, 0.8, 1],
              boxShadow: [
                '0 0 8px #00ff88',
                '0 0 4px #003322',
                '0 0 10px #00ff88',
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🔐 Enter Password
          </motion.button>
        )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-md !px-6 !py-8 rounded-lg border border-green-500/40 bg-gradient-to-br from-black via-green-950 to-black shadow-[0_0_25px_#00ff88]"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute !top-2 !right-2 text-green-400 hover:text-green-300 text-xl font-bold"
              >
                ✕
              </button>

              {/* Glitch Title */}
              <h2
                className="glitch text-green-400 text-lg font-cyber !mb-3 tracking-widest"
                data-text="🔐 SECURITY CHALLENGE"
              >
                🔐 SECURITY CHALLENGE
              </h2>

              {/* Riddle Prompt */}
              <div className="!mb-6">
                <p className="text-green-300 text-sm font-cyber !mb-2 uppercase tracking-tight opacity-70">
                  Mission Query:
                </p>
                <p className="text-green-100 text-base font-cyber leading-relaxed italic border-l-2 border-green-500 !pl-4">
                  "{LEVEL_RIDDLES[currentLevel]}"
                </p>
              </div>

              {/* Hint Section */}
              <div className="!mb-6">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-green-500/70 hover:text-green-400 font-cyber flex items-center gap-2 transition-colors"
                >
                  {showHint ? '▲ HIDE HINT' : '▼ REQUEST HINT'}
                </button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="!mt-2 text-sm text-green-400/80 bg-green-900/20 !p-3 rounded border border-green-500/10 italic font-cyber">
                        {LEVEL_HINTS[currentLevel]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onSubmit()
                  // Only close if correct? The parent handles submit, usually we close on success.
                  // For now keeping original behavior or slightly adjusted
                  setShowModal(false)
                }}
                className="flex items-center !gap-2"
              >
                <input
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Intercepted signal..."
                  className="flex-1 !px-3 !py-2 rounded-md font-cyber text-sm text-green-200 bg-black border border-green-500/40 placeholder:text-green-700 focus:outline-none focus:ring focus:ring-green-400/40"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  className="!px-6 !py-2 bg-green-500 hover:bg-green-400 text-black text-sm rounded font-cyber font-bold shadow-md shadow-green-300/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  DECODE
                </motion.button>
              </form>

              {/* Time Display */}
              <motion.div
                className="!mt-6 text-[10px] text-green-500/50 font-cyber tracking-widest flex justify-between items-center border-t border-green-500/10 !pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>SYNC_STATUS: ACTIVE</span>
                <span>ELAPSED_TIME: {time}s</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
