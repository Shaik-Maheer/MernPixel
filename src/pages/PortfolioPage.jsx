import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import HeroBackdrop from '../components/HeroBackdrop'
import { caseStudies } from '../data/siteData'

const filters = ['All', 'Web', 'App', 'E-commerce']

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [loaded, setLoaded] = useState({})

  const projects = useMemo(() => {
    if (activeFilter === 'All') {
      return caseStudies
    }
    return caseStudies.filter((project) => project.type === activeFilter)
  }, [activeFilter])

  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/three.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Works</p>
          <h1>Case studies focused on measurable results.</h1>
          <p className="mp-lead">Each project captures the client problem, our approach, and the business outcome.</p>

          <div className="mp-filter-row">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`mp-filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {projects.map((project, index) => (
            <motion.article key={project.id} className="mp-card mp-work-card mp-case-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.45, delay: index * 0.04 }}>
              <div className="mp-case-media">
                {!loaded[project.id] && <div className="mp-image-skeleton" aria-hidden />}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className={loaded[project.id] ? 'is-loaded' : 'is-loading'}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [project.id]: true }))}
                />
              </div>
              <p className="mp-chip">{project.type} • {project.client}</p>
              <h3>{project.title}</h3>
              <p><strong>Client problem:</strong> {project.problem}</p>
              <p><strong>What MERNpixel did:</strong> {project.solution}</p>
              <p><strong>Result:</strong> {project.result}</p>
              <a className="mp-text-link" href={project.link} target="_blank" rel="noreferrer">Open Live Project</a>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
