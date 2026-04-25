import { useState } from 'react'
import { business } from '../data/siteData'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleMail = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`New project inquiry from ${form.name || 'Website Visitor'}`)
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      'Requirement:',
      form.message,
    ].join('\n'))

    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`
  }

  return (
    <main className="page-main">
      <section className="section-block page-intro">
        <div className="container contact-grid">
          <article>
            <p className="eyebrow">Contact</p>
            <h1>Let's discuss your project.</h1>
            <p className="lead-copy">Share your requirement and we will respond with scope, timeline, and next steps.</p>

            <div className="quick-links">
              <a className="btn btn-secondary" href={business.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="btn btn-secondary" href={`mailto:${business.email}`}>
                Email
              </a>
            </div>
          </article>

          <form className="contact-form" onSubmit={handleMail}>
            <label>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>

            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>

            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} rows="5" required />
            </label>

            <button type="submit" className="btn btn-primary">Send Inquiry</button>
          </form>
        </div>
      </section>
    </main>
  )
}
