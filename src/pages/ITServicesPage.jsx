import { useState } from 'react'
import { Link } from 'react-router-dom'
import { allServices } from '../data/siteData'

export default function ITServicesPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <main className="page-main">
      <section className="section-block page-intro">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1>Focused service stack for business growth.</h1>
          <p className="lead-copy">Every service is structured for speed, clarity, and measurable impact.</p>
        </div>
      </section>

      <section className="section-block compact-top">
        <div className="container service-list-grid">
          {allServices.map((service, index) => {
            const active = activeIndex === index
            return (
              <article key={service.title} className="service-list-card">
                <h3>{service.title}</h3>

                {active && (
                  <ul>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  className="text-btn"
                  onClick={() => setActiveIndex(active ? null : index)}
                >
                  {active ? 'Show less' : 'View more'}
                </button>
              </article>
            )
          })}
        </div>

        <div className="container page-cta-wrap">
          <Link to="/contact" className="btn btn-primary">Discuss Your Requirement</Link>
        </div>
      </section>
    </main>
  )
}
