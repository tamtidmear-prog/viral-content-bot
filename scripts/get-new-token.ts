/**
 * get-new-token.ts — Generate new user token จาก Graph API Explorer
 * แล้วเช็คว่า Ai_In_Mind อยู่ใน /me/accounts ไหม
 */
import { chromium } from "playwright";
import { resolve } from "path";
import { mkdirSync, writeFileSync } from "fs";

const SESSION_PATH = resolve(import.meta.dir, "../.fb-session/state.json");
const SCREENSHOT_DIR = resolve(import.meta.dir, "../output/screenshots");

async function main() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: SESSION_PATH });
  const page = await context.newPage();

  console.log("1. Go to Graph API Explorer");
  await page.goto("https://developers.facebook.com/tools/explorer/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(12000);

  console.log("2. Click Generate Access Token");
  const genBtn = page.getByText("Generate Access Token", { exact: false });
  if (await genBtn.count() === 0) {
    console.log("ERROR: no Generate button");
    await browser.close();
    return;
  }

  const popupPromise = context.waitForEvent("page", { timeout: 30000 }).catch(() => null);
  await genBtn.first().click();
  await page.waitForTimeout(3000);
  const popup = await popupPromise;

  if (popup) {
    console.log("3. OAuth popup — click Continue");
    await popup.waitForLoadState("domcontentloaded");
    await popup.waitForTimeout(5000);

    // กด "ดำเนินการต่อ" (Continue) — ตอนนี้ Ai_In_Mind ถูก check แล้ว
    const continueBtn = popup.getByText("ดำเนินการต่อ", { exact: false });
    if (await continueBtn.count() > 0) {
      await continueBtn.first().click();
      console.log("  Clicked ดำเนินการต่อ");
    }
    await popup.waitForTimeout(5000);
  }

  // รอ explorer refresh
  console.log("4. Wait for token to appear");
  await page.waitForTimeout(15000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/new-token-explorer.png`, fullPage: true });

  // ดึง token — ลองหลาย selector
  let token = "";

  // วิธี 1: input fields
  const inputs = await page.locator("input").all();
  for (const inp of inputs) {
    const val = await inp.inputValue().catch(() => "");
    if (val && val.startsWith("EAA") && val.length > 100) {
      token = val;
      console.log(`  Found token in input, length=${val.length}`);
      break;
    }
  }

  // วิธี 2: ดึงจาก page content (token อาจแสดงเป็น text)
  if (!token) {
    const content = await page.content();
    const match = content.match(/EAA[A-Za-z0-9]{50,}/);
    if (match) {
      token = match[0];
      console.log(`  Found token in content, length=${token.length}`);
    }
  }

  if (token) {
    writeFileSync(resolve(SCREENSHOT_DIR, "../new-user-token.txt"), token);
    console.log("  Token saved to output/new-user-token.txt");
  } else {
    console.log("  WARNING: token not captured — check screenshot");
  }

  await context.storageState({ path: SESSION_PATH });
  await browser.close();
  console.log("=== DONE ===");
}

main().catch(console.error);
