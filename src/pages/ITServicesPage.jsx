import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { servicesDetailed } from '../data/siteData'
import ServiceModal from '../components/ServiceModal'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ITServicesPage() {
  const [activeService, setActiveService] = useState(null)

  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-32 relative overflow-hidden">
      
      {/* Background Dots Grid & Soft Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFF8E7]/60 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 z-0 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-[-1] pointer-events-none opacity-70" style={{ backgroundImage: 'linear-gradient(to right, #E0F2FE 1.5px, transparent 1.5px), linear-gradient(to bottom, #E0F2FE 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />
        
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
                onClick={() => setActiveService(service)}
                key={service.id}
                className="group relative bg-white hover:bg-[#EBFDF1] border border-slate-200 hover:border-[#A7F3D0] rounded-[2rem] p-8 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col items-start isolate cursor-pointer min-h-[260px] hover:-translate-y-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100/80 group-hover:bg-white flex items-center justify-center text-slate-700 group-hover:text-emerald-600 text-2xl transition-colors duration-300 mb-6">
                  {service.icon}
                </div>

                <div className="flex flex-col h-full w-full">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto flex items-center text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                    View more 
                    <span className="ml-2 mt-0.5 group-hover:translate-x-1 transition-transform">
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

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />

    </main>
  )
}
