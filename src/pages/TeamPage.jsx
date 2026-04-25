import { motion } from 'framer-motion'
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
  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-32">
      
      {/* Background Dots Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #E0F2FE 1px, transparent 1px), linear-gradient(to bottom, #E0F2FE 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden">
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

    </main>
  )
}
