# Fact-check (self-check) — Chronicle กลางวัน 8 ส.ค. (Lost in the Middle / long-context)

**By:** Prism (self-check ตาม Master J instruction 2026-08-07 — ไม่ route ผ่าน Nexus แล้ว, memory: self-check-no-nexus-review)
**Draft:** `viral-content-bot/platform_social/facebook/prism-chronicle/drafts/2026-08-08_noon_ai_news.md`
**Pillar:** 2 (วิธีคิด) — สลับจาก Pillar 1 ที่ติดกัน 3 slot ตามกฎ Pillar Balance ใน CONTENT_INDEX.md

```
สรุป: 0 FALSE · verify กับ primary source ตรง (arXiv abstract fetch) · ไม่มีตัวเลขเชิงสถิติที่ไม่ยืนยันได้ในดราฟต์
```

## จุดที่ตรวจ

### 1. ชื่อ paper + ผู้เขียน + venue
- Title: "Lost in the Middle: How Language Models Use Long Contexts" ✓ ตรงกับ arXiv 2307.03172 (WebFetch ตรง abstract page)
- Authors: Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang ✓ ตรง
- Venue: TACL (Transactions of the Association for Computational Linguistics) ✓ ตรง
- Draft เขียนว่า "เผยแพร่กรกฎาคม 2023 ... ภายหลังตีพิมพ์ใน TACL" — แก้ไขจากร่างแรกที่เขียนว่า "ปี 2023 ตีพิมพ์ใน TACL" ตรงๆ เพราะ arXiv preprint (ก.ค. 2023) กับ TACL publication เป็นคนละ timestamp — ป้องกัน conflate ปี arXiv กับปีตีพิมพ์จริง (TACL vol. 12 = 2024)
- Draft เขียนว่า "ทีมวิจัยที่มีนักวิจัยจาก Stanford ร่วมอยู่ด้วย" (ไม่ใช่ "ทีม Stanford" เฉยๆ) — เพราะผู้เขียนบางคน (Paranjape/Bevilacqua/Petroni) เป็นนักวิจัยจาก Samaya AI ไม่ใช่ Stanford ทั้งหมด — hedge คำให้ตรงข้อเท็จจริงมากขึ้น ไม่ให้เครดิตผิดสถาบัน

### 2. Methodology — 2 งานทดสอบ
- Multi-document question answering + long-context key-value retrieval ✓ ตรงกับ abstract

### 3. Key finding — U-shaped curve / primacy-recency bias
- "performance is often highest when relevant information occurs at the beginning or end" + U-shaped curve จาก primacy/recency effects ✓ ตรงกับข้อความใน abstract ที่ fetch มา
- ไม่มีโมเดลไหนใน paper รอดพ้นแพทเทิร์นนี้ ✓ ตรง ("no examined model could process relevant information equally well across all positions")

### 4. งานต่อยอด
- "Found in the Middle: Calibrating Positional Attention Bias Improves Long Context Utilization" (2024, arXiv 2406.16008) ✓ มีอยู่จริง ยืนยันด้วย WebSearch — ใช้แค่ชื่อ+การมีอยู่ ไม่อ้างตัวเลขผลลัพธ์ของ paper นี้ (ไม่ได้เปิด primary เต็ม)

### ⚠️ สิ่งที่ตั้งใจ "ไม่ใส่" เพื่อความปลอดภัย
- ไม่มีตัวเลข % accuracy เจาะจง (เช่น "ลดลง X%") — พยายาม fetch PDF เต็มของ Liu et al. 2023 แล้วแต่ระบบดึง text จาก binary PDF ไม่ได้ (WebFetch คืน "cannot extract") และ emergentmind summary ก็ไม่มีตัวเลขละเอียด → เขียนเป็นเชิงคุณภาพ (U-shape, ต้น/ท้ายแม่นกว่ากลาง) แทนการเดาตัวเลข —ตรงกับ rule (k) ห้ามยกตัวเลข/quote ที่ยืนยันไม่ได้จาก primary
- ไม่อ้างว่าโมเดลปี 2025-2026 (Claude/GPT รุ่นปัจจุบัน) ยังมีปัญหานี้แน่นอน — ไม่มีแหล่งปี 2026 ที่ verify ได้เพียงพอ (แหล่งที่เจอจาก WebSearch เป็น blog สรุปที่ไม่มี primary รองรับตัวเลข) → เขียนกรอบเป็น "structural pattern ที่วงการยังตามแก้" แทน ไม่ผูกกับโมเดลปัจจุบันเจาะจง

## Infographic source
ไม่มีตัวเลขเชิงสถิติใน source → gate (e) fact-parity ไม่มี orphan number ต้องเช็ค (source มีแต่ปี 2023/2024 ซึ่งเป็น date stamp ที่ post-gate.sh strip ออกอยู่แล้ว)

**Verdict: FINAL OK ให้ผ่านไปทำ infographic ต่อได้**
