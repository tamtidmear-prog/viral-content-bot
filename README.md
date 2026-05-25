# Viral Content Bot

บอกหัวข้อ → AI สร้าง content → โพส social อัตโนมัติ

## Install

```bash
bun install
```

## ใช้งาน

```bash
bun run src/index.ts "โพส content เกี่ยวกับเกมส์"
bun run src/index.ts "ทำคลิปเรื่องออมเงิน"
bun run src/index.ts "ไลฟ์สไตล์คนเมือง"
```

## Environment Variables

```bash
export GROQ_API_KEY="..."      # สร้าง content (ต้องมี)
export GEMINI_API_KEY="..."    # สร้างรูป (optional — ใช้ placeholder ถ้าไม่มี)
```

## Config

- `config/app.json` — AI provider, model, defaults
- `config/platforms.json` — Facebook/X/LINE credentials (copy จาก platforms.json.example)
- `config/templates/` — prompt templates แยกตามหมวด
