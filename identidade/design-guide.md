# Identidade visual

> Como a marca aparece em tudo que o MazyOS gera.
> As skills de conteúdo, carrossel e post leem esse arquivo antes de criar qualquer visual.
> Edite quando a marca evoluir.

Fonte: arquivo Pencil `/Volumes/trabalho/projetos/layouts/pedroduarte.pen` (frame `TZqDt`).

---

## Cores

**Tema escuro — base do visual.**

### Superfícies
- **Fundo principal (deepest):** `#06060A`
- **Fundo padrão (bg):** `#0A0A0F`
- **Fundo alternativo (alt):** `#0F0F15`
- **Cards (card):** `#12121A`

### Bordas
- **Subtle:** `#1E1E2E`
- **Strong:** `#2A2A3E`

### Marca (CTA / identidade)
- **Primary (azul):** `#0062FF`
- **Indigo:** `#4F46E5`

### Destaque (sucesso, highlights)
- **Green:** `#10B981`

### Texto
- **Primary:** `#FFFFFF`
- **Secondary:** `#9CA3AF`
- **Tertiary:** `#6B7280`
- **Muted:** `#4B5563`

- **Cor proibida:** evitar tema claro como base. A marca é dark-first.

---

## Tipografia

- **Títulos e destaques:** **Montserrat** (peso 600-700)

- **Corpo, subtítulos e botões:** **Geist Mono** — usar pra labels, códigos, metadata, eyebrows ("01 — COLOR"), letterspacing positivo (1.2-1.5)

- **Peso do título:** 600-700 (semibold a bold)

---

## Estilo geral

Tech, minimalista, dark-first. Mistura sans (Montserrat) com mono (Geist Mono) — referência clara ao mundo dev. Detalhes em azul `#0062FF`. Hierarquia construída por contraste de fundo (deepest → bg → alt → card) em vez de muitas cores.

---

## Elementos-chave

- Bordas: linhas finas (1px) em `#1E1E2E` ou `#2A2A3E`
- Border-radius dos cards: **12px**
- Botões: fundo `#0062FF` ou outline em borda strong
- Sombras: usar com parcimônia — o contraste de superfícies já cria profundidade

---

## O que NUNCA fazer

- Não usar tema claro como base
- Não usar cores fora da paleta sem propósito (laranja, amarelo, rosa quente)
- Não misturar fontes fora de Montserrat / Geist Mono
- Não usar gradiente arco-íris ou efeitos "techy" datados (neon glow exagerado, glassmorphism pesado)

---

## Logo

- **Arquivo:** `identidade/logo.png` — chaves `{ }` em azul `#0062FF` + wordmark "pedroduarte.dev" em cinza/branco
- **Versão pra fundo escuro:** a logo atual já é otimizada pra fundo escuro
- **Onde usar:** slide final do carrossel (CTA), header de propostas, slides de apresentação, assinatura
- **Tamanho sugerido:** largura entre 120-200px nos HTMLs

---

## Observações adicionais

- Sistema de tokens já modelado no Pencil — quando precisar de uma cor nova, consultar o frame `TZqDt` antes de inventar.
- A paleta foi pensada em escala (deepest → muted), facilita usar em UI e em peças de conteúdo.

---

## Sistema de tags

Toda peça de conteúdo (carrossel, post, header de blog, badge) carrega uma das 11 tags oficiais. Cada tag tem **ícone Lucide** + **cor de destaque** próprios — usados em badges, eyebrows, slide de capa, header do post de blog.

**Fonte do ícone:** Lucide (`iconFontFamily: "lucide"`) — mesma fonte usada nos layouts de exemplo em Pencil (`b3TKcR`).

**Padrão de badge:** ícone + nome da tag em caixa alta, com letterspacing 1.5-2, dentro de pill com `cornerRadius: 999`, fundo da cor com 22 alpha (`#XXXXXX22`), borda da cor com 55 alpha (`#XXXXXX55`).

