import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import DetailModal from '../components/DetailModal'
import HeroBackdrop from '../components/HeroBackdrop'
import { servicesDetailed } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ITServicesPage() {
  const [searchParams] = useSearchParams()
  const requestedId = searchParams.get('service')
  const initialServiceId = servicesDetailed.some((service) => service.id === requestedId)
    ? requestedId
    : servicesDetailed[0].id

  const [activeId, setActiveId] = useState(initialServiceId)
  const [modalOpen, setModalOpen] = useState(false)

  const activeService = useMemo(
    () => servicesDetailed.find((service) => service.id === activeId) || servicesDetailed[0],
    [activeId]
  )

  useEffect(() => {
    if (requestedId && servicesDetailed.some((service) => service.id === requestedId)) {
      setActiveId(requestedId)
    }
  }, [requestedId])

  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/two.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Services</p>
          <h1>Focused solutions for growth-stage businesses.</h1>
          <p className="mp-lead">Pick a service and open details only when needed.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-service-tabs" role="tablist" aria-label="Service tabs">
            {servicesDetailed.map((service) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={activeService.id === service.id}
                className={`mp-service-tab ${activeService.id === service.id ? 'is-active' : ''}`}
                onClick={() => setActiveId(service.id)}
              >
                {service.title}
              </button>
            ))}
          </div>

          <motion.article
            key={activeService.id}
            className="mp-card mp-hover-card mp-service-highlight"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.28 }}
          >
            <p className="mp-chip">{activeService.icon} Service Focus</p>
            <h2>{activeService.title}</h2>
            <p>{activeService.description}</p>
            <div className="mp-actions">
              <button type="button" className="mp-btn mp-btn-primary mp-magnetic" onClick={() => setModalOpen(true)}>
                View More
              </button>
              <Link to="/contact" className="mp-btn mp-btn-ghost mp-magnetic">Start Project</Link>
            </div>
          </motion.article>
        </div>
      </section>

      <DetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        subtitle="Service Details"
        title={activeService.title}
        sections={[
          { label: 'Features', items: activeService.features },
          { label: 'Use Cases', items: activeService.useCases },
          { label: 'Benefits', items: [activeService.outcome] },
        ]}
      />
    </main>
  )
}
