import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesDetailed } from '../data/siteData'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const service = servicesDetailed.find(s => s.id === id)
  
  if (!service) {
    return <Navigate to="/services" />
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-32 font-sans overflow-hidden">
      
      {/* SOLAR SYSTEM HERO SECTION */}
      <section className="relative w-full max-w-6xl mx-auto px-6 mb-32 flex flex-col items-center">
        <div className="text-center mb-24 relative z-10">
          <span className="text-[13px] font-bold text-blue-600 uppercase tracking-widest mb-4 block">Service Detail</span>
          <h1 className="text-5xl md:text-[5rem] font-extrabold text-slate-900 tracking-tight leading-[1] max-w-4xl mx-auto">{service.title}</h1>
          <div className="mt-8 border border-slate-200 bg-white rounded-full px-8 py-3 text-slate-600 font-bold inline-flex shadow-sm text-[15px]">{service.description}</div>
        </div>

        {/* Solar System Framer Motion Animation */}
        <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] flex items-center justify-center">
           {/* Center Core */}
           <div className="absolute w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.15)] flex items-center justify-center text-white text-5xl z-20 ring-8 ring-white">
             {service.icon}
           </div>

           {/* Orbit Rings */}
           <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] border border-slate-200 rounded-full shadow-inner"></div>
           <div className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px] border border-slate-100 rounded-full shadow-inner"></div>
           
           {/* Inner Revolving Container */}
           <motion.div 
              className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
           >
              <motion.div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1877F2] shadow-[0_8px_20px_rgba(24,119,242,0.3)] flex items-center justify-center text-white text-[11px] font-black tracking-wider" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}>UX</motion.div>
              <motion.div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#D349A1] shadow-[0_8px_20px_rgba(211,73,161,0.3)] flex items-center justify-center text-white text-[11px] font-black tracking-wider" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}>API</motion.div>
           </motion.div>

           {/* Outer Revolving Container */}
           <motion.div 
              className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px]"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
           >
              <motion.div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-[#25D366] shadow-[0_8px_20px_rgba(37,211,102,0.3)] flex items-center justify-center text-white text-xs font-black tracking-wider" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>DB</motion.div>
              <motion.div className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FF0000] shadow-[0_8px_20px_rgba(255,0,0,0.3)] flex items-center justify-center text-white text-xs font-black tracking-wider" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>OPS</motion.div>
           </motion.div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="bg-slate-50 py-24 mb-24 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-bold">X</span>
                <h3 className="text-sm font-bold text-rose-500 uppercase tracking-widest">The Problem</h3>
              </div>
              <p className="text-[22px] md:text-[26px] text-slate-800 leading-relaxed font-bold tracking-tight">Most teams deliver generic templates that fail to convert traffic or resolve complex technical debt, causing bloated systems.</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center font-bold">✓</span>
                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest">The Solution</h3>
              </div>
              <p className="text-[22px] md:text-[26px] text-slate-800 leading-relaxed font-bold tracking-tight">We engineer {service.title.toLowerCase()} from the ground up, prioritizing extreme speed, scalable architecture, and tangible metrics.</p>
            </div>
          </div>
          
          <div className="mt-20 pt-16 border-t border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900 mb-8 text-center">{service.title} Capabilities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {service.features?.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-blue-500 font-bold bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">✓</span>
                  <span className="text-slate-700 font-bold text-[15px]">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TARGETED FORM */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Initialize Your Scope</h2>
            <p className="text-slate-400 font-medium text-lg">Define your {service.title.toLowerCase()} requirements below. Data routes directly to the core team.</p>
          </div>
          
          <form className="flex flex-col gap-6 relative z-10" action="mailto:mernpixeldev@gmail.com" method="GET" encType="text/plain">
            <input type="hidden" name="subject" value={`Inquiry: ${service.title} Request`} />
            
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider">Client Name</label>
              <input type="text" name="name" required className="bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500 font-medium" placeholder="E.g., John Doe" />
            </div>
            
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider">Project Archetype</label>
              <select name="scope" className="bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer font-medium">
                {service.useCases?.map((useCase, i) => (
                  <option key={i} value={useCase} className="bg-slate-800">{useCase}</option>
                ))}
                <option value="Custom Requirement" className="bg-slate-800">Custom Build / Unlisted</option>
              </select>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider">Execution Brief</label>
              <textarea name="body" required rows="5" className="bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500 resize-none font-medium leading-relaxed" placeholder="Detail your core objectives, technical constraints, or timelines..."></textarea>
            </div>
            
            <button type="submit" className="mt-6 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-[15px] uppercase tracking-widest rounded-xl py-5 transition-transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
              Send Request to MERNpixel
            </button>
          </form>
        </div>
      </section>

    </main>
  )
}
