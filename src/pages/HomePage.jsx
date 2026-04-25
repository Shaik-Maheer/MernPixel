import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CountUpNumber from '../components/CountUpNumber'
import HeroBackdrop from '../components/HeroBackdrop'
import SlidingComments from '../components/SlidingComments'
import { capabilityMarquee, homeCaseStudies, homeProcess, servicePlanets, stats, testimonials } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <main className="mp-page">
      <section className="mp-hero mp-hero-media">
        <HeroBackdrop video="/one.mp4" />
        <div className="mp-shell mp-hero-grid">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.65 }}>
            <p className="mp-kicker">MERNpixel Digital Studio</p>
            <h1 className="mp-display">High-converting websites for serious service businesses.</h1>
            <p className="mp-lead">
              We design, build, and optimize performance-first websites and applications that increase trust,
              improve conversion flow, and scale with your business.
            </p>
            <div className="mp-actions">
              <Link to="/contact" className="mp-btn mp-btn-primary">Start Project</Link>
              <Link to="/works" className="mp-btn mp-btn-ghost">View Work</Link>
            </div>
          </motion.div>

          <motion.div className="mp-hero-panel" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.7, delay: 0.12 }}>
            <p>Core Strength</p>
            <h2>Brand + Conversion + Engineering</h2>
            <div className="mp-stat-grid">
              {stats.map((item) => (
                <article key={item.label}>
                  <strong><CountUpNumber value={item.value} /></strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mp-marquee" aria-hidden>
          <div className="mp-marquee-track">
            {[...capabilityMarquee, ...capabilityMarquee].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <SlidingComments items={testimonials} />

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Services</p>
            <h2>Focused solutions, zero noise.</h2>
          </div>

          <div className="mp-card-grid mp-grid-3">
            {servicePlanets.slice(0, 6).map((service, index) => (
              <motion.article key={service.title} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <p className="mp-chip" style={{ '--chip-color': service.color }}>{service.title}</p>
                <p>{service.summary}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Selected Work</p>
            <h2>Recent delivery highlights.</h2>
          </div>

          <div className="mp-card-grid mp-grid-3">
            {homeCaseStudies.map((project, index) => (
              <motion.article key={project.name} className="mp-card mp-work-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.55, delay: index * 0.06 }}>
                <img src={project.image} alt={project.name} loading="lazy" />
                <p className="mp-chip">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.impact}</p>
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="mp-text-link">Visit Live</a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Execution Model</p>
            <h2>How we deliver every project.</h2>
          </div>

          <div className="mp-card-grid mp-grid-4">
            {homeProcess.map((step, index) => (
              <motion.article key={step.step} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.05 }}>
                <h3>{step.step}</h3>
                <p>{step.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
