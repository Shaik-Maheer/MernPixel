import { motion } from 'framer-motion'
import { useState } from 'react'
import CountUpNumber from '../components/CountUpNumber'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import { portfolioProjects } from '../data/siteData'

export default function PortfolioPage() {
  const MotionArticle = motion.article
  const previewThemes = ['preview-theme-a', 'preview-theme-b', 'preview-theme-c']
  const [brokenImages, setBrokenImages] = useState({})
  const [loadedImages, setLoadedImages] = useState({})
  const portfolioStats = [
    { value: '15+', label: 'Projects' },
    { value: '5+', label: 'Clients' },
    { value: '2+', label: 'Experience' },
  ]

  return (
    <main className="creation-page pt-24 md:pt-28">
      <PageIntroHero
        title="OUR CREATIONS"
        subtitle="Selected projects."
        videoSrc={cloudinaryVideos.emberOceanDeep}
      />

      <section className="section-shell portfolio-overview-wrap">
        <div className="portfolio-overview-grid portfolio-overview-grid-single">
          <article className="glass-card portfolio-overview-card rounded-3xl p-7 md:p-9">
            <span className="section-kicker">Portfolio</span>
            <h1 className="section-title">Work that looks sharp and performs in market.</h1>
            <div className="portfolio-overview-metrics">
              {portfolioStats.map((item) => (
                <article key={item.label}>
                  <p>
                    <CountUpNumber value={item.value} />
                  </p>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <span className="section-kicker">Project Showcase</span>
        <h2 className="section-title">Recent Projects</h2>

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

            return (
              <MotionArticle
                key={`${project.name}-card`}
                className={`creation-card works-card glass-card rounded-3xl p-4 md:p-5 ${project.fullWidth ? 'md:col-span-2' : ''}`}
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
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="works-alt-link cursor-target">
                    Visit Live
                  </a>
                </div>
              </MotionArticle>
            )
          })}
        </div>
      </section>

      <PageEndPromo
        eyebrow="Be Our Next Success Story"
        title="Your Brand Could Be Featured Here"
        description="Bring your idea. We will build it."
        to="/contact"
        buttonLabel="Start Your Project"
      />
    </main>
  )
}
