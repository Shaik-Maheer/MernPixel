import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ServiceIcon from './ServiceIcon'

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
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 shadow-2xl relative"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors z-10"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-sm">
              <ServiceIcon type={service.icon} className="w-6 h-6" />
            </div>

            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-sm md:text-base font-medium text-slate-600 mb-6">{service.description}</p>

            <div className="bg-slate-50 rounded-xl p-4 md:p-5 mb-6 border border-slate-100">
              <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-widest mb-3">What we provide</h4>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12.5l4 4L19 7.5" />
                      </svg>
                    </span>
                    <span className="text-[13px] md:text-sm font-medium text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-widest mb-3">Keywords / Best Used For</h4>
              <div className="flex flex-wrap gap-1.5">
                {service.useCases.map((useCase, i) => (
                  <span key={i} className="bg-[#FAF5FF] border border-purple-100 text-slate-700 text-[12px] font-bold px-3 py-1.5 rounded-full cursor-default shadow-sm hover:border-purple-200 transition-colors">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 rounded-xl p-4 text-white text-center shadow-lg relative overflow-hidden">
               <span className="relative z-10 text-[13px] md:text-sm font-bold tracking-wide">Expected Outcome: {service.outcome}</span>
            </div>

          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
