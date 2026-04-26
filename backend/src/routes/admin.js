import express from 'express'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import ContactForm from '../models/ContactForm.js'
import Client from '../models/Client.js'
import Blog from '../models/Blog.js'
import BookingSlot from '../models/BookingSlot.js'
import StudentProject from '../models/StudentProject.js'
import GalleryItem from '../models/GalleryItem.js'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_mernpixel_secret_super_hard'
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'manohar').trim()
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'Admin@12345').trim()

const LEGACY_ADMIN_USERNAME = 'MERNpixel@admin'
const LEGACY_ADMIN_PASSWORD = 'Mern@123'

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

function decodeTokenFromRequest(req) {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    if (!token) return null
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

function isAdminRequest(req) {
  return Boolean(decodeTokenFromRequest(req)?.admin)
}

function authMiddleware(req, res, next) {
  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  return next()
}

function parseTags(input) {
  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof input === 'string') {
    return input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function parseCsvList(input) {
  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof input === 'string') {
    return input
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

async function getNextGalleryPosition() {
  const lastItem = await GalleryItem.findOne().sort({ position: -1, createdAt: -1 }).select('position')
  const current = Number(lastItem?.position)
  if (!Number.isFinite(current)) return 0
  return current + 1
}

router.post('/login', (req, res) => {
  const username = String(req.body?.username || '').trim()
  const password = String(req.body?.password || '').trim()

  const validPrimary = username === ADMIN_USERNAME && password === ADMIN_PASSWORD
  const validLegacy = username === LEGACY_ADMIN_USERNAME && password === LEGACY_ADMIN_PASSWORD

  if (!validPrimary && !validLegacy) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ admin: true, username }, JWT_SECRET, { expiresIn: '7d' })
  return res.json({ token, message: 'Login successful' })
})

// CONTACTS
router.get('/contacts', authMiddleware, async (req, res, next) => {
  try {
    const { status = 'all', q = '' } = req.query
    const query = {}

    if (status !== 'all') {
      query.status = status
    }
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { subject: { $regex: q, $options: 'i' } },
      ]
    }

    const forms = await ContactForm.find(query).sort({ createdAt: -1 })
    return res.json(forms)
  } catch (error) {
    return next(error)
  }
})

router.post('/contacts', async (req, res, next) => {
  try {
    const {
      name = '',
      email = '',
      phone = '',
      subject = '',
      company = '',
      budget = '',
      description = '',
    } = req.body || {}

    if (!name.trim() || !email.trim() || !description.trim()) {
      return res.status(400).json({ error: 'Name, email and message are required.' })
    }

    const form = await ContactForm.create({
      name,
      email,
      phone,
      subject,
      company,
      budget,
      description,
      status: 'new',
    })
    return res.json(form)
  } catch (error) {
    return next(error)
  }
})

router.put('/contacts/:id', authMiddleware, async (req, res, next) => {
  try {
    const updates = {}
    const allowedStatuses = new Set(['new', 'read', 'replied', 'archived'])

    if (typeof req.body?.status === 'string' && allowedStatuses.has(req.body.status)) {
      updates.status = req.body.status
    }
    if (typeof req.body?.adminNotes === 'string') {
      updates.adminNotes = req.body.adminNotes
    }

    const form = await ContactForm.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!form) return res.status(404).json({ error: 'Contact not found' })
    return res.json(form)
  } catch (error) {
    return next(error)
  }
})

router.delete('/contacts/:id', authMiddleware, async (req, res, next) => {
  try {
    await ContactForm.findByIdAndDelete(req.params.id)
    return res.json({ ok: true })
  } catch (error) {
    return next(error)
  }
})

// CLIENTS
router.get('/clients', async (req, res, next) => {
  try {
    const adminMode = isAdminRequest(req)
    const query = adminMode ? {} : { active: true }
    const clients = await Client.find(query).sort({ position: 1, createdAt: -1 })
    return res.json(clients)
  } catch (error) {
    return next(error)
  }
})

