import { useEffect, useState } from 'react'
import logo from '../assets/mernpixel-logo.svg'

export default function StartupLoader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startedAt = performance.now()
    let frameId = 0

    const tick = (now) => {
      const elapsed = now - startedAt
      const next = Math.min(100, Math.round((elapsed / 2200) * 100))
      setProgress(next)

      if (next < 100) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => {
          onDone?.()
        }, 260)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [onDone])

  return (
    <div className="mp-loader" role="status" aria-live="polite">
      <div className="mp-loader-grid" />
      <div className="mp-loader-bubbles" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="mp-loader-inner">
        <img src={logo} alt="MERNpixel" className="mp-loader-logo" />
        <p>MERNpixel</p>
        <h2>Launching Experience</h2>
        <div className="mp-loader-bar" aria-hidden>
          <span style={{ width: `${progress}%` }} />
        </div>
        <small>{progress}%</small>
      </div>
    </div>
  )
}
