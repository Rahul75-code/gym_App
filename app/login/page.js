import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="page-head">
        <p className="eyebrow">Welcome back</p>
        <h1>Forge your fitness journey.</h1>
        <p>Log in to access your personalized dashboard, workout logs, and progress tools.</p>
      </section>

      <div className="auth-grid">
        <div className="auth-panel">
          <h2>Login to FitForge</h2>
          <p>Enter your email and password to continue. Keep your habits consistent and your goals in reach.</p>
          <ul>
            <li>Secure session storage with NextAuth-ready structure.</li>
            <li>Fast access to workout trackers and nutrition guides.</li>
            <li>Remember Me option for trusted devices.</li>
          </ul>
        </div>

        <div className="auth-card">
          <h3>Sign in</h3>
          <form className="auth-form">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" name="email" type="email" placeholder="you@example.com" />

            <label htmlFor="login-password">Password</label>
            <input id="login-password" name="password" type="password" placeholder="••••••••" />

            <div className="auth-actions">
              <label>
                <input type="checkbox" name="remember" /> Remember Me
              </label>
              <Link className="auth-link" href="#">
                Forgot Password?
              </Link>
            </div>

            <button className="btn btn-primary" type="button">
              Login
            </button>
          </form>
          <p className="auth-note">
            New to FitForge? <Link className="auth-link" href="/signup">Create an account</Link> and start tracking your routine.
          </p>
        </div>
      </div>
    </main>
  );
}
