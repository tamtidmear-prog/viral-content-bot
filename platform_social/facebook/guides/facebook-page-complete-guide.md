# Facebook Page Management — Complete Guide

> คู่มือฉบับสมบูรณ์สำหรับจัดการ Facebook Page ผ่าน Graph API
> ตั้งแต่ setup ครั้งแรก จนถึงใช้งานทุกวัน

---

## 1. สิ่งที่ต้องมีก่อนเริ่ม (Prerequisites)

### 1.1 Facebook App
| Item | ดูจาก |
|------|-------|
| App Name | `config/platforms.json` → `_comment` |
| App ID | `config/platforms.json` → `facebook.pages` หรือ `pass prism/facebook-app-id` |
| App Secret | `pass prism/facebook-app-secret` |
| Mode | Development (การพัฒนา) |
| Dashboard | developers.facebook.com → แอพของฉัน |

### 1.2 Facebook Account (เจ้าของเพจ)
| Item | ดูจาก |
|------|-------|
| Login credentials | `pass master-j/facebook` (email + password) |
| Role ใน App | ผู้ดูแล (Admin) |

> ห้ามเขียน email, password, user ID ลงในไฟล์ — ดูจาก `pass` store เท่านั้น

### 1.3 Pages ที่จัดการ
| เพจ | Page ID | หน้าที่ |
|-----|---------|--------|
| **Prism Chronicle** | ดู `config/platforms.json` → `page_id` | เพจหลักของ Prism |
| อื่นๆ | ดู `config/platforms.json` → `pages` | ดูรายละเอียดใน config |

### 1.4 Permissions ที่ต้องเปิด
| Permission | ใช้ทำอะไร | เปิดที่ไหน |
|------------|----------|-----------|
| `pages_show_list` | ดูรายชื่อเพจ | Graph API Explorer (เลือกตอน generate token) |
| `pages_read_engagement` | อ่านข้อมูล/insights เพจ | Graph API Explorer |
| `pages_manage_posts` | โพส content (ข้อความ, รูป, หลายรูป) | Graph API Explorer |
| `pages_manage_metadata` | เปลี่ยน profile pic, cover, settings | **ต้องเปิด Standard Access ที่ App Dashboard ก่อน** |

### 1.5 เปิด Standard Access (ทำครั้งเดียวต่อ permission)
1. เปิด https://developers.facebook.com/apps/222493084481502/
2. Sidebar → **การตรวจพิจารณาแอพ** → **สิทธิ์และฟีเจอร์**
3. ค้นหา permission ที่ต้องการ (เช่น `pages_manage_metadata`)
4. ดูว่า Standard Access แสดง "พร้อมใช้งาน"
5. ถ้ายังไม่พร้อม → กด **รับสิทธิ์การเข้าถึงมาตรฐาน**
6. Development mode + Admin role = ใช้ได้ทันที ไม่ต้องรอ App Review

---

## 2. Token Management (ระบบ Token)

### 2.1 Token Types
| Type | อายุ | ได้จากไหน |
|------|------|----------|
| User Token (short-lived) | 1-2 ชม. | Graph API Explorer → Generate |
| User Token (long-lived) | 60 วัน | Exchange short-lived ด้วย App Secret |
| Page Token (จาก short-lived) | 1-2 ชม. | `GET /{page_id}?fields=access_token` |
| **Page Token (จาก long-lived)** | **ไม่หมดอายุ** | เดียวกัน แต่ใช้ long-lived user token |

**เป้าหมาย:** ได้ Page Access Token ที่ไม่หมดอายุ

### 2.2 Generate Token ครั้งแรก

**Step 1: ได้ Short-lived User Token**
1. เปิด Graph API Explorer (developers.facebook.com → เครื่องมือ → Graph API Explorer)
2. เลือก App ที่ใช้ (ดูชื่อจาก `config/platforms.json`)
3. ผู้ใช้หรือเพจ: **โทเค็นการเข้าถึงของผู้ใช้**
4. เพิ่ม permissions: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `pages_manage_metadata`
5. กด **Generate Access Token** → OAuth popup → ดำเนินการต่อ
6. Copy token ที่ได้

