# Fact-check — chronicle_noon 20 ส.ค. 2026 (self-audit, standing instruction 2026-08-09)

หัวข้อ: AI News กลางวัน — CISA/Ray RCE, Unitree Shanghai IPO, OpenAI Private Safety Processing (Pillar 1)

## Claims ตรวจกับ primary source

1. **CISA Ray AI framework CVE-2025-62593** — WebFetch primary `thehackernews.com/2026/08/cisa-flags-actively-exploited-ray-flaw.html`
   - CVE-2025-62593, CVSS 9.4 ✓ ตรง
   - CISA เพิ่มเข้า KEV catalog 17 ส.ค. 2026, deadline หน่วยงานรัฐบาลกลาง 20 ส.ค. 2026 ✓ ตรง (ตรวจ TZ วันนี้ = 20 ส.ค. จริง)
   - ต้นเหตุ: endpoint `/api/jobs`, `/api/job_agent/jobs/` ไม่ยืนยันตัวตน ✓ ตรง
   - เทคนิคโจมตี: ปลอม User-Agent header + DNS rebinding ✓ ตรง (มี quote จาก Ray maintainers ยืนยัน)
   - แพตช์ใน Ray 2.52.0 ✓ ตรง
   - RondoDox botnet โจมตีก่อนเปิดเผยสาธารณะ (26 พ.ย. 2025) ✓ ตรง — จาก BitSight report มี.ค. 2026
   - draft ไม่ได้เขียนว่า "รัฐบาลไทยต้องแก้" หรือ overstate ขอบเขต — ระบุชัดว่าเป็นหน่วยงานรัฐบาลกลางสหรัฐฯ ✓

2. **Unitree Robotics Shanghai STAR Market IPO** — WebFetch primary `scmp.com/tech/tech-trends/article/3364499/...`
   - เข้าตลาดวันพุธ 19 ส.ค. 2026 ✓ ตรง
   - IPO price 150.80 หยวน ✓ ตรง
   - ระดมทุน 6,100 ล้านหยวน จากขาย 40.45 ล้านหุ้น (10% ทุนจดทะเบียน) ✓ ตรง
   - ราคาเปิด 1,100 หยวน = พุ่งสูงสุด +629% จาก IPO ✓ ตรง (ตัวเลขนี้มาจากหลายแหล่งตรงกัน: TradingView, Forbes, SCMP)
   - ปิดตลาด 845 หยวน = +460% ✓ ตรง (Bloomberg/Yahoo ก็รายงานตัวเลขนี้)
   - มูลค่าเปิดตลาด ~445,000 ล้านหยวน (~$66B), ปิดตลาด ~342,000 ล้านหยวน ✓ ตรง — **หมายเหตุ**: draft เขียน "$66B" กำกับเฉพาะมูลค่าช่วงเปิด ไม่ปนกับตัวเลขปิดตลาด ป้องกัน mix-up
   - นักลงทุนรายย่อย 9.8 ล้านบัญชี แย่งหุ้น 9.7 ล้านหุ้นที่มี ✓ ตรง
   - CNBC รายงานตัวเลข +542% (คนละช่วงเวลาวัด) — **ไม่ใช้ตัวเลขนี้ในภาพ/แคปชัน** เพื่อไม่ให้ปนกับ 629%/460% ที่ใช้จริง (แหล่งข่าวรายงานเลขต่างกันตามจุดที่วัด — เลือกใช้เฉพาะคู่ peak/close ที่ SCMP+TradingView+Bloomberg ยืนยันตรงกัน)

3. **OpenAI Private Safety Processing** — WebFetch secondary `techcrunch.com/2026/08/19/openai-seeks-to-one-up-anthropic...` (OpenAI blog primary `openai.com/index/offering-zero-data-retention-for-frontier-models/` ตอบ HTTP 403 — ใช้ secondary paraphrase ไม่ quote ตรงตามกติกา verify-extensions.md rule k)
   - ตรวจจับ misuse pattern ข้ามหลาย session โดยไม่เก็บเนื้อหาสนทนา ✓ ตรง (paraphrase)
   - ส่ง "สัญญาณนิยามแคบ" แทนเนื้อหาเต็ม ✓ ตรง (paraphrase, ไม่ใส่เครื่องหมายคำพูดครอบ)
   - อยู่ระหว่างทดสอบกับลูกค้า enterprise API กลุ่มแรก ยังไม่เปิดทั่วไป ✓ ตรง — draft **ไม่ระบุเดือนเปิดตัวจริง** เพราะ source ไม่ยืนยันชัด (บาง source อ้าง "กันยายน" แต่ไม่ตรงกันทุกแหล่ง — ตัดทิ้งตามกติกา rule k ไม่เดาวันที่)
   - เทียบกับ Anthropic ที่เก็บ data log — ระบุเป็นการเปรียบเทียบทั่วไป ไม่ได้ระบุตัวเลขวันที่เก็บ (30 วัน) ของ Anthropic ในแคปชัน เพื่อลดความเสี่ยง claim ผิดที่ยืนยันไม่ได้แน่ชัด — เขียนแค่ "เก็บ log ข้อมูลไว้ระยะหนึ่ง" แบบกว้างๆ

## Dedup check
grep CONTENT_INDEX.md — ไม่พบหัวข้อ "Ray", "Unitree", "Private Safety Processing" มาก่อน ✓ ไม่ซ้ำ
Pillar balance: ล่าสุดจริง Pillar 3 (18 ส.ค. กลางวัน), Pillar 1 (18 ส.ค. เช้า) — วันนี้เลือก Pillar 1 (AI News) ไม่ติดกัน ≥2 slot กับ Pillar 1 เดิม (ห่าง 1 slot จริง) ✓ ตามกฎ balance

## สรุป
ไม่พบข้อผิดพลาดเชิงตัวเลข/ข้อเท็จจริงในตัว draft — ตัดเลข Unitree ที่ไม่ตรงกัน (542%) ออกแล้ว, ไม่ระบุเดือนเปิดตัว OpenAI feature ที่ยืนยันไม่ได้แน่ชัด — draft พร้อมไป step ถัดไป (infographic)

Draft: 4,517 ตัวอักษร (≥3,000 ✓)

Checked by: Prism (self-check ตาม standing instruction "ไม่ต้องโยนอะไรไปให้ nexus แล้ว" 2026-08-09)
