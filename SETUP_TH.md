# คู่มือตั้งค่า — viral-content-bot

## สิ่งที่ต้องเตรียม

| # | สิ่งที่ต้องมี | สมัคร/หาได้ที่ | ฟรี? |
|---|-------------|---------------|------|
| 1 | **Bun** (ตัวรันโปรแกรม) | https://bun.sh/ → `curl -fsSL https://bun.sh/install \| bash` | ฟรี |
| 2 | **เพจ Facebook** | สร้างที่ https://www.facebook.com/pages/create | ฟรี |
| 3 | **บัญชี Meta Developer** | สมัครที่ https://developers.facebook.com/ → กด Get Started | ฟรี |
| 4 | **Meta App (Live Mode)** | สร้างที่ https://developers.facebook.com/apps/creation/ | ฟรี |
| 5 | **Facebook Page Token** | สร้างที่ https://developers.facebook.com/tools/explorer/ | ฟรี |
| 6 | **AI API Key** (เลือก 1 อัน) | ดูตารางด้านล่าง | ฟรี |

### API Key สำหรับ AI (เลือกอย่างน้อย 1 อัน)

| ตัวเลือก | สมัครที่ | ฟรี? | ความเร็ว | หมายเหตุ |
|----------|---------|------|---------|---------|
| **Groq** (แนะนำ) | https://console.groq.com/keys | ฟรี | เร็วมาก | สมัคร → กด Create API Key → copy |
| Gemini | https://ai.google.dev/gemini-api/docs/api-key | ฟรี (มีโควต้า) | ปานกลาง | ใช้ Google account สมัคร |
| Anthropic | https://console.anthropic.com/settings/keys | เสียเงิน ($5 credit) | ปานกลาง | ต้องเติมเงินก่อน |

---

## ขั้นตอนที่ 1: Clone และติดตั้ง

```bash
git clone https://github.com/tamtidmear-prog/viral-content-bot.git
cd viral-content-bot
bun install
```

---

## ขั้นตอนที่ 2: สร้าง Facebook App

### 2.1 สร้าง Meta Developer App

1. เปิด https://developers.facebook.com/apps/creation/
2. กด **"Create App"**
3. เลือก **"Other"** → กด Next
4. เลือก **"Business"** → กด Next
5. ใส่ชื่อ App (เช่น `MyContentBot`) + อีเมล
6. กด **"Create App"**

### 2.2 ตั้งค่า Basic Settings (ต้องทำก่อน Live)

ไปที่ **Settings → Basic** ในหน้า App Dashboard แล้วกรอก:

| ช่อง | ใส่อะไร |
|------|---------|
| **Privacy Policy URL** | URL อะไรก็ได้ที่เปิดได้ (เช่น URL ของ GitHub repo) |
| **User Data Deletion** | เลือก "Data Deletion Instructions URL" → ใส่ URL เดียวกัน |
| **App Icon** | อัพโหลดรูปอะไรก็ได้ ขนาด 512×512 ถึง 1024×1024 px |
| **Category** | เลือก "Business and Pages" |

กด **Save Changes**

### 2.3 เปลี่ยนเป็น Live Mode (สำคัญมาก!)

ดูที่ **toggle มุมบนขวา** ของหน้า Dashboard → เปลี่ยนจาก **Development → Live**

> ⚠️ **ทำไมต้อง Live?** ถ้า App ยังอยู่ Development Mode → โพสที่สร้างผ่าน API จะมองเห็นได้เฉพาะ admin ของ App เท่านั้น คนทั่วไปเห็นไม่ได้! เปลี่ยนเป็น Live Mode แล้วโพสจะเห็นได้สาธารณะ

### 2.4 สร้าง Access Token

1. เปิด https://developers.facebook.com/tools/explorer/
2. ด้านบน เลือก App ของคุณ
3. กด **"Generate Access Token"**
4. เลือก permissions เหล่านี้:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_manage_engagement`
   - `pages_show_list`
5. กด Login → อนุญาต → เลือกเพจที่ต้องการ
6. กลับมาหน้า Explorer → เปลี่ยน dropdown จาก "User Token" เป็น **"Page Token"** → เลือกเพจ
7. **Copy token** เก็บไว้

### 2.5 แลกเป็น Long-lived Token (แนะนำ)

Token จากขั้นตอน 2.4 หมดอายุภายใน ~2 ชั่วโมง แลกเป็น token อายุ 60 วันได้:

```bash
# แทนค่า YOUR_APP_ID, YOUR_APP_SECRET, YOUR_SHORT_TOKEN ด้วยของจริง
curl "https://graph.facebook.com/v25.0/oauth/access_token?\
grant_type=fb_exchange_token&\
client_id=YOUR_APP_ID&\
client_secret=YOUR_APP_SECRET&\
fb_exchange_token=YOUR_SHORT_TOKEN"
```

จะได้ `access_token` ใหม่ที่อายุ 60 วัน

จากนั้นดึง Page Token (ไม่หมดอายุ) ด้วย:

```bash
curl "https://graph.facebook.com/v25.0/me/accounts?\
fields=name,id,access_token&\
access_token=YOUR_LONG_LIVED_TOKEN"
```

จะได้ `access_token` ของแต่ละเพจ — **Page Token ที่ได้จาก Long-lived User Token จะไม่หมดอายุ**

---

## ขั้นตอนที่ 3: ตั้งค่า Config

### 3.1 สร้าง platforms.json

```bash
cp config/platforms.example.json config/platforms.json
```

แก้ไขไฟล์ `config/platforms.json` ใส่ token จริง:

```json
{
  "facebook": {
    "enabled": true,
    "user_access_token": "TOKEN_จากขั้นตอน_2.5",
    "page_id": "ID_เพจของคุณ",
    "access_token": "PAGE_TOKEN_จากขั้นตอน_2.5",
    "api_version": "v25.0",
    "pages": {
      "my_page": {
        "id": "123456789",
        "name": "ชื่อเพจ",
        "access_token": "PAGE_TOKEN_HERE"
      }
    }
  }
}
```

### 3.2 ตั้ง AI API Key

```bash
# Groq (แนะนำ — ฟรี เร็ว)
export GROQ_API_KEY="gsk_xxxxxxxxxxxxx"

