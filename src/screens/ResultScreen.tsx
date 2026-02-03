import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import MatrixBackground from './MatrixBackground'

const ResultScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const timings = location.state?.timings || []
  const totalTime = timings.reduce((a: number, b: number) => a + b, 0)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-green-400 font-cyber flex flex-col items-center justify-center">
      <MatrixBackground />

      <div className="z-10 flex flex-col items-center justify-center text-center gap-8 bg-black/60 p-10 rounded-2xl border border-green-500/30 backdrop-blur-md shadow-[0_0_50px_rgba(34,197,94,0.1)]">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl font-bold glitch mb-2 drop-shadow-[0_0_20px_#22c55e]">
            MISSION COMPLETE
          </h1>
          <p className="text-green-500/70 tracking-[0.3em] text-sm mb-10">THE SYSTEM HAS BEEN BREACHED</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {timings.map((time: number, index: number) => (
            <div key={index} className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
              <p className="text-xs text-green-500/50 uppercase tracking-widest">Level {index + 1}</p>
              <p className="text-2xl font-bold">{time}s</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-green-500/50 uppercase tracking-widest text-sm">Total Extraction Time</p>
          <p className="text-5xl font-bold text-green-400 drop-shadow-[0_0_10px_#22c55e]">{totalTime} SECONDS</p>
        </motion.div>

        <motion.button
          onClick={() => navigate('/')}
          className="mt-8 bg-green-500 text-black py-4 px-10 text-xl font-bold rounded-lg shadow-lg shadow-green-500/40 hover:scale-105 transition hover:bg-green-400 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          REBOOT SYSTEM
        </motion.button>
      </div>
    </div>
  )
}

export default ResultScreen
