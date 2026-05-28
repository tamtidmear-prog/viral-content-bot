# Platform API Master Reference — Prism_Of_Novus

> Research date: 2026-05-27 | ข้อมูลจาก 7 research teams (parallel)
> ใช้อ้างอิงทุก session เมื่อต้อง setup หรือ implement publisher ใหม่

---

## สรุปรวม (Quick Comparison)

| Platform | ฟรี? | ค่าใช้จ่าย | Setup Time | ความยาก | โพสได้/วัน | Auth Token Lifetime | Library (Bun/Node) |
|----------|------|-----------|------------|---------|-----------|--------------------|--------------------|
| **Facebook** | ✅ ฟรี | $0 | ✅ Done | — | ไม่จำกัด (practical) | Page Token = ∞ | `fetch` (direct) |
| **Instagram** | ✅ ฟรี | $0 | ~30 min | ง่าย | 50-100 | Page Token = ∞ | `fetch` (direct) |
| **Threads** | ✅ ฟรี | $0 | 1-2 สัปดาห์ | กลาง | 250 | Long-lived = 60 วัน | `fetch` (direct) |
| **X / Twitter** | ❌ Pay-per-use | $0.01/post | ~1 ชม. | ง่าย | ~500 (17 media) | OAuth 1.0a = ∞ | `twitter-api-v2` |
| **YouTube** | ✅ ฟรี | $0 | ~1 ชม. | กลาง | 66-100 videos | Refresh Token = ∞ | `googleapis` |
| **Discord** | ✅ ฟรี | $0 | ~10 นาที | ง่ายมาก | ไม่จำกัด | Bot Token = ∞ | `fetch` (webhook) |
| **LINE OA** | ✅ ฟรี (300 msg) | 0 THB (Free) | ~30 min | กลาง | 300 broadcast/เดือน | Long-lived = ∞ | `@line/bot-sdk` |
| **TikTok** | ✅ ฟรี | $0 | 4-10 สัปดาห์ | ยาก | 15-25 | Access = 24 ชม. | `fetch` (no SDK) |
| **LinkedIn** | ✅ ฟรี | $0 | 1-8 สัปดาห์ | ยาก | ~150 | Access = 60 วัน | `linkedin-api-client` |
| **Pinterest** | ✅ ฟรี | $0 | 1 วัน (Trial) | กลาง | 100 writes/min | Access = 30 วัน | `fetch` (direct) |
| **Reddit** | ✅ ฟรี (non-commercial) | $0 | ทันที | ง่าย | 60 req/min | Access = 1 ชม. | `snoowrap` |

---

## Priority Ranking (แนะนำลำดับ implement)

### Tier 1 — ทำได้เลย (ใช้ infrastructure ที่มี)
1. **Instagram** — ใช้ Prism_Oracle app เดิม, same Meta Graph API, ฟรี 100%
2. **Discord** — webhook = zero dependencies, ฟรี, 10 นาที setup
3. **Threads** — Meta ecosystem เดียวกัน, ฟรี, ต้อง App Review

### Tier 2 — ต้อง setup ใหม่แต่ไม่ยาก
4. **YouTube** — ฟรี, quota เยอะ (100 uploads/วัน), ต้อง OAuth one-time
5. **X / Twitter** — Pay-per-use $0.01/post (~$0.90/เดือน สำหรับ 3 โพส/วัน)
6. **Reddit** — ทันที, เหมาะ community engagement (r/artificial, r/Thailand)

### Tier 3 — ต้องรอ approval นาน
7. **LINE OA** — ฟรี 300 msg/เดือน, เหมาะตลาดไทย, setup ไม่ยาก
8. **Pinterest** — เหมาะ infographic/kawaii content, Trial ได้ใน 1 วัน
9. **LinkedIn** — professional AI content, approval นาน 1-8 สัปดาห์
10. **TikTok** — ฟรีแต่ audit 4-10 สัปดาห์, ยากสุด

---

## แต่ละ Platform — รายละเอียด

---

### 1. FACEBOOK ✅ (Active — ใช้งานอยู่แล้ว)

**Status:** Production | **App:** Prism_Oracle (Live Mode)

| Item | Value |
|------|-------|
| API | Facebook Graph API v25.0 |
| Endpoint | `POST /{page-id}/photos` (image+text), `POST /{page-id}/feed` (text) |
| Auth | Page Access Token (never expires) |
| Token Flow | Short-lived → Long-lived (60d) → Page Token (∞) |
| Rate Limit | 200 calls/hr per user, 4800/day |
| Cost | Free |
| Publisher | `src/publisher/facebook.ts` |
| Config | `config/platforms.json` |

