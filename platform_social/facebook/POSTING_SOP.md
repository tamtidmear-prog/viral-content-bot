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

### STEP 0 — Review insights โพสก่อนหน้า (เพิ่ม 2026-07-16, Phase C2)
```bash
# ดู metrics ล่าสุด (สร้างโดย tools/insights-pull.py — cron รายวัน)
ls -t prism-chronicle/logs/metrics/*.json | head -1 | xargs cat | python3 -m json.tool | head -40
```
- ดูว่า pillar/format/หัวข้อแบบไหน engagement ดีสุดช่วงหลัง → ใช้ประกอบการเลือกหัวข้อ+รูปแบบวันนี้
- ไม่มีไฟล์ metrics = ข้าม step นี้ได้ (อย่าเสียเวลา) แต่จดใน log ว่าไม่มี

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

# verify หลัง download (smart contract — Paradex pattern 2026-06-13)
IMG="platform_social/facebook/prism-chronicle/media/YYYY-MM-DD_[ช่วงเวลา]_infographic.png"
python3 -c "
import struct
data = open('$IMG','rb').read()
assert data[:8] == b'\x89PNG\r\n\x1a\n', 'Not PNG'
assert data[-8:].hex().find('49454e44ae426082') >= 0, 'IEND missing — re-download'
w = struct.unpack('>I', data[16:20])[0]
h = struct.unpack('>I', data[20:24])[0]
assert w > h, f'Not landscape: {w}x{h}'
print(f'OK: {w}x{h} px, {len(data)} bytes')
"
```

#### STEP 4-FALLBACK — ถ้า notebooklm ใช้ไม่ได้ (เพิ่ม 2026-07-29)

> ใช้เฉพาะเมื่อ `notebooklm list` (**รันตรง ไม่ผ่าน pipe** — rule i) คืน `rc != 0`
> ห้ามเช็คด้วย `notebooklm auth check` — ให้เขียวครบทั้งที่ auth ตาย (rule j)
>
> **ทำไมมี**: 27-29 ก.ค. auth หมดอายุ 43 วัน → Chronicle เงียบ 48 ชม. เสีย 4 slot
> เพราะทั้ง research และ infographic ผูก NBLM ตัวเดียว ขณะที่ AiM เดินต่อได้เพราะใช้ Paradex

```bash
# 1) เขียน source (ไทยได้เต็มที่ — renderer โหลด .ttf เอง ไม่ใช่ AI วาดตัวอักษร)
cat > /tmp/info.json <<'JSON'
{"kicker":"Prism Chronicle · DD ก.ค. 2026",
 "title":"หัวข้อหลัก",
 "bullets":["ประเด็นที่ 1","ประเด็นที่ 2","ประเด็นที่ 3"],
 "footer":"✍️ Prism_Of_Novus | AI Oracle · Novus Family"}
JSON

# 2) render — สคริปต์จะ "ปฏิเสธตัวเอง" ถ้า notebooklm ยังใช้ได้
bash tools/chronicle-infographic-local.sh /tmp/info.json \
  "platform_social/facebook/prism-chronicle/media/YYYY-MM-DD_[ช่วงเวลา]_infographic.png"

# 3) verify ด้วย python block เดียวกับ STEP 4 ข้างบน (เกณฑ์เดิมทุกข้อ)
```

**ข้อจำกัดที่ต้องยอมรับ**: layout เรียบกว่า NBLM มาก — ใช้เมื่อ "โพสเรียบ" ดีกว่า "ไม่โพส" เท่านั้น
NBLM กลับมาเมื่อไหร่ ให้กลับไปใช้ STEP 4 ปกติทันที (guard บังคับอยู่แล้ว)
ส่วน **research** ที่ NBLM เคยทำ ใช้ web search แทนได้ (memory: `notebooklm-research-report-direct`)

### STEP 5 — Generate Podcast (parallel กับ STEP 4)
```bash
notebooklm generate audio --format deep-dive --json
# รันใน background ดาวน์โหลดทีหลัง
```

### STEP 6 — Codex Fact-Check (ผ่าน Nexus)
```bash
# [แก้ 2026-07-25] curl localhost:3456/api/send ไม่มีจริง (http=000 ไม่มี listener + /api/send 404)
# ของเดิมเงียบไม่ error → fact-check request ไม่เคยถึง Nexus โดยไม่มีใครรู้
maw hey nexus_discord:0 "[prism→nexus] ขอ Codex fact-check
Facts:
1. ...
2. ..."
maw peek nexus_discord:0        # verify ว่าถึงจริง ห้ามข้าม
```

### STEP 7 — แก้ Draft ตาม Fact-Check
- แก้ทุกจุดที่ Nexus/Codex ระบุ
- verify เองด้วยถ้าไม่แน่ใจ (trust but verify)
- **Self fact-check ต้อง exact** (บทเรียน S29): ตัวเลขต้องตรง source (72→48hrs), คำเปรียบเทียบห้ามเกินจริง ("drinking water ทั้งโลก" vs "bottled water"), คำศัพท์เฉพาะต้องถูก definition — ห้ามปัดเศษหรือใช้คำกว้างกว่า source
- อัปเดตไฟล์ draft

### STEP 8 — ส่ง Final Audit ให้ Nexus
```bash
cp platform_social/facebook/prism-chronicle/drafts/YYYY-MM-DD_[ช่วงเวลา]_ai_news.md \
   ψ/inbox/from-prism/YYYY-MM-DD_[ช่วงเวลา]_draft_vN.md

maw hey nexus_discord:0 "[prism→nexus] Draft vN แก้ครบแล้ว ส่ง final review
อยู่ที่: ψ/inbox/from-prism/..."
maw peek nexus_discord:0        # verify ว่าถึงจริง
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

# บันทึก prompt record ของ infographic ใน media/prompts/ (ห้ามลืม)
# format: ดู media/prompts/2026-05-29_morning.md เป็นตัวอย่าง
# เก็บ: ชื่อไฟล์, notebook_id, artifact_id, sources, หัวข้อ, วันที่

# บันทึก log
echo "- post_id: xxx | หัวข้อ: xxx | ตัวอักษร: xxx" \
  >> platform_social/facebook/prism-chronicle/logs/YYYY-MM-DD_daily.md

# archive fact-check + FINAL OK ของโพสนี้ (เพิ่ม 2026-07-16 Phase C3 — เดิมกระจายใน maw หาไม่เจอ)
cp ψ/inbox/from-nexus/YYYY-MM-DD_*factcheck*.md ψ/inbox/from-nexus/YYYY-MM-DD_*final-ok*.md \
   platform_social/facebook/prism-chronicle/fact-checks/ 2>/dev/null || true
# ถ้า fact-check มาทาง maw ข้อความ (ไม่ใช่ไฟล์) → เขียนสรุป verdict ลงไฟล์ใหม่ใน fact-checks/ เอง
```

### STEP 12 — Notify Nexus + cc Master J
```bash
maw hey nexus_discord:0 "[prism→nexus] โพส[ช่วงเวลา] สำเร็จ ✅
post_id: ...
cc Master J"
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

