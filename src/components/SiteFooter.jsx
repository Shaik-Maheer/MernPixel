import { Link } from 'react-router-dom'
import { SocialIcon } from './SocialIcons'
import { business, socialLinks } from '../data/siteData'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/works' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
  { label: 'Students', path: '/student-projects' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
  { label: 'Book Session', path: '/book' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#F8F9FA] pt-14 pb-8 border-t border-slate-200 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center mb-4">
              <img src="/logo.png" alt="MERNpixel Logo" className="h-20 md:h-24 w-auto object-contain" />
            </Link>

            <p className="text-[15px] text-slate-600 leading-relaxed max-w-md">
              Not built to impress. Built to perform. We design and engineer products that move metrics.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:-translate-y-1 hover:border-slate-300 transition-all"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SocialIcon network={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-2 border-l-2 border-slate-200 pl-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-[14px] font-semibold text-slate-600 hover:text-[#E15D2B] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4">Reach Us</h4>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <a href={`mailto:${business.email}`} className="group text-[15px] font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-3 w-fit">
                <img src="/pics/email_icon.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Email" />
                <span>{business.email}</span>
              </a>
              <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="group text-[15px] font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-3 w-fit">
                <img src="/pics/phone_icon.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Phone" />
                <span>{business.phone}</span>
              </a>
              <a href={business.whatsapp} target="_blank" rel="noreferrer" className="group text-[15px] font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-3 w-fit">
                <img src="/pics/whatsapp_icon.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="WhatsApp" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs font-semibold text-slate-500">© {year} MERNpixel. Crafted with intent.</p>
          <div className="flex items-center flex-wrap gap-4">
            <Link to="/admin" className="text-xs font-semibold text-slate-400 hover:text-[#E15D2B] transition-colors">
              Admin
            </Link>
            <Link to="/privacy-policy" className="text-xs font-semibold text-slate-400 hover:text-[#E15D2B] transition-colors">
              Privacy Policy
            </Link>
            <p className="text-xs font-semibold text-slate-400">{business.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