---

### 2. INSTAGRAM 📋 (Next — ง่ายสุด)

**ใช้ Prism_Oracle app + Meta Graph API เดิมได้เลย**

| Item | Value |
|------|-------|
| API | Instagram Graph API (Content Publishing) |
| Base URL | `https://graph.facebook.com/v25.0/` |
| Auth | Page Access Token (same as FB, never expires) |
| Rate Limit | 200 calls/hr per IG account, 50-100 posts/day |
| Cost | **Free 100%** |
| App Review | ไม่ต้อง (สำหรับ account ตัวเอง) |

**Setup Steps:**
1. Switch IG account → Business/Creator (free, ใน IG app)
2. Link IG → Facebook Page (ใน IG Settings)
3. Add "Instagram Graph API" product ใน Prism_Oracle app dashboard
4. Request permissions: `instagram_basic` + `instagram_content_publish`
5. Get IG Business Account ID: `GET /{page-id}?fields=instagram_business_account`
6. Generate token with IG scopes → exchange เป็น long-lived → Page Token

**Posting Flow (2-step):**
```
Step 1: Create Container
POST /{ig-user-id}/media
  ?image_url=https://PUBLIC_URL/photo.jpg
  &caption=Caption #hashtags
  &access_token={token}
→ { "id": "container-id" }

Step 2: Publish
POST /{ig-user-id}/media_publish
  ?creation_id=container-id
  &access_token={token}
→ { "id": "media-id" }
```

**Content Types:**
| Type | `media_type` | Notes |
|------|-------------|-------|
| Image | `IMAGE` | JPEG, 1080x1350 (4:5), max 8MB |
| Carousel | `CAROUSEL` | 2-10 items, create children → parent → publish |
| Reels | `REELS` | 1080x1920 (9:16), 3s-15min, max 4GB |
| Stories | `STORIES` | 1080x1920, auto-delete 24h |

**สำคัญ:** Media ต้องเป็น **PUBLIC URL** — IG API ไม่รับ file upload ตรง ต้อง host ไว้ที่ server/CDN/cloud storage

**Check quota:** `GET /{ig-user-id}/content_publishing_limit?fields=config,quota_usage`

---

### 3. THREADS 📋 (Meta ecosystem เดียวกัน)

| Item | Value |
|------|-------|
| API | Threads API (Meta) |
| Base URL | `https://graph.threads.net/v1.0/` |
| Auth | OAuth 2.0 (Meta), Long-lived token = 60 days |
| Rate Limit | 250 posts/day, 250 API calls/hr |
| Cost | **Free 100%** |
| App Review | ต้อง Meta App Review สำหรับ production |

**Requirements:**
- Instagram Business/Creator account (linked to Threads)
- Meta Developer App (ใช้ Prism_Oracle ได้ — เพิ่ม "Threads API" product)
- Scopes: `threads_basic`, `threads_content_publish`

**Posting Flow (2-step เหมือน IG):**
```
Step 1: POST /{user_id}/threads
  ?media_type=TEXT (or IMAGE, VIDEO, CAROUSEL)
  &text=Content (max 500 chars)
  &access_token={token}
→ { "id": "creation_id" }

Step 2: POST /{user_id}/threads_publish
  ?creation_id={creation_id}
  &access_token={token}
```

**Content Types:** Text (500 chars), Image, Video (5 min), Carousel (2-20 items), Quote post
**ไม่รองรับ:** GIFs, Stories, Scheduling

---

### 4. X / TWITTER 📋

| Item | Value |
|------|-------|
| API | X API v2 |
| Base URL | `https://api.x.com/2/` |
| Auth | OAuth 1.0a (4 keys, never expire) — แนะนำสำหรับ bot |
| Rate Limit | 17 media uploads/day, pay-per-use |
| Cost | **$0.01/post** (pay-per-use, ~$0.90/เดือน สำหรับ 3 posts/day) |
| Free Tier | **ยกเลิกแล้ว** (Feb 2026) สำหรับ dev ใหม่ |

**Setup:**
1. สร้าง developer account ที่ `console.x.com`
2. Create Project → Create App
3. Set App Permissions → "Read and write"
4. Generate: API Key, API Secret, Access Token, Access Token Secret
5. ติด Bot label ใน profile bio

