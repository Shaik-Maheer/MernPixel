import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { business } from '../data/siteData'
import {
  createMailtoLeadHref,
  createWhatsAppLeadHref,
  isValidEmail,
  isValidPhone,
  openLeadChannel,
} from '../lib/leadForms'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'

const serviceOptions = [
  'Web Development',
  'UI/UX Design',
  'SEO Optimization',
  'Digital Marketing',
  'Branding & Identity',
  'Academic Projects',
  'Portfolio Building',
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

const validateContactForm = (values) => {
  const nextErrors = {}
  if (!values.name.trim()) {
    nextErrors.name = 'Please enter your name.'
  }
  if (!isValidEmail(values.email)) {
    nextErrors.email = 'Please enter a valid email.'
  }
  if (!isValidPhone(values.phone)) {
    nextErrors.phone = 'Please enter a valid phone number.'
  }
  if (!values.service) {
    nextErrors.service = 'Please select a service.'
  }
  if (!values.message.trim()) {
    nextErrors.message = 'Please share your project requirement.'
  }
  return nextErrors
}

export default function ContactPage() {
  const MotionCard = motion.article
  const MotionLink = motion.a

  const [formData, setFormData] = useState(initialForm)
  const [formErrors, setFormErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [leadLinks, setLeadLinks] = useState({ whatsapp: '', mailto: '' })
  const [ripples, setRipples] = useState([])

  const quickMessage = 'Hi MERNpixel, I would like to discuss a new project requirement. Please connect with me.'
  const quickWhatsAppHref = useMemo(
    () => createWhatsAppLeadHref(business.whatsapp, quickMessage),
    [quickMessage]
  )

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    setFormErrors((previous) => ({ ...previous, [name]: '' }))
  }

  const handleRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    }

    setRipples((previous) => [...previous, ripple])

    window.setTimeout(() => {
      setRipples((previous) => previous.filter((item) => item.id !== ripple.id))
    }, 540)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validateContactForm(formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const lines = [
      'Hi MERNpixel Team,',
      '',
      'New project inquiry details:',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Service Needed: ${formData.service}`,
      '',
      'Requirement:',
      formData.message.trim(),
    ]

    const whatsappHref = createWhatsAppLeadHref(business.whatsapp, lines.join('\n'))
    const mailtoHref = createMailtoLeadHref({
      to: business.email,
      subject: `New Project Inquiry - ${formData.service}`,
      lines,
    })

    setLeadLinks({ whatsapp: whatsappHref, mailto: mailtoHref })
    setSubmitted(true)
    setFormData(initialForm)
    setFormErrors({})
    openLeadChannel(whatsappHref)
  }

  return (
    <main className="contact-page pt-24 md:pt-28">
      <PageIntroHero
        title="CONTACT US"
        subtitle="Share your requirement."
        compact
      />

      <section className="section-shell relative pt-0">
        <div className="contact-command-grid">
          <MotionCard
            className="glass-card contact-info-card contact-command-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-['Cinzel'] text-3xl text-white md:text-4xl">Start a conversation</h2>

            <div className="mt-8 space-y-4">
              <MotionLink
                href={`mailto:${business.email}`}
                className="contact-channel cursor-target"
                whileHover={{ scale: 1.01 }}
              >
                <span className="contact-channel-icon">@</span>
                <span>
                  <span className="contact-channel-label">Email</span>
                  <span className="contact-channel-value">{business.email}</span>
                </span>
              </MotionLink>

              <MotionLink
                href={quickWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="contact-channel cursor-target"
                whileHover={{ scale: 1.01 }}
              >
                <span className="contact-channel-icon">WA</span>
                <span>
                  <span className="contact-channel-label">WhatsApp</span>
                  <span className="contact-channel-value">{business.phone}</span>
                </span>
              </MotionLink>
            </div>
          </MotionCard>

          <MotionCard
            className="glass-card contact-form-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-['Cinzel'] text-3xl text-white md:text-4xl">Project Contact Form</h2>
            <p className="mt-4 text-sm text-white/70">Share details and submit.</p>

            {submitted && (
              <div className="contact-submit-success mt-6 rounded-2xl border border-[#7ADBEF]/50 bg-[#7ADBEF]/10 p-4">
                <p className="text-sm text-[#B7ECFF]">Thanks. Your inquiry draft is ready and WhatsApp was opened.</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn-secondary cursor-target"
                    onClick={() => openLeadChannel(leadLinks.whatsapp)}
                  >
                    Open WhatsApp Again
                  </button>
                  <button
                    type="button"
                    className="btn-secondary cursor-target"
                    onClick={() => openLeadChannel(leadLinks.mailto)}
                  >
                    Send by Email
                  </button>
                </div>
              </div>
            )}

            <form className="contact-line-grid mt-9" onSubmit={handleSubmit} noValidate>
              <div>
                <input
                  className="contact-line-field"
                  placeholder="What's Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                />
                {formErrors.name && <p className="form-error mt-2">{formErrors.name}</p>}
              </div>

              <div>
                <input
                  className="contact-line-field"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                />
                {formErrors.email && <p className="form-error mt-2">{formErrors.email}</p>}
              </div>

              <div>
                <div className="contact-phone-wrap">
                  <span className="contact-phone-code">+91</span>
                  <input
                    className="contact-line-field"
                    placeholder="Your Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFieldChange}
                  />
                </div>
                {formErrors.phone && <p className="form-error mt-2">{formErrors.phone}</p>}
              </div>

              <div>
                <select
                  className="contact-line-field"
                  name="service"
                  value={formData.service}
                  onChange={handleFieldChange}
                >
                  <option value="" disabled>
                    Service you are looking for
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {formErrors.service && <p className="form-error mt-2">{formErrors.service}</p>}
              </div>

              <div className="contact-line-text-wrap">
                <textarea
                  className="contact-line-field contact-line-textarea"
                  rows="4"
                  placeholder="Tell us about your project"
                  name="message"
                  value={formData.message}
                  onChange={handleFieldChange}
                />
                {formErrors.message && <p className="form-error mt-2">{formErrors.message}</p>}
              </div>

              <button
                className="btn-primary btn-ripple contact-submit-btn"
                type="submit"
                onClick={handleRipple}
              >
                Start Your Project
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple-dot"
                    style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
                  />
                ))}
              </button>
            </form>
          </MotionCard>
        </div>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="See Our Creations"
        description="Browse the portfolio."
        to="/works"
        buttonLabel="Open Projects"
      />
    </main>
  )
}