router.post('/clients', authMiddleware, async (req, res, next) => {
  try {
    const { name = '', logoUrl = '', website = '', active = true, position = 0 } = req.body || {}
    if (!name.trim() || !logoUrl.trim()) {
      return res.status(400).json({ error: 'Client name and logo URL are required.' })
    }
    const client = await Client.create({
      name: name.trim(),
      logoUrl: logoUrl.trim(),
      website: String(website || '').trim(),
      active: Boolean(active),
      position: Number.isFinite(Number(position)) ? Number(position) : 0,
    })
    return res.json(client)
  } catch (error) {
    return next(error)
  }
})

router.put('/clients/:id', authMiddleware, async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!client) return res.status(404).json({ error: 'Client not found' })
    return res.json(client)
  } catch (error) {
    return next(error)
  }
})

router.delete('/clients/:id', authMiddleware, async (req, res, next) => {
  try {
    await Client.findByIdAndDelete(req.params.id)
    return res.json({ ok: true })
  } catch (error) {
    return next(error)
  }
})

// GALLERY
router.get('/gallery', async (req, res, next) => {
  try {
    const adminMode = isAdminRequest(req)
    const query = adminMode ? {} : { active: true }
    const items = await GalleryItem.find(query).sort({ position: 1, createdAt: 1 })
    return res.json(items)
  } catch (error) {
    return next(error)
  }
})

router.post('/gallery', authMiddleware, async (req, res, next) => {
  try {
    const { type = 'image', src = '', category = 'Events', active = true, position } = req.body || {}
    const safeType = String(type).trim().toLowerCase()
    const safeSrc = String(src).trim()

    if (safeType !== 'image' && safeType !== 'video') {
      return res.status(400).json({ error: 'Type must be image or video.' })
    }
    if (!safeSrc) {
      return res.status(400).json({ error: 'Media URL is required.' })
    }

    const nextPosition = Number.isFinite(Number(position)) ? Number(position) : await getNextGalleryPosition()
    const item = await GalleryItem.create({
      type: safeType,
      src: safeSrc,
      category: String(category || 'Events').trim() || 'Events',
      active: Boolean(active),
      position: nextPosition,
    })
    return res.json(item)
  } catch (error) {
    return next(error)
  }
})

router.put('/gallery/:id', authMiddleware, async (req, res, next) => {
  try {
    const updates = {}
    const body = req.body || {}

    if (body.type !== undefined) {
      const safeType = String(body.type).trim().toLowerCase()
      if (safeType !== 'image' && safeType !== 'video') {
        return res.status(400).json({ error: 'Type must be image or video.' })
      }
      updates.type = safeType
    }
    if (body.src !== undefined) {
      const safeSrc = String(body.src).trim()
      if (!safeSrc) {
        return res.status(400).json({ error: 'Media URL is required.' })
      }
      updates.src = safeSrc
    }
    if (body.category !== undefined) {
      updates.category = String(body.category || '').trim() || 'Events'
    }
    if (body.active !== undefined) {
      updates.active = Boolean(body.active)
    }
    if (body.position !== undefined) {
      const safePosition = Number(body.position)
      if (!Number.isFinite(safePosition)) {
        return res.status(400).json({ error: 'Position must be a valid number.' })
      }
      updates.position = safePosition
    }

    const item = await GalleryItem.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!item) return res.status(404).json({ error: 'Gallery item not found' })
    return res.json(item)
  } catch (error) {
    return next(error)
  }
})

router.post('/gallery/reorder', authMiddleware, async (req, res, next) => {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids.map((id) => String(id)) : []
    if (ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required for reorder.' })
    }

    await Promise.all(
      ids.map((id, index) =>
        GalleryItem.findByIdAndUpdate(id, { position: index }, { new: false })
      )
    )

    const items = await GalleryItem.find({}).sort({ position: 1, createdAt: 1 })
    return res.json(items)
  } catch (error) {
    return next(error)
  }
})

router.delete('/gallery/:id', authMiddleware, async (req, res, next) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id)
    return res.json({ ok: true })
  } catch (error) {
    return next(error)
  }
})

