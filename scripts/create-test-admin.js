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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestAdmin() {
  console.log('Creating test administrator...');
  
  try {
    // 1. Create user in Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'testadmin@example.com',
      password: 'password123',
      email_confirm: true
    });

    if (authError) throw authError;
    const userId = authUser.user.id;

    // 2. Create corresponding Member profile with is_admin = true
    const { error: memberError } = await supabase.from('members').insert([
      {
        user_id: userId,
        full_name: 'Test Admin',
        email: 'testadmin@example.com',
        goal: 'maintenance',
        is_admin: true,
      },
    ]);

    if (memberError) throw memberError;

    console.log('✅ Test Admin created successfully!');
    console.log('Email: testadmin@example.com');
    console.log('Password: password123');
    console.log('You can now use these credentials to log in and access the /admin page.');
  } catch (err) {
    console.error('❌ Failed to create test admin:', err.message);
  }
}

createTestAdmin();
