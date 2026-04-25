import { motion } from 'framer-motion'
import HeroBackdrop from '../components/HeroBackdrop'
import { teamMembers } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function TeamPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/five.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Team</p>
          <h1>Specialists delivering premium execution with shared ownership.</h1>
          <p className="mp-lead">A focused team blending strategy, design, engineering, and growth expertise.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {teamMembers.map((member, index) => (
            <motion.article key={member.name} className="mp-card mp-team-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.05 }}>
              <img src={member.photo} alt={member.name} loading="lazy" />
              <div>
                <p className="mp-chip">{member.role}</p>
                <h3>{member.name}</h3>
                <p>{member.bio}</p>
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="mp-text-link">LinkedIn</a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell mp-card mp-hover-card">
          <p className="mp-kicker">Our Vision</p>
          <h2>Build category-leading digital experiences that businesses trust to grow.</h2>
          <p className="mp-lead">We aim to set a new execution standard where design excellence, engineering quality, and conversion impact work together in every project.</p>
        </div>
      </section>
    </main>
  )
}
