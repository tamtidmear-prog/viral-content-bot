// ============================
// publisher/instagram.test.ts — unit tests สำหรับ Instagram publisher
// ไม่ยิง network จริง: ใช้ configOverride + DRY_RUN เท่านั้น
// ============================

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { postToInstagram } from "./instagram";

const originalDryRun = process.env.DRY_RUN;
const originalImageUrl = process.env.IG_IMAGE_URL;

beforeEach(() => {
  process.env.DRY_RUN = "1";
  delete process.env.IG_IMAGE_URL;
});

afterEach(() => {
  if (originalDryRun === undefined) delete process.env.DRY_RUN;
  else process.env.DRY_RUN = originalDryRun;

  if (originalImageUrl === undefined) delete process.env.IG_IMAGE_URL;
  else process.env.IG_IMAGE_URL = originalImageUrl;
});

const validConfig = {
  enabled: true,
  ig_user_id: "123456",
  access_token: "fake-token",
  api_version: "v25.0",
};

describe("postToInstagram — validation errors", () => {
  test("missing config → actionable error with JSON block", async () => {
    const result = await postToInstagram("caption", ["#a"], "img.png", undefined as any);
    expect(result.success).toBe(false);
    expect(result.error).toContain("instagram");
    expect(result.error).toContain("config/platforms.json");
  });

  test("enabled:false → error mentions enabling", async () => {
    const result = await postToInstagram("caption", ["#a"], "img.png", {
      ...validConfig,
      enabled: false,
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("enable");
  });

  test("missing ig_user_id → actionable error", async () => {
    const result = await postToInstagram("caption", ["#a"], "img.png", {
      ...validConfig,
      ig_user_id: "",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("ig_user_id");
  });

  test("missing access_token → actionable error", async () => {
    const result = await postToInstagram("caption", ["#a"], "img.png", {
      ...validConfig,
      access_token: "",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("access_token");
  });

  test("no imagePath → error: IG requires image", async () => {
    const result = await postToInstagram("caption", ["#a"], null, validConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("รูป");
  });

  test("local imagePath + no public URL available → actionable Thai error explaining 2 fixes", async () => {
    const result = await postToInstagram("caption", ["#a"], "/local/path/image.png", validConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("public");
    expect(result.error).toContain("IG_IMAGE_URL");
    expect(result.error).toContain("image_public_url");
  });
});

describe("postToInstagram — DRY_RUN success", () => {
  test("DRY_RUN with IG_IMAGE_URL env override → success", async () => {
    process.env.IG_IMAGE_URL = "https://example.com/pic.png";
    const result = await postToInstagram("hello world", ["#fun"], "/local/path/image.png", validConfig);
    expect(result.success).toBe(true);
    expect(result.postId).toBe("dry-run-instagram");
  });

  test("DRY_RUN with config.image_public_url set → success", async () => {
    const result = await postToInstagram("hello world", ["#fun"], "/local/path/image.png", {
      ...validConfig,
      image_public_url: "https://cdn.example.com/fixed.png",
    });
    expect(result.success).toBe(true);
    expect(result.postId).toBe("dry-run-instagram");
  });

  test("DRY_RUN still validates config first (invalid config → error, not dry-run success)", async () => {
    const result = await postToInstagram("hello world", ["#fun"], "/local/path/image.png", {
      ...validConfig,
      enabled: false,
    });
    expect(result.success).toBe(false);
    expect(result.postId).not.toBe("dry-run-instagram");
  });
});

describe("postToInstagram — caption fitToLimit(2200)", () => {
  test("long caption + hashtags gets truncated to <= 2200 chars in DRY_RUN preview path", async () => {
    process.env.IG_IMAGE_URL = "https://example.com/pic.png";
    const longCaption = "a".repeat(2500);
    const hashtags = ["#one", "#two", "#three"];

    // --- ไม่สามารถอ่าน fullCaption ตรงๆ จาก PostResult (dryRunResult ไม่คืน payload เต็ม) ---
    // --- แต่ทดสอบ fitToLimit เอง (helper ที่ instagram.ts เรียกใช้) ให้ครบ ---
    const { fitToLimit } = await import("./types");
    const fitted = fitToLimit(longCaption, hashtags, 2200);
    expect(fitted.length).toBeLessThanOrEqual(2200);
    expect(fitted).toContain("#one");

    const result = await postToInstagram(longCaption, hashtags, "/local/path/image.png", validConfig);
    expect(result.success).toBe(true);
  });
});
