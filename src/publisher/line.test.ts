// ============================
// publisher/line.test.ts — เทส LINE publisher (ไม่ยิง network จริง)
// ============================

import { test, expect, beforeEach, afterEach } from "bun:test";
import { postToLine } from "./line";

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

test("missing config → error บอกวิธีเพิ่ม config", async () => {
  const result = await postToLine("สวัสดี", ["#test"], null, undefined as any);
  expect(result.success).toBe(false);
  expect(result.error).toContain("config/platforms.json");
});

// --- disabled ---

test("disabled → error บอกให้ enable", async () => {
  const result = await postToLine("สวัสดี", ["#test"], null, {
    enabled: false,
    channel_access_token: "token",
  });
  expect(result.success).toBe(false);
  expect(result.error).toContain("enable");
});

// --- missing channel_access_token ---

test("enabled แต่ไม่มี channel_access_token → error", async () => {
  const result = await postToLine("สวัสดี", ["#test"], null, {
    enabled: true,
    channel_access_token: "",
  });
  expect(result.success).toBe(false);
  expect(result.error).toContain("channel_access_token");
});

// --- DRY_RUN success ---

test("DRY_RUN=1 → success โดยไม่ยิง network จริง", async () => {
  process.env.DRY_RUN = "1";
  const result = await postToLine("สวัสดี", ["#test"], null, {
    enabled: true,
    channel_access_token: "fake-token",
  });
  expect(result.success).toBe(true);
  expect(result.postId).toBe("dry-run-line");
  expect(result.postUrl).toBe("");
});

test("DRY_RUN=1 พร้อมรูป → success + ไม่พังจาก imagePath", async () => {
  process.env.DRY_RUN = "1";
  const result = await postToLine("สวัสดี", ["#test"], "/tmp/fake.png", {
    enabled: true,
    channel_access_token: "fake-token",
  });
  expect(result.success).toBe(true);
});

// --- fitToLimit ที่ 5000 ตัวอักษร ---
// จับ console.log ตอน DRY_RUN เพื่ออ่าน payload จริงที่ถูกสร้าง แล้ววัดความยาว text ใน payload

test("caption ยาวเกิน 5000 ตัวอักษร → text ใน payload ถูกตัดให้ ≤ 5000", async () => {
  process.env.DRY_RUN = "1";
  const originalLog = console.log;
  let logged = "";
  console.log = (...args: any[]) => {
    logged += args.join(" ");
  };
  try {
    const longCaption = "ก".repeat(6000);
    const result = await postToLine(longCaption, ["#test"], null, {
      enabled: true,
      channel_access_token: "fake-token",
    });
    expect(result.success).toBe(true);
    const payload = JSON.parse(logged.slice(logged.indexOf("{")));
    expect(payload.messages[0].text.length).toBeLessThanOrEqual(5000);
  } finally {
    console.log = originalLog;
  }
});

test("caption สั้นกว่า 5000 ตัวอักษร → ไม่ถูกตัด", async () => {
  process.env.DRY_RUN = "1";
  const originalLog = console.log;
  let logged = "";
  console.log = (...args: any[]) => {
    logged += args.join(" ");
  };
  try {
    const shortCaption = "สวัสดีครับ";
    const result = await postToLine(shortCaption, [], null, {
      enabled: true,
      channel_access_token: "fake-token",
    });
    expect(result.success).toBe(true);
    const payload = JSON.parse(logged.slice(logged.indexOf("{")));
    expect(payload.messages[0].text).toBe(shortCaption);
  } finally {
    console.log = originalLog;
  }
});
