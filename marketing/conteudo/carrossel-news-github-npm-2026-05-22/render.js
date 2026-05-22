const { chromium } = require('playwright');
const path = require('path');

const HTML_PATH = `file://${path.resolve(__dirname, 'carrossel.html')}`;
const OUTPUT_DIR = path.join(__dirname, 'instagram');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(HTML_PATH, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const slides = await page.$$('.slide');
  console.log(`Renderizando ${slides.length} slides...`);

  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUTPUT_DIR, `slide-${n}.png`);
    await slides[i].screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ slide-${n}.png`);
  }

  await browser.close();
  console.log('Pronto.');
})();
