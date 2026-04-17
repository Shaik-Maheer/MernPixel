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
        <h1 className="section-title">No Openings For Now</h1>
        <p className="section-copy">We are not hiring currently. Follow us on LinkedIn and Instagram for future role updates.</p>

        <div className="mt-10">
          <article className="glass-card rounded-3xl p-7 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/56">Careers Status</p>
            <h2 className="mt-4 font-['Cinzel'] text-4xl text-white md:text-5xl">No openings currently</h2>
            <p className="mt-4 max-w-2xl text-white/74">
              Thank you for your interest in Mern Pixel. We will publish new openings once active hiring starts.
            </p>
          </article>
        </div>
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
