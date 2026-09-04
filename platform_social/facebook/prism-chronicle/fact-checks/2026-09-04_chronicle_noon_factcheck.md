# Self Fact-Check — Chronicle Noon 2026-09-04

> ตรวจเองทั้งกระบวนการตาม standing instruction 9 ส.ค. 2026 (ห้ามส่ง Nexus) — memory `self-check-no-nexus-review`
> หัวข้อ: Pillar 3 (How-To) — 5 เทคนิคเขียน prompt สร้างภาพ AI (ChatGPT Images + Gemini Nano Banana Pro)

## Pillar-balance check
- 09-01 กลางวัน = Pillar 2, 09-02 = พลาด slot (ไม่มีโพส), 09-03 กลางวัน = Pillar 1
- P1 ติดกันแค่ 1 slot (09-03) — แต่เพื่อไม่ให้ครบ ≥2 ตามกฎ เลือกสลับเป็น Pillar 3 วันนี้ (How-To ล่าสุดคือ 08-28 — ห่างสุดในบรรดา 3 pillar) ✅

## Dedup check (CONTENT_INDEX.md เต็มไฟล์)
- ไม่พบหัวข้อ "เขียน prompt สร้างภาพ AI" มาก่อน — ใกล้สุดคือ 08-16 "5 เทคนิค prompt engineering" ซึ่งเป็นเรื่อง prompt ข้อความ/LLM ทั่วไป คนละหัวข้อกับ prompt สร้างภาพ ✅ ไม่ซ้ำ

## Claims × Primary source verification

| # | Claim ในโพส | Primary ที่เปิดตรง | ผล |
|---|---|---|---|
| 1 | OpenAI แนะนำเรียง prompt "ฉากหลัง→ตัวแบบ→รายละเอียด→ข้อจำกัด" + แบ่งท่อนสั้นเมื่อซับซ้อน | WebFetch ตรง `developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide` | ตรง (background/scene→subject→key details→constraints; short labeled segments/line breaks) |
| 2 | สเปกกล้อง (เช่น f/2.8) AI ตีความหลวมๆ ใช้คุมโทนไม่ใช่ค่าตรงเป๊ะ | WebFetch เดียวกัน | ตรง ("detailed camera specs may be interpreted loosely...use them mainly for high-level look") |
| 3 | ข้อความในภาพ: ใส่ quote/ALL CAPS, สะกดคำยากทีละตัว, quality สูงสำหรับข้อความเล็ก | WebFetch เดียวกัน | ตรง |
| 4 | ตัวอย่างแก้ทีละจุด "ทำให้แสงอุ่นขึ้น"/"เอาต้นไม้ต้นที่เกินออก" | WebFetch เดียวกัน | ตรง (คำต่อคำ "make lighting warmer" / "remove the extra tree") — ตัดตัวอย่างอื่นที่ verify ไม่ได้ (openai.com/index/introducing-4o-image-generation/ บล็อก 403) ออกจาก draft แล้ว |
| 5 | Google: 5 องค์ประกอบ subject/composition/action/location/style | WebFetch ตรง `blog.google/products-and-platforms/products/gemini/prompting-tips-nano-banana-pro/` | ตรง |
| 6 | ตัวอย่างกล้อง "มุมกล้องต่ำ ระยะชัดตื้น f/1.8" + แสง "golden hour ทำเงายาว" | WebFetch เดียวกัน | ตรงคำต่อคำ |
| 7 | ตัวอย่างข้อความในภาพ "URBAN EXPLORER" ตัวหนาสีขาว sans-serif | WebFetch เดียวกัน | ตรงคำต่อคำ |
| 8 | ข้อจำกัดที่ Google ยอมรับเอง: ข้อความเล็กเพี้ยนได้, ต้องตรวจข้อเท็จจริง, การแปลอาจผิดไวยากรณ์ | WebFetch เดียวกัน | ตรง |
| 9 | Google Cloud: หัวข้อ "Prompting like a Creative Director" — "หยุดพิมพ์คีย์เวิร์ด เริ่มกำกับฉากเอง" | WebFetch ตรง `cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana` | ตรง — **แก้ draft แล้ว**: ตอนแรกเขียนว่า Google ใช้คำ "tag soup" (มาจาก WebSearch summary ไม่ใช่ primary) → เปิด primary ตรงพบว่าไม่มีคำนี้จริง คำจริงคือ "stop typing keywords and start directing the scene" → แก้ไขให้ตรง source แล้ว (rule k) |

## กฎ verify-extensions ที่ใช้
- **rule k (search-summary ≠ quote):** เปิด primary ตรงทุกจุดที่ใส่ quote/ตัวอย่างเฉพาะเจาะจง — จับได้ 1 จุดที่ผิด (tag soup) ก่อนโพส แก้แล้ว
- **rule h:** openai.com/index/introducing-4o-image-generation/ บล็อก 403 ที่เครื่องนี้ → ไม่ยืนยันได้ → ตัดตัวอย่างที่พึ่ง URL นั้นออกจาก draft แทนที่จะเดา
- ไม่มี claim เรื่องตัวเลข/วันที่ที่ยืนยันไม่ได้ (ตัดเรื่อง "ChatGPT Images 2.0 เปิดตัว 21 เม.ย. 2026" ออกตั้งแต่แรก เพราะมาจากแหล่งรอง CometAPI ไม่ใช่ primary)

## สรุป
ทุก claim ที่เหลือใน draft ผ่าน verify กับ primary source ตรง ไม่มี quote ที่ไม่ยืนยัน ไม่มีตัวเลข/วันที่ที่พึ่งแหล่งรอง เนื้อหาไม่ sensitive/การเงิน/ส่วนตัว — ผ่านเกณฑ์โพสตามปกติ

**FINAL OK**
