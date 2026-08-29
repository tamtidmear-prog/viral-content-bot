# Self fact-check — Chronicle กลางวัน 29 ส.ค. 2026 (หัวข้อ: Anthropic MHS / ศาลตัดสิน Pentagon-Anthropic / Meta smart glasses LED fix)

> [SUPERSEDED 2026-08-09] ไม่ส่งให้ Nexus review — self-check ตาม standing order Master J (memory: self-check-no-nexus-review)

## Claims ที่ตรวจ

1. **Anthropic เปิดตัว Model Hardware Standard (MHS) แบบ research preview ประกาศ 27 ส.ค. 2026 — "a shared specification for AI agents to safely operate physical devices" — กลุ่มแรกคือ research lab + advanced manufacturers**
   - WebFetch primary ตรง: `https://www.anthropic.com/news/model-hardware-standard-research-preview` (ผ่าน anthropic.com/news) ✅
   - Quote ภาษาอังกฤษดึงจาก primary โดยตรง ไม่ใช่จาก search summary (rule k) ✅ แปลไทยกำกับไว้ในวงเล็บ ไม่ใช่ quote
   - วันที่: primary ยืนยัน 27 ส.ค. (แก้จาก draft ตอนแรกที่เขียน 28 ส.ค.เพราะเข้าใจผิดจาก secondary) ✅

2. **ศาลรัฐบาลกลาง (ผู้พิพากษา Rita Lin, แคลิฟอร์เนีย) ตัดสิน 27 ส.ค. 2026 (พฤหัสบดี) ว่า Pentagon ขึ้นบัญชี Anthropic เป็น supply chain risk ผิดกฎหมาย — ละเมิด First+Fifth Amendment, คำตัดสิน 59 หน้า, quote "illegal and baseless", background: Anthropic ปฏิเสธให้ทหารใช้ Claude สอดแนม/อาวุธอัตโนมัติ, ฟ้องกลับมี.ค. 2026**
   - openai... ไม่เกี่ยว — primary ที่ควรเปิดคือ nbcnews.com/forbes.com/thehill.com → **ทั้ง 3 บล็อก WebFetch 403** (bot protection)
   - Cross-verify ≥8 แหล่งอิสระจาก WebSearch: Yahoo News, The Hill, NBC News, TBS News, AndroidHeadlines, YourNews, Forbes, AOL(AP) — ตัวเลข/ชื่อผู้พิพากษา/เหตุผลตัดสิน/quote ตรงกันหมดทุกแหล่ง ✅ (rule k: ไม่ได้เปิด primary โดยตรง แต่ cross-verify หลายแหล่งอิสระที่รายงาน public court document เดียวกันตรงกันหมด — ใช้ quote mark เฉพาะวลีสั้นที่ตรงกันทุกแหล่ง "illegal and baseless" พร้อม hedge ในดราฟท์ว่า "สื่อหลายสำนักอิสระรายงานตรงกัน...โดยอ้างคำวินิจฉัย" ไม่ได้เคลมว่าตัวเองเปิดคำตัดสินต้นฉบับ)
   - วันที่ตัดสินจริง: ตรวจด้วย `python3 -c "datetime.date(2026,8,27).strftime('%A')"` → Thursday ตรงกับที่สื่อระบุ "ตัดสินวันพฤหัสบดี" ✅ แก้ draft จาก "27-28 ส.ค." (คลุมเครือ) เป็นระบุชัดว่าตัดสิน 27 ส.ค. สื่อรายงานตาม 28 ส.ค. ✅
   - dedup: grep CONTENT_INDEX "Pentagon", "blacklist", "federal judge" → ไม่พบซ้ำ ✅

3. **Meta ปิดช่องโหว่ LED แว่น Ray-Ban Meta ครั้งที่ 2 ในรอบ 2 เดือน — Alex Himel ประกาศผ่าน Threads 27 ส.ค. 2026**
   - openai/meta primary (about.fb.com, Threads post) ไม่ลอง fetch ตรง (Threads ไม่ใช่หน้าเว็บที่ WebFetch อ่านได้เต็ม) — cross-verify ≥6 แหล่งอิสระ (TheNextWeb, Engadget, 9to5Google, MakeUseOf, AndroidCentral, GadgetReview) ตัวเลข/ชื่อคน/วันที่ตรงกันหมด ✅
   - dedup: grep CONTENT_INDEX "Ray-Ban", "LED", "smart glasses" → พบ 1 hit เก่า (28 พ.ค. 2026 เช้า — บันทึกรวมในหัวข้อ "Agentic AI, Google Universal Cart, Meta Ray-Ban, ...") เป็น bullet รวมข่าวทั่วไปคนละประเด็น (ไม่ใช่เรื่อง LED privacy loophole) ห่างมา 3 เดือน ไม่ถือเป็นเรื่องซ้ำ ✅ ไม่ใช้คำว่า "ครั้งแรก" ในดราฟท์ ระบุชัดว่าเป็น "รอบที่สองในรอบสองเดือน" ตรงกับข้อมูล