// BLOGS
router.get('/blogs', async (req, res, next) => {
  try {
    const adminMode = isAdminRequest(req)
    const query = adminMode ? {} : { status: 'published' }
    const blogs = await Blog.find(query).sort({ createdAt: -1 })
    return res.json(blogs)
  } catch (error) {
    return next(error)
  }
})

router.post('/blogs', authMiddleware, async (req, res, next) => {
  try {
    const { title = '', videoUrl = '', description = '', status = 'published', tags = [] } = req.body || {}
    if (!title.trim() || !videoUrl.trim() || !description.trim()) {
      return res.status(400).json({ error: 'Title, video URL, and description are required.' })
    }
    const blog = await Blog.create({
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      description: description.trim(),
      status: status === 'draft' ? 'draft' : 'published',
      tags: parseTags(tags),
    })
    return res.json(blog)
  } catch (error) {
    return next(error)
  }
})

router.put('/blogs/:id', authMiddleware, async (req, res, next) => {
  try {
    const updates = { ...req.body }
    if (updates.tags !== undefined) {
      updates.tags = parseTags(updates.tags)
    }
    if (updates.status !== undefined) {
      updates.status = updates.status === 'draft' ? 'draft' : 'published'
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!blog) return res.status(404).json({ error: 'Blog not found' })
    return res.json(blog)
  } catch (error) {
    return next(error)
  }
})

router.delete('/blogs/:id', authMiddleware, async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    return res.json({ ok: true })
  } catch (error) {
    return next(error)
  }
})

// BOOKINGS
router.get('/bookings', async (req, res, next) => {
  try {
    const adminMode = isAdminRequest(req)
    const query = adminMode ? {} : { isBooked: false, status: 'open' }
    const bookings = await BookingSlot.find(query).sort({ date: 1, time: 1 })
    return res.json(bookings)
  } catch (error) {
    return next(error)
  }
})

router.post('/bookings', authMiddleware, async (req, res, next) => {
  try {
    const { date = '', time = '' } = req.body || {}
    if (!date || !time) {
      return res.status(400).json({ error: 'Date and time are required.' })
    }
    const slot = await BookingSlot.create({ date, time, isBooked: false, status: 'open' })
    return res.json(slot)
  } catch (error) {
    return next(error)
  }
})

router.put('/bookings/:id/book', async (req, res, next) => {
  try {
    const { clientName = '', clientEmail = '', clientPhone = '', clientTopic = '' } = req.body || {}
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim() || !clientTopic.trim()) {
      return res.status(400).json({ error: 'Name, email, phone and topic are required.' })
    }

    const existing = await BookingSlot.findById(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Booking slot not found' })
    if (existing.isBooked || existing.status !== 'open') {
      return res.status(409).json({ error: 'This slot is no longer available.' })
    }

    existing.isBooked = true
    existing.status = 'pending'
    existing.clientName = clientName.trim()
    existing.clientEmail = clientEmail.trim()
    existing.clientPhone = clientPhone.trim()
    existing.clientTopic = clientTopic.trim()
    existing.bookedAt = new Date()
    await existing.save()

    return res.json(existing)
  } catch (error) {
    return next(error)
  }
})

