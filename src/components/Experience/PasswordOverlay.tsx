import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  password: string
  onPasswordChange: (val: string) => void
  onSubmit: () => void
  time: number
  currentLevel: number
  smoothedPosition: { x: number; y: number }; // ← Add this

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

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showModal])
  console.log(smoothedPosition);

  return (
    <>
      {/* Trigger Button */}
      {((smoothedPosition.x >= 575 &&
        smoothedPosition.x <= 735 &&
        smoothedPosition.y >= 290 &&
        smoothedPosition.y <= 390 &&
        currentLevel === 1) ||

        (smoothedPosition.x >= 448 &&
          smoothedPosition.x <= 639 &&
          smoothedPosition.y <= 480 &&
          smoothedPosition.y >= 416 &&
          currentLevel === 2) ||
        (smoothedPosition.x >= 65 &&
          smoothedPosition.x <= 416 &&
          smoothedPosition.y <= 224 &&
          smoothedPosition.y >= 64 &&
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
                className="absolute !top-2 !right-2 text-green-400 hover:text-green-300 text-xl font-bold "
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
              <p className="text-green-300 text-sm font-cyber !mb-4">
                To proceed, solve the riddle:<br />
                <span className="italic text-green-500">
                  Enter the password...
                </span>
              </p>

              {/* Password Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onSubmit()
                  setShowModal(false)
                }}
                className="flex items-center !gap-2"
              >
                <input
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 !px-3 !py-2 rounded-md font-cyber text-sm text-green-200 bg-black border border-green-500/40 placeholder:text-green-400 focus:outline-none focus:ring focus:ring-green-400/40"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  className="!px-4 !py-2 bg-green-500 hover:bg-green-600 text-black text-sm rounded font-cyber shadow-md shadow-green-300/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ENTER
                </motion.button>
              </form>

              {/* Time Display */}
              <motion.div
                className="!mt-4 text-xs text-green-400 font-cyber"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                🕒 Time Elapsed: {time}s
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
