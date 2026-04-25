import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesDetailed, business } from '../data/siteData'

// React Official Icon
const ReactIcon = () => (
  <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="#61DBFB" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2" fill="#61DBFB"></circle>
    <g stroke="#61DBFB" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
    </g>
  </svg>
)

// Python Official Icon (simplified shape)
const PythonIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 118 118" xmlns="http://www.w3.org/2000/svg">
    <path fill="#3776AB" d="M58.33 5.4c-28.53 0-27.24 12.35-27.24 12.35l.03 12.72h27.76v3.94H30.43s-12.7.72-12.7 18.3c0 17.58 11.23 19.34 11.23 19.34l10.1-.02.02 14.4s-1.04 12.06 17.65 12.33c19.16.27 18.67-11.75 18.67-11.75l-.04-8.86-27.2.03s-3.7-.13-3.7-3.95c0-3.8 3.72-3.8 3.72-3.8h17.92s9.26-.53 9.26-10.94V38.1s2.25-10.05-18.04-10.05v-10.3s1.26-12.35-27.4-12.35zm-9.35 8.9c3 0 5.4 2.45 5.4 5.48s-2.4 5.47-5.4 5.47-5.42-2.43-5.42-5.45c0-3.03 2.44-5.5 5.42-5.5z"/>
    <path fill="#FFD43B" d="M58.74 113.6c28.52 0 27.24-12.36 27.24-12.36l-.03-12.73H58.18v-3.95h28.45s12.68-.7 12.68-18.28c0-17.57-11.23-19.35-11.23-19.35l-10.1.03-.02-14.4s1.04-12.05-17.65-12.33C41.15 20.2 41.64 32.2 41.64 32.2l.04 8.87 27.2-.03s3.7.13 3.7 3.95c0 3.82-3.72 3.82-3.72 3.82H50.94s-9.26.54-9.26 10.96v21.36s-2.25 10.05 18.04 10.05v10.3s-1.28 12.36 27.4 12.36zm10.74-8.9c-3 0-5.42-2.45-5.42-5.48s2.4-5.47 5.4-5.47 5.4 2.43 5.4 5.45c0 3.03-2.4 5.5-5.4 5.5z"/>
  </svg>
)

// JS Official Icon
const JSIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="630" height="630" fill="#f7df1e"/>
    <path d="M423.4 492.5c22.5 0 46.2-7.5 54.6-11.4l16.1 41.3c-13.9 7.4-44.6 15.2-77.4 15.2-73.8 0-117.8-46.1-117.8-124 0-82.6 51.5-120.7 108.8-120.7 36.3 0 62.4 10.5 73.6 18l-15.4 41c-15.6-9.1-34.9-14-53.7-14-36.4 0-58.9 22.8-58.9 66 0 46.4 27.5 76.5 68.1 76.5zm-192.1-10c0 9 0 16 0 16-18.4 8.7-41 12.7-72.2 12.7-52.6 0-98.3-21.2-98.3-94v-112h54.9v108.9c0 37.6 16.3 47.9 44.9 47.9 17.5 0 32-4.5 40.5-8.8l10.9 41.2c-5.7 2.4-23.7 8.2-56 8.2-11.8 0-24.8-1.5-35.3-3.9v-.4-.8c0-.6 0-1.2 0-1.8 19.4 6 42.6 9 60.5 9 10.1 0 17.6-.8 21.6-1.9 3.2-1.9 33.1.2 33.1-23.4v-193.8h56v204.6zm-175.7 39.5c.3 0 .5.1.8.1-.3 0-.5-.1-.8-.1zm-49.8-12.7v.5z" fill="#000"/>
  </svg>
)

