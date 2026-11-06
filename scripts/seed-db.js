const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seedDatabase() {
  console.log('🚀 Starting Database Seeding (Bypassing Foreign Keys)...');

  try {
    // 1. DISABLE Foreign Key Checks for the session
    // Since Supabase is a managed service, we can't do 'SET session_replication_role' via JS client easily
    // but we can try to insert a user into auth.users first if the service role allows.
    
    console.log('Attempting to create user in auth.users first...');
    
    // Note: Supabase JS client does not allow direct inserts into auth.users 
    // We must use the Admin API (auth.admin)
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'test@example.com',
      password: 'password123',
      email_confirm: true
    });

    if (authError) throw authError;
    const realUserId = authUser.user.id;
    console.log(`✅ Auth User created with ID: ${realUserId}`);

    // 2. Insert into members table using the REAL auth user ID
    const testUser = {
      full_name: 'Test User',
      email: 'test@example.com',
      goal: 'bulking',
      is_admin: false,
      user_id: realUserId
    };

    console.log(`Adding member profile for ${testUser.full_name}...`);
    const { data: memberData, error: memberError } = await supabase
      .from('members')
      .insert([testUser])
      .select()
      .single();

    if (memberError) throw memberError;
    
    const memberId = memberData.id;
    console.log(`✅ Member profile created with ID: ${memberId}`);

    // 3. Insert test weight logs
    const logs = [
      { user_id: realUserId, member_id: memberId, week: 'Week 1', weight: 75.5 },
      { user_id: realUserId, member_id: memberId, week: 'Week 2', weight: 76.2 },
      { user_id: realUserId, member_id: memberId, week: 'Week 3', weight: 76.8 },
      { user_id: realUserId, member_id: memberId, week: 'Week 4', weight: 77.5 },
    ];

    console.log('Adding weight logs...');
    const { error: logsError } = await supabase
      .from('trackers')
      .insert(logs);

    if (logsError) throw logsError;
    console.log(`✅ Successfully added ${logs.length} weight logs.`);

    console.log('\n🎉 Seeding complete! Real Auth User + Member Profile + Logs created.');
  } catch (err) {
    console.error('\n❌ Seeding failed:', err.message);
  }
}

seedDatabase();
