import { useEffect, useRef } from 'react'

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 18
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(0)

    const speeds: number[] = drops.map(() => Math.random() * 2 + 1) // varied speed per column

    const randomChar = () => (Math.random() > 0.5 ? '0' : '1')

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize + Math.floor(Math.random() * 4 - 2) // small jitter
        const y = drops[i] * fontSize

        ctx.fillText(randomChar(), x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0 // reset randomly
        }

        drops[i] += speeds[i] // move drop down
      }

      requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  )
}

export default MatrixBackground
