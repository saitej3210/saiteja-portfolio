// Auto-capture real screenshots of all your live projects.
// One-time:   npm i -D playwright && npx playwright install chromium
// Then run:   node tools/capture-shots.mjs        (from the portfolio folder)
// It saves assets/shots/<slug>.jpg, <slug>-2.jpg (scrolled), <slug>-m.jpg (mobile) and writes shots.js.
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const src = readFileSync("projects.js", "utf8");
const list = [...src.matchAll(/s:"([^"]+)"[\s\S]*?u:"([^"]+)"/g)].map(m => ({ slug: m[1], url: m[2] }));
mkdirSync("assets/shots", { recursive: true });
const browser = await chromium.launch();
const ok = [];
for (const { slug, url } of list) {
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(3500);                          // let intros / 3D scenes settle
    await page.screenshot({ path: `assets/shots/${slug}.jpg`, type: "jpeg", quality: 82 });
    await page.mouse.wheel(0, 1100); await page.waitForTimeout(1800);
    await page.screenshot({ path: `assets/shots/${slug}-2.jpg`, type: "jpeg", quality: 82 });
    await page.close();
    const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await mob.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
    await mob.waitForTimeout(3000);
    await mob.screenshot({ path: `assets/shots/${slug}-m.jpg`, type: "jpeg", quality: 80 });
    await mob.close();
    ok.push(slug); console.log("✓", slug);
  } catch (e) { console.log("✗", slug, e.message); }
}
writeFileSync("shots.js", `window.SHOTS = ${JSON.stringify(ok)};\n`);
await browser.close();
console.log(`\nDone — ${ok.length}/${list.length} projects have screenshots. Refresh the site.`);
