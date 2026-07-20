import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="auth-page">
      <section className="page-head">
        <p className="eyebrow">Start strong</p>
        <h1>Create your FitForge account.</h1>
        <p>Register now to personalize your workouts, nutrition plans, and progress tracking.</p>
      </section>

      <div className="auth-grid">
        <div className="auth-panel">
          <h2>New Member Signup</h2>
          <p>Build an account that grows with your goals. Add your fitness objective and keep motivated from day one.</p>
          <ul>
            <li>Full name, email, and strong password entry.</li>
            <li>Optional details for a tailored fitness experience.</li>
            <li>Instant validation hints for password strength.</li>
          </ul>
        </div>

        <div className="auth-card">
          <h3>Create account</h3>
          <form className="auth-form">
            <label htmlFor="signup-name">Full Name</label>
            <input id="signup-name" name="name" type="text" placeholder="Jane Doe" />

            <label htmlFor="signup-email">Email</label>
            <input id="signup-email" name="email" type="email" placeholder="you@example.com" />

            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" name="password" type="password" placeholder="Create a strong password" />
            <div className="password-strength">
              <span className="strength-bar active"></span>
              <span className="strength-bar"></span>
              <span className="strength-bar"></span>
            </div>
            <p className="feedback">Password should be at least 8 characters and include letters plus numbers.</p>

            <label htmlFor="signup-confirm">Confirm Password</label>
            <input id="signup-confirm" name="confirmPassword" type="password" placeholder="Repeat password" />

            <label htmlFor="signup-goal">Fitness Goal</label>
            <select id="signup-goal" name="goal">
              <option value="">Select a goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <div className="auth-actions">
              <span className="auth-note">Optional: add gender, age, or goal info later.</span>
            </div>

            <button className="btn btn-primary" type="button">
              Create Account
            </button>
          </form>
          <p className="auth-note">
            Already have an account? <Link className="auth-link" href="/login">Login here</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
