import { chromium, type BrowserContext, type Page } from "playwright";
import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";
import json from "../config/platforms.json";

// ============================
// fb-page-manager — เครื่องมือจัดการ Facebook Page
// ใช้ Playwright + saved session state (login ครั้งเดียว ใช้ซ้ำได้)
//
// Usage:
//   bun run scripts/set-page-images.ts set-profile <image>
//   bun run scripts/set-page-images.ts set-cover <image>
//   bun run scripts/set-page-images.ts set-both <profile> <cover>
//   bun run scripts/set-page-images.ts token-gen
//   bun run scripts/set-page-images.ts login        (force re-login)
// ============================

const PAGE_ID = (json as any).facebook.page_id;
const PAGE_URL = `https://www.facebook.com/profile.php?id=${PAGE_ID}`;
const STATE_DIR = path.resolve(import.meta.dir, "../.fb-session");
const STATE_FILE = path.join(STATE_DIR, "state.json");
const SCREENSHOTS = "/tmp/fb-page-manager";

function getPass(key: string): string {
  return execSync(`pass ${key}`, { encoding: "utf-8" }).trim();
}

async function ensureDirs() {
  const { mkdir } = await import("fs/promises");
  await mkdir(STATE_DIR, { recursive: true });
  await mkdir(SCREENSHOTS, { recursive: true });
}

async function screenshot(page: Page, name: string) {
  const p = path.join(SCREENSHOTS, `${name}.png`);
  await page.screenshot({ path: p });
  console.log(`  📸 ${p}`);
}

async function login(page: Page): Promise<boolean> {
  console.log("🔐 Logging in as PapaJinna (mamipogo1@hotmail.com)...");
  const fbData = getPass("master-j/facebook");
  const lines = fbData.split("\n");
  const fbPass = lines[0];
  const email = lines.find(l => l.startsWith("email:"))?.split(":")[1]?.trim() || "";

  await page.goto("https://www.facebook.com/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="pass"]', fbPass);
  await page.keyboard.press("Enter");

  // Poll for redirect (lesson: ห้ามใช้ fixed timeout, ใช้ poll loop)
  console.log("  Waiting for login redirect...");
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(2000);
    const url = page.url();

    if (url.includes("facebook.com/?") || url === "https://www.facebook.com/") {
      console.log("  ✅ Login successful!");
      return true;
    }

    if (url.includes("checkpoint") || url.includes("two_step")) {
      console.log("  ⚠️  2FA required — complete in browser window");
      console.log("  Waiting up to 120s...");
    }
  }

  console.log("  ❌ Login timeout");
  return false;
}

async function getBrowser(): Promise<{ context: BrowserContext; page: Page; isNew: boolean }> {
  let context: BrowserContext;
  let isNew = false;

  if (existsSync(STATE_FILE)) {
    console.log("♻️  Reusing saved Facebook session");
    const browser = await chromium.launch({ headless: false, slowMo: 300, channel: "chrome" });
    context = await browser.newContext({ storageState: STATE_FILE });
  } else {
    console.log("🆕 No saved session — will login");
    const browser = await chromium.launch({ headless: false, slowMo: 300, channel: "chrome" });
    context = await browser.newContext();
    isNew = true;
  }

  const page = await context.newPage();
  return { context, page, isNew };
}

async function ensureLoggedIn(context: BrowserContext, page: Page, isNew: boolean): Promise<boolean> {
  if (isNew) {
    const ok = await login(page);
    if (ok) {
      await context.storageState({ path: STATE_FILE });
      console.log(`  💾 Session saved → ${STATE_FILE}`);
    }
    return ok;
  }

  // Verify saved session still works
  await page.goto("https://www.facebook.com/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  if (page.url().includes("login") || await page.$('input[name="email"]')) {
    console.log("  ⚠️  Saved session expired — re-logging in...");
    const ok = await login(page);
    if (ok) {
      await context.storageState({ path: STATE_FILE });
      console.log(`  💾 Session re-saved → ${STATE_FILE}`);
    }
    return ok;
  }

  console.log("  ✅ Facebook session active");
  return true;
}

function tryClick(page: Page, selectors: string[], label: string): Promise<boolean> {
  return (async () => {
    for (const sel of selectors) {
      const el = await page.$(sel);
      if (el) {
        await el.click();
        console.log(`  ✅ Clicked ${label}: ${sel}`);
        return true;
      }
    }
    return false;
  })();
}

