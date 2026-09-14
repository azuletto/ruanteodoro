create table if not exists public.site_content (
  id int primary key default 1,
  hero_title text,
  hero_subtitle text,
  hero_cta_text text,
  hero_cta_link text,
  about_title text,
  about_bio text,
  about_photo_url text,
  about_highlights jsonb,
  practice_title text,
  practice_subtitle text,
  practice_areas jsonb,
  differentials_title text,
  differentials jsonb,
  faq_title text,
  faq_items jsonb,
  footer_name text,
  footer_oab text,
  footer_address text,
  footer_phone text,
  footer_email text,
  footer_whatsapp text,
  footer_privacy_url text,
  footer_terms_url text,
  footer_copyright text,
  whatsapp_number text,
  email text,
  phone text,
  header_links jsonb,
  section_order jsonb,
  meta_title text,
  meta_description text,
  og_image text,
  section_animations jsonb,
  disable_animations boolean default false,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

alter table public.site_content enable row level security;

drop policy if exists "public read site content" on public.site_content;
create policy "public read site content"
  on public.site_content
  for select
  using (true);

drop policy if exists "authenticated manage site content" on public.site_content;
create policy "authenticated manage site content"
  on public.site_content
  for all
  to authenticated
  using (true)
  with check (true);

insert into public.site_content (id) values (1) on conflict do nothing;

-- IMPORTANT: Disable public signups in Supabase Dashboard > Authentication > Settings > "Disable new user signups".
-- Admin users must be created manually via Dashboard > Authentication > Users.

CREATE TABLE IF NOT EXISTS public.terms_sections (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  section_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.terms_versions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sections_snapshot JSONB NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.terms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.terms_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "terms_sections_public_read" ON public.terms_sections;
CREATE POLICY "terms_sections_public_read" ON public.terms_sections FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "terms_sections_auth_write" ON public.terms_sections;
CREATE POLICY "terms_sections_auth_write" ON public.terms_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "terms_versions_public_read" ON public.terms_versions;
CREATE POLICY "terms_versions_public_read" ON public.terms_versions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "terms_versions_auth_write" ON public.terms_versions;
CREATE POLICY "terms_versions_auth_write" ON public.terms_versions FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.terms_sections (title, content, section_order) VALUES
('Política de Privacidade', E'Esta Política de Privacidade descreve como os dados pessoais\nsão coletados, utilizados e protegidos neste site, em\nconformidade com a Lei Geral de Proteção de Dados Pessoais\n(LGPD — Lei nº 13.709/2018).\n\n1.1 Dados coletados\n\nColetamos apenas os dados estritamente necessários para o\natendimento:\n\n- Nome completo\n- Endereço de e-mail\n- Telefone de contato\n\nEsses dados são fornecidos voluntariamente pelo visitante ao\nentrar em contato e são utilizados exclusivamente para fins de\ncomunicação e atendimento jurídico.\n\n1.2 Finalidade do tratamento\n\nOs dados pessoais são tratados exclusivamente para responder a\nsolicitações de contato, agendar consultas e prestar serviços\njurídicos. Não vendemos, alugamos ou compartilhamos dados\npessoais com terceiros para fins comerciais.\n\n1.3 Retenção de dados\n\nOs dados são mantidos apenas pelo tempo necessário para cumprir\nas finalidades para as quais foram coletados ou para atender a\nobrigações legais aplicáveis. Dados de contatos que não se\ntornam clientes são eliminados em até 12 meses após a última\ninteração.\n\n1.4 Direitos do titular (art. 18, LGPD)\n\nO titular dos dados pode solicitar a qualquer momento:\n\n- Confirmação da existência de tratamento\n- Acesso aos dados\n- Correção de dados incompletos, inexatos ou desatualizados\n- Anonimização, bloqueio ou eliminação de dados\n- Portabilidade dos dados\n- Eliminação dos dados tratados com consentimento\n- Revogação do consentimento\n\n1.5 Cookies\n\nEste site não utiliza cookies de rastreamento ou de terceiros.\nApenas cookies técnicos essenciais podem ser utilizados para o\nfuncionamento básico da página e para manter a sessão de acesso\nrestrito à área administrativa.\n\n1.6 Contato para solicitações\n\nPara exercer seus direitos ou tirar dúvidas sobre esta\npolítica, entre em contato pelo e-mail\ncontato@ruanteodoro.adv.br\nou pelo formulário de contato do site.', 0),
('Termos de Uso', E'2.1 Objeto\n\nEste site tem caráter exclusivamente informativo e não\nconstitui oferta, consulta jurídica ou parecer. O conteúdo aqui\npublicado não substitui a orientação de um advogado\nhabilitado.\n\n2.2 Relação advogado-cliente\n\nA relação advogado-cliente somente se estabelece mediante a\nassinatura de contrato de honorários. O envio de mensagens por\nmeio deste site não cria, por si só, vínculo profissional\nespecífico.\n\n2.3 Propriedade intelectual\n\nTodo o conteúdo deste site (textos, imagens, logotipos e\nlayout) é protegido pela legislação de propriedade intelectual.\nÉ vedada a reprodução sem autorização prévia.\n\n2.4 Limitação de responsabilidade\n\nNão nos responsabilizamos por decisões tomadas com base\nexclusivamente nas informações deste site, nem por\nindisponibilidade temporária do acesso.\n\n2.5 Alterações\n\nEstes termos podem ser atualizados a qualquer momento. A versão\nvigente será sempre a publicada nesta página.', 1)
ON CONFLICT DO NOTHING;
