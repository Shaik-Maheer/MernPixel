import { motion } from 'framer-motion'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { clientHighlights, testimonials } from '../data/siteData'

export default function ClientsPage() {
  const MotionCard = motion.article

  return (
    <main className="pt-24">
      <PageIntroHero
        title="CLIENTS"
        subtitle="Trusted by growing brands for serious digital outcomes."
        videoSrc={cloudinaryVideos.emberOceanDark}
        compact
      />

      <section className="section-shell">
        <span className="section-kicker">Clients</span>
        <h1 className="section-title">Client trust and outcomes</h1>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {clientHighlights.map((client) => (
            <article key={client} className="glass-card rounded-2xl p-5 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-white/75">{client}</p>
            </article>
          ))}
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
