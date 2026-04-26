import { useState, useEffect } from 'react'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com').replace(/\/+$/, '').replace(/\/api$/, '')

export default function BookPage() {
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [formData, setFormData] = useState({ clientName: '', clientEmail: '', clientVision: '' })
  const [status, setStatus] = useState({ loading: false, message: '', error: false })

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/bookings`)
      .then(res => res.json())
      .then(data => {
         // Only show available slots (isBooked === false)
         setSlots(data.filter(s => !s.isBooked))
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedSlot) {
      setStatus({ loading: false, message: 'Please select a time slot first.', error: true })
      return
    }

    setStatus({ loading: true, message: '', error: false })

    try {
      const res = await fetch(`${baseUrl}/api/admin/bookings/${selectedSlot._id}/book`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setStatus({ loading: false, message: 'Session requested! We will email you the Google Meet link upon approval.', error: false })
        setFormData({ clientName: '', clientEmail: '', clientVision: '' })
        setSelectedSlot(null)
        setSlots(slots.filter(s => s._id !== selectedSlot._id))
      } else {
        setStatus({ loading: false, message: 'Failed to book slot.', error: true })
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Network error.', error: true })
    }
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 text-center">Book a Session</h1>
        <p className="text-lg text-slate-500 font-medium mb-12 text-center">Discuss your architecture and bring your vision into real life.</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 border border-slate-200 shadow-xl rounded-3xl">
           
           <div className="mb-10">
             <label className="block text-sm font-bold text-slate-900 mb-4">Available Slots</label>
             {slots.length === 0 ? (
               <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
                 <p className="font-bold text-slate-500">No open slots available currently. Please check back later.</p>
               </div>
             ) : (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {slots.map(slot => (
                    <button 
                       key={slot._id} type="button" 
                       onClick={() => setSelectedSlot(slot)}
                       className={`px-4 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${selectedSlot?._id === slot._id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'}`}
                    >
                       <div className="block mb-1">{slot.date}</div>
                       <div className="text-xs tracking-widest opacity-80">{slot.time}</div>
                    </button>
                 ))}
               </div>
             )}
           </div>

           <div className="space-y-6">
              <div>
                 <label className="block text-sm font-bold text-slate-900 mb-2">Your Name</label>
                 <input value={formData.clientName} onChange={e=>setFormData({...formData, clientName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-500" required />
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                 <input type="email" value={formData.clientEmail} onChange={e=>setFormData({...formData, clientEmail: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-500" required />
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-900 mb-2">What's your vision?</label>
                 <textarea value={formData.clientVision} onChange={e=>setFormData({...formData, clientVision: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-500" rows="3" required></textarea>
              </div>
           </div>

           {status.message && (
              <div className={`mt-8 p-4 rounded-xl text-sm font-bold ${status.error ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                 {status.message}
              </div>
           )}

           <button type="submit" disabled={status.loading || slots.length === 0} className="mt-8 w-full bg-[#1877F2] hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
              {status.loading ? 'Requesting...' : 'Request Session Booking'}
           </button>
        </form>
      </div>
    </main>
  )
}
