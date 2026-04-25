import { useState } from 'react'
import DetailModal from '../components/DetailModal'
import HeroBackdrop from '../components/HeroBackdrop'
import { aboutContent, lectureDetail, storyDetail, teamMembers } from '../data/siteData'

export default function AboutPage() {
  const [activeModal, setActiveModal] = useState('')

  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/four.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">About MERNpixel</p>
          <h1>Premium digital execution with startup speed.</h1>
          <p className="mp-lead">Built by developers focused on outcomes, not noise.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-grid-2">
          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">Started with a Hackathon</p>
            <h3>4 students built, competed, and won.</h3>
            <p>That turning point became MERNpixel.</p>
            <button type="button" className="mp-text-link" onClick={() => setActiveModal('story')}>
              View Story
            </button>
          </article>

          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">Guest Sessions</p>
            <h3>Sharing knowledge with future builders.</h3>
            <p>AI tools, resume building, and live coding sessions.</p>
            <button type="button" className="mp-text-link" onClick={() => setActiveModal('lecture')}>
              View More
            </button>
          </article>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell mp-grid-2">
          <article className="mp-card mp-hover-card bg-white border border-slate-100 shadow-sm flex flex-col justify-center">
            <p className="mp-kicker">Mission</p>
            <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">{aboutContent.mission}</p>
          </article>
          <article className="mp-card mp-hover-card bg-white border border-slate-100 shadow-sm flex flex-col justify-center">
            <p className="mp-kicker">Vision</p>
            <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">{aboutContent.vision}</p>
          </article>
        </div>
      </section>

      {/* NEW CORE TEAM SECTION */}
      <section className="mp-section pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
             <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-3">Our Core Team</span>
             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Builders behind the pixels.</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {teamMembers.map(member => (
              <div key={member.name} className="flex flex-col items-center text-center group">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-6 overflow-hidden shadow-xl border-4 border-slate-50 relative group-hover:-translate-y-2 transition-transform duration-300">
                   <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-[#D349A1]/0 group-hover:bg-[#D349A1]/10 transition-colors duration-300"></div>
                 </div>
                 <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
                 <p className="text-sm font-extrabold text-[#D349A1] tracking-wide mb-3">{member.role}</p>
                 <p className="text-sm text-slate-500 leading-relaxed max-w-[220px] mx-auto">{member.bio}</p>
                 <a href={member.linkedin} target="_blank" rel="noreferrer" className="mt-5 text-slate-300 hover:text-[#0A66C2] transition-colors" title="LinkedIn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                 </a>
              </div>
            ))}
          </div>
        </div>
      </section>

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
