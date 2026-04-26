import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, required: true, trim: true },
    section: { type: String, enum: ['home', 'services'], default: 'home' },
    website: { type: String, trim: true, default: '' },
    active: { type: Boolean, default: true },
    position: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Client', schema)