**Posting:**
```
POST https://api.x.com/2/tweets
Authorization: OAuth 1.0a (signature)
{ "text": "Content here" }
```

**Media Upload (v2 chunked):**
```
POST https://api.x.com/2/media/upload  (INIT → APPEND → FINALIZE)
```

**Library:** `twitter-api-v2` (npm) — full TypeScript, media upload built-in
```typescript
import { TwitterApi } from 'twitter-api-v2';
const client = new TwitterApi({ appKey, appSecret, accessToken, accessSecret });
await client.v2.tweet('Hello from Prism!');
```

**Limits:** 17 media/day, image max 5MB, video max 512MB
**กฎ Bot:** ต้อง label bot ใน bio, ห้าม auto-follow/like/retweet, AI reply bot ต้องขออนุญาต

---

### 5. YOUTUBE 📋

| Item | Value |
|------|-------|
| API | YouTube Data API v3 |
| Auth | OAuth 2.0 (refresh token = ∞) |
| Quota | 10,000 units/day (free), video upload = 100 units |
| Cost | **Free 100%** |
| Uploads/Day | 66-100 (with thumbnails) |

**Setup:**
1. Google Cloud Console → Create Project
2. Enable "YouTube Data API v3"
3. OAuth consent screen → External → Add test user (ตัวเอง)
4. Create OAuth 2.0 credentials (Desktop app)
5. Download `client_secret.json`
6. Run auth flow once → save refresh token

**Upload:**
```typescript
import { google } from 'googleapis';
const youtube = google.youtube('v3');
await youtube.videos.insert({
  auth, part: 'snippet,status',
  requestBody: {
    snippet: { title, description, tags, categoryId: '28' },
    status: { privacyStatus: 'public', selfDeclaredMadeForKids: false }
  },
  media: { body: fs.createReadStream('video.mp4') }
});
```

**Shorts:** ใช้ endpoint เดียวกัน — vertical (9:16) + ≤3 min + `#Shorts` ใน title
**Community Posts:** ❌ ไม่มี API — ต้องทำใน YouTube Studio เท่านั้น
**Service Account:** ❌ ใช้ไม่ได้ — ต้อง OAuth 2.0 user auth เท่านั้น
**Channel:** ต้อง phone verify สำหรับ custom thumbnail + video >15 min

---

### 6. DISCORD 📋 (ง่ายที่สุด)

| Item | Value |
|------|-------|
| API | Discord REST API v10 / Webhooks |
| Auth | Bot Token (∞) หรือ Webhook URL (no auth needed) |
| Rate Limit | 5 msg/5s per channel, 50 req/s global |
| Cost | **Free 100%** |

**แนะนำ: ใช้ Webhook (ง่ายสุด, zero dependencies)**

**Setup Webhook:**
1. Discord server → channel → Edit → Integrations → Webhooks → New
2. Copy Webhook URL

**Post (zero dependencies, built-in fetch):**
```typescript
await fetch(WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'Prism Chronicle',
    avatar_url: 'https://example.com/prism.png',
    embeds: [{
      title: 'AI News Daily',
      description: 'Content...',
      color: 3447003, // blue
      image: { url: 'https://example.com/image.png' },
      footer: { text: 'Prism Chronicle | AI x Human Bridge' }
    }]
  })
});
```

**With file attachment:**
```typescript
const form = new FormData();
form.append('payload_json', JSON.stringify({ content: 'New infographic!' }));
form.append('files[0]', Bun.file('infographic.png'));
await fetch(WEBHOOK_URL, { method: 'POST', body: form });
```

**Full Bot (ถ้าต้องการ interactive):** `discord.js` — slash commands, reactions, thread management

---

### 7. LINE OA 📋 (ตลาดไทย)

| Item | Value |
|------|-------|
| API | LINE Messaging API |
| Auth | Channel Access Token (Long-lived = ∞) |
| Free Tier | 300 broadcast/เดือน, reply ฟรีไม่จำกัด |
| Paid | Basic 1,280 THB/เดือน (15,000 msg), Pro 1,780 THB |
| Cost | **Free (300 msg)** หรือ 1,280+ THB/เดือน |

**Setup:**
1. สร้าง LINE OA ที่ `manager.line.biz`
2. Settings → Messaging API → Enable
3. เลือก/สร้าง Provider ใน LINE Developers Console
4. Note: Channel ID, Channel Secret, Channel Access Token
5. Set Webhook URL (HTTPS + valid SSL)

