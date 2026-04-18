import { useState } from 'react'
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

export default function CareersPage() {
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

      <section className="section-shell">
        <span className="section-kicker">Careers</span>
        <h1 className="section-title">No Open Roles This Week</h1>
        <p className="section-copy">Share your profile and we will contact you when a matching role opens.</p>

        <article className="glass-card mt-10 max-w-3xl rounded-3xl p-7 md:p-9">
          <h2 className="font-['Cinzel'] text-3xl text-white md:text-4xl">Join Talent Pool</h2>
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
        </article>
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

