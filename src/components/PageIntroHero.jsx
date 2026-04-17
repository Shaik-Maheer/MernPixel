import { motion } from 'framer-motion'
import { cloudinaryVideos } from '../data/cloudinaryVideos'

export default function PageIntroHero({
  kicker = 'MERNPIXEL',
  title,
  subtitle,
  scrollText = 'Scroll to feel the difference ↓',
  videoSrc = cloudinaryVideos.emberOcean,
  compact = false,
}) {
  const MotionSpan = motion.span
  const MotionParagraph = motion.p
  const letters = title.split('')

  return (
    <section className={`page-intro ${compact ? 'page-intro-compact' : ''}`}>
      <video className="page-intro-video" src={videoSrc} autoPlay muted loop playsInline />
      <div className="page-intro-overlay" />
      <div className="page-intro-grid" />

      <div className="section-shell relative z-10 flex min-h-[66vh] flex-col items-center justify-center text-center">
        <p className="page-intro-kicker">{kicker}</p>

        <h1 className="page-intro-title">
          {letters.map((letter, index) => (
            <MotionSpan
              key={`${letter}-${index}`}
              className="page-intro-letter cursor-target"
              style={{ '--letter-index': index }}
              initial={{ opacity: 0, y: 42, scale: 0.82 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.75 }}
              transition={{ duration: 0.42, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </MotionSpan>
          ))}
        </h1>

        {subtitle && (
          <MotionParagraph
            className="page-intro-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.75 }}
            transition={{ duration: 0.52, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </MotionParagraph>
        )}

        <MotionParagraph
          className="page-intro-scroll"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.5, delay: 0.62 }}
        >
          {scrollText}
        </MotionParagraph>
      </div>
    </section>
  )
}
