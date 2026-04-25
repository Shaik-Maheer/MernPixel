import { blogPosts } from '../data/siteData'
import HeroBackdrop from '../components/HeroBackdrop'

export default function BlogPage() {
  return (
    <main className="mp-page">
      <section className="mp-page-hero mp-page-hero-media">
        <HeroBackdrop video="/four.mp4" />
        <div className="mp-shell">
          <p className="mp-kicker">Insights</p>
          <h1>Actionable insights for design, development, and conversion growth.</h1>
        </div>
      </section>

      <section className="mp-section">
        <div className="mp-shell mp-card-grid mp-grid-2">
          {blogPosts.map((post) => (
            <article key={post.title} className="mp-card mp-hover-card">
              <p className="mp-chip">MERNpixel Journal</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
