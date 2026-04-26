import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    budget: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    adminNotes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('ContactForm', schema)
