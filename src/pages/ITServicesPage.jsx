import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { servicesDetailed } from '../data/siteData'
import ServiceIcon from '../components/ServiceIcon'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function ITServicesPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] pb-32 overflow-hidden">
      
      {/* 1. FIRST SECTION: Custom Theme Background Dialogue/Approach */}
      <section className="relative w-full bg-[#dc4005] pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden shadow-xl">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        ></div>

        {/* Soft atmospheric glows for pink theme */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-left relative z-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal} transition={{ duration: 0.6 }}>
            
            <div className="inline-flex bg-white/20 rounded-full px-5 py-2 mb-8 items-center border border-white/40 backdrop-blur-md">
               <span className="text-xs font-black text-white tracking-widest uppercase">Our Approach</span>
            </div>

            <h2 className="text-4xl md:text-[4.5rem] font-extrabold tracking-tight text-white mb-8 leading-[1.1] max-w-4xl">
              Built around what <span className="text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)] underline decoration-white/40 underline-offset-[12px]">moves the metric.</span>
            </h2>
            
            <p className="text-lg md:text-[22px] text-white/90 max-w-3xl leading-[1.6] font-bold tracking-wide">
              From shipping a high-converting site to mentoring student projects — every engagement is shaped to deliver real outcomes.
            </p>
            
          </motion.div>
        </div>
      </section>

      {/* 2. SECOND SECTION: Hero Image */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-16 relative z-20">
        <div className="w-full h-[350px] md:h-[550px] rounded-[2rem] overflow-hidden relative shadow-2xl ring-1 ring-slate-200/50">
          <img 
            src="/services-hero.jpg" 
            alt="Services Background"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. THIRD SECTION: Services Cards Grid (Increased margin and box size) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-8 mt-32 relative z-30">
        <div className="text-center mb-20 relative z-20">
          <span className="text-[13px] font-bold text-blue-600 uppercase tracking-widest mb-4 block">Core Competencies</span>
          <h1 className="text-4xl md:text-[3.5rem] font-black text-[#1a1a1a] tracking-tight">
            Our Services
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesDetailed.map((service) => (
             <Link 
               key={service.id}
               to={`/services/${service.id}`}
               className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] px-8 pt-16 pb-12 text-center relative cursor-pointer hover:-translate-y-3 transition-all duration-300 group flex flex-col items-center border border-slate-100 hover:border-blue-200"
             >
               {/* Floating Black Icon Block - increased size */}
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#1a1a1a] rounded-[18px] flex items-center justify-center text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                 <ServiceIcon type={service.icon} className="w-9 h-9" strokeWidth={1.9} />
               </div>
               
               {/* Card Content - Increased sizing */}
               <h3 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-5 tracking-tight mt-2">
                 {service.title}
               </h3>
               
               <p className="text-[16px] text-slate-500 mb-10 leading-[1.8] line-clamp-4 max-w-[280px]">
                 {service.description}
               </p>
               
               {/* Bold standard text link */}
               <div className="mt-auto font-black text-[13px] text-[#1a1a1a] border-b-[3px] border-transparent group-hover:border-[#1a1a1a] pb-1 tracking-widest transition-colors duration-300 uppercase">
                 Explore Detail
               </div>
             </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
