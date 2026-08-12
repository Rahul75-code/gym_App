import { supabase, isSupabaseConfigured } from './client';

function ensureConfigured() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured. Add your real anon key to .env.local.');
  }
}

export async function registerMember({ fullName, email, password, goal }) {
  ensureConfigured();

  const normalizedEmail = email.trim().toLowerCase();
  const isAdminUser = normalizedEmail === 'rai.rahul.kumar509@gmail.com';

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        goal: goal || 'maintenance',
      },
    },
  });

  if (signUpError) {
    throw signUpError;
  }


  const userId = authData?.user?.id;

  if (userId) {
    const payloadVariants = [
      {
        user_id: userId,
        full_name: fullName.trim(),
        email: normalizedEmail,
        goal: goal || 'maintenance',
        is_admin: isAdminUser,
      },
      {
        auth_user_id: userId,
        full_name: fullName.trim(),
        email: normalizedEmail,
        goal: goal || 'maintenance',
        is_admin: isAdminUser,
      },
      {
        user_id: userId,
        full_name: fullName.trim(),
        goal: goal || 'maintenance',
        is_admin: isAdminUser,
      },
      {
        auth_user_id: userId,
        full_name: fullName.trim(),
        goal: goal || 'maintenance',
        is_admin: isAdminUser,
      },
    ];

    let memberError = null;

    for (const payload of payloadVariants) {
      const { error } = await supabase.from('members').insert([payload]);

      if (!error) {
        break;
      }

      memberError = error;

      if (error?.message?.includes('does not exist') || error?.message?.includes("Could not find the 'email' column")) {
        continue;
      }

      throw error;
    }

    if (memberError) {
      throw memberError;
    }

    // No separate admin table is required; admin access is derived from the members row.
  }

  return authData;
}

export async function signInMember({ email, password }) {
  ensureConfigured();

  const normalizedEmail = email.trim().toLowerCase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutMember() {
  ensureConfigured();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentSession() {
  ensureConfigured();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
}

export async function getCurrentMember() {
  ensureConfigured();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  const user = sessionData?.session?.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;

  const sessionEmail = sessionData?.session?.user?.email;

  if (data && (data.email === 'rai.rahul.kumar509@gmail.com' || sessionEmail === 'rai.rahul.kumar509@gmail.com')) {
    return { ...data, is_admin: true };
  }

  return data;
}

export async function getAllMembers() {
  ensureConfigured();
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function saveTrackerEntry({ week, weight }) {
  ensureConfigured();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  const user = sessionData?.session?.user;
  if (!user) throw new Error('You must be logged in to save tracker entries.');

  const { data: memberData, error: memberError } = await supabase
    .from('members')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (memberError) throw memberError;
  if (!memberData?.id) throw new Error('Member profile was not found.');

  const { data, error } = await supabase
    .from('trackers')
    .insert([
      {
        member_id: memberData.id,
        user_id: user.id,
        week,
        weight: Number(weight),
      },
    ])
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function getTrackerEntries() {
  ensureConfigured();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  const user = sessionData?.session?.user;
  if (!user) return [];

  const { data: memberData, error: memberError } = await supabase
    .from('members')
    .select('id')
    .eq('auth_user_id', user.id)
    .maybeSingle();

  if (memberError) throw memberError;
  if (!memberData?.id) return [];

  const { data, error } = await supabase
    .from('trackers')
    .select('*')
    .eq('member_id', memberData.id)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}
