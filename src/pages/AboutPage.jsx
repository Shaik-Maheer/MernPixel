import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import PageEndPromo from '../components/PageEndPromo'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { coreCrew } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

const differentiators = [
  {
    title: 'Web Development',
    copy: 'Scalable websites with premium interface fidelity, speed-first engineering, and clean architecture.',
  },
  {
    title: 'UI/UX Design',
    copy: 'Experience design systems that are visually striking, intuitive, and conversion-oriented.',
  },
  {
    title: 'SEO & Digital Marketing',
    copy: 'Search-ready foundations and growth campaigns aligned to business outcomes, not vanity metrics.',
  },
  {
    title: 'Academic & Portfolio Projects',
    copy: 'Structured guidance for student and portfolio outcomes with practical quality standards.',
  },
]

const storySteps = [
  {
    stepId: '01',
    title: 'Idea',
    description: 'Understanding client vision and goals',
    image: '/img3.png',
  },
  {
    stepId: '02',
    title: 'Design',
    description: 'Crafting modern UI/UX experiences',
    image: '/img5.png',
  },
  {
    stepId: '03',
    title: 'Development',
    description: 'Building scalable and high-performance solutions',
    image: '/img2.png',
  },
  {
    stepId: '04',
    title: 'Launch',
    description: 'Deploying and growing your digital presence',
    image: '/img6.png',
  },
]

const servicesGrid = [
  {
    title: 'Web Development',
    summary: 'Fast, scalable websites with premium interface quality.',
    detail:
      'Production-grade website and web app engineering with performance budgets, robust architecture, and maintainable code practices.',
  },
  {
    title: 'UI/UX Design',
    summary: 'Interfaces crafted for clarity, conversion, and delight.',
    detail:
      'Flows, component systems, and interaction principles crafted to improve usability while maintaining a premium visual standard.',
  },
  {
    title: 'SEO',
    summary: 'Search-ready architecture that supports long-term growth.',
    detail:
      'Technical SEO, semantic structure, and optimization strategy designed to improve discoverability and lead flow.',
  },
  {
    title: 'Digital Marketing',
    summary: 'Campaign and funnel execution focused on business outcomes.',
    detail:
      'Performance-led messaging, campaign structure, and optimization loops aligned with measurable growth goals.',
  },
  {
    title: 'Academic Projects',
    summary: 'Structured support for major and minor student projects.',
    detail:
      'Mentored planning, implementation guidance, and quality-focused project execution for academic outcomes.',
  },
  {
    title: 'Portfolio Creation',
    summary: 'Professional portfolio systems for students and founders.',
    detail:
      'Portfolio websites and case-study presentation structures to showcase skills, projects, and credibility effectively.',
  },
]

const headlineWords = ['Not', 'Just', 'Websites.', 'We', 'Build', 'Experiences.']
const studioMetrics = [
  { label: 'Core Team', value: '04', note: 'Specialists' },
  { label: 'Focus', value: '100%', note: 'Outcome Driven' },
  { label: 'Delivery', value: 'Fast', note: 'Production Ready' },
]
const manifestPoints = [
  'Brand story and UX structure are designed together, not in silos.',
  'Every section is built for clarity, trust, and measurable action.',
  'Visual quality is backed by clean implementation and responsive behavior.',
  'Post-launch improvements are part of the workflow, not an afterthought.',
]
const reelStack = ['React', 'Performance UI', 'Conversion Copy', 'Animation Systems', 'Growth Loops', 'QA']

function ServiceModal({ service, onClose }) {
  const MotionOverlay = motion.div
  const MotionCard = motion.article

  return (
    <AnimatePresence>
      {service && (
        <MotionOverlay
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionCard
            className="glass-card relative w-full max-w-2xl rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="cursor-target absolute right-4 top-4 h-10 w-10 rounded-full border border-white/30 bg-white/5 text-xl text-white transition hover:bg-white hover:text-black"
              aria-label="Close details"
            >
              ×
            </button>

            <p className="text-xs uppercase tracking-[0.22em] text-white/55">Service Experience</p>
            <h3 className="mt-3 font-['Cinzel'] text-4xl text-white">{service.title}</h3>
            <p className="mt-4 text-sm text-white/75">{service.detail}</p>
          </MotionCard>
        </MotionOverlay>
      )}
    </AnimatePresence>
  )
}

