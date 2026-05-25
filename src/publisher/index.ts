// ============================
// publisher/index.ts — ตัวเลือก platform
// หน้าที่: รับชื่อ platform → เรียก publisher ตัวที่ถูกต้อง
// ถ้า platform ยัง enable ไม่ได้ → บอกว่ายังไม่พร้อม
// เพิ่ม platform ใหม่ → เพิ่ม case ที่นี่ + สร้างไฟล์ใหม่ใน publisher/
// ============================

import { postToFacebook, type PostResult } from "./facebook";
import { readFileSync } from "fs";
import { join } from "path";

// ============================
// ส่วนที่ 1: โหลด platforms config
// อ่านว่า platform ไหน enabled บ้าง
// ============================

function loadPlatforms(): Record<string, { enabled: boolean }> {
  try {
    return JSON.parse(
      readFileSync(join(__dirname, "../../config/platforms.json"), "utf-8")
    );
  } catch {
    // --- ถ้าไม่มีไฟล์ config → ถือว่าไม่มี platform ไหน enabled ---
    return {};
  }
}

// ============================
// ส่วนที่ 2: โพสไปทุก platform ที่ enabled
// วน loop ทุก platform → ถ้า enabled → เรียก publisher ของตัวนั้น
// return ผลลัพธ์ทุก platform รวมกัน
// ============================

export interface PublishResults {
  [platform: string]: PostResult;
}

export async function publishToAll(
  caption: string,
  hashtags: string[],
  imagePath: string | null
): Promise<PublishResults> {
  const platforms = loadPlatforms();
  const results: PublishResults = {};

  // --- Facebook ---
  if (platforms.facebook?.enabled) {
    console.log("[Publish] กำลังโพส Facebook...");
    results.facebook = await postToFacebook(caption, hashtags, imagePath);
    if (results.facebook.success) {
      console.log(`[Publish] Facebook สำเร็จ → ${results.facebook.postUrl}`);
    } else {
      console.warn(`[Publish] Facebook ล้มเหลว: ${results.facebook.error}`);
    }
  }

  // --- X (Twitter) — Phase 2 ---
  if (platforms.x?.enabled) {
    console.log("[Publish] X (Twitter) — ยังไม่ได้ implement (Phase 2)");
    results.x = { success: false, postId: "", postUrl: "", error: "Phase 2 — ยังไม่ได้ implement" };
  }

  // --- LINE OA — Phase 2 ---
  if (platforms.line?.enabled) {
    console.log("[Publish] LINE OA — ยังไม่ได้ implement (Phase 2)");
    results.line = { success: false, postId: "", postUrl: "", error: "Phase 2 — ยังไม่ได้ implement" };
  }

  // --- ไม่มี platform ไหน enabled เลย ---
  if (Object.keys(results).length === 0) {
    console.log("[Publish] ไม่มี platform ไหน enabled — ข้าม posting (ดู output ได้ใน output/ folder)");
  }

  return results;
}
