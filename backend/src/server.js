import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import chatRouter from './routes/chat.js'
import mailRouter from './routes/mail.js'
import adminRouter from './routes/admin.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()
const port = Number(process.env.PORT) || 10000
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((item) => item.trim())
  .filter((item) => item && !item.includes('<') && !item.includes('your-netlify-site'))
  .filter(Boolean)

app.set('trust proxy', 1)
app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true)
      }

      let isNetlify = false
      try {
        isNetlify = /\.netlify\.app$/i.test(new URL(origin).hostname)
      } catch {
        isNetlify = false
      }
      const isAllowedExact = allowedOrigins.includes(origin)

      if (allowedOrigins.length === 0 || isAllowedExact || isNetlify) {
        return callback(null, true)
      }

      return callback(new Error('Origin not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '1mb' }))

app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'mernpixel-backend' })
})

app.use('/api/chat', chatRouter)
app.use('/api/mail', mailRouter)
app.use('/api/admin', adminRouter)

app.use(notFoundHandler)
app.use(errorHandler)

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`[server] running on port ${port}`)
  })
})
