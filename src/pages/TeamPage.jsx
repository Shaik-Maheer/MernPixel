import { useState } from 'react'
import { motion } from 'framer-motion'
import DetailModal from '../components/DetailModal'
import HeroBackdrop from '../components/HeroBackdrop'
import { teamMembers } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function TeamPage() {
  const [activeMember, setActiveMember] = useState(null)

  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/five.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Team</p>
          <h1>Small core team. High ownership.</h1>
          <p className="mp-lead">Click any profile for details and links.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {teamMembers.map((member, index) => (
            <motion.button
              key={member.name}
              type="button"
              className="mp-card mp-team-card mp-hover-card mp-team-button"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setActiveMember(member)}
            >
              <img src={member.photo} alt={member.name} loading="lazy" />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span className="mp-text-link">View More</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <DetailModal
        open={Boolean(activeMember)}
        onClose={() => setActiveMember(null)}
        subtitle={activeMember?.role}
        title={activeMember?.name}
        sections={activeMember ? [{ label: 'Bio', text: activeMember.bio }] : []}
        actions={activeMember ? [{ label: 'LinkedIn', href: activeMember.linkedin, external: true }] : []}
      />
    </main>
  )
}
