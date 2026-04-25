import { useMemo, useState } from 'react'
import HeroBackdrop from '../components/HeroBackdrop'
import { business } from '../data/siteData'
import {
  createMailtoLeadHref,
  createWhatsAppLeadHref,
  isValidEmail,
  isValidPhone,
} from '../lib/leadForms'

const services = [
  'Web Development',
  'E-commerce',
  'Web Applications',
  'Brand/UI System',
  'SEO & Growth',
  'Consulting',
]

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
    () => createWhatsAppLeadHref(business.whatsapp, 'Hi MERNpixel, I would like to discuss a project.'),
    []
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!isValidPhone(form.phone)) {
      setError('Please enter a valid phone number.')
      return
    }

    if (!form.message.trim()) {
      setError('Please share your project requirement.')
      return
    }

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
      subject: `New Inquiry - ${form.service}`,
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
            <h1>Let&apos;s map your project with clear scope and timeline.</h1>
            <p className="mp-lead">Reach us through form, WhatsApp, or direct email. We typically respond quickly.</p>

            <div className="mp-actions">
              <a href={quickWhatsApp} target="_blank" rel="noreferrer" className="mp-btn mp-btn-primary">WhatsApp</a>
              <a href={`mailto:${business.email}`} className="mp-btn mp-btn-ghost">Email Us</a>
            </div>
          </div>

          <form className="mp-card mp-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} />
            </label>

            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} />
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

            <button type="submit" className="mp-btn mp-btn-primary">Submit Inquiry</button>
          </form>
        </div>
      </section>
    </main>
  )
}
