import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logo from '../assets/mernpixel-logo.svg'
import { featuredStats, processSteps, serviceHighlights } from '../data/siteData'

export default function HomePage() {
  const [openCard, setOpenCard] = useState(null)

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">MERNpixel Digital Studio</p>
            <h1>Professional web experiences built for service brands.</h1>
            <p className="lead-copy">
              We build fast websites and web applications that improve trust, generate quality leads, and support business growth.
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">Start Project</Link>
              <Link to="/services" className="btn btn-secondary">View Services</Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-logo-wrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <img src={logo} alt="MERNpixel" />
          </motion.div>
        </div>
      </section>

      <section className="section-block compact-top">
        <div className="container stats-row">
          {featuredStats.map((item) => (
            <article key={item.label} className="stat-card">
              <p>{item.value}</p>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Core Services</p>
            <h2>Only what drives outcomes.</h2>
          </div>

          <div className="card-grid">
            {serviceHighlights.map((service, index) => {
              const expanded = openCard === index
              return (
                <article key={service.title} className={`service-card ${expanded ? 'is-expanded' : ''}`}>
                  <h3>{service.title}</h3>
                  <p className="card-short">{service.short}</p>
                  <p className="card-detail">{service.detail}</p>
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => setOpenCard(expanded ? null : index)}
                  >
                    {expanded ? 'Hide' : 'View more'}
                  </button>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-block process-band">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How We Work</p>
            <h2>Simple process. Clear ownership.</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <article key={step.title} className="process-card">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
