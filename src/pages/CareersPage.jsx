import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { socialLinks } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-32">
      
      {/* Background Half Section */}
      <div className="absolute top-0 inset-x-0 h-[65vh] bg-[#FAF5FF] z-0 rounded-b-[4rem]"></div>

      <section className="relative z-10 pt-20 md:pt-32 pb-16 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }} className="flex flex-col items-center">
            
            <div className="inline-flex bg-blue-50/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 items-center border border-blue-100">
               <span className="text-xs font-bold text-slate-800 tracking-wide">Careers</span>
            </div>

            <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.05]">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">team.</span>
            </h1>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-sm w-full mt-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-400 mb-8">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-4">No open roles currently.</h2>
              <p className="text-[17px] text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
                Our core team is currently operating at full capacity. We aren't actively hiring for any positions right now, but things change quickly!
              </p>

              <div className="flex flex-col items-center border-t border-slate-100 pt-8">
                <p className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Follow us for future updates</p>
                <div className="flex gap-4">
                  {socialLinks.slice(0,2).map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-6 py-3 text-sm font-bold text-slate-700 transition-colors">
                      {link.label}
                    </a>
                  ))}
                  <Link to="/contact" className="bg-slate-900 hover:bg-[#E15D2B] text-white rounded-xl px-6 py-3 text-sm font-bold transition-colors">
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

    </main>
  )
}
