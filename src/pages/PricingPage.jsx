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
          <h1>Clear pricing tiers for businesses at every stage.</h1>
          <p className="mp-lead">Custom pricing is available for advanced requirements and long-term engagements.</p>
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
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <p className="mp-chip">{plan.name}</p>
              <h3>{plan.price}</h3>
              <p>{plan.summary}</p>
              <ul className="mp-list">
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to="/contact" className="mp-btn mp-btn-ghost mp-magnetic">Choose {plan.name}</Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Custom Pricing Available</p>
            <h2>Need a tailored proposal for your project?</h2>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Discuss Your Project</Link>
        </div>
      </section>
    </main>
  )
}
