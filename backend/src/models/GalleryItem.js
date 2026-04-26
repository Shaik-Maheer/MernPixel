import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true,
      default: 'image',
    },
    src: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'Events' },
    active: { type: Boolean, default: true },
    colSpan: { type: Number, default: 1, min: 1, max: 6 },
    height: { type: Number, default: 320, min: 120, max: 1600 },
    position: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('GalleryItem', schema)
