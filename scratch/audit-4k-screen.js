import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  
  const viewports = [
    { name: "4k-3840x2160", width: 3840, height: 2160 },
    { name: "qhd-2560x1440", width: 2560, height: 1440 },
    { name: "fhd-1920x1080", width: 1920, height: 1080 },
  ];

  const outDir = path.resolve("C:/Users/rtf70/.gemini/antigravity/brain/01231688-54be-4cfd-9738-692aaacdda58/4k-audit");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const routes = [
    { path: "/", name: "home" },
    { path: "/development", name: "development" },
    { path: "/progress", name: "progress" },
    { path: "/scholarships", name: "scholarships" },
    { path: "/future-labs", name: "future-labs" },
    { path: "/about", name: "about" },
    { path: "/contact", name: "contact" }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    await page.addInitScript(() => {
      sessionStorage.setItem("bmi_intro_seen", "true");
    });

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:3000${route.path}`, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(300);

        const screenshotPath = path.join(outDir, `${route.name}-${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`Saved screenshot: ${route.name}-${vp.name}.png`);
      } catch (err) {
        console.error(`Failed ${route.name} at ${vp.name}:`, err.message);
      }
    }

    // Also capture logged in dashboard
    try {
      await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
      await page.click("button:has-text('Coordinator')");
      await page.waitForURL("**/dashboard", { timeout: 10000 });
      await page.waitForTimeout(1000);
      const dashPath = path.join(outDir, `dashboard-${vp.name}.png`);
      await page.screenshot({ path: dashPath, fullPage: false });
      console.log(`Saved screenshot: dashboard-${vp.name}.png`);
    } catch (err) {
      console.error(`Failed dashboard at ${vp.name}:`, err.message);
    }

    await page.close();
  }

  await browser.close();
  console.log("4K audit screenshots captured successfully!");
}

main().catch(console.error);

