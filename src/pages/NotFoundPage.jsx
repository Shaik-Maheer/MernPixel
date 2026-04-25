import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center relative overflow-hidden">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFF8E7]/60 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-rose-50/50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 z-0 pointer-events-none"></div>
      
      <div className="absolute inset-0 z-[-1] pointer-events-none opacity-70" style={{ backgroundImage: 'linear-gradient(to right, #E0F2FE 1.5px, transparent 1.5px), linear-gradient(to bottom, #E0F2FE 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />

      <motion.div 
        className="relative z-10 text-center px-6 max-w-2xl"
        initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }}
      >
        <div className="inline-flex bg-rose-50 rounded-full px-4 py-1.5 mb-8 items-center border border-rose-100">
           <span className="text-xs font-bold text-rose-600 tracking-widest uppercase">Error 404</span>
        </div>

        <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.05]">
          Let's get you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">back on track.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
          Looks like this route isn't performing. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link to="/" className="inline-flex bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#D349A1] transition-all shadow-md items-center gap-2">
          Return to Hub <span className="text-slate-400">→</span>
        </Link>
      </motion.div>
    </main>
  )
}
