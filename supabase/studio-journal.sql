-- Run this file ONCE in Supabase SQL Editor to enable Studio Journal.
create extension if not exists "uuid-ossp";

create table if not exists courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  code text,
  teacher_name text,
  semester text,
  description text,
  cover_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);
create table if not exists journal_entries (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade not null,
  slug text unique not null,
  title text not null,
  synopsis text,
  process_notes text,
  cover_url text,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);
create table if not exists journal_feedback (
  id uuid primary key default uuid_generate_v4(),
  entry_id uuid references journal_entries(id) on delete cascade not null,
  name text not null,
  role text,
  message text not null check (char_length(message) between 2 and 1600),
  created_at timestamptz default now()
);
alter table courses enable row level security;
alter table journal_entries enable row level security;
alter table journal_feedback enable row level security;

-- Safe, idempotent policies. Public feedback is intentionally immediate, at the owner's request.
do $$ begin
 if not exists (select 1 from pg_policies where tablename='courses' and policyname='public read courses') then create policy "public read courses" on courses for select using (true); end if;
 if not exists (select 1 from pg_policies where tablename='courses' and policyname='admin manage courses') then create policy "admin manage courses" on courses for all to authenticated using (true) with check (true); end if;
 if not exists (select 1 from pg_policies where tablename='journal_entries' and policyname='public read journal entries') then create policy "public read journal entries" on journal_entries for select using (published=true or auth.role()='authenticated'); end if;
 if not exists (select 1 from pg_policies where tablename='journal_entries' and policyname='admin manage journal entries') then create policy "admin manage journal entries" on journal_entries for all to authenticated using (true) with check (true); end if;
 if not exists (select 1 from pg_policies where tablename='journal_feedback' and policyname='public read feedback') then create policy "public read feedback" on journal_feedback for select using (true); end if;
 if not exists (select 1 from pg_policies where tablename='journal_feedback' and policyname='public submit feedback') then create policy "public submit feedback" on journal_feedback for insert with check (char_length(message) between 2 and 1600); end if;
 if not exists (select 1 from pg_policies where tablename='journal_feedback' and policyname='admin manage feedback') then create policy "admin manage feedback" on journal_feedback for all to authenticated using (true) with check (true); end if;
end $$;
