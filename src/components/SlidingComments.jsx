export default function SlidingComments({ items = [] }) {
  const merged = [...items, ...items]

  return (
    <section className="mp-comments-strip" aria-label="Client comments">
      <div className="mp-comments-track">
        {merged.map((item, index) => (
          <article key={`${item.name}-${index}`} className="mp-comment-card">
            <p>"{item.quote}"</p>
            <span>{item.name}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
