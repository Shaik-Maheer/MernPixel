import { Link } from 'react-router-dom'
import { SocialIcon } from './SocialIcons'
import { business, socialLinks } from '../data/siteData'

const quickLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/works' },
  { label: 'Team', path: '/team' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#FDFDFD] pt-20 pb-10 border-t border-slate-200/60 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-lg font-bold text-sm">
                M
              </div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">
                MERN<span className="text-slate-900 font-serif italic">pixel</span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-600 mb-8 leading-relaxed pr-4">
              Not built to impress. Built to perform. We design and engineer products that move metrics.
            </p>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SocialIcon network={social.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>

          {/* Explore Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-900 mb-6">Explore</h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach us Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-900 mb-6">Reach us</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`mailto:${business.email}`} className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-3">
                  <span className="text-blue-500">✉</span> {business.email}
                </a>
              </li>
              <li>
                <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-3">
                  <span className="text-blue-500">☎</span> {business.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-0.5">📍</span> 
                <span className="text-sm text-slate-500">{business.address}</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Footer Line */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-semibold text-slate-500">
            © {year} MERNpixel. Crafted with intent.
          </p>
          <p className="text-xs font-semibold text-slate-400">
            Performance over polish. Always.
          </p>
        </div>

      </div>
    </footer>
  )
}
