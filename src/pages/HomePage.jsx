import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { servicesDetailed, caseStudies } from '../data/siteData'
import CountUpNumber from '../components/CountUpNumber'
import SEO from '../components/SEO'
import ServiceModal from '../components/ServiceModal'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stats = [
  { value: '31%', label: 'Avg. drop-off reduction' },
  { value: '5+', label: 'Live products shipped' },
  { value: '24%', label: 'Conversion uplift' },
  { value: '100%', label: 'Performance-first' },
]

const recentWorkColors = [
  'bg-orange-100/80',  // Indian Cricket
  'bg-purple-100/80',  // Stylistar
  'bg-cyan-100/80',    // Talent IQ
  'bg-amber-100/80',   // Malik Tea
]

export default function HomePage() {
  const [activeService, setActiveService] = useState(null)

  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-10">
      <SEO title="Product Studio" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        {/* Background Grid restricted to Hero */}
        <div className="absolute inset-0 z-[-2] pointer-events-none opacity-70" style={{ backgroundImage: 'linear-gradient(to right, #E0F2FE 1.5px, transparent 1.5px), linear-gradient(to bottom, #E0F2FE 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />
        
        {/* Soft yellow glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFF8E7]/80 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 z-[-1]"></div>

        <div className="max-w-6xl mx-auto px-6 flex flex-col items-start">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }}>
            
            <div className="inline-flex bg-slate-100 rounded-full px-4 py-1.5 mb-8 items-center border border-slate-200">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
               <span className="text-xs font-semibold text-slate-700 tracking-wide">Now booking Q3 projects</span>
            </div>

            <h1 className="text-[3.5rem] md:text-[5.5rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.05] max-w-4xl text-left">
              Not built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 italic">impress.</span><br/>
              Built to <span className="text-blue-700">perform.</span>
            </h1>
            
            <p className="text-xl md:text-[22px] text-slate-600 mb-10 max-w-3xl leading-[1.6] text-left font-medium">
              MERNpixel is a product studio for businesses that care about outcomes — websites, apps, brands and growth systems engineered to move the metric.
            </p>
            
            <div className="flex flex-wrap gap-4 text-left justify-start">
              <Link to="/contact" className="bg-[#0F172A] text-white px-7 py-3 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center text-[15px]">
                Start a project <span className="ml-2 font-normal text-slate-400">→</span>
              </Link>
              <Link to="/works" className="bg-white text-slate-900 border border-slate-200 px-7 py-3 rounded-full font-medium hover:bg-slate-50 transition-all text-[15px]">
                See our work
              </Link>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-default" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: i * 0.1 }}>
                <h3 className="text-3xl font-bold text-blue-700 mb-1">
                  <CountUpNumber value={stat.value} duration={2000} />
                </h3>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="relative z-10 py-6 overflow-hidden bg-transparent border-y border-slate-100 flex items-center mb-20 whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-6 text-xl md:text-3xl font-bold text-slate-400/80">
          <span>✦ Brand</span><span>✦ Speed</span><span>✦ Outcomes</span><span>✦ Trust</span><span>✦ Polish</span><span>✦ Performance</span><span>✦ Conversion</span><span>✦ Architecture</span>
          <span>✦ Brand</span><span>✦ Speed</span><span>✦ Outcomes</span><span>✦ Trust</span><span>✦ Polish</span><span>✦ Performance</span><span>✦ Conversion</span><span>✦ Architecture</span>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Services shaped around<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">outcomes.</span>
            </h2>
            <Link to="/services" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 uppercase tracking-widest group">
              View all services <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesDetailed.map((service, index) => (
              <motion.article
                onClick={() => setActiveService(service)}
                key={service.id}
                className="group relative bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-lg flex flex-col isolate cursor-pointer hover:-translate-y-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                
                <div className="w-12 h-12 rounded-2xl bg-slate-100/80 flex items-center justify-center text-slate-700 mb-6 text-xl group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2 transition-colors duration-300">{service.title}</h3>
                <p className="text-sm text-slate-500 group-hover:text-white/90 leading-relaxed transition-colors duration-300 flex-grow mb-4">{service.description}</p>
                
                <div className="mt-auto flex items-center text-xs font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                  View more 
                  <span className="ml-1 mt-0.5 group-hover:translate-x-1 hover:translate-y-0 transition-transform">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Three Principles */}
      <section className="relative z-10 py-16 mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              Three principles. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">Zero<br/>compromises.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div className="group bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] border border-[#FBE3A1] flex items-center justify-center mb-6 shadow-sm rotate-[-3deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                <span className="text-xl drop-shadow-sm">⚡️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Speed</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Lighthouse-grade performance, ruthless asset budgets, fast time-to-interaction.</p>
            </motion.div>
            <motion.div className="group bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: 0.1 }}>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] border border-[#FBE3A1] flex items-center justify-center mb-6 shadow-sm rotate-[3deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                <span className="text-xl drop-shadow-sm">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Conversion</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Every section earns its place. Hierarchy, trust and CTAs designed to convert.</p>
            </motion.div>
            <motion.div className="group bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: 0.2 }}>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] border border-[#FBE3A1] flex items-center justify-center mb-6 shadow-sm rotate-[-3deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                <span className="text-xl drop-shadow-sm">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Scale</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Architecture that holds up — clean code, sane patterns, easy to extend.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="relative z-10 py-16 mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">work.</span>
            </h2>
            <Link to="/works" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center tracking-widest uppercase group mb-2">
              All projects <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.slice(0, 4).map((work, index) => (
              <motion.a
                key={work.id}
                href={work.link}
                target="_blank"
                rel="noreferrer"
                className={`group rounded-[2rem] pt-10 px-10 pb-0 flex flex-col min-h-[340px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${recentWorkColors[index % recentWorkColors.length]} overflow-hidden block border border-transparent hover:border-white/50`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-10 relative z-10">
                  <p className="text-[10px] font-bold text-slate-600/90 uppercase tracking-widest mb-3" style={{letterSpacing: '0.2em'}}>
                    {work.type} • {work.title}
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">
                    {work.client}
                  </h3>
                  <div className="inline-flex items-center text-sm font-bold text-slate-900 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:bg-white/70 transition-colors">
                    Visit live <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
                
                {/* Project Image Background/Bottom pop */}
                {work.image && (
                  <div className="mt-auto w-full h-[240px] relative rounded-t-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] transform transition-transform duration-500 group-hover:scale-[1.02] translate-y-4 group-hover:translate-y-2">
                    <img src={work.image} alt={work.title} loading="lazy" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-t-xl"></div>
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-16 mt-6">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-[#0A0A0B] text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
            {/* Dark faint grid background inside black container */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Have a project that<br/>deserves to perform?</h2>
              <p className="text-sm md:text-base text-slate-400 mb-10 tracking-wide">Tell us the goal. We'll architect the path.</p>
              <Link to="/contact" className="inline-flex bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-all text-sm items-center shadow-lg">
                Let's talk <span className="ml-1 font-normal">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />

    </main>
  )
}
