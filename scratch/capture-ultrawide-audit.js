import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  
  const outDir = path.resolve("C:/Users/rtf70/.gemini/antigravity/brain/01231688-54be-4cfd-9738-692aaacdda58/ultrawide-audit");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const routes = [
    { path: "/", name: "bm1-home" },
    { path: "/development", name: "bm2-development" },
    { path: "/progress", name: "bm3-progress" },
    { path: "/scholarships", name: "bm4-scholarships" },
    { path: "/about", name: "bm5-about" },
    { path: "/contact", name: "bm6-contact" },
  ];

  const page = await browser.newPage({
    viewport: { width: 2560, height: 1080 },
    deviceScaleFactor: 1
  });

  await page.addInitScript(() => {
    sessionStorage.setItem("bmi_intro_seen", "true");
  });

  for (const route of routes) {
    try {
      console.log(`Navigating to ${route.path}...`);
      await page.goto(`http://localhost:3000${route.path}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(500);

      // Viewport screenshot (1080p fold check)
      const vpPath = path.join(outDir, `${route.name}-viewport-2560x1080.png`);
      await page.screenshot({ path: vpPath, fullPage: false });

      // Fullpage screenshot (scroll check)
      const fullPath = path.join(outDir, `${route.name}-fullpage-2560x1080.png`);
      await page.screenshot({ path: fullPath, fullPage: true });

      console.log(`Captured ${route.name}`);
    } catch (err) {
      console.error(`Failed ${route.name}:`, err.message);
    }
  }

  // Dashboard route
  try {
    console.log("Navigating to /login for dashboard capture...");
    await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
    await page.click("button:has-text('Coordinator')");
    await page.waitForURL("**/dashboard", { timeout: 10000 });
    await page.waitForTimeout(1000);

    const dashVpPath = path.join(outDir, `bm7-dashboard-viewport-2560x1080.png`);
    await page.screenshot({ path: dashVpPath, fullPage: false });

    const dashFullPath = path.join(outDir, `bm7-dashboard-fullpage-2560x1080.png`);
    await page.screenshot({ path: dashFullPath, fullPage: true });

    console.log("Captured bm7-dashboard");
  } catch (err) {
    console.error("Failed dashboard:", err.message);
  }

  await page.close();
  await browser.close();
  console.log("All ultrawide verification screenshots captured!");
}

main().catch(console.error);

