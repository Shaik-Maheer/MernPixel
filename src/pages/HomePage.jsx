import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import IntroSequence from '../components/IntroSequence'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { business, homeCaseStudies, homeProcess, stats, testimonials } from '../data/siteData'

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

          <div className="section-shell relative text-center">
            <MotionHeading
              className="home-hero-title relative z-10 mx-auto max-w-5xl"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Websites That Look Premium.
              <br />
              Built To Perform.
            </MotionHeading>

            <MotionParagraph
              className="section-copy relative z-10 mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {business.tagline} We design and ship business-ready digital experiences with clear messaging, fast performance,
              and conversion-focused flows.
            </MotionParagraph>

            <motion.div
              className="home-hero-actions mt-9 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/contact" className="btn-primary cursor-target">
                Start Your Project
              </Link>
              <Link to="/works" className="btn-secondary cursor-target">
                See Live Work
              </Link>
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
          <span className="section-kicker">Proof</span>
          <h2 className="section-title">What Users Actually Care About</h2>
          <p className="section-copy">Speed, clarity, trust, and a smooth path to contact.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="glass-card home-proof-card rounded-2xl p-6">
                <p className="home-proof-value">{item.value}</p>
                <p className="home-proof-label">{item.label}</p>
              </article>
            ))}
          </div>
        </MotionSection>

        <section className="section-shell">
          <span className="section-kicker">Case Studies</span>
          <h2 className="section-title">Recent Outcomes</h2>
          <p className="section-copy">Real projects with measurable improvement, not just visual screens.</p>

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
                  <p className="home-case-impact">{project.impact}</p>
                  <ul className="home-case-metrics">
                    {project.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <span className="section-kicker">How We Work</span>
          <h2 className="section-title">Simple, Fast, Reliable Execution</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {homeProcess.map((item, index) => (
              <motion.article
                key={item.step}
                className="glass-card home-process-card rounded-3xl p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <p className="home-process-step">0{index + 1}</p>
                <h3 className="home-process-title">{item.step}</h3>
                <p className="home-process-detail">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-shell pt-0">
          <article className="glass-card rounded-3xl p-8 text-center md:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-white/58">Client Voice</p>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-white/85 md:text-2xl">
              "{testimonials[0].quote}"
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[#7ADBEF]">{testimonials[0].name}</p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary cursor-target">
                Book a Free Discovery Call
              </Link>
              <Link to="/services" className="btn-secondary cursor-target">
                Explore Services
              </Link>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}
