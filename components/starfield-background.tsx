"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  z: number
  prevX: number
  prevY: number
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const stars: Star[] = []
      for (let i = 0; i < 800; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          prevX: 0,
          prevY: 0,
        })
      }
      starsRef.current = stars
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 15, 26, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.translate(canvas.width / 2, canvas.height / 2)

      starsRef.current.forEach((star) => {
        star.prevX = star.x / (star.z * 0.001)
        star.prevY = star.y / (star.z * 0.001)

        star.z -= 2

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
          star.z = 1000
          star.prevX = star.x / (star.z * 0.001)
          star.prevY = star.y / (star.z * 0.001)
        }

        const x = star.x / (star.z * 0.001)
        const y = star.y / (star.z * 0.001)

        const opacity = Math.max(0, 1 - star.z / 1000)
        const size = Math.max(0, (1 - star.z / 1000) * 2)

        // Create gradient for star
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity})`) // purple-600
        gradient.addColorStop(0.5, `rgba(126, 34, 206, ${opacity * 0.5})`) // purple-700
        gradient.addColorStop(1, `rgba(88, 28, 135, 0)`) // purple-900 transparent

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Draw trail
        if (size > 0.5) {
          ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.3})`
          ctx.lineWidth = size * 0.5
          ctx.beginPath()
          ctx.moveTo(star.prevX, star.prevY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      })

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 50%, #0f0f1a 100%)" }}
    />
  )
}
