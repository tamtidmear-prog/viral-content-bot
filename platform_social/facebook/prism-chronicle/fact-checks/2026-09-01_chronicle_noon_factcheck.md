# Self fact-check — chronicle_noon 2026-09-01

> ตรวจเองตาม standing instruction 2026-08-09 (Master J: "ไม่ต้องโยนอะไรไปให้ Nexus แล้ว")
> memory: self-check-no-nexus-review — ไม่ส่ง maw hey nexus_discord:0

## หัวข้อ
เทคนิค "5 Whys" (ถามทำไม 5 ครั้ง) — ที่มา, วิธีใช้, กับดักที่พบบ่อย, เชื่อมโยงงาน AI-human (Pillar 2: กระบวนการความคิด)

## Claims + verification

1. **Sakichi Toyoda พัฒนาแนวคิดนี้ขึ้นตั้งแต่ยุค 1930s**
   - Source: WebSearch synthesis (sloww.co, 5xwhys.com, en.wikipedia.org) — สอดคล้องกันทั้งหมด
   - Cross-check: WebFetch https://en.wikipedia.org/wiki/Five_whys โดยตรง — ยืนยัน "Sakichi Toyoda originally developed the modern 5 Whys technique"
   - Verdict: ✅ ตรง

2. **Taiichi Ohno (สถาปนิกหลักของ Toyota Production System) นำมาจัดระบบ + บันทึกในหนังสือของตัวเอง**
   - Source: WebFetch en.wikipedia.org/wiki/Five_whys — "Taiichi Ohno...formalized and popularized the method"
   - Verdict: ✅ ตรง

3. **หนังสือ "Toyota Production System: Beyond Large-Scale Production" ตีพิมพ์ภาษาอังกฤษปี 1988 โดย Productivity Press**
   - Source: WebFetch en.wikipedia.org/wiki/Five_whys — ระบุ ISBN 0-915299-14-3, ปี 1988, สำนักพิมพ์ Productivity Press ตรงกัน
   - Verdict: ✅ ตรง — ใช้เป็น reference ในโพส ไม่ใช่ quote คำต่อคำ

4. **คำพูดของ Ohno ("the basis of Toyota's scientific approach...")**
   - พยายามเปิด primary จริง (global.toyota — HTTP 403, asq.org — HTTP 403, isixsigma.com — HTTP 404) เปิดไม่ได้ทั้งหมด
   - ตาม verify-extensions.md rule k (search-summary ≠ quote): **ไม่ใส่ quote mark ครอบคำนี้ในโพส** — ในดราฟท์เขียนเป็น paraphrase ("Ohno อธิบายว่า...คือรากฐานของแนวทางแบบวิทยาศาสตร์") ไม่มี "..." ล้อมคำพูดตรงในเนื้อโพสจริง — ตรวจแล้วดราฟท์ไม่มี quote mark จุดนี้ ✅

5. **ตัวอย่าง "ระบบแจ้งเตือน queue ล้น" ใน draft**
   - เป็นสถานการณ์สมมติที่สร้างเองเพื่ออธิบายแนวคิด ไม่ใช่เหตุการณ์จริงที่อ้างองค์กร/บริษัทใดๆ — ระบุคำว่า "สมมติสถานการณ์" ไว้ชัดเจนในหัวข้อ ไม่ทำให้เข้าใจผิดว่าเป็นเคสจริง
   - Verdict: ✅ ไม่ใช่ fact claim ที่ต้อง verify (เป็น illustrative example ที่ระบุตัวเองแล้ว)

6. **ไม่ใช้ตัวอย่างคลาสสิก "fuse/pump/bearing" ของ Toyota เพราะ verify ตัวเลขจากปฐมภูมิไม่ได้** (asq.org/isixsigma บล็อก/404) — เลือกตัดออก ใช้ตัวอย่างสมมติแทนตามที่กล่าวข้างต้น

## Dedup check (CONTENT_INDEX.md)
grep "5 Whys" / "ถามทำไม" / "root cause" ใน CONTENT_INDEX.md → ไม่พบหัวข้อซ้ำ
Pillar 2/3 ที่เคยทำ: premortem (30 ส.ค.), 529 error codes (25 ส.ค. เช้า), trust but verify, fact-check 5 ขั้นตอน (23 ส.ค.), memory/deep-research 3 AI เทียบฟีเจอร์ — ไม่ทับกับ 5 Whys

## Pillar rotation check
30 ส.ค. กลางวัน = Pillar 2 (premortem) → 31 ส.ค. กลางวัน = Pillar 1 (AI news) → วันนี้ 1 ก.ย. เลือก Pillar 2 (5 Whys) เพื่อไม่ให้ Pillar 1 ติดกัน 2 slot ตามกฎ ROUTINE.md

## สรุป
ทุก claim ตรวจกับ primary/cross-source แล้ว ไม่มี unverifiable specific ที่หลุดเข้าไปในดราฟท์ (ตัด fuse/pump example ที่ verify ไม่ได้ทิ้งไปแล้ว) — draft พร้อมสำหรับ infographic + final audit
