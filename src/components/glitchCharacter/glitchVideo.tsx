// glitchCharacter.tsx
import { useEffect, useState } from 'react'
import { AnimatedSprite } from '@pixi/react'
import { Texture } from 'pixi.js'
interface Props {
  x: number
  y: number
  width?: number
  height?: number
}

export const GifVideo = ({ x, y, width = 260, height = 140 }: Props) => {
  const [textures, setTextures] = useState<Texture[]>([])

  useEffect(() => {
    const frameCount = 10 // replace with actual frame count
    const loadedTextures = []
    for (let i = 0; i < frameCount; i++) {
      loadedTextures.push(Texture.from(`/glitch/frame_${i}.gif`))
    }
    setTextures(loadedTextures)
  }, [])

  if (!textures.length) return null

  return (
    <AnimatedSprite
      textures={textures}
      isPlaying={true}
      initialFrame={0}
      animationSpeed={0.3}
      x={x}
      y={y}
      width={width}
      height={height}
      anchor={0.5}
      loop={true}
    />
  )
}
