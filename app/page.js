// Last updated: 2026-11-03
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Your fitness journey, powered by smart tools</p>
          <h1>Train smarter, recover better, and grow stronger.</h1>
          <p className="page-description">
            Discover <span className="text-accent">workouts by muscle group</span>, <span className="text-accent">calculate your BMI and calorie needs</span>, 
            <span className="text-accent">track your progress</span>, and <span className="text-accent">explore nutrition guidance</span> all in one place.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/BMI">
              Try BMI
            </Link>
            <Link className="btn btn-secondary" href="/exercises">
              Explore Exercises
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h3><span className="icon">🎯</span> What you can do here</h3>
          <ul>
            <li>Plan workouts by muscle group</li>
            <li>Measure BMI and calorie needs</li>
            <li>Track your strength and progress</li>
            <li>Read nutrition and fitness tips</li>
          </ul>
        </div>
      </section>

      <section className="stats-grid">
        <article>
          <strong>12+</strong>
          <span>Muscle Group Guides</span>
        </article>
        <article>
          <strong>100%</strong>
          <span>Mobile Friendly</span>
        </article>
        <article>
          <strong>24/7</strong>
          <span>Workout Inspiration</span>
        </article>
      </section>

      <section className="adsense-unit">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2583537765669212"
          data-ad-slot="3467369616"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="eyebrow">Core experience</p>
          <h2>Everything a gym member needs in one place</h2>
        </div>
        <div className="info-banner">
          <p className="page-description" style={{ fontSize: '1.25rem' }}>Stay consistent with smart tools for training, nutrition, and self-tracking — all in one modern experience.</p>
        </div>
        <div className="feature-grid">
          <Link className="feature-card" href="/BMI">
            <h3><span className="icon">⚖️</span> BMI</h3>
            <p className="page-description">Quickly <span className="text-accent">estimate your BMI</span>, <span className="text-accent">BMR</span>, and <span className="text-accent">fitness targets</span>.</p>
          </Link>
          <Link className="feature-card" href="/tracker">
            <h3><span className="icon">📈</span> Progress Tracker</h3>
            <p className="page-description"><span className="text-accent">Visualize workouts</span>, <span className="text-accent">strength gains</span>, and <span className="text-accent">personal milestones</span>.</p>
          </Link>
          <Link className="feature-card" href="/nutrition">
            <h3><span className="icon">🍎</span> Nutrition Corner</h3>
            <p className="page-description">Get <span className="text-accent">meal plans</span>, <span className="text-accent">healthy recipes</span>, and <span className="text-accent">practical guidance</span>.</p>
          </Link>
          <Link className="feature-card" href="/exercises">
            <h3><span className="icon">💪</span> Exercises by Muscle Group</h3>
            <p className="page-description">Explore <span className="text-accent">beginner to advanced exercises</span> grouped by <span className="text-accent">target muscles</span>.</p>
          </Link>
          <Link className="feature-card" href="/blog">
            <h3><span className="icon">📚</span> Blog & Articles</h3>
            <p className="page-description">Read useful tips on <span className="text-accent">fitness</span>, <span className="text-accent">recovery</span>, and <span className="text-accent">motivation</span>.</p>
          </Link>
          <Link className="feature-card highlight-card" href="/signup">
            <h3><span className="icon">🌟</span> Join the movement</h3>
            <p className="page-description">Build a <span className="text-accent">healthy routine</span> and stay consistent with <span className="text-accent">smart support</span>.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
