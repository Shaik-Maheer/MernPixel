import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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

// Python Official Icon
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

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null)
  
  return (
    <div className="w-full space-y-4">
      {faqs.map((faq, i) => (
         <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
           <button 
             className="w-full text-left px-8 py-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
             onClick={() => setOpenIndex(openIndex === i ? null : i)}
           >
             <span className="font-extrabold text-slate-800 text-lg">{faq.q}</span>
             <span className={`text-2xl text-blue-500 transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
           </button>
           <AnimatePresence>
             {openIndex === i && (
               <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                 <div className="px-8 pb-6 pt-2 text-slate-600 font-medium leading-relaxed">
                   {faq.a}
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
      ))}
    </div>
  )
}

const getFaqsByService = (id) => {
  const common = [
    { q: 'How long does a typical engagement last?', a: 'Depending on complexity, standard projects ship in 2-4 weeks, while complex full-stack applications run 6-12 weeks.' },
    { q: 'Will I have direct access to the developers?', a: 'Absolutely. We don\'t use account managers. You speak directly with the engineers and designers building your product.' },
    { q: 'Do you offer post-launch support?', a: 'Yes! Every project includes a warranty period, and we offer long-term retainers for feature scaling.' }
  ]
  const serviceFaqs = {
    'web-dev': [
      { q: 'What tech stack do you use?', a: 'We primarily build with React, Tailwind CSS, Express, and MongoDB for scalable, blazing-fast web experiences.' },
      { q: 'Can you migrate my old PHP/WordPress site?', a: 'Yes, we frequently modernize legacy stacks into high-performance headless architecture.' }
    ],
    'ecommerce': [
      { q: 'Do you integrate with local payment gateways?', a: 'Yes, we integrate Razorpay, Stripe, PhonePe, and PayPal seamlessly.' }
    ],
    'app-dev': [
      { q: 'Are your apps native or cross-platform?', a: 'We build primarily using React Native to ensure seamless deployment across iOS and Android from a single codebase.' }
    ],
    'marketing': [
      { q: 'Do you guarantee ROI?', a: 'We guarantee a pure, data-driven methodology that maximizes ad-spend and SEO potential, but market variables dictate final numbers.' }
    ],
    'academic-projects': [
      { q: 'Will you explain the codebase to me?', a: 'Yes! We don\'t just hand off code. We conduct extensive walk-throughs so you can confidently present your project.' },
      { q: 'Do you write the project synopsis/report?', a: 'We provide comprehensive architectural documentation and college-formatted PPTs to ensure you ace your presentation.' }
    ],
    'guest-lectures': [
      { q: 'What is the structure of a typical session?', a: 'Our sessions are highly interactive with zero boring slides. We live-code, do deep resume reviews, and teach tangible startup iteration skills.' }
    ]
  }
  return [...(serviceFaqs[id] || []), ...common].slice(0, 4)
}

export default function ServiceDetailPage() {
  const { id } = useParams()
  const service = servicesDetailed.find(s => s.id === id)
  
  if (!service) {
    return <Navigate to="/services" />
  }

  const renderHeroVisual = () => {
    // Academic Projects 
    if (service.id === 'academic-projects') {
      return (
        <div className="relative w-full max-w-4xl mx-auto h-[350px] flex items-center justify-center mb-24 z-20">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 md:left-20 bg-[#1877F2] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Source Code</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 left-[10%] bg-[#D349A1] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Detailed PPT</motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }} className="absolute top-16 right-10 md:right-24 bg-[#00B7B5] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">College Formats</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }} className="absolute bottom-16 right-[15%] bg-[#018790] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Live Explanation</motion.div>
          
          <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-[3rem] font-black shadow-2xl z-20 ring-4 ring-white border-4 border-slate-100">
            A
          </div>
        </div>
      )
    }

    // Guest Lectures 
    if (service.id === 'guest-lectures') {
      return (
        <div className="relative w-full max-w-4xl mx-auto h-[350px] flex items-center justify-center mb-24 z-20">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 md:left-20 bg-[#1877F2] text-white font-extrabold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">4 Friends -&gt; Startup</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 left-[5%] bg-[#D349A1] text-white font-extrabold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Won Hackathon</motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }} className="absolute top-16 right-5 md:right-10 bg-[#00B7B5] text-white font-extrabold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Tech + Business</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }} className="absolute bottom-16 right-[10%] bg-[#018790] text-white font-extrabold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">"Give Job, Not Get Job"</motion.div>
          
          <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-[3rem] font-black shadow-2xl z-20 ring-4 ring-white border-4 border-slate-100">
            G
          </div>
        </div>
      )
    }

    // Logo Branding
    if (service.id === 'branding') {
      return <div className="mb-0"></div>
    }

    // E-commerce 
    if (service.id === 'ecommerce') {
      return (
        <div className="relative w-full max-w-5xl mx-auto mb-28 z-20">
          <div className="w-full h-[350px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <video src="/customerdealing.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-[2rem]"></div>
          </div>
        </div>
      )
    }

    // Digital Marketing
    if (service.id === 'marketing') {
      return (
        <div className="relative w-full max-w-4xl mx-auto h-[350px] flex items-center justify-center mb-24 z-20">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 md:left-20 bg-[#1877F2] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">SEO Optimization</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 left-[10%] bg-[#D349A1] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Paid Ads Clicks</motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }} className="absolute top-16 right-10 md:right-24 bg-[#00B7B5] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Insta Management</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }} className="absolute bottom-16 right-[15%] bg-[#018790] text-white font-extrabold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm border-2 border-white/20">Online Presence</motion.div>
          
          <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white text-6xl shadow-2xl z-20 ring-4 ring-white border-4 border-slate-100">
            {service.icon}
          </div>
        </div>
      )
    }

    // Web Development
    if (service.id === 'web-dev') {
      return (
        <div className="relative w-full max-w-5xl mx-auto mb-28 z-20">
          <div className="w-full h-[350px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <video src="/web_development.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-[2rem]"></div>
          </div>
        </div>
      )
    }

    // App Development
    if (service.id === 'app-dev') {
      return (
        <div className="relative w-full max-w-5xl mx-auto mb-28 z-20">
          <div className="w-full h-[350px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <video src="/meetings.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-[2rem]"></div>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full max-w-5xl mx-auto mb-28 z-20 relative flex justify-center">
        <div className="w-full h-[350px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-slate-100">
          <img src="/generic_service.png" alt="Service Representation" className="w-full h-full object-cover object-center" />
        </div>
      </div>
    )
  }

  const faqs = getFaqsByService(service.id)

  return (
    <main className="min-h-screen pt-32 pb-32 font-sans overflow-hidden bg-[#fafafa]">
      
      <section className="relative w-full max-w-6xl mx-auto px-6 mb-16 flex flex-col items-center">
        <div className="text-center mb-24 relative z-10 mt-10">
          <span className="text-[13px] font-bold text-blue-600 uppercase tracking-widest mb-4 block">Service Detail</span>
          <h1 className="text-5xl md:text-[5rem] font-extrabold text-slate-900 tracking-tight leading-[1] max-w-4xl mx-auto">{service.title}</h1>
          <div className="mt-8 border border-slate-200 bg-white rounded-full px-8 py-3 text-slate-600 font-bold inline-flex shadow-sm text-[15px]">{service.description}</div>
        </div>
        {renderHeroVisual()}
      </section>

      <section className="py-24 mb-10">
        <div className="max-w-6xl mx-auto px-6">
          {service.id === 'branding' ? (
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">A logo is not just a name. It's a brand.</h3>
              <p className="text-[20px] text-slate-600 leading-[1.8] font-medium">A logo speaks powerfully for what you do with deep embedded meaning. We engineer pixel-perfect identities and deliver your branding in all optimal industry formats, accompanied by highly targeted banners for all major social platforms built to scale.</p>
            </div>
          ) : service.id === 'academic-projects' ? (
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">We engineer confidence, not just code.</h3>
              <p className="text-[20px] text-slate-600 leading-[1.8] font-medium">We don't just build a student project blindly. We discuss exactly what's needed, lock in the optimal tech stack, build it completely, and explain the architecture to you structurally so you're unbreakable in your viva submission. <strong className="text-slate-900">Included free:</strong> college-formatted PPTs, robust documentation, code zip, and an exclusive 1-on-1 session to run the stack directly on your system.</p>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* DYNAMIC TYPES / USE CASES */}
      {service.useCases && service.useCases.length > 0 && (
         <section className="py-24 bg-[#0a0a0a] border-y border-slate-900 mt-20">
           <div className="max-w-6xl mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Types of {service.title}</h2>
                <p className="text-lg text-slate-400 font-medium">We map our {service.title.toLowerCase()} execution exactly to your archetype.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {service.useCases.map((useCase, idx) => (
                  <div key={idx} className="bg-[#111] border border-slate-800 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300">
                    <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold mb-6">{idx + 1}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{useCase}</h3>
                  </div>
               ))}
               <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-3xl p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Custom Requirement?</h3>
                  <p className="text-blue-200">We engineer strictly outside the standard templates.</p>
               </div>
             </div>
           </div>
         </section>
      )}

      {/* FAQ SECTION */}
      <section className="py-28 max-w-3xl mx-auto px-6">
         <div className="text-center mb-16">
            <span className="text-[13px] font-bold text-[#D349A1] uppercase tracking-widest mb-3 block">Clarity</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Common Questions</h2>
         </div>
         <FAQAccordion faqs={faqs} />
      </section>

      {/* FINAL CTA */}
      <section className="pb-32 pt-16">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-10 tracking-tight">Ready to build without the noise?</h2>
            <Link to="/contact" className="inline-flex bg-[#D349A1] hover:bg-[#c04090] text-white px-10 py-6 rounded-full text-[15px] font-black tracking-widest uppercase hover:-translate-y-2 transition-transform shadow-[0_20px_40px_rgba(211,73,161,0.3)]">
               Get in Touch with MERNpixel Team
            </Link>
         </div>
      </section>

    </main>
  )
}
