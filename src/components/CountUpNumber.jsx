import { useEffect, useRef, useState } from 'react'

function parseStatValue(value) {
  const text = String(value)
  const match = text.match(/^(\d+)(.*)$/)
  if (!match) {
    return { number: 0, suffix: text }
  }
  return {
    number: Number(match[1]),
    suffix: match[2],
  }
}

export default function CountUpNumber({ value, duration = 1300 }) {
  const elementRef = useRef(null)
  const frameRef = useRef(null)
  const startedRef = useRef(false)
  const [current, setCurrent] = useState(0)
  const { number, suffix } = parseStatValue(value)

  useEffect(() => {
    const element = elementRef.current
    if (!element || startedRef.current) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) {
          return
        }

        startedRef.current = true
        const start = performance.now()

        const tick = (time) => {
          const progress = Math.min((time - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCurrent(Math.round(number * eased))

          if (progress < 1) {
            frameRef.current = window.requestAnimationFrame(tick)
          }
        }

        frameRef.current = window.requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.45 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [duration, number])

  return (
    <span ref={elementRef}>
      {current}
      {suffix}
    </span>
  )
}

