# Fact-check — chronicle_noon 18 ส.ค. 2026 (self-audit, standing instruction 2026-08-09)

หัวข้อ: How-To — เทียบ Deep Research ของ Claude, ChatGPT, Gemini (Pillar 3, สลับจาก Pillar 1 เช้านี้)

## Claims ตรวจกับ primary source

1. **Claude Research** — WebFetch primary `support.claude.com` (Using Research on Claude)
   - agentic multi-step search ✓ ตรง
   - เปิดผ่านปุ่ม "+" มุมล่างซ้าย → เลือก "Research" ✓ ตรง
   - ต้องเปิด web search ก่อนถึงจะทำงาน ✓ ตรง
   - Google Workspace (Gmail/Calendar/Docs) ✓ ตรง
   - แพลน: Pro/Max/Team/Enterprise เท่านั้น (ฟรีใช้ไม่ได้) ✓ ตรง
   - โควต้าร่วมกับ limit แชทปกติ แต่กินเร็วกว่า ✓ ตรง

2. **ChatGPT Deep Research** — `help.openai.com` โดน HTTP 403 (WebFetch บล็อก) → ใช้ WebSearch summary แทน (paraphrase ไม่ quote ตรงตามกติกา verify-extensions.md rule k)
   - ถามคำถามเพิ่ม + โชว์แผนการค้นคว้าให้แก้ก่อนได้ ✓ ตรง (ยืนยันจาก search summary + community.openai.com)
   - แหล่งข้อมูล: ไฟล์อัปโหลด, เว็บสาธารณะ, เว็บไซต์เฉพาะที่ระบุ, แอปที่เชื่อม ✓ ตรง
   - export: Markdown, Word, PDF ✓ ตรง (ยืนยันจาก help.openai.com summary ผ่าน search — PDF export เพิ่มมาทีหลัง ยังใช้ได้ปัจจุบัน)
   - API: `o3-deep-research` + `o4-mini-deep-research` ✓ ตรง (ยืนยันจาก platform.openai.com/docs/models ทั้งสองชื่อ)
   - แนะนำรันแบบ background เพราะงานนาน ✓ ตรง (developers.openai.com/api/docs/guides/background — deep research models ใช้เวลาหลักสิบนาที)

3. **Gemini Deep Research** — WebFetch primary `support.google.com/gemini`
   - ปุ่ม Deep Research (ไอคอนลูกโลก) หลังปุ่ม Add Files ✓ ตรง
   - แสดงแผนการค้นคว้าให้แก้ไขก่อน ✓ ตรง
   - ใช้เวลา ~5-10 นาที ✓ ตรง
   - แหล่งข้อมูล: Search default + Gmail/Drive/NotebookLM/ไฟล์อัปโหลด ✓ ตรง
   - export: Google Docs หรือ copy ✓ ตรง
   - ฟรี = limit รายวัน, Pro/Ultra โควต้าสูงกว่า, Ultra ได้ chart/diagram/interactive simulator, ต้องอายุ 18+ ✓ ตรง

## สรุป
ไม่พบข้อผิดพลาด ไม่มี claim ที่ยืนยันไม่ได้ (ไม่มีตัวเลขที่ต้องตัดทิ้งตาม rule k) — draft พร้อมไป step ถัดไป (infographic)

Draft: 4,724 ตัวอักษร (≥3,000 ✓)

Checked by: Prism (self-check ตาม standing instruction "ไม่ต้องโยนอะไรไปให้ nexus แล้ว" 2026-08-09)
