// Quick schema probe. Reads PUBLIC schema columns via anon key.
// Sensitive rows are never fetched — only column metadata.
const fs = require('fs');
const path = require('path');

// Naive .env.local parser (no dotenv dep installed)
const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
for (const line of env.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eq = trimmed.indexOf('=');
  if (eq < 0) continue;
  const k = trimmed.slice(0, eq).trim();
  const v = trimmed.slice(eq + 1).trim();
  if (!process.env[k]) process.env[k] = v;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL or ANON_KEY in .env.local');
  process.exit(2);
}

(async () => {
  // Use REST root info to see if we can reach the DB.
  const root = await fetch(url + '/rest/v1/', {
    headers: { apikey: key, Authorization: 'Bearer ' + key },
  });
  console.log('REST root:', root.status, root.statusText);

  // Try to introspect columns. On most Supabase projects, anon can read
  // information_schema via PostgREST's RPC... but usually no. So this often
  // 401/403 and we'll fall back to listing tables via PostgREST root.
  const probe = await fetch(url + '/rest/v1/information_schema.columns?select=table_name,column_name,data_type,is_nullable&table_schema=eq.public', {
    headers: { apikey: key, Authorization: 'Bearer ' + key },
  });
  console.log('info_schema probe status:', probe.status);
  if (probe.ok) {
    const body = await probe.json();
    console.log(JSON.stringify(body, null, 2));
  } else {
    console.log('Body:', (await probe.text()).slice(0, 400));
  }
})().catch((e) => { console.error(e); process.exit(1); });
