"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    goal: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!form.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!form.email.trim()) {
      setMessage('No email provided. We will create a local account identifier for you.');
    }

    if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      setError('Password should be at least 8 characters and include letters plus numbers.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          goal: form.goal,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Unable to create your account.');
      }

      setMessage('Account created successfully. Redirecting to your tracker...');
      router.push('/tracker');
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  }

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
            <li>Fitness goal stored in your member profile.</li>
            <li>Admin access is granted automatically for the configured email.</li>
          </ul>
        </div>

        <div className="auth-card">
          <h3>Create account</h3>
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isSupabaseConfigured() ? (
              <div className="auth-alert error">Supabase is not configured. Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` in <code>.env.local</code>.</div>
            ) : null}
            {error ? <div className="auth-alert error">{error}</div> : null}
            {message ? <div className="auth-alert success">{message}</div> : null}

            <label htmlFor="signup-name">Full Name</label>
            <input id="signup-name" name="fullName" type="text" placeholder="Jane Doe" value={form.fullName} onChange={handleChange} required />

            <label htmlFor="signup-email">Email (optional)</label>
            <input id="signup-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />

            <label htmlFor="signup-password">Password</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" value={form.password} onChange={handleChange} required />
              <button type="button" className="btn btn-secondary" onClick={() => setShowPassword((s) => !s)} style={{ whiteSpace: 'nowrap' }}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="password-strength">
              <span className="strength-bar active"></span>
              <span className="strength-bar active"></span>
              <span className="strength-bar active"></span>
            </div>
            <p className="feedback">Password should be at least 8 characters and include letters plus numbers.</p>

            <label htmlFor="signup-confirm">Confirm Password</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input id="signup-confirm" name="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} required />
              <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm((s) => !s)} style={{ whiteSpace: 'nowrap' }}>
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>

            <label htmlFor="signup-goal">Fitness Goal</label>
            <select id="signup-goal" name="goal" value={form.goal} onChange={handleChange}>
              <option value="">Select a goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
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
