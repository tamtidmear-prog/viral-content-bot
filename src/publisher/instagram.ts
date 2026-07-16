// ============================
// publisher/instagram.ts — ส่วนโพส Instagram (IG Graph API — Content Publishing)
// หน้าที่: รับ caption + รูป → โพสขึ้น Instagram Business/Creator account อัตโนมัติ
// input: caption (string), hashtags (string[]), imagePath (string | null)
// output: { success, postId, postUrl }
//
// ⚠️ ข้อจำกัดสำคัญ: IG Graph API "media" endpoint รับได้แค่ image_url ที่เป็น
// public HTTPS URL เท่านั้น — Meta server ต้อง fetch รูปเองผ่านอินเทอร์เน็ต
// รูปจาก local file (imagePath ตรงๆ) ใช้ไม่ได้ ต้อง host รูปให้เป็น public URL ก่อน
// ============================

import { loadPlatformConfig, isDryRun, dryRunResult, fitToLimit } from "./types";
import type { PostResult } from "./types";

// ============================
// ส่วนที่ 1: Config
// ============================

interface IGConfig {
  enabled: boolean;
  ig_user_id: string;
  access_token: string;
  api_version?: string;
  image_public_url?: string;
}

const IG_CONFIG_EXAMPLE = `{
  "instagram": {
    "enabled": true,
    "ig_user_id": "YOUR_IG_BUSINESS_ACCOUNT_ID",
    "access_token": "YOUR_IG_ACCESS_TOKEN",
    "api_version": "v25.0",
    "image_public_url": "https://your-public-host.example.com/optional-fixed-image.png"
  }
}`;

const CAPTION_LIMIT = 2200;

// ============================
// ส่วนที่ 2: หา public image URL
// ลำดับความสำคัญ: env IG_IMAGE_URL (per-run override) → config.image_public_url
// ห้ามใช้ imagePath (local file) ตรงๆ — Graph API fetch จาก local ไม่ได้
// ============================

function resolvePublicImageUrl(config: IGConfig): string | null {
  if (process.env.IG_IMAGE_URL) return process.env.IG_IMAGE_URL;
  if (config.image_public_url) return config.image_public_url;
  return null;
}

// ============================
// ส่วนที่ 3: โพสรูป + caption ขึ้น Instagram
// Flow: POST /media (image_url, caption) → creation_id
//       POST /media_publish (creation_id) → media_id
//       GET /{media_id}?fields=permalink → post URL (best-effort, fallback "")
// ============================

export async function postToInstagram(
  caption: string,
  hashtags: string[],
  imagePath: string | null,
  configOverride?: IGConfig
): Promise<PostResult> {
  const config = configOverride ?? loadPlatformConfig<IGConfig>("instagram");

  // --- เช็คว่ามี config ไหม (key ใหม่ — ยังไม่เคยมีใน platforms.json) ---
  if (!config) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `ยังไม่มี config "instagram" ใน config/platforms.json — เพิ่ม block นี้:\n${IG_CONFIG_EXAMPLE}`,
    };
  }

  if (!config.enabled) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `Instagram ยังไม่ได้ enable — ใส่ค่าให้ครบแล้วเปลี่ยน "enabled" เป็น true ใน config/platforms.json:\n${IG_CONFIG_EXAMPLE}`,
    };
  }

  if (!config.ig_user_id || !config.access_token) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `ขาด ig_user_id หรือ access_token ใน config/platforms.json → ต้องมี block "instagram" แบบนี้:\n${IG_CONFIG_EXAMPLE}`,
    };
  }

  const apiVersion = config.api_version ?? "v25.0";

  // --- IG ต้องมีรูปเสมอ (ไม่มี text-only post) ---
  if (!imagePath) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: "Instagram ต้องมีรูปทุกโพส — ไม่รองรับโพสข้อความอย่างเดียว (imagePath เป็น null)",
    };
  }

  // --- หา public URL ของรูป — IG Graph API fetch รูปจาก URL เท่านั้น ห้ามใช้ local path ---
  const imageUrl = resolvePublicImageUrl(config);
  if (!imageUrl) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error:
        "Instagram Graph API ต้องการรูปที่เป็น public HTTPS URL เท่านั้น (Meta server ต้อง fetch รูปเองจากอินเทอร์เน็ต) " +
        `ไม่รองรับไฟล์ local ("${imagePath}") ตรงๆ — แก้ได้ 2 ทาง:\n` +
        `  1) ตั้ง env IG_IMAGE_URL=https://... ก่อนรัน (ใช้ต่อครั้ง)\n` +
        `  2) เพิ่ม "image_public_url" ใน config/platforms.json → block "instagram" (ใช้ถาวร):\n${IG_CONFIG_EXAMPLE}`,
    };
  }

  const fullCaption = fitToLimit(caption, hashtags, CAPTION_LIMIT);
  const baseUrl = `https://graph.facebook.com/${apiVersion}/${config.ig_user_id}`;

  // --- DRY_RUN: validate + สร้าง payload เสร็จแล้วค่อยเช็ค ไม่ยิง fetch จริง ---
  if (isDryRun()) {
    return dryRunResult(
      "instagram",
      `image_url=${imageUrl}, caption="${fullCaption.slice(0, 80)}${fullCaption.length > 80 ? "…" : ""}"`
    );
  }

  try {
    // --- step 1: สร้าง media container ---
    const createRes = await fetch(`${baseUrl}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: imageUrl,
        caption: fullCaption,
        access_token: config.access_token,
      }),
    });
    const createData: any = await createRes.json();

    if (!createRes.ok || !createData.id) {
      return {
        success: false,
        postId: "",
        postUrl: "",
        error: `Instagram media create error ${createRes.status}: ${JSON.stringify(createData?.error?.message ?? createData)}`,
      };
    }

    const creationId = createData.id;

    // --- step 2: publish media container ---
    const publishRes = await fetch(`${baseUrl}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: config.access_token,
      }),
    });
    const publishData: any = await publishRes.json();

    if (!publishRes.ok || !publishData.id) {
      return {
        success: false,
        postId: "",
        postUrl: "",
        error: `Instagram media_publish error ${publishRes.status}: ${JSON.stringify(publishData?.error?.message ?? publishData)}`,
      };
    }

    const mediaId = publishData.id;

    // --- step 3: ดึง permalink จริง (best-effort — ไม่มีก็ไม่ fail ทั้งโพส) ---
    let postUrl = "";
    try {
      const permalinkRes = await fetch(
        `https://graph.facebook.com/${apiVersion}/${mediaId}?fields=permalink&access_token=${config.access_token}`
      );
      const permalinkData: any = await permalinkRes.json();
      if (permalinkRes.ok && permalinkData.permalink) {
        postUrl = permalinkData.permalink;
      }
    } catch {
      // --- ดึง permalink ไม่ได้ก็ไม่เป็นไร โพสสำเร็จแล้ว ---
    }

    return { success: true, postId: mediaId, postUrl };
  } catch (err: any) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `Network error: ${err.message}`,
    };
  }
}
