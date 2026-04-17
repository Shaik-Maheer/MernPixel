import { motion } from 'framer-motion'
import { cloudinaryVideos } from '../data/cloudinaryVideos'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { studentServices } from '../data/siteData'

export default function StudentsPage() {
  const MotionArticle = motion.article

  return (
    <main className="pt-28">
      <PageIntroHero
        title="STUDENTS"
        subtitle="Major/minor support, mentoring sessions, and practical execution guidance."
        videoSrc={cloudinaryVideos.emberOcean}
        compact
      />

      <section className="section-shell">
        <span className="section-kicker">Students</span>
        <h1 className="section-title">Major/minor support, mentoring, and sessions</h1>
        <p className="section-copy">Guided delivery for college projects with practical architecture, coding support, and final review prep.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {studentServices.map((service, index) => (
            <MotionArticle
              key={service}
              className="glass-card rounded-3xl p-7"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.62, delay: index * 0.08 }}
            >
              <h2 className="font-['Cinzel'] text-3xl">{service}</h2>
            </MotionArticle>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-6 xl:grid-cols-2">
          <motion.article
            className="glass-card rounded-3xl p-7"
            initial={{ opacity: 0, x: -80, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-['Cinzel'] text-3xl">Student Project Request Form</h3>
            <form className="form-grid mt-6">
              <input className="input-field" placeholder="Student name" />
              <input className="input-field" placeholder="College / University" />
              <select className="input-field md:col-span-2" defaultValue="">
                <option value="" disabled>
                  Project type
                </option>
                <option>Major Project</option>
                <option>Minor Project</option>
              </select>
              <textarea className="input-field md:col-span-2" rows="4" placeholder="Project idea / domain" />
              <button className="btn-primary md:col-span-2 md:w-fit" type="submit">Submit Project Request</button>
            </form>
          </motion.article>

          <motion.article
            className="glass-card rounded-3xl p-7"
            initial={{ opacity: 0, x: 80, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-['Cinzel'] text-3xl">Student Session Booking</h3>
            <form className="form-grid mt-6">
              <input className="input-field" placeholder="Student name" />
              <input className="input-field" placeholder="Email" type="email" />
              <input className="input-field" type="date" />
              <input className="input-field" type="time" />
              <textarea className="input-field md:col-span-2" rows="4" placeholder="What you need help with" />
              <button className="btn-primary md:col-span-2 md:w-fit" type="submit">Book Mentoring Session</button>
            </form>
          </motion.article>
        </div>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Meet The Core Crew"
        description="Explore the team behind project mentorship and product execution."
        to="/team"
        buttonLabel="View Team"
      />
    </main>
  )
}