**Broadcast:**
```typescript
import { messagingApi } from '@line/bot-sdk';
const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_TOKEN
});
await client.broadcast({
  messages: [{ type: 'text', text: 'Hello from Prism!' }]
});
```

**Message Types:** Text, Image, Video, Audio, Sticker, Location, Template, **Flex Message** (custom card layouts)
**Free Strategy:** Reply messages = ฟรีไม่จำกัด, broadcast 300/เดือน
**Quota:** นับตาม **จำนวนผู้รับ** ไม่ใช่จำนวน message objects
**Rich Menu:** ตั้งค่าผ่าน API ได้ (2500x1686 px, max 1MB)

---

### 8. TIKTOK 📋 (ยากสุด, ต้องรอ audit)

| Item | Value |
|------|-------|
| API | TikTok Content Posting API |
| Auth | OAuth 2.0, Access Token = 24 ชม., Refresh = 365 วัน |
| Rate Limit | 6 req/min per user, 15-25 posts/day |
| Cost | **Free 100%** |
| Setup Time | **4-10 สัปดาห์** (app review + audit) |

**Setup:**
1. สร้าง developer account ที่ `developers.tiktok.com`
2. Create app → เลือก Content Posting API
3. Request scopes: `video.upload` + `video.publish`
4. ถ่าย demo video + เขียน use case
5. Submit for review (2-6 สัปดาห์)
6. Test in sandbox (โพสเป็น private เท่านั้น)
7. Pass compliance audit → unlock public posting

**Posting (video):**
```
POST https://open.tiktokapis.com/v2/post/publish/video/init/
{
  "post_info": {
    "title": "Caption #hashtag",
    "privacy_level": "PUBLIC_TO_EVERYONE",
    "is_aigc": true  // ⚠️ บังคับสำหรับ AI content
  },
  "source_info": {
    "source": "FILE_UPLOAD",
    "video_size": 50000000,
    "chunk_size": 10000000,
    "total_chunk_count": 5
  }
}
```

**Photo Post:** รองรับแล้ว (2026) — carousel ได้ถึง 35 รูป
**Video Specs:** MP4 H.264, 1080x1920 (9:16), 3s-10min, max 1GB
**สำคัญ:**
- ⚠️ App ที่ไม่ผ่าน audit → โพสเป็น **SELF_ONLY** (private) เท่านั้น
- ⚠️ `is_aigc: true` บังคับสำหรับ AI-generated content
- ❌ ไม่มี official SDK — ต้อง implement HTTP calls เอง
- ❌ ไม่มี post editing/deletion ผ่าน API

---

### 9. LINKEDIN 📋

| Item | Value |
|------|-------|
| API | LinkedIn Posts API (`/rest/posts`) |
| Auth | OAuth 2.0, Access = 60 วัน, Refresh = 365 วัน |
| Rate Limit | 5,000 calls/day (dev tier), ~150 posts/day |
| Cost | **Free** (API itself) |
| Setup Time | 1-8 สัปดาห์ (approval) |

**Setup:**
1. สร้าง app ที่ `linkedin.com/developers`
2. สร้าง Company Page (สำหรับ org posting)
3. Add "Share on LinkedIn" product (quick approval)
4. Add "Community Management API" (ถ้าต้อง manage Company Page — 4-8 สัปดาห์)

**Posting:**
```
POST https://api.linkedin.com/rest/posts
LinkedIn-Version: 202604
{
  "author": "urn:li:organization:{id}",
  "commentary": "Post content here",
  "visibility": "PUBLIC",
  "distribution": { "feedDistribution": "MAIN_FEED" },
  "lifecycleState": "PUBLISHED"
}
```

**Content Types:** Text, Image (upload → attach), Multi-image (9), Video (async), Document/PDF, Poll, Article/link
**Image Upload:** `POST /rest/images?action=initializeUpload` → PUT binary → reference URN
**Header:** ต้องมี `LinkedIn-Version: YYYYMM` ทุก request

---

### 10. PINTEREST 📋

| Item | Value |
|------|-------|
| API | Pinterest API v5 |
| Auth | OAuth 2.0, Access = 30 วัน, Refresh = 60 วัน (renewable) |
| Rate Limit | 1,000 read/min, 100 write/min |
| Cost | **Free 100%** |
| Setup Time | 1 วัน (Trial) |

