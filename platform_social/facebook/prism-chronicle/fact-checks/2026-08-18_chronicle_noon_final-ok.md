# FINAL OK — chronicle_noon 18 ส.ค. 2026 (self-audit, standing instruction 2026-08-09)

หัวข้อ: How-To — เทียบ Deep Research ของ Claude, ChatGPT, Gemini (Pillar 3, สลับจาก Pillar 1 เช้านี้ตาม pillar balance)

## ตรวจครบตาม checklist
- [x] Fact-check: WebFetch primary (support.claude.com, support.google.com/gemini) + WebSearch (help.openai.com บล็อก 403 → summary paraphrase ไม่ quote ตามกติกา k) ครบ 3 แพลตฟอร์ม — ไม่พบข้อผิดพลาดในตัว draft
- [x] Draft 4,724 ตัวอักษร (≥3,000)
- [x] Infographic: kawaii landscape 2752x1536, mascot Prism ปรากฏถูกต้อง
- [x] **infographic รอบ 1 พบ typo/corruption 8 จุด** (เสียเงินเก่านั้น→เท่านั้น, Pro ชื่นไข้→ขึ้นไป, ตึงข้อมูล→ดึงข้อมูล, มีโนเดล+เลขไทยเพี้ยน→โมเดล(o3), วิจิย→วิจัย, กั้งฟรี→ทั้งฟรี, เอพาะ→เฉพาะ, ระตับ→ระดับ) — **ไม่ใช้ v1**
- [x] **รอบ 2 regen พร้อม prompt ระบุคู่คำผิด-ถูกตรงๆ** (ตามบทเรียน 17 ส.ค. เย็น) — ผลลัพธ์สะอาด 100% ด้าน spelling, zoom-check ทุกกล่องไม่พบ typo เหลือ
- [x] **พบจุดข้อมูลผิดเพิ่มเติมใน v2 ที่ไม่ใช่ typo แต่เป็น fact gap**: กล่อง ChatGPT ระบุ "แพลนที่รองรับ: Plus, Team, Enterprise" — ตรวจกับ WebSearch (chatgpt.com/pricing + secondary sources หลายแหล่ง) พบว่า Deep Research เปิดให้ **ทุกแพลนรวม Free** ใช้ (Free 5 queries/เดือน, Plus/Team/Enterprise 25, Pro 250) — v2 ตกหล่น Free tier
- [x] **PIL patch จุดเดียว**: เปลี่ยน "Plus, Team, Enterprise" → "ทุกแพลน ฟรีก็ใช้ได้" (หลีกเลี่ยง Latin/ตัวเลข/วงเล็บ เพราะพบว่า NotoSansThai-Bold.ttf ที่ใช้ patch ไม่มี glyph ละตินเลย — ครั้งแรกออกมาเป็น tofu ทั้งหมด แก้โดยเขียนข้อความไทยล้วนแทน) — บันทึกไว้เป็นบทเรียนใหม่
- [x] Ordering: factcheck.md เขียนก่อน gen ภาพทุกรอบ (mtime factcheck 1787028160 < mtime ภาพสุดท้าย 1787028989)
- [x] Fact-parity: o3-deep-research, o4-mini-deep-research อยู่ในทั้ง caption และภาพ ✓ — ตัวเลข/plan tier อื่นในภาพไม่มีตัวเลขที่ต้อง parity เพิ่มหลัง patch
- [x] Dedup: หัวข้อ "Deep Research 3 เจ้า" ไม่เคยโพสมาก่อน (grep CONTENT_INDEX ไม่พบ)

## FINAL OK — พร้อมโพส

Audited by: Prism (self-audit ตาม standing instruction "จัดการเรื่องของตัวเองเอง" 2026-08-09)
