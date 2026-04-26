import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { teamMembers } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Helper to get initials from name
const getInitials = (name) => {
  const parts = name.replace('B. ', 'B ').replace('P. ', 'P ').split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-32 relative overflow-hidden">
      
      {/* Background Dots Grid & Soft Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFF8E7]/60 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 z-0 pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-[-1] pointer-events-none opacity-70" style={{ backgroundImage: 'linear-gradient(to right, #E0F2FE 1.5px, transparent 1.5px), linear-gradient(to bottom, #E0F2FE 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-start">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }}>

            <h1 className="text-[3.5rem] md:text-[5.5rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.05] max-w-4xl text-left">
              Four founders. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">One standard.</span>
            </h1>
            
            <p className="text-xl md:text-[22px] text-slate-600 mb-10 max-w-3xl leading-[1.6] text-left font-medium">
              A tight team of operators — architecture, design, frontend and growth — owning every project end to end.
            </p>
            
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <motion.article
                onClick={() => setSelectedMember(member)}
                key={member.name}
                className="group relative bg-white/60 border border-slate-200/80 rounded-[2rem] p-8 md:p-10 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg flex items-center gap-8 isolate cursor-pointer hover:-translate-y-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={reveal}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                
                {/* Profile Placeholder with softly glowing shadow */}
                <div className="relative shrink-0 hidden sm:block">
                  {/* Glow layer */}
                  <div className="absolute inset-0 bg-blue-300 rounded-[1.5rem] scale-110 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                  {/* Clean white block */}
                  <div className="relative w-24 h-24 rounded-[1.5rem] bg-white shadow-sm border border-slate-100 flex items-center justify-center text-3xl font-bold text-slate-200 tracking-wider">
                    {getInitials(member.name)}
                  </div>
                </div>

                <div className="flex flex-col h-full justify-center">
                  <h3 className="text-[22px] font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-blue-500 mb-4 transition-colors">
                    {member.role}
                  </p>
                  <p className="text-[15px] font-medium text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl max-w-lg w-full relative overflow-hidden"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className="flex flex-col items-center text-center">
                
                {selectedMember.image ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg border-4 border-white ring-1 ring-slate-100">
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-[2rem] bg-slate-100 text-slate-300 font-bold text-4xl flex items-center justify-center mb-6 shadow-sm border border-slate-200">
                    {getInitials(selectedMember.name)}
                  </div>
                )}
                
                <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{selectedMember.name}</h3>
                <p className="text-[15px] font-bold text-blue-600 mb-6 uppercase tracking-widest">{selectedMember.role}</p>

                <p className="text-slate-600 leading-relaxed mb-8">
                  {selectedMember.bio}
                </p>

                <a 
                  href={selectedMember.linkedin || "https://linkedin.com"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#0077B5] hover:bg-[#005E93] text-white font-bold rounded-xl px-8 py-3.5 flex items-center gap-3 transition-colors shadow-lg hover:shadow-xl w-full justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  Connect with me
                </a>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
