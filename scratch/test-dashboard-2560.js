import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 2560, height: 1080 } });
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  await page.click("button:has-text('Coordinator')");
  await page.waitForURL("**/dashboard", { timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "C:/Users/rtf70/.gemini/antigravity/brain/01231688-54be-4cfd-9738-692aaacdda58/responsive-audit/dashboard-auth-2560-after.png", fullPage: true });
  await browser.close();
  console.log("Dashboard auth 2560 saved");
}

main().catch(console.error);

