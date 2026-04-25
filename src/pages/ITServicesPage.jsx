import { useState } from 'react'
import { servicesDetailed } from '../data/siteData'
import ServiceModal from '../components/ServiceModal'

export default function ITServicesPage() {
  const [activeService, setActiveService] = useState(null)

  return (
    <main className="min-h-screen bg-[#F5F6F8] pb-32 pt-32">
      
      {/* Simple, Bold Centered Title */}
      <section className="text-center mb-10 mt-12">
        <h1 className="text-4xl md:text-[2.75rem] font-bold text-[#1a1a1a]">
          Our Services
        </h1>
      </section>

      {/* Main Container tightly bounded like the template */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 relative">
        
        {/* Background Image Block */}
        <div className="w-full h-[350px] md:h-[420px] rounded-[1.5rem] overflow-hidden relative shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2850&auto=format&fit=crop" 
            alt="Services Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3-Column Overlapping Cards wrapper */}
        <div className="relative z-10 -mt-24 md:-mt-32 px-4 xs:px-6 sm:px-12">
          {/* We use grid to create the 3 columns, gap-6 like the design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesDetailed.map((service, i) => (
              <div 
                key={i}
                onClick={() => setActiveService(service)}
                className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] px-6 pt-12 pb-10 text-center relative cursor-pointer hover:-translate-y-2 transition-transform duration-300 group flex flex-col items-center"
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
                <div className="mt-auto font-bold text-[12px] text-[#1a1a1a] border-b-[2px] border-[#1a1a1a] pb-0.5 tracking-widest hover:text-blue-600 hover:border-blue-600 transition-colors">
                  MORE
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />

    </main>
  )
}

