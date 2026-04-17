import { motion } from 'framer-motion'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { nonItServices } from '../data/siteData'

export default function NonITConsultingPage() {
  const MotionArticle = motion.article

  return (
    <main className="pt-28">
      <PageIntroHero
        title="NON IT CONSULTING"
        subtitle="Sales, marketing, and business-role hiring support with quick turnaround."
        videoSrc={cloudinaryVideos.gridRubikWarm}
        compact
      />

      <section className="section-shell">
        <span className="section-kicker">Non-IT Consulting</span>
        <h1 className="section-title">Sales, marketing, and business-role hiring support</h1>
        <p className="section-copy">We support non-IT talent consulting for companies needing practical hiring velocity with quality filters.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {nonItServices.map((service, index) => (
            <MotionArticle
              key={service}
              className="glass-card rounded-3xl p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Capability</p>
              <h2 className="mt-3 font-['Cinzel'] text-3xl">{service}</h2>
            </MotionArticle>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <motion.article
          className="glass-card rounded-3xl p-7"
          initial={{ opacity: 0, x: -86, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.63, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-['Cinzel'] text-3xl">Non-IT Hiring Requirement Form</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/60">Backend reply target: within 24 hours</p>
          <form className="form-grid mt-6">
            <input className="input-field" placeholder="Company name" />
            <input className="input-field" placeholder="Hiring contact email" type="email" />
            <input className="input-field" placeholder="Role title" />
            <input className="input-field" placeholder="Positions needed" />
            <input className="input-field md:col-span-2" placeholder="Location + experience range" />
            <textarea className="input-field md:col-span-2" rows="4" placeholder="Hiring notes" />
            <button className="btn-primary md:col-span-2 md:w-fit" type="submit">Submit Hiring Requirement</button>
          </form>
        </motion.article>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="See Our Client Results"
        description="Explore testimonials and outcomes from teams we've supported."
        to="/clients"
        buttonLabel="View Clients"
      />
    </main>
  )
}
