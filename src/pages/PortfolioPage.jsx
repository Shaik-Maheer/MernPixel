import { motion } from 'framer-motion'
import { useState } from 'react'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { portfolioProjects } from '../data/siteData'

export default function PortfolioPage() {
  const MotionArticle = motion.article
  const previewThemes = ['preview-theme-a', 'preview-theme-b', 'preview-theme-c']
  const [brokenImages, setBrokenImages] = useState({})
  const [loadedImages, setLoadedImages] = useState({})
  const revealVectors = [
    { x: -96, y: 14, rotate: -1.4, scale: 0.96 },
    { x: 96, y: 14, rotate: 1.4, scale: 0.96 },
    { x: 0, y: 96, rotate: 0.2, scale: 0.95 },
    { x: 0, y: -96, rotate: -0.2, scale: 0.95 },
  ]

  return (
    <main className="creation-page pt-24 md:pt-28">
      <PageIntroHero
        title="OUR CREATIONS"
        subtitle="A selection of projects we've crafted with precision and passion"
        videoSrc={cloudinaryVideos.emberOceanDeep}
      />

      <section className="section-shell">
        <span className="section-kicker">Portfolio</span>
        <h1 className="section-title">Recent Projects</h1>
        <p className="section-copy">Image-first showcase. Hover to reveal details and click to open each live project.</p>

        <div className="grid gap-8 md:grid-cols-2">
          {portfolioProjects.map((project, index) => {
            const hasImage = Boolean(project.image) && !brokenImages[project.name]
            const isImageLoaded = Boolean(loadedImages[project.name])
            const primaryHost = (() => {
              try {
                return new URL(project.liveLink).hostname.replace('www.', '')
              } catch {
                return project.liveLink
              }
            })()
            const revealVector = revealVectors[index % revealVectors.length]

            return (
              <MotionArticle
                key={`${project.name}-card`}
                className={`creation-card works-card glass-card rounded-3xl p-4 md:p-5 ${project.fullWidth ? 'md:col-span-2' : ''}`}
                initial={{ opacity: 0, ...revealVector }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.75, delay: (index % 3) * 0.04 }}
                whileHover={{ y: -7 }}
              >
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="works-visual-link cursor-target">
                  <div className={`creation-preview works-preview ${hasImage ? '' : previewThemes[index % previewThemes.length]} ${hasImage && !isImageLoaded ? 'works-preview--loading' : ''}`}>
                    {hasImage && (
                      <>
                        <img
                          className={`creation-preview-image ${isImageLoaded ? 'is-loaded' : 'is-loading'}`}
                          src={project.image}
                          alt={`${project.name} preview`}
                          loading="lazy"
                          onLoad={() => {
                            setLoadedImages((prev) => ({ ...prev, [project.name]: true }))
                          }}
                          onError={() => {
                            setBrokenImages((prev) => ({ ...prev, [project.name]: true }))
                          }}
                        />
                        {!isImageLoaded && <div className={`works-image-loader works-image-loader-${index % 3}`} />}
                        <div className="creation-preview-image-overlay" />
                      </>
                    )}
                    <div className="works-preview-content">
                      <p className="works-preview-label">{project.previewLabel || 'Project'}</p>
                      <h3>{project.name}</h3>
                    </div>
                    <div className="works-preview-overlay">
                      <p>Open Project ↗</p>
                    </div>
                  </div>
                </a>

                <div className="works-meta-row">
                  <p className="works-link-hint">{primaryHost}</p>
                </div>
              </MotionArticle>
            )
          })}
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
