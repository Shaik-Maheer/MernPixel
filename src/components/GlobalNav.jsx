import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons'
import { business, socialLinks } from '../data/siteData'

const primaryMenuItems = [
  { label: 'ABOUT', path: '/about' },
  { label: 'SERVICES', path: '/services' },
  { label: 'WORKS', path: '/works' },
  { label: 'CONTACT', path: '/contact' },
]

const secondaryMenuItems = [
  { label: 'Our Team', path: '/team' },
  { label: 'What Clients Say', path: '/clients' },
  {
    label: 'Give Feedback',
    href: 'mailto:mernpixeldev@gmail.com?subject=Feedback%20for%20MERNpixel',
  },
  { label: 'Careers', path: '/careers' },
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
                          style={{ color: location.pathname === page.path ? '#16A4F0' : undefined }}
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
                          <LinkedInIcon />
                        </a>
                      )}

                      <a href={business.whatsapp} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="WhatsApp">
                        <WhatsAppIcon />
                      </a>

                      {instagram && (
                        <a href={instagram} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="Instagram">
                          <InstagramIcon />
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
