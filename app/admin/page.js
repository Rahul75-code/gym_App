"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllMembers, getCurrentMember, signOutMember } from '../lib/supabase/memberService';

export default function AdminPage() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAdminAndLoad() {
      try {
        const currentUser = await getCurrentMember();
        
        if (!currentUser || !currentUser.is_admin) {
          setError('Access Denied: Administrator privileges required.');
          // Optional: redirect to tracker if not admin
          // router.push('/tracker');
        } else {
          const allMembers = await getAllMembers();
          setMembers(allMembers);
        }
      } catch (err) {
        setError('Failed to load admin data: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    checkAdminAndLoad();
  }, [router]);

  if (loading) return <div className="admin-loading">Loading Admin Dashboard...</div>;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <h1 style={{ margin: '0' }}>FitForge Admin Console</h1>
          <p className="page-description">
            <span className="text-accent">Manage members</span> and <span className="text-accent">monitor fitness progress</span> across the platform.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={async () => {
          await signOutMember();
          router.push('/login');
        }}>
          Logout
        </button>
      </header>

      {error ? (
        <div className="admin-alert error">{error}</div>
      ) : (
        <div className="admin-content">
          <section className="admin-stats">
            <div className="stat-card">
              <span className="stat-label">Total Members</span>
              <span className="stat-value">{members.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Active Trackers</span>
              <span className="stat-value">{members.filter(m => m.goal !== 'maintenance').length}</span>
            </div>
          </section>

          <section className="admin-table-container">
            <h2>Member Directory</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Goal</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0 ? (
                  members.map((member) => (
                    <tr key={member.id}>
                      <td>{member.full_name}</td>
                      <td>{member.email}</td>
                      <td><span className={`goal-badge ${member.goal}`}>{member.goal}</span></td>
                      <td>{new Date(member.created_at).toLocaleDateString()}</td>
                      <td>{member.is_admin ? 'Admin' : 'Member'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No members found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      )}

      <style jsx>{`
        .admin-page { padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: sans-serif; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .admin-header h1 { margin: 0; color: #333; }
        .admin-header p { color: #666; margin: 0.5rem 0 0 0; }
        .admin-loading { display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 1.2rem; }
        .admin-alert { padding: 1rem; background: #fee2e2; color: #b91c1c; border-radius: 8px; border: 1px solid #f87171; margin-bottom: 2rem; }
        .admin-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .stat-card { padding: 1.5rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; text-align: center; }
        .stat-label { display: block; color: #6b7280; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-value { display: block; font-size: 2rem; font-weight: bold; color: #111827; }
        .admin-table-container h2 { margin-bottom: 1rem; color: #333; }
        .admin-table { width: 100%; border-collapse: collapse; background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .admin-table th { background: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
        .admin-table td { padding: 1rem; border-bottom: 1px solid #e5e7eb; }
        .goal-badge { padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; }
        .goal-badge.bulking { background: #dcfce7; color: #166534; }
        .goal-badge.cutting { background: #fee2e2; color: #991b1b; }
        .goal-badge.maintenance { background: #f3f4f6; color: #374151; }
        .goal-badge.strength { background: #dbeafe; color: #1e40af; }
      `}</style>
    </main>
  );
}
