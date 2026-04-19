import { useState } from 'react'
import { motion } from 'framer-motion'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { business, studentServices } from '../data/siteData'
import {
  createMailtoLeadHref,
  createWhatsAppLeadHref,
  openLeadChannel,
} from '../lib/leadForms'

const initialProjectForm = {
  name: '',
  college: '',
  projectType: '',
  idea: '',
}

export default function StudentsPage() {
  const MotionArticle = motion.article
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [projectSent, setProjectSent] = useState(false)
  const [projectError, setProjectError] = useState('')

  const handleProjectSubmit = (event) => {
    event.preventDefault()
    if (!projectForm.name.trim() || !projectForm.college.trim() || !projectForm.projectType || !projectForm.idea.trim()) {
      setProjectError('Please complete all project fields.')
      return
    }

    const lines = [
      'Hi Mern Pixel Team,',
      '',
      'Student project request:',
      `Name: ${projectForm.name.trim()}`,
      `College: ${projectForm.college.trim()}`,
      `Project Type: ${projectForm.projectType}`,
      `Project Idea: ${projectForm.idea.trim()}`,
    ]

    const waHref = createWhatsAppLeadHref(business.whatsapp, lines.join('\n'))
    const mailHref = createMailtoLeadHref({
      to: business.email,
      subject: `Student Project Request - ${projectForm.projectType}`,
      lines,
    })

    openLeadChannel(waHref)
    setProjectForm(initialProjectForm)
    setProjectError('')
    setProjectSent(true)
    window.setTimeout(() => setProjectSent(false), 4000)
    void mailHref
  }

  return (
    <main className="pt-28">
      <PageIntroHero
        title="STUDENTS"
        subtitle="Major/minor support."
        compact
      />

      <section className="section-shell student-command-shell">
        <div className="student-command-grid">
          <MotionArticle
            className="glass-card student-command-card rounded-3xl p-7 md:col-span-2 md:p-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-kicker">Student Command Center</span>
            <h1 className="section-title">From project idea to confident final demo.</h1>
            <p className="section-copy max-w-none">Plan, build, and submit with mentor support.</p>
          </MotionArticle>
        </div>
      </section>

      <section className="section-shell">
        <span className="section-kicker">Students</span>
        <h2 className="section-title">Major/minor support, mentoring, and sessions</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {studentServices.map((service, index) => (
            <MotionArticle
              key={service}
              className="glass-card student-service-card rounded-3xl p-7"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.62, delay: index * 0.08 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">{`Support 0${index + 1}`}</p>
              <h2 className="font-['Cinzel'] text-3xl">{service}</h2>
            </MotionArticle>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="student-form-grid">
          <motion.article
            className="glass-card student-form-card rounded-3xl p-7 md:col-span-2"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-['Cinzel'] text-3xl">Student Project Request Form</h3>
            {projectSent && <p className="form-success mt-4">Request captured. WhatsApp draft opened.</p>}
            {projectError && <p className="form-error mt-4">{projectError}</p>}
            <form className="form-grid mt-6" onSubmit={handleProjectSubmit} noValidate>
              <input
                className="input-field"
                placeholder="Student name"
                value={projectForm.name}
                onChange={(event) => setProjectForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="College / University"
                value={projectForm.college}
                onChange={(event) => setProjectForm((prev) => ({ ...prev, college: event.target.value }))}
              />
              <select
                className="input-field md:col-span-2"
                value={projectForm.projectType}
                onChange={(event) => setProjectForm((prev) => ({ ...prev, projectType: event.target.value }))}
              >
                <option value="" disabled>
                  Project type
                </option>
                <option>Major Project</option>
                <option>Minor Project</option>
              </select>
              <textarea
                className="input-field md:col-span-2"
                rows="4"
                placeholder="Project idea / domain"
                value={projectForm.idea}
                onChange={(event) => setProjectForm((prev) => ({ ...prev, idea: event.target.value }))}
              />
              <button className="btn-primary md:col-span-2 md:w-fit" type="submit">Submit Project Request</button>
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
