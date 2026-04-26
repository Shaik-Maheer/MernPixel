import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '')

const fallbackGalleryMedia = [
  { id: 1, type: 'image', src: '/workshops/event-poster.png', category: 'Events' },
  { id: 2, type: 'image', src: '/workshops/event-quantum-classroom.png', category: 'Events' },
  { id: 3, type: 'image', src: '/workshops/event-codestorm-stage.png', category: 'Events' },
  { id: 8, type: 'image', src: '/workshops/event-new-classroom.jpg', category: 'Events' },
  { id: 4, type: 'video', src: '/four.mp4', category: 'Behind the Scenes' },
  { id: 5, type: 'image', src: '/generic_service.png', category: 'Office' },
  { id: 6, type: 'video', src: '/web_development.mp4', category: 'Events' },
  { id: 7, type: 'video', src: '/meetings.mp4', category: 'Behind the Scenes' },
]

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [galleryMedia, setGalleryMedia] = useState(fallbackGalleryMedia)
  const availableFilters = useMemo(() => {
    const categories = Array.from(
      new Set(galleryMedia.map((item) => String(item.category || '').trim()).filter(Boolean))
    )
    return ['All', 'Image', 'Video', ...categories]
  }, [galleryMedia])
  const requestedFilter = searchParams.get('filter')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    let mounted = true

    fetch(`${baseUrl}/api/admin/gallery`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load gallery')
        }
        return res.json()
      })
      .then((data) => {
        if (!mounted || !Array.isArray(data)) return
        const parsed = data
          .map((item) => ({
            id: item._id || item.id,
            type: item.type === 'video' ? 'video' : 'image',
            src: String(item.src || '').trim(),
            category: item.category || 'Events',
          }))
          .filter((item) => Boolean(item.src))

        if (parsed.length > 0) {
          setGalleryMedia(parsed)
        } else {
          setGalleryMedia(fallbackGalleryMedia)
        }
      })
      .catch(() => {
        // Keep fallback data if API is unavailable.
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const nextFilter = availableFilters.includes(requestedFilter) ? requestedFilter : 'All'
    setFilter(nextFilter)
  }, [requestedFilter, availableFilters])

  const handleFilterChange = (value) => {
    setFilter(value)
    if (value === 'All') {
      setSearchParams({})
      return
    }
    setSearchParams({ filter: value })
  }
  
  const filteredMedia = filter === 'All' 
    ? galleryMedia
    : galleryMedia.filter(m => m.type.toLowerCase() === filter.toLowerCase() || m.category === filter)

  return (
    <main className="min-h-screen bg-[#050505] font-sans pb-32">
       <section className="bg-[#0a0a0a] pt-40 pb-24 px-6 md:px-12 relative overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto text-center relative z-10">
               <span className="text-[13px] font-black text-rose-500 uppercase tracking-[0.3em] mb-4 block">
                 Our Culture
               </span>
               <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tight">
                 MERNpixel Gallery
               </h1>
               <div className="flex flex-wrap justify-center gap-4 mt-8">
                  {availableFilters.map(f => (
                    <button 
                      key={f}
                      onClick={() => handleFilterChange(f)}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === f ? 'bg-white text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      {f}
                    </button>
                  ))}
               </div>
          </div>
       </section>

       <section className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
             {filteredMedia.map((media) => (
               <motion.div 
                 key={media.id}
                 className="break-inside-avoid shadow-2xl rounded-3xl overflow-hidden bg-slate-900 border border-white/10 relative group cursor-pointer"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                 {media.type === 'image' ? (
                   <img src={media.src} alt={media.category} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                 ) : (
                   <div className="relative">
                     <video src={media.src} className="w-full h-auto" loop muted playsInline autoPlay />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                           <div className="w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-l-white ml-1"></div>
                        </div>
                     </div>
                   </div>
                 )}
                 <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold tracking-widest uppercase text-xs">{media.category}</p>
                 </div>
               </motion.div>
             ))}
          </div>
       </section>
    </main>
  )
}
