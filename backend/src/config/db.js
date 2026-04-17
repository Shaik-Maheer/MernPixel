import mongoose from 'mongoose'

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.warn('[db] MONGODB_URI is missing. Continuing without database connection.')
    return
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('[db] MongoDB connected')
  } catch (error) {
    console.error('[db] MongoDB connection failed:', error.message)
    process.exit(1)
  }
}
