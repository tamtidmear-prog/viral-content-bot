# Facebook Page Image Management Guide

> คู่มือเปลี่ยน Profile Picture + Cover Photo ของ Facebook Page ผ่าน Graph API
> สำหรับ Prism_Of_Novus และทุกคนที่ต้องจัดการเพจ

## สิ่งที่ต้องมีก่อนเริ่ม

### 1. Facebook App (Development Mode)
- App: **Mamipogo** (ID: `222493084481502`)
- URL: https://developers.facebook.com/apps/222493084481502/
- โหมด: **การพัฒนา** (Development)

### 2. สิทธิ์ที่ต้องเปิด
| Permission | ทำไมต้องมี | วิธีเปิด |
|------------|-----------|---------|
| `pages_show_list` | ดูรายชื่อเพจ | Graph API Explorer → เลือก permission |
| `pages_read_engagement` | อ่านข้อมูลเพจ | Graph API Explorer → เลือก permission |
| `pages_manage_posts` | โพส content | Graph API Explorer → เลือก permission |
| **`pages_manage_metadata`** | **เปลี่ยนรูป profile + cover** | **ต้องเปิด Standard Access ที่ App Dashboard ก่อน** |

### 3. เปิด Standard Access สำหรับ pages_manage_metadata
**ขั้นตอน (ทำครั้งเดียว):**
1. เปิด https://developers.facebook.com/apps/222493084481502/
2. Sidebar → **การตรวจพิจารณาแอพ** → **สิทธิ์และฟีเจอร์**
3. ค้นหา `pages_manage_metadata`
4. ดูว่า **Standard Access** แสดง "พร้อมใช้งาน" → ถ้ายังไม่พร้อม กด **รับสิทธิ์การเข้าถึงมาตรฐาน**
5. ไม่ต้อง App Review — Standard Access ใช้ได้เลยสำหรับ admin ใน development mode

### 4. บัญชี Facebook
- ชื่อ: **PapaJinna Wirunputi** (FB ID: `27630579793200254`)
- Email: `mamipogo1@hotmail.com`
- Password: `pass master-j/facebook`
- Role ใน App: **ผู้ดูแล** (Admin)
- เป็นเจ้าของทุกเพจที่จัดการ

### 5. Page Access Token (ไม่หมดอายุ)
- เก็บที่: `config/platforms.json` → `facebook.access_token`
- สร้างจาก: long-lived user token → ดึง page token
- วิธี renew: ดู `config/credentials-tracker.md`

---

## เปลี่ยน Profile Picture

```bash
cd ~/Oracle_Project/Prism/viral-content-bot

PAGE_TOKEN=$(python3 -c "import json; d=json.load(open('config/platforms.json')); print(d['facebook']['access_token'])")
PAGE_ID="1184469221407318"

curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/picture" \
  -F "source=@path/to/profile.png" \
  -F "access_token=$PAGE_TOKEN"

# สำเร็จ: {"success":true}
```

**ขนาดแนะนำ:** 170x170px ขึ้นไป, PNG หรือ JPG

---

## เปลี่ยน Cover Photo (2 ขั้นตอน)

### Step 1: Upload รูปเป็น unpublished photo
```bash
PHOTO_ID=$(curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "source=@path/to/cover.png" \
  -F "published=false" \
  -F "access_token=$PAGE_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

echo "Photo ID: $PHOTO_ID"
```

### Step 2: Set เป็น cover photo
```bash
curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}" \
  -d "cover=$PHOTO_ID" \
  -d "access_token=$PAGE_TOKEN"

# สำเร็จ: {"success":true}
```

**ขนาดแนะนำ:** 820x312px, PNG หรือ JPG

---

## เปลี่ยนทั้ง Profile + Cover พร้อมกัน (copy-paste)

```bash
cd ~/Oracle_Project/Prism/viral-content-bot
PAGE_TOKEN=$(python3 -c "import json; d=json.load(open('config/platforms.json')); print(d['facebook']['access_token'])")
PAGE_ID="1184469221407318"

# Profile
curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/picture" \
  -F "source=@../ψ/inbox/from-origin/prism_profile_170x170.png" \
  -F "access_token=$PAGE_TOKEN"

# Cover (upload + set)
PHOTO_ID=$(curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "source=@../ψ/inbox/from-origin/prism_cover_820x312.png" \
  -F "published=false" \
  -F "access_token=$PAGE_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}" \
  -d "cover=$PHOTO_ID" \
  -d "access_token=$PAGE_TOKEN"
```

---

## เพจอื่นๆ (ใช้วิธีเดียวกัน เปลี่ยน PAGE_ID)

| เพจ | PAGE_ID |
|-----|---------|
| **Prism Chronicle** | `1184469221407318` |
| Ai_In_Mind | `108423905655889` |
| Forex EAI Expert | `811730625603539` |
| Cakekhunaoy By Sweetjeed | `137411833080593` |

---

## Errors ที่เจอบ่อย + วิธีแก้

| Error | สาเหตุ | วิธีแก้ |
|-------|--------|--------|
| `#283 Requires pages_manage_metadata` | Standard Access ไม่ได้เปิด | ไป App Dashboard → เปิด Standard Access (ดูขั้นตอนข้างบน) |
| `#210 A page access token is required` | ใช้ user token แทน page token | ดึง page token: `GET /{page_id}?fields=access_token&access_token={user_token}` |
| `#100 Parameters do not match` | parameter ชื่อผิด | Profile: ใช้ `source`, Cover: ใช้ `cover={photo_id}` ไม่ใช่ `cover_source` |
| `#100 Invalid id` | ส่ง cover เป็น JSON | ส่ง photo ID ตรงๆ: `cover=123456` ไม่ใช่ `cover={"photo_id":"123456"}` |
| `Session has expired` | token หมดอายุ | Generate ใหม่ที่ Graph API Explorer → exchange → ดึง page token |

---

## อ้างอิง
- FB Docs: https://developers.facebook.com/docs/graph-api/reference/page/picture/
- App Dashboard: https://developers.facebook.com/apps/222493084481502/
- Graph API Explorer: https://developers.facebook.com/tools/explorer/
- Credentials: `config/credentials-tracker.md`
- Troubleshooting: `docs/troubleshooting/facebook-page-images.md`

---
*สร้างโดย Prism_Of_Novus — 2026-05-25*
*บทเรียนจาก session ที่เสียเวลา 2+ ชม. มั่วก่อนจะหาทางถูก*
