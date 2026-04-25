import HeroBackdrop from '../components/HeroBackdrop'
import { aboutContent, lectureEvents, originTimeline } from '../data/siteData'

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

      <section className="mp-section">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">From Hackathon to MERNpixel</p>
            <h2>Our foundation was built in competition, pressure, and execution.</h2>
          </div>
          <div className="mp-timeline">
            {originTimeline.map((item) => (
              <article key={item.title} className="mp-card mp-hover-card mp-timeline-item">
                <p className="mp-chip">{item.stage}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-section mp-section-tint">
        <div className="mp-shell">
          <div className="mp-heading-row">
            <p className="mp-kicker">Guest Lectures</p>
            <h2>Sharing knowledge with future builders.</h2>
          </div>
          <div className="mp-card-grid mp-grid-2">
            {lectureEvents.map((event) => (
              <article key={`${event.date}-${event.venue}`} className="mp-card mp-hover-card mp-event-card">
                <div className="mp-event-meta">
                  <span>{event.date}</span>
                  <span>{event.venue}</span>
                  <span>{event.audience}</span>
                </div>
                <h3>{event.topic}</h3>
                <p className="mp-outcome">{event.highlight}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
