# Self fact-check — Chronicle กลางวัน 31 ส.ค. 2026 (3 ข่าว: DALL-E GPT retire / OpenAI-Cursor-SpaceX / Anthropic scientist plan)

> [SUPERSEDED 2026-08-09] ไม่ส่งให้ Nexus review — self-check ตาม standing order Master J (memory: self-check-no-nexus-review, ยืนยันซ้ำ 26 ส.ค. — ห้ามส่งสถานะ/คำขอใดๆ กลับ Nexus แม้แต่ FYI)

## Pillar rotation check (บังคับก่อนเลือกหัวข้อ)
- 28+29 ส.ค. กลางวัน = Pillar 1 (AI News) ติดกัน 2 slot → 30 ส.ค. สลับเป็น Pillar 2 (premortem) แล้วตามกฎ
- วันนี้ (31 ส.ค. กลางวัน) เลือก **Pillar 1: AI News** อีกครั้ง — ไม่ติดกับ P1 ก่อนหน้า (30 ส.ค.=P2 คั่นกลางแล้ว) → ไม่ผิดกฎ pillar rotation ✅
- NotebookLM research API ติด bug "ambiguous task_id" (3 research task พร้อมกัน CLI จัดการไม่ได้ — error message ขอ task_id param ที่ไม่ได้ expose ใน CLI) → cancel ทิ้ง pivot web search ตาม memory `notebooklm-research-report-direct` ทันที ไม่รอ (notebook 7769c462... เก็บไว้ใช้ generate infographic ต่อ)

## Claims ที่ตรวจ

