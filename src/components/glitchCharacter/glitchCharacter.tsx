import { useEffect, useState } from 'react'
import { AnimatedSprite } from '@pixi/react'
import { Texture } from 'pixi.js'

interface Props {
  x: number
  y: number
  width?: number
  height?: number
}

export const GifCharacter = ({ x, y, width = 78, height = 45 }: Props) => {
  const [textures, setTextures] = useState<Texture[]>([])

  useEffect(() => {
    const frameCount = 11
    const loadFrames = async () => {
      const promises = []

      for (let i = 1; i <= frameCount; i++) {
        const src = `/password/frame_${i}.gif`
        promises.push(
          new Promise<Texture>((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(Texture.from(img))
            img.onerror = reject
          })
        )
      }

      try {
        const loadedTextures = await Promise.all(promises)
        setTextures(loadedTextures)
      } catch (err) {
        console.error('Error loading GIF frames:', err)
      }
    }

    loadFrames()
  }, [])

  if (!textures.length) return null

  return (
    <AnimatedSprite
      textures={textures}
      isPlaying
      initialFrame={0}
      animationSpeed={0.1}
      x={x}
      y={y}
      width={width}
      height={height}
      anchor={0.5}
      loop
    />
  )
}
