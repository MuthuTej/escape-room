import { Graphics } from '@pixi/react'
import { useCallback } from 'react'
import * as PIXI from 'pixi.js'

interface SpotlightMaskProps {
  heroX: number
  heroY: number
  radius?: number
  screenWidth: number
  screenHeight: number
}

export const SpotlightMask = ({
  heroX,
  heroY,
  radius = 120,
  screenWidth ,
  screenHeight,
}: SpotlightMaskProps) => {
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear()
      g.beginFill(0x000000, 0.9 ) // dark overlay with opacity
      g.drawRect(-radius, -radius, screenWidth + radius * 2, screenHeight + radius * 2)
      g.beginHole()
      g.drawCircle(heroX, heroY, radius) // circular spotlight
      g.endHole()
      g.endFill()
    },
    [heroX, heroY, radius, screenWidth, screenHeight]
  )

  return <Graphics draw={draw} />
}
