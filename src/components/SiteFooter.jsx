import { Link } from 'react-router-dom'
import logo from '../assets/mernpixel-logo.svg'
import { business, socialLinks } from '../data/siteData'

const quickLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Works', path: '/works' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mp-footer">
      <div className="mp-shell mp-footer-grid">
        <div>
          <img src={logo} alt="MERNpixel" className="mp-footer-logo" />
          <p className="mp-footer-copy">High-conversion digital products for brands that want performance and premium execution.</p>
        </div>

        <div>
          <p className="mp-footer-title">Quick Links</p>
          <div className="mp-footer-links">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path}>{link.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mp-footer-title">Contact</p>
          <div className="mp-footer-links">
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={`tel:${business.phone.replace(/\s+/g, '')}`}>{business.phone}</a>
            <a href={business.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="mp-shell mp-footer-bottom">
        <p>(c) {year} MERNpixel. All rights reserved.</p>
        <div className="mp-footer-social">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
