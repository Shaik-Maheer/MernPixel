import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import CloudinaryVideo from '../components/CloudinaryVideo'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'

const services = [
  {
    title: 'Web Development',
    icon: '◈',
    description: 'High-performance websites and web apps engineered for speed, scalability, and business conversion.',
  },
  {
    title: 'UI/UX Design',
    icon: '◍',
    description: 'Premium interface systems focused on clarity, interaction quality, and consistent user journeys.',
  },
  {
    title: 'SEO & Digital Growth',
    icon: '⬈',
    description: 'Search-ready structures and growth strategy execution that improve visibility and lead quality.',
  },
  {
    title: 'Branding & Identity',
    icon: '✦',
    description: 'Distinct brand systems across logo direction, typography behavior, and digital design language.',
  },
  {
    title: 'Academic & Project Solutions',
    icon: '▣',
    description: 'Structured support for major and minor academic projects with mentoring and practical implementation.',
  },
  {
    title: 'Talent Bridge Program',
    icon: '⟐',
    description: 'Connecting businesses with ready talent and helping candidates align skills with real opportunities.',
  },
]

const birds = [
  { top: '12%', size: 32, duration: 22, delay: 0 },
  { top: '24%', size: 26, duration: 26, delay: 4 },
  { top: '36%', size: 30, duration: 24, delay: 7 },
  { top: '18%', size: 22, duration: 20, delay: 10 },
  { top: '42%', size: 28, duration: 28, delay: 2 },
]

export default function ITServicesPage() {
  const MotionMain = motion.main
  const MotionDiv = motion.div
  const MotionSection = motion.section
  const MotionCard = motion.article

  const { scrollYProgress } = useScroll()
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, -120])
  const orbShiftA = useTransform(scrollYProgress, [0, 1], [0, -70])
  const orbShiftB = useTransform(scrollYProgress, [0, 1], [0, 85])

  return (
    <MotionMain className="whatdo-page pt-28">
      <PageIntroHero
        title="WHAT WE DO"
        subtitle="Complete digital solutions tailored to your needs"
        videoSrc={cloudinaryVideos.heroWarm}
        compact
      />

      <MotionDiv className="whatdo-grid-bg" style={{ y: bgShift }} />
      <MotionDiv className="whatdo-orb whatdo-orb-a" style={{ y: orbShiftA }} />
      <MotionDiv className="whatdo-orb whatdo-orb-b" style={{ y: orbShiftB }} />
      <CloudinaryVideo
        className="whatdo-sky-video"
        sources={cloudinaryVideos.serviceSky}
      />
      <div className="whatdo-sky-overlay" />

      <div className="whatdo-birds" aria-hidden>
        {birds.map((bird, index) => (
          <span
            key={`bird-${index}`}
            className="whatdo-bird"
            style={{
              top: bird.top,
              width: `${bird.size}px`,
              height: `${bird.size * 0.55}px`,
              animationDuration: `${bird.duration}s`,
              animationDelay: `${bird.delay}s`,
            }}
          >
            <svg viewBox="0 0 28 14">
              <path d="M1 10C4 4 8 4 14 10C20 4 24 4 27 10" />
            </svg>
          </span>
        ))}
      </div>

      <MotionSection className="section-shell relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }}>
        <span className="section-kicker">Services Grid</span>
        <h1 className="section-title">Premium Services Stack</h1>
        <p className="section-copy max-w-3xl">Built for founders, businesses, and students who need execution with quality.</p>

        <div className="whatdo-particles" aria-hidden>
          {Array.from({ length: 20 }).map((_, index) => (
            <span
              key={`whatdo-particle-${index}`}
              className="whatdo-particle"
              style={{
                left: `${(index * 5.1) % 100}%`,
                animationDelay: `${(index % 7) * 0.42}s`,
                animationDuration: `${4.3 + (index % 5) * 0.54}s`,
              }}
            />
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <MotionCard
              key={service.title}
              className="whatdo-card glass-card rounded-3xl p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="whatdo-icon-wrap">
                <span className="whatdo-icon">{service.icon}</span>
              </div>

              <h2 className="mt-5 font-['Cinzel'] text-3xl text-white">{service.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/74">{service.description}</p>
            </MotionCard>
          ))}
        </div>
      </MotionSection>

      <section className="section-shell relative z-10 pt-2">
        <motion.article
          className="whatdo-cta glass-card rounded-3xl px-7 py-14 text-center md:px-12 md:py-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-['Cinzel'] text-4xl text-white md:text-6xl">Let&apos;s Build Something Together</h2>

          <Link to="/contact" className="btn-primary mt-8 inline-flex cursor-target">
            Start Your Project 🚀
          </Link>
        </motion.article>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Explore Our Creations"
        description="See how these capabilities are translated into real project outcomes."
        to="/portfolio"
        buttonLabel="View Projects"
      />
    </MotionMain>
  )
}
