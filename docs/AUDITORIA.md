# Auditoria — Barbearia do Alemão

Estado auditado: commit `d79af01` (branch original), antes de qualquer alteração.
Stack: React 19, TypeScript, TanStack Start/Router, Vite 8, Tailwind 4, alvo de build Cloudflare (nitro).
Estrutura: uma única rota (`/`) em `src/routes/index.tsx` (1001 linhas), `__root.tsx`, `sitemap.xml`, `styles.css`.

## 1. Problemas comprovados (com evidência)

| # | Prio | Problema | Evidência |
|---|------|----------|-----------|
| P1 | Alta | **Todas as fotos do repositório são ponteiros** (`*.asset.json` → `/__l5e/assets-v1/...`), só resolvem dentro da hospedagem Lovable. Os JPGs reais existem apenas no zip recebido. Fora da Lovable (preview local, outro host, Open Graph) as imagens quebram. | `src/assets/barbearia/a*.png.asset.json`; `npm run build` não emite nenhuma imagem. |
| P2 | Alta | **Imagens de 300–560 KB sem dimensões** (`width/height`), sem formato moderno → LCP pesado e CLS. | Tamanhos em `asset.json`; `<img>` sem `width/height`. |
| P3 | Alta | **Animações de entrada do Hero não existem**: `fade-in` e `scale-in` não são keyframes definidos (o CSS final só tem `enter`, `exit`, `ken-burns`, `wpp-in`…). | `grep @keyframes` no CSS de build. |
| P4 | Alta | **Contraste insuficiente**: texto azul de marca (`--primary`) sobre fundo escuro = 3,5:1 (< 4,5:1 AA). Usado em rótulos pequenos. | Cálculo OKLCH→WCAG. |
| P5 | Alta | **Tipografia ilegível em mobile**: rótulos em 0,55 rem (8,8 px), 0,6 rem e 0,65 rem. | `index.tsx` linhas 307, 647, 693, 763, 825. |
| P6 | Alta | **Badges "Aberto" fixos em todos os dias** da tabela de horários: sugerem "aberto agora" mesmo com a loja fechada. | `Horarios()`. |
| P7 | Alta | **Selo "Mais pedido"** em Corte + Barba: afirmação comercial sem fonte no projeto. | `servicos[2].destaque`. |
| P8 | Média | **Serviços e Preços duplicados** (mesma lista renderizada duas vezes, 2 seções) → página longa e redundante. | `Servicos()` + `Precos()`. |
| P9 | Média | Âncora com erro de digitação `#precoss`. | `nav`, `Precos()`. |
| P10 | Média | Menu mobile: item "Agendar" aponta para `#cta` (rola a página) em vez do WhatsApp; botão "Agendar" do header sem `target`/`rel`; WhatsApp da seção Localização **sem mensagem pré-preenchida**. | `Header()`, `Localizacao()`. |
| P11 | Média | Header sticky sem `scroll-margin-top`: títulos das seções ficam sob o header ao navegar por âncora. Sem `scroll-behavior`. | Ausência em `styles.css`. |
| P12 | Média | **SEO**: `<html lang="en">`; metas `description`/`og:description` **duplicadas** no root; `og:image` do root aponta para bucket externo (`storage.googleapis.com/gpt-engineer…`); `og:image` da home é URL relativa; `canonical` e `og:url` relativos; `sitemap.xml` com `BASE_URL = ""` (`<loc>/</loc>` inválido); `robots.txt` sem `Sitemap`; páginas 404/erro em inglês. | `__root.tsx`, `sitemap[.]xml.ts`, `public/robots.txt`. |
| P13 | Média | Ken Burns infinito de 30 s com `will-change` na imagem LCP: custo de GPU/bateria sem função. | `styles.css`. |
| P14 | Média | Hierarquia de títulos: `h2` → `h4` (pula h3) em "Resultados". Dois `h2` na mesma seção. | `Galeria()`. |
| P15 | Baixa | 4 famílias/pesos de fonte via Google Fonts bloqueando renderização (Anton, Oswald, Inter). | `__root.tsx`. |
| P16 | Baixa | Seção "Prova social" (`#prova`) fora da navegação. Conteúdo `.reveal` fica invisível sem JS. | `nav`, `styles.css`. |
| P17 | Baixa | `npm run lint`: **178 erros**, todos de formatação Prettier (nenhum erro lógico). Não há script de testes. Há `bun.lock` e `package-lock.json` simultâneos. | `npx eslint src`. |
| P18 | Info | ~25 pacotes Radix/recharts/react-day-picker e 46 componentes `ui/` do scaffold; só `sheet` (+ dependências diretas) é usado. Tree-shaking evita custo de bundle; remoção fica como recomendação (risco de conflito com o fluxo Lovable). | `grep` de imports. |
| P19 | Info | A foto `a13` ("tatuagem") existe e não é usada em lugar nenhum. | `index.tsx`. |

