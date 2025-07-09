import { useState, useMemo, PropsWithChildren, useCallback, useEffect } from 'react'
import { Texture } from 'pixi.js'
import { Container, Sprite } from '@pixi/react'
import { COLS, TILE_SIZE } from '../../../constants/game-world'
import { Hero } from '../../Hero/Hero'
import { Level } from '../../Levels/Level'
import { Camera } from '../../Camera/Camera'
import backgroundAsset from '../../../assets/background.jpg'
import heroAsset from '@/assets/hero.png'

import { SpotlightMask } from '../../Spotlight/SpotlightEffect'
import { COLLISION_MAPS } from '../../../constants/collision-map'

interface IMainContainerProps {
  canvasSize: { width: number; height: number },
  currentLevel: number

}

export const MainContainer = ({
  canvasSize,
  children,
  currentLevel,

}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })
  const [heroWorldPosition, setHeroWorldPosition] = useState({ x: 0, y: 0 })
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 })

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    })
    setHeroWorldPosition({ x, y })

  }, [])

  const heroTexture = useMemo(() => Texture.from(heroAsset), [])

  const backgroundTexture = useMemo(() => {
    return Texture.from(backgroundAsset)
  }, [])
  useEffect(() => {
    let animationFrameId: number

    const lerp = (start: number, end: number, amt: number) => {
      return start + (end - start) * amt
    }

    const updateSmoothPosition = () => {
      setSmoothedPosition(prev => ({
        x: lerp(prev.x, heroWorldPosition.x, 0.1),
        y: lerp(prev.y, heroWorldPosition.y, 0.1),
      }))
      animationFrameId = requestAnimationFrame(updateSmoothPosition)
    }

    animationFrameId = requestAnimationFrame(updateSmoothPosition)

    return () => cancelAnimationFrame(animationFrameId)
  }, [heroWorldPosition])
  const collisionMap = COLLISION_MAPS[currentLevel]

  return (
    <Container>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
      <Camera heroPosition={heroPosition} canvasSize={canvasSize}>
        <Level currentLevel={currentLevel} />
        <Hero texture={heroTexture} onMove={updateHeroPosition} collisionMap={collisionMap}
          cols={COLS} />

        <SpotlightMask
          heroX={smoothedPosition.x}
          heroY={smoothedPosition.y}
          screenWidth={canvasSize.width}
          screenHeight={canvasSize.height}
        />
      </Camera>
    </Container>
  )
}

export default MainContainer
