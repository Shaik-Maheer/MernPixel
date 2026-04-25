import { motion } from 'framer-motion'
import { blogPosts } from '../data/siteData'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function BlogPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero">
        <div className="mp-shell">
          <p className="mp-kicker">Insights</p>
          <h1>Practical playbooks on design, development, and growth.</h1>
          <p className="mp-lead">Short strategic reads we use while planning and delivering client projects.</p>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {blogPosts.map((post, index) => (
            <motion.article key={post.title} className="mp-card mp-hover-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: 0.5, delay: index * 0.06 }}>
              <p className="mp-chip">MERNpixel Journal</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="/contact" className="mp-text-link">Request Strategy Call</a>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
