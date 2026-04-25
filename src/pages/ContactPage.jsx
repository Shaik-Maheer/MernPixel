import { useMemo, useState } from 'react'
import HeroBackdrop from '../components/HeroBackdrop'
import { business } from '../data/siteData'
import {
  createMailtoLeadHref,
  createWhatsAppLeadHref,
  isValidEmail,
  isValidPhone,
} from '../lib/leadForms'

const services = ['Web Development', 'Application Development', 'E-commerce', 'Branding', 'Digital Marketing', 'Custom Scope']

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: services[0],
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const quickWhatsApp = useMemo(
    () => createWhatsAppLeadHref(business.whatsapp, 'Hi MERNpixel, I want to discuss a project.'),
    []
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim()) return setError('Please enter your name.')
    if (!isValidEmail(form.email)) return setError('Please enter a valid email.')
    if (!isValidPhone(form.phone)) return setError('Please enter a valid phone number.')
    if (!form.message.trim()) return setError('Please describe your requirement.')

    const lines = [
      'Hi MERNpixel Team,',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
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

    const whatsapp = createWhatsAppLeadHref(business.whatsapp, lines.join('\n'))
    window.open(whatsapp, '_blank', 'noopener,noreferrer')
    window.location.href = mailto
  }

  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/two.mp4" />
        <div className="mp-shell mp-grid-2 mp-hero-split">
          <div>
            <p className="mp-kicker">Contact</p>
            <h1>Let&apos;s discuss your project scope and launch roadmap.</h1>
            <p className="mp-lead">Quick response promise: we typically reply within one business day.</p>

            <div className="mp-card mp-contact-meta">
              <p><strong>Email:</strong> {business.email}</p>
              <p><strong>Phone:</strong> {business.phone}</p>
              <p><strong>WhatsApp:</strong> Instant project chat available</p>
            </div>

            <div className="mp-actions">
              <a href={quickWhatsApp} target="_blank" rel="noreferrer" className="mp-btn mp-btn-primary mp-magnetic">WhatsApp</a>
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
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} />
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

            <button type="submit" className="mp-btn mp-btn-primary mp-magnetic">Submit</button>
          </form>
        </div>
      </section>
    </main>
  )
}
