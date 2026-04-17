import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)

  const pointerX = useMotionValue(-120)
  const pointerY = useMotionValue(-120)
  const springX = useSpring(pointerX, { stiffness: 420, damping: 32, mass: 0.22 })
  const springY = useSpring(pointerY, { stiffness: 420, damping: 32, mass: 0.22 })

  const MotionRing = motion.div
  const MotionDot = motion.div

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const update = () => {
      const next = media.matches
      setEnabled(next)
      document.body.classList.toggle('has-custom-cursor', next)
    }

    update()
    media.addEventListener('change', update)
    return () => {
      media.removeEventListener('change', update)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const onMove = (event) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)

      const interactive = event.target.closest(
        'a, button, input, textarea, select, label, [role="button"], [data-cursor="active"], .cursor-target',
      )
      setActive(Boolean(interactive))
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [enabled, pointerX, pointerY])

  if (!enabled) {
    return null
  }

  return (
    <>
      <MotionRing
        className="custom-cursor-ring"
        style={{ x: springX, y: springY }}
        animate={{
          scale: pressed ? 0.86 : active ? 1.35 : 1,
          opacity: active ? 0.95 : 0.75,
          borderColor: active ? '#ffc24a' : '#f4f4f4',
          boxShadow: active ? '0 0 28px rgba(255, 194, 74, 0.65)' : '0 0 20px rgba(195, 17, 12, 0.45)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />

      <MotionDot
        className="custom-cursor-dot"
        style={{ x: springX, y: springY }}
        animate={{
          scale: pressed ? 0.66 : active ? 1.2 : 1,
          backgroundColor: active ? '#e6501b' : '#c3110c',
          boxShadow: active ? '0 0 16px rgba(230, 80, 27, 0.8)' : '0 0 14px rgba(195, 17, 12, 0.7)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </>
  )
}
