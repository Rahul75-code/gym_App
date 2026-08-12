-- =============================================================================
-- FitForge Gym — Initial Schema
-- Migration: 0001_init.sql
--
-- Purpose
-- -------
-- Creates the two application tables the FitForge Next.js client expects:
--   * members  — one row per signed-up user, joined to auth.users
--   * trackers — weekly weight log rows, joined to both auth.users and members
--
-- Plus:
--   * Helper trigger that keeps trackers.member_id in sync with members.id
--     automatically when user_id is provided, so the client can stay dumb
--     (it currently pre-resolves member_id itself; this trigger is belt-and-
--     braces for any future code path that only passes user_id).
--   * Row-Level Security so anon roles can't read or write anything, and
--     authenticated users can only see/modify their own rows.
--   * Indexes aligned to the queries the client runs (.eq user_id,
--     .order created_at).
--
-- Notes
-- -----
-- * This file is idempotent where possible (CREATE … IF NOT EXISTS,
--   CREATE OR REPLACE for functions/policies) but NOT wrapped in a
--   transaction because Supabase SQL Editor does not allow DO blocks with
--   transaction control in all contexts. Statements are individually safe
--   to re-run.
-- * If you ran an earlier, partial version, drop and recreate the tables
--   before applying this one; the code's intent was always one clean shape.
-- * Run order in Supabase: open the SQL Editor in your project, paste this
--   file, click "Run". Read the section at the bottom if you hit errors.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- Helper: gen_random_uuid() will be used as default for PKs.

-- ---------------------------------------------------------------------------
-- 1. members
-- ---------------------------------------------------------------------------
create table if not exists public.members (
    id          uuid        primary key default gen_random_uuid(),
    user_id     uuid        not null
                            references auth.users(id)
                            on delete cascade,
    full_name   text        not null,
    email       text,
    goal        text        not null default 'maintenance',
    is_admin    boolean     not null default false,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

-- One FitForge profile per auth user. The unique index also makes the
-- "lookup by user_id" path constant-time without a separate UNIQUE constraint
-- declaration; we still declare unique explicitly for clarity.
create unique index if not exists members_user_id_unique
    on public.members (user_id);

-- The app normalises emails to lower-case on insert, but we add a uniqueness
-- guard so two users can't claim the same email address.
create unique index if not exists members_email_unique
    on public.members (lower(email))
    where email is not null;

create index if not exists members_created_at_idx
    on public.members (created_at desc);

create index if not exists members_is_admin_idx
    on public.members (is_admin)
    where is_admin = true;

-- Email format sanity: Supabase allows free text in text columns; a CHECK
-- gives us a guardrail. Adjust the regex if you want to allow + aliases.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'members_email_format_chk'
  ) then
    alter table public.members
      add constraint members_email_format_chk
      check (email is null or email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$');
  end if;
end$$;

-- Goal enum-ish: limit to a known set rather than free-form text.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'members_goal_chk'
  ) then
    alter table public.members
      add constraint members_goal_chk
      check (goal in ('maintenance', 'cutting', 'bulking', 'endurance', 'flexibility', 'strength'));
  end if;
end$$;

-- Touch updated_at on every UPDATE.
create or replace function public.tg_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end$$;

drop trigger if exists members_touch_updated_at on public.members;
create trigger members_touch_updated_at
  before update on public.members
  for each row execute function public.tg_touch_updated_at();

-- ---------------------------------------------------------------------------
-- 2. trackers
-- ---------------------------------------------------------------------------
create table if not exists public.trackers (
    id          uuid        primary key default gen_random_uuid(),
    user_id     uuid        not null
                            references auth.users(id)
                            on delete cascade,
    member_id   uuid        not null
                            references public.members(id)
                            on delete cascade,
    week        text        not null,
    weight      numeric(5,2) not null check (weight > 0 and weight < 500),
    created_at  timestamptz not null default now()
);

create index if not exists trackers_user_id_idx
    on public.trackers (user_id);

create index if not exists trackers_member_id_created_at_idx
    on public.trackers (member_id, created_at);

