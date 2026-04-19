import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CountUpNumber from '../components/CountUpNumber'
import IntroSequence from '../components/IntroSequence'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import {
  capabilityMarquee,
  homeCaseStudies,
  stats,
} from '../data/siteData'

export default function HomePage({ showIntro, onIntroComplete }) {
  const MotionHeading = motion.h1
  const MotionParagraph = motion.p
  const MotionSection = motion.section

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
        <section className="home-hero relative flex min-h-screen items-center overflow-hidden">
          <video
            className="home-hero-video"
            src={cloudinaryVideos.emberOceanDeep}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="home-hero-overlay" />

          <div className="section-shell relative">
            <div className="home-hero-layout">
              <div className="home-hero-copy">
                <motion.p
                  className="home-hero-kicker"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  MernPixel Studio
                </motion.p>

                <MotionHeading
                  className="home-hero-title relative z-10"
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  Not Built To Impress.
                  <br />
                  Built To Perform.
                </MotionHeading>

                <MotionParagraph
                  className="home-hero-subtitle"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  We design and ship business-ready digital experiences with clear messaging, fast performance,
                  and conversion-focused flows.
                </MotionParagraph>

                <motion.div
                  className="home-hero-actions mt-9 flex flex-wrap items-center gap-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to="/works" className="btn-primary cursor-target">
                    Explore Work
                  </Link>
                  <Link to="/about" className="btn-secondary cursor-target">
                    About Studio
                  </Link>
                </motion.div>
              </div>

              <motion.aside
                className="home-hero-panel glass-card"
                initial={{ opacity: 0, x: 34, y: 18 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="home-hero-panel-kicker">Studio Signals</p>
                <h2>Design clarity with product-level engineering.</h2>

                <div className="home-hero-panel-stats">
                  {stats.map((item) => (
                    <article key={item.label}>
                      <p>
                        <CountUpNumber value={item.value} />
                      </p>
                      <span>{item.label}</span>
                    </article>
                  ))}
                </div>
              </motion.aside>
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

        <MotionSection
          className="section-shell"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-kicker">Featured</span>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-copy">A quick visual snapshot. Full details are in Work.</p>

          <div className="mt-10 grid gap-7 lg:grid-cols-3">
            {homeCaseStudies.map((project, index) => (
              <motion.article
                key={project.name}
                className="glass-card home-case-card rounded-3xl p-5"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="cursor-target">
                  <div className="home-case-preview">
                    <img src={project.image} alt={`${project.name} preview`} loading="lazy" />
                  </div>
                  <p className="home-case-category">{project.category}</p>
                  <h3 className="home-case-title">{project.name}</h3>
                </a>
              </motion.article>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <Link to="/works" className="btn-secondary cursor-target">
              View All Works
            </Link>
          </div>
        </MotionSection>
      </main>
    </>
  )
}
