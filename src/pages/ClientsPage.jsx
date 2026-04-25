import CountUpNumber from '../components/CountUpNumber'
import HeroBackdrop from '../components/HeroBackdrop'
import SlidingComments from '../components/SlidingComments'
import { stats, testimonials } from '../data/siteData'

export default function ClientsPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/five.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Clients</p>
          <h1>Results that build long-term client trust.</h1>
          <div className="mp-stat-grid mp-stat-grid-compact">
            {stats.map((item) => (
              <article key={item.label}>
                <strong><CountUpNumber value={item.value} /></strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SlidingComments items={testimonials} />
    </main>
  )
}
