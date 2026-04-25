import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/works' },
  { label: 'Team', path: '/team' },
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
    <header className="sticky top-0 z-50 px-4 py-4 w-full flex justify-center">
      <div className="w-full max-w-7xl mx-auto rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3" aria-label="MERNpixel home">
          <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl font-bold text-lg">
            M
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            MERN<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-serif italic">pixel</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-slate-900 pb-1 border-b-2 ${
                  isActive 
                    ? 'text-slate-900 border-rose-500' 
                    : 'text-slate-500 border-transparent hover:border-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:inline-flex bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md">
            Start a project
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
              <Link to="/contact" className="mt-2 bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-semibold text-center mt-4">
                Start a project
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
