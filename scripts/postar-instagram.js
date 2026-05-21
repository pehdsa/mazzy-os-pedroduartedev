#!/usr/bin/env node
// Posta carrossel no Instagram via Meta Graph API.
// Uso: node --env-file=.env scripts/postar-instagram.js <pasta-do-carrossel>
//
// Espera dentro de <pasta-do-carrossel>:
//   - instagram/slide-XX.png   (2 a 10 imagens)
//   - legenda.md               (texto da legenda)

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
  if (method === 'POST') {
    opts.body = new URLSearchParams(params);
  }
  const r = await fetch(url, opts);
  const data = await r.json();
  if (!r.ok || data.error) {
    throw new Error(`Meta API ${endpoint}: ${data.error?.message || r.statusText}`);
  }
  return data;
}

async function urlReachable(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.ok;
  } catch { return false; }
}

(async () => {
  const pasta = process.argv[2];
  if (!pasta) die('passa a pasta do carrossel. ex: node scripts/postar-instagram.js marketing/conteudo/carrossel-xxx');

  const { META_PAGE_ACCESS_TOKEN, META_IG_USER_ID, ASSETS_BASE_URL } = process.env;
  if (!META_PAGE_ACCESS_TOKEN) die('META_PAGE_ACCESS_TOKEN não definido no .env');
  if (!META_IG_USER_ID) die('META_IG_USER_ID não definido no .env');
  if (!ASSETS_BASE_URL) die('ASSETS_BASE_URL não definido no .env');

  // 1. Validar pasta e arquivos
  if (!fs.existsSync(pasta)) die(`pasta não existe: ${pasta}`);
  const instaDir = path.join(pasta, 'instagram');
  if (!fs.existsSync(instaDir)) die(`subpasta instagram/ não existe em ${pasta}`);

  const slides = fs.readdirSync(instaDir)
    .filter(f => /^slide-\d+\.png$/.test(f))
    .sort();
  if (slides.length < 2) die(`precisa de no mínimo 2 slides, achei ${slides.length}`);
  if (slides.length > 10) die(`Insta carrossel aceita no máximo 10 slides, achei ${slides.length}`);
  console.log(`▶ ${slides.length} slides encontrados`);

  const legendaPath = path.join(pasta, 'legenda.md');
  if (!fs.existsSync(legendaPath)) die(`legenda.md não existe em ${pasta}`);
  const legenda = fs.readFileSync(legendaPath, 'utf8').replace(/^#.*\n+/, '').trim();
  console.log(`▶ legenda: ${legenda.length} chars`);

  // 2. Construir URLs públicas e validar
  const base = ASSETS_BASE_URL.replace(/\/$/, '');
  const pastaRelativa = path.relative(process.cwd(), pasta).replace(/^\.\//, '');
  const urls = slides.map(s => `${base}/${pastaRelativa}/instagram/${s}`);

  console.log('▶ validando URLs públicos…');
  for (const u of urls) {
    const ok = await urlReachable(u);
    if (!ok) die(`URL não acessível: ${u}\n(o push pro repo público pode não ter completado ainda)`);
    console.log(`  ✓ ${u}`);
  }

  // 3. Criar containers de mídia individuais (cada slide como carousel item)
  console.log('▶ criando media items…');
  const childrenIds = [];
  for (let i = 0; i < urls.length; i++) {
    const r = await api(`/${META_IG_USER_ID}/media`, {
      image_url: urls[i],
      is_carousel_item: 'true',
      access_token: META_PAGE_ACCESS_TOKEN,
    }, 'POST');
    childrenIds.push(r.id);
    console.log(`  ✓ slide ${i + 1}/${urls.length} → ${r.id}`);
  }

  // 4. Criar container do carrossel
  console.log('▶ criando container do carrossel…');
  const container = await api(`/${META_IG_USER_ID}/media`, {
    media_type: 'CAROUSEL',
    children: childrenIds.join(','),
    caption: legenda,
    access_token: META_PAGE_ACCESS_TOKEN,
  }, 'POST');
  console.log(`  ✓ container ${container.id}`);

  // 5. Aguardar processamento (pode levar alguns segundos)
  console.log('▶ aguardando processamento…');
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const status = await api(`/${container.id}`, {
      fields: 'status_code',
      access_token: META_PAGE_ACCESS_TOKEN,
    });
    if (status.status_code === 'FINISHED') break;
    if (status.status_code === 'ERROR') die('Meta retornou ERROR no processamento');
    if (i === 29) die('timeout aguardando FINISHED');
    process.stdout.write('.');
  }
  console.log(' pronto');

  // 6. Publicar
  console.log('▶ publicando…');
  const publish = await api(`/${META_IG_USER_ID}/media_publish`, {
    creation_id: container.id,
    access_token: META_PAGE_ACCESS_TOKEN,
  }, 'POST');

  // 7. Pegar permalink
  const detail = await api(`/${publish.id}`, {
    fields: 'permalink',
    access_token: META_PAGE_ACCESS_TOKEN,
  });

  console.log(`\n✓ publicado: ${detail.permalink}`);
  console.log(`  post id: ${publish.id}`);
})().catch(e => die(e.message));
