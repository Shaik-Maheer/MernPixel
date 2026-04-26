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
    position: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('GalleryItem', schema)
