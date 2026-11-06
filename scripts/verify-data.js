const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually load .env.local from the original project path
const envPath = 'C:\\Users\\ASUS\\Desktop\\tech\\projects\\gym app\\.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Connecting to Supabase...');

  try {
    const { data, error } = await supabase
      .from('members')
      .select('*');

    if (error) {
      console.error('Error fetching members:', error);
    } else {
      console.log('\n✅ Connection Successful! Members in database:');
      console.table(data);
    }

    const { data: trackerData, error: trackerError } = await supabase
      .from('trackers')
      .select('*');

    if (trackerError) {
      console.error('Error fetching trackers:', trackerError);
    } else {
      console.log('\n✅ Connection Successful! Weight logs in database:');
      console.table(trackerData);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testConnection();
