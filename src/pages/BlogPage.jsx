import { motion } from 'framer-motion'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { blogPosts } from '../data/siteData'

export default function BlogPage() {
  const MotionArticle = motion.article

  return (
    <main className="pt-28">
      <PageIntroHero
        title="BLOG"
        subtitle="Growth playbooks, strategy notes, and execution insights."
        compact
      />

      <section className="section-shell">
        <span className="section-kicker">Blog</span>
        <h1 className="section-title">Insights and playbooks</h1>
        <p className="section-copy">Business growth, conversion-first websites, and student project execution guides.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <MotionArticle
              key={post.title}
              className="glass-card rounded-3xl p-8"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.67, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Article</p>
              <h2 className="mt-3 font-['Cinzel'] text-4xl">{post.title}</h2>
              <p className="mt-4 text-white/75">{post.excerpt}</p>
            </MotionArticle>
          ))}
        </div>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Build With MernPixel"
        description="Discuss your requirement and turn your idea into a high-performance digital product."
        to="/contact"
        buttonLabel="Start Conversation"
      />
    </main>
  )
}
