import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/works' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
]

export default function GlobalNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm flex items-center justify-center">
      <div className="w-full max-w-[1400px] px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3" aria-label="MERNpixel home">
          <img src="/logo.png" alt="MERNpixel Logo" className="h-8 md:h-10 w-auto object-contain mt-1" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => 
                `relative text-[15px] transition-all duration-300 group py-1 ${
                  isActive 
                    ? 'text-slate-900 font-extrabold' 
                    : 'text-slate-600 font-bold hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute -bottom-0.5 left-0 h-[2.5px] rounded-full transition-all duration-300 ${isActive ? 'w-full bg-rose-500' : 'w-0 bg-blue-600 group-hover:w-full'}`}></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/book" className="hidden md:inline-flex bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#D349A1] transition-colors shadow-md">
            Book a Session
          </Link>
          
          <button 
            type="button" 
            className="md:hidden flex flex-col gap-1.5 p-2" 
            onClick={() => setOpen((value) => !value)} 
            aria-expanded={open} 
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-slate-900" />
            <span className="w-6 h-0.5 bg-slate-900" />
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
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/book" className="mt-2 bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-semibold text-center mt-4">
                Book a Session
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
