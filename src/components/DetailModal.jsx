import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function DetailModal({
  open,
  onClose,
  title,
  subtitle,
  sections = [],
  actions = [],
  fullscreen = false,
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          onClick={onClose}
        >
          <motion.article
            className={`relative bg-[#050505] border border-white/10 shadow-2xl overflow-y-auto ${
              fullscreen ? 'w-full h-full rounded-2xl' : 'w-full max-w-2xl max-h-[90vh] rounded-3xl'
            } p-8 md:p-12`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-colors" 
              onClick={onClose} 
              aria-label="Close details"
            >
              ×
            </button>

            {subtitle && <p className="text-sm font-black text-rose-500 uppercase tracking-widest mb-4 inline-block bg-rose-500/10 px-4 py-1.5 rounded-full">{subtitle}</p>}
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight leading-tight">{title}</h2>

            <div className="flex flex-col gap-10">
              {sections.map((section) => (
                <section key={section.label} className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
                     <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm font-black">/</span>
                     {section.label}
                  </h3>
                  {Array.isArray(section.items) ? (
                    <ul className="flex flex-col gap-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start text-lg text-slate-300 font-medium leading-relaxed">
                          <span className="text-blue-500 font-bold mt-1">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-lg text-slate-300 font-medium leading-relaxed">{section.text}</p>
                  )}
                </section>
              ))}
            </div>

            {actions.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                {actions.map((action) => (
                  <a
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noreferrer' : undefined}
                    className="bg-white hover:bg-slate-200 text-black px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-colors"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
