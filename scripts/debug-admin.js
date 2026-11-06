const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = 'C:\\Users\\ASUS\\Desktop\\tech\\projects\\gym app\\.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function debugAdmin() {
  const adminEmail = 'testadmin@example.com';
  console.log(`Debugging Admin Account: ${adminEmail}...\n`);

  try {
    const { data: { users }, error: authErr } = await supabase.auth.admin.listUsers();
    if (authErr) throw authErr;

    const user = users.find(u => u.email === adminEmail);

    if (!user) {
      console.log('❌ ERROR: User not found in auth.users');
      return;
    }
    console.log(`✅ Auth User found. ID: ${user.id}`);
    console.log(`   Confirmed: ${user.confirmed_at ? 'Yes' : 'No'}`);
    console.log(`   Last Sign-In: ${user.last_sign_in_at || 'Never'}`);

    const { data: profile, error: profErr } = await supabase
      .from('members')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profErr || !profile) {
      console.log('❌ ERROR: Member profile missing for this user.');
    } else {
      console.log(`✅ Profile found. Name: ${profile.full_name}, Admin: ${profile.is_admin}`);
    }

  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

debugAdmin();
