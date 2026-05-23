const { chromium } = require('playwright');
const path = require('path');

const HTML_INSTA = `file://${path.resolve(__dirname, 'carrossel-insta.html')}`;
const HTML_LINKEDIN = `file://${path.resolve(__dirname, 'carrossel.html')}`;
const INSTA_DIR = path.join(__dirname, 'instagram');
const LINKEDIN_DIR = path.join(__dirname, 'linkedin');

async function renderHtml({ html, width, height, outDir, label }) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const slides = await page.$$('.slide');
  console.log(`▶ ${label} (${width}x${height}): ${slides.length} slides`);
  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const outPath = path.join(outDir, `slide-${n}.png`);
    await slides[i].screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ ${outDir.split('/').pop()}/slide-${n}.png`);
  }
  await browser.close();
}

(async () => {
  // Insta: 4:5 (1080x1350) — segue padrão dos posts anteriores
  await renderHtml({
    html: HTML_INSTA,
    width: 1080,
    height: 1350,
    outDir: INSTA_DIR,
    label: 'Instagram',
  });

  // LinkedIn: 1:1 (1080x1080) — padrão da plataforma
  await renderHtml({
    html: HTML_LINKEDIN,
    width: 1080,
    height: 1080,
    outDir: LINKEDIN_DIR,
    label: 'LinkedIn',
  });

  console.log('Pronto.');
})();
