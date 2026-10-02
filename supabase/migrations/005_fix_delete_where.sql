-- Migration 005: correção — PostgREST do Supabase exige WHERE em DELETE,
-- mesmo dentro de funções RPC. Adiciona WHERE true para satisfazer a proteção
-- mantendo o comportamento de limpar a tabela inteira.

create or replace function public.save_terms(sections jsonb, changed_by uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  delete from public.terms_sections where true;

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

create or replace function public.save_articles(articles jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  delete from public.articles where true;

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
