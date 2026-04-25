import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const { name, email, company, budget, description } = req.body

    if (!name || !email || !description) {
      const err = new Error('Name, email, and description are required.')
      err.status = 400
      throw err
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
      subject: `New MERNpixel Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nBudget: ${budget || 'N/A'}\n\nProject Details:\n${description}`,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ ok: true, message: 'Message sent successfully.' })
  } catch (error) {
    next(error)
  }
})

export default router
