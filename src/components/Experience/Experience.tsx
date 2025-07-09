import { useEffect, useState, useCallback } from 'react'
import { Stage } from '@pixi/react'
import { MainContainer } from './MainContainer/MainContainer'
import { calculateCanvasSize } from '../../helpers/common'
import { PasswordOverlay } from './PasswordOverlay'
import { LEVEL_PASSWORDS } from '../../constants/levels'
import { useUser } from '@clerk/clerk-react'

export const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize())
  const [currentLevel, setCurrentLevel] = useState(1)
  const [password, setPassword] = useState('')
  const [levelStartTime, setLevelStartTime] = useState(Date.now())
  const [levelTimings, setLevelTimings] = useState<number[]>([])
  const [elapsedTime, setElapsedTime] = useState(0)

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

  const handlePasswordSubmit = async () => {
    if (password === LEVEL_PASSWORDS[currentLevel]) {
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
      {/* Overlay UI for password + timer */}
      <PasswordOverlay
        password={password}
        onPasswordChange={setPassword}
        onSubmit={handlePasswordSubmit}
        time={elapsedTime}
      />

      {/* PIXI Canvas */}
      <Stage width={canvasSize.width} height={canvasSize.height}>
        <MainContainer canvasSize={canvasSize} currentLevel={currentLevel} />
      </Stage>
    </div>
  )
}
