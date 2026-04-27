import { useEffect, useState } from 'react'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '')

const defaultTeamMembers = [
  {
    name: 'Manohar Bassapagari',
    role: 'Full Stack Lead',
    photo: 'https://ui-avatars.com/api/?name=Manohar+Bassapagari&background=005461&color=F4F4F4&size=512&bold=true',
    linkedin: 'https://www.linkedin.com/in/manohar-basappagari-398606335/',
    bio: 'Leads architecture quality and full-stack execution across all client products.',
  },
  {
    name: 'Shaik Maheer',
    role: 'UI/UX & Brand Designer',
    photo: 'https://ui-avatars.com/api/?name=Shaik+Maheer&background=018790&color=F4F4F4&size=512&bold=true',
    linkedin: 'https://www.linkedin.com/in/shaik-maheer-66b8a5275/',
    bio: 'Owns brand direction, interface quality, and visual identity systems.',
  },
  {
    name: 'Shaik Nishar Basha',
    role: 'Frontend Engineer',
    photo: 'https://ui-avatars.com/api/?name=Shaik+Nishar+Basha&background=00B7B5&color=005461&size=512&bold=true',
    linkedin: 'https://www.linkedin.com/in/shaiknisharbasha/',
    bio: 'Builds performant, polished, and responsive frontend experiences.',
  },
  {
    name: 'P. Sidda Reddy',
    role: 'Growth & Consulting',
    photo: 'https://ui-avatars.com/api/?name=P+Sidda+Reddy&background=005461&color=F4F4F4&size=512&bold=true',
    linkedin: 'https://www.linkedin.com/in/sidda-reddy/',
    bio: 'Aligns business strategy, consulting flow, and client growth priorities.',
  },
]

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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const tabs = ['forms', 'bookings', 'clients', 'team', 'blogs', 'gallery']

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-slate-900 text-white flex flex-col p-6 z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-black tracking-widest uppercase text-[#dc4005]">MERNpixel CMS</h2>
          <button
            type="button"
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
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

      <main className="flex-1 p-4 md:p-10 h-screen overflow-y-auto">
        <div className="md:hidden mb-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Menu
          </button>
        </div>
        {activeTab === 'forms' && <FormsPanel token={token} />}
        {activeTab === 'clients' && <ClientsPanel token={token} />}
        {activeTab === 'team' && <TeamPanel token={token} />}
        {activeTab === 'blogs' && <BlogsPanel token={token} />}
        {activeTab === 'gallery' && <GalleryPanel token={token} />}
        {activeTab === 'bookings' && <BookingsPanel token={token} />}
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
  const [filterSection, setFilterSection] = useState('all')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState('')
  const [form, setForm] = useState({
    name: '',
    logoUrl: '',
    website: '',
    section: 'home',
    sourceMode: 'upload',
  })
  const [editForm, setEditForm] = useState({
    name: '',
    logoUrl: '',
    website: '',
    section: 'home',
    sourceMode: 'upload',
  })

  const sections = [
    { value: 'home', label: 'Home Page' },
    { value: 'services', label: 'Services Page' },
  ]

  const normalizeSection = (value) => (value === 'services' ? 'services' : 'home')

  const toDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = () => reject(new Error('Failed to read logo file.'))
      reader.readAsDataURL(file)
    })

  const fetchClients = async () => {
    const data = await adminFetch(token, '/api/admin/clients')
    setClients(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    fetchClients().catch(console.error)
  }, [token])

  const visibleClients = clients.filter((client) => {
    if (filterSection === 'all') return true
    return normalizeSection(client.section) === filterSection
  })

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const nextPosition =
      visibleClients.reduce((max, client) => Math.max(max, Number(client.position) || 0), -1) + 1

    try {
      await adminFetch(token, '/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          logoUrl: form.logoUrl,
          website: form.website.trim(),
          section: normalizeSection(form.section),
          active: true,
          position: nextPosition,
        }),
      })
      setForm({
        name: '',
        logoUrl: '',
        website: '',
        section: form.section,
        sourceMode: form.sourceMode,
      })
      await fetchClients()
    } catch (saveError) {
      setError(saveError.message || 'Failed to add client logo.')
    } finally {
      setSaving(false)
    }
  }

  const reorderClients = async (ids) => {
    if (!ids.length) return
    setSaving(true)
    setError('')
    try {
      const data = await adminFetch(token, '/api/admin/clients/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      setClients(Array.isArray(data) ? data : clients)
    } catch (reorderError) {
      setError(reorderError.message || 'Failed to reorder clients.')
      await fetchClients()
    } finally {
      setSaving(false)
    }
  }

  const moveClient = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= visibleClients.length) return

    const ids = visibleClients.map((client) => client._id)
    const swapped = [...ids]
    const temp = swapped[index]
    swapped[index] = swapped[targetIndex]
    swapped[targetIndex] = temp

    await reorderClients(swapped)
  }

  const handleDelete = async (id) => {
    setSaving(true)
    setError('')
    try {
      await adminFetch(token, `/api/admin/clients/${id}`, { method: 'DELETE' })
      await fetchClients()
    } catch (deleteError) {
      setError(deleteError.message || 'Failed to delete client.')
    } finally {
      setSaving(false)
    }
  }

  const startReplace = (client) => {
    setEditingId(client._id)
    setEditForm({
      name: client.name || '',
      logoUrl: client.logoUrl || '',
      website: client.website || '',
      section: normalizeSection(client.section),
      sourceMode: 'upload',
    })
  }

  const saveReplace = async (id) => {
    setSaving(true)
    setError('')
    try {
      await adminFetch(token, `/api/admin/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name.trim() || 'Client',
          logoUrl: editForm.logoUrl,
          website: editForm.website.trim(),
          section: normalizeSection(editForm.section),
        }),
      })
      setEditingId('')
      await fetchClients()
    } catch (updateError) {
      setError(updateError.message || 'Failed to update client.')
    } finally {
      setSaving(false)
    }
  }

  const handleMobileAction = (action, client, index) => {
    if (!action) return
    if (action === 'up') moveClient(index, -1).catch(console.error)
    if (action === 'down') moveClient(index, 1).catch(console.error)
    if (action === 'replace') startReplace(client)
    if (action === 'delete') handleDelete(client._id).catch(console.error)
  }

  const handleSourceUpload = async (file, mode = 'create') => {
    if (!file) return
    try {
      const logoUrl = await toDataUrl(file)
      if (mode === 'edit') {
        setEditForm((prev) => ({
          ...prev,
          logoUrl,
          name: prev.name || file.name.replace(/\.[^/.]+$/, ''),
        }))
        return
      }
      setForm((prev) => ({
        ...prev,
        logoUrl,
        name: prev.name || file.name.replace(/\.[^/.]+$/, ''),
      }))
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to read logo file.')
    }
  }

  const getSectionLabel = (value) =>
    sections.find((item) => item.value === normalizeSection(value))?.label || 'Home Page'

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-3">Manage Clients</h2>
      <p className="text-slate-600 mb-8 text-sm">Upload logos, assign page section, reorder with move up/down, replace, or delete.</p>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={form.section}
          onChange={(e) => setForm({ ...form, section: e.target.value })}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          {sections.map((section) => (
            <option key={section.value} value={section.value}>
              {section.label}
            </option>
          ))}
        </select>
        <select
          value={form.sourceMode}
          onChange={(e) => setForm({ ...form, sourceMode: e.target.value })}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          <option value="upload">Upload from device</option>
          <option value="url">Use logo URL</option>
        </select>

        {form.sourceMode === 'upload' ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleSourceUpload(e.target.files?.[0])}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:col-span-2"
            required={!form.logoUrl}
          />
        ) : (
          <input
            value={form.logoUrl}
            onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            placeholder="Logo URL"
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:col-span-2"
            required
          />
        )}

        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Client name (optional)"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        />
        <input
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          placeholder="Website URL (optional)"
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          disabled={saving || !form.logoUrl}
          className="md:col-span-2 bg-slate-900 hover:bg-[#dc4005] text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Add Client Logo'}
        </button>
      </form>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">Manage Section</label>
        <select
          value={filterSection}
          onChange={(e) => setFilterSection(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full md:w-72"
        >
          <option value="all">All Sections</option>
          {sections.map((section) => (
            <option key={section.value} value={section.value}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-rose-600 font-bold mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleClients.map((client, index) => (
          <div key={client._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-full h-24 rounded-xl bg-slate-50 border border-slate-100 mb-4 flex items-center justify-center p-3">
              <img src={client.logoUrl} alt={client.name || 'Client logo'} className="max-h-full object-contain" />
            </div>

            <h3 className="font-black text-slate-900 text-sm break-all">{client.name || 'Client'}</h3>
            <p className="text-[11px] uppercase tracking-widest text-slate-500 mt-2">{getSectionLabel(client.section)}</p>
            {client.website ? <p className="text-xs text-blue-700 mt-2 break-all">{client.website}</p> : null}

            {editingId === client._id ? (
              <div className="mt-4 space-y-3">
                <select
                  value={editForm.section}
                  onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                >
                  {sections.map((section) => (
                    <option key={section.value} value={section.value}>
                      {section.label}
                    </option>
                  ))}
                </select>
                <select
                  value={editForm.sourceMode}
                  onChange={(e) => setEditForm({ ...editForm, sourceMode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                >
                  <option value="upload">Upload replacement logo</option>
                  <option value="url">Replace with URL</option>
                </select>
                {editForm.sourceMode === 'upload' ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSourceUpload(e.target.files?.[0], 'edit')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                  />
                ) : (
                  <input
                    value={editForm.logoUrl}
                    onChange={(e) => setEditForm({ ...editForm, logoUrl: e.target.value })}
                    placeholder="Logo URL"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                    required
                  />
                )}
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Client name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                />
                <input
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  placeholder="Website URL"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => saveReplace(client._id)}
                    className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-2 rounded-full"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId('')}
                    className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="hidden sm:grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => moveClient(index, -1)}
                    className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-2 rounded-full"
                  >
                    Move Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveClient(index, 1)}
                    className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-2 rounded-full"
                  >
                    Move Down
                  </button>
                  <button
                    type="button"
                    onClick={() => startReplace(client)}
                    className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-2 rounded-full"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(client._id)}
                    className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-2 rounded-full"
                  >
                    Delete
                  </button>
                </div>
                <select
                  value=""
                  onChange={(e) => {
                    handleMobileAction(e.target.value, client, index)
                    e.target.value = ''
                  }}
                  className="sm:hidden w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                >
                  <option value="">Actions...</option>
                  <option value="up">Move Up</option>
                  <option value="down">Move Down</option>
                  <option value="replace">Replace</option>
                  <option value="delete">Delete</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamPanel({ token }) {
  const [members, setMembers] = useState(defaultTeamMembers)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const toDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = () => reject(new Error('Failed to read image file.'))
      reader.readAsDataURL(file)
    })

  const normalizeTeamMember = (member = {}, index = 0) => {
    const fallback = defaultTeamMembers[index] || defaultTeamMembers[0]
    return {
      ...fallback,
      ...member,
      name: String(member?.name || fallback.name || '').trim() || fallback.name,
      photo: String(member?.photo || fallback.photo || '').trim() || fallback.photo,
      role: String(member?.role || fallback.role || '').trim() || fallback.role,
      linkedin: String(member?.linkedin || fallback.linkedin || '').trim() || fallback.linkedin,
      bio: String(member?.bio || fallback.bio || '').trim() || fallback.bio,
    }
  }

  const normalizeTeamMembers = (input) =>
    defaultTeamMembers.map((fallback, index) => normalizeTeamMember(Array.isArray(input) ? input[index] : fallback, index))

  const fetchTeam = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch(token, '/api/admin/team')
      setMembers(normalizeTeamMembers(data))
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to load team members.')
      setMembers(defaultTeamMembers)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeam().catch(console.error)
  }, [token])

  const updateMember = (index, patch) => {
    setMembers((prev) => prev.map((member, memberIndex) => (memberIndex === index ? { ...member, ...patch } : member)))
  }

  const handlePhotoUpload = async (index, file) => {
    if (!file) return
    setError('')
    if (!String(file.type || '').startsWith('image/')) {
      setError('Please upload only image files for team photos.')
      return
    }
    try {
      const photo = await toDataUrl(file)
      updateMember(index, {
        photo,
        name: members[index]?.name || file.name.replace(/\.[^/.]+$/, ''),
      })
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to read team image.')
    }
  }

  const handleSaveTeam = async () => {
    setSaving(true)
    setError('')
    try {
      const payload = normalizeTeamMembers(members)
      const missingName = payload.find((member) => !String(member.name || '').trim())
      if (missingName) {
        throw new Error('Each team member must have a name.')
      }
      const missingPhoto = payload.find((member) => !String(member.photo || '').trim())
      if (missingPhoto) {
        throw new Error('Each team member must have a photo.')
      }

      const data = await adminFetch(token, '/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: payload }),
      })
      setMembers(normalizeTeamMembers(data))
    } catch (saveError) {
      setError(saveError.message || 'Failed to save team members.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-3">Manage Team</h2>
      <p className="text-slate-600 mb-8 text-sm">
        Update all 4 team member names and photos. Upload from device and save once to replace directly on the About page.
      </p>

      {error && <p className="text-sm text-rose-600 font-bold mb-4">{error}</p>}
      {loading && <p className="text-slate-500 font-bold mb-4">Loading team members...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member, index) => (
          <div key={`team-member-${index}`} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 mb-4">
              <img src={member.photo} alt={member.name || `Team Member ${index + 1}`} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Member {index + 1}</p>
            <input
              value={member.name || ''}
              onChange={(e) => updateMember(index, { name: e.target.value })}
              placeholder="Team member name"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 mb-3"
            />
            <label className="block text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(index, e.target.files?.[0])}
                className="mt-2 block w-full text-sm font-medium text-slate-700"
              />
            </label>
            <p className="text-xs text-slate-500 mt-3 font-semibold">Role: {member.role}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSaveTeam}
        disabled={saving}
        className="mt-6 bg-slate-900 hover:bg-[#dc4005] disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-colors"
      >
        {saving ? 'Saving Team...' : 'Save Team'}
      </button>
    </div>
  )
}

function BlogsPanel({ token }) {
  const [blogs, setBlogs] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    videoUrl: '',
    description: '',
    tags: '',
    status: 'published',
    sourceMode: 'upload',
    isFeatured: false,
    isLatest: true,
  })

  const toDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = () => reject(new Error('Failed to read video file.'))
      reader.readAsDataURL(file)
    })

  const isDirectVideo = (url = '') =>
    /^data:video\//i.test(url) || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url)

  const fetchBlogs = async () => {
    const data = await adminFetch(token, '/api/admin/blogs')
    setBlogs(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    fetchBlogs().catch(console.error)
  }, [token])

  const handleVideoUpload = async (file) => {
    if (!file) return
    try {
      const videoUrl = await toDataUrl(file)
      setForm((prev) => ({
        ...prev,
        videoUrl,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
      }))
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to load video file.')
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const featuredCount = blogs.filter((item) => item.isFeatured).length
      if (form.isFeatured && featuredCount >= 4) {
        throw new Error('Only 4 featured videos are allowed. Unfeature one first.')
      }

      await adminFetch(token, '/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          videoUrl: form.videoUrl,
          description: form.description.trim(),
          tags: form.tags,
          status: form.status,
          isFeatured: Boolean(form.isFeatured),
          isLatest: Boolean(form.isLatest),
          position: blogs.length,
        }),
      })
      setForm({
        title: '',
        videoUrl: '',
        description: '',
        tags: '',
        status: form.status,
        sourceMode: form.sourceMode,
        isFeatured: false,
        isLatest: true,
      })
      await fetchBlogs()
    } catch (saveError) {
      setError(saveError.message || 'Failed to save blog video.')
    } finally {
      setSaving(false)
    }
  }

  const toggleStatus = async (blog) => {
    setSaving(true)
    setError('')
    try {
      await adminFetch(token, `/api/admin/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: blog.status === 'published' ? 'draft' : 'published' }),
      })
      await fetchBlogs()
    } catch (statusError) {
      setError(statusError.message || 'Failed to update publish status.')
    } finally {
      setSaving(false)
    }
  }

  const toggleFeatured = async (blog) => {
    setSaving(true)
    setError('')
    try {
      const featuredCount = blogs.filter((item) => item.isFeatured).length
      if (!blog.isFeatured && featuredCount >= 4) {
        throw new Error('Only 4 featured videos are allowed.')
      }
      await adminFetch(token, `/api/admin/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !blog.isFeatured }),
      })
      await fetchBlogs()
    } catch (featureError) {
      setError(featureError.message || 'Failed to update featured status.')
    } finally {
      setSaving(false)
    }
  }

  const toggleLatest = async (blog) => {
    setSaving(true)
    setError('')
    try {
      const currentLatest = blog.isLatest !== false
      await adminFetch(token, `/api/admin/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLatest: !currentLatest }),
      })
      await fetchBlogs()
    } catch (latestError) {
      setError(latestError.message || 'Failed to update latest status.')
    } finally {
      setSaving(false)
    }
  }

  const reorderBlogs = async (ids) => {
    if (!ids.length) return
    setSaving(true)
    setError('')
    try {
      const data = await adminFetch(token, '/api/admin/blogs/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      setBlogs(Array.isArray(data) ? data : blogs)
    } catch (reorderError) {
      setError(reorderError.message || 'Failed to reorder videos.')
      await fetchBlogs()
    } finally {
      setSaving(false)
    }
  }

  const moveBlog = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= blogs.length) return
    const ids = blogs.map((blog) => blog._id)
    const swapped = [...ids]
    const temp = swapped[index]
    swapped[index] = swapped[targetIndex]
    swapped[targetIndex] = temp
    await reorderBlogs(swapped)
  }

  const handleDelete = async (id) => {
    setSaving(true)
    setError('')
    try {
      await adminFetch(token, `/api/admin/blogs/${id}`, { method: 'DELETE' })
      await fetchBlogs()
    } catch (deleteError) {
      setError(deleteError.message || 'Failed to delete blog video.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-3">Manage Blogs</h2>
      <p className="text-sm text-slate-600 mb-8">Upload videos and control Featured (max 4), Latest, publish state, and order.</p>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={form.sourceMode}
          onChange={(e) => setForm({ ...form, sourceMode: e.target.value, videoUrl: '' })}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          <option value="upload">Upload from device</option>
          <option value="url">Source URL</option>
        </select>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {form.sourceMode === 'upload' ? (
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoUpload(e.target.files?.[0])}
            className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
            required={!form.videoUrl}
          />
        ) : (
          <input
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            placeholder="Video URL (mp4 or YouTube)"
            className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
            required
          />
        )}

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
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
        <label className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
          />
          Featured Video
        </label>
        <label className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700">
          <input
            type="checkbox"
            checked={form.isLatest}
            onChange={(e) => setForm({ ...form, isLatest: e.target.checked })}
          />
          Show in Latest
        </label>
        <button
          type="submit"
          disabled={saving || !form.videoUrl}
          className="md:col-span-2 bg-slate-900 hover:bg-[#dc4005] text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Blog Video'}
        </button>
      </form>

      {error && <p className="text-sm text-rose-600 font-bold mb-4">{error}</p>}
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
        Featured selected: {blogs.filter((item) => item.isFeatured).length}/4
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog, index) => (
          <div key={blog._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-full h-44 bg-slate-100 rounded-xl overflow-hidden mb-4">
              {isDirectVideo(blog.videoUrl) ? (
                <video src={blog.videoUrl} controls className="w-full h-full object-cover" />
              ) : (
                <iframe
                  src={String(blog.videoUrl || '').replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  title={blog.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{blog.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{blog.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full ${blog.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {blog.status || 'draft'}
              </span>
              <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full ${blog.isFeatured ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                {blog.isFeatured ? 'Featured' : 'Not Featured'}
              </span>
              <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full ${blog.isLatest !== false ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                {blog.isLatest !== false ? 'Latest' : 'Not Latest'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button onClick={() => moveBlog(index, -1)} className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-full">
                Move Up
              </button>
              <button onClick={() => moveBlog(index, 1)} className="text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-full">
                Move Down
              </button>
              <button onClick={() => toggleStatus(blog)} className="text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                Toggle Publish
              </button>
              <button onClick={() => toggleFeatured(blog)} className="text-xs font-bold text-orange-700 bg-orange-50 px-4 py-2 rounded-full">
                {blog.isFeatured ? 'Unfeature' : 'Feature'}
              </button>
              <button onClick={() => toggleLatest(blog)} className="text-xs font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full">
                {blog.isLatest !== false ? 'Remove Latest' : 'Mark Latest'}
              </button>
              <button onClick={() => handleDelete(blog._id)} className="text-xs font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const emptyGalleryForm = {
  type: 'image',
  src: '',
  category: 'Events',
  sourceMode: 'url',
  sizeMode: 'default',
  colSpan: 1,
  height: 320,
}

const defaultGallerySeed = [
  { type: 'image', src: '/workshops/event-poster.png', category: 'Events', colSpan: 1, height: 340, active: true },
  { type: 'image', src: '/workshops/event-quantum-classroom.png', category: 'Events', colSpan: 2, height: 300, active: true },
  { type: 'image', src: '/workshops/event-codestorm-stage.png', category: 'Events', colSpan: 1, height: 460, active: true },
  { type: 'image', src: '/workshops/event-new-classroom.jpg', category: 'Events', colSpan: 2, height: 360, active: true },
  { type: 'video', src: '/four.mp4', category: 'Behind the Scenes', colSpan: 1, height: 320, active: true },
  { type: 'image', src: '/generic_service.png', category: 'Office', colSpan: 1, height: 320, active: true },
  { type: 'video', src: '/web_development.mp4', category: 'Events', colSpan: 1, height: 320, active: true },
  { type: 'video', src: '/meetings.mp4', category: 'Behind the Scenes', colSpan: 1, height: 320, active: true },
]

const galleryImportMarkerKey = 'mp_gallery_seed_imported_v1'
const galleryCategories = ['Events', 'Behind the Scenes', 'Office']
const galleryViewFilters = ['All', 'Image', 'Video', ...galleryCategories]
const defaultGalleryLayout = { mobileColumns: 1, tabletColumns: 2, desktopColumns: 3 }
const defaultGalleryItemSize = {
  image: { colSpan: 1, height: 320 },
  video: { colSpan: 1, height: 320 },
}

function GalleryPanel({ token }) {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyGalleryForm)
  const [editingId, setEditingId] = useState('')
  const [editForm, setEditForm] = useState(emptyGalleryForm)
  const [layout, setLayout] = useState(defaultGalleryLayout)
  const [viewFilter, setViewFilter] = useState('All')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const getDefaultSizeForType = (type) => defaultGalleryItemSize[type] || defaultGalleryItemSize.image
  const getUploadAcceptForType = (type) => (type === 'video' ? 'video/*' : 'image/*')

  const toDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })

  const isFileTypeAllowed = (file, expectedType) => {
    const mime = String(file?.type || '')
    if (expectedType === 'video') {
      return mime.startsWith('video/')
    }
    return mime.startsWith('image/')
  }

  const getReadableSourceLabel = (src = '') => {
    const value = String(src || '').trim()
    if (!value) return 'No source'
    if (/^data:image\//i.test(value)) return 'Uploaded image file'
    if (/^data:video\//i.test(value)) return 'Uploaded video file'

    if (value.startsWith('/')) return value

    try {
      const parsed = new URL(value)
      const fileName = parsed.pathname.split('/').filter(Boolean).pop()
      return fileName || parsed.hostname
    } catch {
      const fileName = value.split('/').filter(Boolean).pop()
      if (fileName && fileName.length <= 80) return fileName
      return `${value.slice(0, 60)}...`
    }
  }

  const importDefaultGallery = async () => {
    const existing = await adminFetch(token, '/api/admin/gallery')
    const existingKeys = new Set(
      (Array.isArray(existing) ? existing : []).map((item) => `${item.type}|${item.src}`)
    )

    for (let i = 0; i < defaultGallerySeed.length; i += 1) {
      const item = defaultGallerySeed[i]
      const key = `${item.type}|${item.src}`
      if (existingKeys.has(key)) continue
      await adminFetch(token, '/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, position: i }),
      })
    }
    localStorage.setItem(galleryImportMarkerKey, '1')
  }

  const fetchGallery = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch(token, '/api/admin/gallery')
      const list = Array.isArray(data) ? data : []

      if (list.length === 0 && !localStorage.getItem(galleryImportMarkerKey)) {
        await importDefaultGallery()
        const seeded = await adminFetch(token, '/api/admin/gallery')
        setItems(Array.isArray(seeded) ? seeded : [])
        return
      }

      setItems(list)
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to load gallery items.')
    } finally {
      setLoading(false)
    }
  }

  const fetchLayout = async () => {
    try {
      const data = await adminFetch(token, '/api/admin/gallery-layout')
      setLayout({
        mobileColumns: Number(data.mobileColumns) || defaultGalleryLayout.mobileColumns,
        tabletColumns: Number(data.tabletColumns) || defaultGalleryLayout.tabletColumns,
        desktopColumns: Number(data.desktopColumns) || defaultGalleryLayout.desktopColumns,
      })
    } catch (layoutError) {
      console.error(layoutError)
    }
  }

  useEffect(() => {
    fetchGallery().catch(console.error)
    fetchLayout().catch(console.error)
  }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const defaults = getDefaultSizeForType(form.type)
      const payload = {
        type: form.type,
        src: form.src,
        category: form.category,
        active: true,
        colSpan: form.sizeMode === 'custom' ? form.colSpan : defaults.colSpan,
        height: form.sizeMode === 'custom' ? form.height : defaults.height,
      }
      await adminFetch(token, '/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setForm(emptyGalleryForm)
      await fetchGallery()
    } catch (saveError) {
      setError(saveError.message || 'Failed to add gallery item.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setSaving(true)
    setError('')
    try {
      await adminFetch(token, `/api/admin/gallery/${id}`, { method: 'DELETE' })
      await fetchGallery()
    } catch (deleteError) {
      setError(deleteError.message || 'Failed to delete gallery item.')
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (item) => {
    setSaving(true)
    setError('')
    try {
      await adminFetch(token, `/api/admin/gallery/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !item.active }),
      })
      await fetchGallery()
    } catch (toggleError) {
      setError(toggleError.message || 'Failed to update visibility.')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (item) => {
    setEditingId(item._id)
    setEditForm({
      type: item.type || 'image',
      src: item.src || '',
      category: item.category || 'Events',
      sourceMode: 'url',
      sizeMode: 'custom',
      colSpan: Number(item.colSpan) || 1,
      height: Number(item.height) || 320,
    })
  }

  const saveEdit = async (id) => {
    setSaving(true)
    setError('')
    try {
      const defaults = getDefaultSizeForType(editForm.type)
      const payload = {
        type: editForm.type,
        src: editForm.src,
        category: editForm.category,
        colSpan: editForm.sizeMode === 'custom' ? editForm.colSpan : defaults.colSpan,
        height: editForm.sizeMode === 'custom' ? editForm.height : defaults.height,
      }
      await adminFetch(token, `/api/admin/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setEditingId('')
      setEditForm(emptyGalleryForm)
      await fetchGallery()
    } catch (updateError) {
      setError(updateError.message || 'Failed to update gallery item.')
    } finally {
      setSaving(false)
    }
  }

  const reorderItems = async (orderedItems) => {
    setSaving(true)
    setError('')
    try {
      const ids = orderedItems.map((item) => item._id)
      const data = await adminFetch(token, '/api/admin/gallery/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      setItems(Array.isArray(data) ? data : orderedItems)
    } catch (reorderError) {
      setError(reorderError.message || 'Failed to reorder gallery.')
      await fetchGallery()
    } finally {
      setSaving(false)
    }
  }

  const moveItem = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= items.length) return

    const next = [...items]
    const temp = next[index]
    next[index] = next[targetIndex]
    next[targetIndex] = temp
    setItems(next)
    await reorderItems(next)
  }

  const handleImportDefaults = async () => {
    setSaving(true)
    setError('')
    try {
      await importDefaultGallery()
      await fetchGallery()
    } catch (importError) {
      setError(importError.message || 'Failed to import default gallery items.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveLayout = async () => {
    setSaving(true)
    setError('')
    try {
      const payload = {
        mobileColumns: Number(layout.mobileColumns) || defaultGalleryLayout.mobileColumns,
        tabletColumns: Number(layout.tabletColumns) || defaultGalleryLayout.tabletColumns,
        desktopColumns: Number(layout.desktopColumns) || defaultGalleryLayout.desktopColumns,
      }
      const data = await adminFetch(token, '/api/admin/gallery-layout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setLayout({
        mobileColumns: Number(data.mobileColumns) || defaultGalleryLayout.mobileColumns,
        tabletColumns: Number(data.tabletColumns) || defaultGalleryLayout.tabletColumns,
        desktopColumns: Number(data.desktopColumns) || defaultGalleryLayout.desktopColumns,
      })
    } catch (saveLayoutError) {
      setError(saveLayoutError.message || 'Failed to update gallery layout.')
    } finally {
      setSaving(false)
    }
  }

  const handleFormTypeChange = (type) => {
    const defaults = getDefaultSizeForType(type)
    setForm((prev) => ({
      ...prev,
      type,
      ...(prev.sizeMode === 'default' ? defaults : {}),
    }))
  }

  const handleEditTypeChange = (type) => {
    const defaults = getDefaultSizeForType(type)
    setEditForm((prev) => ({
      ...prev,
      type,
      ...(prev.sizeMode === 'default' ? defaults : {}),
    }))
  }

  const handleFormFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    try {
      if (!isFileTypeAllowed(file, form.type)) {
        throw new Error(`Invalid file type. Please upload only ${form.type} files.`)
      }
      const defaults = getDefaultSizeForType(form.type)
      const dataUrl = await toDataUrl(file)
      setForm((prev) => ({
        ...prev,
        src: dataUrl,
        ...(prev.sizeMode === 'default' ? defaults : {}),
      }))
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to process uploaded file.')
    }
  }

  const handleEditFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    try {
      if (!isFileTypeAllowed(file, editForm.type)) {
        throw new Error(`Invalid file type. Please upload only ${editForm.type} files.`)
      }
      const defaults = getDefaultSizeForType(editForm.type)
      const dataUrl = await toDataUrl(file)
      setEditForm((prev) => ({
        ...prev,
        src: dataUrl,
        ...(prev.sizeMode === 'default' ? defaults : {}),
      }))
    } catch (uploadError) {
      setError(uploadError.message || 'Failed to process uploaded file.')
    }
  }

  const visibleItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      if (viewFilter === 'All') return true
      if (viewFilter === 'Image') return item.type === 'image'
      if (viewFilter === 'Video') return item.type === 'video'
      return (item.category || '') === viewFilter
    })

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-900 mb-2">Gallery Control</h2>
      <p className="text-sm text-slate-600 font-medium mb-8">
        Add, remove, replace, hide/show, and reorder gallery media. Order here controls what appears first on the live gallery page.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <h3 className="text-lg font-extrabold text-slate-900 mb-4">Gallery Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="text-sm font-bold text-slate-700">
            Mobile Columns
            <select
              value={layout.mobileColumns}
              onChange={(e) => setLayout({ ...layout, mobileColumns: Number(e.target.value) })}
              className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </label>
          <label className="text-sm font-bold text-slate-700">
            Tablet Columns
            <select
              value={layout.tabletColumns}
              onChange={(e) => setLayout({ ...layout, tabletColumns: Number(e.target.value) })}
              className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
          <label className="text-sm font-bold text-slate-700">
            Desktop Columns
            <select
              value={layout.desktopColumns}
              onChange={(e) => setLayout({ ...layout, desktopColumns: Number(e.target.value) })}
              className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={handleSaveLayout}
          disabled={saving}
          className="mt-4 bg-slate-900 hover:bg-[#dc4005] disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          Save Layout
        </button>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={form.type}
          onChange={(e) => handleFormTypeChange(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          {galleryCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={form.sourceMode}
          onChange={(e) => setForm({ ...form, sourceMode: e.target.value, src: '' })}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          <option value="url">Source URL</option>
          <option value="device">Upload from Device</option>
        </select>
        <select
          value={form.sizeMode}
          onChange={(e) => {
            const nextMode = e.target.value
            const defaults = getDefaultSizeForType(form.type)
            setForm({
              ...form,
              sizeMode: nextMode,
              ...(nextMode === 'default' ? defaults : {}),
            })
          }}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
        >
          <option value="default">Default Size</option>
          <option value="custom">Edit Size</option>
        </select>
        {form.sourceMode === 'url' ? (
          <input
            value={form.src}
            onChange={(e) => setForm({ ...form, src: e.target.value })}
            placeholder="Media URL or /public path"
            className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
            required
          />
        ) : (
          <label className="md:col-span-2 text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            Upload from device
            <input
              type="file"
              accept={getUploadAcceptForType(form.type)}
              onChange={handleFormFileUpload}
              className="mt-2 block w-full text-sm font-medium text-slate-700"
              required
            />
          </label>
        )}
        {form.sizeMode === 'custom' ? (
          <>
            <label className="text-sm font-bold text-slate-700">
              Width (Column Span)
              <select
                value={form.colSpan}
                onChange={(e) => setForm({ ...form, colSpan: Number(e.target.value) })}
                className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </label>
            <label className="text-sm font-bold text-slate-700">
              Height (px)
              <input
                type="number"
                min={120}
                max={1600}
                value={form.height}
                onChange={(e) => setForm({ ...form, height: Number(e.target.value) || 320 })}
                className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
              />
            </label>
          </>
        ) : (
          <p className="md:col-span-2 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            Default size: Span {getDefaultSizeForType(form.type).colSpan}, Height {getDefaultSizeForType(form.type).height}px
          </p>
        )}
        <button type="submit" disabled={saving} className="md:col-span-2 bg-slate-900 hover:bg-[#dc4005] disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Add Gallery Item
        </button>
      </form>

      {error && <p className="mb-4 text-sm font-bold text-rose-600">{error}</p>}
      {loading && <p className="text-slate-500 font-bold">Loading gallery...</p>}
      {!loading && items.length === 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm font-bold text-amber-800">
            No gallery items found. Import existing website media to manage sort/delete/replace from admin.
          </p>
          <button
            onClick={handleImportDefaults}
            disabled={saving}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white text-sm font-bold px-4 py-2 rounded-lg"
          >
            Import Existing Media
          </button>
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="text-sm font-bold text-slate-700">View:</label>
        <select
          value={viewFilter}
          onChange={(e) => setViewFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold"
        >
          {galleryViewFilters.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleItems.map(({ item, index }) => (
          <div key={item._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-4" style={{ height: `${Number(item.height) || 320}px` }}>
              {item.type === 'video' ? (
                <video src={item.src} className="w-full h-full object-cover" muted loop playsInline autoPlay />
              ) : (
                <img src={item.src} alt={item.category || 'Gallery item'} className="w-full h-full object-cover" />
              )}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Position #{index + 1} • {item.type} • Span {Number(item.colSpan) || 1} • {Number(item.height) || 320}px
            </p>

            {editingId === item._id ? (
              <div className="grid grid-cols-1 gap-3">
                <select
                  value={editForm.type}
                  onChange={(e) => handleEditTypeChange(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                >
                  {galleryCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={editForm.sourceMode || 'url'}
                  onChange={(e) => setEditForm({ ...editForm, sourceMode: e.target.value, src: '' })}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                >
                  <option value="url">Source URL</option>
                  <option value="device">Upload from Device</option>
                </select>
                {editForm.sourceMode === 'device' ? (
                  <label className="text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                    Upload from device
                    <input
                      type="file"
                      accept={getUploadAcceptForType(editForm.type)}
                      onChange={handleEditFileUpload}
                      className="mt-2 block w-full text-sm font-medium text-slate-700"
                    />
                  </label>
                ) : (
                  <input
                    value={editForm.src}
                    onChange={(e) => setEditForm({ ...editForm, src: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                  />
                )}
                <select
                  value={editForm.sizeMode || 'custom'}
                  onChange={(e) => {
                    const nextMode = e.target.value
                    const defaults = getDefaultSizeForType(editForm.type)
                    setEditForm({
                      ...editForm,
                      sizeMode: nextMode,
                      ...(nextMode === 'default' ? defaults : {}),
                    })
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                >
                  <option value="default">Default Size</option>
                  <option value="custom">Edit Size</option>
                </select>
                {editForm.sizeMode === 'custom' ? (
                  <>
                    <label className="text-sm font-bold text-slate-700">
                      Width (Column Span)
                      <select
                        value={editForm.colSpan}
                        onChange={(e) => setEditForm({ ...editForm, colSpan: Number(e.target.value) })}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                      </select>
                    </label>
                    <label className="text-sm font-bold text-slate-700">
                      Height (px)
                      <input
                        type="number"
                        min={120}
                        max={1600}
                        value={editForm.height}
                        onChange={(e) => setEditForm({ ...editForm, height: Number(e.target.value) || 320 })}
                        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
                      />
                    </label>
                  </>
                ) : (
                  <p className="text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                    Default size: Span {getDefaultSizeForType(editForm.type).colSpan}, Height {getDefaultSizeForType(editForm.type).height}px
                  </p>
                )}
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(item._id)} disabled={saving} className="flex-1 text-xs font-bold text-white bg-[#dc4005] px-4 py-2 rounded-full disabled:opacity-60">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId('')
                      setEditForm(emptyGalleryForm)
                    }}
                    className="flex-1 text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="font-bold text-slate-900">{getReadableSourceLabel(item.src)}</p>
                <p className="text-sm font-semibold text-slate-500 mt-1">Category: {item.category || 'Events'}</p>
                <p className={`mt-2 text-[11px] font-bold uppercase tracking-widest ${item.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {item.active ? 'Visible' : 'Hidden'}
                </p>
                <div className="mt-4 hidden sm:grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button onClick={() => moveItem(index, -1)} disabled={saving || index === 0} className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-full disabled:opacity-50">
                    Move Up
                  </button>
                  <button onClick={() => moveItem(index, 1)} disabled={saving || index === items.length - 1} className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-full disabled:opacity-50">
                    Move Down
                  </button>
                  <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-2 rounded-full">
                    Replace/Edit
                  </button>
                  <button onClick={() => toggleActive(item)} disabled={saving} className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-full disabled:opacity-50">
                    {item.active ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleDelete(item._id)} disabled={saving} className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-2 rounded-full disabled:opacity-50">
                    Delete
                  </button>
                </div>
                <div className="mt-4 sm:hidden">
                  <details className="bg-slate-100 rounded-xl p-2">
                    <summary className="list-none cursor-pointer text-center text-sm font-bold text-slate-700">...</summary>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      <button onClick={() => moveItem(index, -1)} disabled={saving || index === 0} className="text-xs font-bold text-slate-700 bg-white px-3 py-2 rounded-full disabled:opacity-50">
                        Move Up
                      </button>
                      <button onClick={() => moveItem(index, 1)} disabled={saving || index === items.length - 1} className="text-xs font-bold text-slate-700 bg-white px-3 py-2 rounded-full disabled:opacity-50">
                        Move Down
                      </button>
                      <button onClick={() => startEdit(item)} className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-2 rounded-full">
                        Replace/Edit
                      </button>
                      <button onClick={() => toggleActive(item)} disabled={saving} className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-full disabled:opacity-50">
                        {item.active ? 'Hide' : 'Show'}
                      </button>
                      <button onClick={() => handleDelete(item._id)} disabled={saving} className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-2 rounded-full disabled:opacity-50">
                        Delete
                      </button>
                    </div>
                  </details>
                </div>
              </>
            )}
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
