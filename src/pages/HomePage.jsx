import { Suspense, lazy, useCallback } from 'react'
import { motion } from 'framer-motion'
import IntroSequence from '../components/IntroSequence'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { business } from '../data/siteData'

const SolarSystemHero3D = lazy(() => import('../components/SolarSystemHero3D'))

export default function HomePage({ showIntro, onIntroComplete }) {
  const MotionHeading = motion.h1
  const MotionParagraph = motion.p
  const MotionWord = motion.span
  const heroWords = ['Not', 'Just', 'Websites.', 'We', 'Build', 'Experiences.']

  const handleIntroDone = useCallback(() => {
    onIntroComplete?.()

    window.setTimeout(() => {
      const home = document.getElementById('home')
      if (home) {
        home.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 240)
  }, [onIntroComplete])

  return (
    <>
      {showIntro && <IntroSequence onDone={handleIntroDone} />}

      <main id="home" className="relative">
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <video
            className="home-hero-video"
            src={cloudinaryVideos.emberOceanDeep}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="home-hero-overlay" />

          <div className="home-planet-layer" aria-hidden>
            <Suspense fallback={null}>
              <SolarSystemHero3D />
            </Suspense>
          </div>

          <span className="floating-orb left-[6%] top-[15%] h-64 w-64 bg-hotpink" />
          <span className="floating-orb right-[8%] top-[18%] h-60 w-60 bg-ember/60" />

          <div className="section-shell relative text-center">
            <MotionHeading
              className="home-hero-title relative z-10 mx-auto max-w-5xl"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroWords.map((word, index) => (
                <MotionWord
                  key={`${word}-${index}`}
                  className="home-hero-word"
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </MotionWord>
              ))}
            </MotionHeading>

            <MotionParagraph
              className="section-copy relative z-10 mx-auto"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              {business.tagline}
            </MotionParagraph>
          </div>
        </section>
      </main>
    </>
  )
}
