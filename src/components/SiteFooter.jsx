import { Link } from 'react-router-dom'
import { business, publicPages, socialLinks } from '../data/siteData'

const footerPages = publicPages.filter((page) => page.path !== '/')

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="section-shell site-footer-grid">
        <div>
          <p className="site-footer-kicker">{business.name}</p>
          <h2 className="site-footer-title">{business.tagline}</h2>
          <p className="site-footer-copy">Design, development, and growth in one focused flow.</p>
        </div>

        <div>
          <p className="site-footer-head">Quick Links</p>
          <nav className="site-footer-links" aria-label="Footer">
            {footerPages.map((page) => (
              <Link key={page.path} to={page.path} className="site-footer-link cursor-target">
                {page.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="site-footer-head">Contact</p>
          <div className="site-footer-contact">
            <a href={business.whatsapp} target="_blank" rel="noreferrer" className="site-footer-link cursor-target">
              WhatsApp
            </a>
            <a href={`mailto:${business.email}`} className="site-footer-link cursor-target">
              {business.email}
            </a>
            <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="site-footer-link cursor-target">
              {business.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© {year} {business.name}. All rights reserved.</p>
        <div className="site-footer-social">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="site-footer-link cursor-target">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
