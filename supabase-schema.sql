-- Study With Me — Supabase Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- Enable realtime for study_rooms
create table if not exists study_rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  host_user_id uuid references auth.users(id) on delete cascade,
  is_public boolean default true,
  room_code text unique not null,
  background_theme text default 'midnight',
  ambient_sound_preset text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table study_rooms enable row level security;

-- Anyone can read public rooms
create policy "Public rooms are viewable by everyone"
  on study_rooms for select
  using (is_public = true);

-- Authenticated users can create rooms
create policy "Authenticated users can create rooms"
  on study_rooms for insert
  to authenticated
  with check (host_user_id = auth.uid());

-- Host can update/delete their rooms
create policy "Host can update own rooms"
  on study_rooms for update
  to authenticated
  using (host_user_id = auth.uid());

create policy "Host can delete own rooms"
  on study_rooms for delete
  to authenticated
  using (host_user_id = auth.uid());

-- Study sessions table
create table if not exists study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  room_id uuid references study_rooms(id) on delete set null,
  started_at timestamptz default now(),
  ended_at timestamptz,
  duration_minutes integer default 0,
  pomodoros_completed integer default 0
);

alter table study_sessions enable row level security;

create policy "Users can manage own sessions"
  on study_sessions for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Enable Realtime for study_rooms
alter publication supabase_realtime add table study_rooms;
