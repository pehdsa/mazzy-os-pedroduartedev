#!/usr/bin/env node
// Posta carrossel como multi-foto na Página do Facebook via Graph API.
// Uso: node --env-file=.env scripts/postar-facebook.js <pasta-do-carrossel>
//
// Espera dentro de <pasta-do-carrossel>:
//   - instagram/slide-XX.png   (reusa os mesmos PNGs do Insta)
//   - legenda.md

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

(async () => {
  const pasta = process.argv[2];
  if (!pasta) die('passa a pasta do carrossel. ex: node scripts/postar-facebook.js marketing/conteudo/carrossel-xxx');

  const { META_PAGE_ACCESS_TOKEN, META_PAGE_ID, ASSETS_BASE_URL } = process.env;
  if (!META_PAGE_ACCESS_TOKEN) die('META_PAGE_ACCESS_TOKEN não definido no .env');
  if (!META_PAGE_ID) die('META_PAGE_ID não definido no .env');
  if (!ASSETS_BASE_URL) die('ASSETS_BASE_URL não definido no .env');

  if (!fs.existsSync(pasta)) die(`pasta não existe: ${pasta}`);
  const instaDir = path.join(pasta, 'instagram');
  if (!fs.existsSync(instaDir)) die(`subpasta instagram/ não existe em ${pasta}`);

  const slides = fs.readdirSync(instaDir)
    .filter(f => /^slide-\d+\.png$/.test(f))
    .sort();
  if (slides.length < 1) die('nenhum slide encontrado');
  console.log(`▶ ${slides.length} slides`);

  const legendaPath = path.join(pasta, 'legenda.md');
  if (!fs.existsSync(legendaPath)) die(`legenda.md não existe em ${pasta}`);
  const legenda = fs.readFileSync(legendaPath, 'utf8').replace(/^#.*\n+/, '').trim();

  const base = ASSETS_BASE_URL.replace(/\/$/, '');
  const pastaRelativa = path.relative(process.cwd(), pasta).replace(/^\.\//, '');
  const urls = slides.map(s => `${base}/${pastaRelativa}/instagram/${s}`);

  // 1. Upload de cada foto SEM publicar (published=false), pega media_fbid
  console.log('▶ enviando fotos pra Página…');
  const mediaFbids = [];
  for (let i = 0; i < urls.length; i++) {
    const r = await api(`/${META_PAGE_ID}/photos`, {
      url: urls[i],
      published: 'false',
      access_token: META_PAGE_ACCESS_TOKEN,
    }, 'POST');
    mediaFbids.push(r.id);
    console.log(`  ✓ foto ${i + 1}/${urls.length} → ${r.id}`);
  }

  // 2. Criar post no feed com attached_media (multi-foto)
  console.log('▶ publicando no feed…');
  const attachedMedia = mediaFbids.map(id => ({ media_fbid: id }));
  const post = await api(`/${META_PAGE_ID}/feed`, {
    message: legenda,
    attached_media: JSON.stringify(attachedMedia),
    access_token: META_PAGE_ACCESS_TOKEN,
  }, 'POST');

  // 3. Pegar permalink
  const detail = await api(`/${post.id}`, {
    fields: 'permalink_url',
    access_token: META_PAGE_ACCESS_TOKEN,
  });

  console.log(`\n✓ publicado: ${detail.permalink_url}`);
  console.log(`  post id: ${post.id}`);
})().catch(e => die(e.message));
