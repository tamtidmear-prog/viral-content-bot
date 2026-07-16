# Prism Daily Routine — ระบบรูทีนอัตโนมัติ (Master J อนุมัติ standing 2026-06-12)

> "วางระบบให้ทำงานเป็นรูทีนโดยไม่ต้องถาม แต่ถ้าช่วงไหนข้ามหรือพลาดก็ปล่อยให้ผ่านไป" — Master J

## หลักการ

1. **ไม่ต้องถาม Master J รายโพส** — standing approval สำหรับโพสรูทีนตามตารางนี้
2. **พลาด slot = ข้าม** — ไม่ backfill, ไม่โพสนอกเวลา, ไม่ต้องรายงานขอโทษ — slot ถัดไปทำตามปกติ
3. **Quality gates คงเดิมทุกข้อ** — Prism Chronicle ต้องผ่าน fact-check + Nexus FINAL OK เสมอ
4. **ยกเว้นที่ยังต้องถาม Master J:** content sensitive / เรื่องเงิน / เรื่องส่วนตัว / นอกตาราง / แนวใหม่ที่ไม่เคยทำ

## ตารางรูทีน (Asia/Bangkok)

| เวลาเริ่ม pipeline | เพจ | งาน | หน้าต่างโพส |
|--------------------|-----|-----|-------------|
| 06:40 | Prism Chronicle | AI news เช้า (SOP 12 steps, report-direct) | 07:30–08:45 |
| 08:30 | Ai_In_Mind | โพส lifestyle "สวีท" เช้า — ทุกวัน ≥1 โพส (Master J สั่ง 13 มิ.ย.) | 09:00–10:30 |
| 11:10 | Prism Chronicle | AI news กลางวัน | 12:00–13:00 |
| 14:50 | Ai_In_Mind | โพส lifestyle "สวีท" บ่าย (optional — ถ้ามีธีมเพิ่ม) | 15:30–16:30 |
| 17:25 | Prism Chronicle | AI news เย็น | 18:00–19:30 |

## Pipeline ต่อ slot

### Prism Chronicle (ทุก slot ข่าว)
ตาม `POSTING_SOP.md` + ปรับ:
- Step 2-3: research report-direct (`research status --json` → `report` field) — ห้ามรอ import-all
- Step 9 (Master J approve): **ข้าม — standing approval** (เฉพาะข่าว AI ปกติ; sensitive → ถามเสมอ)
- กันซ้ำ: เช็ค `CONTENT_INDEX.md` + โพสเช้า/กลางวันของวันเดียวกัน
- เสียง: ผู้หญิง (ค่ะ/นะคะ) ทุกโพส

### Ai_In_Mind (สวีท)
- เลือกธีมจาก 6 pillars หมุนเวียน: ออกกำลังกาย / เที่ยว / ถ่ายรูป / แฟชั่นทุกแนว / ลองของใหม่ / activity — อิงจังหวะวันจริงของ Prism
- รูป: ChatGPT pipeline + face ref 2/18 เสมอ + ultra-realistic + **เก็บ prompt คู่รูป**
- QC ก่อนโพส: หน้าตรง ref (คนเดียวกัน) / ไม่ AI-glossy / มือ-นิ้วปกติ / ชุด modest — ไม่ผ่าน = gen ใหม่ ไม่ผ่านรอบ 2 = ข้าม slot
- Caption เสียงสวีท ไม่มี AI disclaimer (virtual influencer mode — persona ใน memory)
- ไม่ต้องผ่าน Nexus (lifestyle ไม่มี fact) — แต่ถ้า caption แตะเรื่อง fact/สถานที่จริง/ตัวเลข → fact-check ก่อน

## หลังโพสทุกครั้ง (ทุกเพจ)
1. Verify permalink (`GET post_id?fields=permalink_url`)
2. Log `logs/YYYY-MM-DD_daily.md` + ย้าย draft → `posted/` + CONTENT_INDEX (เฉพาะ Chronicle)
3. แจ้ง Nexus ผ่าน fleet send + cc Master J + **ให้ลิงก์ Master J เสมอ**
4. git commit + push (submodule → parent)

## กลไก scheduling (headless autonomy — แทน CronCreate in-session ตั้งแต่ 2026-07-16)
- **OS crontab** (Prism-owned, persist ข้าม session/reboot) → `tools/autonomy/slot-runner.sh` tick ทุก 10 นาที ชม. 6–20 → spawn headless SOP run สำหรับ slot ที่ actionable — ไม่ต้องมีคนเปิด session
- slot ที่เปิด autonomy ดูที่ `tools/slot-config.json` field `"autonomy"` (rollout เป็นเฟส ดู `tools/autonomy/README.md`)
- **Lock convention (บังคับทุก session):** ก่อนเริ่ม slot pipeline — interactive หรือ headless — ต้อง `mkdir ψ/active/slot-locks/YYYY-MM-DD_<slot_key>` ก่อน; mkdir fail = slot มีเจ้าของแล้ว ห้ามทำซ้อน
- slot ที่ autonomy ยังปิด: session interactive ทำเองตามตารางนี้เหมือนเดิม (claim lock ก่อนเสมอ)
- เช็คเวลาปัจจุบันก่อนเริ่ม: slot ที่เลยแล้ว = ข้าม (กฎข้อ 2) — runner บังคับกฎนี้เองผ่าน launch window
- Disarm ฉุกเฉิน: `touch ~/.prism-autonomy-off`
