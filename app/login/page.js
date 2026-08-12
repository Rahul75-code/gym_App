"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getCurrentMember, signInMember } from '../lib/supabase/memberService';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await signInMember({ email: form.email, password: form.password });
      const member = await getCurrentMember();
      setMessage('Signed in successfully.');
      if (member?.is_admin) {
        router.push('/admin');
      } else {
        router.push('/tracker');
      }
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

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
            <li>Secure sessions powered by Supabase Auth.</li>
            <li>Fast access to workout trackers and nutrition guides.</li>
            <li>Remember Me option for trusted devices.</li>
          </ul>
        </div>

        <div className="auth-card">
          <h3>Sign in</h3>
          <form className="auth-form" onSubmit={handleSubmit}>
            {error ? <div className="auth-alert error">{error}</div> : null}
            {message ? <div className="auth-alert success">{message}</div> : null}

            <label htmlFor="login-email">Email</label>
            <input id="login-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />

            <label htmlFor="login-password">Password</label>
            <input id="login-password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />

            <div className="auth-actions">
              <label>
                <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} /> Remember Me
              </label>
              <Link className="auth-link" href="#">
                Forgot Password?
              </Link>
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
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
