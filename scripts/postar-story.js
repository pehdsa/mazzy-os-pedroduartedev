#!/usr/bin/env node
// Posta uma imagem como Story no Instagram via Meta Graph API.
// Uso: node --env-file=.env scripts/postar-story.js <caminho-do-png>
//
// Exemplo:
//   node --env-file=.env scripts/postar-story.js marketing/conteudo/carrossel-clean-code-2026-05-21/story.png

const fs = require('fs');
const path = require('path');

const API_VERSION = 'v19.0';
const API_BASE = `https://graph.facebook.com/${API_VERSION}`;

function die(msg) { console.error(`erro: ${msg}`); process.exit(1); }

async function api(endpoint, params = {}, method = 'GET') {
  const url = new URL(`${API_BASE}${endpoint}`);
  if (method === 'GET') {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }
  const opts = { method };
  if (method === 'POST') opts.body = new URLSearchParams(params);
  const r = await fetch(url, opts);
  const data = await r.json();
  if (!r.ok || data.error) {
    throw new Error(`Meta API ${endpoint}: ${data.error?.message || r.statusText}`);
  }
  return data;
}

async function urlReachable(url) {
  try { return (await fetch(url, { method: 'HEAD' })).ok; }
  catch { return false; }
}

(async () => {
  const pngArg = process.argv[2];
  if (!pngArg) die('passa o caminho do PNG. ex: node scripts/postar-story.js marketing/.../story.png');

  const { META_PAGE_ACCESS_TOKEN, META_IG_USER_ID, ASSETS_BASE_URL } = process.env;
  if (!META_PAGE_ACCESS_TOKEN) die('META_PAGE_ACCESS_TOKEN não definido no .env');
  if (!META_IG_USER_ID) die('META_IG_USER_ID não definido no .env');
  if (!ASSETS_BASE_URL) die('ASSETS_BASE_URL não definido no .env');

  if (!fs.existsSync(pngArg)) die(`PNG não existe: ${pngArg}`);

  const relPath = path.relative(process.cwd(), pngArg).replace(/^\.\//, '');
  const publicUrl = `${ASSETS_BASE_URL.replace(/\/$/, '')}/${relPath}`;

  console.log(`▶ validando URL público: ${publicUrl}`);
  if (!await urlReachable(publicUrl)) die(`URL não acessível ainda. Confere se o push pro repo público completou.`);
  console.log('  ✓ acessível');

  // 1. Criar media container do tipo STORIES
  console.log('▶ criando media container (STORIES)…');
  const container = await api(`/${META_IG_USER_ID}/media`, {
    image_url: publicUrl,
    media_type: 'STORIES',
    access_token: META_PAGE_ACCESS_TOKEN,
  }, 'POST');
  console.log(`  ✓ container ${container.id}`);

  // 2. Aguardar processamento
  // Workaround: Meta às vezes retorna Authorization Error no polling do
  // status do container. Ignora e dá um sleep generoso.
  console.log('▶ aguardando processamento…');
  let pollFailed = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    try {
      const status = await api(`/${container.id}`, {
        fields: 'status_code',
        access_token: META_PAGE_ACCESS_TOKEN,
      });
      if (status.status_code === 'FINISHED') break;
      if (status.status_code === 'ERROR') die('Meta retornou ERROR no processamento');
      if (i === 29) die('timeout aguardando FINISHED');
      process.stdout.write('.');
    } catch (e) {
      if (!pollFailed) {
        console.log(`\n  (polling falhou: ${e.message.slice(0, 80)}... seguindo mesmo assim)`);
        pollFailed = true;
      }
      if (i >= 5) break;
    }
  }
  console.log(' pronto');

  // 3. Publicar
  console.log('▶ publicando story…');
  const publish = await api(`/${META_IG_USER_ID}/media_publish`, {
    creation_id: container.id,
    access_token: META_PAGE_ACCESS_TOKEN,
  }, 'POST');

  console.log(`\n✓ story publicada: ${publish.id}`);
  console.log('  vai expirar em 24h. Salva como Highlight manual no app pra manter.');
})().catch(e => die(e.message));