router.put('/bookings/:id/status', authMiddleware, async (req, res, next) => {
  try {
    const { status, meetLink = '', adminNotes = '' } = req.body || {}
    const allowedStatuses = new Set(['pending', 'confirmed', 'completed', 'cancelled'])

    if (!allowedStatuses.has(status)) {
      return res.status(400).json({ error: 'Invalid booking status' })
    }

    const slot = await BookingSlot.findById(req.params.id)
    if (!slot) return res.status(404).json({ error: 'Booking slot not found' })

    slot.status = status
    if (typeof meetLink === 'string') slot.meetLink = meetLink
    if (typeof adminNotes === 'string') slot.adminNotes = adminNotes
    await slot.save()

    const shouldSendMail =
      Boolean(slot.clientEmail) &&
      Boolean(process.env.SMTP_USER) &&
      (status === 'confirmed' || status === 'cancelled')

    if (shouldSendMail) {
      const transporter = getTransporter()
      const subject =
        status === 'confirmed'
          ? `Your MERNpixel session is confirmed - ${slot.date} ${slot.time}`
          : `Your MERNpixel session update - ${slot.date} ${slot.time}`

      const body =
        status === 'confirmed'
          ? `<p>Hi ${slot.clientName},</p>
             <p>Your session is confirmed for <strong>${slot.date}</strong> at <strong>${slot.time}</strong>.</p>
             ${slot.meetLink ? `<p>Join link: <a href="${slot.meetLink}">${slot.meetLink}</a></p>` : ''}
             <p>Regards,<br/>MERNpixel Team</p>`
          : `<p>Hi ${slot.clientName},</p>
             <p>Your session on <strong>${slot.date}</strong> at <strong>${slot.time}</strong> has been marked as cancelled.</p>
             <p>If required, please book another slot.</p>
             <p>Regards,<br/>MERNpixel Team</p>`

      transporter
        .sendMail({
          from: `"MERNpixel Studio" <${process.env.SMTP_USER}>`,
          to: slot.clientEmail,
          subject,
          html: body,
        })
        .catch((mailError) => console.error('[mail] booking status email failed:', mailError))
    }

    return res.json(slot)
  } catch (error) {
    return next(error)
  }
})

// Backward compatibility with old frontend button action.
router.put('/bookings/:id/approve', authMiddleware, async (req, res, next) => {
  try {
    const slot = await BookingSlot.findById(req.params.id)
    if (!slot) return res.status(404).json({ error: 'Booking slot not found' })

    slot.status = 'confirmed'
    if (typeof req.body?.meetLink === 'string') {
      slot.meetLink = req.body.meetLink
    }
    await slot.save()
    return res.json(slot)
  } catch (error) {
    return next(error)
  }
})

router.delete('/bookings/:id', authMiddleware, async (req, res, next) => {
  try {
    await BookingSlot.findByIdAndDelete(req.params.id)
    return res.json({ ok: true })
  } catch (error) {
    return next(error)
  }
})

// STUDENT PROJECTS
router.get('/student-projects', async (req, res, next) => {
  try {
    const adminMode = isAdminRequest(req)
    const query = adminMode ? {} : { active: true }
    const list = await StudentProject.find(query).sort({ createdAt: -1 })
    return res.json(list)
  } catch (error) {
    return next(error)
  }
})

router.get('/student-projects/:id', async (req, res, next) => {
  try {
    const adminMode = isAdminRequest(req)
    const query = adminMode ? { _id: req.params.id } : { _id: req.params.id, active: true }
    const project = await StudentProject.findOne(query)
    if (!project) return res.status(404).json({ error: 'Student project not found' })
    return res.json(project)
  } catch (error) {
    return next(error)
  }
})

router.post('/student-projects', authMiddleware, async (req, res, next) => {
  try {
    const payload = { ...req.body }
    payload.techStack = parseTags(payload.techStack)
    payload.screenshots = parseCsvList(payload.screenshots)
    const project = await StudentProject.create(payload)
    return res.json(project)
  } catch (error) {
    return next(error)
  }
})

router.put('/student-projects/:id', authMiddleware, async (req, res, next) => {
  try {
    const payload = { ...req.body }
    if (payload.techStack !== undefined) payload.techStack = parseTags(payload.techStack)
    if (payload.screenshots !== undefined) payload.screenshots = parseCsvList(payload.screenshots)
    const project = await StudentProject.findByIdAndUpdate(req.params.id, payload, { new: true })
    if (!project) return res.status(404).json({ error: 'Student project not found' })
    return res.json(project)
  } catch (error) {
    return next(error)
  }
})

router.delete('/student-projects/:id', authMiddleware, async (req, res, next) => {
  try {
    await StudentProject.findByIdAndDelete(req.params.id)
    return res.json({ ok: true })
  } catch (error) {
    return next(error)
  }
})

export default router
