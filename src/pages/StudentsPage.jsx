import { useState } from 'react'
import { motion } from 'framer-motion'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { business, studentServices } from '../data/siteData'
import {
  createMailtoLeadHref,
  createWhatsAppLeadHref,
  isValidEmail,
  openLeadChannel,
} from '../lib/leadForms'

const initialProjectForm = {
  name: '',
  college: '',
  projectType: '',
  idea: '',
}

const initialSessionForm = {
  name: '',
  email: '',
  date: '',
  time: '',
  help: '',
}

const studentSignals = [
  { label: 'Project Tracks', value: 'Major + Minor' },
  { label: 'Mentor Support', value: 'Planning to Demo' },
  { label: 'Response Speed', value: '< 24h' },
]

const mentoringPath = [
  { title: 'Problem Selection', detail: 'Choose project scope aligned to submission goals.' },
  { title: 'Architecture Planning', detail: 'Define implementation structure and milestones.' },
  { title: 'Execution Support', detail: 'Get guided coding help and review checkpoints.' },
  { title: 'Final Presentation', detail: 'Prepare delivery narrative and demo confidence.' },
]

export default function StudentsPage() {
  const MotionArticle = motion.article
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [sessionForm, setSessionForm] = useState(initialSessionForm)
  const [projectSent, setProjectSent] = useState(false)
  const [sessionSent, setSessionSent] = useState(false)
  const [projectError, setProjectError] = useState('')
  const [sessionError, setSessionError] = useState('')

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

  const handleSessionSubmit = (event) => {
    event.preventDefault()
    if (
      !sessionForm.name.trim()
      || !isValidEmail(sessionForm.email)
      || !sessionForm.date
      || !sessionForm.time
      || !sessionForm.help.trim()
    ) {
      setSessionError('Please complete all booking fields with a valid email.')
      return
    }

    const lines = [
      'Hi Mern Pixel Team,',
      '',
      'Student mentoring session request:',
      `Name: ${sessionForm.name.trim()}`,
      `Email: ${sessionForm.email.trim()}`,
      `Preferred Date: ${sessionForm.date}`,
      `Preferred Time: ${sessionForm.time}`,
      `Help Needed: ${sessionForm.help.trim()}`,
    ]

    const waHref = createWhatsAppLeadHref(business.whatsapp, lines.join('\n'))
    openLeadChannel(waHref)
    setSessionForm(initialSessionForm)
    setSessionError('')
    setSessionSent(true)
    window.setTimeout(() => setSessionSent(false), 4000)
  }

  return (
    <main className="pt-28">
      <PageIntroHero
        title="STUDENTS"
        subtitle="Major/minor support, mentoring sessions, and practical execution guidance."
        compact
      />

      <section className="section-shell student-command-shell">
        <div className="student-command-grid">
          <MotionArticle
            className="glass-card student-command-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: -52, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-kicker">Student Command Center</span>
            <h1 className="section-title">From project idea to confident final demo.</h1>
            <p className="section-copy max-w-none">
              We guide student teams through project planning, structured execution, and presentation readiness
              so final submissions look polished and perform well.
            </p>

            <div className="student-signal-grid">
              {studentSignals.map((item) => (
                <article key={item.label}>
                  <p>{item.value}</p>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </MotionArticle>

          <MotionArticle
            className="glass-card student-path-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: 52, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, delay: 0.08 }}
          >
            <p className="student-path-kicker">Mentoring Path</p>
            <div className="student-path-stack">
              {mentoringPath.map((step, index) => (
                <article key={step.title}>
                  <small>{`0${index + 1}`}</small>
                  <p>{step.title}</p>
                  <span>{step.detail}</span>
                </article>
              ))}
            </div>
          </MotionArticle>
        </div>
      </section>

      <section className="section-shell">
        <span className="section-kicker">Students</span>
        <h2 className="section-title">Major/minor support, mentoring, and sessions</h2>
        <p className="section-copy">Guided delivery for college projects with practical architecture, coding support, and final review prep.</p>

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
            className="glass-card student-form-card rounded-3xl p-7"
            initial={{ opacity: 0, x: -80, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-['Cinzel'] text-3xl">Student Project Request Form</h3>
            <p className="student-form-stepline">Step 1: Project Intent, Step 2: Scope, Step 3: Execution Plan</p>
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

          <motion.article
            className="glass-card student-form-card rounded-3xl p-7"
            initial={{ opacity: 0, x: 80, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-['Cinzel'] text-3xl">Student Session Booking</h3>
            <p className="student-form-stepline">Step 1: Book Slot, Step 2: Share Blockers, Step 3: Guided Session</p>
            {sessionSent && <p className="form-success mt-4">Booking request captured. WhatsApp draft opened.</p>}
            {sessionError && <p className="form-error mt-4">{sessionError}</p>}
            <form className="form-grid mt-6" onSubmit={handleSessionSubmit} noValidate>
              <input
                className="input-field"
                placeholder="Student name"
                value={sessionForm.name}
                onChange={(event) => setSessionForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="Email"
                type="email"
                value={sessionForm.email}
                onChange={(event) => setSessionForm((prev) => ({ ...prev, email: event.target.value }))}
              />
              <input
                className="input-field"
                type="date"
                value={sessionForm.date}
                onChange={(event) => setSessionForm((prev) => ({ ...prev, date: event.target.value }))}
              />
              <input
                className="input-field"
                type="time"
                value={sessionForm.time}
                onChange={(event) => setSessionForm((prev) => ({ ...prev, time: event.target.value }))}
              />
              <textarea
                className="input-field md:col-span-2"
                rows="4"
                placeholder="What you need help with"
                value={sessionForm.help}
                onChange={(event) => setSessionForm((prev) => ({ ...prev, help: event.target.value }))}
              />
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
