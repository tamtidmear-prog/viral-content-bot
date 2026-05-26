/**
 * create-page-jinjinrom.ts — Login + สร้างเพจ FB ใหม่
 *
 * Account: jinjinrom@gmail.com (credentials จาก pass master-j/facebook-jinjinrom)
 * Page: AI ข้างกาย (Personal Blog)
 *
 * Run: bun scripts/create-page-jinjinrom.ts
 */
import { chromium, type Page } from "playwright";
import { resolve } from "path";
import { mkdirSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const SESSION_PATH = resolve(import.meta.dir, "../.fb-session-jinjinrom/state.json");
const SCREENSHOT_DIR = resolve(import.meta.dir, "../output/screenshots-jinjinrom");
const OUTPUT_PATH = resolve(import.meta.dir, "../output/jinjinrom-page-result.json");

const EMAIL = "jinjinrom@gmail.com";
const PASSWORD = execSync("pass show master-j/facebook-jinjinrom").toString().trim().split("\n")[0] || "";

const PAGE_NAME = "AI ข้างกาย";
const PAGE_CATEGORY = "Personal blog";
const PAGE_DESCRIPTION =
  "พื้นที่แบ่งปันชีวิตที่มี AI เป็นคู่หู ไม่ใช่คู่แข่ง — เรียนรู้ ใช้งาน ลองผิดลองถูกไปด้วยกัน เพราะ AI ไม่ใช่อนาคต แต่อยู่ข้างกายเราแล้วทุกวัน";

async function snap(page: Page, name: string) {
  await page.screenshot({ path: `${SCREENSHOT_DIR}/${name}.png`, fullPage: true });
  console.log(`  📸 ${name}.png`);
}

async function login(page: Page) {
  console.log("1. Go to facebook.com");
  await page.goto("https://www.facebook.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);

  // เช็คว่า login แล้วหรือยัง (ดูจาก URL หรือ avatar)
  if (page.url().includes("/home") || page.url() === "https://www.facebook.com/") {
    const loggedIn = await page.locator('[aria-label*="profile"], [aria-label*="โปรไฟล์"]').count();
    if (loggedIn > 0) {
      console.log("  ✅ already logged in");
      return;
    }
  }

  console.log("2. Fill email + password");
  await page.fill('input[name="email"]', EMAIL);
  await page.fill('input[name="pass"]', PASSWORD);
  await snap(page, "01-login-form");

  console.log("3. Click login");
  const loginBtn = page
    .locator('button:has-text("Log in"), button:has-text("เข้าสู่ระบบ"), button[type="submit"]')
    .first();
  await loginBtn.click({ timeout: 30000 });
  await page.waitForTimeout(10000);
  await snap(page, "02-after-login");

  // เช็ค error
  const errorMsg = (await page.locator('[role="alert"]').first().textContent().catch(() => "")) || "";
  if (errorMsg.length > 0) {
    console.log(`  ⚠️ alert: ${errorMsg.slice(0, 200)}`);
  }
}

async function createPage(page: Page) {
  console.log("4. Go to /pages/create");
  await page.goto("https://www.facebook.com/pages/create/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(8000);
  await snap(page, "03-create-page");

  console.log("5. Fill page name");
  const nameInput = page
    .locator('input[aria-label*="ชื่อเพจ"], input[aria-label*="Page name"], input[placeholder*="ชื่อ"], input[placeholder*="Page name"]')
    .first();
  await nameInput.waitFor({ timeout: 15000 });
  await nameInput.fill(PAGE_NAME);
  await page.waitForTimeout(2000);

  console.log("6. Fill category");
  const catInput = page
    .locator('input[aria-label*="หมวดหมู่"], input[aria-label*="Category"], input[placeholder*="หมวด"], input[placeholder*="Category"]')
    .first();
  await catInput.waitFor({ timeout: 15000 });
  await catInput.fill(PAGE_CATEGORY);
  await page.waitForTimeout(3000);

  // เลือกตัวเลือกแรกที่เด้งขึ้นมา
  const firstOption = page.locator('[role="option"], [role="listbox"] > div').first();
  if (await firstOption.count() > 0) {
    await firstOption.click();
    console.log("  ✅ clicked first category option");
  }
  await page.waitForTimeout(2000);

  console.log("7. Fill description");
  const descInput = page
    .locator('textarea[aria-label*="คำอธิบาย"], textarea[aria-label*="Description"], textarea[placeholder*="อธิบาย"], textarea[placeholder*="Bio"]')
    .first();
  if (await descInput.count() > 0) {
    await descInput.fill(PAGE_DESCRIPTION);
    await page.waitForTimeout(2000);
  } else {
    console.log("  ⚠️ description textarea not found — skipping");
  }
  await snap(page, "04-form-filled");

  console.log("8. Click Create page");
  const createBtn = page
    .locator('div[role="button"]:has-text("สร้างเพจ"), div[role="button"]:has-text("Create Page"), button:has-text("สร้างเพจ"), button:has-text("Create Page")')
    .first();
  await createBtn.waitFor({ timeout: 10000 });
  await createBtn.click();
  await page.waitForTimeout(10000);
  await snap(page, "05-after-create");

  console.log("9. Extract Page ID from URL");
  const currentUrl = page.url();
  console.log(`  URL: ${currentUrl}`);
  const idMatch = currentUrl.match(/\/(\d{10,})\/?/);
  const pageId = idMatch ? idMatch[1] : null;

  return { pageId, url: currentUrl };
}

async function main() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
  mkdirSync(resolve(import.meta.dir, "../.fb-session-jinjinrom"), { recursive: true });

  const browser = await chromium.launch({ headless: false, slowMo: 200 });

  // Load session ถ้ามี
  let context;
  try {
    context = await browser.newContext({ storageState: SESSION_PATH });
    console.log("  Using existing session");
  } catch {
    context = await browser.newContext();
    console.log("  Fresh session");
  }

  const page = await context.newPage();

  try {
    await login(page);
    const result = await createPage(page);

    console.log("\n=== RESULT ===");
    console.log(JSON.stringify(result, null, 2));

    writeFileSync(OUTPUT_PATH, JSON.stringify({
      ...result,
      pageName: PAGE_NAME,
      category: PAGE_CATEGORY,
      description: PAGE_DESCRIPTION,
      email: EMAIL,
      createdAt: new Date().toISOString(),
    }, null, 2));

    console.log(`\n  Saved to ${OUTPUT_PATH}`);

    // Save session ไว้ใช้ทีหลัง
    await context.storageState({ path: SESSION_PATH });
    console.log(`  Session saved to ${SESSION_PATH}`);

    console.log("\n  ⏸️ Browser ยังเปิดอยู่ 60 วินาที เผื่อต้อง verify บน screen...");
    await page.waitForTimeout(60000);
  } catch (err) {
    console.error("ERROR:", err);
    await snap(page, "99-error");
  } finally {
    await browser.close();
  }

  console.log("=== DONE ===");
}

main().catch(console.error);
