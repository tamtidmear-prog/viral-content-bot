// ============================
// publisher/discord.test.ts — เทส Discord publisher (ไม่ยิง network จริง)
// ============================

import { test, expect, beforeEach, afterEach } from "bun:test";
import { postToDiscord } from "./discord";

const ORIGINAL_DRY_RUN = process.env.DRY_RUN;

beforeEach(() => {
  delete process.env.DRY_RUN;
});

afterEach(() => {
  if (ORIGINAL_DRY_RUN === undefined) {
    delete process.env.DRY_RUN;
  } else {
    process.env.DRY_RUN = ORIGINAL_DRY_RUN;
  }
});

// --- missing config ---

test("missing config → error บอกวิธีเพิ่ม config พร้อมตัวอย่าง webhook_url", async () => {
  const result = await postToDiscord("สวัสดี", ["#test"], null, undefined as any);
  expect(result.success).toBe(false);
  expect(result.error).toContain("config/platforms.json");
  expect(result.error).toContain("webhook_url");
});

// --- disabled ---

test("disabled → error บอกให้ enable", async () => {
  const result = await postToDiscord("สวัสดี", ["#test"], null, {
    enabled: false,
    webhook_url: "https://discord.com/api/webhooks/123/abc",
  });
  expect(result.success).toBe(false);
  expect(result.error).toContain("enable");
});

// --- missing webhook_url ---

test("enabled แต่ไม่มี webhook_url → error", async () => {
  const result = await postToDiscord("สวัสดี", ["#test"], null, {
    enabled: true,
    webhook_url: "",
  });
  expect(result.success).toBe(false);
  expect(result.error).toContain("webhook_url");
});

// --- webhook_url format validation ---

test("webhook_url ผิดรูปแบบ (ไม่ใช่ discord.com/discordapp.com) → error", async () => {
  const result = await postToDiscord("สวัสดี", ["#test"], null, {
    enabled: true,
    webhook_url: "https://evil.example.com/webhooks/123/abc",
  });
  expect(result.success).toBe(false);
  expect(result.error).toContain("webhook_url ไม่ถูกต้อง");
});

test("webhook_url ใช้ discord.com/api/webhooks/ ผ่าน validation (ไป DRY_RUN สำเร็จ)", async () => {
  process.env.DRY_RUN = "1";
  const result = await postToDiscord("สวัสดี", ["#test"], null, {
    enabled: true,
    webhook_url: "https://discord.com/api/webhooks/123/abc",
  });
  expect(result.success).toBe(true);
});

test("webhook_url ใช้ discordapp.com/api/webhooks/ ผ่าน validation (ไป DRY_RUN สำเร็จ)", async () => {
  process.env.DRY_RUN = "1";
  const result = await postToDiscord("สวัสดี", ["#test"], null, {
    enabled: true,
    webhook_url: "https://discordapp.com/api/webhooks/123/abc",
  });
  expect(result.success).toBe(true);
});

// --- DRY_RUN success ---

test("DRY_RUN=1 → success โดยไม่ยิง network จริง", async () => {
  process.env.DRY_RUN = "1";
  const result = await postToDiscord("สวัสดี", ["#test"], null, {
    enabled: true,
    webhook_url: "https://discord.com/api/webhooks/123/abc",
  });
  expect(result.success).toBe(true);
  expect(result.postId).toBe("dry-run-discord");
  expect(result.postUrl).toBe("");
});

// --- fitToLimit ที่ 2000 ตัวอักษร ---
// จับ console.log ตอน DRY_RUN เพื่ออ่าน payload summary จริงที่ dryRunResult พิมพ์ออกมา

test("content ยาวเกิน 2000 ตัวอักษร → ถูกตัดให้ ≤ 2000", async () => {
  process.env.DRY_RUN = "1";
  const originalLog = console.log;
  let logged = "";
  console.log = (...args: any[]) => {
    logged += args.join(" ");
  };
  try {
    const longCaption = "ก".repeat(3000);
    const result = await postToDiscord(longCaption, ["#test"], null, {
      enabled: true,
      webhook_url: "https://discord.com/api/webhooks/123/abc",
    });
    expect(result.success).toBe(true);
    // รูปแบบ log: "[DryRun] discord: <content>" — content คือส่วนหลังคำนำหน้า
    const content = logged.replace("[DryRun] discord: ", "");
    expect(content.length).toBeLessThanOrEqual(2000);
  } finally {
    console.log = originalLog;
  }
});

test("content สั้นกว่า 2000 ตัวอักษร → ไม่ถูกตัด", async () => {
  process.env.DRY_RUN = "1";
  const originalLog = console.log;
  let logged = "";
  console.log = (...args: any[]) => {
    logged += args.join(" ");
  };
  try {
    const shortCaption = "สวัสดีครับ";
    const result = await postToDiscord(shortCaption, [], null, {
      enabled: true,
      webhook_url: "https://discord.com/api/webhooks/123/abc",
    });
    expect(result.success).toBe(true);
    const content = logged.replace("[DryRun] discord: ", "");
    expect(content).toBe(shortCaption);
  } finally {
    console.log = originalLog;
  }
});
