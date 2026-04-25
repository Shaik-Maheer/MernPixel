import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  name: String,
  logoUrl: String,
  position: { type: Number, default: 0 },
})
export default mongoose.model('Client', schema)
