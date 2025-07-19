import { useState, useMemo, PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { Texture } from 'pixi.js'
import { Container, Sprite } from '@pixi/react'
import { COLS, DEFAULT_X_POS, DEFAULT_Y_POS, TILE_SIZE } from '../../../constants/game-world'
import { Hero } from '../../Hero/Hero'
import { Level } from '../../Levels/Level'
import { Camera } from '../../Camera/Camera'
import backgroundAsset from '../../../assets/background.jpg'
import heroAsset from '@/assets/hero.png'
import { SpotlightMask } from '../../Spotlight/SpotlightEffect'
import { COLLISION_MAPS } from '../../../constants/collision-map'
import { GifCharacter } from '../../glitchCharacter/glitchCharacter'
import { GifVideo } from '../../glitchCharacter/glitchVideo'
import level3Audio from  '/finalMessage.wav'
import level1audio from "/audio/level1_audio.wav"
import level2audio from "/audio/level2_audio.wav"
import level3audio from "/audio/level3_audio.wav"

import bgAudio from "/audio/bg.mp3"

interface IMainContainerProps {
  canvasSize: { width: number; height: number },
  currentLevel: number,
  showLevelIntro: boolean,
  onSmoothedPositionChange?: (pos: { x: number; y: number }) => void // <-- Add this line
}


export const MainContainer = ({
  canvasSize,
  children,
  currentLevel,
  showLevelIntro,
  onSmoothedPositionChange

}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })
  const [heroWorldPosition, setHeroWorldPosition] = useState({ x: 0, y: 0 })
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (onSmoothedPositionChange) {
      onSmoothedPositionChange(smoothedPosition)
    }
  }, [smoothedPosition, onSmoothedPositionChange])
  
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
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null)

  const hasPlayedAudioRef = useRef(false)
  
  useEffect(() => {
    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  
    let didPlaySomething = false;
  
    if (currentLevel === 3 && !hasPlayedAudioRef.current && showLevelIntro === false) {
      stopAudio();
      audioRef.current = new Audio(level3Audio);
      audioRef.current.play().catch(err => console.error('Audio failed to play:', err));
      hasPlayedAudioRef.current = true;
      didPlaySomething = true;
  
      // Resume background audio after level3 audio ends
      audioRef.current.onended = () => {
        if (backgroundAudioRef.current) {
          backgroundAudioRef.current.play().catch(err => console.error('Background audio failed to resume:', err));
        }
      };
    } else if (currentLevel === 1 && showLevelIntro === true) {
      stopAudio();
      audioRef.current = new Audio(level1audio);
      audioRef.current.play().catch(err => console.error('Audio failed to play:', err));
      didPlaySomething = true;
  
      audioRef.current.onended = () => {
        if (backgroundAudioRef.current) {
          backgroundAudioRef.current.play().catch(err => console.error('Background audio failed to resume:', err));
        }
      };
    } else if (currentLevel === 2 && showLevelIntro === true) {
      stopAudio();
      audioRef.current = new Audio(level2audio);
      audioRef.current.play().catch(err => console.error('Audio failed to play:', err));
      didPlaySomething = true;
  
      audioRef.current.onended = () => {
        if (backgroundAudioRef.current) {
          backgroundAudioRef.current.play().catch(err => console.error('Background audio failed to resume:', err));
        }
      };
    }else if (currentLevel === 3 && showLevelIntro === true) {
      stopAudio();
      audioRef.current = new Audio(level3audio);
      audioRef.current.play().catch(err => console.error('Audio failed to play:', err));
      didPlaySomething = true;
  
      audioRef.current.onended = () => {
        if (backgroundAudioRef.current) {
          backgroundAudioRef.current.play().catch(err => console.error('Background audio failed to resume:', err));
        }
      };
    }else if (showLevelIntro === false && (currentLevel === 1 || currentLevel == 2 || currentLevel == 3)) {
      stopAudio();
    }
  
    // Initialize or play background audio if nothing else is playing
    if (!didPlaySomething) {
      if (!backgroundAudioRef.current) {
        backgroundAudioRef.current = new Audio(bgAudio);
        backgroundAudioRef.current.loop = true;
        backgroundAudioRef.current.volume = 0.1;
      }
  
      if (backgroundAudioRef.current.paused) {
        backgroundAudioRef.current.play().catch(err => console.error('Background audio failed to play:', err));
      }
    } else {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
    }
    
    return () => {
      stopAudio();
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
      }
    };
  }, [showLevelIntro, currentLevel]);
  
  useEffect(() => {
    setHeroWorldPosition({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS})
    setSmoothedPosition({ x: heroWorldPosition.x, y: heroWorldPosition.y })
    hasPlayedAudioRef.current = false
  }, [currentLevel])
  
  return (
    <Container>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
      <Camera heroPosition={heroPosition} canvasSize={canvasSize}   currentLevel={currentLevel}
      >
        <Level currentLevel={currentLevel} />
        <Hero texture={heroTexture} onMove={updateHeroPosition} collisionMap={collisionMap} currentLevel={currentLevel}
          cols={COLS} />
        {currentLevel === 1 && <GifCharacter x={696} y={291} />}
        {currentLevel === 3 && <GifVideo x={265} y={336} />}
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