// Node Official Icon
const NodeIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#339933" d="M115.4 34.6l-48.3-27.9c-2-1.1-4.4-1.1-6.4 0L12.5 34.6c-2 1.1-3.2 3.2-3.2 5.5v55.8c0 2.3 1.2 4.4 3.2 5.5l48.3 27.9c2 1.1 4.4 1.1 6.4 0l48.3-27.9c2-1.1 3.2-3.2 3.2-5.5V40c-.1-2.2-1.3-4.3-3.3-5.4zM68.5 79.5c-4 1.4-8.7 1.8-13.4.6-4.6-1.2-8.5-4.1-10.7-8.1l8.5-5c1.1 2.3 3.1 3.9 5.6 4.6 2.5.7 5.1.5 7.4.2 2.6-.4 5.2-1.8 5.2-4.7 0-3.3-3.6-4.3-6.6-4.9l-6.1-1.3c-4.4-.9-10.7-2.6-10.7-9.5 0-6.7 6.1-9.9 12-11 5.4-1 10.9-.3 15.6 2.3l-5 8.1c-3.1-1.6-6.6-2.3-10-2.2-2.3.1-4.8.7-4.8 2.8 0 1.9 1.9 2.5 3.6 2.9l6.1 1.3c5 .9 13.5 1.9 13.5 10.4.1 6.4-4.8 12.3-10.2 13.5zm-26-8.1h-8.8V43.2l-15.1 22V41h9.1v27l14.9-22.1h8.8L42.5 71.4z M96.1 79.5h-9v-38.4h9.1v38.4zM96.1 34.9h-9v-9.1h9.1v9.1z"/>
  </svg>
)

