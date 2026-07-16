// ============================
// publisher/index.ts — registry + ตัวเลือก platform
// หน้าที่: อ่าน config ว่า platform ไหน enabled → เรียก publisher ตัวที่ถูกต้อง
// เพิ่ม platform ใหม่ → สร้างไฟล์ใน publisher/ ตาม PublisherFn + เพิ่มใน PUBLISHERS ด้านล่าง
// ============================

import { postToFacebook } from "./facebook";
import { postToX } from "./x";
import { postToLine } from "./line";
import { postToDiscord } from "./discord";
import { postToInstagram } from "./instagram";
import { postToTikTok } from "./tiktok";
import { postToYouTube } from "./youtube";
import type { PostResult, PublisherFn } from "./types";
import { readFileSync } from "fs";
import { join } from "path";

export type { PostResult } from "./types";

// ============================
// ส่วนที่ 1: Publisher Registry
// ชื่อ platform ใน config/platforms.json → ฟังก์ชันโพส
// ============================

const PUBLISHERS: Record<string, PublisherFn> = {
  facebook: postToFacebook,
  x: postToX,
  line: postToLine,
  discord: postToDiscord,
  instagram: postToInstagram,
  tiktok: postToTikTok,
  youtube: postToYouTube,
};

// ============================
// ส่วนที่ 2: โหลด platforms config
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
// ส่วนที่ 3: โพสไปทุก platform ที่ enabled
// วน registry → ถ้า enabled → เรียก publisher ของตัวนั้น
// platform ล้มตัวหนึ่งไม่ทำให้ตัวอื่นหยุด — เก็บ error ลงผลลัพธ์แทน
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

  for (const [name, publish] of Object.entries(PUBLISHERS)) {
    if (!platforms[name]?.enabled) continue;

    console.log(`[Publish] กำลังโพส ${name}...`);
    try {
      results[name] = await publish(caption, hashtags, imagePath);
    } catch (err: any) {
      // --- publisher โยน exception = bug ใน publisher — ห้ามล้มทั้ง pipeline ---
      results[name] = {
        success: false,
        postId: "",
        postUrl: "",
        error: `Unexpected error: ${err.message}`,
      };
    }

    if (results[name].success) {
      console.log(`[Publish] ${name} สำเร็จ → ${results[name].postUrl || results[name].postId}`);
    } else {
      console.warn(`[Publish] ${name} ล้มเหลว: ${results[name].error}`);
    }
  }

  // --- platform ที่ enabled ใน config แต่ไม่มีใน registry ---
  for (const name of Object.keys(platforms)) {
    if ((platforms[name] as any)?.enabled && !PUBLISHERS[name]) {
      results[name] = {
        success: false,
        postId: "",
        postUrl: "",
        error: `ไม่รู้จัก platform "${name}" — ดูรายชื่อที่รองรับใน src/publisher/index.ts`,
      };
      console.warn(`[Publish] ${name} ล้มเหลว: ${results[name].error}`);
    }
  }

  // --- ไม่มี platform ไหน enabled เลย ---
  if (Object.keys(results).length === 0) {
    console.log("[Publish] ไม่มี platform ไหน enabled — ข้าม posting (ดู output ได้ใน output/ folder)");
  }

  return results;
}
