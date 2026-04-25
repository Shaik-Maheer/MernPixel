import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    if (!service) return;
    const onEscape = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [onClose, service])

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors z-10"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 shadow-sm">
              {service.icon}
            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-lg font-medium text-slate-600 mb-8">{service.description}</p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">What we provide</h4>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span className="text-[15px] font-medium text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Keywords / Best Used For</h4>
              <div className="flex flex-wrap gap-2">
                {service.useCases.map((useCase, i) => (
                  <span key={i} className="bg-[#FAF5FF] border border-purple-100 text-slate-700 text-[13px] font-bold px-4 py-2 rounded-full cursor-default shadow-sm hover:border-purple-200 transition-colors">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
               <span className="relative z-10 font-bold tracking-wide">Expected Outcome: {service.outcome}</span>
            </div>

          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
