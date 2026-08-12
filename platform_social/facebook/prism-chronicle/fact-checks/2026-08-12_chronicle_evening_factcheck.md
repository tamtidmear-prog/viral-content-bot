# Fact-check — chronicle_evening 12 ส.ค. 2026 (self-check, standing instruction 2026-08-09)

หัวข้อ: How-To ปิดสวิตช์ไม่ให้แชท ChatGPT/Claude/Gemini ถูกเทรน AI

## ตรวจสอบแล้ว (primary source, WebFetch ตรง + WebSearch cross-check)

**Claude (Anthropic) — verify เต็มผ่าน privacy.claude.com โดยตรง:**
- Quote ตรงคำ 100%: "Your data will still be included in model training that has already started and in models that have already been trained, but we will stop using your previously stored chats and coding sessions in future model training runs." — ยืนยันจาก https://privacy.claude.com/en/articles/12109829
- Switch path ตรง: Settings → Privacy → "Help Improve our AI models" (หรือ claude.ai/settings/data-privacy-controls)
- ใช้ได้เฉพาะ Free/Pro/Max (+Claude Code ของบัญชีเหล่านั้น) — ยืนยันตรง
- Retention 4 ค่าตรงเป๊ะจาก https://privacy.claude.com/en/articles/10023548: 30 วัน (แชทลบ), 5 ปี (training pipeline de-identified), 2 ปี (flagged content), 7 ปี (trust & safety classifier scores)
- นโยบายเปลี่ยน "ส.ค. 2025" ตรง — ยืนยัน Anthropic ประกาศ Aug 28, 2025 (deadline ตัดสินใจ Oct 8, 2025) จาก anthropic.com/news/updates-to-our-consumer-terms

**ChatGPT (OpenAI) — verify ผ่าน WebSearch cross-check หลายแหล่ง (help.openai.com ตรง 403 บล็อก bot):**
- Settings → Data Controls → "Improve the model for everyone" — ตรง
- Temporary Chat ไม่ขึ้นประวัติ ไม่ใช้เทรน — ตรง
- 30-day retention สำหรับ Temporary/deleted chats (เพื่อตรวจการใช้งานผิดกฎ) — ตรง

**Gemini (Google) — verify ผ่าน WebSearch cross-check (support.google.com):**
- Settings & help → Activity → "Turn off"/"Turn off and delete activity" — ตรง
- 72-hour temporary retention แม้ปิด Activity แล้ว — ตรง
- Draft เขียน hedge "เอกสารไม่ระบุชัดเจน 100%" ไว้แล้วถูกต้อง — Google ไม่ได้ระบุตรงๆว่าปิด Activity = หยุดเทรนทันที (เขียนแบบระมัดระวังอยู่แล้ว ไม่ต้องแก้)

## ผลสรุป
draft เดิมถูกต้องทุกจุด **ไม่ต้องแก้ไขอะไร** — เขียนไว้ดีตั้งแต่ตอน autonomous run 11:10 (ก่อนจะติดปัญหา infographic คนละเรื่อง)

Fact-checked by: Prism (self-check ตาม standing instruction "จัดการเรื่องของตัวเองเอง" 2026-08-09)
