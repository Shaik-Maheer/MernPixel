import express from 'express'
import jwt from 'jsonwebtoken'
import ContactForm from '../models/ContactForm.js'
import Client from '../models/Client.js'
import Blog from '../models/Blog.js'
import BookingSlot from '../models/BookingSlot.js'
import nodemailer from 'nodemailer'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_mernpixel_secret_super_hard'

// Transporter for nodemailer
const getTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    jwt.verify(token, JWT_SECRET)
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid config token' })
  }
}

// 1. LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'MERNpixel@admin' && password === 'Mern@123') {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '7d' })
    return res.json({ token, message: 'Login successful' })
  }
  return res.status(401).json({ error: 'Invalid credentials' })
})

// 2. CONTACT FORMS
router.get('/contacts', authMiddleware, async (req, res) => {
  const forms = await ContactForm.find().sort({ createdAt: -1 })
  res.json(forms)
})
router.post('/contacts', async (req, res) => {
  const form = await ContactForm.create(req.body)
  res.json(form)
})

// 3. CLIENTS
router.get('/clients', async (req, res) => {
  const clients = await Client.find().sort({ position: 1 })
  res.json(clients)
})
router.post('/clients', authMiddleware, async (req, res) => {
  const client = await Client.create(req.body)
  res.json(client)
})
router.put('/clients/:id', authMiddleware, async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(client)
})
router.delete('/clients/:id', authMiddleware, async (req, res) => {
  await Client.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

// 4. BLOGS
router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 })
  res.json(blogs)
})
router.post('/blogs', authMiddleware, async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})
router.delete('/blogs/:id', authMiddleware, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

// 5. BOOKINGS
router.get('/bookings', async (req, res) => {
  const bookings = await BookingSlot.find().sort({ date: 1, time: 1 })
  res.json(bookings)
})
router.post('/bookings', authMiddleware, async (req, res) => {
  // Admin creates an open slot
  const slot = await BookingSlot.create(req.body)
  res.json(slot)
})
router.put('/bookings/:id/book', async (req, res) => {
  // Client books a slot
  const { clientName, clientEmail, clientVision } = req.body
  const slot = await BookingSlot.findByIdAndUpdate(req.params.id, {
    isBooked: true, clientName, clientEmail, clientVision, status: 'pending'
  }, { new: true })
  res.json(slot)
})
router.put('/bookings/:id/approve', authMiddleware, async (req, res) => {
  // Admin approves a slot and supplies meetLink
  const { meetLink } = req.body
  const slot = await BookingSlot.findByIdAndUpdate(req.params.id, {
    status: 'approved', meetLink
  }, { new: true })

  if (slot.clientEmail && process.env.SMTP_USER) {
    const transporter = getTransporter()
    await transporter.sendMail({
      from: `"MERNpixel Studio" <${process.env.SMTP_USER}>`,
      to: slot.clientEmail,
      subject: `Your Booking is Confirmed - MERNpixel`,
      html: `<p>Hi ${slot.clientName},</p><p>We're thrilled to discuss and bring your vision to life.</p><p>Your session on ${slot.date} at ${slot.time} has been approved.</p><p><strong>Join Here:</strong> <a href="${meetLink}">${meetLink}</a></p><p>Regards,<br>MERNpixel Team</p>`
    }).catch(console.error)
  }

  res.json(slot)
})
router.delete('/bookings/:id', authMiddleware, async (req, res) => {
  await BookingSlot.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
