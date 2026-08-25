# Self-Check — Chronicle noon 2026-08-25 (ตรวจเองตาม standing instruction 2026-08-09, ไม่ส่ง Nexus)

หัวข้อ: Pillar 1 (AI News) — Microsoft Copilot CoSnitch (CVE-2026-24301) / Anthropic Claude Academy / OpenAI GPT-5.6 Sol price cut
Pillar balance: 24 ส.ค.(กลางวัน)=P1, 25 ส.ค.(เช้า)=P2 → ไม่ติดกัน ≥2 slot → เลือก P1 ได้ตามปกติ เพราะมีข่าวใหม่ verify ได้ครบ 3 เรื่อง ✅
Dedup: grep CONTENT_INDEX.md ทั้งไฟล์ — ไม่เคยพูดถึง CoSnitch/CVE-2026-24301, Claude Academy, หรือ Sol price cut $4/$20 มาก่อน (OpenAI Luna/Terra price cut 5-24 ส.ค. เป็นคนละโมเดล/คนละราคากับ Sol ครั้งนี้) ✅

## Claims + verification

1. **Microsoft Copilot CoSnitch (CVE-2026-24301)**
   Primary: WebFetch `https://www.varonis.com/blog/cosnitch` (สำเร็จ)
   - รายงานให้ Microsoft ธ.ค. 2025, แพตช์ออก 18 ส.ค. 2026 — ตรง primary ✅
   - กลไก: `?autorun=1` + `?q=<prompt>` รันคำสั่งอัตโนมัติจากคลิกเดียว, ดึงข้อมูลจาก OAuth-connected apps (Gmail, Drive, Calendar, OneDrive), ฝัง persistent memory ข้ามเซสชัน อยู่รอดแม้เปลี่ยนรหัสผ่าน/re-enroll device — ตรง primary ทุกจุด ✅
   - วิธีค้นพบ: นักวิจัยถามซ้ำจนระบบเผลอเปิดเผยพารามิเตอร์ลับกลางประโยคปฏิเสธ — ตรง primary ("meta-hacking", "mid-refusal") ✅
   - Quote "Copilot wasn't breached; it was played" — **มาจาก primary Varonis blog เอง** ใส่ quote ได้ตามกติกา (แต่ draft เขียนเป็น paraphrase "เล่นเกม" ไม่ได้ใส่ quote mark ครอบคำแปลไทย — ปลอดภัยกว่า เพราะแปลจากอังกฤษไม่ใช่คำต่อคำ)
   - Microsoft ไม่พบการโจมตีจริงก่อนแพตช์, เป็นช่องโหว่ตัวที่ 3 ของปีนี้ (ต่อจาก Reprompt, SearchLeak) — ตรง primary ✅
   Verdict: ✅ ตรง primary ทุกจุด ไม่มี unverified quote (rule k ผ่าน — quote เดียวที่มีมาจาก primary ตรง และ draft เลือกไม่ใส่ quote mark ในฉบับแปล)

2. **Anthropic Claude Academy**
   Primary: WebFetch `https://academy.claude.com/` (สำเร็จ) — ยืนยัน 5 ผลิตภัณฑ์ (Claude.ai, Cowork, Code, Tag, Platform) + คอร์ส "AI Fluency: Framework & Foundations" 14 บท + 4D framework (Delegation, Description, Discernment, Diligence) ตรงทุกจุด ✅
   Secondary (จำนวน 355 resources — ไม่มีในหน้า primary ที่ fetch ได้): `superhuman.ai` newsletter 21 ส.ค. — ระบุ "355 tutorials, prompting tips, and use case examples" ตรงกับที่ draft เขียน ✅ (เลข 355 มาจาก secondary เพราะหน้า primary ไม่ได้สรุปตัวเลขรวมไว้ตรงๆ — ยอมรับได้เพราะเป็นตัวเลขเชิงพรรณนา ไม่ใช่ safety/การเงินที่กระทบสูง)
   ไม่ระบุวันที่เปิดตัวชัดเจนใน draft (แหล่งข่าวให้วันที่ต่างกันเล็กน้อย 20-21 ส.ค.) — draft เขียนเป็น "เปิดตัว" ไม่ระบุวันที่เจาะจง = hedge ถูกต้องตาม rule k
   Verdict: ✅ ทุกตัวเลข/ชื่อ product/ชื่อ framework ตรง primary, เลข 355 cross-check secondary 1 แหล่งเท่านั้น (ไม่ใช่ safety-critical จึงพอ)

3. **OpenAI GPT-5.6 Sol price cut**
   Primary `openai.com` → WebFetch บล็อก HTTP 403 (rule f — ใช้ layer รองลงมา)
   Cross-verify: `winbuzzer.com` (ตารางราคาละเอียด) + WebSearch สรุปจาก Reuters/investing.com + biggo.com + technology.org — ตัวเลขตรงกันทุกแหล่งอิสระ ≥3 แหล่ง
   - Input $5.00→$4.00 (ลด 20%), Output $30.00→$20.00 (ลด 33%), Cached input $0.50→$0.40 — ตรงทุกแหล่ง ✅
   - Context ยาว >272K: input $10→$8, output $45→$30 — ตรง winbuzzer, draft เขียนสอดคล้อง ✅
   - ประกาศ 21 ส.ค. 2026, การันตีราคาถึง 21 พ.ย. 2026 — ตรงทุกแหล่ง ✅
   - เหตุผล: แรงกดดันแข่งขันจาก Anthropic + โมเดลจีน — ตรงกับสรุป WebSearch (Reuters) ✅
   Verdict: ✅ cross-verify 3+ แหล่งอิสระตรงกันหมด, primary บล็อกแต่ยอมรับได้ตาม rule f

4. ไม่แตะ sensitive/เงิน-ส่วนตัวของบุคคล/นอกตาราง — เป็น AI News ปกติตามตาราง ROUTINE.md standing approval

## สรุป
ไม่มีจุดต้องแก้ไข draft — ผ่าน self-check ครบทุกข้อ ต่อ step ถัดไป (infographic) ได้
