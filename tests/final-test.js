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

async function runFinalTest() {
  console.log('🚀 Starting Final Pre-Deployment Test Suite...\n');

  try {
    // TEST 1: Registration Flow
    console.log('Test 1: User Registration...');
    const testEmail = `final_test_${Date.now()}@example.com`;
    const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: 'password123',
      email_confirm: true
    });
    if (authErr) throw authErr;

    const { error: memberErr } = await supabase.from('members').insert([
      { user_id: authUser.user.id, full_name: 'Final Test User', email: testEmail, goal: 'bulking' }
    ]);
    if (memberErr) throw memberErr;
    console.log('✅ Registration successful.');

    // TEST 2: Data Retrieval (Login simulation)
    console.log('Test 2: Profile Retrieval...');
    const { data: profile, error: profErr } = await supabase
      .from('members')
      .select('*')
      .eq('user_id', authUser.user.id)
      .single();
    if (profErr || !profile) throw new Error('Could not retrieve created profile');
    console.log(`✅ Profile retrieved for: ${profile.full_name}`);

    // TEST 3: Tracker Functionality
    console.log('Test 3: Weight Log Storage...');
    const { error: logErr } = await supabase.from('trackers').insert([
      { user_id: authUser.user.id, member_id: profile.id, week: 'Test Week', weight: 80.0 }
    ]);
    if (logErr) throw logErr;
    console.log('✅ Weight log saved successfully.');

    // TEST 4: Admin Visibility
    console.log('Test 4: Admin Member List...');
    const { data: allMembers, error: allErr } = await supabase.from('members').select('email');
    if (allErr || !allMembers) throw allErr;
    console.log(`✅ Admin view working. Total members found: ${allMembers.length}`);

    console.log('\n==================================================');
    console.log('🎉 ALL TESTS PASSED! Your app is ready for deployment.');
    console.log('==================================================');

  } catch (err) {
    console.error('\n❌ TEST FAILED:');
    console.error(err.message);
    process.exit(1);
  }
}

runFinalTest();
