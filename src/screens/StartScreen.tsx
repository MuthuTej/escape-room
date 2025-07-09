import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthButtons from './AuthBottons' // Make sure the path is correct

const StartScreen = () => {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-cyan-400 h-screen flex flex-col items-center justify-center font-cyber p-6">
      <motion.h1
        className="text-6xl mb-8 drop-shadow-[0_0_20px_#00ffcc] text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        🕵️‍♂️ DETECTIVE SIMULATOR
      </motion.h1>

      <motion.div
        className="mb-6 text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AuthButtons />
      </motion.div>

      {isSignedIn && (
        <motion.button
          onClick={() => navigate('/experience')}
          className="bg-cyan-400 text-black py-3 px-8 text-xl font-bold rounded-md shadow-lg shadow-cyan-500/50 hover:scale-105 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          START SIMULATION
        </motion.button>
      )}
    </div>
  )
}

export default StartScreen
