import HeroBackdrop from '../components/HeroBackdrop'
import { aboutContent } from '../data/siteData'

export default function AboutPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/four.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">About MERNpixel</p>
          <h1>Why MERNpixel exists: to turn digital products into growth engines.</h1>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-grid-2">
          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">Company Story</p>
            <p>{aboutContent.story}</p>
          </article>

          <article className="mp-card mp-hover-card">
            <p className="mp-kicker">Mission</p>
            <p>{aboutContent.mission}</p>
            <p className="mp-kicker mp-kicker-spaced">Vision</p>
            <p>{aboutContent.vision}</p>
          </article>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell mp-card mp-hover-card">
          <p className="mp-kicker">What Makes Us Different</p>
          <ul className="mp-list">
            {aboutContent.differentiator.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
