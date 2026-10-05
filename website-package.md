# Website Package

## Revision 2 — feedback de arte-final da cliente (ver revision-2-brief.md)

Implementado in-place sobre este mesmo projeto (`v5/`), a partir do
feedback literal de `v7/revision-2-brief.md`. Resumo por seção:

- **Geral:** novo `src/lib/whatsapp.ts` (`getWhatsAppLink(message?)`,
  número `5542999309658`) — todo CTA do site agora usa este helper em
  vez de `href="#contato"`/formulário. Auditoria de fundos
  `#fff`/`white` concluída: só havia um caso real (`Testimonials.module.css`,
  `.card`), corrigido para `var(--color-offwhite)`. `--margin-inline`
  (tokens.css) reduzido de `clamp(20px,5vw,80px)` para
  `clamp(16px,3vw,40px)` — herdado por `.container` em todo o site.
- **Header/Footer:** itens de nav deixam de ser `text-transform:
  uppercase` (agora respeitam a capitalização já correta de
  `site.ts`: "Home", "Sobre", "Portfólio", "Serviços"). "Contato"
  agora é o link de WhatsApp (`NAV_ITEMS` ganhou `external: true`,
  abre em nova aba). Footer reestruturado em 3 colunas (nav / logo
  `barb-mark-cream.png` / frase de impacto); campo `FOOTER.script`
  ("Estúdio Criativo") removido do rodapé.
- **Hero:** "BARB" tipográfico substituído pela logo real
  (`barb-mark-cream.png`, melhor contraste sobre o fundo graphite sem
  foto). Elipse com `margin-top` negativo sobrepondo a base da logo.
  Texto do círculo força `white-space: nowrap` + piso do `clamp()`
  bem mais baixo (novo token `--text-hero-script`) para nunca quebrar
  linha. Subtexto em novo token `--text-hero-subtext` (bem menor),
  CAPS LOCK, quebrado em 2 linhas fixas via `<span>`.
- **O que faço:** composição centralizada; travessão removido do
  corpo (copy reescrita conforme o brief); label em negrito/maior,
  centralizado; CTA invertido (fundo preto/texto branco por padrão,
  inverte no hover).
- **Faixa de trabalhos em movimento:** `margin-right` das peças caiu
  de `var(--space-3)` (24px) para `2px`.
- **Faixa "Criatividade com propósito":** invertida (off-white/preto),
  loop removido (não usa mais `<Marquee>`, é texto estático), bordas
  finas pretas topo/base, fonte menor (`--text-strip`), faixa mais
  estreita.
- **Serviços:** `--text-service-title` e `--text-service-script`
  reduzidos para bem menos da metade do pico anterior (120px/193px ->
  48px/72px), mantendo a proporção entre a variante normal e a
  script. `[06]` corrigido para "STORYMAKER EVENTOS" em `site.ts`
  (slug também atualizado para `storymaker-eventos` — sem referências
  externas a esse slug, seguro renomear).
- **"Trabalhos recentes" → "Conheça mais de mim":** `RecentWork.tsx`
  repaginado por completo — deixou de mostrar os 2 cards de projeto.
  Agora é um split 50/50 full-bleed (2 metades com fallback
  tipográfico, uma por `public/images/vanessa-*.webp` pendente) com
  scrim + copy sobreposta "POR TRÁS DA BARB" (teaser) e um link
  discreto "Ver portfólio completo" → `/portfolio`. `/portfolio` e
  `/portfolio/[slug]` não mudaram.
- **Depoimentos:** removido do fluxo renderizado em `app/page.tsx`
  (import e `<Testimonials />` comentados/retirados, não deletados).
  Componente e dados (`Testimonials.tsx`, `TESTIMONIALS`/
  `TESTIMONIALS_SECTION`) continuam no código — basta reimportar.
