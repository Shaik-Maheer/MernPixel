import { useState, useEffect } from 'react'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com').replace(/\/+$/, '')

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
  
  if (!token) {
    return <AdminLogin setToken={setToken} />
  }

  return <AdminDashboard token={token} setToken={setToken} />
}

function AdminLogin({ setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('adminToken', data.token)
        setToken(data.token)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-8 text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-blue-500" required />
          </div>
          {error && <p className="text-rose-500 text-sm font-bold">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl mt-2 transition-colors">Access Portal</button>
        </form>
      </div>
    </div>
  )
}

function AdminDashboard({ token, setToken }) {
  const [activeTab, setActiveTab] = useState('forms')

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <h2 className="text-xl font-black mb-10 tracking-widest uppercase text-blue-400">MERNpixel CMS</h2>
        <nav className="flex flex-col gap-2 flex-grow">
          {['forms', 'bookings', 'clients', 'blogs'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-left px-4 py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="mt-auto px-4 py-3 text-left text-sm font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg">LOGOUT</button>
      </aside>

      <main className="flex-1 p-10 h-screen overflow-y-auto">
        {activeTab === 'forms' && <FormsPanel token={token} />}
        {activeTab === 'clients' && <ClientsPanel token={token} />}
        {activeTab === 'blogs' && <BlogsPanel token={token} />}
        {activeTab === 'bookings' && <BookingsPanel token={token} />}
      </main>
    </div>
  )
}

function FormsPanel({ token }) {
  const [forms, setForms] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/contacts`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(setForms).catch(console.error)
  }, [token])

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Contact Inquiries</h2>
      <div className="grid gap-6">
        {forms.map(form => (
          <div key={form._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{form.name}</h3>
                <p className="text-sm font-bold text-slate-500">{form.email}</p>
              </div>
              <span className="text-xs font-bold text-slate-400">{new Date(form.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-slate-700 font-medium mb-4">{form.description}</p>
            <div className="flex gap-4">
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Budget: {form.budget || 'N/A'}</span>
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Company: {form.company || 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClientsPanel({ token }) {
  const [clients, setClients] = useState([])
  const [name, setName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  const fetchClients = () => {
    fetch(`${baseUrl}/api/admin/clients`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(setClients).catch(console.error)
  }

  useEffect(() => { fetchClients() }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/api/admin/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name, logoUrl, position: clients.length })
    })
    setName(''); setLogoUrl(''); fetchClients()
  }

  const handleDelete = async (id) => {
    await fetch(`${baseUrl}/api/admin/clients/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    fetchClients()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Manage Clients</h2>
      
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-bold text-slate-700 mb-2">Client Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" required />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold text-slate-700 mb-2">Logo URL (or /clients/logo.png)</label>
          <input value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-xl h-[42px]">Add Client</button>
      </form>

      <div className="grid grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
            <img src={client.logoUrl} alt={client.name} className="h-16 object-contain mb-4" />
            <h3 className="font-bold text-slate-900 text-center mb-4">{client.name}</h3>
            <button onClick={() => handleDelete(client._id)} className="text-xs font-bold text-rose-500 bg-rose-50 px-4 py-2 rounded-full w-full">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogsPanel({ token }) {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [description, setDescription] = useState('')

  const fetchBlogs = () => {
    fetch(`${baseUrl}/api/admin/blogs`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(setBlogs).catch(console.error)
  }

  useEffect(() => { fetchBlogs() }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/api/admin/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ title, videoUrl, description })
    })
    setTitle(''); setVideoUrl(''); setDescription(''); fetchBlogs()
  }

  const handleDelete = async (id) => {
    await fetch(`${baseUrl}/api/admin/blogs/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
    fetchBlogs()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Manage Blogs & Videos</h2>
      
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Video URL</label>
            <input value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" required />
          </div>
        </div>
        <div>
           <label className="block text-sm font-bold text-slate-700 mb-2">Description / Matter</label>
           <textarea value={description} onChange={e=>setDescription(e.target.value)} rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" required></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl w-full">Post Blog Video</button>
      </form>

      <div className="grid grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-2">{blog.title}</h3>
            <p className="text-sm font-bold text-blue-500 mb-4 truncate">{blog.videoUrl}</p>
            <p className="text-sm text-slate-600 mb-6">{blog.description}</p>
            <button onClick={() => handleDelete(blog._id)} className="text-xs font-bold text-rose-500 bg-rose-50 px-4 py-2 rounded-full w-full">Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function BookingsPanel({ token }) {
  const [slots, setSlots] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [meetLink, setMeetLink] = useState('')

  const fetchSlots = () => {
    fetch(`${baseUrl}/api/admin/bookings`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json()).then(setSlots).catch(console.error)
  }

  useEffect(() => { fetchSlots() }, [token])

  const handleAddSlot = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/api/admin/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ date, time })
    })
    setDate(''); setTime(''); fetchSlots()
  }

  const handleApprove = async (id) => {
    if(!meetLink) return alert("Enter Meet Link below first!")
    await fetch(`${baseUrl}/api/admin/bookings/${id}/approve`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ meetLink })
    })
    setMeetLink(''); fetchSlots()
  }

  const handleDelete = async (id) => {
    await fetch(`${baseUrl}/api/admin/bookings/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
    fetchSlots()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Session Bookings</h2>
      
      <form onSubmit={handleAddSlot} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-bold text-slate-700 mb-2">Available Date (YYYY-MM-DD)</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" required />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold text-slate-700 mb-2">Time (e.g. 10:00 AM)</label>
          <input type="text" value={time} onChange={e=>setTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" placeholder="Ex: 14:00" required />
        </div>
        <button type="submit" className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-xl h-[42px]">Create Open Slot</button>
      </form>

      <div className="mb-6 flex gap-4 align-center bg-blue-50 p-4 rounded-xl border border-blue-100">
         <input value={meetLink} onChange={e=>setMeetLink(e.target.value)} placeholder="Google Meet Link for Approvals" className="flex-1 bg-white border border-blue-200 rounded-lg px-4" />
         <span className="text-sm font-bold text-blue-600 self-center">Fill this right before approving a request!</span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {slots.map(slot => (
          <div key={slot._id} className={`bg-white p-6 rounded-2xl border shadow-sm ${slot.isBooked ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-slate-900 text-xl">{slot.date} @ {slot.time}</h3>
              <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${slot.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : slot.isBooked ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                {slot.isBooked ? slot.status : 'OPEN'}
              </span>
            </div>
            
            {slot.isBooked && (
              <div className="bg-slate-50 p-4 rounded-xl mb-4 text-sm">
                <p className="font-bold text-slate-900">{slot.clientName}</p>
                <p className="font-bold text-slate-500 mb-2">{slot.clientEmail}</p>
                <p className="text-slate-700 font-medium">{slot.clientVision}</p>
              </div>
            )}

            <div className="flex gap-2">
               {slot.isBooked && slot.status === 'pending' && (
                 <button onClick={() => handleApprove(slot._id)} className="flex-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full">Approve & Email Match</button>
               )}
               <button onClick={() => handleDelete(slot._id)} className="text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full">Delete Slot</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
