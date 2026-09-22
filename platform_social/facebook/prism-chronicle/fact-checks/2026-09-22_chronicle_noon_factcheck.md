# Self Fact-Check — Chronicle กลางวัน 2026-09-22

> ตาม standing instruction 9 ส.ค. 2026: ไม่ส่งให้ Nexus review แล้ว — self-check เอง (memory: self-check-no-nexus-review)
> หัวข้อ: กฎของพาร์กินสัน (Parkinson's Law) — Pillar 2 (วิธีคิด)

## ⚠️ Pivot note (เกิดจริงระหว่างทำงาน)
ตอนแรกเลือกหัวข้อ **Goodhart's Law** — เขียนดราฟท์+infographic เสร็จแล้ว แต่รัน `pre-post-checklist.sh chronicle` (Step 4 ตามคำสั่ง headless) แสดง log ว่า 15 ก.ย. เคยมี dedup miss กับหัวข้อนี้มาก่อน: "Goodhart's Law ซ้ำกับ 2026-08-01" → grep `Goodhart|กู๊ดฮาร์ต` ใน CONTENT_INDEX.md ยืนยันพบจริงที่บรรทัด 153/191/208 → **ทิ้งหัวข้อ Goodhart's Law ทันที ไม่โพส** เปลี่ยนเป็น Parkinson's Law แทน (grep ยืนยันไม่พบ "Parkinson|พาร์กินสัน" ใน CONTENT_INDEX.md ก่อนเริ่มเขียนใหม่)
เหตุผลเลือก Pillar 2 แทน AI news: 21 ก.ย. กลางวัน = Pillar 1 (ติดกัน 1 slot จาก 18 ก.ย.=P2) — ทำ P1 ซ้ำวันนี้จะกลายเป็น P1 ติดกัน 2 slot ผิดกฎ balance → สลับมา P2

## Claims + Sources

1. **C. Northcote Parkinson นักประวัติศาสตร์ทหารเรือชาวอังกฤษ ตีพิมพ์เรียงความครั้งแรกใน The Economist 19 พ.ย. 1955**
   - Source: WebFetch https://en.wikipedia.org/wiki/Parkinson%27s_law — ตรง

2. **รวมเล่มเป็นหนังสือ "Parkinson's Law: The Pursuit of Progress" ปี 1957 (สหรัฐฯ, Houghton Mifflin) / 1958 (อังกฤษ, John Murray)**
   - Source: เดียวกับข้อ 1 — ตรง

3. **Quote**: "Work expands so as to fill the time available for its completion"
   - Source: เดียวกับข้อ 1 — ตรงคำต่อคำ

4. **ตัวเลข Colonial Office staff: 1935=372, 1939=450, 1943=817, 1947=1,139, 1954=1,661**
   - WebSearch cross-check ก่อน → ไปเปิด primary จริง: WebFetch https://www.panarchy.org/parkinson/parkinsonlaw.html (host เรียงความต้นฉบับเต็ม) — ตัวเลขทั้ง 5 ปีตรงกันเป๊ะกับที่ WebSearch สรุปมา ไม่มีตัวเลขไหนถูกปัดเศษ/เปลี่ยน

5. **เพิ่มขึ้น >4 เท่าใน 19 ปี (372→1,661)**
   - คำนวณเอง 1661/372 = 4.46 เท่า — ระบุเป็น "มากกว่า 4 เท่า" ไม่ปัดเป็นตัวเลขเจาะจงเกินที่คำนวณได้จริง

6. **"Law of Triviality" (bikeshedding) อยู่ในเรียงความเดียวกัน**
   - Source: เดียวกับข้อ 1 — ตรง

## Dedup Check
- grep "Parkinson\|พาร์กินสัน" ใน CONTENT_INDEX.md → ไม่พบ ยืนยันก่อนเขียนดราฟท์ใหม่
- grep "Goodhart\|กู๊ดฮาร์ต" ยืนยันซ้ำจริง (2026-08-01) → เหตุผลที่เปลี่ยนหัวข้อ
- Pillar 2 ล่าสุด: 18 ก.ย. (Hofstadter's Law), 12 ก.ย. (Hanlon's Razor), 6 ก.ย. (Chesterton's Fence) — คนละหลักคิด ไม่ซ้ำ

## Sensitive check
- ไม่มีเนื้อหาเงิน/ส่วนตัว/การเมือง — เนื้อหาเชิงประวัติศาสตร์ความคิด+การบริหารเวลา ปลอดภัยตามเกณฑ์ routine standing approval

## Numbers-in-caption check (เตรียมสำหรับ gate e)
ตัวเลขในภาพ infographic: 1955, 1935, 1939, 1943, 1947, 1954 (staff numbers) — ทุกตัวต้องปรากฏใน caption ด้วย → caption มีครบ 1955/1935/1939/1943/1947/1954 และตัวเลข staff 372/450/817/1,139/1,661 อยู่แล้ว

FINAL OK
