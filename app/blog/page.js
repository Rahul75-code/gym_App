// Last updated: 2026-11-03
export default function BlogPage() {
  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Learn and grow</p>
        <h1>Blog &amp; Articles</h1>
        <p className="page-description">Read <span className="text-accent">motivation</span>, <span className="text-accent">recovery tips</span>, <span className="text-accent">fitness guidance</span>, and <span className="text-accent">practical advice</span> to support your routine.</p>
      </section>

      <div className="grid-3">
        <article className="article-card blog-card blog-mindset">
          <h2><span className="icon">🧠</span> Why consistency beats intensity</h2>
          <p>Small repeated actions create greater progress over time than occasional extreme effort.</p>
        </article>
        <article className="article-card blog-card blog-recovery">
          <h2><span className="icon">🛡️</span> How to prevent workout injuries</h2>
          <p>Warm up, use correct form, and allow your body enough recovery time between sessions.</p>
        </article>
        <article className="article-card blog-card blog-routine">
          <h2><span className="icon">📅</span> Fitness motivation for busy weeks</h2>
          <p>Short workouts still count and can help you keep the habit strong during packed schedules.</p>
        </article>
      </div>
    </main>
  );
}