**Setup:**
1. Business account (free, แปลงจาก personal ได้)
2. Register app ที่ `developers.pinterest.com`
3. Trial tier = ได้ใน 1 วัน (25 test users)
4. Standard access = ต้อง video demo

**Create Pin:**
```
POST https://api.pinterest.com/v5/pins
{
  "board_id": "board-id",
  "title": "Pin title",
  "description": "Description",
  "link": "https://destination-url.com",
  "media_source": {
    "source_type": "image_url",
    "url": "https://image-url.com/image.jpg"
  }
}
```

**เหมาะกับ:** Infographic, kawaii content, visual-first
**Board management:** สร้าง/จัดการ board ผ่าน API ได้

---

### 11. REDDIT 📋

| Item | Value |
|------|-------|
| API | Reddit API (OAuth 2.0) |
| Auth | Script app: password grant, Access = 1 ชม. |
| Rate Limit | 60 req/min (OAuth), 10 req/min (no auth) |
| Cost | **Free** (non-commercial) |
| Setup Time | ทันที |

**Setup:**
1. สร้าง Reddit account
2. Register app ที่ `reddit.com/prefs/apps` → Script type
3. ได้ `client_id` + `client_secret` ทันที

**Posting:**
```
POST https://oauth.reddit.com/api/submit
  kind=self (text) | link | image | gallery
  sr=subreddit_name
  title=Post Title
  text=Content (self post)
```

**User-Agent:** ต้องตั้งค่า descriptive header เสมอ
**สำคัญ:**
- ⚠️ Subreddit rules แตกต่างกัน (karma, account age, flair)
- ⚠️ Commercial use = $0.24/1000 calls
- ⚠️ Spam filter จะ block ถ้าโพสบ่อยเกิน
- Library: `snoowrap` (npm) — rate limit handling built-in

---

## NotebookLM เป็นช่องทาง Distribution

NotebookLM ไม่ใช่ social platform แต่ใช้เป็น **content creation + distribution tool:**
- สร้าง **Podcast audio** → upload ไป YouTube, Spotify, LINE OA
- สร้าง **Report/Slides** → share บน LinkedIn, Facebook
- สร้าง **Mind Map/Quiz** → share บน Discord, Reddit
- เป็น **research pipeline** ก่อนสร้าง content ให้ทุก platform

---

## Token Management Summary

| Platform | Token Type | Lifetime | Auto-Refresh? |
|----------|-----------|----------|---------------|
| Facebook | Page Token | ∞ | ไม่ต้อง |
| Instagram | Page Token | ∞ | ไม่ต้อง |
| Threads | Long-lived | 60 วัน | ต้อง refresh |
| X/Twitter | OAuth 1.0a | ∞ | ไม่ต้อง |
| YouTube | Refresh Token | ∞ (ถ้าใช้) | Access token refresh ทุก 1 ชม. |
| Discord | Bot Token / Webhook | ∞ | ไม่ต้อง |
| LINE OA | Long-lived | ∞ | ไม่ต้อง |
| TikTok | Refresh Token | 365 วัน | Access refresh ทุก 24 ชม. |
| LinkedIn | Refresh Token | 365 วัน | Access refresh ทุก 60 วัน |
| Pinterest | Refresh Token | 60 วัน (renewable) | Access refresh ทุก 30 วัน |
| Reddit | Access Token | 1 ชม. | ต้อง refresh ทุก ชม. |

---

## Architecture Plan — viral-content-bot Publisher Pattern

```
src/publisher/
├── facebook.ts     ✅ Active
├── instagram.ts    📋 Next — same Meta API, 2-step container
├── discord.ts      📋 Webhook, zero dependencies
├── threads.ts      📋 Meta API, 2-step container
├── twitter.ts      📋 twitter-api-v2 library
├── youtube.ts      📋 googleapis, OAuth + resumable upload
├── line.ts         📋 @line/bot-sdk
├── tiktok.ts       📋 Raw fetch, chunked upload
├── linkedin.ts     📋 linkedin-api-client or fetch
├── pinterest.ts    📋 fetch, v5 API
└── reddit.ts       📋 snoowrap or fetch
```

ทุก publisher ใช้ pattern เดียวกัน:
```typescript
interface Publisher {
  post(content: PostContent): Promise<PostResult>;
  uploadMedia?(file: string): Promise<string>;
}
```

---

*Owner: Prism_Of_Novus | Research: 2026-05-27 | Sources: Official docs + community guides*
