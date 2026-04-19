import { motion } from 'framer-motion'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { testimonials } from '../data/siteData'

export default function ClientsPage() {
  const MotionCard = motion.article
  const trustSignals = [
    { label: 'Delivery Satisfaction', value: '94%' },
    { label: 'Repeat Engagement', value: '71%' },
    { label: 'Avg. Launch Timeline', value: '4-6 Weeks' },
  ]

  return (
    <main className="pt-24">
      <PageIntroHero
        title="CLIENTS"
        subtitle="Trusted by growing brands for serious digital outcomes."
        compact
      />

      <section className="section-shell">
        <div className="clients-hero-grid">
          <article className="glass-card clients-summary-card rounded-3xl p-7 md:p-9">
            <span className="section-kicker">Clients</span>
            <h1 className="section-title">Client trust and outcomes</h1>
            <p className="section-copy max-w-none">
              We focus on outcomes clients can feel: better usability, stronger conversion flow, and more
              confidence in digital delivery.
            </p>
            <div className="clients-trust-signals">
              {trustSignals.map((item) => (
                <article key={item.label}>
                  <p>{item.value}</p>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </article>

          <article className="glass-card clients-quote-card rounded-3xl p-7 md:p-9">
            <p className="clients-quote-kicker">Featured Feedback</p>
            <p className="clients-quote-text">"{testimonials[0].quote}"</p>
            <p className="clients-quote-name">{testimonials[0].name}</p>
          </article>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <MotionCard
              key={item.name}
              className="glass-card rounded-3xl p-7"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.64, delay: index * 0.08 }}
            >
              <p className="text-white/80">"{item.quote}"</p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/55">{item.name}</p>
            </MotionCard>
          ))}
        </div>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Discover What We Do"
        description="Explore our services and see how we can build for your business."
        to="/services"
        buttonLabel="Explore Services"
      />
    </main>
  )
}
