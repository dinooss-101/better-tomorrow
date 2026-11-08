import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  
  const viewports = [
    { name: "mobile-375", width: 375, height: 667 },
    { name: "laptop-1440", width: 1440, height: 900 },
    { name: "desktop-1920", width: 1920, height: 1080 },
    { name: "ultrawide-2560x1080", width: 2560, height: 1080 },
    { name: "ultrawide-2560x1440", width: 2560, height: 1440 },
    { name: "ultrawide-3440x1440", width: 3440, height: 1440 },
  ];

  const outDir = path.resolve("C:/Users/rtf70/.gemini/antigravity/brain/01231688-54be-4cfd-9738-692aaacdda58/responsive-audit");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const routes = [
    { path: "/", name: "home" },
    { path: "/development", name: "development" },
    { path: "/progress", name: "progress" },
    { path: "/scholarships", name: "scholarships" },
    { path: "/dashboard", name: "dashboard" }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:3000${route.path}`, { waitUntil: "networkidle", timeout: 15000 });
        // Dismiss intro or any overlay if present
        await page.evaluate(() => {
          localStorage.setItem("cinematic_intro_seen", "true");
        });
        await page.waitForTimeout(500);

        const screenshotPath = path.join(outDir, `${route.name}-${vp.name}-before.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`Saved screenshot: ${route.name}-${vp.name}-before.png`);
      } catch (err) {
        console.error(`Failed ${route.name} at ${vp.name}:`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();
  console.log("Responsive baseline audit complete!");
}

main().catch(console.error);

