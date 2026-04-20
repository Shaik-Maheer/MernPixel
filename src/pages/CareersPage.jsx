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
      'Hi MERNpixel Team,',
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
        subtitle="Join our talent pool."
        compact
      />

      <section className="section-shell pt-6">
        <span className="section-kicker">Talent Pool</span>
        <h2 className="section-title">Submit your profile for upcoming roles</h2>

        <div className="mt-8">
          <motion.article
            className="glass-card careers-form-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-['Cinzel'] text-3xl text-white md:text-4xl">Join Talent Pool</h3>
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
        description="See how we work."
        to="/about"
        buttonLabel="Open About"
      />
    </main>
  )
}
