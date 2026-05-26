/**
 * open-page-create.ts — เปิดหน้า /pages/create ค้างไว้ ให้ Master J กรอกเอง
 *
 * ข้อมูลที่ต้องกรอก:
 *   ชื่อเพจ:    AI ข้างกาย
 *   หมวดหมู่:   Personal blog (ส่วนตัว/บล็อก)
 *   คำอธิบาย:   พื้นที่แบ่งปันชีวิตที่มี AI เป็นคู่หู ไม่ใช่คู่แข่ง — เรียนรู้ ใช้งาน ลองผิดลองถูกไปด้วยกัน เพราะ AI ไม่ใช่อนาคต แต่อยู่ข้างกายเราแล้วทุกวัน
 */
import { chromium } from "playwright";
import { resolve } from "path";

const SESSION_PATH = resolve(import.meta.dir, "../.fb-session-jinjinrom/state.json");

async function main() {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext({ storageState: SESSION_PATH });
  const page = await context.newPage();

  console.log("→ เปิด /pages/create");
  await page.goto("https://www.facebook.com/pages/create/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  console.log("\n📝 Master J กรอกข้อมูล:");
  console.log("   ชื่อเพจ:    AI ข้างกาย");
  console.log("   หมวดหมู่:   Personal blog (พิมพ์แล้วเลือกตัวเลือกแรก)");
  console.log("   คำอธิบาย:   พื้นที่แบ่งปันชีวิตที่มี AI เป็นคู่หู ไม่ใช่คู่แข่ง — เรียนรู้ ใช้งาน ลองผิดลองถูกไปด้วยกัน เพราะ AI ไม่ใช่อนาคต แต่อยู่ข้างกายเราแล้วทุกวัน");
  console.log("   → กด 'สร้างเพจ' → เพจจะเปิดขึ้น → URL จะเปลี่ยน");
  console.log("\n   Browser ค้างไว้ 5 นาที จะ save session อัตโนมัติทุก 20 วินาที");
  console.log("   เสร็จแล้วบอก Prism URL เพจ\n");

  const interval = setInterval(async () => {
    try {
      await context.storageState({ path: SESSION_PATH });
      const url = page.url();
      console.log(`  ⏱  ${new Date().toLocaleTimeString()} | URL: ${url}`);
    } catch {}
  }, 20000);

  await page.waitForTimeout(300000);
  clearInterval(interval);
  await context.storageState({ path: SESSION_PATH });
  await browser.close();
  console.log("=== DONE ===");
}

main().catch(console.error);
