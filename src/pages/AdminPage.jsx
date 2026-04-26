import { useEffect, useState } from 'react'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '')

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
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }
      localStorage.setItem('adminToken', data.token)
      setToken(data.token)
    } catch {
      setError('Server error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-3 text-center">Admin Access</h1>
        <p className="text-sm text-slate-500 text-center mb-8">Use your fixed admin credentials.</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#dc4005]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#dc4005]"
              required
            />
          </div>
          {error && <p className="text-rose-500 text-sm font-bold">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 hover:bg-[#dc4005] text-white font-bold py-4 rounded-xl mt-2 transition-colors">
            Access Portal
          </button>
        </form>
      </div>
    </div>
  )
}

function AdminDashboard({ token, setToken }) {
  const [activeTab, setActiveTab] = useState('forms')

  const tabs = ['forms', 'bookings', 'clients', 'blogs', 'students']

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <h2 className="text-xl font-black mb-10 tracking-widest uppercase text-[#dc4005]">MERNpixel CMS</h2>
        <nav className="flex flex-col gap-2 flex-grow">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-colors ${
                activeTab === tab ? 'bg-[#dc4005] text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="mt-auto px-4 py-3 text-left text-sm font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg">
          LOGOUT
        </button>
      </aside>

      <main className="flex-1 p-10 h-screen overflow-y-auto">
        {activeTab === 'forms' && <FormsPanel token={token} />}
        {activeTab === 'clients' && <ClientsPanel token={token} />}
        {activeTab === 'blogs' && <BlogsPanel token={token} />}
        {activeTab === 'bookings' && <BookingsPanel token={token} />}
        {activeTab === 'students' && <StudentsPanel token={token} />}
      </main>
    </div>
  )
}

async function adminFetch(token, path, options = {}) {
  const headers = { ...(options.headers || {}), Authorization: `Bearer ${token}` }
  const res = await fetch(`${baseUrl}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Request failed')
  }
  return data
}

function FormsPanel({ token }) {
  const [forms, setForms] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const loadForms = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('status', statusFilter)
      if (query.trim()) params.set('q', query.trim())
      const data = await adminFetch(token, `/api/admin/contacts?${params.toString()}`)
      setForms(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadForms()
  }, [token, statusFilter])

  const updateStatus = async (id, status) => {
    await adminFetch(token, `/api/admin/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    loadForms()
  }

  const removeContact = async (id) => {
    await adminFetch(token, `/api/admin/contacts/${id}`, { method: 'DELETE' })
    loadForms()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Contact Inbox</h2>
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email or subject"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
        <button onClick={loadForms} className="bg-slate-900 hover:bg-[#dc4005] text-white font-bold py-2 px-5 rounded-xl transition-colors">
          Search
        </button>
      </div>

      {loading && <p className="text-slate-500 font-bold">Loading contacts...</p>}

      <div className="grid gap-6">
        {forms.map((form) => (
          <div key={form._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap justify-between gap-4 items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{form.name}</h3>
                <p className="text-sm font-bold text-slate-500">{form.email}</p>
                {form.phone && <p className="text-xs font-semibold text-slate-500 mt-1">{form.phone}</p>}
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400">{new Date(form.createdAt).toLocaleString()}</span>
                <p className="mt-2 text-xs inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold uppercase">{form.status || 'new'}</p>
              </div>
            </div>

            {form.subject && <p className="text-sm font-bold text-slate-800 mb-2">Subject: {form.subject}</p>}
            <p className="text-sm text-slate-700 font-medium mb-4">{form.description}</p>
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Budget: {form.budget || 'N/A'}</span>
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Company: {form.company || 'N/A'}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => updateStatus(form._id, 'read')} className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-2 rounded-full">
                Mark Read
              </button>
              <button onClick={() => updateStatus(form._id, 'replied')} className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-2 rounded-full">
                Mark Replied
              </button>
              <button onClick={() => updateStatus(form._id, 'archived')} className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-2 rounded-full">
                Archive
              </button>
              <button onClick={() => removeContact(form._id)} className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-2 rounded-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClientsPanel({ token }) {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({ name: '', logoUrl: '', website: '', active: true })

  const fetchClients = async () => {
    const data = await adminFetch(token, '/api/admin/clients')
    setClients(data)
  }

  useEffect(() => {
    fetchClients().catch(console.error)
  }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    await adminFetch(token, '/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, position: clients.length }),
    })
    setForm({ name: '', logoUrl: '', website: '', active: true })
    fetchClients()
  }

  const toggleActive = async (client) => {
    await adminFetch(token, `/api/admin/clients/${client._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !client.active }),
    })
    fetchClients()
  }

  const handleDelete = async (id) => {
    await adminFetch(token, `/api/admin/clients/${id}`, { method: 'DELETE' })
    fetchClients()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Manage Clients</h2>
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Client Name"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          required
        />
        <input
          value={form.logoUrl}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          placeholder="Logo URL"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          required
        />
        <input
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          placeholder="Website URL (optional)"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        />
        <label className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>
        <button type="submit" className="md:col-span-2 bg-slate-900 hover:bg-[#dc4005] text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Add Client
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
            <img src={client.logoUrl} alt={client.name} className="h-16 object-contain mb-4" />
            <h3 className="font-bold text-slate-900 text-center">{client.name}</h3>
            {client.website && (
              <a href={client.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-bold mt-2 break-all text-center">
                {client.website}
              </a>
            )}
            <p className={`mt-3 text-[11px] font-bold uppercase tracking-widest ${client.active ? 'text-emerald-600' : 'text-slate-400'}`}>
              {client.active ? 'Active' : 'Inactive'}
            </p>
            <div className="mt-4 flex gap-2 w-full">
              <button onClick={() => toggleActive(client)} className="flex-1 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                Toggle
              </button>
              <button onClick={() => handleDelete(client._id)} className="flex-1 text-xs font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogsPanel({ token }) {
  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState({ title: '', videoUrl: '', description: '', tags: '', status: 'draft' })

  const fetchBlogs = async () => {
    const data = await adminFetch(token, '/api/admin/blogs')
    setBlogs(data)
  }

  useEffect(() => {
    fetchBlogs().catch(console.error)
  }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    await adminFetch(token, '/api/admin/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ title: '', videoUrl: '', description: '', tags: '', status: 'draft' })
    fetchBlogs()
  }

  const toggleStatus = async (blog) => {
    await adminFetch(token, `/api/admin/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: blog.status === 'published' ? 'draft' : 'published' }),
    })
    fetchBlogs()
  }

  const handleDelete = async (id) => {
    await adminFetch(token, `/api/admin/blogs/${id}`, { method: 'DELETE' })
    fetchBlogs()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Manage Blogs</h2>
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col gap-4">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          required
        />
        <input
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          placeholder="Video URL"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          placeholder="Description"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          required
        />
        <input
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="Tags (comma separated)"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit" className="bg-slate-900 hover:bg-[#dc4005] text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Save Blog
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-2">{blog.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{blog.description}</p>
            <div className="flex gap-2 mb-4">
              <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full ${blog.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {blog.status || 'draft'}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleStatus(blog)} className="flex-1 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                Toggle Publish
              </button>
              <button onClick={() => handleDelete(blog._id)} className="flex-1 text-xs font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-full">
                Delete
              </button>
            </div>
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

  const fetchSlots = async () => {
    const data = await adminFetch(token, '/api/admin/bookings')
    setSlots(data)
  }

  useEffect(() => {
    fetchSlots().catch(console.error)
  }, [token])

  const handleAddSlot = async (e) => {
    e.preventDefault()
    await adminFetch(token, '/api/admin/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, time }),
    })
    setDate('')
    setTime('')
    fetchSlots()
  }

  const updateStatus = async (slot, status) => {
    await adminFetch(token, `/api/admin/bookings/${slot._id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, meetLink: meetLink || slot.meetLink || '' }),
    })
    setMeetLink('')
    fetchSlots()
  }

  const handleDelete = async (id) => {
    await adminFetch(token, `/api/admin/bookings/${id}`, { method: 'DELETE' })
    fetchSlots()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Session Bookings</h2>
      <form onSubmit={handleAddSlot} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" required />
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="10:00 AM" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" required />
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Create Slot
        </button>
      </form>

      <div className="mb-6 bg-orange-50 border border-orange-100 p-4 rounded-xl">
        <input
          value={meetLink}
          onChange={(e) => setMeetLink(e.target.value)}
          placeholder="Google Meet Link (optional for confirmation)"
          className="w-full bg-white border border-orange-200 rounded-lg px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map((slot) => (
          <div key={slot._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-slate-900 text-xl">
                {slot.date} @ {slot.time}
              </h3>
              <span className="text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {slot.status}
              </span>
            </div>

            {slot.isBooked ? (
              <div className="bg-slate-50 p-4 rounded-xl mb-4 text-sm">
                <p className="font-bold text-slate-900">{slot.clientName}</p>
                <p className="font-semibold text-slate-600">{slot.clientEmail}</p>
                {slot.clientPhone && <p className="font-semibold text-slate-600">{slot.clientPhone}</p>}
                <p className="text-slate-700 font-medium mt-2">{slot.clientTopic}</p>
              </div>
            ) : (
              <p className="text-sm font-bold text-emerald-600 mb-4">Open Slot</p>
            )}

            <div className="flex flex-wrap gap-2">
              {slot.isBooked && slot.status === 'pending' && (
                <button onClick={() => updateStatus(slot, 'confirmed')} className="text-xs font-bold text-white bg-[#dc4005] px-4 py-2 rounded-full">
                  Confirm
                </button>
              )}
              {slot.isBooked && slot.status === 'confirmed' && (
                <button onClick={() => updateStatus(slot, 'completed')} className="text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-full">
                  Mark Completed
                </button>
              )}
              {slot.isBooked && slot.status !== 'cancelled' && (
                <button onClick={() => updateStatus(slot, 'cancelled')} className="text-xs font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-full">
                  Cancel
                </button>
              )}
              <button onClick={() => handleDelete(slot._id)} className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const emptyStudentForm = {
  studentName: '',
  college: '',
  projectTitle: '',
  problemStatement: '',
  solutionDescription: '',
  techStack: '',
  keyLearnings: '',
  screenshots: '',
  documentationUrl: '',
  pptUrl: '',
  codeZipUrl: '',
  videoUrl: '',
  githubLink: '',
  liveLink: '',
  active: true,
}

function StudentsPanel({ token }) {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyStudentForm)

  const fetchProjects = async () => {
    const data = await adminFetch(token, '/api/admin/student-projects')
    setProjects(data)
  }

  useEffect(() => {
    fetchProjects().catch(console.error)
  }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    await adminFetch(token, '/api/admin/student-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm(emptyStudentForm)
    fetchProjects()
  }

  const toggleActive = async (project) => {
    await adminFetch(token, `/api/admin/student-projects/${project._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !project.active }),
    })
    fetchProjects()
  }

  const handleDelete = async (id) => {
    await adminFetch(token, `/api/admin/student-projects/${id}`, { method: 'DELETE' })
    fetchProjects()
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-8">Student Projects</h2>
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Student Name" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" required />
        <input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} placeholder="College" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" required />
        <input value={form.projectTitle} onChange={(e) => setForm({ ...form, projectTitle: e.target.value })} placeholder="Project Title" className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" required />
        <textarea value={form.problemStatement} onChange={(e) => setForm({ ...form, problemStatement: e.target.value })} placeholder="Problem Statement" className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" rows={2} />
        <textarea value={form.solutionDescription} onChange={(e) => setForm({ ...form, solutionDescription: e.target.value })} placeholder="Solution Description" className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" rows={3} />
        <input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="Tech Stack (comma separated)" className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
        <textarea value={form.keyLearnings} onChange={(e) => setForm({ ...form, keyLearnings: e.target.value })} placeholder="Key Learnings" className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" rows={2} />
        <textarea value={form.screenshots} onChange={(e) => setForm({ ...form, screenshots: e.target.value })} placeholder="Screenshot URLs (one per line)" className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" rows={2} />
        <input value={form.documentationUrl} onChange={(e) => setForm({ ...form, documentationUrl: e.target.value })} placeholder="Documentation URL" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
        <input value={form.pptUrl} onChange={(e) => setForm({ ...form, pptUrl: e.target.value })} placeholder="PPT URL" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
        <input value={form.codeZipUrl} onChange={(e) => setForm({ ...form, codeZipUrl: e.target.value })} placeholder="Code ZIP URL" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
        <input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="Video URL" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
        <input value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} placeholder="GitHub Link" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
        <input value={form.liveLink} onChange={(e) => setForm({ ...form, liveLink: e.target.value })} placeholder="Live Link" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
        <label className="md:col-span-2 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>
        <button type="submit" className="md:col-span-2 bg-slate-900 hover:bg-[#dc4005] text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Save Student Project
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg">{project.projectTitle}</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              {project.studentName} - {project.college}
            </p>
            <p className={`mt-3 text-[11px] font-bold uppercase tracking-widest ${project.active ? 'text-emerald-600' : 'text-slate-400'}`}>
              {project.active ? 'Active' : 'Inactive'}
            </p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => toggleActive(project)} className="flex-1 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                Toggle
              </button>
              <button onClick={() => handleDelete(project._id)} className="flex-1 text-xs font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
