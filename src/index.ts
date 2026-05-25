// ============================
// index.ts — จุดเริ่มต้นของทุกอย่าง (CLI Entry Point)
// วิธีใช้: bun run src/index.ts "หัวข้อที่ต้องการ"
// ตัวอย่าง: bun run src/index.ts "โพส content เกี่ยวกับเกมส์"
//
// Flow ทั้งหมด:
//   Step 1: AI วิเคราะห์หัวข้อ → brief.json
//   Step 2: AI สร้าง caption + hashtag → caption.txt, hashtags.txt
//   Step 3: AI สร้างรูป → image.png
//   Step 4: โพสขึ้น social media → post-result.json
//   Step 5: บันทึก full log → full-log.json
// ============================

import { generateContent } from "./brain";
import { generateImage } from "./image";
import { publishToAll } from "./publisher";
import {
  createOutputDir,
  saveBrief,
  saveCaption,
  saveHashtags,
  saveImagePrompt,
  savePostResult,
  saveFullLog,
} from "./logger";
import { join } from "path";

// ============================
// ส่วนที่ 1: อ่าน argument จาก command line
// ผู้ใช้พิมพ์: bun run src/index.ts "เกมส์"
// ระบบจะเอาคำว่า "เกมส์" มาเป็นหัวข้อ
// ============================

async function main() {
  const topic = process.argv[2];

  if (!topic) {
    console.log("============================");
    console.log("Viral Content Bot — สร้าง content + โพส social อัตโนมัติ");
    console.log("============================");
    console.log("");
    console.log("วิธีใช้:");
    console.log('  bun run src/index.ts "หัวข้อที่ต้องการ"');
    console.log("");
    console.log("ตัวอย่าง:");
    console.log('  bun run src/index.ts "โพส content เกี่ยวกับเกมส์"');
    console.log('  bun run src/index.ts "ทำคลิปเรื่องออมเงิน"');
    console.log('  bun run src/index.ts "ไลฟ์สไตล์คนเมือง"');
    console.log("");
    process.exit(1);
  }

  const startTime = Date.now();
  console.log("============================");
  console.log(`Viral Content Bot — เริ่มทำงาน`);
  console.log(`หัวข้อ: "${topic}"`);
  console.log("============================\n");

  // ============================
  // ส่วนที่ 2: สร้าง output folder
  // สร้าง folder ชื่อ วันที่_หัวข้อ ใน ./output/
  // ทุก step จะบันทึกผลลงใน folder นี้
  // ============================

  const outputDir = createOutputDir(topic);
  console.log(`[Output] สร้าง folder → ${outputDir}\n`);

  // ============================
  // ส่วนที่ 3 (Step 1+2): AI วิเคราะห์หัวข้อ + สร้าง content
  // ส่งหัวข้อไป Claude → ได้ brief, caption, hashtags, image prompt กลับมา
  // บันทึกผลแต่ละส่วนเป็นไฟล์แยก
  // ============================

  console.log("[Step 1] กำลังวิเคราะห์หัวข้อ + สร้าง content...");
  const content = await generateContent(topic);

  saveBrief(outputDir, content.brief);
  console.log(`  → brief.json (type: ${content.brief.content_type}, template: ${content.brief.template_used ?? "none"})`);

  saveCaption(outputDir, content.caption);
  console.log(`  → caption.txt`);

  saveHashtags(outputDir, content.hashtags);
  console.log(`  → hashtags.txt (${content.hashtags.length} tags)`);

  saveImagePrompt(outputDir, content.imagePrompt);
  console.log(`  → image-prompt.txt\n`);

  // --- แสดง preview caption ---
  console.log("  --- Caption Preview ---");
  console.log(`  ${content.caption}`);
  console.log(`  ${content.hashtags.join(" ")}`);
  console.log("  -----------------------\n");

  // ============================
  // ส่วนที่ 4 (Step 3): AI สร้างรูปภาพ
  // เอา image prompt → ส่งให้ AI วาดรูป → บันทึกเป็นไฟล์
  // ถ้า AI สร้างไม่ได้ → ใช้ placeholder แทน (ระบบยังทำงานต่อได้)
  // ============================

  console.log("[Step 3] กำลังสร้างรูปภาพ...");
  const imagePath = join(outputDir, "image.png");
  const imageResult = await generateImage(content.imagePrompt, imagePath);
  console.log(`  → ${imageResult.type === "generated" ? "image.png" : "image-placeholder.txt"}\n`);

  // ============================
  // ส่วนที่ 5 (Step 4): โพสขึ้น Social Media
  // เอา caption + รูป → โพสไปทุก platform ที่ enabled ใน config
  // ถ้าไม่มี platform ไหน enabled → ข้ามขั้นนี้ (ดู output ใน folder ได้)
  // ============================

  console.log("[Step 4] กำลังโพส Social Media...");
  const actualImagePath = imageResult.type === "generated" ? imageResult.path : null;
  const publishResults = await publishToAll(content.caption, content.hashtags, actualImagePath);

  if (Object.keys(publishResults).length > 0) {
    savePostResult(outputDir, publishResults);
    console.log(`  → post-result.json\n`);
  } else {
    console.log(`  → ข้ามโพส (ไม่มี platform enabled)\n`);
  }

  // ============================
  // ส่วนที่ 6 (Step 5): บันทึก full log
  // รวมทุก step ในไฟล์เดียว ใช้ดูย้อนหลัง
  // ============================

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  const fullLog = {
    topic,
    brief: content.brief,
    caption: content.caption,
    hashtags: content.hashtags,
    imagePrompt: content.imagePrompt,
    imageResult: { type: imageResult.type, path: imageResult.path },
    publishResults,
    elapsed_seconds: parseFloat(elapsed),
  };

  saveFullLog(outputDir, fullLog);

  // ============================
  // ส่วนที่ 7: แสดงผลสรุป
  // บอกว่าทำอะไรไปบ้าง ใช้เวลาเท่าไหร่ ไฟล์อยู่ที่ไหน
  // ============================

  console.log("============================");
  console.log("สำเร็จ!");
  console.log(`  เวลาที่ใช้: ${elapsed} วินาที`);
  console.log(`  Output: ${outputDir}/`);
  console.log("  ไฟล์ทั้งหมด:");
  console.log("    - brief.json        (ผลวิเคราะห์หัวข้อ)");
  console.log("    - caption.txt       (caption ที่สร้าง)");
  console.log("    - hashtags.txt      (hashtag list)");
  console.log("    - image-prompt.txt  (prompt วาดรูป)");
  if (imageResult.type === "generated") {
    console.log("    - image.png         (รูปที่ AI สร้าง)");
  } else {
    console.log("    - image-placeholder (รอใส่รูปเอง)");
  }
  if (Object.keys(publishResults).length > 0) {
    console.log("    - post-result.json  (ผลโพส social)");
    for (const [platform, result] of Object.entries(publishResults)) {
      if (result.success) {
        console.log(`    ✅ ${platform}: ${result.postUrl}`);
      } else {
        console.log(`    ❌ ${platform}: ${result.error}`);
      }
    }
  }
  console.log("    - full-log.json     (log รวมทั้งหมด)");
  console.log("============================");
}

// --- เริ่มทำงาน ---
main().catch((err) => {
  console.error("[Fatal Error]", err.message);
  process.exit(1);
});
