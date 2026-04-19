import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import IntroSequence from '../components/IntroSequence'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { capabilityMarquee, developmentLab, homeCaseStudies, homeProcess, stats, testimonials } from '../data/siteData'

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
              Not Built To Impress.
              <br />
              Built To Perform.
            </MotionHeading>

            <MotionParagraph
              className="section-copy relative z-10 mx-auto max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              We design and ship business-ready digital experiences with clear messaging, fast performance,
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

            <motion.div
              className="home-capability-marquee"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
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

        <section className="section-shell home-lab-section">
          <div className="home-lab-grid">
            <motion.article
              className="home-lab-copy"
              initial={{ opacity: 0, x: -34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-kicker">Development Lab</span>
              <h2 className="section-title">Creative UI, Engineered Like Product Software</h2>
              <p className="section-copy">
                We do not just decorate screens. We build interaction systems: responsive layouts, reusable components,
                animation rules, conversion paths, and launch-ready code.
              </p>

              <div className="home-lab-stack">
                {developmentLab.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>

            <motion.article
              className="home-lab-console"
              initial={{ opacity: 0, y: 34, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="home-lab-window">
                <div className="home-lab-topbar">
                  <span />
                  <span />
                  <span />
                  <p>mernpixel.build</p>
                </div>

                <div className="home-lab-code">
                  {developmentLab.codeLines.map((line, index) => (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.12 }}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>

              <div className="home-device-preview" aria-hidden>
                <div className="home-device-screen">
                  <span className="home-device-orbit" />
                  <span className="home-device-card home-device-card-a" />
                  <span className="home-device-card home-device-card-b" />
                  <span className="home-device-card home-device-card-c" />
                </div>
              </div>

              <div className="home-lab-signals">
                {developmentLab.signals.map((item) => (
                  <div key={item.label}>
                    <p>{item.value}</p>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

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