async function setProfilePic(page: Page, imagePath: string): Promise<boolean> {
  console.log("\n=== Setting Profile Picture ===");
  console.log(`  Image: ${imagePath}`);

  // Step 0: Switch to page identity (browse as Prism Chronicle, not PapaJinna)
  await page.goto(PAGE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);
  await screenshot(page, "00-before-switch");

  // Click "การตั้งค่า" to trigger switch dialog
  const settingsBtn = await tryClick(page, [
    'text="การตั้งค่า"', 'text="Settings"',
  ], "settings");
  if (settingsBtn) {
    await page.waitForTimeout(2000);
    // Click "สลับ" (Switch) — use force:true to bypass overlay
    await page.waitForTimeout(2000);
    try {
      await page.click('text="สลับ"', { force: true, timeout: 5000 });
      console.log("  ✅ Switched to Prism Chronicle identity");
      await page.waitForTimeout(5000);
    } catch {
      // Fallback: try keyboard
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      console.log("  ✅ Switch via keyboard");
      await page.waitForTimeout(5000);
    }
  }

  // Navigate to page's OWN profile (not management view)
  // After switching to page identity, go to the page directly
  await page.goto(`https://www.facebook.com/${PAGE_ID}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);
  await screenshot(page, "01-page");

  // Now hover over profile pic — should show edit option as page owner
  await page.mouse.move(460, 490);
  await page.waitForTimeout(2000);
  await screenshot(page, "01b-hover");

  let editClicked = await tryClick(page, [
    '[aria-label="Edit profile picture"]', '[aria-label="แก้ไขรูปโปรไฟล์"]',
    '[aria-label="Update profile picture"]', '[aria-label="อัปเดตรูปโปรไฟล์"]',
    'svg[aria-label="camera"]',
    'text="Edit profile picture"', 'text="แก้ไขรูปโปรไฟล์"',
  ], "profile edit");

  if (!editClicked) {
    // Try clicking directly on the profile pic area
    console.log("  No edit button — trying direct click on profile pic...");
    await page.mouse.click(460, 490);
    await page.waitForTimeout(3000);
    await screenshot(page, "01c-click");

    editClicked = await tryClick(page, [
      'text="Edit profile picture"', 'text="แก้ไขรูปโปรไฟล์"',
      'text="Update profile picture"', 'text="อัปเดตรูปโปรไฟล์"',
      'text="Upload photo"', 'text="อัปโหลดรูปภาพ"',
      'text="Choose profile picture"', 'text="เลือกรูปโปรไฟล์"',
    ], "profile edit after click");
  }

  if (!editClicked) {
    await screenshot(page, "01d-failed");
    console.log("  ❌ Could not find profile edit — check screenshots");
  }

  await page.waitForTimeout(2000);
  await screenshot(page, "02-menu");

  // Upload photo via file chooser
  const uploadSels = [
    'text="Upload photo"', 'text="Upload Photo"',
    'text="อัปโหลดรูปภาพ"', 'text="อัพโหลดรูปภาพ"',
    '[role="menuitem"]:has-text("Upload")',
    '[role="menuitem"]:has-text("อัปโหลด")',
  ];

  let uploaded = false;
  for (const sel of uploadSels) {
    const el = await page.$(sel);
    if (el) {
      const [fc] = await Promise.all([
        page.waitForEvent("filechooser", { timeout: 5000 }).catch(() => null),
        el.click(),
      ]);
      if (fc) {
        await fc.setFiles(imagePath);
        uploaded = true;
        console.log(`  ✅ File selected`);
      }
      break;
    }
  }

  if (!uploaded) {
    const fi = await page.$('input[type="file"]');
    if (fi) {
      await fi.setInputFiles(imagePath);
      uploaded = true;
      console.log("  ✅ File via input[type=file]");
    }
  }

  if (!uploaded) {
    await screenshot(page, "02b-no-upload");
    console.log("  ❌ Upload failed");
    return false;
  }

  await page.waitForTimeout(5000);
  await screenshot(page, "03-preview");

  const saved = await tryClick(page, [
    'div[role="button"]:has-text("Save")',
    'div[role="button"]:has-text("บันทึก")',
    '[aria-label="Save"]', '[aria-label="บันทึก"]',
  ], "save");

  if (saved) {
    await page.waitForTimeout(8000);
    await screenshot(page, "04-done");
    console.log("  ✅ Profile picture saved!");
    return true;
  }

  await screenshot(page, "03b-no-save");
  return false;
}

async function setCoverPhoto(page: Page, imagePath: string): Promise<boolean> {
  console.log("\n=== Setting Cover Photo ===");
  console.log(`  Image: ${imagePath}`);
  await page.goto(PAGE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);
  await screenshot(page, "10-page");

  const editClicked = await tryClick(page, [
    'text="Edit cover photo"', 'text="แก้ไขรูปปก"',
    'text="Add cover photo"', 'text="เพิ่มรูปปก"',
    '[aria-label="Edit cover photo"]', '[aria-label="แก้ไขรูปปก"]',
    '[aria-label="Add Cover Photo"]', '[aria-label="เพิ่มรูปปก"]',
  ], "cover edit");

  if (!editClicked) {
    await screenshot(page, "10b-no-edit");
    console.log("  ❌ Cover edit not found");
    return false;
  }

  await page.waitForTimeout(2000);
  await screenshot(page, "11-menu");

  const uploadSels = [
    'text="Upload photo"', 'text="Upload Photo"',
    'text="อัปโหลดรูปภาพ"',
    '[role="menuitem"]:has-text("Upload")',
    '[role="menuitem"]:has-text("อัปโหลด")',
  ];

  let uploaded = false;
  for (const sel of uploadSels) {
    const el = await page.$(sel);
    if (el) {
      const [fc] = await Promise.all([
        page.waitForEvent("filechooser", { timeout: 5000 }).catch(() => null),
        el.click(),
      ]);
      if (fc) {
        await fc.setFiles(imagePath);
        uploaded = true;
        console.log(`  ✅ File selected`);
      }
      break;
    }
  }

  if (!uploaded) {
    const fi = await page.$('input[type="file"]');
    if (fi) {
      await fi.setInputFiles(imagePath);
      uploaded = true;
    }
  }

  if (!uploaded) {
    await screenshot(page, "11b-no-upload");
    console.log("  ❌ Upload failed");
    return false;
  }

  await page.waitForTimeout(5000);
  await screenshot(page, "12-preview");

  const saved = await tryClick(page, [
    'div[role="button"]:has-text("Save changes")',
    'div[role="button"]:has-text("บันทึกการเปลี่ยนแปลง")',
    'div[role="button"]:has-text("Save")',
    'div[role="button"]:has-text("บันทึก")',
  ], "save");

  if (saved) {
    await page.waitForTimeout(8000);
    await screenshot(page, "13-done");
    console.log("  ✅ Cover photo saved!");
    return true;
  }

  await screenshot(page, "12b-no-save");
  return false;
}

// ============================
// Main CLI
// ============================

async function main() {
  await ensureDirs();

  const cmd = process.argv[2];
  if (!cmd) {
    console.log(`fb-page-manager — จัดการ Facebook Page (${PAGE_ID})

Commands:
  set-profile <image>          Set profile picture
  set-cover <image>            Set cover photo
  set-both <profile> <cover>   Set both at once
  token-gen                    Open Graph API Explorer to generate token
  login                        Force re-login and save session

Session state: ${STATE_FILE}
Screenshots: ${SCREENSHOTS}/`);
    process.exit(0);
  }

  // Force login
  if (cmd === "login") {
    const browser = await chromium.launch({ headless: false, slowMo: 300, channel: "chrome" });
    const context = await browser.newContext();
    const page = await context.newPage();
    const ok = await login(page);
    if (ok) {
      await context.storageState({ path: STATE_FILE });
      console.log(`💾 Session saved → ${STATE_FILE}`);
    }
    await browser.close();
    process.exit(ok ? 0 : 1);
  }

  // Token gen — go to Graph API Explorer, add permissions, generate token
  if (cmd === "token-gen") {
    const { context, page, isNew } = await getBrowser();
    if (!(await ensureLoggedIn(context, page, isNew))) {
      await context.browser()?.close();
      process.exit(1);
    }
    console.log("\n📋 Opening Graph API Explorer...");
    await page.goto("https://developers.facebook.com/tools/explorer/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(8000);
    await screenshot(page, "token-01-explorer");

    // Select app Mamipogo if needed
    console.log("  Looking for app selector...");
    await screenshot(page, "token-02-ready");

    // Add pages_manage_metadata permission
    console.log("  Adding pages_manage_metadata...");

    // Click "เพิ่มสิทธิ์การอนุญาต" input field
    const addPermField = await page.$('input[placeholder*="เพิ่มสิทธิ์"]')
      || await page.$('text="เพิ่มสิทธิ์การอนุญาต"')
      || await page.$('input[placeholder*="Add a Permission"]');

    if (addPermField) {
      await addPermField.click();
      await page.waitForTimeout(1000);
      await page.keyboard.type("pages_manage_metadata");
      await page.waitForTimeout(2000);
      await screenshot(page, "token-03-search");

      // Click the result
      const permOption = await page.$('text="pages_manage_metadata"')
        || await page.$('[role="option"]:has-text("pages_manage_metadata")');
      if (permOption) {
        await permOption.click();
        console.log("  ✅ Added pages_manage_metadata");
        await page.waitForTimeout(1000);
      } else {
        console.log("  ⚠️ Permission option not found in dropdown");
        await screenshot(page, "token-03b-no-option");
      }
    } else {
      console.log("  ⚠️ Permission field not found — trying click by position");
      // The "เพิ่มสิทธิ์การอนุญาต" field is visible at bottom of permissions list
      await page.mouse.click(1050, 594);
      await page.waitForTimeout(1000);
      await page.keyboard.type("pages_manage_metadata");
      await page.waitForTimeout(2000);
      await screenshot(page, "token-03-typed");
      // Press Enter or click result
      await page.keyboard.press("Enter");
      await page.waitForTimeout(1000);
    }

    await screenshot(page, "token-04-before-generate");

    // Click Generate Access Token
    const genClicked = await tryClick(page, [
      'text="Generate Access Token"',
      'button:has-text("Generate")',
      'text="สร้างโทเค็นการเข้าถึง"',
    ], "generate token");

    if (genClicked) {
      console.log("  ✅ Generate clicked — waiting for OAuth popup...");
      await page.waitForTimeout(10000);

      // Handle OAuth popup if it appears
      const pages = context.pages();
      if (pages.length > 1) {
        const popup = pages[pages.length - 1];
        console.log("  OAuth popup detected — clicking Continue...");
        await popup.waitForTimeout(3000);
        const continueClicked = await tryClick(popup, [
          'text="Continue"', 'text="ดำเนินการต่อ"',
          'button:has-text("Continue")', 'button:has-text("ดำเนินการต่อ")',
          '[name="__CONFIRM__"]',
        ], "continue");
        if (continueClicked) {
          await popup.waitForTimeout(5000);
        }
      }

      await page.waitForTimeout(5000);
      await screenshot(page, "token-05-after-generate");

      // Try to extract the token from the text field
      const tokenField = await page.$('input[aria-label*="Access Token"], textarea, input[value*="EAA"]');
      if (tokenField) {
        const token = await tokenField.inputValue();
        if (token && token.startsWith("EAA")) {
          console.log(`  ✅ Got token: ${token.substring(0, 30)}...`);
          console.log(`\n  Token (full):\n  ${token}`);
        }
      }
    }

    console.log("\n  Browser stays open 60s — verify and copy token if needed");
    await page.waitForTimeout(60000);
    await context.browser()?.close();
    process.exit(0);
  }

  // Set profile
  if (cmd === "set-profile") {
    const img = process.argv[3];
    if (!img) { console.log("Usage: set-profile <image-path>"); process.exit(1); }
    const imgPath = path.resolve(img);

    const { context, page, isNew } = await getBrowser();
    if (!(await ensureLoggedIn(context, page, isNew))) {
      await context.browser()?.close();
      process.exit(1);
    }
    const ok = await setProfilePic(page, imgPath);
    await context.browser()?.close();
    process.exit(ok ? 0 : 1);
  }

  // Set cover
  if (cmd === "set-cover") {
    const img = process.argv[3];
    if (!img) { console.log("Usage: set-cover <image-path>"); process.exit(1); }
    const imgPath = path.resolve(img);

    const { context, page, isNew } = await getBrowser();
    if (!(await ensureLoggedIn(context, page, isNew))) {
      await context.browser()?.close();
      process.exit(1);
    }
    const ok = await setCoverPhoto(page, imgPath);
    await context.browser()?.close();
    process.exit(ok ? 0 : 1);
  }

  // Set both
  if (cmd === "set-both") {
    const profileImg = process.argv[3];
    const coverImg = process.argv[4];
    if (!profileImg || !coverImg) {
      console.log("Usage: set-both <profile-image> <cover-image>");
      process.exit(1);
    }

    const { context, page, isNew } = await getBrowser();
    if (!(await ensureLoggedIn(context, page, isNew))) {
      await context.browser()?.close();
      process.exit(1);
    }
    const r1 = await setProfilePic(page, path.resolve(profileImg));
    const r2 = await setCoverPhoto(page, path.resolve(coverImg));

    console.log(`\n=== RESULTS ===`);
    console.log(`Profile: ${r1 ? "✅" : "❌"}`);
    console.log(`Cover:   ${r2 ? "✅" : "❌"}`);

    await context.browser()?.close();
    process.exit(r1 && r2 ? 0 : 1);
  }

  console.log(`❌ Unknown command: ${cmd}`);
  process.exit(1);
}

main().catch(console.error);
