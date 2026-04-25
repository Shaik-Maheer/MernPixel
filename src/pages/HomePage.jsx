import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { servicesDetailed, caseStudies } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFB] pb-24">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.55 }}>
            <div className="inline-flex bg-white/60 backdrop-blur-md border border-slate-200 rounded-full px-4 py-1.5 mb-8 shadow-sm items-center">
               <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
               <span className="text-sm font-medium text-slate-800">Now booking Q3 projects</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
              Not built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 italic font-serif">impress.</span><br/>
              Built to <span className="text-blue-700">perform.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              MERNpixel is a product studio for businesses that care about outcomes — websites, apps, brands and growth systems engineered to move the metric.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all flex items-center shadow-lg">Start a project</Link>
              <Link to="/works" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm">See our work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Services shaped around<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">outcomes.</span></h2>
            </div>
            <Link to="/services" className="text-slate-600 hover:text-slate-900 font-medium flex items-center group">
              View all services <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesDetailed.map((service, index) => (
              <motion.article
                key={service.id}
                className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-6 text-xl">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Three Principles */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Three principles.<br/>Zero compromises.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Speed</h3>
              <p className="text-slate-600 leading-relaxed">Lighthouse-grade performance, ruthless asset budgets, fast time-to-interaction.</p>
            </motion.div>
            <motion.div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: 0.1 }}>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Conversion</h3>
              <p className="text-slate-600 leading-relaxed">Every section earns its place. Hierarchy, trust and CTAs designed to convert.</p>
            </motion.div>
            <motion.div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: 0.2 }}>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Scale</h3>
              <p className="text-slate-600 leading-relaxed">Architecture that holds up — clean code, sane patterns, easy to extend.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-bold text-slate-900">Recent work.</h2>
            <Link to="/works" className="text-slate-600 hover:text-slate-900 font-medium flex items-center group">
              All projects <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 4).map((work, index) => (
              <motion.a
                key={work.id}
                href={work.link}
                target="_blank"
                rel="noreferrer"
                className="group bg-slate-100 rounded-[2rem] overflow-hidden transition-all text-left flex flex-col pt-8 px-8 pb-0 border border-slate-200 hover:shadow-lg block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-8">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">{work.title}</p>
                  <h3 className="text-3xl font-bold text-slate-900 flex items-center justify-between">
                    {work.client} 
                    <span className="bg-white text-sm font-semibold px-4 py-1.5 rounded-full border border-slate-200">Visit live</span>
                  </h3>
                </div>
                <div className="overflow-hidden w-full h-[300px] mt-auto rounded-t-xl bg-slate-200 shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:-translate-y-2">
                  <img src={work.image} alt={work.title} loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 z-0"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Have a project that deserves to perform?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Tell us the goal. We'll architect the path.</p>
              <Link to="/contact" className="inline-flex bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg text-lg items-center">
                Let's talk <span className="ml-2">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
