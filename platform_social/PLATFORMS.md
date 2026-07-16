# Platforms — Multi-Platform Publishing

> ภาพรวมทุก platform ที่ viral-content-bot รองรับหรือกำลังจะรองรับ
> Contract กลาง: `src/publisher/types.ts` (`PublisherFn`) — publisher ใหม่ต้อง implement ตามนี้แล้วลงทะเบียนใน `src/publisher/index.ts`

## Status Matrix

| Platform | สถานะ | Text limit | Image support | Publisher file |
|----------|-------|-----------|----------------|----------------|
| Facebook | ✅ ใช้งานได้ | 63,206 chars | photo (`/photos` endpoint) | `src/publisher/facebook.ts` |
| X (Twitter) | 🧪 พร้อมรอ creds | 280 chars | v1.1 media upload | `src/publisher/x.ts` |
| LINE OA | 🧪 พร้อมรอ creds | 5,000 chars | text-only (image ต้องมี public URL) | `src/publisher/line.ts` |
| Discord | 🧪 พร้อมรอ creds | 2,000 chars | file attach (multipart) | `src/publisher/discord.ts` |
| Instagram | 🧪 พร้อมรอ creds | 2,200 chars | ต้อง public image URL | `src/publisher/instagram.ts` |
| TikTok | 🏗 Phase 3 stub | — | — | `src/publisher/tiktok.ts` |
| YouTube | 🏗 Phase 3 stub | — | — | `src/publisher/youtube.ts` |

**สัญลักษณ์:** ✅ ใช้งานได้จริงตอนนี้ · 🧪 โค้ด publisher เสร็จแล้ว รอแค่ credentials · 🏗 ยัง stub อยู่ รอ app audit / OAuth flow เต็ม (Phase 3)

## วิธีเปิดใช้แต่ละ Platform

ทุก platform: copy `config/platforms.example.json` → `config/platforms.json` (ไฟล์นี้ gitignored อยู่แล้ว) แล้วแก้ค่าตามด้านล่าง จากนั้นเปลี่ยน `"enabled": false` → `true`

### Facebook
1. Graph API Explorer (developers.facebook.com/tools/explorer) → เอา short-lived user token
2. Exchange เป็น long-lived user token ผ่าน `oauth/access_token` (ดูสคริปต์ที่ `config/credentials-tracker.md`)
3. ดึง page access_token จาก long-lived user token — page token นี้ **ไม่หมดอายุ**

```json
"facebook": {
  "enabled": true,
  "user_access_token": "...",
  "page_id": "...",
  "access_token": "...",
  "api_version": "v25.0",
  "pages": { "my_page": { "id": "...", "name": "...", "access_token": "..." } }
}
```

### X (Twitter)
1. สมัคร developer account ที่ developer.x.com → สร้าง Project + App
2. App permissions ต้องเป็น **Read and Write**
3. Keys and tokens tab → คัดลอก API Key/Secret (Consumer Keys) + Access Token/Secret (ต้อง regenerate หลังเปลี่ยน permission เป็น Read+Write)
4. Free tier จำกัด 500 posts/เดือน — วางแผน routine posting ให้พอ

```json
"x": {
  "enabled": true,
  "api_key": "...",
  "api_secret": "...",
  "access_token": "...",
  "access_secret": "..."
}
```

### LINE OA
1. LINE Developers Console (developers.line.biz) → เลือก Provider → Messaging API channel
2. Messaging API tab → Channel access token → Issue (long-lived)

```json
"line": {
  "enabled": true,
  "channel_access_token": "..."
}
```

### Discord
1. Discord channel → Edit Channel → Integrations → Webhooks → New Webhook
2. Copy Webhook URL

```json
"discord": {
  "enabled": true,
  "webhook_url": "https://discord.com/api/webhooks/..."
}
```

### Instagram
1. ต้องมี IG Business/Creator account ที่ link กับ Facebook Page แล้ว
2. หา `ig_user_id`: `GET /{page_id}?fields=instagram_business_account` ด้วย FB page token
3. `access_token` ใช้ FB page access_token เดิมได้เลย ถ้ามี permission `instagram_content_publish`

```json
"instagram": {
  "enabled": true,
  "ig_user_id": "...",
  "access_token": "...",
  "api_version": "v25.0"
}
```

### TikTok (Phase 3 stub — ยังโพสไม่ได้จริง)
Content Posting API ต้องผ่าน app audit จาก developers.tiktok.com ก่อนถึงจะโพสนอก sandbox/private testers ได้ — รอ audit approve แล้วจะเติม `client_key` / `client_secret` / `access_token`

### YouTube (Phase 3 stub — ยังโพสไม่ได้จริง)
ต้องสร้าง OAuth2 client ใน Google Cloud Console → ผ่าน OAuth consent flow ขอ scope `youtube.upload` → เก็บ `client_id` / `client_secret` / `refresh_token`

## DRY_RUN Mode

ทดสอบทั้ง pipeline (validate config + สร้าง payload) โดยไม่ยิง API จริง:

```bash
DRY_RUN=1 bun run src/index.ts "หัวข้อ"
```

Publisher ทุกตัวต้อง validate config และประกอบ payload ให้เสร็จก่อน แล้วค่อยเช็ค dry-run ตอนท้าย — เพื่อให้ DRY_RUN จับ config ผิดได้จริง ไม่ใช่ผ่านทุกกรณีแบบไม่มีความหมาย

## ข้อจำกัดรูปภาพต่อ Platform

| Platform | รับรูปแบบไหน |
|----------|--------------|
| Facebook | local file (`.png`) — อัปโหลดตรงผ่าน multipart ได้ |
| Discord | local file (`.png`) — อัปโหลดตรงผ่าน multipart ได้ |
| LINE | **ต้องเป็น public https URL เท่านั้น** — local file ใช้ไม่ได้ (broadcast API ไม่รับ multipart) ตอนนี้ยังไม่มี hosting step จึงข้ามรูป โพสข้อความอย่างเดียว |
| Instagram | **ต้องเป็น public image URL เท่านั้น** — Graph API media container ต้องการ URL ที่ดึงได้จากอินเทอร์เน็ต local path ใช้ไม่ได้ |
| X | v1.1 media upload endpoint รับ local file/binary ได้ |
| TikTok / YouTube | ยัง stub — ไม่มี image path ในสเปกตอนนี้ |

## หมายเหตุ

- **Facebook token expiry:** long-lived user token หมดอายุ ~2026-07-25 — ดู `config/credentials-tracker.md` สำหรับตาราง reminder เต็มและวิธี renew (page access_token ที่ derive มาแล้วไม่หมดอายุ ไม่กระทบ)
- ห้าม commit `config/platforms.json` (มี secrets จริง) — commit ได้แค่ `config/platforms.example.json`
