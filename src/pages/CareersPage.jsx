import { Link } from 'react-router-dom'

const openings = [
  'Frontend Engineer (React)',
  'UI/UX Designer',
  'Business Development Associate',
]

export default function CareersPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero">
        <div className="mp-shell">
          <p className="mp-kicker">Careers</p>
          <h1>Join a focused team that values craft, accountability, and speed.</h1>
          <p className="mp-lead">We work with high ownership and high standards. If you care about quality and outcomes, we should talk.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-grid-2">
          <article className="mp-card">
            <p className="mp-kicker">Open Roles</p>
            <ul className="mp-list">
              {openings.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </article>

          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">How to Apply</p>
            <p>Share your resume, portfolio, and a short note on work you are proud of.</p>
            <div className="mp-actions">
              <a href="mailto:mernpixeldev@gmail.com?subject=Career%20Application%20-%20MERNpixel" className="mp-btn mp-btn-primary">Email Application</a>
              <Link to="/contact" className="mp-btn mp-btn-ghost">Contact Team</Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
