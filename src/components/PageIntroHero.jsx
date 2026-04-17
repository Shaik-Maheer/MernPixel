import { motion } from 'framer-motion'
import CloudinaryVideo from './CloudinaryVideo'
import { cloudinaryVideos } from '../data/cloudinaryVideos'

export default function PageIntroHero({
  kicker = 'MERNPIXEL',
  title,
  subtitle,
  scrollText = 'Scroll to feel the difference ↓',
  videoSrc = cloudinaryVideos.heroHome,
  compact = false,
}) {
  const MotionSpan = motion.span
  const MotionParagraph = motion.p
  const letters = title.split('')
  const heroSources = Array.isArray(videoSrc) ? videoSrc : [videoSrc]

  return (
    <section className={`page-intro ${compact ? 'page-intro-compact' : ''}`}>
      <CloudinaryVideo className="page-intro-video" sources={heroSources} />
      <div className="page-intro-overlay" />
      <div className="page-intro-grid" />
      <div className="page-intro-ambient" aria-hidden>
        {cloudinaryVideos.introAmbientSets.map((sources, index) => (
          <motion.div
            key={`ambient-${index}`}
            className={`page-intro-clip clip-${index + 1}`}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.56, delay: 0.18 + index * 0.11 }}
          >
            <CloudinaryVideo sources={sources} />
          </motion.div>
        ))}
      </div>

      <div className="section-shell relative z-10 flex min-h-[66vh] flex-col items-center justify-center text-center">
        <p className="page-intro-kicker">{kicker}</p>

        <h1 className="page-intro-title">
          {letters.map((letter, index) => (
            <MotionSpan
              key={`${letter}-${index}`}
              className="page-intro-letter cursor-target"
              initial={{ opacity: 0, y: 42, scale: 0.82 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.75 }}
              transition={{ duration: 0.42, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.2 }}
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
