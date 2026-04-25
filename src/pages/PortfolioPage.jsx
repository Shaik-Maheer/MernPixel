import { motion } from 'framer-motion'
import { caseStudies } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const recentWorkColors = [
  'bg-[#FFE8D6]', // Soft orange for Cricket
  'bg-[#F3E8FF]', // Soft purple for Stylistar
  'bg-[#E0F2FE]', // Soft blue
  'bg-[#FFEDD5]', // Soft peach
  'bg-[#DCFCE7]', // Soft green
  'bg-[#FEF9C3]', // Soft yellow
]

export default function PortfolioPage() {
  const orderedStudies = [
    caseStudies.find(c => c.client.includes('Indian Cricket')),
    caseStudies.find(c => c.client.includes('Stylistar')),
    caseStudies.find(c => c.client.includes('Malik Tea')),
    caseStudies.find(c => c.client.includes('Talent IQ')),
    ...caseStudies.filter(c => !['Indian Cricket', 'Stylistar', 'Malik Tea', 'Talent IQ'].some(name => c.client.includes(name)))
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-32 overflow-hidden relative">
      
      {/* Background Dots Grid & Soft Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFF8E7]/60 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #E0F2FE 1px, transparent 1px), linear-gradient(to bottom, #E0F2FE 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-start">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }}>
            
            <div className="inline-flex bg-slate-100 rounded-full px-4 py-1.5 mb-8 items-center border border-slate-200">
               <span className="text-xs font-semibold text-slate-700 tracking-wide">Selected work</span>
            </div>

            <h1 className="text-[3.5rem] md:text-[5.5rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.05] max-w-4xl text-left">
              Projects that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">ship and perform.</span>
            </h1>
            
          </motion.div>
        </div>
      </section>

      {/* Dynamic Projects Grid */}
      <section className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orderedStudies.map((work, index) => {
              // Custom pattern: 1st row = 1 col, 2nd row = 2 cols, 3rd row = 1 col...
              // 0->2 cols wide, 1->col-span-1, 2->col-span-1, 3->col-span-2, etc.
              const patternCycle = index % 3;
              const isFullWidth = patternCycle === 0;

              return (
                <motion.a
                  key={work.id}
                  href={work.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative rounded-[2rem] p-8 md:p-14 flex flex-col min-h-[300px] transition-all duration-300 hover:scale-[1.01] hover:shadow-xl overflow-hidden block border border-transparent hover:border-white/50 ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'} ${recentWorkColors[index % recentWorkColors.length]}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={reveal}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Top label area */}
                      <div className="flex justify-between items-start w-full">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-6" style={{letterSpacing: '0.15em'}}>
                          {work.type}
                        </p>
                      </div>

                      {/* Main Title */}
                      <h3 className={`font-bold text-slate-900 ${isFullWidth ? 'text-4xl md:text-5xl max-w-lg' : 'text-3xl md:text-4xl'}`}>
                        {work.client}
                      </h3>
                    </div>

                    {/* Arrow Button */}
                    <div className="mt-12 flex justify-between items-end">
                      <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center transform transition-transform duration-300 group-hover:bg-slate-800 shadow-xl group-hover:scale-110 ml-auto translate-y-2 group-hover:-translate-y-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Faint subtle image overlay to satisfy picture request */}
                  {work.image && (
                    <div className={`absolute bottom-0 right-0 z-0 transition-all duration-500 transform translate-y-full opacity-0 group-hover:translate-y-8 group-hover:opacity-100 ${isFullWidth ? 'w-2/5' : 'w-4/5'}`}>
                      <img src={work.image} alt={work.title} className="w-full h-auto rounded-tl-2xl shadow-2xl skew-y-3 skew-x-3 object-cover" />
                    </div>
                  )}

                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

    </main>
  )
}
