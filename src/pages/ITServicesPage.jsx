import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop'
import { servicePlanets } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

export default function ITServicesPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/two.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Services</p>
          <h1>Premium digital services built for business outcomes.</h1>
          <p className="mp-lead">From corporate sites to applications and growth systems, every service is tuned for real performance.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {servicePlanets.map((service, index) => (
            <motion.article key={service.title} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5, delay: index * 0.04 }}>
              <p className="mp-chip" style={{ '--chip-color': service.color }}>{service.title}</p>
              <p>{service.summary}</p>
              <ul className="mp-list">
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Project Intake</p>
            <h2>Need execution you can trust?</h2>
            <p className="mp-lead">Share your requirement and we will map scope, timeline, and delivery model.</p>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary">Discuss Requirement</Link>
        </div>
      </section>
    </main>
  )
}
