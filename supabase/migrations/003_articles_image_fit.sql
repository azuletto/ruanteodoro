-- Migration: coluna de enquadramento da imagem do artigo
-- Rodar manualmente no Supabase SQL Editor.

ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS image_fit TEXT NOT NULL DEFAULT 'cover-center';

-- Valores aceitos:
--   cover-center  → preenche o card, centralizado (padrão)
--   cover-top     → preenche o card, mostrando o topo da imagem
--   cover-bottom  → preenche o card, mostrando a base da imagem
--   contain       → formato original, imagem inteira dentro do card
