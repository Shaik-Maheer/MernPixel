import { motion } from 'framer-motion'
import CountUpNumber from '../components/CountUpNumber'
import HeroBackdrop from '../components/HeroBackdrop'
import SlidingComments from '../components/SlidingComments'
import { stats, testimonials } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ClientsPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/five.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Clients</p>
          <h1>Long-term partnerships built on trust and measurable outcomes.</h1>
          <p className="mp-lead">We focus on delivery reliability, communication clarity, and conversion impact for every engagement.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-stat-grid">
          {stats.slice(0, 3).map((item) => (
            <article key={item.label}>
              <strong><CountUpNumber value={item.value} /></strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <SlidingComments items={testimonials} />

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-3">
          {testimonials.map((testimonial, index) => (
            <motion.article key={testimonial.name} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.05 }}>
              <p className="mp-chip">Client Feedback</p>
              <p>"{testimonial.quote}"</p>
              <h3>{testimonial.name}</h3>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
