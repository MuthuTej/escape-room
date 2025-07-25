import { useRef, useCallback, useEffect } from 'react'
import { Sprite, Container, useTick } from '@pixi/react'
import {
  ANIMATION_SPEED,
  DEFAULT_X_POS,
  DEFAULT_Y_POS,
  MOVE_SPEED,
} from '../../constants/game-world'
import { useHeroControls } from './useHeroControls'
import { Texture } from 'pixi.js'
import {
  calculateNewTarget,
  checkCanMove,
  handleMovement,
} from '../../helpers/common'
import { useHeroAnimation } from './useHeroAnimation'
import { Direction } from '../../types/game-world'

interface IHeroProps {
  texture: Texture
  onMove: (gridX: number, gridY: number) => void
  collisionMap: number[]
  cols: number
  currentLevel:number
}

export const Hero = ({ texture, onMove , collisionMap , cols , currentLevel }: IHeroProps) => {
  const position = useRef({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS })
  const targetPosition = useRef<{ x: number; y: number } | null>(null)
  const currentDirection = useRef<Direction | null>(null)
  const { getControlsDirection } = useHeroControls()
  const isMoving = useRef(false)
  useEffect(()=>{
    position.current.x = DEFAULT_X_POS
    position.current.y = DEFAULT_Y_POS
    targetPosition.current = null;
    currentDirection.current = null
  },[collisionMap])
  const { sprite, updateSprite } = useHeroAnimation({
    texture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 9,
    animationSpeed: ANIMATION_SPEED,
  })
  useEffect(() => {
    position.current.x = DEFAULT_X_POS
    position.current.y = DEFAULT_Y_POS
    targetPosition.current = null
    currentDirection.current = null
  
    // Simulate one step down movement
    const simulatedDirection: Direction = 'DOWN'
    const newTarget = calculateNewTarget(DEFAULT_X_POS, DEFAULT_Y_POS, simulatedDirection)
  
    if (checkCanMove(newTarget, collisionMap, cols)) {
      currentDirection.current = simulatedDirection
      targetPosition.current = newTarget
    }
  }, [currentLevel])
  
  useEffect(() => {
    onMove(position.current.x, position.current.y)
  }, [onMove])

  const setNextTarget = useCallback((direction: Direction) => {
    if (targetPosition.current) return
    const { x, y } = position.current
    currentDirection.current = direction
    const newTarget = calculateNewTarget(x, y, direction)

    if (checkCanMove(newTarget, collisionMap, cols)) {
      targetPosition.current = newTarget
    }
  }, [collisionMap, cols])

  useTick((delta) => {
    const direction = getControlsDirection()
    if (direction) {
      setNextTarget(direction)
    }
    if (targetPosition.current) {
      const { position: newPosition, completed } = handleMovement(
        position.current,
        targetPosition.current,
        MOVE_SPEED,
        delta
      )

      position.current = newPosition
      isMoving.current = true

      if (completed) {
        const { x, y } = position.current
        onMove(x, y)

        targetPosition.current = null
        isMoving.current = false
      }
    }

    updateSprite(currentDirection.current!, isMoving.current)
  })

  return (
    <Container>
      {sprite && (
        <Sprite
          texture={sprite.texture}
          x={position.current.x}
          y={position.current.y}
          scale={1.5}
          anchor={[0.3, 0.6]}
        />
      )}
    </Container>
  )
}
