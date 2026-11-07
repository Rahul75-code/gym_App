"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentMember, signOutMember } from '../lib/supabase/memberService';

export default function Navbar() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const memberData = await getCurrentMember();
        setMember(memberData);
      } catch (err) {
        console.error('Error checking user status:', err);
      } finally {
        setLoading(false);
      }
    }
    checkUser();

    // Poll for session changes every 2 seconds to ensure Navbar stays in sync
    const interval = setInterval(checkUser, 2000);
    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    try {
      await signOutMember();
      window.location.reload(); // Refresh to update navbar state
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <nav className="nav-links">
      <Link href="/">Home</Link>
      <Link href="/BMI">BMI</Link>
      <Link href="/exercises">Exercises</Link>
      <Link href="/tracker">Tracker</Link>
      <Link href="/nutrition">Nutrition</Link>
      <Link href="/blog">Blog</Link>
      
      {!loading && member ? (
        <>
          <span style={{ 
            fontWeight: 'bold', 
            cursor: 'default',
            marginRight: '10px' 
          }}>
            {member.full_name.split(' ')[0]}
          </span>
          {member.is_admin && <Link href="/admin">Admin</Link>}
          <button 
            onClick={handleLogout} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'inherit', 
              cursor: 'pointer', 
              fontSize: 'inherit', 
              fontFamily: 'inherit',
              padding: 0,
              textDecoration: 'underline' 
            }}
          >
            Logout
          </button>
        </>
      ) : (
        !loading && <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
