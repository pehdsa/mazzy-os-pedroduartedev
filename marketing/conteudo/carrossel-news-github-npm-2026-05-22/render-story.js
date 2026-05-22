const { chromium } = require('playwright');
const path = require('path');

const HTML_PATH = `file://${path.resolve(__dirname, 'story.html')}`;
const OUTPUT = path.join(__dirname, 'story.png');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(HTML_PATH, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const slide = await page.$('.story');
  await slide.screenshot({ path: OUTPUT, omitBackground: false });
  console.log('✓ story.png renderizado');

  await browser.close();
})();
