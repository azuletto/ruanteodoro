-- Migration 004: correções da auditoria
-- Rodar manualmente no Supabase SQL Editor.
--
-- 1. Coluna articles_title (título da seção de publicações, editável no admin)
-- 2. is_admin() — checa role admin no JWT
-- 3. save_terms() / save_articles() — salvamento atômico (delete+insert numa transação)
-- 4. RLS de escrita restrito a admin (site_content, terms, articles)
-- 5. Bucket de storage "site" para imagens (upload sai do Postgres)

-- ============================================================
-- 1) Nova coluna: título da seção de publicações
-- ============================================================
alter table public.site_content
  add column if not exists articles_title text default 'Publicações e Pesquisas';

-- ============================================================
-- 2) Helper: usuário atual é admin?
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role' = 'admin', false);
$$;

-- ============================================================
-- 3a) Save atômico de termos (delete + insert + versionamento)
-- ============================================================
create or replace function public.save_terms(sections jsonb, changed_by uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  delete from public.terms_sections;

  insert into public.terms_sections (title, content, section_order, updated_at)
  select
    coalesce(s ->> 'title', ''),
    coalesce(s ->> 'content', ''),
    ord - 1,
    now()
  from jsonb_array_elements(sections) with ordinality as t(s, ord);

  insert into public.terms_versions (sections_snapshot, changed_by)
  values (sections, changed_by);
end;
$$;

-- ============================================================
-- 3b) Save atômico de artigos
-- ============================================================
create or replace function public.save_articles(articles jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  delete from public.articles;

  insert into public.articles
    (title, summary, content, image_url, image_fit, link_url, reference,
     citation, published_in, year, article_order, active, updated_at)
  select
    coalesce(a ->> 'title', ''),
    coalesce(a ->> 'summary', ''),
    coalesce(a ->> 'content', ''),
    a ->> 'image_url',
    coalesce(a ->> 'image_fit', 'cover-center'),
    a ->> 'link_url',
    coalesce(a ->> 'reference', ''),
    a ->> 'citation',
    a ->> 'published_in',
    nullif(a ->> 'year', '')::int,
    ord - 1,
    coalesce((a ->> 'active')::boolean, true),
    now()
  from jsonb_array_elements(articles) with ordinality as t(a, ord);
end;
$$;

-- ============================================================
-- 4) RLS: leitura pública continua; escrita só para admin
-- ============================================================
drop policy if exists "authenticated manage site content" on public.site_content;
create policy "admin manage site content"
  on public.site_content
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "terms_sections_auth_write" on public.terms_sections;
create policy "terms_sections_auth_write"
  on public.terms_sections
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "terms_versions_auth_write" on public.terms_versions;
create policy "terms_versions_auth_write"
  on public.terms_versions
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "articles_auth_write" on public.articles;
create policy "articles_auth_write"
  on public.articles
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- 5) Storage: bucket público "site" + políticas admin
-- ============================================================
insert into storage.buckets (id, name, public)
values ('site', 'site', true)
on conflict (id) do nothing;

drop policy if exists "site public read" on storage.objects;
create policy "site public read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site');

drop policy if exists "site admin insert" on storage.objects;
create policy "site admin insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site' and public.is_admin());

drop policy if exists "site admin update" on storage.objects;
create policy "site admin update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site' and public.is_admin())
  with check (bucket_id = 'site' and public.is_admin());

drop policy if exists "site admin delete" on storage.objects;
create policy "site admin delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site' and public.is_admin());
