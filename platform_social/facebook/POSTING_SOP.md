# Prism Chronicle — Standard Operating Procedure (SOP)
# ทำตาม step นี้ทุกครั้งที่โพส ห้ามข้ามหรือสลับลำดับ

**อัปเดตล่าสุด:** 2026-05-26 (จากโพสกลางวันจริงที่ทดสอบแล้ว)

---

## SCHEDULE

| โพส | เวลา | เนื้อหา |
|-----|------|---------|
| เช้า | 07:00–09:00 | AI news รอบเช้า |
| กลางวัน | 12:00–13:00 | AI news รอบกลางวัน |
| เย็น | 18:00–20:00 | AI news รอบเย็น |

---

## STEP-BY-STEP FLOW (ทำตามลำดับเสมอ)

### STEP 1 — สร้าง Notebook
```bash
notebooklm create "Prism AI News — [ช่วงเวลา] YYYY-MM-DD" --json
# จด notebook ID ไว้
notebooklm use <notebook_id>
```

### STEP 2 — Research (เพิ่ม sources)
```bash
# เพิ่มทุก topic พร้อมกัน (deep mode + no-wait)
notebooklm source add-research "หัวข้อ 1" --mode deep --no-wait
notebooklm source add-research "หัวข้อ 2" --mode deep --no-wait
notebooklm source add-research "หัวข้อ 3" --mode deep --no-wait

# รอให้เสร็จทั้งหมด
notebooklm research wait --import-all
```

### STEP 3 — Draft จาก Sources
```bash
notebooklm ask "สรุปข่าว AI วันนี้เป็น content โพส Facebook ภาษาไทย
- ≥3,000 ตัวอักษร (แต่ไม่เกิน 4,500)
- คนทั่วไปเข้าใจ ไม่ใช้ศัพท์เทคนิคเยอะ
- บอกว่าใช้ประโยชน์ได้อย่างไรในชีวิตจริง
- emoji + ━━━ แบ่ง section
- จบด้วย: ✍️ Prism_Of_Novus | AI Oracle · Novus Family"
```
บันทึกไว้ที่ `platform_social/facebook/prism-chronicle/drafts/YYYY-MM-DD_[ช่วงเวลา]_ai_news.md`

### STEP 4 — Generate Infographic
```bash
notebooklm generate infographic --style kawaii --orientation landscape --detail standard --json
# จด artifact_id
notebooklm artifact wait <artifact_id> -n <notebook_id> --timeout 600
notebooklm download infographic "platform_social/facebook/prism-chronicle/media/YYYY-MM-DD_[ช่วงเวลา]_infographic.png" \
  -a <artifact_id> -n <notebook_id>
```

### STEP 5 — Generate Podcast (parallel กับ STEP 4)
```bash
notebooklm generate audio --format deep-dive --json
# รันใน background ดาวน์โหลดทีหลัง
```

### STEP 6 — Codex Fact-Check (ผ่าน Nexus)
```bash
curl -s -X POST http://localhost:3456/api/send \
  -H 'Content-Type: application/json' \
  -d '{"target": "nexus", "text": "[prism→nexus] ขอ Codex fact-check\nFacts:\n1. ...\n2. ..."}'
# รอ reply จาก Nexus ใน maw หรือ Discord
```

### STEP 7 — แก้ Draft ตาม Fact-Check
- แก้ทุกจุดที่ Nexus/Codex ระบุ
- verify เองด้วยถ้าไม่แน่ใจ (trust but verify)
- อัปเดตไฟล์ draft

### STEP 8 — ส่ง Final Audit ให้ Nexus
```bash
cp platform_social/facebook/prism-chronicle/drafts/YYYY-MM-DD_[ช่วงเวลา]_ai_news.md \
   ψ/inbox/from-prism/YYYY-MM-DD_[ช่วงเวลา]_draft_vN.md

curl -s -X POST http://localhost:3456/api/send \
  -H 'Content-Type: application/json' \
  -d '{"target": "nexus", "text": "[prism→nexus] Draft vN แก้ครบแล้ว ส่ง final review\nอยู่ที่: ψ/inbox/from-prism/..."}'
# รอ "FINAL OK" จาก Nexus
```

### STEP 9 — Master J อนุมัติ
แสดง draft สุดท้าย + บอกขนาด infographic → รอ Master J approve

### STEP 10 — โพส (หลังได้รับอนุมัติเท่านั้น)
```bash
PAGE_ID=$(cat viral-content-bot/config/platforms.json | \
  python3 -c "import json,sys; d=json.load(sys.stdin); print(d['facebook']['pages']['prism_chronicle']['id'])")
TOKEN=$(cat viral-content-bot/config/platforms.json | \
  python3 -c "import json,sys; d=json.load(sys.stdin); print(d['facebook']['pages']['prism_chronicle']['access_token'])")
MSG=$(cat platform_social/facebook/prism-chronicle/drafts/YYYY-MM-DD_[ช่วงเวลา]_ai_news.md)
IMG="platform_social/facebook/prism-chronicle/media/YYYY-MM-DD_[ช่วงเวลา]_infographic.png"

curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "message=${MSG}" \
  -F "source=@${IMG};type=image/png" \
  -F "access_token=${TOKEN}"
# บันทึก post_id ที่ได้
```

### STEP 11 — Log + Cleanup
```bash
# ย้าย draft ไป posted/
mv platform_social/facebook/prism-chronicle/drafts/YYYY-MM-DD_[ช่วงเวลา]_ai_news.md \
   platform_social/facebook/prism-chronicle/posted/

# บันทึก log
echo "- post_id: xxx | หัวข้อ: xxx | ตัวอักษร: xxx" \
  >> platform_social/facebook/prism-chronicle/logs/YYYY-MM-DD_daily.md
```

### STEP 12 — Notify Nexus + cc Master J
```bash
curl -s -X POST http://localhost:3456/api/send \
  -H 'Content-Type: application/json' \
  -d '{"target": "nexus", "text": "[prism→nexus] โพส[ช่วงเวลา] สำเร็จ ✅\npost_id: ...\ncc Master J"}'
```

---

## กฎห้ามลืม

- ❌ ห้ามโพสโดยไม่ผ่าน Master J อนุมัติ
- ❌ ห้ามข้าม Codex fact-check
- ❌ ห้ามข้าม Nexus final audit
- ❌ ห้ามตอบ comment โดยไม่ได้รับอนุมัติ
- ✅ บทความ ≥3,000 ตัวอักษร
- ✅ infographic ทุกโพส (kawaii landscape)
- ✅ ทุกอย่างต้องสอดคล้องกัน (text/รูป/podcast จาก sources เดียวกัน)
- ✅ log ทุกโพสใน daily.md

