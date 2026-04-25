import { motion } from 'framer-motion'
import { portfolioProjects, stats } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

export default function PortfolioPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero">
        <div className="mp-shell">
          <p className="mp-kicker">Portfolio</p>
          <h1>Work that combines business clarity and execution quality.</h1>
          <div className="mp-stat-grid mp-stat-grid-compact">
            {stats.slice(0, 3).map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {portfolioProjects.map((project, index) => (
            <motion.article
              key={project.name}
              className={`mp-card mp-work-card ${project.fullWidth ? 'mp-span-2' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={reveal}
              transition={{ duration: 0.55, delay: index * 0.04 }}
            >
              <img src={project.image} alt={project.name} loading="lazy" />
              <p className="mp-chip">{project.previewLabel || 'Project'}</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="mp-text-link">Open Live Project</a>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
