import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  date: String,
  time: String,
  isBooked: { type: Boolean, default: false },
  clientName: String,
  clientEmail: String,
  clientVision: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  meetLink: String
})
export default mongoose.model('BookingSlot', schema)
