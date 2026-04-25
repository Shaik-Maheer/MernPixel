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
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-5 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="MERNpixel Logo" className="h-14 md:h-16 w-auto object-contain" />
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

          <div className="hidden md:block md:col-span-2 lg:col-span-3"></div>

          {/* Explore Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-900 mb-6">Explore</h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="group relative text-[15px] font-bold text-slate-500 hover:text-slate-900 transition-colors w-fit inline-block">
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach us Column */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-900 mb-6">Reach us</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`mailto:${business.email}`} className="group relative text-[15px] font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-3 w-fit">
                  <span className="text-blue-500 group-hover:scale-110 transition-transform">✉</span> 
                  <span className="relative">
                    {business.email}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="group relative text-[15px] font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-3 w-fit">
                  <span className="text-blue-500 group-hover:scale-110 transition-transform">☎</span> 
                  <span className="relative">
                    {business.phone}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 w-fit">
                <span className="text-blue-500 mt-0.5">📍</span> 
                <span className="text-[15px] font-bold text-slate-500 leading-relaxed">{business.address}</span>
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
