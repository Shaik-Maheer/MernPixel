import { useState, useEffect } from 'react'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(console.error)
  }, [])

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-32 flex flex-col items-center">
      <div className="text-center mb-16 px-6">
         <span className="text-[13px] font-bold text-blue-600 uppercase tracking-widest mb-4 block">MERNpixel Journal</span>
         <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Process & Insights</h1>
         <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">Deep dive sessions into architecture, scale, and performance engineering.</p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
         {blogs.map(blog => (
            <div key={blog._id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
               <div className="w-full h-[250px] bg-slate-900 relative">
                  {/* Assume video url is a direct mp4 link or youtube embed. Let's use video tag if ends in mp4, else just an iframe or simple href */}
                  {blog.videoUrl.endsWith('.mp4') ? (
                     <video src={blog.videoUrl} controls className="w-full h-full object-cover" />
                  ) : (
                     <iframe src={blog.videoUrl.replace('watch?v=', 'embed/')} title={blog.title} className="w-full h-full" allowFullScreen></iframe>
                  )}
               </div>
               <div className="p-8 flex flex-col flex-grow">
                 <h2 className="text-2xl font-black text-slate-900 mb-4">{blog.title}</h2>
                 <p className="text-[15px] font-medium text-slate-600 mb-8 flex-grow">{blog.description}</p>
                 <a href={`https://wa.me/?text=Check out this session on MERNpixel: ${blog.title} - ${encodeURIComponent(blog.videoUrl)}`} target="_blank" rel="noreferrer" className="mt-auto self-start text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full uppercase tracking-wide hover:bg-emerald-100 transition-colors flex items-center gap-2">
                    <img src="/pics/whatsapp_icon.svg" alt="WhatsApp" className="w-4 h-4" /> Share on WhatsApp
                 </a>
               </div>
            </div>
         ))}
      </div>
      
      {blogs.length === 0 && (
         <div className="text-center mt-12 bg-slate-50 py-10 px-8 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-600">No sessions published currently. Check back soon.</h3>
         </div>
      )}
    </main>
  )
}