-- Defensive trigger: if a future code path only supplies user_id, fill in
-- member_id by looking up the user's single members row. The current app
-- resolves member_id itself, so this is a safety net, not the primary path.
create or replace function public.tg_trackers_fill_member_id()
returns trigger
language plpgsql
as $$
declare
  resolved_member_id uuid;
begin
  if new.member_id is null and new.user_id is not null then
    select id into resolved_member_id
    from public.members
    where user_id = new.user_id
    limit 1;
    new.member_id := resolved_member_id;
  end if;

  if new.member_id is null then
    raise exception 'trackers.member_id could not be resolved from user_id';
  end if;

  -- Cross-check: ensure member_id actually belongs to the same user_id.
  if not exists (
    select 1 from public.members
    where id = new.member_id and user_id = new.user_id
  ) then
    raise exception 'trackers.member_id does not belong to user_id';
  end if;

  return new;
end$$;

drop trigger if exists trackers_fill_member_id on public.trackers;
create trigger trackers_fill_member_id
  before insert on public.trackers
  for each row execute function public.tg_trackers_fill_member_id();

-- ---------------------------------------------------------------------------
-- 3. Row-Level Security
-- ---------------------------------------------------------------------------
alter table public.members  enable row level security;
alter table public.trackers enable row level security;

-- members ---------------------------------------------------------------------
drop policy if exists members_select_own on public.members;
create policy members_select_own on public.members
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists members_select_admin_all on public.members;
create policy members_select_admin_all on public.members
  for select
  to authenticated
  using (
    exists (
      select 1 from public.members m2
      where m2.user_id = auth.uid() and m2.is_admin = true
    )
  );

drop policy if exists members_insert_self on public.members;
create policy members_insert_self on public.members
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists members_update_self on public.members;
create policy members_update_self on public.members
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists members_delete_self on public.members;
create policy members_delete_self on public.members
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Admin override on members: insert/update/delete (mirrors what the code
-- would do when not yet bootstrapped as a user). Most admin flows go via
-- service role, but this lets rai.rahul.kumar509@gmail.com maintain rows
-- from the client when needed.
drop policy if exists members_admin_modify on public.members;
create policy members_admin_modify on public.members
  for all
  to authenticated
  using (
    exists (
      select 1 from public.members m2
      where m2.user_id = auth.uid() and m2.is_admin = true
    )
  )
  with check (
    exists (
      select 1 from public.members m2
      where m2.user_id = auth.uid() and m2.is_admin = true
    )
  );

-- trackers --------------------------------------------------------------------
drop policy if exists trackers_select_own on public.trackers;
create policy trackers_select_own on public.trackers
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists trackers_insert_own on public.trackers;
create policy trackers_insert_own on public.trackers
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists trackers_update_own on public.trackers;
create policy trackers_update_own on public.trackers
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists trackers_delete_own on public.trackers;
create policy trackers_delete_own on public.trackers
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 4. Realtime (optional)
-- ---------------------------------------------------------------------------
-- The admin dashboard does not currently subscribe to realtime updates, but
-- uncomment if you ever want live member/list views. Skip for now to keep the
-- migration minimal.

-- alter publication supabase_realtime add table public.members;
-- alter publication supabase_realtime add table public.trackers;

-- ---------------------------------------------------------------------------
-- 5. Granted roles
-- ---------------------------------------------------------------------------
-- Supabase grants on tables default to PUBLIC (which includes anon +
-- authenticated) but our RLS policies filter them. No explicit GRANTs are
-- required; RLS does the gating.

-- ---------------------------------------------------------------------------
-- 6. Backfill for the existing admin
-- ---------------------------------------------------------------------------
-- After running this migration, the very first time
-- rai.rahul.kumar509@gmail.com signs up via your signup route, the regular
-- INSERT will succeed (members_insert_self allows self-insert) and the app
-- code already sets is_admin=true when that email is used, so no backfill is
-- strictly required. The block below is left commented as a recovery path:
--
-- update public.members
-- set is_admin = true
-- where lower(email) = 'rai.rahul.kumar509@gmail.com';

-- =============================================================================
-- End of 0001_init.sql
-- =============================================================================
