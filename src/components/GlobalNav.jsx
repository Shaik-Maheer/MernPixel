import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/mernpixel-logo.svg'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function GlobalNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="top-nav">
      <div className="container nav-inner">
        <Link to="/" className="brand-mark" onClick={() => setOpen(false)}>
          <img src={logo} alt="MERNpixel" />
        </Link>

        <button
          type="button"
          className="menu-btn"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="main-nav"
        >
          Menu
        </button>

        <nav id="main-nav" className={`nav-links ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
