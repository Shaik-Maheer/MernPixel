import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import DetailModal from '../components/DetailModal'
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
  const [selectedProject, setSelectedProject] = useState(null)

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
          <h1>Real projects, real outcomes.</h1>
          <p className="mp-lead">Click any project for the full case snapshot.</p>

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
            <motion.button
              key={project.id}
              type="button"
              className="mp-card mp-work-card mp-case-card mp-work-button"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              onClick={() => setSelectedProject(project)}
            >
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
              <p>{project.result}</p>
              <span className="mp-text-link">View More</span>
            </motion.button>
          ))}
        </div>
      </section>

      <DetailModal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        subtitle={selectedProject?.client}
        title={selectedProject?.title}
        fullscreen
        sections={
          selectedProject
            ? [
                { label: 'Project Name', text: selectedProject.title },
                { label: 'What We Built', text: selectedProject.solution },
                { label: 'Outcome / Result', text: selectedProject.result },
              ]
            : []
        }
        actions={selectedProject ? [{ label: 'Open Live Project', href: selectedProject.link, external: true }] : []}
      />
    </main>
  )
}
