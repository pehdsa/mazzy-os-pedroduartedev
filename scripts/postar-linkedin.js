#!/usr/bin/env node
// Posta carrossel no LinkedIn (perfil pessoal) como multi-imagem.
// Uso: node --env-file=.env scripts/postar-linkedin.js <pasta-do-carrossel>
//
// Espera dentro de <pasta-do-carrossel>:
//   - instagram/slide-XX.png   (1 a 9 imagens — LinkedIn aceita até 9)
//   - legenda.md               (caption)

const fs = require('fs');
const path = require('path');

const LI_VERSION = '202604';
const LI_BASE = 'https://api.linkedin.com';

// LinkedIn "Little Text Format" — caracteres reservados precisam de escape.
// Sem isso, o parser trunca silenciosamente o texto quando encontra um deles.
// Caracteres: \ ( ) < > [ ] { } @ _ * ~
function escapeLinkedInText(text) {
  return text.replace(/[\\()<>\[\]{}@_*~]/g, '\\$&');
}

let TOKEN, USER_URN;

function die(msg) { console.error('erro: ' + msg); process.exit(1); }

async function liFetch(endpoint, options = {}) {
  const r = await fetch(LI_BASE + endpoint, {
    ...options,
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'LinkedIn-Version': LI_VERSION,
      'X-Restli-Protocol-Version': '2.0.0',
      ...(options.headers || {}),
    },
  });
  return r;
}

async function uploadImage(filePath, index, total) {
  // 1. Initialize upload
  const initRes = await liFetch('/rest/images?action=initializeUpload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initializeUploadRequest: { owner: USER_URN } }),
  });
  if (!initRes.ok) {
    const text = await initRes.text();
    throw new Error(`initializeUpload falhou: ${initRes.status} ${text}`);
  }
  const initData = await initRes.json();
  const uploadUrl = initData.value.uploadUrl;
  const imageUrn = initData.value.image;

  // 2. PUT binary pra URL retornada
  const buffer = fs.readFileSync(filePath);
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: buffer,
  });
  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`upload binário falhou: ${uploadRes.status} ${text}`);
  }

  console.log(`  ✓ slide ${index + 1}/${total} → ${imageUrn}`);
  return imageUrn;
}

(async () => {
  const pasta = process.argv[2];
  if (!pasta) die('passa a pasta do carrossel. ex: node scripts/postar-linkedin.js marketing/conteudo/carrossel-xxx');

  TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
  USER_URN = process.env.LINKEDIN_USER_URN;
  if (!TOKEN) die('LINKEDIN_ACCESS_TOKEN não definido no .env');
  if (!USER_URN) die('LINKEDIN_USER_URN não definido no .env');

  if (!fs.existsSync(pasta)) die(`pasta não existe: ${pasta}`);

  // Prefere pasta linkedin/ (slides 1:1 específicos) se existir, senão usa instagram/
  const linkedinDir = path.join(pasta, 'linkedin');
  const instaDir = path.join(pasta, 'instagram');
  let slidesDir;
  if (fs.existsSync(linkedinDir)) {
    slidesDir = linkedinDir;
    console.log('▶ usando slides específicos do LinkedIn (linkedin/)');
  } else if (fs.existsSync(instaDir)) {
    slidesDir = instaDir;
    console.log('▶ usando slides do Instagram como fallback (instagram/)');
  } else {
    die(`nem linkedin/ nem instagram/ existem em ${pasta}`);
  }

  const slides = fs.readdirSync(slidesDir)
    .filter(f => /^slide-\d+\.png$/.test(f))
    .sort();
  if (slides.length < 1) die('nenhum slide encontrado');
  if (slides.length > 9) die(`LinkedIn aceita no máximo 9 imagens, achei ${slides.length}`);
  console.log(`▶ ${slides.length} slides`);

  // Prefere legenda-linkedin.md, senão usa legenda.md
  const legendaLinkedinPath = path.join(pasta, 'legenda-linkedin.md');
  const legendaGenericPath = path.join(pasta, 'legenda.md');
  let legendaPath;
  if (fs.existsSync(legendaLinkedinPath)) {
    legendaPath = legendaLinkedinPath;
    console.log('▶ usando legenda específica do LinkedIn (legenda-linkedin.md)');
  } else if (fs.existsSync(legendaGenericPath)) {
    legendaPath = legendaGenericPath;
    console.log('▶ usando legenda do Instagram como fallback (legenda.md)');
  } else {
    die(`nem legenda-linkedin.md nem legenda.md existem em ${pasta}`);
  }
  // tira o título Markdown da primeira linha + trim
  const legenda = fs.readFileSync(legendaPath, 'utf8').replace(/^#.*\n+/, '').trim();
  if (legenda.length > 3000) {
    console.warn(`⚠ legenda tem ${legenda.length} chars (limite LinkedIn é 3000) — truncando.`);
  }
  console.log(`▶ legenda: ${legenda.length} chars`);

  // 1. Upload de cada imagem
  console.log('▶ enviando imagens…');
  const imageUrns = [];
  for (let i = 0; i < slides.length; i++) {
    const urn = await uploadImage(path.join(slidesDir, slides[i]), i, slides.length);
    imageUrns.push(urn);
  }

  // 2. Criar post
  console.log('▶ criando post…');
  const content = imageUrns.length === 1
    ? { media: { id: imageUrns[0] } }
    : { multiImage: { images: imageUrns.map(id => ({ id })) } };

  const postBody = {
    author: USER_URN,
    commentary: escapeLinkedInText(legenda.slice(0, 3000)),
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content,
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  };

  const postRes = await liFetch('/rest/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postBody),
  });
  if (!postRes.ok) {
    const text = await postRes.text();
    die(`falha ao criar post: ${postRes.status} ${text}`);
  }
  const postUrn = postRes.headers.get('x-restli-id');

  console.log(`\n✓ post publicado no LinkedIn`);
  console.log(`  URN: ${postUrn}`);
  console.log(`  Link: https://www.linkedin.com/feed/update/${postUrn}/`);
})().catch(e => die(e.message));
