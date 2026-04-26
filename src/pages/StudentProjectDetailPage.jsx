import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://mernpixel.onrender.com').replace(/\/+$/, '').replace(/\/api$/, '')

export default function StudentProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`${baseUrl}/api/admin/student-projects/${id}`)
      .then(async (res) => {
        if (res.status === 404) {
          setNotFound(true)
          return null
        }
        const data = await res.json()
        return data
      })
      .then((data) => {
        if (data) setProject(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (notFound) return <Navigate to="/student-projects" replace />

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-24">
      <section className="pt-28 border-b border-white/10 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/student-projects" className="text-xs font-black tracking-widest uppercase text-slate-400 hover:text-white">
            Back to Projects
          </Link>
          {loading ? (
            <p className="mt-8 text-slate-400 font-bold">Loading project...</p>
          ) : (
            <>
              <p className="mt-8 text-[11px] font-black tracking-[0.2em] uppercase text-[#00B7B5]">{project.college}</p>
              <h1 className="text-4xl md:text-6xl font-black mt-3 tracking-tight">{project.projectTitle}</h1>
              <p className="text-xl text-slate-300 mt-4">Student: {project.studentName}</p>
            </>
          )}
        </div>
      </section>

      {!loading && project && (
        <section className="max-w-6xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-black mb-4">Problem Statement</h2>
            <p className="text-slate-300 leading-relaxed mb-8">{project.problemStatement || 'Not provided yet.'}</p>
            <h2 className="text-2xl font-black mb-4">Solution</h2>
            <p className="text-slate-300 leading-relaxed mb-8">{project.solutionDescription || 'Not provided yet.'}</p>
            <h2 className="text-2xl font-black mb-4">Key Learnings</h2>
            <p className="text-slate-300 leading-relaxed">{project.keyLearnings || 'Not provided yet.'}</p>
          </article>

          <aside className="bg-white/5 border border-white/10 rounded-3xl p-8 h-fit">
            <h3 className="text-xl font-black mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {(project.techStack || []).map((tech) => (
                <span key={tech} className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15">
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-black mb-4">Deliverables</h3>
            <div className="flex flex-col gap-3">
              {project.documentationUrl && (
                <a href={project.documentationUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-[#dc4005]">
                  Documentation
                </a>
              )}
              {project.pptUrl && (
                <a href={project.pptUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-[#dc4005]">
                  Presentation
                </a>
              )}
              {project.codeZipUrl && (
                <a href={project.codeZipUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-[#dc4005]">
                  Source Code ZIP
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-[#dc4005]">
                  GitHub Repository
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-[#dc4005]">
                  Live Demo
                </a>
              )}
            </div>
          </aside>

          {(project.screenshots || []).length > 0 && (
            <article className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-black mb-6">Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.screenshots.map((url, idx) => (
                  <img key={`${url}-${idx}`} src={url} alt={`${project.projectTitle} screenshot ${idx + 1}`} className="w-full h-48 object-cover rounded-2xl border border-white/10" />
                ))}
              </div>
            </article>
          )}
        </section>
      )}
    </main>
  )
}
