import { motion } from 'framer-motion'
import PageEndPromo from '../components/PageEndPromo'
import PageIntroHero from '../components/PageIntroHero'
import { blogPosts } from '../data/siteData'

const editorialSignals = [
  { label: 'Content Focus', value: 'Growth + UX + Delivery' },
  { label: 'Reading Length', value: 'Practical + Concise' },
  { label: 'Publishing Style', value: 'Framework First' },
]

const editorialFlow = [
  { title: 'Problem Breakdown', detail: 'Each article starts from one real business or delivery problem.' },
  { title: 'Execution Angles', detail: 'We outline practical options with tradeoffs and timeline impact.' },
  { title: 'Action Format', detail: 'Every post ends with steps teams can apply immediately.' },
]

const articleTypes = ['Conversion Brief', 'Execution Notes', 'Delivery Playbook', 'Mentoring Guide']

export default function BlogPage() {
  const MotionArticle = motion.article

  return (
    <main className="pt-28">
      <PageIntroHero
        title="BLOG"
        subtitle="Growth playbooks, strategy notes, and execution insights."
        compact
      />

      <section className="section-shell blog-command-shell">
        <div className="blog-command-grid">
          <MotionArticle
            className="glass-card blog-command-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: -48, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-kicker">Insight Desk</span>
            <h1 className="section-title">Not generic content. Structured execution ideas.</h1>
            <p className="section-copy max-w-none">
              Our blog focuses on decisions that improve conversion, reduce build friction,
              and help teams deliver with more clarity.
            </p>

            <div className="blog-signal-grid">
              {editorialSignals.map((item) => (
                <article key={item.label}>
                  <p>{item.value}</p>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </MotionArticle>

          <MotionArticle
            className="glass-card blog-flow-card rounded-3xl p-7 md:p-9"
            initial={{ opacity: 0, x: 48, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="blog-flow-kicker">Editorial Workflow</p>
            <div className="blog-flow-stack">
              {editorialFlow.map((step, index) => (
                <article key={step.title}>
                  <small>{`0${index + 1}`}</small>
                  <p>{step.title}</p>
                  <span>{step.detail}</span>
                </article>
              ))}
            </div>
          </MotionArticle>
        </div>
      </section>

      <section className="section-shell pt-6">
        <span className="section-kicker">Published Notes</span>
        <h2 className="section-title">Insights and playbooks</h2>
        <p className="section-copy">Business growth, conversion-first websites, and student project execution guides.</p>

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
                <span>{articleTypes[index % articleTypes.length]}</span>
              </div>
              <h2 className="mt-3 font-['Cinzel'] text-4xl">{post.title}</h2>
              <p className="mt-4 text-white/75">{post.excerpt}</p>
              <div className="blog-post-footer">
                <span>Detailed action points included</span>
                <span>Read Time: 4 to 6 min</span>
              </div>
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
