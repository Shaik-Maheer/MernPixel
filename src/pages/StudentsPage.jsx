import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop'
import { studentServices } from '../data/siteData'

export default function StudentsPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/one.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Student Services</p>
          <h1>Project mentoring with practical architecture and demo readiness.</h1>
          <p className="mp-lead">For major/minor projects, we help students move from idea to implementation with structured support.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {studentServices.map((service) => (
            <article key={service} className="mp-card mp-hover-card">
              <h3>{service}</h3>
              <p>Includes planning guidance, implementation support, and final presentation readiness.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Guidance Session</p>
            <h2>Need a one-on-one roadmap for your submission?</h2>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary">Book Session</Link>
        </div>
      </section>
    </main>
  )
}
