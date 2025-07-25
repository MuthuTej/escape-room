import { useRef, PropsWithChildren, useEffect } from 'react'
import { Container, useTick } from '@pixi/react'
import { Graphics as PIXIGraphics } from 'pixi.js'
import { TILE_SIZE, ZOOM } from '../../constants/game-world'

interface ICameraProps {
  heroPosition: { x: number; y: number }
  canvasSize: { width: number; height: number }
  currentLevel: number // <- Add currentLevel to props
}

const lerp = (start: number, end: number) => {
  return start + (end - start) * 0.03
}

export const Camera = ({
  heroPosition,
  canvasSize,
  currentLevel,
  children,
}: PropsWithChildren<ICameraProps>) => {
  const containerRef = useRef<PIXIGraphics>(null)

  const cameraPosition = useRef<{ x: number; y: number }>({
    x: canvasSize.width / 2,
    y: canvasSize.height / 2,
  })

  // 🔁 Reset camera when level changes
  useEffect(() => {
    cameraPosition.current = {
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
    }
    if (containerRef.current) {
      containerRef.current.x = cameraPosition.current.x
      containerRef.current.y = cameraPosition.current.y
    }
  }, [currentLevel, canvasSize.width, canvasSize.height])

  useTick(() => {
    if (containerRef.current) {
      const targetX =
        canvasSize.width / 2 - heroPosition.x * TILE_SIZE * ZOOM - TILE_SIZE
      const targetY =
        canvasSize.height / 2 - heroPosition.y * TILE_SIZE * ZOOM - TILE_SIZE

      cameraPosition.current.x = lerp(cameraPosition.current.x, targetX)
      cameraPosition.current.y = lerp(cameraPosition.current.y, targetY)

      containerRef.current.x = cameraPosition.current.x
      containerRef.current.y = cameraPosition.current.y
    }
  })

  return (
    <Container ref={containerRef} scale={ZOOM}>
      {children}
    </Container>
  )
}
