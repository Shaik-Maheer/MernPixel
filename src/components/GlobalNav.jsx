import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/mernpixel-logo.svg'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Works', path: '/works' },
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
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `mp-nav-link ${isActive ? 'is-active' : ''}`}
            >
              <span className="mp-nav-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="mp-nav-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu">
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mp-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            aria-label="Mobile navigation"
          >
            <motion.div
              className="mp-shell mp-mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
            >
              {navItems.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `mp-mobile-link ${isActive ? 'is-active' : ''}`}
                >
                  <span className="mp-mobile-link-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
