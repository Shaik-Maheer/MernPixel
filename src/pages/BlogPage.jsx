import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '')

const LATEST_PAGE_SIZE = 4

const feedbackItems = [
  { name: 'Aarav, Founder', quote: 'MERNpixel explained every decision clearly and shipped exactly what we needed.' },
  { name: 'Nisha, Marketing Lead', quote: 'They focus on business outcomes, not just visuals.' },
  { name: 'Rahul, Startup CTO', quote: 'Communication was clean and timelines were respected.' },
  { name: 'Priya, Operations', quote: 'Our team learned real workflow standards during delivery.' },
  { name: 'Sana, Program Head', quote: 'Sessions were practical, current, and immediately useful.' },
  { name: 'Vikram, Product Manager', quote: 'Strong execution quality and fast post-launch support.' },
]

const formatEmbedUrl = (url = '') => {
  const raw = String(url || '').trim()
  if (!raw) return ''
  if (/^data:video\//i.test(raw)) return raw
  if (/\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(raw)) return raw
  if (raw.includes('youtu.be/')) {
    const id = raw.split('youtu.be/')[1]?.split(/[?&]/)[0]
    return id ? `https://www.youtube.com/embed/${id}` : raw
  }
  if (raw.includes('youtube.com/watch?v=')) {
    return raw.replace('watch?v=', 'embed/')
  }
  return raw
}

const isDirectVideo = (url = '') =>
  /^data:video\//i.test(url) || /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url)

function VideoCard({ blog, badgeLabel = 'Latest' }) {
  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col">
      <div className="w-full h-[250px] bg-slate-900 relative">
        {isDirectVideo(blog.videoUrl) ? (
          <video src={blog.videoUrl} controls className="w-full h-full object-cover" />
        ) : (
          <iframe src={formatEmbedUrl(blog.videoUrl)} title={blog.title} className="w-full h-full" allowFullScreen />
        )}
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-flex text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
            {badgeLabel}
          </span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">{blog.title}</h3>
        <p className="text-[15px] font-medium text-slate-600 mb-6 flex-grow">{blog.description}</p>
        <Link
          to="/contact"
          className="mt-auto self-start text-xs font-bold text-white bg-[#E15D2B] px-4 py-2 rounded-full uppercase tracking-wide hover:bg-[#c94d22] transition-colors"
        >
          Loved this video? Get in touch
        </Link>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [latestPage, setLatestPage] = useState(1)

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch(console.error)
  }, [])

  const publishedBlogs = useMemo(
    () => blogs.filter((blog) => String(blog.status || '').toLowerCase() !== 'draft'),
    [blogs]
  )

  const featuredBlogs = useMemo(
    () => publishedBlogs.filter((blog) => blog.isFeatured === true).slice(0, 4),
    [publishedBlogs]
  )

  const latestBlogs = useMemo(
    () => publishedBlogs.filter((blog) => blog.isLatest !== false),
    [publishedBlogs]
  )

  const filteredLatestBlogs = useMemo(() => {
    if (!searchTerm) return latestBlogs
    return latestBlogs.filter((blog) =>
      String(blog.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [latestBlogs, searchTerm])

  const visibleLatestBlogs = filteredLatestBlogs.slice(0, latestPage * LATEST_PAGE_SIZE)
  const hasMoreLatest = visibleLatestBlogs.length < filteredLatestBlogs.length
  const feedbackLoop = [...feedbackItems, ...feedbackItems]

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInput.trim())
    setLatestPage(1)
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] pt-24 pb-24">
      <section className="max-w-6xl mx-auto px-6">
        <div className="rounded-[2.2rem] border border-slate-200 bg-gradient-to-b from-white to-[#fff7f2] p-8 md:p-14 text-center shadow-sm">
          <span className="inline-flex text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-600 rounded-full px-4 py-2">
            Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mt-6 mb-5">Discover our latest news</h1>
          <p className="text-base md:text-2xl text-slate-600 font-medium max-w-4xl mx-auto">
            Discover the achievements that set us apart. From practical learning videos to industry-driven sessions, we focus on real outcomes.
          </p>

          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by headline keyword..."
              className="flex-1 h-12 rounded-xl border border-slate-300 px-4 text-sm md:text-base bg-white"
            />
            <button
              type="submit"
              className="h-12 px-8 rounded-xl bg-[#2563EB] text-white font-bold hover:bg-[#1e4ec0] transition-colors"
            >
              Find Now
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Featured Videos</h2>
            <p className="text-sm text-slate-500 mt-2">Top 4 videos selected by admin.</p>
          </div>
        </div>

        {featuredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center shadow-sm">
            <h3 className="text-2xl font-black text-slate-800 mb-2">Coming Soon</h3>
            <p className="text-sm font-medium text-slate-500">No featured videos yet. Admin can mark up to 4 videos as Featured.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogs.map((blog) => (
              <VideoCard key={blog._id} blog={blog} badgeLabel="Featured" />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Latest Videos</h2>
            <p className="text-sm text-slate-500 mt-2">Search by headline and view more with pagination.</p>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Showing {Math.min(visibleLatestBlogs.length, filteredLatestBlogs.length)} of {filteredLatestBlogs.length}
          </p>
        </div>

        {filteredLatestBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center shadow-sm">
            <h3 className="text-2xl font-black text-slate-800 mb-2">Coming Soon</h3>
            <p className="text-sm font-medium text-slate-500">
              No latest videos available{searchTerm ? ' for this keyword' : ''}. Admin can change Latest flags anytime.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visibleLatestBlogs.map((blog) => (
                <VideoCard key={blog._id} blog={blog} badgeLabel="Latest" />
              ))}
            </div>

            {hasMoreLatest ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLatestPage((prev) => prev + 1)}
                  className="h-11 px-7 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-[#E15D2B] transition-colors"
                >
                  View More
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-[#0F172A] rounded-[2rem] p-8 md:p-10 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Loved a video?</h2>
          <p className="text-slate-200 text-sm md:text-base mt-3">Tell us your goal and we will guide you with the right practical path.</p>
          <Link
            to="/contact"
            className="inline-flex mt-7 h-11 px-7 items-center justify-center rounded-full bg-[#E15D2B] font-bold text-sm hover:bg-[#c94d22] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Client Feedback</h2>
          <p className="text-sm text-slate-500 mt-2">Sliding feedback window from students and clients.</p>
        </div>
        <div className="mp-feedback-slider">
          <div className="mp-feedback-track">
            {feedbackLoop.map((item, index) => (
              <article key={`${item.name}-${index}`} className="mp-feedback-card">
                <p className="text-sm text-slate-600 leading-relaxed">"{item.quote}"</p>
                <span className="text-xs font-black tracking-wider uppercase text-slate-900 mt-3 inline-block">{item.name}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
