"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentMember, signOutMember } from '../lib/supabase/memberService';

export default function Navbar() {
  const pathname = usePathname();
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

    const interval = setInterval(checkUser, 2000);
    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    try {
      await signOutMember();
      window.location.reload();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'BMI', path: '/BMI' },
    { name: 'Exercises', path: '/exercises' },
    { name: 'Tracker', path: '/tracker' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="nav-links">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          href={item.path} 
          className={pathname === item.path ? 'active' : ''}
        >
          {item.name}
        </Link>
      ))}
      
      {!loading && member ? (
        <>
          <span style={{ 
            fontWeight: 'bold', 
            cursor: 'default',
            marginRight: '10px' 
          }}>
            {member.full_name.split(' ')[0]}
          </span>
          {member.is_admin && <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>Admin</Link>}
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
        !loading && <Link href="/login" className={pathname === '/login' ? 'active' : ''}>Login</Link>
      )}
    </nav>
  );
}
