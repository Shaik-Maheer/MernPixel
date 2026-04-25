import { motion } from 'framer-motion'
import CountUpNumber from '../components/CountUpNumber'
import HeroBackdrop from '../components/HeroBackdrop'
import { business, homeProcess, stats } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/four.mp4" />
        <div className="mp-shell mp-grid-2 mp-hero-split">
          <div>
            <p className="mp-kicker">About {business.name}</p>
            <h1>We are a compact team focused on high-standard digital delivery.</h1>
            <p className="mp-lead">Our work combines strategic UX, strong visual systems, and maintainable engineering to create measurable business impact.</p>
          </div>

          <div className="mp-card mp-hover-card">
            <p className="mp-kicker">What we optimize</p>
            <ul className="mp-list">
              <li>Brand trust and premium perception</li>
              <li>Lead flow and conversion consistency</li>
              <li>Speed, technical quality, and scalability</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-stat-grid">
            {stats.map((item) => (
              <article key={item.label}>
                <strong><CountUpNumber value={item.value} /></strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Delivery Framework</p>
            <h2>Practical process, premium output.</h2>
          </div>

          <div className="mp-card-grid mp-grid-4">
            {homeProcess.map((step, index) => (
              <motion.article key={step.step} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5, delay: index * 0.05 }}>
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
