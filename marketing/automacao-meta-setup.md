# Setup da automação Meta (Instagram + Facebook)

Guia pra configurar a publicação automática usada por `/aprovar-post`.

**Pré-requisitos confirmados:**
- ✅ Insta `@pedroduarte.dev` é Business/Creator
- ✅ Página do Facebook conectada ao Insta
- ✅ Você é admin da Página

---

## 1. Criar app no Meta for Developers

1. Acessa **https://developers.facebook.com/apps**
2. Clica **Create App** → tipo **Business**
3. Nome: "Pedro Duarte Publisher" (ou qualquer outro)
4. Vincula à tua conta business

### 1.1. Adicionar produtos

No painel do app, em **Add Products**, adiciona:
- ✅ Instagram Graph API
- ✅ Facebook Login for Business

---

## 2. Pegar IDs e tokens

### 2.1. Abrir o Graph API Explorer

https://developers.facebook.com/tools/explorer/

1. Topo direito: seleciona o app que você criou
2. Clica **Generate Access Token** → login com tua conta FB
3. Em **Add Permissions**, marca:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
4. Clica **Generate Access Token** → copia o token (esse é o **User Token short-lived**, vamos converter depois)

### 2.2. Pegar PAGE_ID e Page Token short-lived

No mesmo Explorer, faz a query:

```
GET /me/accounts
```

A resposta vem com lista de Páginas. Acha a tua Página e copia:
- **`id`** → esse é o **PAGE_ID** (anota)
- **`access_token`** → esse é o **Page Access Token short-lived** (anota separado)

### 2.3. Pegar IG_USER_ID

```
GET /<PAGE_ID>?fields=instagram_business_account
```

Substitui `<PAGE_ID>` pelo valor acima. A resposta:

```json
{
  "instagram_business_account": {
    "id": "17841412345678901"
  }
}
```

O valor de `id` é o **IG_USER_ID** (anota).

### 2.4. Estender Page Token pra longa duração (60 dias)

Pega **App ID** e **App Secret** em **Settings > Basic** do app.

No terminal:

```bash
curl "https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_LIVED_PAGE_TOKEN"
```

A resposta:

```json
{
  "access_token": "EAAxxxxxxxxxxxx...",
  "token_type": "bearer"
}
```

O `access_token` retornado é o **Page Access Token de longa duração** — vale 60 dias. Esse é o `META_PAGE_ACCESS_TOKEN` que vai no `.env`.

> ⚠️ Antes que expire (60 dias), você pode renovar repetindo esse mesmo passo com o token atual.

---

## 3. Preencher o .env

Copia o template:

```bash
cp .env.example .env
```

Preenche os 4 valores no `.env`:

```bash
META_PAGE_ACCESS_TOKEN=EAAxxxxxxxxxxxx...
META_PAGE_ID=123456789012345
META_IG_USER_ID=17841412345678901
ASSETS_BASE_URL=https://raw.githubusercontent.com/SEU_USUARIO/MazyOS/main
```

> ⚠️ O `.env` está no `.gitignore` — não vai pro repo.

---

## 4. Tornar o repo MazyOS público

Pra Meta API conseguir baixar as imagens, o repo precisa ser público:

1. **https://github.com/SEU_USUARIO/MazyOS/settings**
2. Rola até o final: **Danger Zone > Change repository visibility**
3. **Change visibility** → **Make public**
4. Confirma

Se ainda não tem o repo no GitHub, roda `/salvar` primeiro pra criar.

---

## 5. Testar antes de plugar no /aprovar-post

Antes de rodar a pipeline completa, testa cada script isolado:

### 5.1. Testa Instagram

```bash
node --env-file=.env scripts/postar-instagram.js marketing/conteudo/carrossel-clean-code-2026-05-21
```

O script vai:
- Validar que os PNGs estão acessíveis via URL pública
- Subir cada slide como item de carrossel
- Criar o container e publicar
- Retornar permalink

### 5.2. Testa Facebook

```bash
node --env-file=.env scripts/postar-facebook.js marketing/conteudo/carrossel-clean-code-2026-05-21
```

---

## 6. Renovar token (a cada ~60 dias)

Coloca um lembrete no calendário pra rodar antes do token expirar:

```bash
curl "https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=$META_PAGE_ACCESS_TOKEN"
```

Substitui o valor no `.env`.

---

## Troubleshooting

**"image_url is not accessible"** → repo não está público OU push ainda não rodou. Confere `git status` e a visibility do repo.

**"Application does not have permission"** → faltou alguma permissão no Graph API Explorer. Volta no passo 2.1 e marca todas.

**"User is not authorized"** → token expirou. Renova (passo 6).

**"This media type is not supported"** → PNGs devem ser ≤8MB cada. Se muito grande, reduzir resolução no `render.js`.

**Insta postou mas FB falhou** → roda só o `postar-facebook.js` separadamente. Não precisa repostar Insta.
