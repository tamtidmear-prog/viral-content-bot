# Self Fact-Check — 2026-08-16 กลางวัน (Prism Chronicle)

> ตรวจเองทั้งกระบวนการ ไม่ส่ง Nexus — ตาม standing instruction 2026-08-09
> (memory: self-check-no-nexus-review — ห้ามโยนงาน/รายงานให้ Nexus จนกว่า Master J สั่งเปลี่ยน)

## หัวข้อ
Pillar 3: How-To — 5 เทคนิค prompt engineering จากคู่มือทางการ Anthropic + OpenAI
(เลือกเพื่อ balance pillar: P1 ทำเช้านี้แล้ว ห่าง 0 slot, P3 ห่างสุด 2 slot)

## แหล่งข้อมูล (primary, verify ตรงด้วย WebFetch)
1. Anthropic Blog — "Best practices for prompt engineering for 2026"
   https://claude.com/blog/best-practices-for-prompt-engineering — เผยแพร่ 10 พ.ย. 2025
2. OpenAI API Docs — "Prompt engineering"
   https://platform.openai.com/docs/guides/prompt-engineering (redirect → developers.openai.com/api/docs/guides/prompt-engineering)

## Quote verification (rule k — เปิด primary ก่อนใส่เครื่องหมายคำพูด)
ทั้ง 3 quote ที่ใช้ใน draft ยืนยันคำต่อคำกับ WebFetch เนื้อจริงของ claude.com แล้ว:
1. "State it directly. Use simple language that states exactly what you want" ✅ ตรง
2. "Analyze this financial data and identify trends. If the data is insufficient to draw conclusions, say so" ✅ ตรง (อยู่ใน section "Give permission to Claude to express uncertainty")
3. "The best prompt isn't the longest or most complex. It's the one that achieves your goals reliably with the minimum necessary structure" ✅ ตรง (section "Final words of advice")
วันที่เผยแพร่ 10 พ.ย. 2025 ✅ ยืนยันตรง

ส่วนที่มาจาก OpenAI (แบ่งงานซับซ้อนเป็นงานย่อย) — เป็นการ**แปลความ ไม่ใส่ quote mark** เพราะไม่ได้ verify คำต่อคำเป็นภาษาอังกฤษต้นฉบับ (rule k: search-summary ≠ quote)

## ตัวเลข/สถิติ
ไม่มีตัวเลขสถิติใดๆ ในเนื้อหา (ตัดตัวเลข "ลด hallucination 40-60%" ที่มาจาก WebSearch summary ไม่ใช่ primary ออกจาก draft ตั้งแต่แรก — ไม่ผ่าน rule k)

## Fact-attribution
- เทคนิค 1,2,4 + ส่วน "สิ่งที่ไม่จำเป็นแล้ว" (role prompting, XML tags) → มาจาก Anthropic เท่านั้น ระบุถูกกล่อง
- เทคนิค 3 (few-shot) → ทั้งสองแหล่งพูดตรงกัน ระบุ "ทั้ง Anthropic และ OpenAI พูดตรงกัน" ถูกต้อง
- เทคนิค 5 (แบ่งงานย่อย) → ระบุเป็นของ OpenAI ถูกต้อง

## Marketing claims / overstate check
ไม่มี — เนื้อหาเป็นคำแนะนำเชิงเทคนิคจากคู่มือทางการ ไม่มีการเปรียบเทียบ/แข่งขันระหว่างบริษัท

## อื่นๆ
- ไม่มีชื่อ Master J ในเนื้อหา ✅
- ไม่มี credentials/secrets ✅
- ความยาว caption: 3,759 ตัวอักษร (≥3,000 ผ่าน) ✅

## Verdict
**PASS — ไม่มีจุดต้องแก้** เนื้อหาผ่าน self-check ครบทุกข้อ
