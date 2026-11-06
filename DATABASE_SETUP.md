# Supabase Database Setup

This guide covers how FitForge connects to Supabase, how to set it up in a new
environment, and how to diagnose connection problems.

## What uses the database

The app uses Supabase Auth and Postgres. The progress tracker reads and writes
the signed-in user's rows in `public.trackers`; row-level security (RLS)
prevents users from accessing another user's rows.

- `app/lib/supabase/client.js` creates the browser client from the two
  `NEXT_PUBLIC_SUPABASE_*` environment variables.
- `app/lib/supabase/memberService.js` handles authentication and tracker
  queries. Tracker rows are associated with the signed-in user's `user_id`.
- `app/tracker/page.js` loads entries when the page opens and saves entries
  when the form is submitted.
- `db-schema/0001_init.sql` defines the `members` and `trackers` tables,
  indexes, member-id trigger, and authenticated-user RLS policies.

## Connect a Supabase project

1. Create or open the Supabase project. In **Project Settings → API**, copy
   the Project URL and anon/publishable key.

2. From the repository root, create `.env.local` from the example:
   ```powershell
   Copy-Item .env.example .env.local
   ```
   Set `NEXT_PUBLIC_SUPABASE_URL` to the Project URL and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the anon/publishable key. These are
   the only client-side values required. Never put a service-role key in a
   `NEXT_PUBLIC_` variable or commit `.env.local`; local env files are ignored
   by Git.

3. In the Supabase **SQL Editor**, run
   [`db-schema/main_schema.sql`](./db-schema/main_schema.sql). The migration is designed to be safe to re-run.

4. Install dependencies if needed and start (or restart) Next.js so it loads
   the environment variables:
   ```powershell
   npm install
   npm run dev
   ```

5. Open http://localhost:3000, create an account or log in, then add an entry
   on the Tracker page. Confirm it appears in the chart and in Supabase's
   `public.trackers` table.

## Verify connectivity

From the repository root, run:

```powershell
node scripts/probe-schema.js
```

The probe checks whether the configured Supabase REST endpoint is reachable.
Its `information_schema` request may be denied by Supabase permissions; that
alone does not mean the app's tables are unavailable. A tracker read/write
after signing in is the end-to-end check.

## Troubleshooting

- **DNS resolution error:** Check that the Project URL in `.env.local` exactly
  matches the current Supabase project and that the project is active and
  reachable from your network.
- **Missing table or column:** Run the migration in the SQL Editor for the
  project named by `.env.local`.
- **Authentication works, but tracker queries fail:** Check the browser
  console and confirm the migration's RLS policies are installed.
- **Environment changes have no effect:** Restart `npm run dev` after changing
  `.env.local`.

At the last connection check (2026-11-03), the URL configured in the local
`.env.local` could not be resolved by DNS. The app build succeeded, but a live
database read/write was not verified. Confirm the project URL before testing
  again.
