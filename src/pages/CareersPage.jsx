import { useState } from 'react'
import { motion } from 'framer-motion'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { business } from '../data/siteData'
import {
  createMailtoLeadHref,
  createWhatsAppLeadHref,
  isValidEmail,
  openLeadChannel,
} from '../lib/leadForms'

const initialForm = {
  name: '',
  email: '',
  role: '',
  portfolio: '',
  message: '',
}

const careerSignals = [
  { label: 'Current Openings', value: 'No Active Roles This Week' },
  { label: 'Review Window', value: '< 72 Hours' },
  { label: 'Hiring Lens', value: 'Ownership + Delivery Quality' },
]

const hiringValues = [
  'Strong craft standards in either design, frontend, backend, or growth.',
  'Clear communication and ability to work in a collaborative workflow.',
  'Execution ownership with practical decision-making under timelines.',
  'Portfolio or proof of work that reflects consistency and depth.',
]

export default function CareersPage() {
  const MotionArticle = motion.article
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      !formData.name.trim()
      || !isValidEmail(formData.email)
      || !formData.role.trim()
      || !formData.message.trim()
    ) {
      setError('Please complete all required fields with a valid email.')
      return
    }

    const lines = [
      'Hi Mern Pixel Team,',
      '',
      'Talent pool application:',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Interested Role: ${formData.role.trim()}`,
      `Portfolio/Profile: ${formData.portfolio.trim() || 'Not provided'}`,
      '',
      'Candidate Note:',
      formData.message.trim(),
    ]

    const waHref = createWhatsAppLeadHref(business.whatsapp, lines.join('\n'))
    const mailHref = createMailtoLeadHref({
      to: business.email,
      subject: `Talent Pool Application - ${formData.role.trim()}`,
      lines,
    })

    openLeadChannel(waHref)
    setFormData(initialForm)
    setError('')
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 4500)
    void mailHref
  }

  return (
    <main className="pt-28">
      <PageIntroHero
        title="CAREERS"
        subtitle="Join a team that combines premium design thinking with engineering rigor."
        compact
      />

      <section className="section-shell careers-command-shell">
        <div className="careers-command-grid">
          <MotionArticle
            className="glass-card careers-command-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: -52, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-kicker">Careers Desk</span>
            <h1 className="section-title">No open roles right now, but we are always scouting strong talent.</h1>
            <p className="section-copy max-w-none">
              Share your profile once and we will contact you when a matching requirement opens in
              product, engineering, design, or growth.
            </p>

            <div className="careers-signal-grid">
              {careerSignals.map((item) => (
                <article key={item.label}>
                  <p>{item.value}</p>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </MotionArticle>

          <MotionArticle
            className="glass-card careers-values-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: 52, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="careers-values-kicker">What We Value</p>
            <ul>
              {hiringValues.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </MotionArticle>
        </div>
      </section>

      <section className="section-shell pt-6">
        <span className="section-kicker">Talent Pool</span>
        <h2 className="section-title">Submit your profile for upcoming roles</h2>
        <p className="section-copy">Role updates are shared directly when your profile aligns with current priorities.</p>

        <div className="careers-form-grid">
          <motion.article
            className="glass-card careers-note-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: -64, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <p className="careers-note-kicker">Application Checklist</p>
            <ul>
              <li>Highlight your strongest role focus and years of hands-on work.</li>
              <li>Share links to project outcomes, case studies, or shipped products.</li>
              <li>Mention tools and domains where your execution quality is strongest.</li>
              <li>Add your availability window to speed up matching conversations.</li>
            </ul>
          </motion.article>

          <motion.article
            className="glass-card careers-form-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: 64, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-['Cinzel'] text-3xl text-white md:text-4xl">Join Talent Pool</h3>
            <p className="careers-form-stepline">Step 1: Profile, Step 2: Role Fit, Step 3: Contact Window</p>
            {submitted && <p className="form-success mt-4">Profile captured. WhatsApp draft opened.</p>}
            {error && <p className="form-error mt-4">{error}</p>}

            <form className="form-grid mt-7" onSubmit={handleSubmit} noValidate>
              <input
                className="input-field"
                placeholder="Your name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              />
              <input
                className="input-field md:col-span-2"
                placeholder="Role you are applying for"
                value={formData.role}
                onChange={(event) => setFormData((prev) => ({ ...prev, role: event.target.value }))}
              />
              <input
                className="input-field md:col-span-2"
                placeholder="Portfolio / LinkedIn URL (optional)"
                value={formData.portfolio}
                onChange={(event) => setFormData((prev) => ({ ...prev, portfolio: event.target.value }))}
              />
              <textarea
                className="input-field md:col-span-2"
                rows="4"
                placeholder="Short note about your experience"
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              />
              <button className="btn-primary md:col-span-2 md:w-fit" type="submit">
                Submit Profile
              </button>
            </form>
          </motion.article>
        </div>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Know Our Story"
        description="Explore how MernPixel works from idea to launch and what drives our process."
        to="/about"
        buttonLabel="Open About"
      />
    </main>
  )
}
