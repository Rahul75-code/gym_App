const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually load .env.local to avoid dotenv module issues
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Connecting to Supabase...');
  console.log('URL:', supabaseUrl);

  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Error fetching members:', error);
      if (error.code === '42501') {
        console.log('\n❌ RLS is still ACTIVE. Permission denied.');
      } else if (error.code === 'PGRST116') {
        console.log('\n✅ Connection successful, but the members table is EMPTY.');
      } else {
        console.log('\n❌ Other Database Error:', error.message);
      }
    } else {
      console.log('\n✅ Connection Successful! Data retrieved:');
      console.table(data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testConnection();
