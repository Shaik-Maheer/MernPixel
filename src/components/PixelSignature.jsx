import { motion } from 'framer-motion'

const orbitDots = Array.from({ length: 9 }, (_, index) => index)

export default function PixelSignature() {
  const MotionSpan = motion.span

  return (
    <div className="pixel-signature" aria-hidden="true">
      <div className="pixel-signature-ring">
        {orbitDots.map((dot) => (
          <MotionSpan
            key={dot}
            style={{ '--dot-index': dot }}
            animate={{ opacity: [0.22, 0.9, 0.22], scale: [0.78, 1.18, 0.78] }}
            transition={{ duration: 2.8, delay: dot * 0.16, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="pixel-signature-rail">
        <span>Strategy</span>
        <span>UI</span>
        <span>Code</span>
        <span>Launch</span>
      </div>
    </div>
  )
}
