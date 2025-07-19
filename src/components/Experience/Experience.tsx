import { useEffect, useState, useCallback } from 'react'
import { Stage } from '@pixi/react'
import { MainContainer } from './MainContainer/MainContainer'
import { calculateCanvasSize } from '../../helpers/common'
import { PasswordOverlay } from './PasswordOverlay'
import { LEVEL_PASSWORDS } from '../../constants/levels'
import { useUser } from '@clerk/clerk-react'
import { GifCharacter } from '../glitchCharacter/glitchCharacter'
import Level1Start from '../startScreens/Level1Start'
import Level2Start from '../startScreens/Level2Start'
import Level3Start from '../startScreens/Level3Start'

export const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize())
  const [currentLevel, setCurrentLevel] = useState(1)
  const [password, setPassword] = useState('')
  const [levelStartTime, setLevelStartTime] = useState(Date.now())
  const [levelTimings, setLevelTimings] = useState<number[]>([])
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showLevelIntro, setShowLevelIntro] = useState(true) // <- NEW
  const [heroSmoothedPosition, setHeroSmoothedPosition] = useState({ x: 0, y: 0 });

  const { user } = useUser()

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize())
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [updateCanvasSize])

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - levelStartTime) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [levelStartTime])

  // Show modal on level change
  useEffect(() => {
    setShowLevelIntro(true)
  }, [currentLevel])

  const handlePasswordSubmit = async () => {
    if (password.trim().toLowerCase() === LEVEL_PASSWORDS[currentLevel].toLowerCase()) {
      const timeTaken = Math.floor((Date.now() - levelStartTime) / 1000)
      setLevelTimings(prev => [...prev, timeTaken])

      if (currentLevel < 3) {
        setCurrentLevel(prev => prev + 1)
        setLevelStartTime(Date.now())
        setElapsedTime(0)
        setPassword('')
      } else {
        await user?.update({
          unsafeMetadata: {
            levelTimings: [...levelTimings, timeTaken],
            totalTime: [...levelTimings, timeTaken].reduce((a, b) => a + b, 0),
          },
        })
        alert('✅ Game completed! Your times are stored.')
      }
    } else {
      alert('❌ Wrong password. Try again.')
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      {/* Level Intro Modal */}
      {showLevelIntro && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center">
          {/* Absolute Start Button in Top-Left */}
          <div className="absolute top-4 left-4">
            <button
              onClick={() => setShowLevelIntro(false)}
              className="font-cyber  bg-green-500 text-black py-3 w-40 text-xl font-bold rounded-lg shadow-lg shadow-green-400/50 hover:scale-105 transition"
            >
              Start Level
            </button>
          </div>

          <div >
            {currentLevel === 1 && <Level1Start />}
            {currentLevel === 2 && <Level2Start />}
            {currentLevel === 3 && <Level3Start />}
          </div>
        </div>
      )}

      {/* Overlay UI for password + timer */}
      <PasswordOverlay
  password={password}
  onPasswordChange={setPassword}
  onSubmit={handlePasswordSubmit}
  time={elapsedTime}
  currentLevel={currentLevel}
  smoothedPosition={heroSmoothedPosition} // ← new prop
/>


      {/* Animated GIF character (above the PIXI canvas) */}
      <GifCharacter x={50} y={50} width={120} height={120} />

      {/* PIXI Canvas (underneath the gif) */}
      <Stage width={canvasSize.width} height={canvasSize.height}>
      <MainContainer
  canvasSize={canvasSize}
  currentLevel={currentLevel}
  showLevelIntro={showLevelIntro}
  onSmoothedPositionChange={(pos) => {
    setHeroSmoothedPosition(pos) // Save to parent state
  }}
>

          {/* any children if applicable */}
        </MainContainer>
      </Stage>
    </div>
  )
}
