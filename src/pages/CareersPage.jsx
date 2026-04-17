import { cloudinaryVideos } from '../data/cloudinaryVideos'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'

export default function CareersPage() {
  return (
    <main className="pt-28">
      <PageIntroHero
        title="CAREERS"
        subtitle="Join a team that combines premium design thinking with engineering rigor."
        videoSrc={cloudinaryVideos.gridRubikCrop}
        compact
      />

      <section className="section-shell">
        <span className="section-kicker">Careers</span>
        <h1 className="section-title">No Openings Right Now</h1>
        <p className="section-copy">We are not hiring currently. New roles will be posted once hiring starts.</p>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Know Our Story"
        description="Explore how MernPixel works from idea to launch and what drives our process."
        to="/about"
        buttonLabel="Open About"
      />
    </main>
  )
}
