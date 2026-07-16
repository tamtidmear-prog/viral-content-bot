// ============================
// publisher/x.ts — ส่วนโพส X (Twitter) API v2
// หน้าที่: รับ caption + รูป → โพสขึ้น X ด้วย OAuth 1.0a
// input: caption (string), imagePath (string | null)
// output: { success, postId, postUrl }
// ============================

import { readFileSync } from "fs";
import { createHmac, randomBytes } from "crypto";
import { isDryRun, dryRunResult, loadPlatformConfig, fitToLimit } from "./types";
import type { PostResult } from "./types";

// ============================
// ส่วนที่ 1: X config
// ============================

export interface XConfig {
  enabled: boolean;
  api_key: string;
  api_secret: string;
  access_token: string;
  access_secret: string;
}

const REQUIRED_KEYS: (keyof XConfig)[] = [
  "api_key",
  "api_secret",
  "access_token",
  "access_secret",
];

// ============================
// ส่วนที่ 2: OAuth 1.0a HMAC-SHA1 signing
// RFC3986 percent-encoding → signature base string → Authorization header
// ============================

function percentEncode(str: string): string {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

export function buildOAuthHeader(
  method: string,
  url: string,
  config: XConfig,
  extraParams: Record<string, string> = {},
  nonce?: string,
  timestamp?: string
): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: config.api_key,
    oauth_nonce: nonce ?? randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp ?? Math.floor(Date.now() / 1000).toString(),
    oauth_token: config.access_token,
    oauth_version: "1.0",
  };

  // --- รวม oauth params + extra params (query/body) เพื่อสร้าง signature base string ---
  const allParams: Record<string, string> = { ...oauthParams, ...extraParams };

  const paramString = Object.entries(allParams)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, value]) => `${percentEncode(key)}=${percentEncode(value)}`)
    .join("&");

  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(paramString),
  ].join("&");

  const signingKey = `${percentEncode(config.api_secret)}&${percentEncode(
    config.access_secret
  )}`;

  const signature = createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  const headerParams: Record<string, string> = {
    ...oauthParams,
    oauth_signature: signature,
  };

  const headerString = Object.entries(headerParams)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, value]) => `${percentEncode(key)}="${percentEncode(value)}"`)
    .join(", ");

  return `OAuth ${headerString}`;
}

// ============================
// ส่วนที่ 3: อัปโหลดรูปผ่าน v1.1 media/upload (multipart, body ไม่รวมใน signature)
// ============================

async function uploadMedia(imagePath: string, config: XConfig): Promise<string> {
  const uploadUrl = "https://upload.twitter.com/1.1/media/upload.json";
  const authHeader = buildOAuthHeader("POST", uploadUrl, config);

  const imageBuffer = readFileSync(imagePath);
  const formData = new FormData();
  formData.append("media", new Blob([imageBuffer], { type: "image/png" }), "image.png");

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: { Authorization: authHeader },
    body: formData,
  });

  const data: any = await response.json();

  if (!response.ok) {
    throw new Error(
      `X media upload error ${response.status}: ${JSON.stringify(data?.errors ?? data)}`
    );
  }

  return data.media_id_string;
}

// ============================
// ส่วนที่ 4: โพส tweet
// ============================

export async function postToX(
  caption: string,
  hashtags: string[],
  imagePath: string | null,
  configOverride?: XConfig
): Promise<PostResult> {
  const config = configOverride ?? loadPlatformConfig<XConfig>("x");

  // --- เช็คว่ามี config ไหม ---
  if (!config) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: "ไม่พบ config x ใน config/platforms.json — เพิ่ม section \"x\" ก่อนใช้งาน",
    };
  }

  // --- เช็คว่า X enabled ไหม ---
  if (!config.enabled) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error:
        "X ยังไม่ได้ enable — ใส่ api_key, api_secret, access_token, access_secret ใน config/platforms.json แล้วเปลี่ยน enabled เป็น true",
    };
  }

  // --- เช็คว่า key ครบไหม ---
  const missingKeys = REQUIRED_KEYS.filter((key) => !config[key]);
  if (missingKeys.length > 0) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `ขาด ${missingKeys.join(", ")} ใน config/platforms.json — เติมค่าให้ครบก่อนโพส X`,
    };
  }

  // --- ตัดข้อความให้พอดี 280 ตัวอักษร ---
  const text = fitToLimit(caption, hashtags, 280);

  // --- DRY_RUN: ต้อง validate + สร้าง text เสร็จก่อน แล้วค่อยเช็ค ---
  if (isDryRun()) {
    return dryRunResult("x", text.slice(0, 80));
  }

  try {
    // --- อัปโหลดรูปก่อน (ถ้ามี) ---
    let mediaId: string | null = null;
    if (imagePath && imagePath.endsWith(".png")) {
      mediaId = await uploadMedia(imagePath, config);
    }

    // --- โพส tweet ---
    const tweetUrl = "https://api.x.com/2/tweets";
    const body: Record<string, unknown> = { text };
    if (mediaId) {
      body.media = { media_ids: [mediaId] };
    }

    const authHeader = buildOAuthHeader("POST", tweetUrl, config);

    const response = await fetch(tweetUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data: any = await response.json();

    if (!response.ok) {
      return {
        success: false,
        postId: "",
        postUrl: "",
        error: `X API error ${response.status}: ${JSON.stringify(data?.errors ?? data?.detail ?? data)}`,
      };
    }

    const postId = data?.data?.id ?? "";
    const postUrl = postId ? `https://x.com/i/web/status/${postId}` : "";

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
