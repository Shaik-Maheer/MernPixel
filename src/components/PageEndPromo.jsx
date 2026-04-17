import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PageEndPromo({ eyebrow = 'Next', title, description, to, buttonLabel = 'Explore Now' }) {
  const MotionArticle = motion.article

  return (
    <section className="section-shell pt-0">
      <MotionArticle
        className="page-end-promo glass-card rounded-3xl px-7 py-14 text-center md:px-12 md:py-20"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.24em] text-white/56">{eyebrow}</p>
        <h2 className="mt-3 font-['Cinzel'] text-4xl text-white md:text-6xl">{title}</h2>
        {description && <p className="mx-auto mt-5 max-w-2xl text-white/72">{description}</p>}
        <Link to={to} className="btn-primary mt-8 inline-flex cursor-target">
          {buttonLabel}
        </Link>
      </MotionArticle>
    </section>
  )
}
