import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop'
import { studentServices } from '../data/siteData'

export default function StudentsPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/one.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Student Support</p>
          <h1>Structured mentoring for project delivery and final presentation readiness.</h1>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {studentServices.map((service) => (
            <article key={service} className="mp-card mp-hover-card">
              <h3>{service}</h3>
              <p>End-to-end guidance from planning to demo confidence.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Need Guidance?</p>
            <h2>Book a mentoring session today.</h2>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Book Session</Link>
        </div>
      </section>
    </main>
  )
}
