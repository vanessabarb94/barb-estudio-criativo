# BARB Estúdio Criativo — site institucional/portfólio

Next.js 16 (App Router) + TypeScript. Sem Tailwind — CSS organizado em
tokens (custom properties) e CSS Modules por componente.

## Instalação e desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # build de produção
npm run start        # serve o build de produção
npm run lint          # ESLint (eslint-config-next)
npx tsc --noEmit        # checagem de tipos isolada
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Para que serve | Efeito sem valor |
|---|---|---|
| `NEXT_PUBLIC_PREVIEW_MODE` | exibir depoimentos fictícios + badges "Conteúdo provisório" | ausente/`false` → produção limpa, sem placeholders visíveis |
| `NEXT_PUBLIC_INSTAGRAM_URL` | link do Instagram no footer | ausente → link não aparece (nunca `href="#"`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | e-mail visível no footer | idem |

O contato é feito pelo WhatsApp: número e mensagem padrão ficam em
`src/lib/whatsapp.ts` (`getWhatsAppLink`).

### Ligar/desligar o modo preview

`NEXT_PUBLIC_PREVIEW_MODE=true` no `.env.local` (ou nas env vars do
provedor de deploy) habilita, só nesse ambiente:
- os 2 depoimentos fictícios, com o aviso "Exemplo fictício para
  visualização do layout.";
- o badge "Conteúdo provisório" nos 2 projetos de portfólio placeholder.

Em produção, deixe a variável ausente (ou `false`) — a seção de
depoimentos some inteiramente e os badges não aparecem.

## Conteúdo e imagens

Nenhum componente precisa ser reescrito para trocar imagem, copy, ordem
ou depoimento — tudo vem de `src/content/site.ts` e
`src/content/projects.ts`. Os arquivos ficam em `public/`
(`public/brand/`, `public/images/`, `public/projects/[slug]/`).

Depoimentos marcados com `isPlaceholder: true` / `publishable: false`
nunca aparecem em produção.

## Detalhamento completo

Ver `website-package.md` (histórico de revisões) para árvore de arquivos,
status de implementação seção por seção, SEO, acessibilidade,
performance e o resultado real dos comandos de build/lint/typecheck.
