// ============================
// publisher/line.ts — ส่วนโพส LINE Official Account
// หน้าที่: รับ caption + รูป → broadcast ข้อความไปหา follower ทุกคนของ LINE OA
// input: caption (string), imagePath (string | null)
// output: { success, postId, postUrl }
// ============================

import { isDryRun, dryRunResult, loadPlatformConfig, fitToLimit } from "./types";
import type { PostResult } from "./types";

// ============================
// ส่วนที่ 1: LINE config
// อ่าน enabled + channel_access_token จาก config/platforms.json → key "line"
// ============================

interface LineConfig {
  enabled: boolean;
  channel_access_token: string;
}

// LINE Messaging API text message limit ต่อ 1 message object
const LINE_TEXT_LIMIT = 5000;

export async function postToLine(
  caption: string,
  hashtags: string[],
  imagePath: string | null,
  configOverride?: LineConfig
): Promise<PostResult> {
  const config = configOverride ?? loadPlatformConfig<LineConfig>("line");

  // --- เช็คว่ามี config ไหม ---
  if (!config) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error:
        'ไม่พบ config LINE ใน config/platforms.json — เพิ่ม {"line": {"enabled": true, "channel_access_token": "YOUR_CHANNEL_ACCESS_TOKEN"}}',
    };
  }

  // --- เช็คว่า LINE enabled ไหม ---
  if (!config.enabled) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: "LINE ยังไม่ได้ enable — ใส่ channel_access_token ใน config/platforms.json แล้วเปลี่ยน enabled เป็น true",
    };
  }

  if (!config.channel_access_token) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: "ขาด channel_access_token ใน config/platforms.json (key: line.channel_access_token)",
    };
  }

  // --- รวม caption + hashtags แล้วตัดให้พอดี limit ของ LINE text message ---
  const text = fitToLimit(caption, hashtags, LINE_TEXT_LIMIT);

  // --- LINE image message ต้องการ originalContentUrl ที่เป็น public https URL เท่านั้น ---
  // imagePath ที่ได้มาเป็น local file path — อัปโหลดตรงไป LINE ไม่ได้ (LINE ไม่รับ multipart สำหรับ broadcast)
  // ต้องมี public hosting (เช่น อัป S3/CDN ก่อน) ถึงจะแนบรูปได้ — ตอนนี้ยังไม่มี ขั้นตอนนั้น จึงข้ามรูปแล้วโพสข้อความอย่างเดียว
  if (imagePath) {
    console.warn(
      `[LINE] ข้ามรูป "${imagePath}" — LINE broadcast ต้องการ originalContentUrl แบบ public https URL เท่านั้น (local path อัปโหลดตรงไม่ได้), โพสข้อความอย่างเดียวแทน`
    );
  }

  const payload = {
    messages: [{ type: "text", text }],
  };

  // --- DRY_RUN: ต้อง validate + สร้าง payload เสร็จก่อนถึงจุดนี้ ---
  if (isDryRun()) {
    return dryRunResult("line", JSON.stringify(payload));
  }

  try {
    const response = await fetch("https://api.line.me/v2/bot/message/broadcast", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.channel_access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errBody: any;
      try {
        errBody = await response.json();
      } catch {
        errBody = await response.text();
      }
      return {
        success: false,
        postId: "",
        postUrl: "",
        error: `LINE API error ${response.status}: ${JSON.stringify(errBody)}`,
      };
    }

    // --- LINE broadcast สำเร็จ = 200 กับ body ว่าง — ใช้ request id จาก header แทน post id ---
    const postId = response.headers.get("x-line-request-id") ?? "";

    return { success: true, postId, postUrl: "" };
  } catch (err: any) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `Network error: ${err.message}`,
    };
  }
}
