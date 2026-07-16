// ============================
// publisher/youtube.ts — ส่วนโพส YouTube (Phase 3 — โครงพร้อม รอ creds/audit)
// หน้าที่: ตอนนี้ทำได้แค่ validate config + DRY_RUN — โพสจริงยังทำไม่ได้
//
// ⚠️ ทำไมยังโพสจริงไม่ได้:
// YouTube Data API v3 `videos.insert` รับได้แค่ "วิดีโอไฟล์" เท่านั้น (ไม่ใช่รูปภาพ)
// ต้องมี OAuth2 flow เต็มรูปแบบ (refresh_token ผูกกับ channel เจ้าของจริง) และ
// pipeline นี้ (viral-content-bot) สร้างได้แค่ caption + รูป ไม่มีวิดีโอไฟล์ให้อัป
// ส่วน "Community post" (โพสข้อความ/รูปแบบ community tab) ไม่มี public API รองรับเลย
// (Google ไม่เปิด endpoint ให้ third-party สร้าง community post ผ่าน API)
// ยังไม่มี OAuth token จริง + ไม่มีวิดีโอไฟล์ → ไม่ยิง fetch ไปจริง คืน success:false เสมอ
// ============================

import { loadPlatformConfig, isDryRun, dryRunResult, fitToLimit } from "./types";
import type { PostResult } from "./types";

// ============================
// ส่วนที่ 1: Config
// ============================

interface YouTubeConfig {
  enabled: boolean;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

const YOUTUBE_CONFIG_EXAMPLE = `{
  "youtube": {
    "enabled": true,
    "client_id": "YOUR_GOOGLE_OAUTH_CLIENT_ID",
    "client_secret": "YOUR_GOOGLE_OAUTH_CLIENT_SECRET",
    "refresh_token": "YOUR_GOOGLE_OAUTH_REFRESH_TOKEN",
    "_comment": "Phase 3 — Data API v3 videos.insert ต้องการวิดีโอไฟล์ ไม่ใช่รูป"
  }
}`;

const CAPTION_LIMIT = 5000; // YouTube description limit

export async function postToYouTube(
  caption: string,
  hashtags: string[],
  imagePath: string | null,
  configOverride?: YouTubeConfig
): Promise<PostResult> {
  const config = configOverride ?? loadPlatformConfig<YouTubeConfig>("youtube");

  if (!config) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `ยังไม่มี config "youtube" ใน config/platforms.json — เพิ่ม block นี้:\n${YOUTUBE_CONFIG_EXAMPLE}`,
    };
  }

  if (!config.enabled) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `YouTube ยังไม่ได้ enable — ใส่ค่าให้ครบแล้วเปลี่ยน "enabled" เป็น true ใน config/platforms.json:\n${YOUTUBE_CONFIG_EXAMPLE}`,
    };
  }

  if (!config.client_id || !config.client_secret || !config.refresh_token) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `ขาด client_id/client_secret/refresh_token ใน config/platforms.json → ต้องมี block "youtube" แบบนี้:\n${YOUTUBE_CONFIG_EXAMPLE}`,
    };
  }

  const fullCaption = fitToLimit(caption, hashtags, CAPTION_LIMIT);

  // --- DRY_RUN: validate ผ่านหมดแล้ว → ทดสอบ pipeline ได้โดยไม่ยิง API จริง ---
  if (isDryRun()) {
    return dryRunResult(
      "youtube",
      `caption="${fullCaption.slice(0, 80)}${fullCaption.length > 80 ? "…" : ""}", imagePath=${imagePath ?? "null"}`
    );
  }

  // --- ยังโพสจริงไม่ได้ — Phase 3: โครงพร้อม รอ creds/audit ---
  return {
    success: false,
    postId: "",
    postUrl: "",
    error:
      "YouTube Data API v3 (videos.insert) ยังใช้งานจริงไม่ได้ — ต้องมี OAuth2 (refresh_token ผูกกับ channel จริง) " +
      "และที่สำคัญ videos.insert รับได้แค่ไฟล์วิดีโอเท่านั้น ไม่ใช่รูปภาพ (pipeline นี้มีแค่ caption + รูป ไม่มีวิดีโอ) " +
      "ส่วน Community post ไม่มี public API ให้ third-party โพสเลย " +
      "[Phase 3 — โครงพร้อม รอ creds/audit]",
  };
}
