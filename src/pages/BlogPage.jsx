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
        subtitle="Notes and playbooks."
        compact
      />

      <section className="section-shell pt-6">
        <span className="section-kicker">Published Notes</span>
        <h2 className="section-title">Insights</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <MotionArticle
              key={post.title}
              className="glass-card blog-post-card rounded-3xl p-8"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.67, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <div className="blog-post-meta">
                <p>{`Article 0${index + 1}`}</p>
                <span>Read</span>
              </div>
              <h2 className="mt-3 font-['Cinzel'] text-4xl">{post.title}</h2>
              <p className="mt-4 text-white/75">{post.excerpt}</p>
              <div className="blog-post-footer">
                <span>Read Time: 4 to 6 min</span>
              </div>
            </MotionArticle>
          ))}
        </div>
      </section>

      <PageEndPromo
        eyebrow="Next Section"
        title="Build With MernPixel"
        description="Let us discuss your requirement."
        to="/contact"
        buttonLabel="Start Conversation"
      />
    </main>
  )
}
