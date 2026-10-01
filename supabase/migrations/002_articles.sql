-- Migration: tabela de artigos acadêmicos
-- Rodar manualmente no Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS public.articles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  link_url TEXT,
  reference TEXT NOT NULL DEFAULT '',
  citation TEXT,
  published_in TEXT,
  year INT,
  article_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "articles_public_read" ON public.articles;
CREATE POLICY "articles_public_read"
  ON public.articles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "articles_auth_write" ON public.articles;
CREATE POLICY "articles_auth_write"
  ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Artigo inicial: Perfilamento para Publicidade Direcionada (IusTech, 2026)
INSERT INTO public.articles (title, summary, content, image_url, link_url, reference, citation, published_in, year, article_order, active) VALUES
(
  'Perfilamento para Publicidade Direcionada',
  'Este estudo investiga como a prática de perfilamento para publicidade direcionada, embora não expressamente vedada pela LGPD, pode ser entendida como prática abusiva à luz do Art. 39 do CDC, visto que o rastreamento via cookies e sistemas preditivos, frequentemente sem o consentimento livre e informado do usuário, aprofunda a assimetria de poder/informação, minando a autonomia e a capacidade de escolha do consumidor.',
  'Este estudo investiga como a prática de perfilamento para publicidade direcionada, embora não expressamente vedada pela LGPD, pode ser entendida como prática abusiva à luz do Art. 39 do CDC, visto que o rastreamento via cookies e sistemas preditivos, frequentemente sem o consentimento livre e informado do usuário, aprofunda a assimetria de poder/informação, minando a autonomia e a capacidade de escolha do consumidor.',
  NULL,
  'https://ijeditores.com/pop.php?option=articulo&Hash=7b9e617f6f76ab44508e4bd784a8f9e7',
  'TEODORO, Ruan Ricardo; ABILIO, Juan Roque. Perfilamento para publicidade direcionada: prática abusiva à luz do Código de Defesa do Consumidor e da LGPD? IusTech: Revista de Derecho y Tecnologia, n. 9, set. 2026.',
  'IJ-VI-CDXII-541',
  'IusTech: Revista de Derecho y Tecnologia',
  2026,
  1,
  true
)
ON CONFLICT DO NOTHING;
