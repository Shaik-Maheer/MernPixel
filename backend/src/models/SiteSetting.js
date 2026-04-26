import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('SiteSetting', schema)
