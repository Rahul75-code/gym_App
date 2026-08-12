"use client";

import { useEffect, useState } from 'react';
import { getCurrentMember } from '../lib/supabase/memberService';

export default function AuthGate({ children, fallback = null }) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMember() {
      try {
        const currentMember = await getCurrentMember();
        setMember(currentMember);
      } catch (err) {
        setMember(null);
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, []);

  if (loading) return fallback || <div />;
  return member ? children : fallback;
}
