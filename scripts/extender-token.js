#!/usr/bin/env node
// Estende o Page Access Token pra permanente (nunca expira).
//
// Uso:
//   APP_SECRET=xxx USER_TOKEN=EAA... node --env-file=.env scripts/extender-token.js
//
// Onde:
//   APP_SECRET = "Chave secreta do app" (Meta Developers > Configurações > Básico)
//   USER_TOKEN = User Access Token recém-gerado no Graph API Explorer

const fs = require('fs');

const APP_ID = '1792651131713105';
const APP_SECRET = process.env.APP_SECRET;
const USER_TOKEN = process.env.USER_TOKEN;
const PAGE_ID = process.env.META_PAGE_ID;

function die(msg) { console.error('erro: ' + msg); process.exit(1); }

if (!APP_SECRET) die('passa APP_SECRET como env var. ex: APP_SECRET=xxx USER_TOKEN=yyy node scripts/extender-token.js');
if (!USER_TOKEN) die('passa USER_TOKEN como env var (o User Token do Graph API Explorer)');
if (!PAGE_ID) die('META_PAGE_ID não definido no .env');

(async () => {
  // 1. Short-lived User Token → Long-lived User Token (60 dias)
  console.log('▶ convertendo User Token short-lived → long-lived…');
  const extUrl = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${encodeURIComponent(APP_SECRET)}&fb_exchange_token=${USER_TOKEN}`;
  const ext = await fetch(extUrl).then(r => r.json());
  if (!ext.access_token) die('falha ao estender: ' + JSON.stringify(ext));
  console.log('  ✓ long-lived User Token obtido');

  // 1.5. DEBUG: ver permissões do token
  console.log('▶ checando permissões do token…');
  const me = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${ext.access_token}`).then(r => r.json());
  console.log('  identidade:', JSON.stringify(me));
  const perms = await fetch(`https://graph.facebook.com/v19.0/me/permissions?access_token=${ext.access_token}`).then(r => r.json());
  console.log('  permissões:', perms.data ? perms.data.map(p => `${p.permission}=${p.status}`).join(', ') : JSON.stringify(perms));

  // 2. Long-lived User Token → Page Token PERMANENTE
  console.log('▶ buscando Page Token permanente…');
  const accounts = await fetch(`https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token&access_token=${ext.access_token}`).then(r => r.json());
  if (accounts.error) die('falha em /me/accounts: ' + accounts.error.message);
  const page = accounts.data?.find(p => p.id === PAGE_ID);
  if (!page) die(`Página ${PAGE_ID} não encontrada na lista`);
  console.log(`  ✓ Page Token permanente obtido (${page.name})`);

  // 3. Atualiza .env
  let env = fs.readFileSync('.env', 'utf8');
  env = env.replace(/^META_PAGE_ACCESS_TOKEN=.*$/m, 'META_PAGE_ACCESS_TOKEN=' + page.access_token);
  fs.writeFileSync('.env', env);
  console.log('\n✓ .env atualizado. Token agora é PERMANENTE (não expira).');
})().catch(e => die(e.message));
