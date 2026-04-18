import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'

const services = [
  {
    title: 'Web Development',
    icon: '◈',
    description: 'High-performance websites and web apps engineered for speed, scalability, and business conversion.',
    details: [
      'Custom websites and web apps with conversion-first architecture.',
      'Performance optimization, Core Web Vitals tuning, and scalable deployment setup.',
      'Clean code structure, admin-friendly management, and long-term maintenance support.',
    ],
  },
  {
    title: 'E-commerce Web Application',
    icon: '⬢',
    description: 'Conversion-driven online store systems with smooth catalog flow, secure checkout logic, and admin-ready operations.',
    details: [
      'Custom e-commerce experiences for beauty, fashion, lifestyle, and niche products.',
      'Product catalog, cart, checkout flow, and order lifecycle integration.',
      'Performance-focused UI with offer modules, upsell blocks, and trust-first purchase journey.',
    ],
  },
  {
    title: 'UI/UX Design',
    icon: '◍',
    description: 'Premium interface systems focused on clarity, interaction quality, and consistent user journeys.',
    details: [
      'User-flow planning, wireframes, and high-fidelity visual systems.',
      'Reusable UI component language for consistent product experience.',
      'Interaction patterns optimized for usability, trust, and conversion.',
    ],
  },
  {
    title: 'SEO & Digital Growth',
    icon: '⬈',
    description: 'Search-ready structures and growth strategy execution that improve visibility and lead quality.',
    details: [
      'Technical SEO foundations: metadata, semantic structure, and crawl readiness.',
      'Keyword-focused content structure aligned to business goals.',
      'Growth roadmap tracking visibility, traffic quality, and lead outcomes.',
    ],
  },
  {
    title: 'Branding & Identity',
    icon: '✦',
    description: 'Distinct brand systems across logo direction, typography behavior, and digital design language.',
    details: [
      'Logo and visual identity direction for digital-first brands.',
      'Typography, color, and style system for consistent brand communication.',
      'Brand assets and usage guidance for web, social, and campaigns.',
    ],
  },
  {
    title: 'Academic & Project Solutions',
    icon: '▣',
    description: 'Structured support for major and minor academic projects with mentoring and practical implementation.',
    details: [
      'Major/minor project planning with clear delivery milestones.',
      'Implementation support, architecture guidance, and code review.',
      'Documentation and presentation readiness for final submission.',
    ],
  },
  {
    title: 'Talent Bridge Program',
    icon: '⟐',
    description: 'Connecting businesses with ready talent and helping candidates align skills with real opportunities.',
    details: [
      'Role mapping and candidate screening aligned to business needs.',
      'Interview-ready profile improvement for students and professionals.',
      'Hiring support with faster turnaround and quality-fit filtering.',
    ],
  },
]

export default function ITServicesPage() {
  const MotionMain = motion.main
  const MotionDiv = motion.div
  const MotionSection = motion.section
  const MotionCard = motion.article
  const [activeService, setActiveService] = useState(null)

  const { scrollYProgress } = useScroll()
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, -120])
  const orbShiftA = useTransform(scrollYProgress, [0, 1], [0, -70])
  const orbShiftB = useTransform(scrollYProgress, [0, 1], [0, 85])

  return (
    <MotionMain className="whatdo-page pt-28">
      <PageIntroHero
        title="WHAT WE DO"
        subtitle="Complete digital solutions tailored to your needs"
        compact
      />

      <MotionDiv className="whatdo-grid-bg" style={{ y: bgShift }} />
      <MotionDiv className="whatdo-orb whatdo-orb-a" style={{ y: orbShiftA }} />
      <MotionDiv className="whatdo-orb whatdo-orb-b" style={{ y: orbShiftB }} />

      <MotionSection className="section-shell relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }}>
        <span className="section-kicker">Services Grid</span>
        <h1 className="section-title">Premium Services Stack</h1>
        <p className="section-copy max-w-3xl">Built for founders, businesses, and students who need execution with quality.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <MotionCard
              key={service.title}
              className="whatdo-card glass-card cursor-target rounded-3xl p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setActiveService(service)}
            >
              <div className="whatdo-icon-wrap">
                <span className="whatdo-icon">{service.icon}</span>
              </div>

              <h2 className="mt-5 font-['Cinzel'] text-3xl text-white">{service.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/74">{service.description}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[#27B9FF]">Click to view full scope</p>
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

      <AnimatePresence>
        {activeService && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveService(null)}
          >
            <motion.article
              className="glass-card relative w-full max-w-2xl rounded-3xl p-8 md:p-10"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="cursor-target absolute right-4 top-4 h-10 w-10 rounded-full border border-white/30 bg-white/5 text-xl text-white transition hover:bg-white hover:text-black"
                aria-label="Close details"
              >
                ×
              </button>

              <p className="text-xs uppercase tracking-[0.22em] text-white/56">Premium Service</p>
              <h3 className="mt-3 font-['Cinzel'] text-4xl text-white">{activeService.title}</h3>
              <p className="mt-4 text-white/78">{activeService.description}</p>

              <ul className="mt-6 space-y-3 text-sm text-white/75">
                {activeService.details.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#27B9FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionMain>
  )
}
