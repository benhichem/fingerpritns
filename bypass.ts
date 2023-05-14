import { executablePath } from "puppeteer";
import { plugin } from "puppeteer-with-fingerprints";

const fingerprint = await plugin.fetch("", {
  tags: ["Microsoft Windows", "Chrome"],
});

plugin.useFingerprint(fingerprint);

const url = "https://bigspy.com/user/login";
const browser = await plugin.launch({
  headless: true,
  executablePath: executablePath(),
});

const page = await browser.newPage();
await page.setViewport({
  height: 1200,
  width: 1200,
});

await page.goto(url, { timeout: 0 });
await page.waitForSelector("body > div > div.website-logo > a > img", {
  timeout: 0,
});
await page.screenshot({ path: "screen.jpg" });

await page.close();
await browser.close();
