import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { business, coreCrew, socialLinks } from '../data/siteData'

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
  const MotionSpan = Motion.span
  const [activeMember, setActiveMember] = useState(null)
  const linkedIn = useMemo(() => socialLinks.find((item) => item.label === 'LinkedIn')?.href, [])
  const instagram = useMemo(() => socialLinks.find((item) => item.label === 'Instagram')?.href, [])

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
            <MotionSpan
              className="team-cinema-black-mask"
              aria-hidden
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <MotionSpan
              className="team-cinema-core"
              aria-hidden
              initial={{ opacity: 1, scale: 1 }}
              whileInView={{ opacity: 0, scale: 2.5 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 1, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="team-cinema-overlay" />
            <MotionDiv
              className="team-cinema-strip"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.62, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {coreCrew.map((member) => (
                <button
                  key={`cinema-${member.name}`}
                  type="button"
                  className="team-cinema-member cursor-target"
                  onClick={() => setActiveMember(member)}
                >
                  <img src={member.photo} alt={member.name} className="team-cinema-avatar" />
                  <span>
                    <span className="team-cinema-name">{member.name}</span>
                    <span className="team-cinema-role">{member.role}</span>
                  </span>
                </button>
              ))}
            </MotionDiv>
          </MotionDiv>
        </div>

        <div className="team-social-row">
          {linkedIn && (
            <a href={linkedIn} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.94 8.5v9H4.06v-9h2.88Zm.26-2.78a1.66 1.66 0 1 1-3.32 0a1.66 1.66 0 0 1 3.32 0Zm5.35 6.93v4.85h-2.87v-9h2.75v1.28h.04c.38-.72 1.31-1.48 2.7-1.48c2.89 0 3.43 1.9 3.43 4.36v4.84h-2.88v-4.29c0-1.02-.02-2.34-1.43-2.34c-1.43 0-1.65 1.12-1.65 2.27Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}

          <a href={business.whatsapp} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12.03 3.5a8.45 8.45 0 0 0-7.3 12.7L3.5 20.5l4.43-1.16a8.47 8.47 0 1 0 4.1-15.84Zm0 15.37a6.9 6.9 0 0 1-3.53-.97l-.25-.15l-2.63.69l.7-2.56l-.16-.26a6.88 6.88 0 1 1 5.87 3.25Zm3.77-5.17c-.2-.1-1.18-.58-1.36-.65c-.18-.07-.31-.1-.44.1c-.13.2-.5.64-.61.77c-.11.13-.23.15-.43.05c-.2-.1-.83-.31-1.58-.99c-.58-.52-.97-1.15-1.08-1.35c-.11-.2-.01-.3.08-.4c.08-.08.2-.22.3-.33c.1-.11.13-.2.2-.33c.07-.13.03-.25-.02-.35c-.05-.1-.44-1.06-.6-1.45c-.16-.38-.32-.33-.44-.34h-.37c-.13 0-.35.05-.53.25c-.18.2-.69.68-.69 1.66c0 .98.71 1.92.81 2.05c.1.13 1.4 2.13 3.38 2.99c.47.2.84.32 1.13.41c.47.15.9.13 1.24.08c.38-.06 1.18-.48 1.35-.94c.17-.46.17-.85.12-.94c-.05-.1-.18-.15-.38-.25Z"
                fill="currentColor"
              />
            </svg>
          </a>

          {instagram && (
            <a href={instagram} target="_blank" rel="noreferrer" className="menu-icon-link cursor-target" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 7.1a4.9 4.9 0 1 0 0 9.8a4.9 4.9 0 0 0 0-9.8Zm0 8.1A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Zm6.24-8.3a1.14 1.14 0 1 1-2.28 0a1.14 1.14 0 0 1 2.28 0Zm3.23 1.16c-.07-1.44-.4-2.72-1.45-3.76C18.98 3.27 17.7 2.94 16.26 2.87c-1.49-.08-5.96-.08-7.45 0c-1.44.07-2.72.4-3.76 1.45C3.99 5.36 3.66 6.64 3.59 8.08c-.08 1.49-.08 5.96 0 7.45c.07 1.44.4 2.72 1.45 3.76c1.04 1.04 2.32 1.38 3.76 1.45c1.49.08 5.96.08 7.45 0c1.44-.07 2.72-.4 3.76-1.45c1.04-1.04 1.38-2.32 1.45-3.76c.08-1.49.08-5.95 0-7.45Zm-2.02 9.05c-.31.78-.92 1.39-1.7 1.7c-1.17.46-3.96.35-5.95.35s-4.79.1-5.95-.35a2.85 2.85 0 0 1-1.7-1.7c-.46-1.16-.35-3.96-.35-5.95c0-2-.1-4.79.35-5.95c.31-.78.92-1.39 1.7-1.7c1.16-.46 3.95-.35 5.95-.35c1.99 0 4.78-.1 5.95.35c.78.31 1.39.92 1.7 1.7c.46 1.16.35 3.95.35 5.95c0 1.99.1 4.79-.35 5.95Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
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
