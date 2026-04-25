import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop'
import { pricingPlans } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function PricingPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/five.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Pricing</p>
          <h1>Simple plans built for execution speed.</h1>
          <p className="mp-lead">Transparent ranges. Clear deliverables.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-3">
          {pricingPlans.map((plan, index) => (
            <motion.article
              key={plan.name}
              className={`mp-card mp-pricing-card ${plan.featured ? 'is-featured' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.42, delay: index * 0.05 }}
            >
              <p className="mp-chip">{plan.name}</p>
              <h3>{plan.price}</h3>
              <p>{plan.summary}</p>
              <ul className="mp-list">
                {plan.includes.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Get Started</Link>
            </motion.article>
          ))}
        </div>
        <div className="mp-actions mp-actions-center">
          <p className="mp-lead">Custom pricing available</p>
        </div>
      </section>
    </main>
  )
}