**Step 2: Exchange เป็น Long-lived (60 วัน)**
```bash
SHORT_TOKEN="<token จาก step 1>"
APP_SECRET=$(pass prism/facebook-app-secret)

curl -s "https://graph.facebook.com/v25.0/oauth/access_token?\
grant_type=fb_exchange_token&\
client_id=${APP_ID}&\
client_secret=$APP_SECRET&\
fb_exchange_token=$SHORT_TOKEN"

# Returns: {"access_token":"<long-lived-token>","token_type":"bearer","expires_in":5183999}
```

**Step 3: ดึง Page Token (ไม่หมดอายุ)**
```bash
LONG_TOKEN="<token จาก step 2>"
PAGE_ID="1184469221407318"

curl -s "https://graph.facebook.com/v25.0/${PAGE_ID}?fields=id,name,access_token&access_token=$LONG_TOKEN"

# Returns: {"id":"1184469221407318","name":"Prism Chronicle","access_token":"<permanent-page-token>"}
```

**Step 4: บันทึก token**
- อัพเดต `config/platforms.json` → `facebook.access_token` + `facebook.user_access_token`
- อัพเดต `config/credentials-tracker.md`

### 2.3 ตรวจสอบ Token
```bash
# เช็คว่า token ยังใช้ได้
PAGE_TOKEN=$(python3 -c "import json; d=json.load(open('config/platforms.json')); print(d['facebook']['access_token'])")
curl -s "https://graph.facebook.com/v25.0/me?access_token=$PAGE_TOKEN"

# เช็ค permissions
curl -s "https://graph.facebook.com/v25.0/me/permissions?access_token=$PAGE_TOKEN"
```

### 2.4 Renew Token (ทำก่อนหมดอายุ — ทุก ~55 วัน)
- User token (long-lived) หมดอายุ 60 วัน
- Page token ไม่หมดอายุ แต่ถ้า user token ถูก revoke → page token ใช้ไม่ได้
- **Deadline ปัจจุบัน: 2026-07-20**
- ทำ Step 1-4 ใหม่

### 2.5 Token เก็บที่ไหน
| Item | Location |
|------|----------|
| Page Token (active) | `config/platforms.json` → `access_token` |
| User Token (long-lived) | `config/platforms.json` → `user_access_token` |
| App ID | `pass prism/facebook-app-id` |
| App Secret | `pass prism/facebook-app-secret` |
| FB Login | `pass master-j/facebook` |

> ทุก secret เก็บใน GPG-encrypted `pass` store — ห้ามเขียนค่าจริงลงไฟล์

---

## 3. โพส Content

### 3.1 โพสข้อความ
```bash
curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/feed" \
  -d "message=ข้อความที่ต้องการโพส" \
  -d "access_token=$PAGE_TOKEN"
```

### 3.2 โพสรูปเดียว
```bash
curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "source=@path/to/image.png" \
  -F "caption=ข้อความ + #hashtag" \
  -F "access_token=$PAGE_TOKEN"
```

### 3.3 โพสหลายรูป
```bash
# Upload แต่ละรูปเป็น unpublished
ID1=$(curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "source=@image1.png" -F "published=false" \
  -F "access_token=$PAGE_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

ID2=$(curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "source=@image2.png" -F "published=false" \
  -F "access_token=$PAGE_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

# โพสรวม
curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/feed" \
  -d "message=ข้อความ" \
  -d "attached_media[0]={\"media_fbid\":\"$ID1\"}" \
  -d "attached_media[1]={\"media_fbid\":\"$ID2\"}" \
  -d "access_token=$PAGE_TOKEN"
```

---

## 4. จัดการรูปเพจ (Profile + Cover)

**ต้องมี:** `pages_manage_metadata` Standard Access เปิดแล้ว (ดูหัวข้อ 1.5)

### 4.1 เปลี่ยน Profile Picture
```bash
curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/picture" \
  -F "source=@profile.png" \
  -F "access_token=$PAGE_TOKEN"
# Returns: {"success":true}
```
ขนาดแนะนำ: 170x170px ขึ้นไป

### 4.2 เปลี่ยน Cover Photo (2 steps)
```bash
# Step 1: Upload
PHOTO_ID=$(curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "source=@cover.png" -F "published=false" \
  -F "access_token=$PAGE_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

# Step 2: Set as cover (ส่ง ID ตรงๆ ไม่ใช่ JSON)
curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}" \
  -d "cover=$PHOTO_ID" \
  -d "access_token=$PAGE_TOKEN"
# Returns: {"success":true}
```
ขนาดแนะนำ: 820x312px