# หรือ Gemini
export GEMINI_API_KEY="AIzaSyxxxxxxxxx"

# หรือ Anthropic Claude
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxx"
```

### 3.3 ตั้งค่า AI Provider (ไม่บังคับ)

แก้ `config/app.json` ถ้าต้องการเปลี่ยน AI provider:

```json
{
  "ai": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "language": "th",
    "max_tokens": 1024
  }
}
```

---

## ขั้นตอนที่ 4: ใช้งาน

### ผ่าน CLI (พิมพ์คำสั่ง)
```bash
bun run src/index.ts "หัวข้อที่ต้องการ"
```

### ผ่าน Web UI (หน้าเว็บ)
```bash
bun run src/server.ts
# เปิด http://localhost:3939 ในเบราว์เซอร์
```

### ตัวอย่าง
```bash
bun run src/index.ts "เกมส์ใหม่น่าเล่น 2026"        # จับ template gaming
bun run src/index.ts "วิธีออมเงิน 50-30-20"           # จับ template finance
bun run src/index.ts "ที่เที่ยวเชียงใหม่หน้าฝน"         # จับ template lifestyle
bun run src/index.ts "AI trends 2026"                # default template
```

---

## ขั้นตอนที่ 5: สร้าง Template เพิ่ม (ไม่บังคับ)

สร้างไฟล์ JSON ใน `config/templates/`:

```json
{
  "name": "tech",
  "keywords": ["เทคโนโลยี", "tech", "AI", "gadget", "แอป"],
  "description": "Content เทคโนโลยี",
  "system_prompt": "คุณเป็นนักเขียน tech content ที่อธิบายเรื่องยากให้ง่าย เขียนภาษาไทย สนุก ทันสมัย",
  "tone": "smart-casual",
  "hashtags_base": ["#เทคโนโลยี", "#tech", "#AI"],
  "image_style": "modern tech aesthetic, clean design, futuristic"
}
```

บันทึกแล้วใช้ได้เลย ไม่ต้อง restart โปรแกรม

---

## วิธีโพส Facebook ด้วยคำสั่ง (สำหรับคนที่อยากรู้)

### โพสข้อความอย่างเดียว
```bash
curl -X POST "https://graph.facebook.com/v25.0/PAGE_ID/feed" \
  -d "message=ข้อความที่ต้องการโพส" \
  -d "access_token=PAGE_TOKEN"
```

### โพสพร้อมรูป
```bash
curl -X POST "https://graph.facebook.com/v25.0/PAGE_ID/photos" \
  -F "message=ข้อความ" \
  -F "source=@รูป.png" \
  -F "access_token=PAGE_TOKEN"
```

### โพสหลายรูปพร้อมกัน
```bash
# 1. อัพโหลดรูปทีละรูป (ยังไม่โพส)
ID1=$(curl -s -X POST "https://graph.facebook.com/v25.0/PAGE_ID/photos" \
  -F "source=@รูป1.png" -F "published=false" -F "access_token=TOKEN" \
  | jq -r '.id')

ID2=$(curl -s -X POST "https://graph.facebook.com/v25.0/PAGE_ID/photos" \
  -F "source=@รูป2.png" -F "published=false" -F "access_token=TOKEN" \
  | jq -r '.id')

# 2. สร้างโพสรวมหลายรูป
curl -X POST "https://graph.facebook.com/v25.0/PAGE_ID/feed" \
  -F "message=ข้อความ" \
  -F 'attached_media=[{"media_fbid":"'$ID1'"},{"media_fbid":"'$ID2'"}]' \
  -F "access_token=TOKEN"
```

---

## แก้ปัญหาที่พบบ่อย

| ปัญหา | สาเหตุ | วิธีแก้ |
|--------|--------|---------|
| โพสแล้วคนอื่นเห็นไม่ได้ | App อยู่ Development Mode | เปลี่ยนเป็น Live Mode ที่ App Dashboard |
| `Session has expired` | Token หมดอายุ | สร้าง token ใหม่ที่ Graph API Explorer |
| `OAuthException code 190` | Token ใช้ไม่ได้แล้ว | แลกเป็น long-lived token (60 วัน) |
| `GROQ_API_KEY not set` | ยังไม่ตั้ง API key | `export GROQ_API_KEY="gsk_xxx"` |
| `Object does not exist` | App กับเพจไม่ตรงกัน / ไม่มี permission | เช็คว่า generate token ตอนเลือกเพจถูกต้อง |

---

## ความปลอดภัย

- ไฟล์ `config/platforms.json` ถูก **gitignore** อยู่แล้ว — token จะไม่ถูก commit ขึ้น GitHub
- API Key อ่านจาก environment variable ไม่ได้ hardcode ในโค้ด
- ใช้ `platforms.example.json` เป็น template ตอนแชร์โปรเจค
- App Secret ของ Facebook ห้ามใส่ในโค้ดเด็ดขาด
