import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com').replace(/\/+$/, '').replace(/\/api$/, '')

export default function StudentsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/student-projects`)
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-24">
      <section className="pt-32 pb-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-black tracking-[0.24em] uppercase text-[#00B7B5] mb-4">Student Projects</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Project Mentoring Showcase</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Real student projects with complete problem-to-solution documentation, code artifacts, and presentation support.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-14">
        {loading && <p className="text-slate-400 font-bold">Loading projects...</p>}

        {!loading && projects.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <p className="text-slate-300 font-semibold">No student projects are published yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article key={project._id} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col">
              <p className="text-[11px] font-black tracking-[0.18em] uppercase text-slate-400 mb-3">{project.college}</p>
              <h2 className="text-2xl font-black mb-2">{project.projectTitle}</h2>
              <p className="text-sm font-bold text-[#00B7B5] mb-5">{project.studentName}</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">{project.problemStatement || project.solutionDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(project.techStack || []).slice(0, 5).map((tech) => (
                  <span key={tech} className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    {tech}
                  </span>
                ))}
              </div>
              <Link to={`/student-projects/${project._id}`} className="mt-auto inline-flex items-center gap-2 text-sm font-black tracking-widest uppercase text-white border-b-2 border-white/30 hover:border-[#dc4005] pb-1 w-fit">
                View Details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
