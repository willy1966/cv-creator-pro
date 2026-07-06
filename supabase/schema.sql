-- CV Creator Pro — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL -> New query).

-- ============ PROFILES ============
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  plan text not null default 'free', -- 'free' | 'premium'
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ RESUMES ============
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Untitled resume',
  template text not null default 'modern',
  accent text not null default '#2563EB',
  font text not null default 'sans',
  sections jsonb not null default '{"summary":true,"skills":true,"languages":true,"experience":true,"education":true,"certifications":true}',
  data jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resumes_user_id_idx on public.resumes (user_id, updated_at desc);

alter table public.resumes enable row level security;

create policy "Users can view own resumes"
  on public.resumes for select using (auth.uid() = user_id);

create policy "Users can insert own resumes"
  on public.resumes for insert with check (auth.uid() = user_id);

create policy "Users can update own resumes"
  on public.resumes for update using (auth.uid() = user_id);

create policy "Users can delete own resumes"
  on public.resumes for delete using (auth.uid() = user_id);

-- Keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists resumes_touch on public.resumes;
create trigger resumes_touch
  before update on public.resumes
  for each row execute function public.touch_updated_at();

-- ============ AI USAGE (per-user daily rate limit) ============
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  count int not null default 0,
  primary key (user_id, day)
);

-- RLS on, no policies: clients can never read or write this table directly.
-- All access goes through the security-definer function below.
alter table public.ai_usage enable row level security;

-- Atomically consume one AI credit for today. Returns true if the call is
-- allowed, false if the daily limit is already reached.
create or replace function public.consume_ai_credit(p_limit int default 20)
returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  v_count int;
begin
  if auth.uid() is null then
    return false;
  end if;

  insert into public.ai_usage (user_id, day, count)
  values (auth.uid(), current_date, 1)
  on conflict (user_id, day)
  do update set count = ai_usage.count + 1
  where ai_usage.count < p_limit
  returning count into v_count;

  return v_count is not null;
end;
$$;

revoke execute on function public.consume_ai_credit(int) from public, anon;
grant execute on function public.consume_ai_credit(int) to authenticated;

-- ============ STORAGE (profile photos) ============
-- Create a public bucket named "photos" in Dashboard -> Storage, then run:
-- Note: photos are stored per-user under {user_id}/...
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

create policy "Users can upload own photos"
  on storage.objects for insert
  with check (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update own photos"
  on storage.objects for update
  using (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own photos"
  on storage.objects for delete
  using (bucket_id = 'photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Photos are publicly readable"
  on storage.objects for select using (bucket_id = 'photos');
