import { useNavigate } from 'react-router-dom'

const ResultScreen = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#000814] text-lime-400 h-screen flex flex-col items-center justify-center font-cyber">
      <h1 className="text-4xl mb-8 drop-shadow-[0_0_10px_#39ff14]">MISSION COMPLETE</h1>
      <button
        onClick={() => navigate('/')}
        className="bg-lime-400 text-black py-3 px-6 text-lg font-bold rounded-md shadow-md shadow-lime-500/50 hover:scale-105 transition"
      >
        RESTART
      </button>
    </div>
  )
}

export default ResultScreen
