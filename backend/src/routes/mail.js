import express from 'express'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'
import ContactForm from '../models/ContactForm.js'

const router = express.Router()

const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this IP. Please try again after 1 hour.' },
})

router.use(contactRateLimit)

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, subject, company, budget, description } = req.body

    if (!name || !email || !description) {
      const err = new Error('Name, email, and description are required.')
      err.status = 400
      throw err
    }

    try {
      await ContactForm.create({
        name,
        email,
        phone: phone || '',
        subject: subject || '',
        company: company || '',
        budget: budget || '',
        description,
        status: 'new',
      })
    } catch (dbErr) {
      console.error('Failed to save to database', dbErr)
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New MERNpixel Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'N/A'}\nCompany: ${company || 'N/A'}\nBudget: ${budget || 'N/A'}\n\nProject Details:\n${description}`,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ ok: true, message: 'Message sent successfully.' })
  } catch (error) {
    next(error)
  }
})

export default router
