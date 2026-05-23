const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML_PATH = `file://${path.resolve(__dirname, 'carrossel.html')}`;
const INSTA_DIR = path.join(__dirname, 'instagram');
const LINKEDIN_DIR = path.join(__dirname, 'linkedin');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(HTML_PATH, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const slides = await page.$$('.slide');
  console.log(`Renderizando ${slides.length} slides (1080x1080)...`);

  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const instaPath = path.join(INSTA_DIR, `slide-${n}.png`);
    const linkedinPath = path.join(LINKEDIN_DIR, `slide-${n}.png`);

    // Renderiza uma vez e copia pra ambas as pastas (formato 1:1 igual)
    await slides[i].screenshot({ path: instaPath, omitBackground: false });
    fs.copyFileSync(instaPath, linkedinPath);
    console.log(`  ✓ slide-${n}.png → instagram/ + linkedin/`);
  }

  await browser.close();
  console.log('Pronto.');
})();
