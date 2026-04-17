import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CloudinaryVideo from '../components/CloudinaryVideo'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { portfolioProjects } from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

const storySlides = portfolioProjects.map((project, index) => ({
  ...project,
  step: `Slide 0${index + 1}`,
  video:
    index % 3 === 0
      ? cloudinaryVideos.portfolioSlideA
      : index % 3 === 1
        ? cloudinaryVideos.portfolioSlideB
        : cloudinaryVideos.portfolioSlideC,
}))

export default function PortfolioPage() {
  const MotionArticle = motion.article
  const shellRef = useRef(null)
  const trackRef = useRef(null)
  const slidesRef = useRef([])

  useEffect(() => {
    const context = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean)
      if (!shellRef.current || !trackRef.current || slides.length === 0) {
        return
      }

      const horizontalTween = gsap.to(trackRef.current, {
        xPercent: -100 * (slides.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: shellRef.current,
          start: 'top top',
          end: `+=${slides.length * 1000}`,
          scrub: 1.05,
          pin: true,
          anticipatePin: 1,
        },
      })

      slides.forEach((slide, index) => {
        const panel = slide.querySelector('.work-slide-panel')
        const textItems = slide.querySelectorAll('.work-step, .work-name, .work-summary, .work-link')
        const media = slide.querySelector('.work-media')

        gsap.fromTo(
          panel,
          { autoAlpha: 0.35, scale: 0.9, y: 28, x: index % 2 === 0 ? 75 : -75 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 0.74,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: 'left center',
              end: 'center center',
              toggleActions: 'play reverse play reverse',
            },
          },
        )

        gsap.fromTo(
          textItems,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: 'left center+=80',
              toggleActions: 'play reverse play reverse',
            },
          },
        )

        gsap.fromTo(
          media,
          { xPercent: -10, scale: 0.96 },
          {
            xPercent: 12,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: 'left right',
              end: 'right left',
              scrub: 0.9,
            },
          },
        )
      })
    }, shellRef)

    return () => {
      context.revert()
      slidesRef.current = []
    }
  }, [])

  return (
    <main className="creation-page pt-24 md:pt-28">
      <PageIntroHero
        title="OUR CREATIONS"
        subtitle="A selection of projects we've crafted with precision and passion"
        videoSrc={cloudinaryVideos.heroDark}
      />

      <section ref={shellRef} className="work-story-shell">
        <div className="work-story-bg" />
        <div className="work-story-embers" aria-hidden>
          {Array.from({ length: 38 }).map((_, index) => (
            <span
              key={`ember-${index}`}
              className="work-story-ember"
              style={{
                left: `${(index * 3.2) % 100}%`,
                animationDelay: `${(index % 8) * 0.4}s`,
                animationDuration: `${4 + (index % 7) * 0.45}s`,
              }}
            />
          ))}
        </div>

        <div className="work-story-track" ref={trackRef}>
          {storySlides.map((slide, index) => (
            <article
              key={slide.name}
              ref={(element) => {
                slidesRef.current[index] = element
              }}
              className="work-slide"
            >
              <div className="work-slide-panel glass-card rounded-3xl p-7 md:p-10">
                <div className="work-slide-copy">
                  <p className="work-step text-xs uppercase tracking-[0.24em] text-white/60">{slide.step}</p>
                  <h2 className="work-name mt-4 font-['Cinzel'] text-4xl text-white md:text-6xl">{slide.name}</h2>
                  <p className="work-summary mt-5 max-w-xl text-white/76">{slide.summary}</p>
                  <a href={slide.liveLink} target="_blank" rel="noreferrer" className="work-link cursor-target mt-7 inline-flex">
                    Open Live Project ↗
                  </a>
                </div>

                <motion.div className="work-media" whileHover={{ scale: 1.02 }}>
                  <CloudinaryVideo sources={slide.video} />
                  <div className="work-media-overlay" />
                  <p className="work-media-label">{slide.previewLabel || 'Preview'}</p>
                </motion.div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-7 lg:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <MotionArticle
              key={`${project.name}-card`}
              className="creation-card glass-card rounded-3xl p-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -7 }}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">Case Study</p>
              <h3 className="mt-3 font-['Cinzel'] text-3xl text-white">{project.name}</h3>
              <p className="mt-4 text-white/74">{project.summary}</p>
            </MotionArticle>
          ))}
        </div>
      </section>

      <PageEndPromo
        eyebrow="Be Our Next Success Story"
        title="Your Brand Could Be Featured Here"
        description="Bring your idea and we will craft a high-impact digital product that performs in the real market."
        to="/contact"
        buttonLabel="Start Your Project 🚀"
      />
    </main>
  )
}