## 2. Verificado e funcionando (preservar)

- Build de produção (`npm run build`) e `tsc --noEmit` sem erros.
- Dados de contato consistentes em todo o código: telefone `5515988030574`, endereço R. Maria Germani, 826 – Sorocaba, horários **idênticos** entre JSON-LD e tabela visível.
- Link `wa.me` correto, com mensagem pré-preenchida na maioria dos CTAs.
- Menu mobile em Radix Sheet (focus trap, Esc, `aria`), skip link, `prefers-reduced-motion`, `focus-visible`.
- Safe-area no botão flutuante, alt text nas fotos, mapa embutido com `loading="lazy"`, JSON-LD `Barbershop`.
- Fotos reais (dono, ambiente, 4 pares antes/depois) e logo — mantidas.

## 3. Depende de validação externa (não alterado nem inventado)

1. Preços (R$ 35 / 25 / 50 / 20 / 30) e horários vigentes.
2. Nota 5,0 e 134 avaliações no Google, e autorização para reproduzir os 3 depoimentos com nome.
3. Domínio final (JSON-LD usa `barbeariadoalemao.lovable.app`); canonical/sitemap/og dependem dele.
4. Autorização de imagem dos clientes nos "antes/depois"; confirmação de que os pares são do mesmo cliente.
5. Confirmar que a pessoa da foto de "O Alemão" é o proprietário.
6. Instagram `@barbeariadoalemao` e link curto do Google Maps.
7. `aggregateRating` no JSON-LD de negócio próprio: o Google pode ignorar/penalizar auto-avaliação; decisão do cliente.

## 4. Plano de execução

1. Trazer as fotos reais para o repositório, otimizadas (WebP, ≤1280 px, dimensões declaradas).
2. Centralizar dados e links (`src/lib/site.ts`) e quebrar `index.tsx` em seções (`src/components/site/`).
3. Direção "Quiet Premium": ver `docs/DIRECAO-VISUAL.md`.
4. Corrigir SEO (lang, metas, canonical, sitemap, robots, 404 em PT-BR).
5. Estratégia de validação sem test runner: `npm run verify` (typecheck + build + checagem estática do HTML renderizado) + verificação visual com Playwright em 360/390/768/1280 px.

## 5. Resultado da execução e evidências

- `npm run typecheck`: sem erros. `npm run build`: sucesso (client + SSR + nitro).
- `npm run check:site` (contra `npm run dev`): 13/13 verificações aprovadas (lang, h1 único, metas, canonical/og absolutos, alt e width/height em todas as imagens, âncoras, links `wa.me`, JSON-LD, consistência de horários/telefone, sitemap).
- Verificação visual com Playwright (Chromium) em 360, 390, 768 e 1280 px: sem overflow horizontal; capturas revisadas. Mapa do Google não renderiza no sandbox (sem rede) — validar em produção.
- Peso das fotos: 5,4 MB (JPG originais) → 1,2 MB (WebP).
- Limitações: `vite preview` não funciona com o build Cloudflare/nitro do projeto (já era assim); não há test runner — não foram rodados testes automatizados. Os 178 erros de Prettier antigos no resto do `src/` (componentes `ui/` do scaffold) não foram tocados.
- Pendências humanas adicionais: **foto de hero mostra uma criança** — confirmar autorização dos responsáveis; fontes via Google Fonts não foram validadas offline (fallback Georgia/system-ui).
- Os `a*.png.asset.json` foram mantidos (não referenciados mais) para não afetar o histórico/fluxo Lovable; podem ser removidos após confirmação.
