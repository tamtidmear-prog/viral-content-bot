// ============================
// publisher/discord.ts — ส่วนโพส Discord ผ่าน webhook
// หน้าที่: รับ caption + รูป → โพสขึ้น Discord channel ผ่าน incoming webhook
// input: caption (string), imagePath (string | null)
// output: { success, postId, postUrl }
// ============================

import { readFileSync } from "fs";
import { isDryRun, dryRunResult, loadPlatformConfig, fitToLimit } from "./types";
import type { PostResult } from "./types";

// ============================
// ส่วนที่ 1: Discord config
// อ่าน enabled + webhook_url จาก config/platforms.json → key "discord" (key ใหม่ ยังไม่มีใน platforms.json)
// ============================

interface DiscordConfig {
  enabled: boolean;
  webhook_url: string;
}

// Discord webhook message content limit
const DISCORD_TEXT_LIMIT = 2000;

const VALID_WEBHOOK_PREFIXES = [
  "https://discord.com/api/webhooks/",
  "https://discordapp.com/api/webhooks/",
];

export async function postToDiscord(
  caption: string,
  hashtags: string[],
  imagePath: string | null,
  configOverride?: DiscordConfig
): Promise<PostResult> {
  const config = configOverride ?? loadPlatformConfig<DiscordConfig>("discord");

  // --- เช็คว่ามี config ไหม (key นี้ยังไม่มีใน platforms.json เดิม ต้องบอกวิธีเพิ่มให้ชัด) ---
  if (!config) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error:
        'ไม่พบ config Discord ใน config/platforms.json — เพิ่ม {"discord": {"enabled": true, "webhook_url": "https://discord.com/api/webhooks/..."}}',
    };
  }

  // --- เช็คว่า Discord enabled ไหม ---
  if (!config.enabled) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: "Discord ยังไม่ได้ enable — ใส่ webhook_url ใน config/platforms.json แล้วเปลี่ยน enabled เป็น true",
    };
  }

  if (!config.webhook_url) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: 'ขาด webhook_url ใน config/platforms.json — เพิ่ม {"discord": {"enabled": true, "webhook_url": "https://discord.com/api/webhooks/..."}}',
    };
  }

  if (!VALID_WEBHOOK_PREFIXES.some((prefix) => config.webhook_url.startsWith(prefix))) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error:
        'webhook_url ไม่ถูกต้อง — ต้องขึ้นต้นด้วย "https://discord.com/api/webhooks/" หรือ "https://discordapp.com/api/webhooks/" (คัดลอกจาก Discord: Channel Settings → Integrations → Webhooks)',
    };
  }

  // --- รวม caption + hashtags แล้วตัดให้พอดี limit ของ Discord ---
  const content = fitToLimit(caption, hashtags, DISCORD_TEXT_LIMIT);

  const hasImage = imagePath !== null && imagePath.endsWith(".png");

  // --- DRY_RUN: ต้อง validate + สร้าง payload เสร็จก่อนถึงจุดนี้ ---
  if (isDryRun()) {
    const summary = hasImage ? `${content} [+image: ${imagePath}]` : content;
    return dryRunResult("discord", summary);
  }

  // wait=true ให้ webhook ตอบกลับ message JSON ของโพสจริง (ไม่ใส่ = ตอบแค่ 204 ว่างๆ)
  const url = `${config.webhook_url}?wait=true`;

  try {
    let response: Response;

    if (hasImage && imagePath) {
      // --- โพสแบบมีรูป: multipart FormData ---
      const imageBuffer = readFileSync(imagePath);
      const formData = new FormData();
      formData.append("payload_json", JSON.stringify({ content }));
      formData.append("files[0]", new Blob([imageBuffer], { type: "image/png" }), "image.png");

      response = await fetch(url, {
        method: "POST",
        body: formData,
      });
    } else {
      // --- โพสแบบไม่มีรูป: JSON body ---
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
    }

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
        error: `Discord API error ${response.status}: ${JSON.stringify(errBody)}`,
      };
    }

    const data: any = await response.json();

    // postUrl ว่างเสมอ — webhook response ไม่มี guild id ให้ประกอบเป็น canonical message URL ได้
    return { success: true, postId: data.id ?? "", postUrl: "" };
  } catch (err: any) {
    return {
      success: false,
      postId: "",
      postUrl: "",
      error: `Network error: ${err.message}`,
    };
  }
}
