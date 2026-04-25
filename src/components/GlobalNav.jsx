import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/mernpixel-logo.svg'

const navItems = [
  { label: 'Services', path: '/services' },
  { label: 'Works', path: '/works' },
  { label: 'Clients', path: '/clients' },
  { label: 'Team', path: '/team' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function GlobalNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="mp-nav-wrap">
      <div className="mp-shell mp-nav">
        <Link to="/" className="mp-logo" aria-label="MERNpixel home">
          <img src={logo} alt="MERNpixel" />
        </Link>

        <nav className="mp-nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `mp-nav-link ${isActive ? 'is-active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="mp-nav-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu">
          <span />
          <span />
        </button>
      </div>

      <nav id="mobile-menu" className={`mp-mobile-menu ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        <div className="mp-shell mp-mobile-menu-inner">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `mp-mobile-link ${isActive ? 'is-active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
