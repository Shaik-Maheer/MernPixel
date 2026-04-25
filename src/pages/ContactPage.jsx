import { useMemo, useState } from 'react'
import HeroBackdrop from '../components/HeroBackdrop'
import { business } from '../data/siteData'
import { createMailtoLeadHref, createWhatsAppLeadHref, isValidEmail } from '../lib/leadForms'

const services = [
  'Web Development',
  'E-commerce Solutions',
  'Application Development',
  'Logo & Branding',
  'Digital Marketing',
  'Academic Projects',
  'Talent Hiring / Consulting',
  'Guest Lectures / Workshops',
]

const initialForm = {
  name: '',
  email: '',
  service: services[0],
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const quickWhatsApp = useMemo(
    () => createWhatsAppLeadHref(business.whatsapp, 'Hi MERNpixel, I want to start a project.'),
    []
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim()) return setError('Enter your name.')
    if (!isValidEmail(form.email)) return setError('Enter a valid email.')
    if (!form.message.trim()) return setError('Add a short requirement.')

    const lines = [
      'Hi MERNpixel Team,',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      '',
      'Requirement:',
      form.message,
    ]

    const mailto = createMailtoLeadHref({
      to: business.email,
      subject: `Project Inquiry - ${form.service}`,
      lines,
    })
    window.location.href = mailto
  }

  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/two.mp4" />
        <div className="mp-shell mp-grid-2 mp-hero-split">
          <div>
            <p className="mp-kicker">Contact</p>
            <h1>Start your project with MERNpixel.</h1>
            <p className="mp-lead">Share your requirement. We respond fast.</p>
            <p className="mp-lead">Email: {business.email} | Phone: {business.phone}</p>
            <div className="mp-actions">
              <a href={quickWhatsApp} target="_blank" rel="noreferrer" className="mp-btn mp-btn-primary mp-btn-whatsapp mp-magnetic">
                WhatsApp
              </a>
              <a href={`mailto:${business.email}`} className="mp-btn mp-btn-ghost mp-magnetic">Email</a>
            </div>
          </div>

          <form className="mp-card mp-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </label>
            <label>
              Service
              <select name="service" value={form.service} onChange={handleChange}>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </label>
            <label>
              Requirement
              <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
            </label>

            {error && <p className="mp-form-error">{error}</p>}

            <button type="submit" className="mp-btn mp-btn-primary mp-magnetic">Send Inquiry</button>
          </form>
        </div>
      </section>
    </main>
  )
}
