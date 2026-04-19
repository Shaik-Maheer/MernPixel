import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const letters = ['M', 'E', 'R', 'N', 'p', 'i', 'x', 'e', 'l']

export default function IntroSequence({ onDone }) {
  const [phase, setPhase] = useState('effects')
  const MotionStage = motion.div
  const MotionLetter = motion.span
  const MotionPulse = motion.div
  const MotionTagline = motion.p

  useEffect(() => {
    const toLetters = window.setTimeout(() => {
      setPhase('letters')
    }, 900)

    const doneTimer = window.setTimeout(() => {
      onDone?.()
    }, 4200)

    return () => {
      window.clearTimeout(toLetters)
      window.clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <section className="intro-wrap">
      <div className="fire-spark-layer" />

      {phase === 'effects' && (
        <div className="effect-prelude">
          <MotionPulse
            className="pulse-core"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1, 1.8], opacity: [0, 0.75, 0] }}
            transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], repeat: 1, repeatDelay: 0.2 }}
          />
          <MotionPulse
            className="pulse-ring"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.25, 2.2], opacity: [0, 0.5, 0] }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      {phase === 'letters' && (
        <MotionStage
          className="intro-stage"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="intro-word">
            {letters.map((letter, index) => (
              <span key={`${letter}-${index}`} className="intro-letter">
                <MotionLetter
                  className="intro-letter-base"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </MotionLetter>

                <MotionLetter
                  className="intro-letter-fill fill-fire"
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  transition={{ duration: 1.1, delay: 1.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </MotionLetter>
              </span>
            ))}
          </div>

          <MotionTagline
            className="intro-subtext"
            initial={{ opacity: 0, y: 18, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.24em' }}
            transition={{ duration: 0.75, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          >
            We Build What Matters
          </MotionTagline>
        </MotionStage>
      )}
    </section>
  )
}
