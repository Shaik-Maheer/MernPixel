import { Link } from 'react-router-dom'
import HeroBackdrop from '../components/HeroBackdrop'
import { careersOpenings } from '../data/siteData'

export default function CareersPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/three.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Careers</p>
          <h1>Join a premium team that values execution quality.</h1>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-grid-2">
          <article className="mp-card">
            <p className="mp-kicker">Open Roles</p>
            <ul className="mp-list">
              {careersOpenings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">Apply</p>
            <p>Share resume, portfolio, and a short note about your strongest work.</p>
            <div className="mp-actions">
              <a href="mailto:mernpixeldev@gmail.com?subject=Career%20Application%20-%20MERNpixel" className="mp-btn mp-btn-primary mp-magnetic">Email Application</a>
              <Link to="/contact" className="mp-btn mp-btn-ghost mp-magnetic">Contact Team</Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
