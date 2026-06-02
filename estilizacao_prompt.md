# Manual de Estilização e Design System: Elegância Jurídica

Este documento define estritamente as regras de design, paleta de cores, tipografia e comportamento visual para o projeto de Landing Page jurídica. Nenhuma regra aqui descrita deve ser violada, garantindo consistência visual premium para o deploy na Vercel.

---

## 🎨 Paleta de Cores (Strict Palette)

O projeto deve utilizar rigorosamente as seguintes definições cromáticas para transmitir sobriedade e prestígio:

1. **Cor Principal (Dominante):** `#172e4e` (Azul Marinho Profundo / Midnight Corporate)
   - *Aplicação:* Fundos de seções principais, cabeçalhos, rodapés, cartões de destaque e elementos que necessitam transmitir máxima autoridade e solidez institucional.
2. **Cor de Destaque / Contraste:** `#FFFFFF` (Branco Puro)
   - *Aplicação:* Elementos de corte, textos sobre o fundo azul, bordas finas e botões secundários elegantes.
3. **Sistema de Cores de Texto:**
   - **Sobre fundos escuros (`#172e4e`):** Texto em Branco Puro (`#FFFFFF`) ou Branco Opaco/Cinza Claríssimo (`#E2E8F0`) para textos secundários e descrições.
   - **Sobre fundos claros (`#FFFFFF` ou `#F8FAFC`):** Texto em Preto Corporativo / Grafite Escuro (`#1A202C`) para legibilidade perfeita, utilizando tons de cinza escuro (`#4A5568`) para parágrafos longos.

*Nota de UX:* Para botões de ação cruciais (como o do WhatsApp), é permitida uma variação sutil ou um tom esmeralda muito sóbrio apenas no ícone do aplicativo para identificação visual imediata, mantendo a borda ou o corpo principal dentro do padrão estético elegante.

---

## 🔤 Tipografia e Hierarquia Visual

O projeto deve ser fundamentado na sofisticação editorial.

- **Fonte Principal (Títulos, Headings h1, h2, h3):** `Cormorant` (preferencialmente **Cormorant Garamond** via Google Fonts).
  - *Estilo:* Serifada, clássica, com excelente espaçamento entre letras (*letter-spacing* ligeiramente expandido nos títulos para um visual premium e editorial).
  - *Pesos:* Bold (700) para títulos de seções e Regular (400) ou Medium (500) para subtítulos elegantes.
- **Fonte Secundária (Textos de Apoio, Parágrafos, Botões):** Uma fonte Sans-Serif altamente legível, limpa e neutra, como `Inter`, `Montserrat` ou `Open Sans`.
  - *Motivo:* Manter blocos longos de texto confortáveis de ler no mobile e dar um contraste moderno com a imponência da Cormorant.

---

## 📱 Responsividade e Regras de Layout (Mobile & Desktop)

1. **Abordagem Mobile-First Real:**
   - Elementos em coluna única em telas menores que 768px.
   - Toques fáceis: botões com altura mínima de `48px` e espaçamentos generosos para evitar cliques errados em smartphones.
   - Tamanho das fontes escaláveis (ex: `h1` com `1.8rem` no mobile e `2.5rem` no desktop).

2. **Visual Desktop Elegante:**
   - Layout centralizado com largura máxima de container (`max-width: 1200px`) para evitar que o conteúdo estique infinitamente em telas ultra-wide.
   - Uso sutil de Grid (ou sistema equivalente de colunas) para a área de Atuação e Diferenciais.

3. **Elementos Visuais e Acabamento:**
   - **Bordas:** Finas e discretas (`1px solid rgba(255, 255, 255, 0.1)` ou `#172e4e` dependendo do fundo).
   - **Sombras:** Evitar sombras pesadas ou coloridas. Se necessário, usar apenas um *box-shadow* extremamente suave, quase imperceptível, para dar profundidade aos cards de atuação.
   - **Transições:** Efeitos de *hover* suaves nos botões (`transition: all 0.3s ease`). Botões sobre fundo azul invertem para texto azul e fundo branco, de forma clássica e polida.
