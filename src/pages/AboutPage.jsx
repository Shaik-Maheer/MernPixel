import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DetailModal from '../components/DetailModal'
import { aboutContent, lectureDetail, storyDetail, teamMembers } from '../data/siteData'

export default function AboutPage() {
  const [activeModal, setActiveModal] = useState('')
  const [activeMemberImage, setActiveMemberImage] = useState(null)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveMemberImage(null)
      }
    }

    if (activeMemberImage) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeMemberImage])

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-32 text-slate-200">
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#005C6B]">
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <p className="text-sm font-extrabold text-[#AEE9E0] uppercase tracking-[0.2em] mb-4">About MERNpixel</p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">Premium execution with startup speed.</h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">Built by developers focused on outcomes, not noise.</p>
        </div>
      </section>

      {/* STORY & SESSIONS */}
      <section className="max-w-6xl mx-auto px-6 mt-16 md:mt-24 relative z-20 text-center border-b border-slate-800/60 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <article className="bg-[#141414] border border-slate-800 rounded-3xl p-10 hover:-translate-y-2 transition-transform duration-500 shadow-2xl flex flex-col justify-between">
            <div>
               <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">Started with a Hackathon</p>
               <h3 className="text-3xl font-extrabold text-red-100 mb-4">4 students built, competed, and won.</h3>
               <p className="text-lg text-red-200/70 leading-relaxed mb-8">That pivotal turning point became the foundation of MERNpixel.</p>
            </div>
            <button type="button" className="text-[13px] font-black text-red-100 uppercase tracking-widest border-b-2 border-red-500/40 hover:border-red-400 pb-1 w-fit mx-auto transition-colors" onClick={() => setActiveModal('story')}>
              Explore Origin Story
            </button>
          </article>

          <article className="bg-[#141414] border border-slate-800 rounded-3xl p-10 hover:-translate-y-2 transition-transform duration-500 shadow-2xl flex flex-col justify-between">
            <div>
               <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Guest Sessions</p>
               <h3 className="text-3xl font-extrabold text-white mb-4">Sharing knowledge with future builders.</h3>
               <p className="text-lg text-slate-400 leading-relaxed mb-8">AI tools, resume building, and raw live coding sessions for students.</p>
            </div>
            <Link to="/services/guest-lectures" className="text-[13px] font-black text-white uppercase tracking-widest border-b-2 border-slate-700 hover:border-emerald-500 pb-1 w-fit mx-auto transition-colors">
              View Details
            </Link>
          </article>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 text-center md:text-left">
          <article className="group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-[#101319] px-8 py-10 md:px-10 md:py-12 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/60 hover:shadow-[0_24px_55px_rgba(59,130,246,0.22)]">
            <div className="pointer-events-none absolute -top-24 -right-20 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl opacity-70 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-center gap-4 justify-center md:justify-start mb-7">
                <span className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center font-black text-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-blue-500/20">M</span>
                <p className="text-sm font-extrabold text-blue-500 uppercase tracking-widest transition-colors duration-500 group-hover:text-blue-300">Our Mission</p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed transition-colors duration-500 group-hover:text-blue-50">{aboutContent.mission}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-blue-300/80 uppercase tracking-widest">
                Core purpose <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </article>
          <article className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#12101a] px-8 py-10 md:px-10 md:py-12 transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/60 hover:shadow-[0_24px_55px_rgba(168,85,247,0.2)]">
            <div className="pointer-events-none absolute -top-24 -right-20 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl opacity-70 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-center gap-4 justify-center md:justify-start mb-7">
                <span className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center font-black text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-purple-500/20">V</span>
                <p className="text-sm font-extrabold text-purple-500 uppercase tracking-widest transition-colors duration-500 group-hover:text-purple-300">Our Vision</p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed transition-colors duration-500 group-hover:text-purple-50">{aboutContent.vision}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-purple-300/80 uppercase tracking-widest">
                Future direction <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* NEW CORE TEAM SECTION */}
      <section className="bg-[#111] pt-32 pb-32 border-t border-slate-800/60 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
             <span className="text-[13px] font-extrabold text-[#D349A1] uppercase tracking-[0.2em] block mb-4">Our Core Team</span>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Builders behind the pixels.</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 items-stretch">
            {teamMembers.map(member => (
              <article key={member.name} className="h-full flex flex-col items-center text-center group rounded-[2rem] border border-slate-800/80 bg-[#0f1117] px-6 py-8 shadow-[0_24px_45px_rgba(0,0,0,0.3)]">
                 <button
                   type="button"
                   onClick={() => setActiveMemberImage({ src: member.photo, name: member.name })}
                   className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] mb-6 overflow-hidden shadow-2xl border border-slate-800 relative group-hover:-translate-y-3 transition-transform duration-500 focus:outline-none focus:ring-2 focus:ring-white/40"
                   aria-label={`View ${member.name} photo`}
                 >
                   <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-500" />
                   <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                 </button>
                 <h4 className="text-2xl font-black text-white mb-2 min-h-[4.75rem] flex items-center justify-center leading-tight">{member.name}</h4>
                 <p className="text-[13px] font-extrabold text-[#00B7B5] tracking-widest uppercase mb-4 min-h-[2.5rem] flex items-center justify-center">{member.role}</p>
                 <p className="text-[15px] text-slate-400 leading-relaxed max-w-[240px] mx-auto font-medium min-h-[7.5rem]">{member.bio}</p>
                 <a href={member.linkedin} target="_blank" rel="noreferrer" className="mt-auto pt-6 inline-flex items-center justify-center bg-slate-800/50 hover:bg-white text-slate-300 hover:text-[#0A66C2] w-12 h-12 rounded-full transition-all hover:scale-110" title="LinkedIn">
                    <img src="/pics/linkedin_icon.svg" alt="LinkedIn" className="w-6 h-6" />
                 </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeMemberImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveMemberImage(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 md:top-7 md:right-7 w-11 h-11 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors text-2xl leading-none"
            onClick={() => setActiveMemberImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>
          <div className="max-w-[95vw] max-h-[92vh]" onClick={(event) => event.stopPropagation()}>
            <img
              src={activeMemberImage.src}
              alt={activeMemberImage.name}
              className="max-w-[95vw] max-h-[84vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <p className="mt-4 text-center text-white font-bold tracking-wide">{activeMemberImage.name}</p>
          </div>
        </div>
      )}

      <DetailModal
        open={activeModal === 'story'}
        onClose={() => setActiveModal('')}
        subtitle="Origin Story"
        title={storyDetail.title}
        sections={[{ label: 'Journey', items: storyDetail.points }]}
      />

      <DetailModal
        open={activeModal === 'lecture'}
        onClose={() => setActiveModal('')}
        subtitle="Guest Sessions"
        title={lectureDetail.title}
        sections={[
          { label: 'Topics', items: lectureDetail.topics },
          { label: 'Events', items: lectureDetail.events },
          { label: 'Format', text: lectureDetail.note },
        ]}
      />
    </main>
  )
}