export default function ServiceDetailPage() {
  const { id } = useParams()
  const service = servicesDetailed.find(s => s.id === id)
  
  if (!service) {
    return <Navigate to="/services" />
  }

  const renderHeroVisual = () => {
    // Academic Projects -> 2 Columns highlighting Major/Minor details
    if (service.id === 'academic-projects') {
      return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative z-20">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform">
             <h3 className="text-3xl font-extrabold text-[#1877F2] mb-6">Major Projects</h3>
             <ul className="space-y-4 text-slate-700">
               <li className="flex items-start gap-3"><span className="text-blue-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">Full stack application engineering</span></li>
               <li className="flex items-start gap-3"><span className="text-blue-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">Database architecture and planning</span></li>
               <li className="flex items-start gap-3"><span className="text-blue-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">Production deployment strategies</span></li>
               <li className="flex items-start gap-3"><span className="text-blue-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">Comprehensive code documentation</span></li>
             </ul>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform">
             <h3 className="text-3xl font-extrabold text-[#00B7B5] mb-6">Minor Projects</h3>
             <ul className="space-y-4 text-slate-700">
               <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">Core algorithm implementation</span></li>
               <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">Frontend UI/UX mockups & design</span></li>
               <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">API integrations and isolated testing</span></li>
               <li className="flex items-start gap-3"><span className="text-emerald-500 font-bold mt-1">✓</span><span className="font-medium text-lg leading-relaxed">Concept validation and presentation prep</span></li>
             </ul>
          </div>
        </div>
      )
    }

    // Logo Branding -> No functionality/visual requested
    if (service.id === 'branding') {
      return <div className="mb-0"></div>
    }

    // E-commerce -> Floating bubbles in a section (no solar system)
    if (service.id === 'ecommerce') {
      return (
        <div className="relative w-full max-w-4xl mx-auto h-[350px] flex items-center justify-center mb-24 z-20">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 md:left-20 bg-[#1877F2] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">UI / UX</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 left-[10%] bg-[#D349A1] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Wishlist & Auth</motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }} className="absolute top-16 right-10 md:right-24 bg-[#00B7B5] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Cart & Checkout</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }} className="absolute bottom-16 right-[15%] bg-[#018790] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Products API</motion.div>
          
          <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-6xl shadow-2xl z-20 ring-4 ring-white border-4 border-slate-100">
            {service.icon}
          </div>
        </div>
      )
    }

    // Web / App Dev -> Official Icons Solar System
    if (service.id === 'web-dev' || service.id === 'app-dev') {
      return (
        <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] flex items-center justify-center mb-32 z-20">
           {/* Center Core */}
           <div className="absolute w-28 h-28 md:w-32 md:h-32 bg-slate-900 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.15)] flex items-center justify-center text-white text-5xl z-20 ring-8 ring-white">
             {service.icon}
           </div>

           {/* Orbit Rings */}
           <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] border border-slate-200 rounded-full shadow-inner"></div>
           <div className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px] border border-slate-100 rounded-full shadow-inner"></div>
           
           {/* Inner Revolving Container */}
           <motion.div 
              className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
           >
              {/* React */}
              <motion.div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center p-2.5" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                <ReactIcon />
              </motion.div>
              {/* Node */}
              <motion.div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center p-2.5" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                <NodeIcon />
              </motion.div>
           </motion.div>

           {/* Outer Revolving Container */}
           <motion.div 
              className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px]"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
           >
              {/* JS */}
              <motion.div className="absolute top-1/2 -left-7 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-900 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center p-3" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
                <JSIcon />
              </motion.div>
              {/* Python */}
              <motion.div className="absolute top-1/2 -right-7 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-900 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center p-3" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
                <PythonIcon />
              </motion.div>
           </motion.div>
        </div>
      )
    }

    // Marketing Visual
    if (service.id === 'marketing') {
      return (
        <div className="w-full max-w-5xl mx-auto mb-28 z-20 relative">
          <div className="w-full h-[350px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <img src="/marketing_hero.png" alt="Digital Marketing" className="w-full h-full object-cover" />
          </div>
        </div>
      )
    }

    // Default Fallback (Talent hiring, Consulting, etc.) -> Generate Image
    return (
      <div className="w-full max-w-5xl mx-auto mb-28 z-20 relative flex justify-center">
        <div className="w-full h-[350px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-slate-100">
          <img src="/generic_service.png" alt="Service Representation" className="w-full h-full object-cover object-center" />
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-32 font-sans overflow-hidden">
      
      {/* Dynamic HERO SECTION */}
      <section className="relative w-full max-w-6xl mx-auto px-6 mb-16 flex flex-col items-center">
        <div className="text-center mb-24 relative z-10 mt-10">
          <span className="text-[13px] font-bold text-blue-600 uppercase tracking-widest mb-4 block">Service Detail</span>
          <h1 className="text-5xl md:text-[5rem] font-extrabold text-slate-900 tracking-tight leading-[1] max-w-4xl mx-auto">{service.title}</h1>
          <div className="mt-8 border border-slate-200 bg-white rounded-full px-8 py-3 text-slate-600 font-bold inline-flex shadow-sm text-[15px]">{service.description}</div>
        </div>

        {/* Morphing Visual Logic */}
        {renderHeroVisual()}
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
              <p className="text-[22px] md:text-[26px] text-slate-800 leading-relaxed font-bold tracking-tight">We engineer targeted solutions from the ground up, prioritizing extreme execution speed, scalable architecture, and tangible metrics.</p>
            </div>
          </div>
          
          <div className="mt-20 pt-16 border-t border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900 mb-8 text-center">{service.title} Capabilities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features?.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
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
        <div className="bg-[#0a0a0a] rounded-[2rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Initialize Your Scope</h2>
            <p className="text-slate-400 font-medium text-lg">Define your {service.title.toLowerCase()} requirements below. Data routes directly to the core team.</p>
          </div>
          
          <form className="flex flex-col gap-6 relative z-10" action={`mailto:${business?.email || 'mernpixeldev@gmail.com'}`} method="GET" encType="text/plain">
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
            
            <button type="submit" className="mt-6 bg-[#D349A1] hover:bg-[#c04090] text-white font-extrabold text-[15px] uppercase tracking-widest rounded-xl py-5 transition-transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(211,73,161,0.3)]">
              Send Request to MERNpixel
            </button>
          </form>
        </div>
      </section>

    </main>
  )
}
