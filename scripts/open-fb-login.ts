/**
 * open-fb-login.ts — เปิด browser ให้ Master J login เอง แล้ว save session
 *
 * Usage: bun scripts/open-fb-login.ts
 * Master J: login → กลับมาบอก Prism → Prism save session
 */
import { chromium } from "playwright";
import { resolve } from "path";
import { mkdirSync } from "fs";

const SESSION_PATH = resolve(import.meta.dir, "../.fb-session-jinjinrom/state.json");

async function main() {
  mkdirSync(resolve(import.meta.dir, "../.fb-session-jinjinrom"), { recursive: true });

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("→ เปิด facebook.com");
  await page.goto("https://www.facebook.com/login/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  console.log("\n⏸️  Master J กรุณา:");
  console.log("    1. login ด้วย jinjinrom@gmail.com");
  console.log("    2. ผ่าน 2FA / captcha ถ้ามี");
  console.log("    3. เข้าหน้า news feed ได้แล้ว → กด Ctrl+C ที่ terminal นี้");
  console.log("\n  Browser จะอยู่เปิด 10 นาที — session จะ save อัตโนมัติทุก 30 วินาที\n");

  // Save session ทุก 30 วินาที (เผื่อ crash)
  const interval = setInterval(async () => {
    try {
      await context.storageState({ path: SESSION_PATH });
      console.log(`  💾 session saved ${new Date().toLocaleTimeString()}`);
    } catch {}
  }, 30000);

  // รอ 10 นาที
  await page.waitForTimeout(600000);

  clearInterval(interval);
  await context.storageState({ path: SESSION_PATH });
  await browser.close();
  console.log("=== DONE — session saved ===");
}

main().catch(console.error);
