# Viral Content Bot

บอกหัวข้อ → AI สร้าง content → โพส Facebook อัตโนมัติ

---

## สารบัญ

1. [ติดตั้ง](#ติดตั้ง)
2. [ตั้งค่าก่อนใช้งาน](#ตั้งค่าก่อนใช้งาน)
3. [วิธีใช้งาน](#วิธีใช้งาน)
4. [ตัวอย่างการใช้งาน](#ตัวอย่างการใช้งาน)
5. [Template หมวดหมู่](#template-หมวดหมู่)
6. [สร้าง Template ใหม่](#สร้าง-template-ใหม่)
7. [เปลี่ยน Facebook Page](#เปลี่ยน-facebook-page)
8. [ปรับแต่ง AI](#ปรับแต่ง-ai)
9. [Output ที่ได้](#output-ที่ได้)
10. [แก้ปัญหา](#แก้ปัญหา)

---

## ติดตั้ง

```bash
cd ~/Oracle_Project/Prism/viral-content-bot
bun install
```

---

## ตั้งค่าก่อนใช้งาน

### 1. API Key (ต้องมี)

```bash
# Groq — ใช้สร้าง caption/hashtag (ฟรี)
export GROQ_API_KEY="gsk_xxxxxxxxxxxx"

# หรือเก็บใน pass vault
pass insert nexus/groq_api_key
```

สมัคร Groq API Key ได้ที่: https://console.groq.com/keys

### 2. Facebook Page Token (ต้องมี — ถ้าจะโพส)

ไฟล์: `config/platforms.json`

```json
{
  "facebook": {
    "enabled": true,
    "page_id": "108423905655889",
    "access_token": "EAADKWzVD994BR...",
    "api_version": "v25.0",
    "_comment": "ชื่อ page ของคุณ"
  }
}
```

**วิธีได้ Token:**
1. ไปที่ https://developers.facebook.com/tools/explorer/
2. เลือก App → Mamipogo
3. เลือก permissions: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`
4. กด "Generate Access Token" → อนุญาตเพจที่ต้องการ
5. Query: `me/accounts?fields=id,name,access_token` → กด "ส่ง"
6. copy `id` และ `access_token` ของเพจที่ต้องการใส่ใน platforms.json

**ถ้าเพจไม่ขึ้นใน me/accounts:**
Query ตรงด้วย page ID: `{page_id}?fields=id,name,access_token`

**สำคัญ:** Token จาก Graph API Explorer หมดอายุภายในไม่กี่ชั่วโมง ต้อง generate ใหม่ทุกวันที่ใช้

### 3. Image Generation (ไม่บังคับ)

```bash
export GEMINI_API_KEY="AIzaSy..."
```

ถ้าไม่มี → ระบบโพสแค่ caption (ไม่มีรูป) ยังทำงานได้ปกติ

---

## วิธีใช้งาน

```bash
# รูปแบบ
GROQ_API_KEY=$(pass nexus/groq_api_key) bun run src/index.ts "หัวข้อ"

# หรือ export ไว้ก่อน
export GROQ_API_KEY="gsk_xxx"
bun run src/index.ts "หัวข้อ"
```

**Flow การทำงาน:**
```
หัวข้อ → AI วิเคราะห์ → สร้าง caption + hashtag → สร้างรูป → โพส Facebook
         (1-2 วินาที)                                            (รวม ~5 วินาที)
```

---

## ตัวอย่างการใช้งาน

```bash
# โพสเรื่องเกมส์ (จับ template gaming อัตโนมัติ)
bun run src/index.ts "เกมส์ใหม่น่าเล่น 2026"

# โพสเรื่องการเงิน (จับ template finance อัตโนมัติ)
bun run src/index.ts "วิธีออมเงิน 50-30-20"

# โพสเรื่องท่องเที่ยว (จับ template lifestyle อัตโนมัติ)
bun run src/index.ts "ที่เที่ยวเชียงใหม่หน้าฝน"

# หัวข้อทั่วไป (ไม่ตรง template — ใช้ default prompt)
bun run src/index.ts "AI กับชีวิตประจำวัน"

# หัวข้อภาษาอังกฤษก็ได้
bun run src/index.ts "Top 5 productivity apps for 2026"
```

---

## Template หมวดหมู่

ระบบจับ template อัตโนมัติจาก keyword ในหัวข้อ:

| Template | Keywords | Tone |
|----------|----------|------|
| **gaming** | เกมส์, เกม, gaming, esports, game | สนุก viral |
| **finance** | การเงิน, ออมเงิน, ลงทุน, ปลดหนี้, เงิน | น่าเชื่อถือ practical |
| **lifestyle** | ไลฟ์สไตล์, อาหาร, ท่องเที่ยว, สุขภาพ | อบอุ่น แรงบันดาลใจ |

ถ้าหัวข้อไม่ตรง keyword ไหน → ใช้ default prompt (ยังทำงานได้)

---

## สร้าง Template ใหม่

สร้างไฟล์ JSON ใน `config/templates/`:

```bash
# ตัวอย่าง: config/templates/tech.json
```

```json
{
  "name": "tech",
  "keywords": ["เทคโนโลยี", "tech", "AI", "gadget", "แอป"],
  "description": "Content เทคโนโลยี AI gadget",
  "system_prompt": "คุณเป็นนักเขียน tech content ที่อธิบายเรื่องยากให้ง่าย เขียนภาษาไทย สนุก ทันสมัย",
  "tone": "smart-casual",
  "hashtags_base": ["#เทคโนโลยี", "#tech", "#AI"],
  "image_style": "modern tech aesthetic, clean design, futuristic"
}
```

**ฟิลด์ที่ต้องมี:**
- `name` — ชื่อ template (ไม่ซ้ำกัน)
- `keywords` — คำที่ใช้จับ template (ไทย+อังกฤษ)
- `description` — อธิบายสั้นๆ
- `system_prompt` — บอก AI ว่าเขียนแบบไหน
- `tone` — อารมณ์ของ content
- `hashtags_base` — hashtag พื้นฐานที่ใส่ทุกโพส
- `image_style` — สไตล์รูปที่ต้องการ

บันทึกแล้วใช้ได้เลย ไม่ต้อง restart

---

## เปลี่ยน Facebook Page

แก้ `config/platforms.json`:

```json
{
  "facebook": {
    "enabled": true,
    "page_id": "ID_ของเพจ",
    "access_token": "TOKEN_ของเพจนั้น",
    "api_version": "v25.0",
    "_comment": "ชื่อเพจ"
  }
}
```

**Page ที่ใช้ได้ (token ต้อง generate ใหม่ทุกวัน):**

| Page | ID |
|------|----|
| Ai_In_Mind | 108423905655889 |
| Forex EAI Expert | 811730625603539 |
| Cakekhunaoy By Sweetjeed | 137411833080593 |

---

## ปรับแต่ง AI

แก้ `config/app.json`:

```json
{
  "ai": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "language": "th",
    "max_tokens": 1024
  },
  "defaults": {
    "content_type": "auto",
    "tone": "viral-engaging",
    "hashtag_count": 8,
    "output_dir": "./output"
  }
}
```

| ตั้งค่า | ค่าที่เปลี่ยนได้ | ผล |
|---------|-----------------|-----|
| `language` | `"th"` / `"en"` | ภาษา caption |
| `hashtag_count` | 5-15 | จำนวน hashtag |
| `tone` | `"viral-engaging"` / `"professional"` / `"casual"` | อารมณ์เริ่มต้น |
| `model` | `"llama-3.3-70b-versatile"` | model ที่ใช้ |

---

## Output ที่ได้

ทุกครั้งที่รัน จะสร้าง folder ใน `output/`:

```
output/2026-05-25_AI_กับชีวิตประจำวัน/
├── brief.json         # ผลวิเคราะห์หัวข้อ (type, template ที่ใช้)
├── caption.txt        # caption ที่ AI สร้าง
├── hashtags.txt       # hashtag ทั้งหมด
├── image-prompt.txt   # prompt สำหรับสร้างรูป
├── image.png          # รูปที่ AI สร้าง (ถ้ามี)
├── post-result.json   # ผลโพส (URL, สำเร็จ/ล้มเหลว)
└── full-log.json      # log รวมทุก step
```

---

## แก้ปัญหา

### Token หมดอายุ
```
Error: Session has expired
```
→ ไป Graph API Explorer generate token ใหม่ แล้วใส่ใน `config/platforms.json`

### GROQ_API_KEY ไม่มี
```
Error: GROQ_API_KEY not set
```
→ `export GROQ_API_KEY="gsk_xxx"` หรือ `GROQ_API_KEY=$(pass nexus/groq_api_key) bun run ...`

### รูปสร้างไม่ได้
```
[Image] สร้างรูปไม่ได้: GEMINI_API_KEY not set
```
→ ไม่ blocking — ระบบโพสแค่ caption ได้ ถ้าต้องการรูปให้ set `GEMINI_API_KEY`

### โพสไม่ขึ้น
```
[Publish] Facebook ล้มเหลว
```
→ เช็ค:
1. Token หมดอายุหรือเปล่า
2. page_id ถูกไหม
3. permissions ครบไหม (`pages_manage_posts`)

### Template ไม่จับ
→ เช็ค `keywords` ใน template ว่าตรงกับคำในหัวข้อไหม (ต้องตรงทั้งคำ ไม่ใช่ substring)

---

## โครงสร้างโปรเจค

```
viral-content-bot/
├── config/
│   ├── app.json              # ตั้งค่า AI + defaults
│   ├── platforms.json        # Facebook token (gitignored)
│   └── templates/            # prompt templates
│       ├── gaming.json
│       ├── finance.json
│       └── lifestyle.json
├── src/
│   ├── index.ts              # CLI entry point
│   ├── brain.ts              # AI content generation
│   ├── image.ts              # Image generation
│   ├── logger.ts             # Output file management
│   └── publisher/
│       ├── index.ts          # Platform router
│       └── facebook.ts       # Facebook Graph API
├── output/                   # ผลลัพธ์ทุกครั้งที่รัน
├── package.json
└── README.md                 # ไฟล์นี้
```