---

## 5. เครื่องมือที่มี

### 5.1 viral-content-bot (Web UI)
```bash
cd ~/Oracle_Project/Prism/viral-content-bot
GROQ_API_KEY=$(pass nexus/groq_api_key) bun run src/server.ts
# เปิด http://localhost:3939
```
- สร้าง content ด้วย AI (Groq)
- เลือกเพจ + template
- โพสผ่าน UI

### 5.2 CLI
```bash
bun run src/index.ts "หัวข้อที่ต้องการ"
```

### 5.3 Token Management API
- `GET /api/token/status` — เช็ค token
- `POST /api/token/exchange` — exchange long-lived
- `GET /api/token/pages` — ดูเพจทั้งหมด

---

## 6. Errors ที่เจอบ่อย

| Error | สาเหตุ | วิธีแก้ |
|-------|--------|--------|
| `#283 Requires pages_manage_metadata` | Standard Access ไม่ได้เปิด | App Dashboard → เปิด Standard Access |
| `#210 Page access token required` | ใช้ user token แทน page token | ดึง page token จาก user token |
| `#100 Parameters do not match` | parameter ชื่อผิด | ดูตาม guide แต่ละ section |
| `#100 Invalid id` (cover) | ส่ง ID เป็น JSON | ส่ง photo ID ตรงๆ: `cover=123456` |
| `Session has expired` | token หมดอายุ | Renew ตาม section 2.4 |
| `(#200) Unpublished posts` | ใช้ user token โพสเพจ | server.ts แก้แล้ว — ดึง page token auto |
| `GROQ_API_KEY not set` | ไม่มี API key | `export GROQ_API_KEY=$(pass nexus/groq_api_key)` |

---

## 7. Graph API Explorer (เครื่องมือทดสอบ)

**URL:** https://developers.facebook.com/tools/explorer/

| ช่อง | เลือก |
|------|------|
| แอพ Meta | Mamipogo |
| ผู้ใช้หรือเพจ | โทเค็นการเข้าถึงของผู้ใช้ |
| สิทธิ์การอนุญาต | เพิ่มตามที่ต้องการ |

ทดสอบ API:
- `GET /me` → ดูข้อมูลตัวเอง
- `GET /{page_id}?fields=id,name,access_token` → ดึง page token
- `GET /{page_id}/feed` → ดู feed ของเพจ

---

## 8. Playwright (Browser Automation)

ใช้เมื่อต้อง login Facebook เพื่อ generate token หรือทำสิ่งที่ API ทำไม่ได้

### Setup
```bash
# Chromium binary ที่มีอยู่ (ห้าม install ใหม่)
export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/home/jijiclaw/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome

# หรือใช้ system Chrome
# chromium.launch({ channel: "chrome" })
```

### Login + Save Session
```bash
cd ~/Oracle_Project/Prism/viral-content-bot
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/home/jijiclaw/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome \
  bun run scripts/set-page-images.ts login
# Session saved → .fb-session/state.json
```

### Credentials
- Login: ดูจาก `pass master-j/facebook`
- 2FA: ต้องกดเองใน browser window (รัน foreground เท่านั้น)
- Session state: `.fb-session/state.json` (reuse ได้จนกว่าจะ expire)

---

## 9. Files สำคัญ

| File | หน้าที่ |
|------|--------|
| `config/platforms.json` | FB tokens, page IDs, app config |
| `config/credentials-tracker.md` | tracking table ทุก credential/token |
| `config/templates/` | Prompt templates (gaming, finance, lifestyle) |
| `src/server.ts` | Web UI server (port 3939) |
| `src/token.ts` | Token management functions |
| `src/publisher/facebook.ts` | FB posting logic |
| `.fb-session/state.json` | Playwright session (gitignored) |
| `docs/troubleshooting/` | ปัญหา + วิธีแก้ |

---

## 10. อ้างอิง

- Graph API Docs: https://developers.facebook.com/docs/graph-api/
- Page API: https://developers.facebook.com/docs/pages-api/
- Permissions: https://developers.facebook.com/docs/permissions/reference/
- Graph API Explorer: https://developers.facebook.com/tools/explorer/
- App Dashboard: https://developers.facebook.com/apps/222493084481502/
- Development Mode: https://developers.facebook.com/docs/development/build-and-test/

---
*Prism_Of_Novus — 2026-05-25*