export default function AboutPage() {
  const MotionSection = motion.section
  const MotionMain = motion.main
  const MotionHeading = motion.h1
  const MotionParagraph = motion.p
  const MotionWord = motion.span
  const MotionCard = motion.article
  const MotionButton = motion.button

  const [introComplete, setIntroComplete] = useState(false)
  const [activeService, setActiveService] = useState(null)
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
              <h1 className="about-hero-title max-w-5xl">
                {headlineWords.map((word, index) => (
                  <MotionWord
                    key={`${word}-${index}`}
                    className="about-glow-word"
                    initial={{ opacity: 0, y: 38, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </MotionWord>
                ))}
              </h1>

              <MotionParagraph
                className="mt-8 max-w-2xl text-xl text-white/85"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                All your digital needs, one place.
              </MotionParagraph>

              <MotionParagraph
                className="about-scroll-indicator mt-14 text-sm uppercase tracking-[0.24em] text-white/65"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.15 }}
              >
                Scroll to feel the difference ↓
              </MotionParagraph>
            </div>
          </section>

          <section className="section-shell about-manifest-shell">
            <div className="about-manifest-grid">
              <motion.article
                className="glass-card about-manifest-card rounded-3xl p-7 md:p-9"
                initial={{ opacity: 0, x: -40, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="section-kicker">Studio Manifest</span>
                <h2 className="section-title">A visual studio that thinks like a product team.</h2>
                <p className="section-copy max-w-none">
                  We align positioning, interface structure, and engineering quality in one execution stream.
                  That is how we ship experiences that feel premium and perform in market.
                </p>

                <div className="about-manifest-metrics">
                  {studioMetrics.map((item) => (
                    <article key={item.label}>
                      <p>{item.value}</p>
                      <span>{item.label}</span>
                      <small>{item.note}</small>
                    </article>
                  ))}
                </div>
              </motion.article>

              <motion.article
                className="glass-card about-manifest-notes rounded-3xl p-7 md:p-9"
                initial={{ opacity: 0, x: 40, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="about-manifest-kicker">How We Operate</p>
                <ul>
                  {manifestPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <Link to="/contact" className="btn-primary mt-7 inline-flex cursor-target">
                  Plan a Discovery Call
                </Link>
              </motion.article>
            </div>
          </section>

          <section className="section-shell about-reel-shell">
            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div
                className="about-reel-video-wrap"
                initial={{ opacity: 0, scale: 0.32, borderRadius: '999px' }}
                whileInView={{ opacity: 1, scale: 1, borderRadius: '30px' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <video
                  className="about-reel-video"
                  src={cloudinaryVideos.gridRubikCrop}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="about-reel-overlay" />
              </motion.div>

              <motion.article
                className="glass-card rounded-3xl p-7 md:p-9"
                initial={{ opacity: 0, x: 38 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-white/58">Studio Reel</p>
                <h2 className="mt-3 font-['Cinzel'] text-4xl text-white md:text-5xl">How We Build</h2>
                <p className="mt-5 text-white/76">
                  From first idea to launch, we combine design, engineering, and growth execution in one focused flow. This
                  reel is delivered using Cloudinary video for smooth playback quality.
                </p>

                <div className="about-reel-stack">
                  {reelStack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {coreCrew.map((member) => (
                    <a key={member.name} href={member.linkedin} target="_blank" rel="noreferrer" className="about-crew-chip cursor-target">
                      <span>{member.name}</span>
                      <small>LinkedIn</small>
                    </a>
                  ))}
                </div>

                <Link to="/team" className="btn-primary mt-8 inline-flex cursor-target">
                  Open Our Team
                </Link>
              </motion.article>
            </div>
          </section>

          <section className="section-shell relative">
            <span className="about-blob about-blob-a" />
            <span className="about-blob about-blob-b" />
            <div className="about-grid-pattern" />

            <span className="section-kicker">Difference</span>
            <h2 className="section-title">What Makes Us Different</h2>
            <p className="section-copy">Execution depth, visual precision, and business clarity at every stage.</p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {differentiators.map((item, index) => (
                <MotionCard
                  key={item.title}
                  className="glass-card about-diff-card rounded-3xl p-7"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -10, rotateX: 2.2, rotateY: -2 }}
                >
                  <h3 className="font-['Cinzel'] text-3xl text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">{item.copy}</p>
                </MotionCard>
              ))}
            </div>
          </section>

          <section className="blueprint-shell">
            <div className="blueprint-head section-shell">
              <span className="section-kicker">Digital Blueprint</span>
              <h2 className="section-title">Digital Blueprint</h2>
              <p className="section-copy mt-4 max-w-3xl">
                A step-by-step journey of how we transform ideas into real digital products
              </p>
            </div>

            <div className="blueprint-fall-wrap" aria-hidden>
              {Array.from({ length: 16 }).map((_, index) => (
                <span
                  key={`blueprint-fall-${index}`}
                  className="blueprint-fall"
                  style={{
                    left: `${(index * 6.3) % 100}%`,
                    animationDelay: `${(index % 5) * 0.46}s`,
                    animationDuration: `${5.2 + (index % 6) * 0.45}s`,
                  }}
                />
              ))}
            </div>

            <div className="section-shell pt-8 pb-20">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {storySteps.map((step, index) => (
                  <MotionCard
                    key={step.title}
                    className="blueprint-card glass-card rounded-3xl p-8"
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.58, delay: index * 0.08 }}
                  >
                    <div className="blueprint-media">
                      <img className="blueprint-media-image" src={step.image} alt={`${step.title} step visual`} loading="lazy" />
                      <span className="blueprint-media-glow" />
                    </div>

                    <div className="blueprint-content">
                      <p className="blueprint-step text-xs uppercase tracking-[0.22em] text-white/60">
                        Step {step.stepId}
                      </p>
                      <h3 className="blueprint-title mt-4 font-['Cinzel'] text-4xl text-white">{step.title}</h3>
                      <p className="blueprint-copy mt-6 text-white/75">{step.description}</p>
                    </div>
                  </MotionCard>
                ))}
              </div>
            </div>
          </section>

          <section className="section-shell">
            <span className="section-kicker">Experience Grid</span>
            <h2 className="section-title">Services Experience Grid</h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {servicesGrid.map((service, index) => (
                <MotionButton
                  key={service.title}
                  type="button"
                  onClick={() => setActiveService(service)}
                  className="glass-card cursor-target services-grid-card rounded-3xl p-7 text-left"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.64, delay: index * 0.08 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="services-grid-icon">✦</div>
                  <h3 className="mt-4 font-['Cinzel'] text-3xl text-white">{service.title}</h3>
                  <p className="mt-3 text-sm text-white/72">{service.summary}</p>
                </MotionButton>
              ))}
            </div>
          </section>

          <PageEndPromo
            eyebrow="Next Section"
            title="Take A Tour Of Our Projects"
            description="Explore our project outcomes and see how each idea is executed with quality."
            to="/portfolio"
            buttonLabel="View Our Creations"
          />
        </MotionMain>
      )}

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  )
}
