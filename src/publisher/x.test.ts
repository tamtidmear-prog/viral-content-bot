// ============================
// publisher/x.test.ts — unit tests สำหรับ postToX
// ห้ามยิง network จริง — ใช้ configOverride + DRY_RUN เท่านั้น
// ============================

import { test, expect, describe } from "bun:test";
import { postToX, buildOAuthHeader, type XConfig } from "./x";
import { fitToLimit } from "./types";

const baseConfig: XConfig = {
  enabled: true,
  api_key: "test_api_key",
  api_secret: "test_api_secret",
  access_token: "test_access_token",
  access_secret: "test_access_secret",
};

describe("postToX — validation", () => {
  test("returns Thai error when disabled", async () => {
    const result = await postToX("caption", ["#test"], null, {
      ...baseConfig,
      enabled: false,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("X ยังไม่ได้ enable");
  });

  test("returns Thai error naming missing keys", async () => {
    const result = await postToX("caption", ["#test"], null, {
      ...baseConfig,
      api_key: "",
      access_secret: "",
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("api_key");
    expect(result.error).toContain("access_secret");
  });
});

describe("postToX — DRY_RUN", () => {
  test("returns dry-run success without network calls", async () => {
    const original = process.env.DRY_RUN;
    process.env.DRY_RUN = "1";

    try {
      const result = await postToX(
        "สวัสดีชาวโลก",
        ["#test", "#dryrun"],
        null,
        baseConfig
      );

      expect(result.success).toBe(true);
      expect(result.postId).toBe("dry-run-x");
      expect(result.postUrl).toBe("");
    } finally {
      if (original === undefined) delete process.env.DRY_RUN;
      else process.env.DRY_RUN = original;
    }
  });

  test("skips media upload in dry-run even with imagePath", async () => {
    const original = process.env.DRY_RUN;
    process.env.DRY_RUN = "1";

    try {
      const result = await postToX(
        "แคปชั่นพร้อมรูป",
        ["#test"],
        "/nonexistent/path/image.png",
        baseConfig
      );

      // --- ถ้า media upload ไม่ถูก skip จะ throw เพราะไฟล์ไม่มีจริง ---
      expect(result.success).toBe(true);
    } finally {
      if (original === undefined) delete process.env.DRY_RUN;
      else process.env.DRY_RUN = original;
    }
  });
});

describe("fitToLimit", () => {
  test("long Thai caption + 8 hashtags stays within 280 chars and keeps hashtags", () => {
    const longCaption =
      "นี่คือแคปชั่นภาษาไทยที่ยาวมากๆ เพื่อทดสอบว่าฟังก์ชันตัดข้อความทำงานถูกต้องหรือไม่ " +
      "เราต้องการให้แน่ใจว่าเมื่อข้อความยาวเกินขีดจำกัดของ X ที่ 280 ตัวอักษร " +
      "ระบบจะตัดข้อความให้พอดีและยังคง hashtag ทั้งหมดไว้ท้ายข้อความเสมอ " +
      "ไม่ว่า caption จะยาวแค่ไหนก็ตาม ฟังก์ชันนี้ต้องทำงานได้อย่างถูกต้องแม่นยำ";
    const hashtags = [
      "#AI",
      "#เทคโนโลยี",
      "#ViralContent",
      "#สร้างสรรค์",
      "#Prism",
      "#Novus",
      "#SocialMedia",
      "#ข่าวไอที",
    ];

    const result = fitToLimit(longCaption, hashtags, 280);

    expect(result.length).toBeLessThanOrEqual(280);
    for (const tag of hashtags) {
      expect(result).toContain(tag);
    }
  });
});

describe("buildOAuthHeader", () => {
  test("produces deterministic header with fixed nonce/timestamp", () => {
    const header = buildOAuthHeader(
      "POST",
      "https://api.x.com/2/tweets",
      baseConfig,
      {},
      "fixednonce123",
      "1700000000"
    );

    expect(header).toStartWith("OAuth ");
    expect(header).toContain('oauth_consumer_key="test_api_key"');
    expect(header).toContain('oauth_nonce="fixednonce123"');
    expect(header).toContain('oauth_signature_method="HMAC-SHA1"');
    expect(header).toContain('oauth_timestamp="1700000000"');
    expect(header).toContain('oauth_token="test_access_token"');
    expect(header).toContain('oauth_version="1.0"');
    expect(header).toContain("oauth_signature=");
  });

  test("same inputs produce same signature (deterministic)", () => {
    const header1 = buildOAuthHeader(
      "POST",
      "https://api.x.com/2/tweets",
      baseConfig,
      {},
      "fixednonce123",
      "1700000000"
    );
    const header2 = buildOAuthHeader(
      "POST",
      "https://api.x.com/2/tweets",
      baseConfig,
      {},
      "fixednonce123",
      "1700000000"
    );

    expect(header1).toBe(header2);
  });
});
