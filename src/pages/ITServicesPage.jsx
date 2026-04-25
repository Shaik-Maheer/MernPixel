import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { servicesDetailed } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ITServicesPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-24">
      
      {/* Background Hatch Pattern - extremely subtle diagonal lines */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, #94a3b8, #94a3b8 1px, transparent 1px, transparent 24px)',
        }} 
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }}>
            
            <div className="inline-flex bg-blue-50 rounded-full px-4 py-1.5 mb-8 items-center border border-blue-100">
               <span className="text-xs font-bold text-slate-800 tracking-wide">Services</span>
            </div>

            <h1 className="text-5xl md:text-[5rem] font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] max-w-4xl">
              Built around what <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">moves the metric.</span>
            </h1>
            
            <p className="text-lg md:text-[22px] text-slate-600 max-w-3xl leading-[1.6] font-medium">
              From shipping a high-converting site to mentoring student projects — every engagement is shaped to deliver real outcomes.
            </p>
            
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {servicesDetailed.map((service, index) => (
              <motion.article
                key={service.id}
                className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-lg flex flex-col items-start isolate cursor-pointer min-h-[260px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100/80 flex items-center justify-center text-slate-700 text-2xl group-hover:bg-white/20 group-hover:text-white transition-colors duration-300 mb-6">
                  {service.icon}
                </div>

                <div className="flex flex-col h-full w-full">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-2 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[15px] font-medium text-slate-500 group-hover:text-white/90 leading-relaxed transition-colors duration-300 mb-8">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto flex items-center text-sm font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                    View more 
                    <span className="ml-2 mt-0.5 group-hover:translate-y-1 transition-transform">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>

              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
