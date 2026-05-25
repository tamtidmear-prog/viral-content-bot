// ============================
// logger.ts — ส่วนบันทึกผลลัพธ์
// หน้าที่: สร้าง output folder + เขียนไฟล์ output แยกเป็นส่วนๆ ทุก step
// ทำให้ดูย้อนหลังได้ว่าแต่ละครั้งทำอะไรไปบ้าง
// ============================

import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// ============================
// ส่วนที่ 1: สร้าง output folder
// ชื่อ folder = วันที่_หัวข้อ เช่น 2026-05-25_gaming
// สร้างใน ./output/
// ============================

export function createOutputDir(topic: string, baseDir: string = "./output"): string {
  const date = new Date().toISOString().split("T")[0]; // 2026-05-25
  const safeTopic = topic
    .replace(/[^a-zA-Z0-9ก-๙]/g, "_") // แปลงอักขระพิเศษเป็น _
    .replace(/_+/g, "_") // ลด _ ซ้ำ
    .slice(0, 50); // จำกัดความยาว

  const dirName = `${date}_${safeTopic}`;
  const fullPath = join(baseDir, dirName);

  mkdirSync(fullPath, { recursive: true });
  return fullPath;
}

// ============================
// ส่วนที่ 2: บันทึก output แต่ละ step แยกไฟล์
// brief.json     → ผลวิเคราะห์หัวข้อ (step 1)
// caption.txt    → caption ที่สร้าง (step 2)
// hashtags.txt   → hashtag list (step 2)
// image-prompt.txt → prompt ที่ใช้วาดรูป (step 2)
// post-result.json → ผลโพส social (step 4)
// full-log.json  → รวมทุกอย่าง (step 5)
// ============================

export function saveBrief(outputDir: string, brief: any): void {
  writeFileSync(join(outputDir, "brief.json"), JSON.stringify(brief, null, 2), "utf-8");
}

export function saveCaption(outputDir: string, caption: string): void {
  writeFileSync(join(outputDir, "caption.txt"), caption, "utf-8");
}

export function saveHashtags(outputDir: string, hashtags: string[]): void {
  writeFileSync(join(outputDir, "hashtags.txt"), hashtags.join("\n"), "utf-8");
}

export function saveImagePrompt(outputDir: string, prompt: string): void {
  writeFileSync(join(outputDir, "image-prompt.txt"), prompt, "utf-8");
}

export function savePostResult(outputDir: string, result: any): void {
  writeFileSync(join(outputDir, "post-result.json"), JSON.stringify(result, null, 2), "utf-8");
}

// ============================
// ส่วนที่ 3: บันทึก full log — รวมทุก step ในไฟล์เดียว
// ใช้ดูย้อนหลังว่าครั้งนี้ทำอะไรไปบ้าง ผลลัพธ์เป็นอย่างไร
// ============================

export function saveFullLog(outputDir: string, log: any): void {
  const fullLog = {
    ...log,
    timestamp: new Date().toISOString(),
  };
  writeFileSync(join(outputDir, "full-log.json"), JSON.stringify(fullLog, null, 2), "utf-8");
}
