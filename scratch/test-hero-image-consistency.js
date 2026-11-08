import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  
  const routes = [
    { name: "Home", path: "/" },
    { name: "Development", path: "/development" },
    { name: "Progress", path: "/progress" },
    { name: "Scholarships", path: "/scholarships" },
    { name: "Future Labs", path: "/future-labs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const viewports = [
    { name: "Laptop (1440x900)", width: 1440, height: 900 },
    { name: "Ultrawide (2560x1080)", width: 2560, height: 1080 },
    { name: "Mobile (375x812)", width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    console.log(`\n================== VIEWPORT: ${vp.name} ==================`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    await page.addInitScript(() => {
      sessionStorage.setItem("bmi_intro_seen", "true");
    });

    for (const r of routes) {
      await page.goto(`http://localhost:3000${r.path}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      const heroImg = await page.$("#hero img");
      if (heroImg) {
        const box = await heroImg.boundingBox();
        if (box) {
          console.log(
            `${r.name.padEnd(15)} image: ${Math.round(box.width)}px x ${Math.round(box.height)}px (aspect: ${(box.width / box.height).toFixed(3)})`
          );
        } else {
          console.log(`${r.name.padEnd(15)} image: no bounding box`);
        }
      } else {
        console.log(`${r.name.padEnd(15)} no #hero img found`);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log("\nHero image consistency check complete!");
}

main().catch(console.error);

