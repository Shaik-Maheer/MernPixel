import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { sendChatMessage } from '../lib/chatApi'
import { business } from '../data/siteData'

const initialMessage = {
  role: 'assistant',
  content: 'Hi, I am the MERNpixel assistant. How can I help with your project today?',
}

export default function ChatbotWidget() {
  const MotionButton = motion.button
  const MotionAnchor = motion.a
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
  const whatsappHref = business.whatsapp || `https://wa.me/${business.phone.replace(/\D/g, '')}`

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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
        {/* WhatsApp Quick Chat */}
        <MotionAnchor
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="flex items-center justify-center w-[56px] h-[56px] rounded-full transition-transform duration-200 cursor-pointer hover:-translate-y-1"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/pics/whatsapp_icon.svg" alt="WhatsApp" className="w-[56px] h-[56px] object-contain" />
        </MotionAnchor>

        {/* AI Chatbot Launcher */}
        <MotionButton
          type="button"
          className="flex items-center justify-center w-[56px] h-[56px] bg-slate-900 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#E15D2B] transition-all cursor-pointer hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(225,93,43,0.25)]"
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close chatbot' : 'Open chatbot'}
          title={open ? "Close Chat" : "Chat with us"}
        >
          {open ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
             <svg width="29" height="29" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
               <path
                 d="M7.5 11.2C7.5 8.74 9.5 6.75 11.95 6.75H17.85C20.31 6.75 22.3 8.74 22.3 11.2V15.2C22.3 17.66 20.31 19.65 17.85 19.65H13.35L9.3 22.65L10.2 19.65C8.66 19.04 7.5 17.47 7.5 15.7V11.2Z"
                 stroke="currentColor"
                 strokeWidth="2"
                 strokeLinecap="round"
                 strokeLinejoin="round"
               />
               <circle cx="13.15" cy="13.2" r="1.1" fill="currentColor" />
               <circle cx="16.65" cy="13.2" r="1.1" fill="currentColor" />
               <path
                 d="M21.9 5.2L22.55 6.7L24.05 7.35L22.55 8L21.9 9.5L21.25 8L19.75 7.35L21.25 6.7L21.9 5.2Z"
                 fill="currentColor"
               />
             </svg>
          )}
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
          <header className="bg-slate-50 border-b border-slate-100 p-5 relative">
            <div className="pr-8">
              <p className="text-lg font-extrabold text-slate-900">MERNpixel Assistant</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Instant guidance</p>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200/50"
              aria-label="Close Chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
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
            <button type="submit" className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#E15D2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </motion.aside>
      )}
    </>
  )
}
