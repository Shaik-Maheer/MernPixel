import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { sendChatMessage } from '../lib/chatApi'
import { SocialIcon } from './SocialIcons'
import { business } from '../data/siteData'

const initialMessage = {
  role: 'assistant',
  content: 'Hi, I am the MERNpixel assistant. How can I help with your project today?',
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
      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* WhatsApp Connect */}
        <a 
          href={business.whatsapp} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center justify-center w-12 h-12 bg-white border border-slate-200 text-slate-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-slate-50 transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(0,0,0,0.12)] cursor-pointer"
        >
          <SocialIcon network="whatsapp" className="w-6 h-6 drop-shadow-sm" />
        </a>

        {/* AI Chatbot Launcher */}
        <MotionButton
          type="button"
          className="flex items-center gap-2 bg-slate-900 text-white rounded-full px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#D349A1] transition-colors cursor-pointer"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, shadow: "0 15px 40px rgb(0,0,0,0.2)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close chatbot' : 'Open chatbot'}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-[13px] font-extrabold tracking-widest uppercase mt-0.5">{open ? 'Close Chat' : 'Chat with us'}</span>
        </MotionButton>
      </div>

      {open && (
        <motion.aside
          className="fixed bottom-24 right-6 w-[90vw] max-w-[380px] h-[550px] max-h-[80vh] bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="bg-slate-50 border-b border-slate-100 p-5">
            <p className="text-lg font-extrabold text-slate-900">MERNpixel Assistant</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Instant guidance</p>
          </header>

          <div ref={listRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-[#F8FAFB]">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] font-medium leading-relaxed ${item.role === 'user' ? 'self-end bg-slate-900 text-white rounded-br-sm' : 'self-start bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-sm'}`}>
                {item.content}
              </div>
            ))}
            {loading && <div className="self-start max-w-[85%] rounded-2xl px-4 py-3 text-[15px] font-medium leading-relaxed bg-white border border-slate-200 text-slate-400 shadow-sm rounded-bl-sm flex items-center gap-2">Thinking<span className="animate-pulse">...</span></div>}
          </div>

          {error && <p className="px-5 py-2 text-xs font-bold text-rose-500 bg-rose-50 border-t border-rose-100">{error}</p>}

          <form className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center" onSubmit={handleSend}>
            <input
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything..."
              maxLength={4000}
              disabled={loading}
            />
            <button type="submit" className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#D349A1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </motion.aside>
      )}
    </>
  )
}
