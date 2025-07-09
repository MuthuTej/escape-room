import { GAME_HEIGHT, GAME_WIDTH, OFFSET_X, OFFSET_Y } from '../../constants/game-world'
import { Sprite } from '@pixi/react'
import { LEVEL_SPRITES } from '../../constants/levels'

interface LevelProps {
  currentLevel: number
}

export const Level = ({ currentLevel }: LevelProps) => {
  const levelAsset = LEVEL_SPRITES[currentLevel]

  return (
    <Sprite
      image={levelAsset}
      width={GAME_WIDTH}
      height={GAME_HEIGHT + OFFSET_Y}
      scale={1}
      x={OFFSET_X}
      y={OFFSET_Y}
    />
  )
}
