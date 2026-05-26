/**
 * add-page-auth.ts — Re-authorize Mamipogo app to include Ai_In_Mind page
 * Flow: Graph API Explorer → Generate Token → OAuth popup → แก้ไขการตั้งค่า → เลือกเพจ → Get token
 */
import { chromium } from "playwright";
import { resolve } from "path";
import { mkdirSync, writeFileSync } from "fs";

const SESSION_PATH = resolve(import.meta.dir, "../.fb-session/state.json");
const SCREENSHOT_DIR = resolve(import.meta.dir, "../output/screenshots");

async function ss(page: any, name: string) {
  await page.screenshot({ path: `${SCREENSHOT_DIR}/${name}.png`, fullPage: true });
  console.log(`  [SS] ${name}.png`);
}

async function main() {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log("=== 1. Launch ===");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: SESSION_PATH });
  const page = await context.newPage();

  console.log("=== 2. Graph API Explorer ===");
  await page.goto("https://developers.facebook.com/tools/explorer/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(10000);

  console.log("=== 3. Click Generate Access Token ===");
  const genBtn = page.getByText("Generate Access Token", { exact: false });
  if (await genBtn.count() === 0) {
    console.log("ERROR: ไม่เจอปุ่ม Generate");
    await browser.close();
    return;
  }

  const popupPromise = context.waitForEvent("page", { timeout: 30000 }).catch(() => null);
  await genBtn.first().click();
  await page.waitForTimeout(3000);
  const popup = await popupPromise;

  if (!popup) {
    console.log("ERROR: ไม่มี popup");
    await ss(page, "err-no-popup");
    await browser.close();
    return;
  }

  console.log("=== 4. OAuth popup — click แก้ไขการตั้งค่า ===");
  await popup.waitForLoadState("domcontentloaded");
  await popup.waitForTimeout(5000);
  await ss(popup, "4a-popup");

  // กด "แก้ไขการตั้งค่า" (Edit Settings) แทน "ดำเนินการต่อ"
  const editBtn = popup.getByText("แก้ไขการตั้งค่า", { exact: false });
  const editBtnCount = await editBtn.count();
  console.log("  แก้ไขการตั้งค่า buttons:", editBtnCount);

  if (editBtnCount === 0) {
    // fallback: ลองหาแบบ English
    const editBtnEn = popup.getByText("Edit Settings", { exact: false });
    if (await editBtnEn.count() > 0) {
      await editBtnEn.first().click();
    } else {
      console.log("ERROR: ไม่เจอปุ่มแก้ไขการตั้งค่า");
      await browser.close();
      return;
    }
  } else {
    await editBtn.first().click();
  }

  console.log("  Clicked แก้ไขการตั้งค่า");
  await popup.waitForTimeout(5000);
  await ss(popup, "4b-edit-settings");

  console.log("=== 5. Select pages ===");
  // ดู content หลังกด edit
  const content = await popup.content();
  const hasAiInMind = content.includes("Ai_In_Mind") || content.includes("Ai In Mind");
  console.log("  Ai_In_Mind visible:", hasAiInMind);

  // หา checkboxes / toggle สำหรับเลือกเพจ
  const checkboxes = await popup.locator("input[type='checkbox']").all();
  console.log("  Checkboxes:", checkboxes.length);

  // ถ้ามี checkbox ติ๊กทุกอัน
  for (let i = 0; i < checkboxes.length; i++) {
    const cb = checkboxes[i];
    const isChecked = await cb.isChecked().catch(() => false);
    const label = await cb.evaluate((el: any) => {
      const parent = el.closest("label") || el.parentElement;
      return parent?.textContent?.trim() || "";
    }).catch(() => "");
    console.log(`  CB[${i}]: checked=${isChecked} label="${label.substring(0, 50)}"`);
    if (!isChecked) {
      await cb.check().catch(() => cb.click());
      console.log(`  → Checked CB[${i}]`);
    }
  }

  // หา role=switch หรือ toggle (FB อาจใช้ custom toggles)
  const toggles = await popup.locator("[role='switch'], [role='checkbox']").all();
  console.log("  Role switches/checkboxes:", toggles.length);
  for (let i = 0; i < toggles.length; i++) {
    const t = toggles[i];
    const ariaChecked = await t.getAttribute("aria-checked").catch(() => null);
    const label = await t.evaluate((el: any) => {
      const parent = el.closest("label") || el.parentElement;
      return parent?.textContent?.trim() || "";
    }).catch(() => "");
    console.log(`  Toggle[${i}]: aria-checked=${ariaChecked} "${label.substring(0, 50)}"`);
    if (ariaChecked === "false") {
      await t.click();
      console.log(`  → Enabled Toggle[${i}]`);
      await popup.waitForTimeout(500);
    }
  }

  await ss(popup, "5-pages-selected");

  // กด Save / Continue / ดำเนินการต่อ
  console.log("=== 6. Save & Continue ===");
  const saveBtn = popup.getByRole("button", { name: /save|continue|ดำเนินการ|บันทึก|ถัดไป/i });
  const saveBtnCount = await saveBtn.count();
  console.log("  Save/Continue buttons:", saveBtnCount);

  if (saveBtnCount > 0) {
    await saveBtn.first().click();
    console.log("  Clicked Save/Continue");
    await popup.waitForTimeout(5000);

    // อาจมีหน้ายืนยัน
    const confirmBtn = popup.getByRole("button", { name: /save|continue|done|ดำเนินการ|เสร็จ|ตกลง/i });
    if (await confirmBtn.count() > 0) {
      await confirmBtn.first().click();
      console.log("  Clicked Confirm");
      await popup.waitForTimeout(5000);
    }
  }

  await ss(popup, "6-after-save");

  // รอ popup ปิด + token ใหม่ใน explorer
  await page.waitForTimeout(8000);

  console.log("=== 7. Get token from Explorer ===");
  await ss(page, "7-final-explorer");

  // ดึง token จาก input fields ใน Graph API Explorer
  const allInputs = await page.locator("input[type='text']").all();
  for (let i = 0; i < allInputs.length; i++) {
    const val = await allInputs[i].inputValue().catch(() => "");
    if (val && val.length > 100) {
      console.log(`  Token found in input[${i}], length=${val.length}`);
      writeFileSync(resolve(SCREENSHOT_DIR, "../new-user-token.txt"), val);
      console.log("  Saved to output/new-user-token.txt");
      break;
    }
  }

  await context.storageState({ path: SESSION_PATH });
  console.log("  Session saved");
  await browser.close();
  console.log("=== DONE ===");
}

main().catch(console.error);
