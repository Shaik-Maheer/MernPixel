import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop'
import { nonItServices } from '../data/siteData'

export default function NonITConsultingPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/four.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Non-IT Consulting</p>
          <h1>Practical hiring support for growth-focused business teams.</h1>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {nonItServices.map((service) => (
            <article key={service} className="mp-card mp-hover-card">
              <h3>{service}</h3>
              <p>From role alignment to screening support and rapid response cycles.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mp-section mp-cta-band">
        <div className="mp-shell mp-cta-row">
          <div>
            <p className="mp-kicker">Need talent support?</p>
            <h2>Discuss hiring requirements with our team.</h2>
          </div>
          <Link to="/contact" className="mp-btn mp-btn-primary mp-magnetic">Book Consultation</Link>
        </div>
      </section>
    </main>
  )
}
