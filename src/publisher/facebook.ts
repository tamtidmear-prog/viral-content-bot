// ============================
// publisher/facebook.ts — ส่วนโพส Facebook
// หน้าที่: รับ caption + รูป → โพสขึ้น Facebook Page อัตโนมัติ
// input: caption (string), imagePath (string | null)
// output: { success, postId, postUrl }
// ============================

import { readFileSync } from "fs";
import { join } from "path";
import { isDryRun, dryRunResult } from "./types";

// ============================
// ส่วนที่ 1: โหลด Facebook config
// อ่าน page_id + access_token จาก config/platforms.json
// ============================

interface FBConfig {
  enabled: boolean;
  page_id: string;
  access_token: string;
  api_version: string;
}

function loadFBConfig(): FBConfig {
  const platforms = JSON.parse(
    readFileSync(join(__dirname, "../../config/platforms.json"), "utf-8")
  );
  return platforms.facebook;
}

// ============================
// ส่วนที่ 2: โพสข้อความ + รูป ขึ้น Facebook Page
// ถ้ามีรูป → ใช้ photos endpoint (โพสรูป + caption)
// ถ้าไม่มีรูป → ใช้ feed endpoint (โพสข้อความอย่างเดียว)
// ============================

export interface PostResult {
  success: boolean;
  postId: string;
  postUrl: string;
  error?: string;
}

export async function postToFacebook(
  caption: string,
  hashtags: string[],
  imagePath: string | null
): Promise<PostResult> {
  const config = loadFBConfig();

  // --- เช็คว่า Facebook enabled ไหม ---
  if (!config.enabled) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: "Facebook ยังไม่ได้ enable — ใส่ access_token ใน config/platforms.json แล้วเปลี่ยน enabled เป็น true",
    };
  }

  if (!config.access_token || !config.page_id) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: "ขาด page_id หรือ access_token ใน config/platforms.json",
    };
  }

  // --- รวม caption + hashtags ---
  const fullCaption = `${caption}\n\n${hashtags.join(" ")}`;

  // --- DRY_RUN: validate + payload เสร็จแล้ว หยุดก่อนยิง API จริง ---
  if (isDryRun()) {
    return dryRunResult("facebook", fullCaption.slice(0, 80));
  }

  const baseUrl = `https://graph.facebook.com/${config.api_version}/${config.page_id}`;

  try {
    let response: Response;
    let data: any;

    if (imagePath && imagePath.endsWith(".png")) {
      // --- โพสแบบมีรูป: ใช้ photos endpoint ---
      const imageBuffer = readFileSync(imagePath);
      const formData = new FormData();
      formData.append("source", new Blob([imageBuffer], { type: "image/png" }), "image.png");
      formData.append("message", fullCaption);
      formData.append("access_token", config.access_token);

      response = await fetch(`${baseUrl}/photos`, {
        method: "POST",
        body: formData,
      });
    } else {
      // --- โพสแบบไม่มีรูป: ใช้ feed endpoint ---
      response = await fetch(`${baseUrl}/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: fullCaption,
          access_token: config.access_token,
        }),
      });
    }

    data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        postId: "",
        postUrl: "",
        error: `Facebook API error ${response.status}: ${JSON.stringify(data?.error?.message ?? data)}`,
      };
    }

    // --- สร้าง post URL จาก ID ---
    const postId = data.id ?? data.post_id ?? "";
    const postUrl = postId ? `https://facebook.com/${postId}` : "";

    return { success: true, postId, postUrl };
  } catch (err: any) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `Network error: ${err.message}`,
    };
  }
}
