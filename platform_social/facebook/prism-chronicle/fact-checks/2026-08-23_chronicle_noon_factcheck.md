# Self-Check — Chronicle noon 2026-08-23 (ตรวจเองตาม standing instruction 2026-08-09, ไม่ส่ง Nexus)

หัวข้อ: Pillar 3 (How-To) — 5 ขั้นตอน AI fact-check ยังไงไม่โดนหลอก
Pillar balance: 08-18(morning)=P1, 08-18(noon)=P3, 08-20(noon)=P1, 08-22(noon)=P1 ×2 ติดกัน → CONTENT_INDEX บอกต้องสลับ → เลือก P3 ✅
Dedup: เช็ค CONTENT_INDEX Pillar 3 ทั้งหมด (Bolt.new, AI ฟรีเทียบ 3 เจ้า, NotebookLM, prompt engineering, Deep Research เทียบ 3 เจ้า) — ไม่ซ้ำหัวข้อนี้ ✅

## Claims + verification

1. **Claude web search** — เปิดผ่าน slider icon → toggle "Web search" → ค้นเว็บจริง+อ้างอิงลิงก์ | ใช้ได้ Free/Pro/Max, Team/Enterprise ต้อง admin เปิดก่อน
   Primary: WebFetch `https://support.claude.com/en/articles/10684626-enable-and-use-web-search` (สำเร็จ, เนื้อหาตรง) — quote ใน draft = paraphrase ไม่ใช่ quote ตรง (rule k ผ่าน เพราะไม่ได้ใส่ "" ครอบคำใคร)
   Verdict: ✅ ตรง primary

2. **ChatGPT** มีโหมดค้นเว็บให้เลือกเปิด
   Primary: `help.openai.com` และ `openai.com/index/introducing-chatgpt-search` → WebFetch บล็อก 403 ทั้งคู่
   จัดการ: เขียนเป็นข้อความทั่วไปไม่ระบุ plan/วันที่/ตัวเลขเจาะจง (ตาม rule k — search-summary ≠ quote, ไม่เปิด primary ได้ = paraphrase กว้างๆ ไม่ฟันธงรายละเอียด) — draft ไม่มีตัวเลขหรือวันที่เกี่ยวกับ ChatGPT เลย ปลอดภัย
   Verdict: ✅ เขียนแบบ hedge พอ ไม่มี unverifiable specific claim

3. **Gemini grounding with Google Search** — เชื่อมเว็บ real-time, คืน URL citations
   Primary: WebFetch `https://ai.google.dev/gemini-api/docs/grounding` (สำเร็จ, เนื้อหาตรง)
   Verdict: ✅ ตรง primary

4. **Hallucination = AI สร้างข้อมูลที่ฟังดูสมเหตุสมผลแต่ไม่จริง, มั่นใจเท่ากันทั้งถูก/ผิด** — ความรู้ทั่วไปเรื่อง AI literacy ที่ยืนยันแล้วจากหลายแหล่งวงกว้าง (ไม่ใช่ claim เฉพาะเจาะจงต้องการ primary เดี่ยว)
   Verdict: ✅ established fact ไม่ต้องมี primary citation เดี่ยว

5. **404-strip-retry method** — มาจาก internal SOP ของ Prism เอง (`.claude/rules/verify-extensions.md` rule a, verified case จริงในนั้น) — บรรยายวิธีการทำงานของตัวเอง ไม่ใช่ external claim
   Verdict: ✅ ไม่ต้อง verify ภายนอก (self-description)

6. ไม่มีตัวเลข/สถิติ/ชื่อบุคคล/quote ที่อ้างอิงบุคคลจริงในโพสนี้เลย — ความเสี่ยง fact-error ต่ำมาก (เทียบ rule k ที่เคยพลาดเรื่อง quote คน)

7. ไม่แตะ sensitive/เงิน/ส่วนตัว/นอกตาราง — เป็น How-To ปกติตามตาราง ROUTINE.md standing approval

## สรุป
ไม่มีจุดต้องแก้ไข draft — ผ่าน self-check ครบทุกข้อ ต่อ step ถัดไป (infographic) ได้
