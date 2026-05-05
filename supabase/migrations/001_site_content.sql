-- Run this in Supabase SQL Editor (https://supabase.com/dashboard) once.

create table if not exists public.site_content (
  id integer primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Public read (portfolio pages use anon key)
create policy "Allow public read site_content"
  on public.site_content for select
  using (true);

-- Inserts/updates go through service role only (no policy for anon write)

insert into public.site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;
