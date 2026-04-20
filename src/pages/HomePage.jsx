import { motion } from 'framer-motion'
import { capabilityMarquee } from '../data/siteData'

export default function HomePage() {
  const MotionHeading = motion.h1
  const MotionParagraph = motion.p

  return (
    <>
      <main id="home" className="relative">
        <section className="home-hero home-hero-minimal relative flex min-h-screen items-center overflow-hidden">
          <div className="home-hero-particles" aria-hidden>
            {Array.from({ length: 168 }).map((_, index) => (
              <span
                key={`hero-particle-${index}`}
                style={{
                  '--hero-particle-left': `${(index * 7.13) % 100}%`,
                  '--hero-particle-top': `${(index * 11.91) % 100}%`,
                  '--hero-particle-delay': `${(index % 17) * 0.22}s`,
                  '--hero-particle-size': `${1 + (index % 3)}px`,
                  '--hero-particle-drift': `${8 + (index % 8) * 1.8}px`,
                  '--hero-particle-duration': `${5.4 + (index % 7) * 0.6}s`,
                }}
              />
            ))}
          </div>
          <div className="home-hero-overlay" />

          <div className="section-shell relative">
            <div className="home-hero-minimal-wrap">
              <motion.p
                className="home-hero-brand-line"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                mern pixel
              </motion.p>

              <motion.p
                className="home-hero-kicker"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                MernPixel Studio
              </motion.p>

              <MotionHeading
                className="home-hero-title relative z-10"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Not Built To Impress.
                <br />
                Built To Perform.
              </MotionHeading>

              <MotionParagraph
                className="home-hero-subtitle"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                We design and ship business-ready digital experiences with clear messaging, fast performance,
                and conversion-focused flows.
              </MotionParagraph>
            </div>

            <motion.div
              className="home-capability-marquee"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="home-capability-track">
                {[...capabilityMarquee, ...capabilityMarquee].map((item, index) => (
                  <span key={`${item}-${index}`}>{item}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
