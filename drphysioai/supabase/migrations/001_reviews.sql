-- DrPhysioAI reviews table (public, moderated).
-- Applied to the DrPhysioAI Supabase project. Public can read only approved
-- reviews; anyone may submit, but only as 'pending' (moderated before display).

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60),
  location text check (location is null or char_length(location) <= 60),
  rating smallint not null check (rating between 1 and 5),
  title text check (title is null or char_length(title) <= 120),
  body text not null check (char_length(body) between 10 and 1500),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

-- Public can read ONLY approved reviews.
create policy "public can read approved reviews"
  on public.reviews for select
  to anon, authenticated
  using (status = 'approved');

-- Anyone can submit a review, but only as pending (moderated).
create policy "anyone can submit a pending review"
  on public.reviews for insert
  to anon, authenticated
  with check (status = 'pending');

create index if not exists reviews_status_created_idx
  on public.reviews (status, created_at desc);
