import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'

const primaryNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/works' },
  { label: 'Blog', path: '/blog' },
  { label: 'Students', path: '/student-projects' },
  { label: 'Contact', path: '/contact' },
]

const aboutDropdownItems = [
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Careers', path: '/careers' },
]

const isPathActive = (pathname, path) => {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export default function GlobalNav() {
  const [open, setOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setMobileAboutOpen(false)
  }, [location.pathname])

  const aboutActive = useMemo(
    () => aboutDropdownItems.some((item) => isPathActive(location.pathname, item.path)),
    [location.pathname]
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm flex items-center justify-center">
      <div className="w-full max-w-[1400px] px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="MERNpixel home">
          <img src="/logo.png" alt="MERNpixel Logo" className="h-16 md:h-28 w-auto object-contain mt-1 scale-125 origin-left" />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative text-[15px] transition-all duration-300 group py-1 ${
                  isActive ? 'text-slate-900 font-extrabold' : 'text-slate-600 font-bold hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2.5px] rounded-full transition-all duration-300 ${
                      isActive ? 'w-full bg-rose-500' : 'w-0 bg-blue-600 group-hover:w-full'
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}

          <div className="relative group">
            <button
              type="button"
              className={`relative text-[15px] transition-all duration-300 group py-1 inline-flex items-center gap-1 ${
                aboutActive ? 'text-slate-900 font-extrabold' : 'text-slate-600 font-bold hover:text-slate-900'
              }`}
            >
              About
              <svg className="w-4 h-4 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span
                className={`absolute -bottom-0.5 left-0 h-[2.5px] rounded-full transition-all duration-300 ${
                  aboutActive ? 'w-full bg-rose-500' : 'w-0 bg-blue-600 group-hover:w-full'
                }`}
              ></span>
            </button>

            <div className="absolute right-0 top-[calc(100%+10px)] w-52 rounded-2xl border border-slate-200 bg-white shadow-xl p-2 opacity-0 invisible translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200">
              {aboutDropdownItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/book" className="hidden md:inline-flex bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#dc4005] transition-colors shadow-md">
            Book a Session
          </Link>

          <button
            type="button"
            className="md:hidden p-2 text-slate-900"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="w-6 h-0.5 bg-slate-900" />
                <span className="w-6 h-0.5 bg-slate-900" />
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-2">
              {primaryNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={() => setMobileAboutOpen((value) => !value)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  aboutActive ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                About
                <svg
                  className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {mobileAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-3"
                  >
                    <div className="border-l-2 border-slate-200 ml-2 py-1 flex flex-col">
                      {aboutDropdownItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive ? 'text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/book" className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-semibold text-center mt-3 hover:bg-[#dc4005] transition-colors">
                Book a Session
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
