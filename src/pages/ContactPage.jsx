import { useState } from 'react'
import { motion } from 'framer-motion'
import { business, socialLinks } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', company: '', budget: '', description: '' })
  const [status, setStatus] = useState({ loading: false, message: '', isError: false })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.description) {
      setStatus({ loading: false, message: 'Please fill out your name, email, and description.', isError: true })
      return
    }

    setStatus({ loading: true, message: '', isError: false })

    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com').replace(/\/+$/, '').replace(/\/api$/, '')
      const response = await fetch(`${baseUrl}/api/mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json().catch(() => ({}))
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.')
      }

      setStatus({ loading: false, message: 'Message sent successfully! We will be in touch soon.', isError: false })
      setFormData({ name: '', email: '', phone: '', subject: '', company: '', budget: '', description: '' })
    } catch (err) {
      setStatus({ loading: false, message: 'Unable to send message. Please try again later.', isError: true })
    }
  }
  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-32 relative overflow-hidden">
      
      {/* Background Soft Mesh Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-purple-200/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-green-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] pointer-events-none z-0"></div>

      <section className="relative z-10 pt-20 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Contact Info Column */}
            <motion.div 
              className="lg:w-[45%] flex flex-col items-start"
              initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5 }}
            >
              <div className="inline-flex bg-blue-50/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 items-center border border-blue-100">
                 <span className="text-xs font-bold text-slate-800 tracking-wide">Contact</span>
              </div>

              <h1 className="text-5xl md:text-[4.5rem] font-extrabold tracking-tight text-slate-900 mb-12 leading-[1.05]">
                Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500">that performs.</span>
              </h1>

              <div className="flex flex-col gap-4 w-full md:w-[90%]">
                
                {/* Email Box */}
                <div className="bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 flex items-center gap-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Email</p>
                    <p className="text-slate-900 font-bold text-[15px]">{business.email}</p>
                  </div>
                </div>

                {/* Phone Box */}
                <div className="bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 flex items-center gap-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Phone</p>
                    <p className="text-slate-900 font-bold text-[15px]">{business.phone}</p>
                  </div>
                </div>

                {/* Location Box removed per request */}

              </div>

              {/* Social Links */}
              <div className="mt-12">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-6">Social</p>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-slate-300 transition-all shadow-sm" aria-label={link.label}>
                      <img src={`/pics/${link.label.toLowerCase()}_icon.svg`} className="w-4 h-4 object-contain" alt={link.label} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Form Column */}
            <motion.div 
              className="lg:w-[55%] xl:w-[50%] mt-8 lg:mt-0"
              initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
                
                <h2 className="text-[28px] font-bold text-slate-900 mb-2">Tell us about your project</h2>
                <p className="text-[15px] font-medium text-slate-500 mb-10">We respond within one business day.</p>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Your name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Jane Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Company</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="Optional" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Budget</label>
                      <input type="text" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} placeholder="₹50k – ₹5L+" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Phone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 9XXXXXXXXX" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">Subject</label>
                      <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Project discussion" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">What are you looking to build?</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="4" placeholder="A short description of the goal, audience and timeline." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium resize-none"></textarea>
                  </div>

                  {status.message && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${status.isError ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                      {status.message}
                    </div>
                  )}

                  <div className="pt-2">
                    <button type="submit" disabled={status.loading} className="w-full md:w-auto bg-slate-900 hover:bg-[#dc4005] disabled:opacity-50 text-white font-bold rounded-xl px-8 py-4 flex items-center justify-center gap-3 transition-colors shadow-lg shadow-slate-900/10">
                      {status.loading ? 'Sending...' : 'Send message'}
                      {!status.loading && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      )}
                    </button>
                  </div>

                </form>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
