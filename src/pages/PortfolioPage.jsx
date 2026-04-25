import { motion } from 'framer-motion'
import { caseStudies } from '../data/siteData'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white pb-32 font-sans overflow-hidden">
       
       {/* Top Dark Section */}
       {/* Using black as requested: "keep black color background" */}
       <section className="bg-[#0a0a0a] pt-32 pb-48 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mt-12 mb-8 relative z-10">
             
             {/* Left Header */}
             <div className="text-left w-full max-w-lg mb-8 md:mb-0">
               <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                 PORTFOLIO
               </span>
               <h1 className="text-5xl md:text-[4rem] font-bold text-white leading-tight">
                 Our Projects
               </h1>
             </div>
             
             {/* Right Text */}
             <div className="w-full md:max-w-md xl:max-w-lg">
               <p className="text-[14px] md:text-[15px] text-gray-300 leading-[1.8] font-medium">
                 We engineer premium digital products driven by scalable architecture, seamless user experience, and real business outcomes. 
                 Explore our selected technical implementations below.
               </p>
             </div>
             
          </div>

          {/* Minimalist Line decor top right (similar to the image) */}
          <div className="absolute top-0 right-10 lg:right-32 flex space-x-6 opacity-30 pointer-events-none">
             <div className="w-px h-[280px] bg-white relative">
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[11px] h-[11px] border border-white rounded-full translate-y-1/2 bg-[#0a0a0a]"></div>
             </div>
             <div className="w-px h-[200px] bg-white relative mt-16">
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[11px] h-[11px] border border-white rounded-full translate-y-1/2 bg-[#0a0a0a]"></div>
             </div>
          </div>
       </section>
       
       {/* Overlapping Projects Grid */}
       <section className="max-w-7xl mx-auto px-6 relative z-10 -mt-32">
          {/* We have 5 case studies, using grid-cols-1 md:grid-cols-2 lg:grid-cols-3 will naturally wrap them safely */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
             {caseStudies.map((work, i) => (
               <motion.div 
                 key={work.id}
                 className="flex flex-col text-center"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.1 }}
                 transition={{ delay: i * 0.1, duration: 0.5 }}
               >
                 {/* Image Container */}
                 <div className="w-full aspect-video md:aspect-[4/3] rounded-sm overflow-hidden mb-6 bg-slate-900 shadow-xl group">
                    <a href={work.link} target="_blank" rel="noreferrer" className="block w-full h-full relative cursor-pointer">
                      {work.image ? (
                        <img 
                          src={work.image} 
                          alt={work.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">Image unavilable</div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    </a>
                 </div>
                 
                 {/* Replaced 'Project 1 / Client Name' with just the Website Link heading */}
                 <a href={work.link} target="_blank" rel="noreferrer" className="inline-block mx-auto hover:opacity-75 transition-opacity">
                   <h3 className="text-[17px] font-extrabold text-[#3B82F6]">
                     {work.client}
                   </h3>
                 </a>
                 
               </motion.div>
             ))}
          </div>
       </section>
       
    </main>
  )
}

