import { motion } from 'framer-motion'
import { coreCrew } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function TeamPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero">
        <div className="mp-shell">
          <p className="mp-kicker">Core Team</p>
          <h1>Specialists with shared ownership from design to deployment.</h1>
          <p className="mp-lead">Small team structure, senior execution standards, and direct accountability at every phase.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {coreCrew.map((member, index) => (
            <motion.article key={member.name} className="mp-card mp-team-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5, delay: index * 0.06 }}>
              <img src={member.photo} alt={member.name} loading="lazy" />
              <div>
                <p className="mp-chip">{member.role}</p>
                <h3>{member.name}</h3>
                <p>{member.bio}</p>
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="mp-text-link">View LinkedIn</a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
