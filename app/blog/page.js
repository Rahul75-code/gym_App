export default function BlogPage() {
  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Learn and grow</p>
        <h1>Blog &amp; Articles</h1>
        <p>Read motivation, recovery tips, fitness guidance, and practical advice to support your routine.</p>
      </section>

      <div className="grid-3">
        <article className="article-card">
          <h2>Why consistency beats intensity</h2>
          <p>Small repeated actions create greater progress over time than occasional extreme effort.</p>
        </article>
        <article className="article-card">
          <h2>How to prevent workout injuries</h2>
          <p>Warm up, use correct form, and allow your body enough recovery time between sessions.</p>
        </article>
        <article className="article-card">
          <h2>Fitness motivation for busy weeks</h2>
          <p>Short workouts still count and can help you keep the habit strong during packed schedules.</p>
        </article>
      </div>
    </main>
  );
}
