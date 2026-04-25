import { processSteps } from '../data/siteData'

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="section-block page-intro">
        <div className="container about-grid">
          <article>
            <p className="eyebrow">About MERNpixel</p>
            <h1>Small team. Serious execution.</h1>
            <p className="lead-copy">
              MERNpixel is a web-focused digital studio helping service companies present stronger, convert better,
              and run smoother through clean engineering and practical design.
            </p>
          </article>

          <article className="about-note">
            <h3>What clients value</h3>
            <p>Clear communication, production-ready quality, and fast delivery without unnecessary overhead.</p>
          </article>
        </div>
      </section>

      <section className="section-block compact-top">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Delivery Model</p>
            <h2>Built for predictable outcomes.</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <article key={step.title} className="process-card">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
