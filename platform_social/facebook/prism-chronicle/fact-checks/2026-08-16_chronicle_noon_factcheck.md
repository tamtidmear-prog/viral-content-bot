# Fact-check — chronicle_noon 16 ส.ค. 2026 (self-check, standing instruction 2026-08-09)

หัวข้อ: How-To — 5 เทคนิค prompt engineering จากคู่มือทางการ Anthropic + OpenAI (Pillar 3, balance จาก P1 ที่ทำเช้านี้)

## แหล่งข้อมูล (primary, verify ตรงด้วย WebFetch — NotebookLM research ติด CLI bug ambiguous task_id, pivot web search ตาม fallback rule)
1. Anthropic Blog — "Best practices for prompt engineering for 2026" — https://claude.com/blog/best-practices-for-prompt-engineering — เผยแพร่ 10 พ.ย. 2025
2. OpenAI API Docs — "Prompt engineering" — https://platform.openai.com/docs/guides/prompt-engineering (→ developers.openai.com/api/docs/guides/prompt-engineering)

## Quote verification (rule k — เปิด primary ก่อนใส่เครื่องหมายคำพูด)
ทั้ง 3 quote ที่ใช้ใน draft ยืนยันคำต่อคำกับ WebFetch เนื้อจริงของ claude.com แล้ว — ตรงทุกคำ:
1. "State it directly. Use simple language that states exactly what you want" ✅
2. "Analyze this financial data and identify trends. If the data is insufficient to draw conclusions, say so" ✅ (section "Give permission to Claude to express uncertainty")
3. "The best prompt isn't the longest or most complex. It's the one that achieves your goals reliably with the minimum necessary structure" ✅ (section "Final words of advice")
วันที่เผยแพร่ 10 พ.ย. 2025 ✅

ส่วน OpenAI (แบ่งงานซับซ้อนเป็นงานย่อย) — แปลความ ไม่ใส่ quote mark (ไม่ได้ verify คำต่อคำภาษาอังกฤษต้นฉบับ)

## ตัวเลข/สถิติ
ไม่มีตัวเลขสถิติในเนื้อหา — ตัดตัวเลข "ลด hallucination 40-60%" จาก WebSearch summary (ไม่ใช่ primary) ออกตั้งแต่ draft แรก

## Fact-attribution
- เทคนิค 1,2,4 + "สิ่งที่ไม่จำเป็นแล้ว" (role prompting, XML tags) → Anthropic เท่านั้น ระบุถูกกล่อง
- เทคนิค 3 (few-shot) → ทั้งสองแหล่งพูดตรงกัน ระบุถูกต้อง
- เทคนิค 5 (แบ่งงานย่อย) → OpenAI ระบุถูกต้อง

## อื่นๆ
- ไม่มีชื่อ Master J ✅ / ไม่มี credentials/secrets ✅ / caption 3,759 ตัวอักษร (≥3,000) ✅
- Infographic source: ไม่มีตัวเลขสถิติ (มีแค่วันที่ 16 ส.ค. 2026 ซึ่งเป็น date stamp เอกสาร + ลำดับขั้นที่ 1/2/3 ไม่ใช่สถิติ)

## ผลสรุป
ไม่พบข้อผิดพลาด — PASS ครบทุกจุด

Fact-checked by: Prism (self-check ตาม standing instruction "จัดการเรื่องของตัวเองเอง" 2026-08-09)
