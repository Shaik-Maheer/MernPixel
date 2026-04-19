import { useState } from 'react'
import { motion } from 'framer-motion'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { business, nonItServices } from '../data/siteData'
import {
  createMailtoLeadHref,
  createWhatsAppLeadHref,
  isValidEmail,
  openLeadChannel,
} from '../lib/leadForms'

const initialForm = {
  company: '',
  email: '',
  roleTitle: '',
  positions: '',
  location: '',
  notes: '',
}

const consultingSignals = [
  { label: 'Response Window', value: '< 24h' },
  { label: 'Hiring Focus', value: 'Sales, Marketing, Ops' },
  { label: 'Execution Mode', value: 'Fast + Filtered' },
]

const consultingFlow = [
  {
    title: 'Role Mapping',
    detail: 'We define skill criteria, role scope, and hiring outcome.',
  },
  {
    title: 'Candidate Filtering',
    detail: 'Profiles are screened for relevance, readiness, and fit.',
  },
  {
    title: 'Interview Support',
    detail: 'We assist with shortlisting and interview pipeline flow.',
  },
]

export default function NonITConsultingPage() {
  const MotionArticle = motion.article
  const [form, setForm] = useState(initialForm)
  const [formError, setFormError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      !form.company.trim()
      || !isValidEmail(form.email)
      || !form.roleTitle.trim()
      || !form.positions.trim()
      || !form.location.trim()
      || !form.notes.trim()
    ) {
      setFormError('Please complete all fields with a valid email.')
      return
    }

    const lines = [
      'Hi Mern Pixel Team,',
      '',
      'Non-IT hiring requirement:',
      `Company: ${form.company.trim()}`,
      `Hiring Contact Email: ${form.email.trim()}`,
      `Role Title: ${form.roleTitle.trim()}`,
      `Positions Needed: ${form.positions.trim()}`,
      `Location + Experience: ${form.location.trim()}`,
      `Hiring Notes: ${form.notes.trim()}`,
    ]

    const waHref = createWhatsAppLeadHref(business.whatsapp, lines.join('\n'))
    const mailHref = createMailtoLeadHref({
      to: business.email,
      subject: `Non-IT Hiring Requirement - ${form.roleTitle.trim()}`,
      lines,
    })

    openLeadChannel(waHref)
    setSubmitted(true)
    setFormError('')
    setForm(initialForm)
    window.setTimeout(() => setSubmitted(false), 4500)
    void mailHref
  }

  return (
    <main className="pt-28">
      <PageIntroHero
        title="NON IT CONSULTING"
        subtitle="Sales, marketing, and business-role hiring support with quick turnaround."
        compact
      />

      <section className="section-shell nonit-command-shell">
        <div className="nonit-command-grid">
          <MotionArticle
            className="glass-card nonit-command-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: -48, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-kicker">Hiring Command Center</span>
            <h1 className="section-title">Non-IT hiring support without the usual delays.</h1>
            <p className="section-copy max-w-none">
              We help businesses fill critical non-technical roles with a practical process that keeps
              hiring momentum high and profile quality controlled.
            </p>

            <div className="nonit-signal-grid">
              {consultingSignals.map((item) => (
                <article key={item.label}>
                  <p>{item.value}</p>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </MotionArticle>

          <MotionArticle
            className="glass-card nonit-flow-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: 48, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="nonit-flow-kicker">Engagement Flow</p>
            <div className="nonit-flow-stack">
              {consultingFlow.map((step, index) => (
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
        <span className="section-kicker">Non-IT Consulting</span>
        <h2 className="section-title">Sales, marketing, and business-role hiring support</h2>
        <p className="section-copy">We support non-IT talent consulting for companies needing practical hiring velocity with quality filters.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {nonItServices.map((service, index) => (
            <MotionArticle
              key={service}
              className="glass-card nonit-capability-card rounded-3xl p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">{`Capability 0${index + 1}`}</p>
              <h2 className="mt-3 font-['Cinzel'] text-3xl">{service}</h2>
              <p className="mt-3 text-sm text-white/72">Structured role planning, screening support, and practical hiring communication.</p>
            </MotionArticle>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="nonit-form-grid">
          <motion.article
            className="glass-card nonit-form-note rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: -60, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <p className="nonit-form-kicker">Before You Submit</p>
            <ul>
              <li>Mention role-level and expected experience bracket.</li>
              <li>Share timeline urgency and preferred joining window.</li>
              <li>Add location and work mode details for better filtering.</li>
              <li>Include must-have traits to improve shortlist quality.</li>
            </ul>
          </motion.article>

          <motion.article
            className="glass-card rounded-3xl p-7"
            initial={{ opacity: 0, x: 60, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.63, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-['Cinzel'] text-3xl">Non-IT Hiring Requirement Form</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/60">Backend reply target: within 24 hours</p>
            {submitted && <p className="form-success mt-4">Requirement captured. WhatsApp draft opened.</p>}
            {formError && <p className="form-error mt-4">{formError}</p>}
            <form className="form-grid mt-6" onSubmit={handleSubmit} noValidate>
              <input
                className="input-field"
                placeholder="Company name"
                value={form.company}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="Hiring contact email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="Role title"
                value={form.roleTitle}
                onChange={(event) => setForm((prev) => ({ ...prev, roleTitle: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="Positions needed"
                value={form.positions}
                onChange={(event) => setForm((prev) => ({ ...prev, positions: event.target.value }))}
              />
              <input
                className="input-field md:col-span-2"
                placeholder="Location + experience range"
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              />
              <textarea
                className="input-field md:col-span-2"
                rows="4"
                placeholder="Hiring notes"
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
              />
              <button className="btn-primary md:col-span-2 md:w-fit" type="submit">Submit Hiring Requirement</button>
            </form>
          </motion.article>
        </div>
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
