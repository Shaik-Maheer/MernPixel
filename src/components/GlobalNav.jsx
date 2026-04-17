import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/mernpixel-logo.svg'
import { business, socialLinks } from '../data/siteData'

const primaryMenuItems = [
  { label: 'WORK', path: '/works' },
  { label: 'SERVICES', path: '/services' },
  { label: 'PROJECTS', path: '/portfolio' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
]

const secondaryMenuItems = [
  { label: 'Our Team', path: '/team' },
  { label: 'What Clients Say', path: '/clients' },
  {
    label: 'Give Feedback',
    href: 'mailto:mernpixeldev@gmail.com?subject=Feedback%20for%20MernPixel',
  },
  { label: 'Careers', path: '/careers', note: 'No openings for now' },
]

export default function GlobalNav({ visible = true }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const smoothParallaxX = useSpring(parallaxX, { stiffness: 70, damping: 16, mass: 0.7 })
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 70, damping: 16, mass: 0.7 })
  const mapX = useTransform(smoothParallaxX, (value) => value * 0.8)
  const mapY = useTransform(smoothParallaxY, (value) => value * 0.8)
  const panelX = useTransform(smoothParallaxX, (value) => value * 0.25)
  const panelY = useTransform(smoothParallaxY, (value) => value * 0.2)
  const MotionHeader = motion.header
  const MotionOverlay = motion.aside
  const MotionPanel = motion.div
  const MotionWorldMap = motion.div
  const MotionColumns = motion.div

  const linkedIn = socialLinks.find((link) => link.label === 'LinkedIn')?.href
  const instagram = socialLinks.find((link) => link.label === 'Instagram')?.href

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const linkVariants = {
    hidden: { opacity: 0, y: 22, x: -24 },
    show: (index) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.42,
        delay: 0.1 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: (index) => ({
      opacity: 0,
      y: 18,
      x: -18,
      transition: {
        duration: 0.28,
        delay: (primaryMenuItems.length - 1 - index) * 0.028,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const rightItemVariants = {
    hidden: { opacity: 0, y: 14, x: 24 },
    show: (index) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.12 + index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: (index) => ({
      opacity: 0,
      y: 10,
      x: 18,
      transition: {
        duration: 0.24,
        delay: (secondaryMenuItems.length - 1 - index) * 0.025,
      },
    }),
  }

  const handleParallaxMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 60
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 46
    parallaxX.set(x)
    parallaxY.set(y)
  }

  const handleParallaxReset = () => {
    parallaxX.set(0)
    parallaxY.set(0)
  }

  if (!visible) {
    return null
  }

  return (
    <>
      <MotionHeader
        className="nav-shell"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-inner">
          <Link to="/" className="nav-logo-small cursor-target">
            <img src={logo} alt="Mernpixel" />
          </Link>

          <button type="button" className="menu-trigger cursor-target" onClick={() => setOpen((prev) => !prev)}>
            <span className="menu-label">Menu</span>
            <span className={`hamburger-round ${open ? 'is-open' : ''}`}>
              <span className="line-one" />
              <span className="line-two" />
            </span>
          </button>
        </div>
      </MotionHeader>

      <AnimatePresence>
        {open && (
          <MotionOverlay
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.36 }}
            onMouseMove={handleParallaxMove}
            onMouseLeave={handleParallaxReset}
          >
            <MotionPanel
              className="menu-overlay-inner"
              initial={{ opacity: 0, x: -64 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -42 }}
              transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
              <MotionWorldMap className="menu-world-map" style={{ x: mapX, y: mapY }} />

              <div className="menu-top-bar">
                <Link to="/" className="menu-mini-logo cursor-target" onClick={closeMenu}>
                  <img src={logo} alt="Mernpixel" />
                </Link>

                <button
                  type="button"
                  className="menu-close-btn cursor-target"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    closeMenu()
                  }}
                >
                  <span>Close</span>
                </button>
              </div>

              <MotionColumns className="menu-columns" style={{ x: panelX, y: panelY }}>
                <div className="menu-heading-list">
                  <div className="menu-link-stack">
                    {primaryMenuItems.map((page, index) => (
                      <motion.div
                        key={page.path}
                        variants={linkVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        custom={index}
                      >
                        <Link
                          to={page.path}
                          className="menu-link cursor-target"
                          onClick={closeMenu}
                          style={{ color: location.pathname === page.path ? '#E6501B' : undefined }}
                        >
                          {page.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="menu-right-panel">
                  <div>
                    <p className="menu-right-title">Quick Access</p>
                    {secondaryMenuItems.map((item, index) => (
                      <motion.div key={item.label} variants={rightItemVariants} initial="hidden" animate="show" exit="exit" custom={index}>
                        {item.path ? (
                          <Link to={item.path} className="menu-right-item cursor-target" onClick={closeMenu}>
                            <span>{item.label}</span>
                            {item.note && <small>{item.note}</small>}
                          </Link>
                        ) : (
                          <a href={item.href} className="menu-right-item cursor-target" target="_blank" rel="noreferrer">
                            <span>{item.label}</span>
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="menu-right-bottom">
                    <p className="menu-contact-line">{business.phone}</p>
                    <p className="menu-contact-line">{business.email}</p>

                    <div className="menu-icon-links">
                      {linkedIn && (
                        <a href={linkedIn} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="LinkedIn">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M6.94 8.5v9H4.06v-9h2.88Zm.26-2.78a1.66 1.66 0 1 1-3.32 0a1.66 1.66 0 0 1 3.32 0Zm5.35 6.93v4.85h-2.87v-9h2.75v1.28h.04c.38-.72 1.31-1.48 2.7-1.48c2.89 0 3.43 1.9 3.43 4.36v4.84h-2.88v-4.29c0-1.02-.02-2.34-1.43-2.34c-1.43 0-1.65 1.12-1.65 2.27Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}

                      <a href={business.whatsapp} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="WhatsApp">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12.03 3.5a8.45 8.45 0 0 0-7.3 12.7L3.5 20.5l4.43-1.16a8.47 8.47 0 1 0 4.1-15.84Zm0 15.37a6.9 6.9 0 0 1-3.53-.97l-.25-.15l-2.63.69l.7-2.56l-.16-.26a6.88 6.88 0 1 1 5.87 3.25Zm3.77-5.17c-.2-.1-1.18-.58-1.36-.65c-.18-.07-.31-.1-.44.1c-.13.2-.5.64-.61.77c-.11.13-.23.15-.43.05c-.2-.1-.83-.31-1.58-.99c-.58-.52-.97-1.15-1.08-1.35c-.11-.2-.01-.3.08-.4c.08-.08.2-.22.3-.33c.1-.11.13-.2.2-.33c.07-.13.03-.25-.02-.35c-.05-.1-.44-1.06-.6-1.45c-.16-.38-.32-.33-.44-.34h-.37c-.13 0-.35.05-.53.25c-.18.2-.69.68-.69 1.66c0 .98.71 1.92.81 2.05c.1.13 1.4 2.13 3.38 2.99c.47.2.84.32 1.13.41c.47.15.9.13 1.24.08c.38-.06 1.18-.48 1.35-.94c.17-.46.17-.85.12-.94c-.05-.1-.18-.15-.38-.25Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      {instagram && (
                        <a href={instagram} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="Instagram">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M12 7.1a4.9 4.9 0 1 0 0 9.8a4.9 4.9 0 0 0 0-9.8Zm0 8.1A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Zm6.24-8.3a1.14 1.14 0 1 1-2.28 0a1.14 1.14 0 0 1 2.28 0Zm3.23 1.16c-.07-1.44-.4-2.72-1.45-3.76C18.98 3.27 17.7 2.94 16.26 2.87c-1.49-.08-5.96-.08-7.45 0c-1.44.07-2.72.4-3.76 1.45C3.99 5.36 3.66 6.64 3.59 8.08c-.08 1.49-.08 5.96 0 7.45c.07 1.44.4 2.72 1.45 3.76c1.04 1.04 2.32 1.38 3.76 1.45c1.49.08 5.96.08 7.45 0c1.44-.07 2.72-.4 3.76-1.45c1.04-1.04 1.38-2.32 1.45-3.76c.08-1.49.08-5.95 0-7.45Zm-2.02 9.05c-.31.78-.92 1.39-1.7 1.7c-1.17.46-3.96.35-5.95.35s-4.79.1-5.95-.35a2.85 2.85 0 0 1-1.7-1.7c-.46-1.16-.35-3.96-.35-5.95c0-2-.1-4.79.35-5.95c.31-.78.92-1.39 1.7-1.7c1.16-.46 3.95-.35 5.95-.35c1.99 0 4.78-.1 5.95.35c.78.31 1.39.92 1.7 1.7c.46 1.16.35 3.95.35 5.95c0 1.99.1 4.79-.35 5.95Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </MotionColumns>
            </MotionPanel>
          </MotionOverlay>
        )}
      </AnimatePresence>
    </>
  )
}
