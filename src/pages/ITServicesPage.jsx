import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop'
import { servicesDetailed } from '../data/siteData'

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
          <h1>Detailed service stack built for conversion and scale.</h1>
          <p className="mp-lead">Every service includes clear outcomes, practical use cases, and delivery confidence.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {servicesDetailed.map((service, index) => (
            <motion.article key={service.id} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.04 }}>
              <p className="mp-chip">{service.icon} {service.title}</p>
              <p>{service.description}</p>

              <h3>Features</h3>
              <ul className="mp-list">
                {service.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>Use Cases</h3>
              <ul className="mp-list">
                {service.useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="mp-outcome">Outcome: {service.outcome}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Need a custom scope?</p>
            <h2>We tailor services to your exact business model.</h2>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Discuss Your Project</Link>
        </div>
      </section>
    </main>
  )
}