- **Sobre mim:** separada da seção de fotos (agora "Conheça mais de
  mim"). Antes do texto, nova faixa fina `por trás da barb`
  (off-white/preto, bordas finas, mesmas proporções da faixa
  conceitual) — **decisão de ambiguidade:** o brief deixou em aberto
  se esta faixa deveria ficar estática (como a conceitual, que perdeu
  o loop nesta rodada) ou continuar em loop; mantive o loop
  (`<Marquee>`, confirmado no HTML renderizado) porque a cliente
  descreveu literalmente "escrito 'por trás da barb' repetidamente" —
  leitura mais consistente com um marquee do que com um texto
  estático único. Fácil de trocar por um `<span>` estático em
  `About.tsx` se a cliente preferir o contrário. Seção principal:
  fundo preto, metade esquerda = texto (título + 3 parágrafos +
  assinatura, alinhado à esquerda), metade direita = foto de fundo +
  "polaroid" decorativa (moldura branca, rotação, sombra, "grampo"
  via `::before`) — ambas em fallback tipográfico. CTA "Vamos
  conversar" → WhatsApp.
- **Contato:** formulário removido por completo — `ContactForm.tsx`,
  `app/api/contact/route.ts`, `lib/contact-validation.ts`,
  `lib/rate-limit.ts` e `lib/email.ts` foram **deletados** (confirmado
  por grep que nenhum outro arquivo os importava antes de remover). A
  seção agora é um CTA direto (título + corpo + botão) para o
  WhatsApp, sem nenhum campo.

**Verificação real nesta rodada:** `npm run build`, `npm run lint` e
`npx tsc --noEmit` rodados limpos após as mudanças (ver seção
Performance and links, atualizada). Testado via `next start` + `curl`
contra `localhost:3000`: `/api/contact` responde `404` (rota não existe
mais); nenhuma ocorrência de "Depoimentos"/"CRIATIVIDADE QUE DEIXA
MARCA" no HTML da home; 24 ocorrências de `wa.me/5542999309658` no HTML
da home (header, footer, "O que faço", 6 CTAs de serviço, "Sobre mim",
Contato); a faixa conceitual não tem mais o wrapper `marquee` no HTML,
a faixa "por trás da barb" do Sobre mim continua com ele.

**Não aplicado 100% / pendências:** nenhum item do
`revision-2-brief.md` ficou sem implementação — os únicos pendentes
continuam sendo os mesmos já registrados na Revision 1 (fotos reais da
Vanessa para Hero/"Conheça mais de mim"/polaroid, depoimentos reais,
domínio de produção), todos com estrutura/layout já pronta para
receber o material real sem mudança de componente.

## File tree and routes

Projeto Next.js 16 (App Router) + TypeScript, raiz em `v5/` (este
diretório). Sem Tailwind — tokens CSS + CSS Modules.

```
v5/
├── .env.example
├── README.md
├── website-package.md          (este arquivo)
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── public/
│   ├── brand/                   (vazio — aguarda barb-logo.svg)
│   ├── images/                  (vazio — aguarda vanessa-hero.webp / vanessa-about.webp)
│   └── projects/
│       ├── projeto-01/          (vazio — aguarda mídia real)
│       └── projeto-02/          (vazio — aguarda mídia real)
└── src/
    ├── content/
    │   ├── site.ts               # toda copy institucional, nav, SEO, microcopy
    │   └── projects.ts           # os 2 projetos placeholder + helpers
    ├── lib/
    │   ├── preview.ts            # isPreviewMode()
    │   ├── whatsapp.ts           # Revision 2: getWhatsAppLink() central (todo CTA)
    │   ├── useFocusTrap.ts       # foco preso + Escape + retorno de foco
    │   └── useReducedMotion.ts
    ├── styles/
    │   └── tokens.css            # custom properties (cor/tipografia/espaço/raio)
    ├── components/
    │   ├── layout/ (Header, MobileMenu, Footer, SkipLink)
    │   ├── sections/ (Hero, WhatIDo, MovingWorkStrip, ConceptualStrip,
    │   │              Services, RecentWork, Testimonials, About,
    │   │              Contact, ContactForm)
    │   ├── portfolio/ (ProjectGallery — grid + lightbox)
    │   └── ui/ (Reveal, Marquee, PlaceholderMedia, ProvisionalBadge)
    └── app/
        ├── layout.tsx             # fontes (next/font/google), html lang="pt-BR"
        ├── globals.css            # reset, utilitários, marquee/reveal/reduced-motion
        ├── icon.tsx               # favicon tipográfico "B" (fallback, ver Open issues)
        ├── page.tsx               # Home — Revision 2: 7 seções renderizadas (Depoimentos
        │                          # retirado do fluxo, Testimonials.tsx continua no código)
        └── portfolio/
            ├── page.tsx           # /portfolio — galeria + filtros + estado vazio
            ├── page.module.css
            └── [slug]/
                ├── page.tsx       # /portfolio/[slug]
                └── page.module.css
```

**Rotas:**
- `/` — Home (Header/Footer vêm do layout; corpo com as 9 seções restantes em ordem fixa).
- `/portfolio` — galeria completa, filtro por categoria (oculto — ver Implementation status), estado vazio textual.
- `/portfolio/[slug]` — `/portfolio/projeto-01` e `/portfolio/projeto-02` (via `generateStaticParams`), 404 real (`notFound()`) para slugs inexistentes.
- `/api/contact` — **removida na Revision 2** (formulário de contato não existe mais; confirmado `404` via `curl` contra `next start`).

## Implementation status

Home, seção por seção:

1. **Header** — implementado. Claro, marca "BARB" central, nav dividida em dois grupos (desktop) + `MobileMenu` (foco preso, Escape fecha, foco retorna ao botão). **Simplificação assumida:** centralização da marca é via `justify-content: space-between` com três blocos flex, não um grid de 3 colunas fixas — visualmente próxima ao pedido, mas não matematicamente perfeita se os dois grupos de nav tiverem larguras muito diferentes (não é o caso aqui: 3 itens vs. 2 itens de tamanho parecido).
2. **Hero** — implementado conforme camadas do visual-direction.md, **exceto a foto**: como `public/images/vanessa-hero.webp` não existe, a camada de fotografia/scrim não é renderizada — usa o fallback explicitamente previsto no briefing (fundo `--color-graphite` liso, composição tipográfica idêntica, sem `<img>`, sem ícone de imagem quebrada). A animação Ken Burns (`.hero-kenburns`) está pronta em CSS mas só se aplica quando a foto existir (comentário no componente aponta onde religar).
3. **O que faço** — implementado literalmente (label, corpo, CTA → `#contato`).
4. **Faixa de trabalhos em movimento** — implementada como marquee CSS (ver Marquee.tsx), consumindo os slots de galeria de `projects.ts`. **Simplificação assumida e documentada:** como não há mídia real, os ~8 slots mostram placeholders tipográficos (título do projeto) em vez de peças reais; cada tile linka para `/portfolio/[slug]` (navega para a galeria do projeto) em vez de abrir a galeria inline na própria home — mais acessível/robusto que replicar um comportamento de abertura inline que a pesquisa da Rita não confirmou para a referência.
5. **Faixa conceitual** — implementada (texto em loop, cópia `aria-hidden`, pausa automática + botão sempre visível).
6. **Serviços** — implementado literalmente, 6 linhas, `[06] Storimaker` sem slot de mídia (conforme instrução explícita do briefing).
7. **Trabalhos recentes** — implementado; 2 cards (Projeto 01/02), badge "Conteúdo provisório" só em preview.
8. **Depoimentos** — implementado com a regra de visibilidade exata: como os 2 únicos depoimentos têm `publishable: false`, a seção inteira retorna `null` (não renderiza nada) quando `NEXT_PUBLIC_PREVIEW_MODE` não é `"true"`. Em preview, aparece com o aviso "Exemplo fictício para visualização do layout." em cada card.
9. **Sobre mim** — implementado (3 parágrafos literais, assinatura, CTA); foto usa o mesmo fallback tipográfico do Hero (sem `public/images/vanessa-about.webp`).
10. **Contato** — implementado: formulário client-side (`ContactForm.tsx`, dentro de `<Suspense>` por usar `useSearchParams`) + validação dupla (client básica via `type="tel"`/`required` nativo removido a favor de validação JS própria, e validação server-side autoritativa em `/api/contact`). Honeypot oculto (`aria-hidden`, `tabIndex={-1}`, sem label visível). Campo oculto `servico` é preenchido via `?servico={slug}` quando o visitante vem de um CTA de serviço.

Rotas adicionais:
- **`/portfolio`** — implementada com filtro por categoria **oculto**: nenhum dos 2 projetos placeholder tem `category` definida (o briefing proíbe inventar categoria para eles), então `getCategories()` retorna lista vazia e o bloco de filtros nem é renderizado — comportamento correto de "oculta filtros vazios", só não demonstrável visualmente até existir ao menos 1 projeto real com categoria.
- **`/portfolio/[slug]`** — implementada: título, resumo, "Minha participação" (sempre presente — ver nota abaixo), galeria com lightbox (foco preso, Escape, setas, `object-fit: contain`), "Próximo projeto", CTA final. Seção "Resultados" **omitida inteiramente** (nenhum JSX renderizado), como exigido. **Nota sobre `participation`:** o briefing define 4 valores possíveis ("criação autoral" | "adaptação de identidade" | "diagramação" | "edição") para projetos reais; como os 2 projetos atuais são 100% placeholder, usei um 5º valor explícito `"a definir"` em vez de atribuir um dos 4 arbitrariamente — evita inventar um dado de participação que a cliente não forneceu.

API:
- **`POST /api/contact`** — implementada e testada de ponta a ponta nesta sessão (via `curl` contra `next start`, não apenas lida): honeypot preenchido → `200 {ok:true}` sem enviar e-mail; nome/telefone inválidos → `400` com as mensagens literais do copy.md; sem as 3 env vars → `503 {error:"unavailable"}` (nunca simula sucesso); 6ª requisição da mesma origem em 10 min → `429`. **Não testado nesta sessão:** envio real via Resend com uma API key válida (nenhuma credencial real foi fornecida) — o caminho de sucesso real e o caminho `provider_error` (502) estão implementados e revisados, mas não exercitados contra a API de verdade.

## SEO by language

Único idioma: **pt-BR** (`<html lang="pt-BR">` no `RootLayout`). Sem
`hreflang`/alternates — conforme strategy.md.

| Rota | Title | Description |
|---|---|---|
| `/` | BARB Estúdio Criativo \| Design, Websites e Social Media | Design com propósito para marcas que querem construir presença. Identidade visual, websites, social media, vídeos, apresentações e storiemaker para eventos com Vanessa Santos Barbosa. |
| `/portfolio` | Portfólio \| BARB Estúdio Criativo | Trabalhos de identidade visual, websites, social media e vídeo assinados por Vanessa Santos Barbosa, fundadora da BARB Estúdio Criativo. |
| `/portfolio/[slug]` | `{Título do Projeto} \| Portfólio BARB Estúdio Criativo` | gerada a partir de `project.summary`, truncada a 155 caracteres (`generateMetadata` em `[slug]/page.tsx`) |

**Canonical, `sitemap.xml`, `robots.txt` e `metadataBase`: deliberadamente NÃO
gerados.** Não há domínio real configurado para este projeto — gerar
qualquer um desses artefatos exigiria inventar um domínio, o que o
briefing proíbe explicitamente. Isso é uma pendência de dados do
cliente, não uma omissão técnica: os arquivos (`sitemap.ts`, `robots.ts`)
e o campo `metadataBase` podem ser adicionados em minutos quando o
domínio de produção existir.

Nenhum schema.org/JSON-LD foi adicionado — não há dado verificável
(endereço, avaliação, organização) para popular um schema real sem
inventar conteúdo.

## Accessibility and responsive tests

**O que foi verificado por execução real (não só leitura de código):**
- Build de produção (`next build`) + `next start` reais, com `curl`
  contra as rotas `/`, `/portfolio`, `/portfolio/projeto-01` e um slug
  inexistente (404 confirmado).
- `/api/contact` exercitado de verdade: validação, honeypot,
  indisponibilidade sem credenciais e rate limit (6 requisições
  seguidas), todos com o status HTTP e o corpo de resposta esperados.
- Modo preview testado nos dois estados via `next dev` com
  `NEXT_PUBLIC_PREVIEW_MODE=true` e ausente: confirmado por grep no HTML
  servido que o aviso de depoimento fictício e os 3 badges "Conteúdo
  provisório" aparecem só com a flag ativa, e que a seção de
  Depoimentos inteira (título "CRIATIVIDADE QUE DEIXA MARCA.") não
  existe no HTML quando a flag está ausente.
- `npm run lint` e `npx tsc --noEmit` rodados e limpos (ver seção
  Performance and links).

**O que foi verificado por leitura/raciocínio sobre o código, não por
navegador real** (nenhum Playwright/browser disponível nesta sessão —
mesma limitação já registrada pela Rita no research-brief.md):
- **Foco e teclado:** `useFocusTrap` é compartilhado por `MobileMenu` e
  `ProjectGallery` (lightbox) — Tab/Shift+Tab ciclam dentro do
  container, Escape chama `onClose`, e o foco retorna ao elemento de
  origem (`returnFocusRef`) na limpeza do efeito. Revisado linha a
  linha, não testado com um leitor de tela real.
- **ARIA:** honeypot com `aria-hidden="true"` + `tabIndex={-1}` + sem
  label visível; cópias de marquee com `aria-hidden="true"`; lightbox
  com `role="dialog"` + `aria-modal="true"`; botão de pausa com
  `aria-pressed`; erros de formulário com `role="alert"` e
  `aria-describedby`/`aria-invalid` ligados ao campo.
- **Contraste:** nenhum valor de cor novo foi introduzido — os pares
  grafite/off-white, creme/grafite e preto/off-white usados em todo o
  site são exatamente os verificados em visual-direction.md (≥15.8:1 em
  todos os casos). O único risco documentado pela Diana (texto sobre
  foto da hero) não se aplica ainda porque não há foto renderizada.
- **`prefers-reduced-motion`:** dupla garantia — `useReducedMotion` (JS,
  com valor inicial síncrono via `matchMedia` para evitar qualquer
  "flash" de animação) desliga o `IntersectionObserver` do `Reveal` e
  mantém o conteúdo visível desde o primeiro render; `globals.css` zera
  `animation`/`transition` de marquee, Ken Burns e `.reveal` via media
  query, como segunda camada independente da primeira.
- **Responsivo (320–1920px):** nenhuma medida fixa em `px` fora de
  `clamp()` ou breakpoints explícitos (768px, 1440px) nos componentes de
  seção; marquees contêm seu próprio `overflow-x`, nunca no `body`;
  grids colapsam para 1 coluna abaixo de 768px. Isso foi verificado lendo
  cada arquivo CSS e calculando os extremos de cada `clamp()` nos
  limites 320px/1920px (ex.: título "BARB" fica em 64px no mínimo, nunca
  menor, e cabe com folga em uma viewport de 320px) — **não há
  screenshot real em 320/390/768/1440/1920px** porque não há navegador
  disponível nesta sessão (MCP do Playwright indisponível, mesma
  limitação herdada da pesquisa). Recomendo uma rodada de verificação
  visual real antes do lançamento.

## Performance and links

- **Lazy loading de imagens:** todo uso de `next/image` (capas de
  projeto em `RecentWork` e `/portfolio`) usa o componente otimizado do
  Next (lazy por padrão); como nenhuma capa real existe ainda, nenhuma
  dessas tags chega a renderizar um `<img>` — o placeholder tipográfico
  é renderizado no lugar. As duas únicas tags `<img>` cruas do projeto
  ficam no lightbox (`ProjectGallery.tsx`), guardadas por
  `media.src` opcional — hoje nunca executam, porque nenhum item de
  galeria tem `src` definido.
- **Dimensões de imagem:** o tipo `ProjectCover`/`ProjectMedia` em
  `projects.ts` exige `width`/`height` sempre que `src` existir —
  layout shift fica prevenido estruturalmente quando a mídia real
  chegar.
- **Sem links vazios:** busquei por `href="#"` e por qualquer `<a>`
  sem `href` real no código — não há nenhum. Links de navegação sempre
  apontam para uma âncora real (`#home`, `#sobre`, `#servicos`,
  `#contato`) ou rota real (`/portfolio`, `/portfolio/[slug]`). Canais
  do footer (Instagram/WhatsApp/e-mail) só renderizam com env var
  preenchida — ausentes, não aparecem (nunca um link morto).
- **Resultado real dos comandos** (rodados nesta sessão, não assumidos):
  - `npm run build` → `✓ Compiled successfully`, `✓ Generating static
    pages (7/7)`. Único aviso: `Failed to find font override values for
    font "Zalando Sans Expanded"` — aviso benigno do Turbopack sobre
    geração de métrica de fallback automática; a fonte carrega e
    renderiza normalmente (confirmado via `next start` + `curl`), não é
    um erro e não bloqueia o build.
  - `npm run lint` → `0 problems`.
  - `npx tsc --noEmit` → sem saída (0 erros).
  - Rotas geradas: `/` e `/_not-found` estáticas; `/icon` estática;
    `/api/contact` e `/portfolio` dinâmicas (a segunda por usar
    `searchParams` para o filtro de categoria); `/portfolio/projeto-01`
    e `/portfolio/projeto-02` pré-renderizadas via
    `generateStaticParams`.

## Deployment README

Ver `README.md` nesta mesma pasta para o passo a passo completo. Resumo:
`npm install` → `npm run dev`/`build`/`start`; copiar `.env.example` para
`.env.local` e preencher as 3 variáveis de e-mail para ativar o envio
real; `NEXT_PUBLIC_PREVIEW_MODE` controla a exibição de placeholders; a
tabela de assets no README lista o caminho exato de cada imagem/logo
pendente.

## Open issues and client dependencies

**Dependem de material/decisão da cliente:**
1. Fotografia da Vanessa (hero e sobre mim) — não enviada; hero e
   sobre-mim usam fallback tipográfico editorial.
2. Logotipo — não enviado; favicon e marca usam "BARB" tipográfico
   (Zalando Sans Expanded) como fallback, incluindo um favicon gerado
   (`src/app/icon.tsx`, letra "B") em vez do ícone padrão do Next.js.
3. Mídia real dos 2 projetos de portfólio (capa + galeria) — não
   enviada; usa placeholders tipográficos, nunca banco de imagens.
4. Depoimentos reais e autorizados — os 2 atuais são 100% fictícios;
   seção fica oculta em produção até existir pelo menos um real.
5. `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` / `EMAIL_API_KEY` — sem
   eles, `/api/contact` responde `503 unavailable` sempre (nunca simula
   sucesso).
6. Domínio real de produção — sem ele, canonical/sitemap/robots/schema
   não foram gerados (ver seção SEO).
7. Canais do footer (Instagram/WhatsApp/e-mail públicos) — opcionais;
   hoje nenhum aparece por falta das env vars `NEXT_PUBLIC_*`
   correspondentes.
8. Categoria real de cada projeto de portfólio — sem ela, o filtro de
   `/portfolio` fica oculto (comportamento correto, mas não demonstrável
   visualmente até existir pelo menos 1 projeto com categoria).

**Limitações técnicas a registrar:**
1. **Rate limit em memória** (`src/lib/rate-limit.ts`) não é
   compartilhado entre múltiplas instâncias/lambdas em um deploy
   serverless com mais de uma instância ativa, e zera a cada
   redeploy/reinício. Suficiente para instância única; não é proteção
   distribuída contra spam em volume.
2. **Fontes tipográficas:** Zalando Sans Expanded e Luxurious Script
   existem ambas como famílias reais no Google Fonts e carregaram sem
   problema via `next/font/google` — **nenhuma substituição silenciosa
   foi necessária.** O único efeito colateral é um aviso benigno do
   Turbopack ("Failed to find font override values") sobre a métrica de
   fallback automática da Zalando Sans Expanded — não afeta o
   carregamento real da fonte.
3. **Movimento do hero e das faixas em marquee** são adaptação própria
   documentada (Ken Burns lento + marquee CSS translateX), não réplica
   confirmada do mecanismo real do template de referência — a pesquisa
   da Rita não conseguiu confirmar esse mecanismo (Playwright
   indisponível na rodada dela). Ver `research-brief.md`/
   `visual-direction.md`.
4. **Verificação responsiva** foi feita por leitura/cálculo de CSS
   (`clamp()`, breakpoints), não por screenshot real em navegador —
   nenhum Playwright/MCP de browser esteve disponível nesta sessão
   também. Recomenda-se uma verificação visual real em 320/390/768/1440/
   1920px antes do lançamento.
5. **Centralização do header** em desktop usa `justify-content:
   space-between` entre 3 blocos (não um grid de colunas simétricas) —
   visualmente adequado com o conteúdo de navegação atual (3 itens à
   esquerda, 2 à direita), mas revisar se a lista de navegação mudar de
   tamanho.

## Revision 3 — ajustes finos pontuais (ver v8/revision-3-brief.md)

Edição cirúrgica in-place sobre o mesmo `v5/`, sem reescrever
componentes. Resumo por item:

- **Header:** "BARB" tipográfico trocado pela logo real
  (`barb-mark-black.png`, versão escura — fundo do header é
  off-white). `padding-inline` do header deixa de depender só de
  `--margin-inline` (herdado via `.container`) — seletor
  `.header .bar` (maior especificidade) aplica um `clamp(12px,1.6vw,24px)`
  próprio, menor, para os blocos de nav chegarem mais perto da borda.
- **Hero:** elipse "Estúdio Criativo" deixa de ter proporção de
  círculo — `border-radius` passou de `50% / 45%` para `50% / 35%`,
  largura subiu (`clamp(200px,28vw,340px)`) e altura caiu
  (`clamp(60px,8vw,96px)`), com padding vertical reduzido ao mínimo
  (`--space-1`) para o texto ocupar quase toda a altura do oval.
- **O que faço:** `.label` voltou de `--text-intro` (22-38px) para
  `--text-label` (12-14px), mantendo negrito e centralização.
- **Faixa "Criatividade com propósito":** continua estática; a frase
  agora é repetida 16x num `<div>` flex `nowrap` centralizado dentro
  de `.section` com `overflow: hidden` — preenche a faixa de ponta a
  ponta em qualquer largura, sem vão nas laterais. Cópias extras são
  `aria-hidden`; o texto único real fica em `.visually-hidden`.
- **Faixa "por trás da barb" (About.tsx, antes de Sobre mim):** mesmo
  problema de vão lateral, mas em loop — a frase passou a ser
  repetida 14x como `children` do `<Marquee>` (que já duplica
  internamente para o scroll sem salto), garantindo que nenhum ponto
  do loop mostre espaço vazio. Cópias extras marcadas `aria-hidden`.
- **CTA final (`Contact.tsx`):** `.inner` ganhou `text-align: center`
  — título, corpo e botão de WhatsApp (`inline-flex`) ficam
  centralizados horizontalmente.
- **Não alterado nesta rodada (aprovado pela cliente):** Serviços,
  Sobre mim (seção de texto), split 50/50 de fotos em "Conheça mais de
  mim", e a faixa de trabalhos em movimento (`MovingWorkStrip`).
- `npm run build`, `npm run lint` e `npx tsc --noEmit` passaram limpos
  após os ajustes (único aviso é o mesmo benigno de fallback de fonte
  da Zalando Sans Expanded, já registrado na Revision 2).

## Revision 4 — primeiro material real de portfólio (16 projetos) (ver v9/revision-4-brief.md)

Edição cirúrgica in-place sobre o mesmo `v5/`. A cliente trouxe, pela
primeira vez, material real de portfólio: 81 imagens já convertidas
para `.webp` e já salvas em `public/projects/{slug}/img-NN.webp`,
listadas com caminho/dimensões exatos em
`output/2026-10-04-163957/v9/portfolio-manifest.json`. Nenhuma imagem
foi reprocessada ou movida nesta rodada — só consumida do manifesto.

- **Hero:** a elipse "Estúdio Criativo" tinha `border-radius: 50% / 35%`
  (Revision 3), o que deixava os cantos retos demais em vez da curva
  de um oval de verdade. Trocado para `border-radius: 50%` com o MESMO
  valor nos dois eixos — produz uma elipse perfeita ajustada à
  proporção largura/altura da caixa. Altura/padding vertical (já
  aprovados) não mudaram.
- **Serviços:** "Edição de Vídeos" removida da lista (6 → ficou 5, depois
  6 de novo com o novo item). "Social Media" ganhou nova descrição
  incorporando o conceito de vídeo e passou a usar a mesma fonte script
  de "Website Design". Novo serviço "Personalizados em Geral" (cartão
  de visita, papelaria, impressos) adicionado — copy nova, ajustável,
  não veio literal da cliente. Lista final (6 itens): Criação e
  Manutenção de Marcas, Website Design, Social Media, Apresentações
  Profissionais, Personalizados em Geral, StoryMaker Eventos. O token
  `--text-service-script` subiu de `clamp(28px,5.6vw,72px)` para
  `clamp(38px,7.6vw,98px)` (~35%) para compensar a altura-x menor da
  fonte cursiva Luxurious Script frente à sans dos títulos vizinhos.
- **Nova seção "Portfólio" na home** (entre Serviços e "Conheça mais de
  mim"): 3 blocos — Marcas, Social Media, Apresentações — cada um com 3
  projetos em ordem alfabética (capa = `img-01` do projeto) + link "Ver
  mais projetos" para `/portfolio?categoria=...`. Novo componente
  `src/components/sections/Portfolio.tsx`, reaproveitando o padrão de
  card já usado em `/portfolio`. "Personalizados em Geral" não entra
  aqui — serviço novo, ainda sem exemplos de portfólio.
- **`/portfolio` e `/portfolio/[slug]`:** os 2 projetos placeholder
  ("Projeto 01"/"Projeto 02") foram substituídos pelos 16 projetos reais
  em `src/content/projects.ts` (6 Marcas, 6 Social Media, 4
  Apresentações), com `alt` descritivo por imagem (nunca genérico —
  ex. "Identidade visual Fetcherz — aplicação 1", "Apresentação Amanda
  Ferraz — slide 01 de 24") e `width`/`height` reais do manifesto.
  Resumos ficam curtos e genéricos, sem objetivo/resultado inventado —
  só citam tema/contexto quando isso veio explicitamente do briefing
  (Festival Agulhas Ativar na apresentação de Anne Galante; Coritiba
  Foot Ball Club; SpeakUp é a marca de Teacher Vanessa).
  - **Amanda Ferraz:** campo "Minha participação" passa a citar
    explicitamente "criação autoral em parceria com o Estúdio SAINT" —
    instrução direta da cliente, para não parecer trabalho 100% solo da
    BARB.
  - **SpeakUp:** galeria usa só as 5 imagens do manifesto. A
    apresentação original tinha 6 páginas; a página 5 (tabela de
    preços "Plano Flex/Premium/Express" com valores em R$) foi
    **removida** do material publicado antes desta rodada, a pedido da
    cliente ("retire a parte do orçamento, ou deixe os valores em
    blur"). Optou-se por remover a página inteira em vez de borrar os
    valores — mais simples e sem risco de vazamento parcial. Se a
    cliente preferir a página de volta com os valores borrados, é um
    ajuste futuro pontual, não bloqueador.
- **`ProjectGallery.tsx`:** as miniaturas e a imagem do lightbox
  ganharam `width`/`height` reais nos `<img>` (antes só tinham `alt`,
  suficiente enquanto todo projeto era placeholder sem `src`; com
  imagens reais, a regra "nenhuma imagem sem width/height/alt" passou a
  valer de fato).
- **`MovingWorkStrip.tsx` (faixa de trabalhos em movimento, não citada
  no brief, mas afetada pela troca de dados):** antes fazia `flatMap` de
  toda a galeria dos 2 projetos placeholder (no máximo 6 tiles de
  texto). Com os 16 projetos reais isso geraria 81 tiles, repetindo a
  legenda de um mesmo projeto várias vezes seguidas (24x para a
  apresentação da Amanda Ferraz) — visualmente quebrado. Ajustado para
  1 tile por projeto (a capa `img-01`), com imagem real via `<img>`
  quando houver `src` e fallback tipográfico só para projetos sem
  mídia.
- **`RecentWork.tsx`:** ganhou a classe utilitária `section-radius-top`
  (mesma usada em Services) para manter o efeito de "cartão escuro"
  arredondado no topo, agora que a seção clara "Portfólio" passa a
  vir imediatamente antes dela.
- **CTA final → Footer:** `Footer.module.css` ganhou
  `border-top: 1px solid #f3f2ec33` (equivalente minificado de
  `rgba(243,242,236,0.2)`) no `.footer` — mesmo padrão de borda fina já
  usado em `.bottom` do próprio rodapé e nas linhas de Serviços.
- **Não alterado nesta rodada (fora do escopo do brief):** formulário
  de contato (já removido na Revision 2), depoimentos (ocultos desde a
  Revision 2), fotografia real da Vanessa, logotipo real.
- `npm run build`, `npm run lint` e `npx tsc --noEmit` passaram limpos.
  Build gerou os 16 `/portfolio/{slug}` estáticos via
  `generateStaticParams`. Verificação funcional via `next build` +
  `next start` + `curl` (sem Playwright/MCP de browser disponível nesta
  sessão, mesma limitação já registrada acima): confirmado que a home
  renderiza os 3 blocos da seção Portfólio com os links
  `?categoria=marcas|social|apresentacoes`; que `/portfolio?categoria=marcas`
  retorna só os 6 projetos de Marcas; que `/portfolio/amanda-ferraz`
  tem 24 imagens e menciona "Estúdio SAINT" na participação; e que
  `/portfolio/speakup` tem exatamente 5 imagens (`img-01` a `img-05`,
  sem página de orçamento).

## Revision 5 — fotos reais, oval animado, ajustes de Portfólio/Serviços (ver v10/revision-5-brief.md)

Rodada de polimento final ("estamos terminando") sobre o mesmo `v5/`.
Primeira entrega de fotografia real da cliente: 4 arquivos já
otimizados em `public/images/` (`vanessa-hero.webp`,
`vanessa-about.webp`, `vanessa-por-tras-da-barb.webp`,
`por-tras-da-barb-texture.webp`) — nenhum reprocessado nesta rodada, só
consumido.

- **Hero:** foto de fundo religada (`vanessa-hero.webp`, full-bleed,
  `object-fit: cover`), com o scrim reforçado (antes só um gradiente
  sutil na base, pensado para o fundo graphite liso; agora cobre toda a
  altura para garantir contraste de texto sobre a foto real).
- **Oval "Estúdio Criativo":** ganhou animação contínua de 3
  combinações de cor em loop (preto/off-white → off-white/preto →
  textura/branco-creme), ciclo de 18s (3 estados de 5s + 3 transições
  de 1s, dentro da janela pedida de 4-6s/0.8-1.2s). Implementado com 2
  camadas sobrepostas de opacidade independente (sólida + textura) em
  vez de animar `background-image` diretamente (propriedade não
  interpolável) — cada camada faz seu próprio crossfade, nunca ficam
  visíveis ao mesmo tempo. Roda só sob `prefers-reduced-motion:
  no-preference`; com movimento reduzido, nenhuma das 2 camadas anima e
  o oval fica fixo no Estado 1 (fundo preto, texto off-white) — que já
  é o estilo base sem a media query, então a regra apenas "não liga" a
  animação em vez de precisar de um override.
- **Sobre mim:** metade direita da seção recebeu `vanessa-about.webp`.
  A polaroid reaproveita o MESMO arquivo da Hero (`vanessa-hero.webp`),
  com `object-position: 14% 88%` + `transform: scale(1.8)` para
  enquadrar o canto do laptop/revistas em vez do rosto. **Calibração
  pendente de ajuste fino visual:** sem Playwright disponível nesta
  sessão para inspecionar o recorte renderizado pixel a pixel, o valor
  de `object-position`/`scale` é uma estimativa a partir da descrição
  do brief (ponto de partida sugerido ~`10% 85%`) — revisar visualmente
  e recalibrar se o enquadramento não isolar bem a região do
  laptop/revistas.
- **"Conheça mais de mim":** a cliente só enviou 1 foto nomeada para
  esta seção (`vanessa-por-tras-da-barb.webp`). Decisão tomada: usar a
  MESMA foto nas 2 metades do split, espelhando horizontalmente a
  segunda via `transform: scaleX(-1)` para criar uma composição
  simétrica em vez de repetir a imagem sem variação. Se a cliente
  enviar uma segunda foto distinta depois, é só trocar o `src` de uma
  das metades em `RecentWork.tsx`.
- **Textura `por-tras-da-barb-texture.webp` em áreas pretas/grafite:**
  nova classe utilitária compartilhada `.textured-dark-bg` em
  `globals.css` (pseudo-elemento `::before` com a textura em
  `opacity: 0.08`, `background-size: cover`). Aplicada em Serviços, na
  metade preta do Sobre Mim, no CTA final (`Contact.tsx`) e no Footer.
  Usa `isolation: isolate` + `z-index: -1` no pseudo-elemento para
  garantir que a textura fique atrás do conteúdo real da própria seção
  sem "escapar" para trás de seções vizinhas (um `z-index: -1` sem
  contexto de empilhamento próprio seria promovido para o stacking
  context raiz da página e ficaria oculto atrás do fundo opaco de TODAS
  as seções, não só da sua). Opacidade 0.08 escolhida como ponto de
  partida dentro da faixa pedida (0.06-0.10); calibração fina de
  "quanto se vê" continua sendo uma decisão visual/subjetiva — reduzir
  ainda mais se parecer forte demais em qualquer tela real.
- **Seção "Portfólio" na home:** reduzida a só o bloco Marcas (Social
  Media e Apresentações saíram da prévia, continuam normalmente em
  `/portfolio`). `PORTFOLIO_PREVIEW_BLOCKS` em `site.ts` passou a ter 1
  bloco só, com a ordem explícita pedida pela cliente — Nathan Oliveira,
  Vitória Nalevaiko, Nayara Rocha (marca) — em vez da ordem alfabética
  da Revision 4, para intercalar a capa mais clara (Vitória) entre as 2
  mais escuras. Bloco ganhou também um CTA de contato (WhatsApp) ao lado
  do "Ver mais projetos".
- **Serviços — padrão alternado normal/script:** a Revision 4 deixou
  "Website Design" e "Social Media" os 2 em script, um atrás do outro.
  Revertido para o padrão pedido (normal, script, normal, normal,
  script, normal): "Social Media" volta para fonte normal/sans (a
  descrição sobre vídeo da Revision 4 continua valendo) e
  "Personalizados em Geral" passa a usar a fonte script, fechando o
  padrão alternado com 2 itens em script no total. "Website Design" não
  mudou. Só o campo `isScript` foi alterado — o texto do título de
  "Personalizados em Geral" continua em CAIXA ALTA (mesmo padrão dos
  outros itens normais); **ponto a revisar**: título em caixa alta
  renderizado em fonte cursiva (Luxurious Script) pode ficar menos
  legível que os outros 2 itens script (que usam texto em título normal
  — "Website Design"); se a cliente achar estranho visualmente, ajustar
  a casefold do título é um ajuste pontual de copy, não de código.
- **`/portfolio`:** listagem reestruturada para agrupar os projetos em
  blocos por categoria (Marcas / Social Media / Apresentações, nesta
  ordem fixa), cada bloco com seu próprio CTA de contato ao final — não
  só um CTA geral no fim da página inteira (novo componente
  `src/components/portfolio/CategoryBlock.tsx`). O filtro por categoria
  (`?categoria=`) passou a restringir quais blocos aparecem, em vez de
  produzir uma grade plana sem agrupamento.
  - **Social Media abre direto no lightbox:** clicar num card de
    projeto de Social Media na listagem abre o lightbox imediatamente
    (1 clique), em vez de navegar para `/portfolio/[slug]` primeiro (2
    cliques). Implementado como `<button>` (em vez de `<Link>`) só para
    os cards desta categoria, reaproveitando o mesmo overlay/CSS do
    lightbox de `ProjectGallery.tsx` e o mesmo `useFocusTrap` — a
    navegação próxima/anterior percorre os outros projetos de Social
    Media do bloco. A rota `/portfolio/[slug]` desses projetos não foi
    removida e continua funcionando para quem acessar o link direto
    (confirmado via `curl` em `/portfolio/iam` e
    `/portfolio/nayara-rocha-social`, ambos 200). Cards de Marcas e
    Apresentações continuam navegando normalmente para
    `/portfolio/[slug]`.
- `npm run build`, `npm run lint` e `npx tsc --noEmit` passaram limpos
  (único aviso é o mesmo benigno de fallback de fonte da Zalando Sans
  Expanded, já registrado na Revision 2). Verificação funcional via
  `next build` + `next start` + `curl` (Playwright continua
  indisponível nesta sessão): confirmado que a home renderiza as 3
  fotos reais nos lugares certos, que a seção Portfólio da home mostra
  só os 3 cards de Marcas na ordem pedida, que Serviços alterna
  normal/script no padrão certo, e que cada bloco de categoria em
  `/portfolio` tem exatamente 1 CTA de contato.
