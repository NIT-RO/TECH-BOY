-- Schéma PostgreSQL DÉDUIT du front d'ECSEL Academy (reconstitution, pas l'original).
-- Les colonnes marquées "observé" apparaissent dans le HTML ; les autres sont déduites.

create table domains (
  id          uuid primary key default gen_random_uuid(),   -- observé (UUID v4)
  name_fr     text not null,
  name_ar     text not null,                                -- observé
  tagline     text,                                         -- observé (darija latine)
  position    int  not null default 0                       -- ordre du prisme / des chips
);

create table formations (
  id            uuid primary key default gen_random_uuid(), -- observé
  domain_id     uuid not null references domains(id),
  code          text unique not null,                       -- observé : R13, F05...
  title_fr      text not null,
  title_ar      text not null,                              -- observé
  summary_fr    text,
  summary_ar    text,                                       -- observé
  duration_days int  not null,                              -- observé
  coming_soon   boolean not null default false,             -- observé (badge "قريبًا")
  price_dzd     int,                                        -- null => "prix au stand"
  is_published  boolean not null default true,
  position      int not null default 0
);

create table sessions (
  id            uuid primary key default gen_random_uuid(),
  formation_id  uuid not null references formations(id),
  start_date    date not null,
  end_date      date not null,
  room          text,
  capacity      int,
  seats_taken   int not null default 0                      -- classe CSS "seats none|few|ok"
);

create type preferred_time as enum ('morning', 'afternoon', 'evening');
create type lead_status    as enum ('new', 'contacted', 'enrolled', 'lost');

create table leads (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null check (char_length(full_name) <= 80),   -- observé
  phone           text not null,                                        -- observé
  domain_id       uuid references domains(id),     -- interest = "d:<uuid>"
  formation_id    uuid references formations(id),  -- interest = "f:<uuid>"
  preferred_time  preferred_time,                  -- observé ("" => null)
  message         text check (char_length(message) <= 500),             -- observé
  locale          text not null default 'fr',      -- observé (ar|fr)
  source          text not null default 'site',    -- observé
  status          lead_status not null default 'new',
  assigned_to     uuid,                            -- membre de l'équipe (/login)
  created_at      timestamptz not null default now()
);
