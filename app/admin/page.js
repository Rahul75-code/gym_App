"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllMembers, getCurrentMember, signOutMember } from '../lib/supabase/memberService';

export default function AdminPage() {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [currentMember, allMembers] = await Promise.all([getCurrentMember(), getAllMembers()]);
        setMember(currentMember);
        setMembers(allMembers);
      } catch (err) {
        setError(err.message || 'Unable to load admin dashboard.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleLogout() {
    try {
      await signOutMember();
      window.location.href = '/login';
    } catch (err) {
      setError(err.message || 'Unable to sign out.');
    }
  }

  if (loading) {
    return <main><p>Loading admin dashboard...</p></main>;
  }

  if (!member?.is_admin) {
    return <main className="auth-page"><div className="auth-alert">You do not have admin access.</div></main>;
  }

  return (
    <main>
      <section className="page-head">
        <p className="eyebrow">Admin control</p>
        <h1>Member administration</h1>
        <p>View every registered member and monitor the growth of your community.</p>
      </section>

      {error ? <div className="auth-alert">{error}</div> : null}

      <div className="auth-actions" style={{ marginBottom: '1rem' }}>
        <Link className="btn btn-secondary" href="/">Back home</Link>
        <button className="btn btn-primary" type="button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="card">
        <h2>Registered members</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Goal</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Admin</th>
              </tr>
            </thead>
            <tbody>
              {members.map((item) => {
                const isAdmin = item.email === 'rai.rahul.kumar509@gmail.com' || Boolean(item.is_admin);
                return (
                  <tr key={item.id}>
                    <td style={{ padding: '0.75rem 0' }}>{item.full_name}</td>
                    <td style={{ padding: '0.75rem 0' }}>{item.email}</td>
                    <td style={{ padding: '0.75rem 0' }}>{item.goal}</td>
                    <td style={{ padding: '0.75rem 0' }}>{isAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
