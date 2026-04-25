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
    if (!open) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mp-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          onClick={onClose}
        >
          <motion.article
            className={`mp-modal ${fullscreen ? 'is-fullscreen' : ''}`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="mp-modal-close" onClick={onClose} aria-label="Close details">
              ×
            </button>

            {subtitle && <p className="mp-kicker">{subtitle}</p>}
            <h2>{title}</h2>

            <div className="mp-modal-grid">
              {sections.map((section) => (
                <section key={section.label} className="mp-modal-section">
                  <p className="mp-chip">{section.label}</p>
                  {Array.isArray(section.items) ? (
                    <ul className="mp-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.text}</p>
                  )}
                </section>
              ))}
            </div>

            {actions.length > 0 && (
              <div className="mp-actions">
                {actions.map((action) => (
                  <a
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noreferrer' : undefined}
                    className={`mp-btn ${action.variant === 'ghost' ? 'mp-btn-ghost' : 'mp-btn-primary'} mp-magnetic`}
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
