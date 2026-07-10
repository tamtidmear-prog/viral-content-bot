// ============================
// publisher/stubs.test.ts — unit tests สำหรับ TikTok + YouTube stubs (Phase 3)
// ไม่ยิง network จริง: ใช้ configOverride + DRY_RUN เท่านั้น
// ============================

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { postToTikTok } from "./tiktok";
import { postToYouTube } from "./youtube";

const originalDryRun = process.env.DRY_RUN;

beforeEach(() => {
  process.env.DRY_RUN = "1";
});

afterEach(() => {
  if (originalDryRun === undefined) delete process.env.DRY_RUN;
  else process.env.DRY_RUN = originalDryRun;
});

const validTikTokConfig = {
  enabled: true,
  client_key: "key",
  client_secret: "secret",
  access_token: "token",
};

const validYouTubeConfig = {
  enabled: true,
  client_id: "id",
  client_secret: "secret",
  refresh_token: "refresh",
};

describe("postToTikTok — validation", () => {
  test("missing config → actionable error", async () => {
    const result = await postToTikTok("caption", ["#a"], null, undefined as any);
    expect(result.success).toBe(false);
    expect(result.error).toContain("tiktok");
  });

  test("enabled:false → error", async () => {
    const result = await postToTikTok("caption", ["#a"], null, { ...validTikTokConfig, enabled: false });
    expect(result.success).toBe(false);
    expect(result.error).toContain("enable");
  });

  test("missing creds → actionable error", async () => {
    const result = await postToTikTok("caption", ["#a"], null, { ...validTikTokConfig, access_token: "" });
    expect(result.success).toBe(false);
    expect(result.error).toContain("access_token");
  });
});

describe("postToTikTok — DRY_RUN success", () => {
  test("enabled + creds + DRY_RUN → success", async () => {
    const result = await postToTikTok("caption", ["#a"], null, validTikTokConfig);
    expect(result.success).toBe(true);
    expect(result.postId).toBe("dry-run-tiktok");
  });
});

describe("postToTikTok — real post attempt (not dry-run)", () => {
  test("valid config but DRY_RUN off → success:false with actionable Thai error + Phase 3 marker + link", async () => {
    delete process.env.DRY_RUN;
    const result = await postToTikTok("caption", ["#a"], null, validTikTokConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("audit");
    expect(result.error).toContain("developers.tiktok.com");
    expect(result.error).toContain("Phase 3");
  });
});

describe("postToYouTube — validation", () => {
  test("missing config → actionable error", async () => {
    const result = await postToYouTube("caption", ["#a"], null, undefined as any);
    expect(result.success).toBe(false);
    expect(result.error).toContain("youtube");
  });

  test("enabled:false → error", async () => {
    const result = await postToYouTube("caption", ["#a"], null, { ...validYouTubeConfig, enabled: false });
    expect(result.success).toBe(false);
    expect(result.error).toContain("enable");
  });

  test("missing creds → actionable error", async () => {
    const result = await postToYouTube("caption", ["#a"], null, { ...validYouTubeConfig, refresh_token: "" });
    expect(result.success).toBe(false);
    expect(result.error).toContain("refresh_token");
  });
});

describe("postToYouTube — DRY_RUN success", () => {
  test("enabled + creds + DRY_RUN → success", async () => {
    const result = await postToYouTube("caption", ["#a"], null, validYouTubeConfig);
    expect(result.success).toBe(true);
    expect(result.postId).toBe("dry-run-youtube");
  });
});

describe("postToYouTube — real post attempt (not dry-run)", () => {
  test("valid config but DRY_RUN off → success:false with actionable Thai error explaining video file requirement + Phase 3 marker", async () => {
    delete process.env.DRY_RUN;
    const result = await postToYouTube("caption", ["#a"], null, validYouTubeConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("OAuth2");
    expect(result.error).toContain("Phase 3");
  });
});
