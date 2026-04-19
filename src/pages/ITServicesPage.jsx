import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'

const services = [
  {
    title: 'Web Development',
    icon: '◈',
    description: 'Fast websites and web apps.',
    details: [
      'Custom build.',
      'Performance tuned.',
      'Maintainable code.',
    ],
  },
  {
    title: 'E-commerce Web Application',
    icon: '⬢',
    description: 'Conversion-ready store systems.',
    details: [
      'Catalog + checkout.',
      'Order flow integration.',
      'Performance UI.',
    ],
  },
  {
    title: 'UI/UX Design',
    icon: '◍',
    description: 'Clear and conversion-focused UI.',
    details: [
      'Flow planning.',
      'Reusable components.',
      'Usability focused.',
    ],
  },
  {
    title: 'SEO & Digital Growth',
    icon: '⬈',
    description: 'Search and growth support.',
    details: [
      'Technical SEO.',
      'Keyword structure.',
      'Growth tracking.',
    ],
  },
  {
    title: 'Branding & Identity',
    icon: '✦',
    description: 'Brand and identity systems.',
    details: [
      'Logo direction.',
      'Typography and color.',
      'Brand assets.',
    ],
  },
  {
    title: 'Academic & Project Solutions',
    icon: '▣',
    description: 'Major/minor project support.',
    details: [
      'Planning support.',
      'Implementation help.',
      'Final submission prep.',
    ],
  },
  {
    title: 'Talent Bridge Program',
    icon: '⟐',
    description: 'Hiring and candidate support.',
    details: [
      'Role mapping.',
      'Profile improvement.',
      'Faster screening.',
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
        subtitle="Digital services for design, build, and growth."
        compact
      />

      <MotionDiv className="whatdo-grid-bg" style={{ y: bgShift }} />
      <MotionDiv className="whatdo-orb whatdo-orb-a" style={{ y: orbShiftA }} />
      <MotionDiv className="whatdo-orb whatdo-orb-b" style={{ y: orbShiftB }} />

      <MotionSection
        className="section-shell relative z-10 whatdo-overview"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
      >
        <div className="whatdo-overview-grid">
          <article className="glass-card whatdo-overview-card rounded-3xl p-7 md:p-9">
            <span className="section-kicker">Service Promise</span>
            <h1 className="section-title">From idea to launch.</h1>
          </article>
        </div>
      </MotionSection>

      <MotionSection className="section-shell relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }}>
        <span className="section-kicker">Services Grid</span>
        <h1 className="section-title">Premium Services Stack</h1>

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
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[#27B9FF]">View scope</p>
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
        description="See completed project outcomes."
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
