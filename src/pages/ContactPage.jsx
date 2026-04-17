import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CloudinaryVideo from '../components/CloudinaryVideo'
import { business } from '../data/siteData'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'

gsap.registerPlugin(ScrollTrigger)

const serviceOptions = [
  'Web Development',
  'UI/UX Design',
  'SEO Optimization',
  'Digital Marketing',
  'Branding & Identity',
  'Academic Projects',
  'Portfolio Building',
]

export default function ContactPage() {
  const MotionCard = motion.article
  const MotionLink = motion.a
  const MotionHeading = motion.h2

  const [ripples, setRipples] = useState([])
  const formSectionRef = useRef(null)
  const videoSectionRef = useRef(null)
  const detailsSectionRef = useRef(null)
  const nextSectionRef = useRef(null)
  const videoElementRef = useRef(null)

  const quickMessage =
    'Hi Mern Pixel, I would like to discuss a new project requirement. Please connect with me.'

  useEffect(() => {
    const context = gsap.context(() => {
      if (videoSectionRef.current && videoElementRef.current) {
        gsap.to(videoElementRef.current, {
          yPercent: -10,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })

    return () => context.revert()
  }, [])

  const handleRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    }

    setRipples((previous) => [...previous, ripple])

    window.setTimeout(() => {
      setRipples((previous) => previous.filter((item) => item.id !== ripple.id))
    }, 540)
  }

  return (
    <main className="contact-page pt-24 md:pt-28">
      <PageIntroHero
        title="CONTACT US"
        subtitle="Tell us your requirement and we'll shape a practical plan quickly."
        videoSrc={cloudinaryVideos.contactMain}
        compact
      />

      <section ref={formSectionRef} className="section-shell relative pt-0">
        <div className="contact-floating-media" aria-hidden>
          <motion.div
            className="contact-floating-clip clip-one"
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <CloudinaryVideo sources={cloudinaryVideos.contactClipA} />
          </motion.div>

          <motion.div
            className="contact-floating-clip clip-two"
            initial={{ opacity: 0, x: -60, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <CloudinaryVideo sources={cloudinaryVideos.contactClipB} />
          </motion.div>
        </div>

        <div className="grid gap-7 xl:grid-cols-[0.95fr_1.05fr]">
          <MotionCard
            className="glass-card contact-info-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: -72, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-['Cinzel'] text-3xl text-white md:text-4xl">Start a conversation that moves fast</h2>
            <p className="mt-5 text-white/72">
              Share your requirement and our team will connect with a practical execution plan. We keep communication clear,
              timelines realistic, and delivery quality high.
            </p>

            <div className="mt-8 space-y-4">
              <MotionLink
                href={`mailto:${business.email}`}
                className="contact-channel cursor-target"
                whileHover={{ x: 5, scale: 1.01 }}
              >
                <span className="contact-channel-icon">@</span>
                <span>
                  <span className="contact-channel-label">Email</span>
                  <span className="contact-channel-value">{business.email}</span>
                </span>
              </MotionLink>

              <MotionLink
                href={`${business.whatsapp}?text=${encodeURIComponent(quickMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="contact-channel cursor-target"
                whileHover={{ x: 5, scale: 1.01 }}
              >
                <span className="contact-channel-icon">WA</span>
                <span>
                  <span className="contact-channel-label">WhatsApp</span>
                  <span className="contact-channel-value">+91 95150 22680</span>
                </span>
              </MotionLink>
            </div>
          </MotionCard>

          <MotionCard
            className="glass-card contact-form-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: 92, y: 22 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-['Cinzel'] text-3xl text-white md:text-4xl">Project Contact Form</h2>
            <p className="mt-4 text-sm text-white/70">All your digital needs, one place.</p>

            <form className="contact-line-grid mt-9">
              <input className="contact-line-field" placeholder="What's Your Name" name="name" />
              <input className="contact-line-field" placeholder="Your Email" name="email" type="email" />
              <div className="contact-phone-wrap">
                <span className="contact-phone-code">+91</span>
                <input className="contact-line-field" placeholder="Your Number" name="phone" />
              </div>
              <select className="contact-line-field" name="service" defaultValue="">
                <option value="" disabled>
                  Service you are looking for
                </option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <textarea className="contact-line-field contact-line-textarea" rows="4" placeholder="Tell us about your project" name="message" />

              <button
                className="btn-primary btn-ripple contact-submit-btn"
                type="submit"
                onClick={handleRipple}
              >
                Start Your Project 🚀
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple-dot"
                    style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
                  />
                ))}
              </button>
            </form>
          </MotionCard>
        </div>
      </section>

      <section ref={videoSectionRef} className="contact-video-shell">
        <CloudinaryVideo
          ref={videoElementRef}
          className="contact-video-bg"
          sources={cloudinaryVideos.heroDark}
        />
        <div className="contact-video-overlay" />

        <div className="section-shell relative z-10 flex min-h-[74vh] items-center justify-center text-center md:min-h-[84vh]">
          <MotionHeading
            className="font-['Cinzel'] text-4xl leading-tight text-white md:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s build something impactful together
          </MotionHeading>
        </div>
      </section>

      <section ref={detailsSectionRef} className="section-shell">
        <div className="grid gap-6 md:grid-cols-2">
          <MotionCard
            className="glass-card rounded-3xl p-7"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Email</p>
            <a className="mt-3 block text-xl text-white cursor-target" href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </MotionCard>

          <MotionCard
            className="glass-card rounded-3xl p-7"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            whileHover={{ y: -6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">WhatsApp</p>
            <a
              className="mt-3 inline-flex items-center gap-3 text-xl text-white cursor-target"
              href={`${business.whatsapp}?text=${encodeURIComponent(quickMessage)}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-wa-pill">Chat</span>
              <span>+91 95150 22680</span>
            </a>
          </MotionCard>
        </div>
      </section>

      <section ref={nextSectionRef}>
        <PageEndPromo
          eyebrow="Next Section"
          title="See Our Creations"
          description="Browse the portfolio to see how strategy, design, and development come together."
          to="/works"
          buttonLabel="Open Projects"
        />
      </section>
    </main>
  )
}
