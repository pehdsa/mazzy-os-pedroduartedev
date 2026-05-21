// Renderiza todas as capas (Highlights 1080x1080 + Stories 1080x1920).
// Uso: NODE_PATH=../../node_modules node identidade/capas/render.js
// Ou direto da pasta: node render.js (se node_modules estiver acessível)

const { chromium } = require('playwright');
const path = require('path');

const HERE = __dirname;

async function renderHtml({ html, viewport, selector, outDir }) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`file://${path.resolve(HERE, html)}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const slides = await page.$$(selector);
  console.log(`▶ ${html}: ${slides.length} slides`);
  for (const el of slides) {
    const slug = await el.evaluate(node => node.dataset.slug);
    const outPath = path.join(HERE, outDir, `${slug}.png`);
    await el.screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ ${outDir}/${slug}.png`);
  }
  await browser.close();
}

(async () => {
  await renderHtml({
    html: 'highlights.html',
    viewport: { width: 1080, height: 1080 },
    selector: '.highlight',
    outDir: 'highlights',
  });
  await renderHtml({
    html: 'stories.html',
    viewport: { width: 1080, height: 1920 },
    selector: '.story',
    outDir: 'stories',
  });
  console.log('Pronto.');
})().catch(e => { console.error(e); process.exit(1); });
