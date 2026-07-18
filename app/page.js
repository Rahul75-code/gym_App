import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Your fitness journey, powered by smart tools</p>
          <h1>Train smarter, recover better, and grow stronger.</h1>
          <p>
            Discover workouts by muscle group, calculate your BMI and calorie needs,
            track your progress, and explore nutrition guidance all in one place.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/calculator">
              Try the Fitness Calculator
            </Link>
            <Link className="btn btn-secondary" href="/exercises">
              Explore Exercises
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h3>What you can do here</h3>
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
          <p>Stay consistent with smart tools for training, nutrition, and self-tracking — all in one modern experience.</p>
        </div>
        <div className="feature-grid">
          <Link className="feature-card" href="/calculator">
            <h3>BMI & Fitness Calculator</h3>
            <p>Quickly estimate your BMI, BMR, and fitness targets.</p>
          </Link>
          <Link className="feature-card" href="/tracker">
            <h3>Progress Tracker</h3>
            <p>Visualize workouts, strength gains, and personal milestones.</p>
          </Link>
          <Link className="feature-card" href="/nutrition">
            <h3>Nutrition Corner</h3>
            <p>Get meal plans, healthy recipes, and practical guidance.</p>
          </Link>
          <Link className="feature-card" href="/exercises">
            <h3>Exercises by Muscle Group</h3>
            <p>Explore beginner to advanced exercises grouped by target muscles.</p>
          </Link>
          <Link className="feature-card" href="/blog">
            <h3>Blog & Articles</h3>
            <p>Read useful tips on fitness, recovery, and motivation.</p>
          </Link>
          <div className="feature-card highlight-card">
            <h3>Join the movement</h3>
            <p>Build a healthy routine and stay consistent with smart support.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
