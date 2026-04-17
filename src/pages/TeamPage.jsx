import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useState } from 'react'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { coreCrew } from '../data/siteData'

function TeamModal({ member, onClose }) {
  const MotionDiv = Motion.div
  const MotionArticle = Motion.article

  if (!member) {
    return null
  }

  return (
    <AnimatePresence>
      <MotionDiv
        className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <MotionArticle
          className="glass-card relative w-full max-w-2xl rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="cursor-target absolute right-4 top-4 h-10 w-10 rounded-full border border-white/30 bg-white/5 text-xl text-white transition hover:bg-white hover:text-black"
            aria-label="Close details"
          >
            ×
          </button>

          <div className="grid gap-6 md:grid-cols-[180px_1fr]">
            <img src={member.photo} alt={member.name} className="team-modal-photo" />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/56">Core Team</p>
              <h3 className="mt-3 font-['Cinzel'] text-4xl text-white">{member.name}</h3>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[#ffc24a]">{member.role}</p>
              <p className="mt-5 text-sm leading-relaxed text-white/75">{member.bio}</p>

              <a href={member.linkedin} target="_blank" rel="noreferrer" className="btn-primary mt-6 inline-flex cursor-target">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </MotionArticle>
      </MotionDiv>
    </AnimatePresence>
  )
}

export default function TeamPage() {
  const MotionDiv = Motion.div
  const MotionArticle = Motion.article
  const MotionVideo = Motion.video
  const [activeMember, setActiveMember] = useState(null)

  return (
    <main className="pt-24">
      <PageIntroHero
        title="OUR TEAM"
        subtitle="Four specialists. One execution engine for design, development, and growth."
        videoSrc={cloudinaryVideos.gridRubikSoft}
        compact
      />

      <section className="section-shell relative pb-10 pt-6">
        <div className="team-cinema-wrap">
          <MotionDiv
            className="team-cinema-video"
            initial={{ opacity: 0, y: 36, scale: 0.86, borderRadius: '999px' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, borderRadius: '26px' }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
          >
            <MotionVideo
              className="team-cinema-main-video"
              src="/five.mp4"
              autoPlay
              muted
              loop
              playsInline
              initial={{ clipPath: 'circle(6% at 50% 50%)', scale: 0.4, opacity: 0.32 }}
              whileInView={{ clipPath: 'circle(140% at 50% 50%)', scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 1.2, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="team-cinema-overlay" />
            <MotionDiv
              className="team-cinema-copy"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="team-cinema-copy-title">Builders. Designers. Problem Solvers.</p>
              <p className="team-cinema-copy-subtitle">The minds behind Mern Pixel.</p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      <section className="section-shell pt-0">
        <span className="section-kicker">Core Crew</span>
        <h1 className="section-title">Meet The 4 People Behind Mern Pixel</h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {coreCrew.map((member, index) => (
            <MotionArticle
              key={member.name}
              className="glass-card team-profile-card cursor-target rounded-3xl p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -7, scale: 1.01 }}
              onClick={() => setActiveMember(member)}
            >
              <div className="team-profile-head">
                <img src={member.photo} alt={member.name} className="team-profile-photo" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Core Team</p>
                  <h2 className="mt-2 font-['Cinzel'] text-3xl text-white">{member.name}</h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[#ffc24a]">{member.role}</p>
                </div>
              </div>
              <p className="mt-5 text-white/72">{member.bio}</p>
              <button type="button" className="btn-primary mt-6 inline-flex">
                View Details
              </button>
            </MotionArticle>
          ))}
        </div>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Read What Clients Say"
        description="Explore reviews and trust stories from brands we have supported."
        to="/clients"
        buttonLabel="Open Reviews"
      />

      <TeamModal member={activeMember} onClose={() => setActiveMember(null)} />
    </main>
  )
}
