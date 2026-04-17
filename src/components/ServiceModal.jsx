import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    if (!service) {
      return undefined
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [onClose, service])

  const MotionOverlay = motion.div
  const MotionCard = motion.article

  return (
    <AnimatePresence>
      {service && (
        <MotionOverlay
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionCard
            className="glass-card relative w-full max-w-2xl rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/30 bg-white/5 text-xl text-white transition hover:bg-white hover:text-black"
              aria-label="Close service details"
            >
              ×
            </button>

            <div className="mb-3 inline-flex rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/65">
              Service Planet Detail
            </div>
            <h3 className="font-['Cinzel'] text-4xl text-white">{service.title}</h3>
            <p className="mt-4 leading-relaxed text-white/75">{service.summary}</p>

            <div className="mt-6 space-y-3">
              {service.points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: service.color, boxShadow: `0 0 12px ${service.color}` }}
                  />
                  <p className="text-sm text-white/80">{point}</p>
                </div>
              ))}
            </div>
          </MotionCard>
        </MotionOverlay>
      )}
    </AnimatePresence>
  )
}
