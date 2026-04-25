import { useState } from 'react'
import { motion } from 'framer-motion'
import { servicesDetailed } from '../data/siteData'
import ServiceModal from '../components/ServiceModal'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function ITServicesPage() {
  const [activeService, setActiveService] = useState(null)

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-32 overflow-hidden">
      
      {/* Title Section */}
      <section className="pt-32 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-[4rem] font-extrabold tracking-tight text-slate-900 mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              Built around what <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">moves the metric</span>. From shipping a high-converting site to mentoring student projects, every engagement delivers real outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative w-full h-[500px] md:h-[650px] bg-white">
        <div className="absolute inset-x-0 top-0 h-full w-full max-w-[1600px] mx-auto">
          <motion.div 
             className="relative w-full h-full"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop" 
               alt="Our Team" 
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/10"></div>
          </motion.div>
        </div>
      </section>

      {/* Services Cards (Overlapping the image) */}
      <section className="relative z-20 -mt-32 md:-mt-48 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
            {servicesDetailed.map((service, index) => (
              <motion.article
                onClick={() => setActiveService(service)}
                key={service.id}
                className="group bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-300/40 hover:shadow-slate-400/50 transition-all duration-300 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                
                <div className="w-20 h-20 shrink-0 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white text-3xl transition-transform duration-300 mb-8 shadow-md group-hover:scale-110">
                  {service.icon}
                </div>

                <div className="flex flex-col h-full w-full items-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[15px] font-medium text-slate-500 leading-relaxed mb-8 max-w-[280px]">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto text-sm font-extrabold text-slate-900 uppercase tracking-widest border-b-2 border-transparent group-hover:border-slate-900 pb-1 transition-all">
                    More
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
