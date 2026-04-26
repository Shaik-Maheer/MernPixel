import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    isBooked: { type: Boolean, default: false },
    clientName: { type: String, trim: true, default: '' },
    clientEmail: { type: String, trim: true, lowercase: true, default: '' },
    clientPhone: { type: String, trim: true, default: '' },
    clientTopic: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['open', 'pending', 'confirmed', 'completed', 'cancelled'],
      default: 'open',
    },
    meetLink: { type: String, trim: true, default: '' },
    adminNotes: { type: String, trim: true, default: '' },
    bookedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('BookingSlot', schema)