| Tag | Ícone Lucide | Cor |
|---|---|---|
| **News** | `newspaper` | `#7C3AED` (violet) |
| **Concepts** | `lightbulb` | `#06B6D4` (cyan) |
| **Code** | `code-2` | `#3B82F6` (blue) |
| **Architecture** | `layers` | `#8B5CF6` (purple) |
| **AI** | `sparkles` | `#EC4899` (pink) |
| **Career** | `briefcase` | `#F59E0B` (amber) |
| **Tools** | `wrench` | `#10B981` (green) |
| **Study** | `graduation-cap` | `#22D3EE` (cyan light) |
| **Security** | `shield` | `#EF4444` (red) |
| **DevOps** | `server` | `#F97316` (orange) |
| **Opinion** | `message-circle` | `#A78BFA` (violet light) |

**Como usar nas peças:**
- **Carrossel Instagram:** badge no topo do primeiro slide (tag em caixa alta + ícone)
- **Post de blog:** badge antes do título + cor da tag como accent no header
- **Slide divisor (quando o tema mistura tags):** usar a tag dominante; tags secundárias viram subtexto
- **Card de tag (listagem do blog):** ícone + nome + cor de borda na variante 55 alpha

---

## Carrosséis com código (lições aprendidas)

Pra slides que mostram trechos de código, considerar:

- **Formato 1:1 (quadrado, 1080x1080)** funciona melhor que 4:5 — código fica mais legível no celular, sem rolagem vertical comprimindo as linhas
- **Font-size do código:** mínimo 22-24px no canvas 1080x1080 pra leitura confortável no feed mobile
- **Limitar linhas por slide:** máximo ~10 linhas curtas ou ~6 linhas longas. Se o exemplo é maior, quebra em 2 slides
- **Conteúdo de texto explicativo:** dar espaço maior pro título + subtítulo + 1-2 frases de contexto além do código (não só "Faça isso" / "Não faça aquilo")
- **Alternar:** intercalar slides de código com slides de texto puro (regra + dica) pra evitar fadiga visual

---

## Variantes por plataforma

Cada plataforma tem versão própria — **NÃO reaproveitar o mesmo asset**.

### Pasta padrão por carrossel

```
marketing/conteudo/<slug>-<data>/
  instagram/slide-XX.png        ← 1080x1350 (4:5) — feed do Insta
  linkedin/slide-XX.png         ← 1080x1080 (1:1) — feed do LinkedIn
  story.png                     ← 1080x1920 (9:16) — story do Insta
  legenda.md                    ← legenda Insta (coloquial, hashtags 10-15)
  legenda-linkedin.md           ← legenda LinkedIn (analítica, hashtags 3-5)
  carrossel.html                ← gera as instagram/
  carrossel-linkedin.html       ← gera as linkedin/ (mesmo conteúdo, layout 1:1)
  render.js / render-linkedin.js
```

### Diferenças visuais Insta vs LinkedIn

| | Instagram | LinkedIn |
|---|---|---|
| Formato | 1080x1350 (4:5) | 1080x1080 (1:1) |
| Conteúdo dos slides | Igual | Igual |
| Padrão visual | Mesma identidade (paleta, fontes, badge da tag) | Mesma identidade |
| Densidade de texto | Pode ser menos denso | Pode ser mais denso (público dev pro lê mais) |
| Hashtags no carrossel | Não | Não |

### Diferenças de legenda

| | Instagram | LinkedIn |
|---|---|---|
| Tamanho | 200-1000 chars | 800-3000 chars (usar bem o espaço) |
| Tom | Direto, coloquial | Profissional, analítico |
| Hook | Frase de impacto curta | Insight + contexto |
| CTA | "Salva esse post", "Me conta nos comentários" | Pergunta aberta pra debate |
| Hashtags | 10-15 mix (público + nicho) | 3-5 industry-focused |
| Emoji | Pode (no hook, no CTA) | Mínimo, idealmente zero |

### Pipeline de scripts

- `postar-instagram.js` → lê `instagram/` + `legenda.md`
- `postar-linkedin.js` → prefere `linkedin/` + `legenda-linkedin.md`, se não existirem cai pra `instagram/` + `legenda.md`
- `postar-story.js` → lê `story.png`
