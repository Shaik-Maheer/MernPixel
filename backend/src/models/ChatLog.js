import mongoose from 'mongoose'

const chatLogSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
      trim: true,
    },
    assistantReply: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      default: 'unknown',
    },
    ip: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export const ChatLog = mongoose.model('ChatLog', chatLogSchema)
