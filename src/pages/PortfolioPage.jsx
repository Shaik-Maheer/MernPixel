import { motion } from 'framer-motion'
import { caseStudies } from '../data/siteData'

export default function PortfolioPage() {
  const featureWork = caseStudies[0]
  const otherWorks = caseStudies.slice(1)

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans pb-32">
       
       <section className="bg-[#050505] pt-32 pb-40 px-6 md:px-12 relative overflow-hidden">
          
          {/* Subtle bg glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mt-12 relative z-10">
             <div className="text-left w-full max-w-2xl mb-8 md:mb-0">
               <h1 className="text-5xl md:text-[5.5rem] font-black text-white leading-[1]">
                 Our Projects
               </h1>
             </div>
             
             <div className="w-full md:max-w-md lg:max-w-lg mb-2">
               <p className="text-[16px] md:text-[18px] text-slate-400 leading-relaxed font-medium">
                 We engineer premium digital products driven by scalable architecture, seamless user experience, and real business outcomes.
               </p>
             </div>
          </div>
       </section>

       {/* FEATURED MVP PROJECT */}
       {featureWork && (
         <section className="max-w-[1400px] mx-auto px-6 relative z-20 -mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full group"
            >
              <a href={featureWork.link} target="_blank" rel="noreferrer" className="block relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.15)] bg-slate-900 border-[6px] border-white ring-1 ring-slate-200">
                 <div className="w-full aspect-video lg:aspect-[21/9]">
                   {featureWork.image ? (
                     <img 
                       src={featureWork.image} 
                       alt={featureWork.client} 
                       className="w-full h-full object-cover object-top transition-transform duration-[1.5s] group-hover:scale-105" 
                     />
                   ) : (
                     <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">Image unavailable</div>
                   )}
                 </div>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                 
                 <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                    <div>
                      <span className="inline-block px-4 py-1.5 bg-blue-600 font-bold text-white text-[11px] uppercase tracking-widest rounded-full mb-4">Featured Execution</span>
                      <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1]">
                        {featureWork.client}
                      </h3>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg pointer-events-auto hover:scale-110 transition-transform -rotate-45">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                 </div>
              </a>
            </motion.div>
         </section>
       )}
       
       {/* GRID OF OTHER PROJECTS */}
       <section className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
          <div className="flex items-center gap-4 mb-16">
             <div className="h-px bg-slate-300 flex-1"></div>
             <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase px-4">More Deployments</h2>
             <div className="h-px bg-slate-300 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 gap-y-20">
             {otherWorks.map((work, i) => (
               <motion.div 
                 key={work.id}
                 className="flex flex-col group cursor-pointer"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.1 }}
                 transition={{ duration: 0.6 }}
               >
                 <a href={work.link} target="_blank" rel="noreferrer" className="block w-full">
                   <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-slate-100 shadow-lg border border-slate-200">
                     {work.image ? (
                       <img 
                         src={work.image} 
                         alt={work.client} 
                         className="w-full h-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-105" 
                       />
                     ) : (
                       <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Image unavailable</div>
                     )}
                   </div>
                   
                   <div className="flex justify-between items-center group-hover:px-2 transition-all duration-300">
                     <h3 className="text-[26px] font-black text-slate-900 tracking-tight">
                       {work.client}
                     </h3>
                     <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors -rotate-45">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                     </span>
                   </div>
                 </a>
               </motion.div>
             ))}
          </div>
       </section>
       
    </main>
  )
}

