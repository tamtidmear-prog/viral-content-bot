// ============================
// publisher/tiktok.ts — ส่วนโพส TikTok (Phase 3 — โครงพร้อม รอ creds/audit)
// หน้าที่: ตอนนี้ทำได้แค่ validate config + DRY_RUN — โพสจริงยังทำไม่ได้
//
// ⚠️ ทำไมยังโพสจริงไม่ได้:
// TikTok Content Posting API (direct-post) ต้องผ่าน "app audit" ของ TikTok ก่อน
// (แอปต้องถูก TikTok review อนุมัติ scope video.publish) + ต้องมี OAuth flow
// เต็มรูปแบบ (authorization code → access_token/refresh_token ผูกกับ user)
// เอกสาร: https://developers.tiktok.com/doc/content-posting-api-get-started
// ยังไม่มี audit + ไม่มี OAuth token จริง → ไม่ยิง fetch ไปจริง คืน success:false เสมอ
// ============================

import { loadPlatformConfig, isDryRun, dryRunResult, fitToLimit } from "./types";
import type { PostResult } from "./types";

// ============================
// ส่วนที่ 1: Config
// ============================

interface TikTokConfig {
  enabled: boolean;
  client_key: string;
  client_secret: string;
  access_token: string;
}

const TIKTOK_CONFIG_EXAMPLE = `{
  "tiktok": {
    "enabled": true,
    "client_key": "YOUR_TIKTOK_CLIENT_KEY",
    "client_secret": "YOUR_TIKTOK_CLIENT_SECRET",
    "access_token": "YOUR_TIKTOK_OAUTH_ACCESS_TOKEN",
    "_comment": "Phase 3 — Content Posting API ต้องผ่าน app audit ก่อนถึงโพสจริงได้"
  }
}`;

const CAPTION_LIMIT = 2200;

export async function postToTikTok(
  caption: string,
  hashtags: string[],
  imagePath: string | null,
  configOverride?: TikTokConfig
): Promise<PostResult> {
  const config = configOverride ?? loadPlatformConfig<TikTokConfig>("tiktok");

  if (!config) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `ยังไม่มี config "tiktok" ใน config/platforms.json — เพิ่ม block นี้:\n${TIKTOK_CONFIG_EXAMPLE}`,
    };
  }

  if (!config.enabled) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `TikTok ยังไม่ได้ enable — ใส่ค่าให้ครบแล้วเปลี่ยน "enabled" เป็น true ใน config/platforms.json:\n${TIKTOK_CONFIG_EXAMPLE}`,
    };
  }

  if (!config.client_key || !config.client_secret || !config.access_token) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `ขาด client_key/client_secret/access_token ใน config/platforms.json → ต้องมี block "tiktok" แบบนี้:\n${TIKTOK_CONFIG_EXAMPLE}`,
    };
  }

  const fullCaption = fitToLimit(caption, hashtags, CAPTION_LIMIT);

  // --- DRY_RUN: validate ผ่านหมดแล้ว → ทดสอบ pipeline ได้โดยไม่ยิง API จริง ---
  if (isDryRun()) {
    return dryRunResult(
      "tiktok",
      `caption="${fullCaption.slice(0, 80)}${fullCaption.length > 80 ? "…" : ""}", imagePath=${imagePath ?? "null"}`
    );
  }

  // --- ยังโพสจริงไม่ได้ — Phase 3: โครงพร้อม รอ creds/audit ---
  return {
    success: false,
    postId: "",
    postUrl: "",
    error:
      "TikTok Content Posting API (direct-post) ยังใช้งานจริงไม่ได้ — ต้องผ่าน TikTok app audit " +
      "(อนุมัติ scope video.publish) และต้องมี OAuth access_token ที่ผูกกับ user จริง (ตอนนี้เป็นแค่ค่า config เปล่า) " +
      "ดู setup guide: https://developers.tiktok.com/doc/content-posting-api-get-started " +
      "[Phase 3 — โครงพร้อม รอ creds/audit]",
  };
}
