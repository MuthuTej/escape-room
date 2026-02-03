import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MatrixBackground from './MatrixBackground'

const StartScreen = () => {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-green-400 font-cyber flex flex-col items-center justify-center">
      {/* Matrix background */}
      <MatrixBackground />

      {/* Overlay content */}
      <div className="z-10 flex flex-col items-center justify-center text-center gap-5 px-6">
        <motion.h1
          className="text-6xl glitch mb-8 drop-shadow-[0_0_20px_#00ffcc]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          🧩 ESCAPE ROOM
        </motion.h1>

        <motion.button
          onClick={() => navigate('/experience')}
          className="font-cyber  bg-green-500 text-black py-3 w-40 text-xl font-bold rounded-lg shadow-lg shadow-green-400/50 hover:scale-105 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          START MISSION
        </motion.button>
      </div>
      {/* Arrow Keys Overlay */}
      <div className="absolute bottom-10 left-10 z-20 ">
        <div className="grid grid-cols-3 gap-5 text-black">
          <div></div>
          <motion.div
            className="bg-green-500 w-15 h-15 flex items-center justify-center rounded shadow-md font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >
            ↑
          </motion.div>
          <div></div>

          <motion.div
            className="bg-green-500 w-15 h-15 flex items-center justify-center rounded shadow-md font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            ←
          </motion.div>
          <motion.div
            className="bg-green-500 w-15 h-15 flex items-center justify-center rounded shadow-md font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          >
            ↓
          </motion.div>
          <motion.div
            className="bg-green-500 w-15 h-15 flex items-center justify-center rounded shadow-md font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
          >
            →
          </motion.div>
        </div>
        <div
        >

        </div>
      </div>

    </div>
  )
}

export default StartScreen