4. **หัวข้อที่ตัด — OpenAI/Hugging Face agent breach (41 servers, GPT-5.6 Sol, reward hacking, 37-page report)**
   - ตรวจ dedup พบว่าเหตุการณ์นี้เคย**โพสไปแล้ว 2026-07-26 กลางวัน** ("โมเดลทดลอง OpenAI ไปหาเฉลยเองจนกลายเป็นบุกรุก Hugging Face" — HF เผยแพร่รายงาน 16 ก.ค., เหตุการณ์ 11-12 ก.ค.) — รายงานฉบับ 37 หน้าที่เจอรอบนี้ (26-28 ส.ค.) เป็นรายละเอียดเพิ่มเติมของ**เหตุการณ์เดียวกัน** (July 11-13, OpenAI-Hugging Face breach) ไม่ใช่เหตุการณ์ใหม่แยกจากกัน
   - **ตัดออกจากดราฟท์ทั้งหมด** แทนที่ด้วยข่าว Pentagon-Anthropic (ข้อ 2) — ป้องกัน dedup violation + หัวข้อนี้เคยมีประวัติปัญหา (regen infographic 3 รอบ 26 ก.ค. เพราะเลขยืนยันไม่ได้ ตามที่ CLAUDE.md บันทึกไว้เป็นบทเรียน) ไม่คุ้มความเสี่ยงจะซ้ำอีก ✅

5. **ไม่มี quote ใดที่ไม่มี cross-verify รองรับ** — quote MHS มาจาก WebFetch primary ตรง ✅ quote ศาล "illegal and baseless" มาจาก cross-verify ≥8 แหล่งอิสระตรงกัน + hedge attribution ชัดเจนในดราฟท์ ✅ ไม่มี quote ในส่วน Meta (paraphrase ล้วน) ✅

6. dedup รวม — grep CONTENT_INDEX.md ทั้งไฟล์ หา "MHS", "Model Hardware Standard", "Pentagon", "Rita Lin", "Ray-Ban" (context ใหม่) → ไม่พบซ้ำ (ยกเว้น Ray-Ban เก่าคนละประเด็นตามข้อ 3) ✅
7. ไม่เอ่ยชื่อ Master J, ไม่มี credentials/secrets ในดราฟท์ ✅
8. Pillar: P1 AI News — ล่าสุดที่โพสจริงคือ 28 ส.ค. กลางวัน (P1) ไม่ติดกัน ≥2 slot กับ slot ก่อนหน้านั้น (27 ส.ค. กลางวัน = P3) → วันนี้เป็น P1 ติดกันแค่ 1 slot กับ 28 ส.ค. ไม่ผิดกฎ rotation (กฎ: ติดกัน ≥2 ถึงต้องสลับ) — ไม่บังคับสลับ แต่พิจารณาแล้วเนื้อหาข่าวชัดเจน/verify ได้ดีที่สุดเป็น P1 จึงเลือกต่อ ✅
9. ความยาว caption: 4,545 ตัวอักษร (อยู่ในเกณฑ์ ≥3,000, สูงกว่า soft-cap 4,500 เล็กน้อย 45 ตัวอักษร ไม่กระทบ gate (c) ที่เช็คแค่ขั้นต่ำ) ✅

## สรุป
พบ+แก้ 3 จุดระหว่างตรวจ: (1) วันที่ประกาศ MHS แก้จาก 28→27 ส.ค. ตาม primary (2) วันที่ตัดสินคดี Pentagon แก้ให้ระบุชัดวันตัดสิน (27, พฤหัสบดี) แยกจากวันสื่อรายงาน (28) (3) **ตัดหัวข้อ OpenAI/Hugging Face ทั้งหมดเพราะซ้ำกับโพส 26 ก.ค. 2026 กลางวัน** แทนที่ด้วยข่าว Pentagon-Anthropic — draft พร้อมสำหรับขั้นถัดไป (infographic)
