#!/usr/bin/env node
// Setup OAuth do LinkedIn — gera URL, troca code por access_token, busca user URN,
// salva tudo no .env. Roda uma vez só.
//
// Uso:
//   LINKEDIN_CLIENT_ID=xxx LINKEDIN_CLIENT_SECRET=yyy node scripts/setup-linkedin.js
//
// Fluxo:
//   1. Script imprime URL de autorização
//   2. Você abre no browser, autoriza
//   3. LinkedIn redireciona pra http://localhost:8888/callback?code=XXX&state=...
//   4. Browser dá erro (sem server local), mas o "code" fica visível na URL bar
//   5. Cola o code no terminal
//   6. Script troca code por access_token, busca user URN, salva no .env

const fs = require('fs');
const readline = require('readline');

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8888/callback';
const SCOPES = ['openid', 'profile', 'w_member_social'];
const STATE = Math.random().toString(36).slice(2);

function die(msg) { console.error('erro: ' + msg); process.exit(1); }

if (!CLIENT_ID) die('LINKEDIN_CLIENT_ID não definido. Passa como env var.');
if (!CLIENT_SECRET) die('LINKEDIN_CLIENT_SECRET não definido. Passa como env var.');

const authUrl =
  'https://www.linkedin.com/oauth/v2/authorization' +
  `?response_type=code` +
  `&client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&state=${STATE}` +
  `&scope=${encodeURIComponent(SCOPES.join(' '))}`;

console.log('\n1. Abre essa URL no browser e autoriza o app:\n');
console.log('   ' + authUrl);
console.log('\n2. Depois de autorizar, o LinkedIn redireciona pra:');
console.log('   http://localhost:8888/callback?code=XXXXXXX&state=' + STATE);
console.log('\n3. O browser vai mostrar erro (sem servidor local), MAS o "code" fica visível');
console.log('   na barra de endereço. Copia SÓ o valor do parâmetro "code" (depois de "code=" e antes de "&state").\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Cola o code aqui: ', async (code) => {
  rl.close();
  code = code.trim();
  if (!code) die('code vazio');

  console.log('\n▶ trocando code por access_token…');
  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) die('falha na troca: ' + JSON.stringify(tokenData));
  const days = Math.round(tokenData.expires_in / 86400);
  console.log(`  ✓ access_token obtido (expira em ~${days} dias)`);

  console.log('▶ buscando user URN via /v2/userinfo…');
  const userRes = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const user = await userRes.json();
  if (!user.sub) die('falha em /userinfo: ' + JSON.stringify(user));
  const userUrn = `urn:li:person:${user.sub}`;
  console.log(`  ✓ ${user.name || user.given_name} → ${userUrn}`);

  console.log('▶ atualizando .env…');
  let env = fs.readFileSync('.env', 'utf8');
  if (!env.endsWith('\n')) env += '\n';

  function upsert(key, value) {
    const re = new RegExp(`^${key}=.*$`, 'm');
    if (re.test(env)) {
      env = env.replace(re, `${key}=${value}`);
    } else {
      env += `${key}=${value}\n`;
    }
  }

  upsert('LINKEDIN_ACCESS_TOKEN', tokenData.access_token);
  upsert('LINKEDIN_USER_URN', userUrn);
  if (tokenData.refresh_token) upsert('LINKEDIN_REFRESH_TOKEN', tokenData.refresh_token);

  fs.writeFileSync('.env', env);
  console.log('\n✓ .env atualizado. LINKEDIN_ACCESS_TOKEN e LINKEDIN_USER_URN salvos.');
  console.log(`  Validade do token: ~${days} dias. Renova rodando esse mesmo script de novo.\n`);
});
