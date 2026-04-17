import { Router } from 'express'
import mongoose from 'mongoose'
import OpenAI from 'openai'
import { ChatLog } from '../models/ChatLog.js'

const router = Router()

let openaiClient = null

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    })
  }

  return openaiClient
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) {
    return []
  }

  return history
    .filter((item) => item && typeof item.role === 'string' && typeof item.content === 'string')
    .map((item) => ({
      role: item.role === 'assistant' ? 'assistant' : 'user',
      content: item.content.slice(0, 4000),
    }))
    .slice(-10)
}

router.post('/', async (req, res, next) => {
  try {
    const { message, history } = req.body ?? {}

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY is missing on server.' })
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required.' })
    }

    const systemPrompt =
      process.env.CHATBOT_SYSTEM_PROMPT ||
      "You are MernPixel's assistant. Answer clearly and keep responses concise."

    const messages = [
      { role: 'system', content: systemPrompt },
      ...sanitizeHistory(history),
      { role: 'user', content: message.slice(0, 4000) },
    ]

    const openai = getOpenAIClient()
    if (!openai) {
      return res.status(500).json({ error: 'OPENAI_API_KEY is missing on server.' })
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'openai/gpt-4o-mini',
      messages,
      temperature: 0.6,
      max_tokens: 450,
    })

    const reply = completion.choices?.[0]?.message?.content?.trim() || 'No response generated.'

    if (mongoose.connection.readyState === 1) {
      await ChatLog.create({
        userMessage: message,
        assistantReply: reply,
        model: completion.model || process.env.OPENAI_MODEL || 'unknown',
        ip: req.ip || '',
      })
    }

    return res.status(200).json({
      reply,
      model: completion.model || process.env.OPENAI_MODEL || 'unknown',
    })
  } catch (error) {
    return next(error)
  }
})

export default router
