import { Link } from 'react-router-dom'
import { nonItServices } from '../data/siteData'

export default function NonITConsultingPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero">
        <div className="mp-shell">
          <p className="mp-kicker">Non-IT Consulting</p>
          <h1>Business hiring support with faster coordination and role clarity.</h1>
          <p className="mp-lead">We help teams hire for sales, marketing, and business roles with practical screening workflows.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {nonItServices.map((item) => (
            <article key={item} className="mp-card mp-hover-card">
              <h3>{item}</h3>
              <p>Execution support includes requirement shaping, candidate filter strategy, and faster response loops.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Need Help Hiring?</p>
            <h2>Get a quick consultation for your open roles.</h2>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary">Book a Consultation</Link>
        </div>
      </section>
    </main>
  )
}
