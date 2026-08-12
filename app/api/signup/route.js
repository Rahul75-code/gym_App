import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resolveSignupEmail } from '../../lib/supabase/signupHelpers.mjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isPlaceholder(value) {
  return !value || value.includes('your-') || value.includes('placeholder') || value.includes('replace-with');
}

function createSupabaseClient(useAdmin = false) {
  if (!supabaseUrl || isPlaceholder(supabaseUrl)) {
    throw new Error('Supabase URL is missing or invalid.');
  }

  if (useAdmin && serviceRoleKey && !isPlaceholder(serviceRoleKey)) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  if (!supabaseAnonKey || isPlaceholder(supabaseAnonKey)) {
    throw new Error('Supabase anon key is missing or invalid.');
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getFriendlyAuthError(error) {
  const message = error?.message || '';
  const normalized = message.toLowerCase();

  if (normalized.includes('rate limit') || normalized.includes('too many requests') || normalized.includes('email rate limit')) {
    return 'Signup is temporarily rate-limited. Please wait a few minutes and try again, or use a different email address.';
  }

  if (normalized.includes('invalid login credentials') || normalized.includes('user already registered')) {
    return message;
  }

  return message || 'Unable to create your account right now.';
}

async function insertMemberProfile(client, { userId, fullName, email, goal, isAdminUser }) {
  const normalizedEmail = email?.trim().toLowerCase();
  const basePayload = {
    full_name: fullName.trim(),
    goal: goal || 'maintenance',
    is_admin: isAdminUser,
  };

  const attempts = [
    { user_id: userId, ...basePayload, ...(normalizedEmail ? { email: normalizedEmail } : {}) },
    { auth_user_id: userId, ...basePayload, ...(normalizedEmail ? { email: normalizedEmail } : {}) },
    { user_id: userId, ...basePayload },
    { auth_user_id: userId, ...basePayload },
  ];

  let lastError = null;

  for (const payload of attempts) {
    const { error } = await client.from('members').insert([payload]);

    if (!error) {
      return;
    }

    lastError = error;

    if (error?.message?.includes('does not exist') || error?.message?.includes("Could not find the 'email' column")) {
      continue;
    }

    throw error;
  }

  throw lastError;
}

export async function POST(request) {
  try {
    const { fullName, email, password, goal } = await request.json();

    if (!fullName?.trim() || !password) {
      return NextResponse.json({ error: 'Please provide your full name and password.' }, { status: 400 });
    }

    const normalizedEmail = resolveSignupEmail(email, fullName);
    const isAdminUser = normalizedEmail === 'rai.rahul.kumar509@gmail.com';

    const client = createSupabaseClient(Boolean(serviceRoleKey && !isPlaceholder(serviceRoleKey)));

    let authData;
    if (serviceRoleKey && !isPlaceholder(serviceRoleKey)) {
      const { data, error } = await client.auth.admin.createUser({
        email: normalizedEmail,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName.trim(),
          goal: goal || 'maintenance',
        },
      });

      if (error) {
        throw error;
      }

      authData = data;
    } else {
      const { data, error } = await client.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            goal: goal || 'maintenance',
          },
        },
      });

      if (error) {
        throw error;
      }

      authData = data;
    }

    const userId = authData?.user?.id ?? authData?.session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'The account was created, but no user ID was returned.' }, { status: 500 });
    }

    await insertMemberProfile(client, {
      userId,
      fullName,
      email: normalizedEmail,
      goal,
      isAdminUser,
    });

    return NextResponse.json({
      success: true,
      userId,
      isAdmin: isAdminUser,
    });
  } catch (error) {
    console.error('Signup failed:', error);
    return NextResponse.json({
      error: getFriendlyAuthError(error),
    }, { status: 500 });
  }
}