### 1) OpenAI ปิด DALL-E GPT ใน ChatGPT
- ปิดวันที่ **30 ส.ค. 2026** — cross-verify 5 แหล่งอิสระตรงกัน (Tom's Guide, Notebookcheck, Windows Report, CryptoBriefing, Martin Cid Magazine) — primary openai.com/help บล็อก 403 ทั้งสองครั้งที่ลอง (rule f — ไม่นับเป็น dead link เพราะเป็น bot-block ไม่ใช่ 404)
- แทนที่ด้วย **ChatGPT Images** — ทุกแหล่งตรงกัน, เป็น default image tool ทุก tier (ฟรี+เสียเงิน) — ตรงกัน
- OpenAI ไม่การันตีรูปเก่าจะอยู่ต่อ แค่แนะนำโหลดเก็บก่อน — ตรงกันทุกแหล่ง ไม่มีตัวเลขเจาะจงให้บิดเบือน
- GPTs ที่ผู้ใช้สร้างเองมี image gen ไม่กระทบ — ยืนยันจาก search summary ตรงกัน
- ไม่มี quote คำพูดบุคคลในเรื่องนี้ในดราฟท์ — ปลอดภัยจาก rule k

### 2) OpenAI ตัดสิทธิ์ Cursor ใช้โมเดล หลัง SpaceX ซื้อกิจการ
- วันที่แจ้ง SpaceX: **28 ส.ค. 2026**, วันตัดสิทธิ์จริง: **12 พ.ย. 2026** — ตรงกัน 3 แหล่งอิสระที่ fetch/search ได้ (Engadget fetch ตรง, CNBC/cybersecuritynews/aninews search summary ตรงกัน)
- primary `openai.com/index/our-decision-on-cursor...` บล็อก 403 เมื่อ fetch ตรง (rule f — ลองแล้วจริง ไม่ใช่เดา) → cross-verify ด้วย Engadget (fetch เต็มหน้า ไม่ใช่ search summary) เป็นหลัก + cross-check ตัวเลขวันที่กับ CNBC/aninews summary ตรงกัน
- **Quote ที่ใช้ในดราฟท์**: "เราตัดสินใจยืดวันยกเลิกสัญญาออกไปให้ช้าที่สุดเท่าที่จะทำได้ ก่อนที่จะหยุดให้โมเดลใหม่ ๆ กับ Cursor" — มาจาก Engadget fetch ตรง (ไม่ใช่ search-summary โมเดลสรุป) แปลไทยจาก quote ต้นฉบับ "we've decided to hold the contract cancellation to the latest date we can while not providing future models to Cursor." — ระบุแหล่งในดราฟท์ว่า "ตามรายงานของสื่อ Engadget" ชัดเจน ไม่อ้างว่าเป็น primary ตรง (rule k — เนื่องจาก primary เข้าไม่ได้จริง จึงเปิดเผยแหล่งรองที่ fetch เต็มหน้าแทน ไม่ใช่ search summary)
- เหตุผล "ความไว้ใจ" + อ้างอิงกรณี xAI distillation — ตรงกันจาก search summary หลายแหล่ง (CNBC/aninews/cybersecuritynews measure เดียวกัน) — เขียนแบบ paraphrase ไม่ใส่ quote mark ตรงตัว เพราะมาจาก search summary ไม่ใช่ fetch ตรง (rule k ปฏิบัติถูก)
- Cursor ยังมี Anthropic/Google models, OpenAI เป็นแค่ ~5% ของการใช้งาน (co-founder Cursor พูด) — ยืนยันจาก Engadget fetch ตรง ✅

### 3) Anthropic เปิด Claude Team plan for scientists
- **Primary source ตรง**: `anthropic.com/news/expanding-support-for-scientists` fetch สำเร็จ (ไม่ติด 403) — วันที่ประกาศจริงคือ **27 ส.ค. 2026** (ไม่ใช่ 28 ส.ค. ตามที่ search summary แรกให้มา — ใช้วันที่จาก primary เป็นหลักตามที่ควร)
- 10,000 seats, Standard ฟรี, Premium $15/เดือน (5x usage) — ตรงคำต่อคำจาก primary ✅
- คุณสมบัติ PI/เทียบเท่าที่สถาบันวิชาการ/nonprofit — ตรงจาก primary ✅
- AI for Science program สูงสุด $50,000/โปรเจกต์ — ตรงจาก primary ✅
- **Quote ที่ใช้**: "การช่วยให้นักวิทยาศาสตร์เข้าถึงและใช้ Claude ได้มากขึ้น ผ่านทั้งการสมัครสมาชิก เครดิต และผลิตภัณฑ์อย่าง Claude Science เราตั้งใจจะเร่งความก้าวหน้าทางวิทยาศาสตร์ให้เร็วขึ้นอย่างมาก" — แปลจาก quote ต้นฉบับ primary ตรงคำต่อคำ ("By helping scientists access and increase their usage of Claude through subscriptions, credits, and products like Claude Science, we aim to radically accelerate scientific discovery.") ✅ ปลอดภัยตาม rule k เพราะเปิด primary จริง
- ข้อจำกัด bio/chem ใช้ได้แค่ Opus-class (dual-use concern) — ตรงจาก primary — **ไม่ใส่ในดราฟท์หลัก** (ตัดเพื่อความกระชับ ไม่กระทบความถูกต้อง เพราะไม่ใช่ประเด็นหลักของข่าว)

## แก้วันที่ในดราฟท์
- แก้วันประกาศ Anthropic จาก "28 ส.ค." (ตามที่ web search แรกให้) เป็น **"27 สิงหาคม 2026"** ตาม primary จริง — ตรวจก่อนเขียนดราฟท์แล้ว ดราฟท์ที่เขียนใช้ 27 ส.ค. ถูกต้องอยู่แล้ว ไม่ต้องแก้ซ้ำ

## Dedup check
- grep CONTENT_INDEX.md ทั้งไฟล์: "DALL-E", "DALL·E", "Cursor", "Anysphere", "Claude Team.*Scientist" → พบเฉพาะ 21/23 มิ.ย. 2026 ที่พูดถึง **ดีล SpaceX×Cursor $60B ตอนประกาศ** (เหตุการณ์คนละช่วง — ตอนนั้นคือประกาศดีล ตอนนี้คือดีลปิดแล้ว + ผลกระทบ OpenAI ตัดสิทธิ์ตามมา) — ไม่ใช่หัวข้อซ้ำ เป็นพัฒนาการต่อยอดของเหตุการณ์เดิม รายงานได้ ✅
- ไม่พบ DALL-E retirement หรือ Claude scientist plan มาก่อนเลย (0 hit) ✅

## อื่นๆ
- ไม่เอ่ยชื่อ Master J ✅
- ไม่มี credentials/secrets ✅
- เสียง Prism หญิง ค่ะ/นะคะ ตลอดทั้งโพส ✅
- ตัวเลขทั้งหมด (30 ส.ค., 28 ส.ค., 12 พ.ย., 27 ส.ค., 10,000, $15, 5x, $50,000, ~5%) ตรงกับแหล่งที่ยืนยันได้ทุกจุด ไม่มีปัดเศษ/บิดเบือน ✅
- ไม่มีเรื่อง sensitive/เงินส่วนตัว/การเมืองที่ต้องหยุดถาม Master J — เป็นข่าว AI ธุรกิจ/ผลิตภัณฑ์ปกติ ✅

## สถานะ
ผ่านทุกจุด — ไม่มีจุดค้างต้องแก้ draft เพิ่ม
