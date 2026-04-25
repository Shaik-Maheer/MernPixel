import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { servicesDetailed } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function ITServicesPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] pb-10 pt-32 relative overflow-hidden">
      
      {/* Simple, Bold Centered Title */}
      <section className="text-center mb-10 mt-12 relative z-20">
        <h1 className="text-4xl md:text-[2.75rem] font-bold text-[#1a1a1a]">
          Our Services
        </h1>
      </section>

      {/* Main Container tightly bounded like the template */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 relative z-20">
        
        {/* Background Image Block */}
        <div className="w-full h-[350px] md:h-[420px] rounded-[1.5rem] overflow-hidden relative shadow-md">
          <img 
            src="/services-hero.jpg" 
            alt="Services Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3-Column Overlapping Cards wrapper */}
        <div className="relative z-30 -mt-24 md:-mt-32 px-4 xs:px-6 sm:px-12">
          {/* We use grid to create the 3 columns, gap-6 like the design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesDetailed.map((service) => (
                <Link 
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] px-6 pt-12 pb-10 text-center relative cursor-pointer hover:-translate-y-2 transition-transform duration-300 group flex flex-col items-center border border-transparent hover:border-blue-100"
                >
                  {/* Floating Black Icon Block */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#1a1a1a] rounded-[0.75rem] flex items-center justify-center text-white text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  
                  {/* Card Content exactly like design */}
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-[13px] text-[#888888] mb-8 leading-[1.8] line-clamp-4 max-w-[220px]">
                    {service.description}
                  </p>
                  
                  {/* Bold standard text link MORE */}
                  <div className="mt-auto font-bold text-[12px] text-[#1a1a1a] border-b-[2px] border-transparent group-hover:border-[#1a1a1a] pb-0.5 tracking-widest transition-colors duration-300">
                    EXPLORE
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Restored Dialogue Section Below */}
      <section className="relative z-10 pt-24 pb-20 md:pt-40 md:pb-32 mt-12">
        {/* Background Dots Grid & Soft Glows specific to this block */}
        <div className="absolute inset-0 z-[-1] pointer-events-none opacity-50" style={{ backgroundImage: 'linear-gradient(to right, #E0F2FE 1.5px, transparent 1.5px), linear-gradient(to bottom, #E0F2FE 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFF8E7]/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] z-0 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-left relative z-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal} transition={{ duration: 0.6 }}>
            
            <div className="inline-flex bg-blue-50 rounded-full px-4 py-1.5 mb-8 items-center border border-blue-100">
               <span className="text-xs font-bold text-slate-800 tracking-wide">Our Approach</span>
            </div>

            <h2 className="text-4xl md:text-[4.5rem] font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] max-w-4xl">
              Built around what <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">moves the metric.</span>
            </h2>
            
            <p className="text-lg md:text-[22px] text-slate-600 max-w-3xl leading-[1.6] font-medium">
              From shipping a high-converting site to mentoring student projects — every engagement is shaped to deliver real outcomes.
            </p>
            
          </motion.div>
        </div>
      </section>

    </main>
  )
}

