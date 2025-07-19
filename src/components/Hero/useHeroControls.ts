import { useCallback, useEffect, useRef, useState } from 'react'
import { Direction } from '../../types/game-world'
import footstepSound from '/audio/footstep.mp3' // Adjust path if needed

const DIRECTION_KEYS: Record<string, Direction> = {
  KeyW: 'UP',
  KeyS: 'DOWN',
  KeyA: 'LEFT',
  KeyD: 'RIGHT',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
}

export const useHeroControls = () => {
  const [heldDirections, setHeldDirections] = useState<Direction[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(footstepSound)
    audio.loop = true
    audioRef.current = audio
  }, [])

  const handleKey = useCallback((e: KeyboardEvent, isKeyDown: boolean) => {
    const direction = DIRECTION_KEYS[e.code]
    if (!direction) return

    setHeldDirections((prev) => {
      const alreadyHeld = prev.includes(direction)

      let updated: Direction[] = prev
      if (isKeyDown && !alreadyHeld) {
        updated = [direction, ...prev]
      } else if (!isKeyDown) {
        updated = prev.filter((dir) => dir !== direction)
      }

      // Control sound based on movement
      if (audioRef.current) {
        if (updated.length > 0) {
          if (audioRef.current.paused) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(() => {})
          }
        } else {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }

      return updated
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKey(e, true)
    const handleKeyUp = (e: KeyboardEvent) => handleKey(e, false)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKey])

  const getControlsDirection = useCallback(
    (): Direction | null => heldDirections[0] || null,
    [heldDirections]
  )

  return { getControlsDirection }
}
