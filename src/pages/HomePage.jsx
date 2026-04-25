import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CountUpNumber from '../components/CountUpNumber'
import HeroBackdrop from '../components/HeroBackdrop'
import SlidingComments from '../components/SlidingComments'
import {
  achievements,
  caseStudies,
  confidenceBoosters,
  lectureEvents,
  originTimeline,
  pricingPlans,
  processSteps,
  servicesDetailed,
  stats,
  testimonials,
  trustPoints,
  trustBrands,
  whyChoose,
} from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const featured = caseStudies.slice(0, 3)

  return (
    <main className="mp-page">
      <section className="mp-hero mp-hero-media">
        <HeroBackdrop video="/one.mp4" />

        <div className="mp-shell mp-hero-grid">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.6 }}>
            <p className="mp-kicker">MERNpixel Premium Studio</p>
            <h1 className="mp-display">We build digital products that drive real business growth.</h1>
            <p className="mp-lead">Performance-first engineering, conversion-focused UX, and scalable architecture for brands that demand quality.</p>
            <div className="mp-actions">
              <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Get Started</Link>
              <Link to="/works" className="mp-btn mp-btn-ghost mp-magnetic">View Work</Link>
            </div>
          </motion.div>

          <motion.aside className="mp-hero-panel" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.7, delay: 0.1 }}>
            <p>Delivery Snapshot</p>
            <h2>Reliable quality from strategy to launch.</h2>
            <div className="mp-stat-grid">
              {stats.map((item) => (
                <article key={item.label}>
                  <strong><CountUpNumber value={item.value} /></strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="mp-section mp-section-tight">
        <div className="mp-shell">
          <p className="mp-kicker">Trusted by growing businesses</p>
          <div className="mp-logo-row">
            {trustBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Origin Story</p>
            <h2>From Hackathon to MERNpixel</h2>
            <p className="mp-lead">Started as 4 postgraduate students, MERNpixel was forged in competition, pressure, and real execution.</p>
          </div>

          <div className="mp-timeline">
            {originTimeline.map((item, index) => (
              <motion.article
                key={item.title}
                className="mp-card mp-hover-card mp-timeline-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <p className="mp-chip">{item.stage}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </motion.article>
            ))}
          </div>
          <p className="mp-origin-quote">Not just a team, but a shared vision built through competition, learning, and execution.</p>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Guest Lectures & Impact</p>
            <h2>Sharing Knowledge, Building Future Talent</h2>
            <p className="mp-lead">Delivered invited sessions in colleges on AI tools, resume building, live coding, and placement guidance.</p>
          </div>
          <div className="mp-card-grid mp-grid-2">
            {lectureEvents.map((event, index) => (
              <motion.article
                key={`${event.date}-${event.venue}`}
                className="mp-card mp-hover-card mp-event-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="mp-event-meta">
                  <span>{event.date}</span>
                  <span>{event.venue}</span>
                  <span>{event.audience}</span>
                </div>
                <h3>{event.topic}</h3>
                <p className="mp-outcome">{event.highlight}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Achievements</p>
            <h2>Built through real execution, not just theory</h2>
          </div>
          <div className="mp-card-grid mp-grid-3">
            {achievements.map((item, index) => (
              <motion.article
                key={item.label}
                className="mp-card mp-hover-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <h3><CountUpNumber value={item.value} /></h3>
                <p className="mp-chip">{item.label}</p>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Services</p>
            <h2>Premium execution across design, development, and growth.</h2>
          </div>
          <div className="mp-card-grid mp-grid-3">
            {servicesDetailed.map((service, index) => (
              <motion.article key={service.id} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.05 }}>
                <p className="mp-chip">{service.title}</p>
                <p>{service.description}</p>
                <p className="mp-outcome">Outcome: {service.outcome}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Why Trust Us</p>
            <h2>Credibility you can verify before we start.</h2>
          </div>
          <div className="mp-card-grid mp-grid-2">
            {whyChoose.map((item, index) => (
              <motion.article key={item.title} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
          <div className="mp-card-grid mp-grid-2 mp-trust-lists">
            <article className="mp-card mp-hover-card">
              <p className="mp-kicker">Core Trust Signals</p>
              <ul className="mp-list">
                {trustPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="mp-card mp-hover-card">
              <p className="mp-kicker">Client Confidence Boosters</p>
              <ul className="mp-list">
                {confidenceBoosters.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Featured Work</p>
            <h2>Case-study driven project highlights.</h2>
          </div>
          <div className="mp-card-grid mp-grid-3">
            {featured.map((item, index) => (
              <motion.article key={item.id} className="mp-card mp-work-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <h3>{item.title}</h3>
                <p><strong>Problem:</strong> {item.problem}</p>
                <p><strong>Solution:</strong> {item.solution}</p>
                <p><strong>Result:</strong> {item.result}</p>
                <a className="mp-text-link" href={item.link} target="_blank" rel="noreferrer">Open Case Study</a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Process</p>
            <h2>Clear workflow from requirement to launch.</h2>
          </div>
          <div className="mp-card-grid mp-grid-4">
            {processSteps.map((step, index) => (
              <motion.article key={step.step} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <h3>{step.step}</h3>
                <p>{step.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Pricing Preview</p>
            <h2>Flexible plans for different growth stages.</h2>
          </div>
          <div className="mp-card-grid mp-grid-3">
            {pricingPlans.map((plan, index) => (
              <motion.article key={plan.name} className={`mp-card mp-pricing-card ${plan.featured ? 'is-featured' : ''}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.04 }}>
                <p className="mp-chip">{plan.name}</p>
                <h3>{plan.price}</h3>
                <p>{plan.summary}</p>
                <ul className="mp-list">
                  {plan.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
          <div className="mp-actions mp-actions-center">
            <Link to="/pricing" className="mp-btn mp-btn-ghost mp-magnetic">See Full Pricing</Link>
          </div>
        </div>
      </section>

      <SlidingComments items={testimonials} />

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Let’s Build</p>
            <h2>Started from a hackathon. Now building real products for real businesses.</h2>
            <p className="mp-lead">Tell us your goal, and we will turn it into a fast, scalable, premium digital experience.</p>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Work with MERNpixel</Link>
        </div>
      </section>
    </main>
  )
}
