import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { sendChatMessage } from '../lib/chatApi'

const initialMessage = {
  role: 'assistant',
  content: 'Hi, I am the MernPixel assistant. How can I help with your project today?',
}

export default function ChatbotWidget() {
  const MotionButton = motion.button
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([initialMessage])
  const [error, setError] = useState('')
  const listRef = useRef(null)

  const historyForRequest = useMemo(
    () =>
      messages
        .filter((item) => item.role === 'user' || item.role === 'assistant')
        .map((item) => ({ role: item.role, content: item.content })),
    [messages]
  )

  useEffect(() => {
    if (!listRef.current) {
      return
    }
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open, loading])

  async function handleSend(event) {
    event.preventDefault()
    if (loading) {
      return
    }

    const message = input.trim()
    if (!message) {
      return
    }

    setError('')
    setInput('')
    setLoading(true)

    setMessages((prev) => [...prev, { role: 'user', content: message }])

    try {
      const reply = await sendChatMessage({
        message,
        history: historyForRequest.slice(-10),
      })
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to chatbot service.')
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I could not connect right now. Please try again in a moment.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MotionButton
        type="button"
        className="chat-toggle cursor-target"
        initial={{ opacity: 0, y: 20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        <span className="chat-toggle-dot">AI</span>
        <span className="chat-toggle-label">{open ? 'Close Chat' : 'Chat with us'}</span>
      </MotionButton>

      {open && (
        <motion.aside
          className="chat-panel"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="chat-panel-head">
            <p className="chat-panel-title">MernPixel Assistant</p>
            <p className="chat-panel-subtitle">Instant project guidance</p>
          </header>

          <div ref={listRef} className="chat-panel-messages">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`chat-msg ${item.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`}>
                {item.content}
              </div>
            ))}
            {loading && <div className="chat-msg chat-msg-bot">Thinking...</div>}
          </div>

          {error && <p className="chat-panel-error">{error}</p>}

          <form className="chat-panel-form" onSubmit={handleSend}>
            <input
              className="chat-panel-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message"
              maxLength={4000}
              disabled={loading}
            />
            <button type="submit" className="chat-panel-send cursor-target" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </motion.aside>
      )}
    </>
  )
}
