import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUpNumber from '../components/CountUpNumber'
import PageEndPromo from '../components/PageEndPromo'
import { cloudinaryVideos } from '../data/cloudinaryVideos'

gsap.registerPlugin(ScrollTrigger)

const aboutProofStats = [
  { value: '24+', label: 'Projects' },
  { value: '18+', label: 'Clients' },
  { value: '4', label: 'Team Members' },
  { value: '5', label: 'Years Experience' },
]
const reelStack = ['React', 'Performance UI', 'QA']

export default function AboutPage() {
  const MotionSection = motion.section
  const MotionMain = motion.main
  const MotionHeading = motion.h1
  const MotionParagraph = motion.p

  const [introComplete, setIntroComplete] = useState(false)
  const heroRef = useRef(null)
  const heroVideoRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroComplete(true)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!introComplete) {
      return undefined
    }

    const context = gsap.context(() => {
      if (heroVideoRef.current && heroRef.current) {
        gsap.to(heroVideoRef.current, {
          scale: 1.14,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        })
      }
    })

    return () => context.revert()
  }, [introComplete])

  return (
    <>
      <AnimatePresence mode="wait">
        {!introComplete && (
          <MotionSection
            key="about-loader"
            className="about-intro-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="about-intro-particles" />

            <MotionHeading
              className="about-intro-title"
              initial={{ opacity: 0, y: 64, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              ABOUT US
            </MotionHeading>

            <MotionParagraph
              className="about-intro-sub"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.36 }}
            >
              Ideas . Innovation . Impact
            </MotionParagraph>
          </MotionSection>
        )}
      </AnimatePresence>

      {introComplete && (
        <MotionMain initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <section ref={heroRef} className="relative min-h-screen overflow-hidden">
            <video
              ref={heroVideoRef}
              className="about-hero-video"
              src={cloudinaryVideos.emberOcean}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="about-hero-overlay" />

            <div className="about-falling-wrap" aria-hidden>
              {Array.from({ length: 26 }).map((_, index) => (
                <span
                  key={`fall-${index}`}
                  className="about-falling"
                  style={{
                    left: `${(index * 7) % 100}%`,
                    animationDelay: `${(index % 8) * 0.5}s`,
                    animationDuration: `${4.1 + (index % 6) * 0.6}s`,
                  }}
                />
              ))}
            </div>

            <div className="section-shell relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
              <MotionHeading
                className="about-hero-title max-w-5xl"
                initial={{ opacity: 0, y: 38, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                OUR STORY STARTED IN A HACKATHON
              </MotionHeading>

              <MotionParagraph
                className="mt-8 max-w-2xl text-xl text-white/85"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                We are four postgraduates. We formed this team at a hackathon, won ₹10,000, and kept going.
                Instead of just taking different jobs, we chose to build MernPixel.
              </MotionParagraph>
            </div>
          </section>

          <section className="section-shell about-proof-shell">
            <span className="section-kicker">Proof</span>
            <h2 className="section-title">Proof Snapshot</h2>

            <div className="about-proof-grid">
              {aboutProofStats.map((item) => (
                <motion.article
                  key={item.label}
                  className="glass-card about-proof-card rounded-3xl p-7"
                >
                  <p className="about-proof-value">
                    <CountUpNumber value={item.value} />
                  </p>
                  <span className="about-proof-label">{item.label}</span>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="section-shell about-reel-shell">
            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div className="about-reel-video-wrap">
                <video
                  className="about-reel-video"
                  src={cloudinaryVideos.gridRubikCrop}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="about-reel-overlay" />
                <p className="about-reel-tagline">We Don&apos;t Just Build. We Elevate.</p>
              </motion.div>

              <motion.article className="glass-card rounded-3xl p-7 md:p-9">
                <p className="text-xs uppercase tracking-[0.22em] text-white/58">Studio Reel</p>
                <h2 className="mt-3 font-['Cinzel'] text-4xl text-white md:text-5xl">How We Build</h2>

                <div className="about-reel-stack">
                  {reelStack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <Link to="/team" className="btn-primary mt-8 inline-flex cursor-target">
                  Open Our Team
                </Link>
              </motion.article>
            </div>
          </section>

          <PageEndPromo
            eyebrow="Next Section"
            title="Take A Tour Of Our Projects"
            description="Explore project outcomes."
            to="/portfolio"
            buttonLabel="View Our Creations"
          />
        </MotionMain>
      )}
    </>
  )
}
