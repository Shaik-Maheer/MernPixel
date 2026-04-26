import { useState, useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { servicesDetailed, lectureEvents } from '../data/siteData'
import ServiceIcon from '../components/ServiceIcon'

const themeMap = {
  'web-dev': { primary: 'from-cyan-400 to-blue-600', shadow: 'shadow-cyan-500/20', bgGlow: 'bg-cyan-500/10' },
  'ecommerce': { primary: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/20', bgGlow: 'bg-emerald-500/10' },
  'app-dev': { primary: 'from-purple-400 to-indigo-600', shadow: 'shadow-purple-500/20', bgGlow: 'bg-purple-500/10' },
  'branding': { primary: 'from-rose-400 to-orange-500', shadow: 'shadow-rose-500/20', bgGlow: 'bg-rose-500/10' },
  'marketing': { primary: 'from-amber-400 to-orange-600', shadow: 'shadow-amber-500/20', bgGlow: 'bg-amber-500/10' },
  'academic-projects': { primary: 'from-blue-500 to-indigo-700', shadow: 'shadow-blue-500/20', bgGlow: 'bg-blue-500/10' },
  'talent-hiring': { primary: 'from-teal-400 to-cyan-600', shadow: 'shadow-teal-500/20', bgGlow: 'bg-teal-500/10' },
  'guest-lectures': { primary: 'from-fuchsia-400 to-pink-600', shadow: 'shadow-fuchsia-500/20', bgGlow: 'bg-fuchsia-500/10' },
}

const FAQAccordion = ({ faqs, theme }) => {
  const [openIndex, setOpenIndex] = useState(null)
  
  return (
    <div className="w-full space-y-4">
      {faqs.map((faq, i) => (
         <div key={i} className={`border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm transition-all duration-300 ${openIndex === i ? 'ring-1 ring-white/20' : 'hover:bg-white/10'}`}>
           <button 
             className="w-full text-left px-8 py-5 flex justify-between items-center"
             onClick={() => setOpenIndex(openIndex === i ? null : i)}
           >
             <span className="font-bold text-white text-lg">{faq.q}</span>
             <span className={`text-2xl text-white/60 transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
           </button>
           <AnimatePresence>
             {openIndex === i && (
               <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                 <div className="px-8 pb-6 pt-2 text-slate-300 font-medium leading-relaxed">
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
    { q: 'Will I have direct access to the developers?', a: 'Absolutely. We do not use account managers. You speak directly with the engineers and designers building your product.' },
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
      { q: 'Will you explain the codebase to me?', a: 'Yes! We do not just hand off code. We conduct extensive walk-throughs so you can confidently present your project.' },
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

  const theme = themeMap[id] || themeMap['web-dev']
  
  useEffect(() => {
    document.body.style.backgroundColor = '#050505'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  const renderHeroVisual = () => {
    if (service.id === 'academic-projects') {
      return (
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-10 z-20">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 lg:left-20 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Source Code</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 left-[10%] bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Detailed PPT</motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }} className="absolute top-20 right-10 lg:right-24 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">College Formats</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }} className="absolute bottom-20 right-[10%] bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Live Explanation</motion.div>
          <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl z-20 ${theme.bgGlow} border border-white/20 backdrop-blur-lg`}>
            <ServiceIcon type={service.icon} className="w-20 h-20" strokeWidth={1.5} />
          </div>
        </div>
      )
    }

    if (service.id === 'guest-lectures') {
      return (
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-10 z-20">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-4 lg:left-10 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm">Interactive Sessions</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 left-[5%] bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm">Live Coding</motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }} className="absolute top-20 right-4 lg:right-10 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm">Tech + Business</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }} className="absolute bottom-20 right-[5%] bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest py-4 px-8 rounded-full shadow-2xl text-sm">Resume Reviews</motion.div>
          <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl z-20 ${theme.bgGlow} border border-white/20 backdrop-blur-lg`}>
            <ServiceIcon type={service.icon} className="w-20 h-20" strokeWidth={1.5} />
          </div>
        </div>
      )
    }

    if (service.id === 'marketing') {
      return (
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-10 z-20">
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 lg:left-20 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">SEO Optimization</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 left-[10%] bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Paid Ads Clicks</motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 2 }} className="absolute top-20 right-10 lg:right-24 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Social Scaling</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }} className="absolute bottom-20 right-[10%] bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full shadow-2xl text-sm">Online KPI</motion.div>
          <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl z-20 ${theme.bgGlow} border border-white/20 backdrop-blur-lg`}>
            <ServiceIcon type={service.icon} className="w-20 h-20" strokeWidth={1.5} />
          </div>
        </div>
      )
    }

    // Media sections
    let mediaFile = '';
    if (service.id === 'ecommerce') mediaFile = '/customerdealing.mp4';
    if (service.id === 'web-dev') mediaFile = '/web_development.mp4';
    if (service.id === 'app-dev') mediaFile = '/meetings.mp4';
    if (service.id === 'branding') mediaFile = '/services-hero.jpg';
    if (!mediaFile) mediaFile = '/generic_service.png';

    const isVideo = mediaFile.endsWith('.mp4');

    return (
      <div className="relative w-full max-w-5xl mx-auto mb-20 z-20 mt-16 group">
        <div className={`w-full h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 relative transition-transform duration-700 hover:scale-[1.02] ${theme.shadow}`}>
          {isVideo ? (
            <video src={mediaFile} autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 opacity-80" />
          ) : (
             <img src={mediaFile} alt={service.title} className="w-full h-full object-cover opacity-80" />
          )}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none`}></div>
          <div className={`absolute inset-0 bg-gradient-to-tr ${theme.primary} mix-blend-overlay opacity-40 pointer-events-none`}></div>
        </div>
      </div>
    )
  }

  const faqs = getFaqsByService(service.id)

  return (
    <main className="min-h-screen font-sans bg-[#050505] text-white">
      
      {/* Immersive Hero */}
      <section className="relative w-full pt-40 pb-10 overflow-hidden">
        
        {/* Dynamic Background Glow Based on Theme */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none bg-gradient-to-b ${theme.primary}`}></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center w-full"
          >
            <span className={`inline-block text-xs font-black uppercase tracking-[0.3em] mb-8 bg-clip-text text-transparent bg-gradient-to-r ${theme.primary} px-6 py-2 rounded-full border border-white/10 bg-white/5`}>
              Service Overview
            </span>
            <h1 className="text-5xl md:text-[6.5rem] font-extrabold tracking-tight leading-[1] max-w-5xl mx-auto mb-10 text-white">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
        
        {renderHeroVisual()}
      </section>

      {/* Advanced Features / Narrative */}
      <section className="py-24 relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          {service.id === 'branding' ? (
            <div className={`border border-white/10 bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 md:p-24 text-center max-w-5xl mx-auto ring-1 ring-white/5 ${theme.shadow}`}>
              <h3 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight text-white">A logo is not just a name. It's a brand.</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">A logo speaks powerfully for what you do with deep embedded meaning. We engineer pixel-perfect identities and deliver your branding in all optimal industry formats, accompanied by highly targeted banners for all major social platforms built to scale.</p>
            </div>
          ) : service.id === 'academic-projects' ? (
            <div className={`border border-white/10 bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 md:p-24 text-center max-w-5xl mx-auto ring-1 ring-white/5 ${theme.shadow}`}>
              <h3 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight text-white">We engineer confidence, not just code.</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">We do not just build a student project blindly. We discuss exactly what's needed, lock in the optimal tech stack, build it completely, and explain the architecture to you structurally so you're unbreakable in your viva submission. <strong className="text-white">Included free:</strong> college-formatted PPTs, robust documentation, code zip, and an exclusive 1-on-1 session to run the stack directly on your system.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-12 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xl ring-1 ring-rose-500/50">X</span>
                  <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest">The Problem</h3>
                </div>
                <p className="text-2xl text-slate-300 leading-relaxed font-medium tracking-tight">Most teams deliver generic templates that fail to convert traffic or resolve complex technical debt, causing bloated systems.</p>
              </div>
              <div className={`bg-gradient-to-br ${theme.bgGlow} border border-white/10 rounded-[2.5rem] p-12 backdrop-blur-md relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${theme.primary} opacity-20 blur-[80px]`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <span className={`w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center ring-1 ring-emerald-500/50`}>
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12.5l4 4L19 7.5" />
                      </svg>
                    </span>
                    <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest">The Solution</h3>
                  </div>
                  <p className="text-2xl text-white leading-relaxed font-bold tracking-tight">We engineer targeted solutions from the ground up, prioritizing extreme execution speed, scalable architecture, and tangible metrics.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Grid */}
      {service.useCases && service.useCases.length > 0 && (
         <section className="py-24 relative z-20">
           <div className="max-w-6xl mx-auto px-6">
             <div className="mb-16 md:flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 md:mb-0">Types of {service.title}</h2>
                <p className="text-lg text-slate-400 font-medium max-w-sm text-right">We map our execution precisely to your archetype.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {service.useCases.map((useCase, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] p-10 hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 group relative overflow-hidden">
                    <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${theme.primary} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}></div>
                    <span className="text-6xl font-black text-white/10 mb-8 block font-mono">0{idx + 1}</span>
                    <h3 className="text-2xl font-bold text-white relative z-10">{useCase}</h3>
                  </div>
               ))}
               <div className={`bg-gradient-to-br ${theme.primary} rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl`}>
                  <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white mb-3">Custom Requirement?</h3>
                    <p className="text-white/90 font-medium">We engineer strictly outside the standard templates. Let's talk.</p>
                  </div>
               </div>
             </div>
           </div>
         </section>
      )}

      {service.id === 'guest-lectures' && lectureEvents.length > 0 && (
        <section className="pb-8 md:pb-16 relative z-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className={`inline-block text-xs font-black uppercase tracking-[0.28em] px-5 py-2 rounded-full border border-white/10 bg-white/5 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                Featured Workshops
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-6">Guest Lectures in Action</h2>
              <p className="text-slate-300 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
                Themed sessions combining AI tools, resume workflows, live coding, and placement-focused preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {lectureEvents.map((event, idx) => (
                <article key={`${event.date}-${event.topic}-${idx}`} className={`relative overflow-hidden bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-md ${theme.shadow}`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme.primary}`}></div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="text-[11px] font-black tracking-[0.22em] uppercase text-slate-300">Workshop {String(idx + 1).padStart(2, '0')}</p>
                    <p className="text-sm font-bold text-white">{event.date}</p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">{event.topic}</h3>
                  {event.workshop && <p className="text-fuchsia-300 font-bold text-lg mb-6">{event.workshop}</p>}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2">Time</p>
                      <p className="text-white font-semibold">{event.time || 'TBA'}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2">Venue</p>
                      <p className="text-white font-semibold">{event.venue}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:col-span-2">
                      <p className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2">Audience</p>
                      <p className="text-white font-semibold">{event.audience}</p>
                    </div>
                  </div>

                  {event.speakers && event.speakers.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 mb-3">Speakers</p>
                      <div className="flex flex-wrap gap-2">
                        {event.speakers.map((speaker, speakerIdx) => (
                          <span key={`${speaker}-${speakerIdx}`} className="px-3 py-1.5 text-sm font-semibold text-white rounded-full border border-white/15 bg-white/5">
                            {speaker}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-slate-300 leading-relaxed">{event.highlight}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-6 relative z-20">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Common Questions</h2>
         </div>
         <FAQAccordion faqs={faqs} theme={theme} />
      </section>

      {/* Final Glowing CTA */}
      <section className="py-32 relative z-20 overflow-hidden">
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-gradient-to-r ${theme.primary} opacity-20 blur-[120px] rounded-full pointer-events-none`}></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-[4rem] font-black text-white mb-12 tracking-tight leading-[1.1]">Ready to build without the noise?</h2>
            <Link to="/contact" className={`inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full text-[16px] font-black tracking-widest uppercase hover:scale-105 transition-transform ${theme.shadow} border-2 border-transparent hover:border-white shadow-2xl`}>
               Get in Touch 
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
         </div>
      </section>

    </main>
  )
}
