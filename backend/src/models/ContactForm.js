import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  budget: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
})
export default mongoose.model('ContactForm', schema)
