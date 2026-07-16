// ============================
// publisher/types.ts — contract กลางของทุก publisher
// ทุก platform ต้อง export ฟังก์ชัน (caption, hashtags, imagePath) => Promise<PostResult>
// เพิ่ม platform ใหม่ → implement ตาม PublisherFn + ลงทะเบียนใน publisher/index.ts
// ============================

export interface PostResult {
  success: boolean;
  postId: string;
  postUrl: string;
  error?: string;
}

export type PublisherFn = (
  caption: string,
  hashtags: string[],
  imagePath: string | null
) => Promise<PostResult>;

// ============================
// DRY_RUN mode — ทดสอบ pipeline โดยไม่ยิง API จริง
// ใช้: DRY_RUN=1 bun run src/index.ts "หัวข้อ"
// publisher ต้อง validate config + สร้าง payload ให้เสร็จก่อน แล้วค่อยเช็ค dry-run
// เพื่อให้ dry-run จับ config ผิดได้จริง ไม่ใช่ผ่านทุกกรณี
// ============================

export function isDryRun(): boolean {
  return process.env.DRY_RUN === "1";
}

export function dryRunResult(platform: string, payloadSummary: string): PostResult {
  console.log(`[DryRun] ${platform}: ${payloadSummary}`);
  return { success: true, postId: `dry-run-${platform}`, postUrl: "" };
}

// ============================
// โหลด config ของ platform จาก config/platforms.json
// คืน null ถ้าไม่มีไฟล์หรือไม่มี platform นั้น
// ============================

import { readFileSync } from "fs";
import { join } from "path";

export function loadPlatformConfig<T>(platform: string): T | null {
  try {
    const platforms = JSON.parse(
      readFileSync(join(__dirname, "../../config/platforms.json"), "utf-8")
    );
    return platforms[platform] ?? null;
  } catch {
    return null;
  }
}

// ============================
// helper: ตัดข้อความให้พอดี limit ของ platform (เช่น X 280, Discord 2000)
// ตัดที่ขอบคำ + เติม … และพยายามคง hashtags ไว้ท้ายข้อความ
// ============================

export function fitToLimit(caption: string, hashtags: string[], limit: number): string {
  const tags = hashtags.join(" ");
  const full = tags ? `${caption}\n\n${tags}` : caption;
  if (full.length <= limit) return full;

  // --- เหลือที่ให้ caption = limit - tags - ช่องว่าง ---
  const reserved = tags ? tags.length + 3 : 0; // \n\n + …
  const room = limit - reserved - 1;
  if (room <= 0) return full.slice(0, limit); // tags ยาวเกิน limit เอง — ตัดดิบ

  let cut = caption.slice(0, room);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > room * 0.6) cut = cut.slice(0, lastSpace);
  return tags ? `${cut}…\n\n${tags}` : `${cut}…`;
}
