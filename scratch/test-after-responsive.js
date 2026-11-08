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
    { path: "/about", name: "about" },
    { path: "/contact", name: "contact" }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    // Dismiss cinematic intro in sessionStorage
    await page.addInitScript(() => {
      sessionStorage.setItem("bmi_intro_seen", "true");
    });

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:3000${route.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(300);

        const screenshotPath = path.join(outDir, `${route.name}-${vp.name}-after.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`Saved screenshot: ${route.name}-${vp.name}-after.png`);
      } catch (err) {
        console.error(`Failed ${route.name} at ${vp.name}:`, err.message);
      }
    }

    // Also capture logged-in dashboard at this viewport
    try {
      await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
      await page.click("button:has-text('Coordinator')");
      await page.waitForTimeout(600);
      const dashScreenshotPath = path.join(outDir, `dashboard-${vp.name}-after.png`);
      await page.screenshot({ path: dashScreenshotPath, fullPage: false });
      console.log(`Saved screenshot: dashboard-${vp.name}-after.png`);
    } catch (err) {
      console.error(`Failed dashboard at ${vp.name}:`, err.message);
    }

    await page.close();
  }

  // Also capture full-page screenshots at 2560x1080 for scholarships and development
  const widePage = await browser.newPage({ viewport: { width: 2560, height: 1080 } });
  await widePage.addInitScript(() => {
    sessionStorage.setItem("bmi_intro_seen", "true");
  });
  await widePage.goto("http://localhost:3000/scholarships", { waitUntil: "networkidle" });
  await widePage.screenshot({ path: path.join(outDir, "scholarships-full-2560-after.png"), fullPage: true });

  await widePage.goto("http://localhost:3000/development", { waitUntil: "networkidle" });
  await widePage.screenshot({ path: path.join(outDir, "development-full-2560-after.png"), fullPage: true });

  await widePage.close();

  await browser.close();
  console.log("All responsive verification captures completed!");
}

main().catch(console.error);

