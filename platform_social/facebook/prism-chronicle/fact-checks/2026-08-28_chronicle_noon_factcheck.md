# Self fact-check — Chronicle กลางวัน 28 ส.ค. 2026 (หัวข้อ: Nvidia Q2 FY2027 / OpenAI Jalapeño results / Anthropic-Nscale $45B)

> [SUPERSEDED 2026-08-09] ไม่ส่งให้ Nexus review — self-check ตาม standing order Master J (memory: self-check-no-nexus-review)

## Claims ที่ตรวจ

1. **Nvidia Q2 FY2027 revenue $96.2B (+106% YoY), Data Center $89.0B (+117% YoY), gross margin 75.0%, GAAP EPS $2.46**
   - WebFetch primary ตรง: `nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027`
   - ระวัง: ครั้งแรก fetch URL ผิด (ได้หน้า FY2026 ปีที่แล้วโดยไม่รู้ตัว — ชื่อบทความคล้ายกันมาก) → ค้นหาชื่อบทความแบบ exact match ใหม่จนได้ URL ที่ถูกต้อง (rule f: verify-surface — เนื้อในต้องตรง ไม่ใช่แค่ URL หน้าตาคล้าย) ✅ ตัวเลขทุกตัวตรงกับ primary ที่ถูกต้อง
   - Quote Jensen Huang คำต่อคำจาก primary page โดยตรง (ไม่ใช่จาก search summary — rule k) ✅

2. **OpenAI Jalapeño — 1.5-1.9x throughput/watt, 1.7-3.6x lower latency, ทดสอบบน GPT-OSS 120B/DeepSeek R1 670B/Kimi K2.5 1T, ร่วมกับ Broadcom, deploy ภายในสิ้นปี 2026**
   - openai.com primary บล็อก WebFetch (403) → cross-verify ≥3 แหล่งอิสระ (Tom's Hardware ×2, Neowin, TechTimes, Winbuzzer, aninews) ตัวเลขตรงกันหมดทุกแหล่ง ✅
   - 700W (Jalapeño) vs 1,400W (Nvidia GB300) — cross-verify ซ้ำรอบสองด้วย query เจาะจง ยืนยันตรงกัน ระบุชื่อรุ่น GB300 ชัดเจนในดราฟท์แทน "เรือธง" กว้างๆ ✅ ระบุ hedge ว่าเป็นตัวเลขจากสื่อไม่ใช่ OpenAI ประกาศเองตรงๆ (เพราะ primary เข้าไม่ได้)
   - เจอ noise: บาง source อ้างว่าร่วมมือกับ Cerebras — cross-check เพิ่มพบว่าแหล่งส่วนใหญ่ (รวม Tom's Hardware headline) ยืนยัน Broadcom ตรงกัน ใช้ Broadcom ✅
   - เจอ "104x" viral claim ที่ error-corrected โดย SemiAnalysis (จริงคือ 104.3x เฉพาะจุดวัดหนึ่งจุดที่ match กันพอดี ไม่ใช่ทั่วไป) — **ไม่ใช้ตัวเลขนี้ในดราฟท์เลย** เพราะเสี่ยง misleading ✅
   - dedup check: OpenAI Jalapeño เคยโพสแล้ว 27 มิ.ย. 2026 (ตอนประกาศแผน) — รอบนี้เป็นคนละ event (ผลทดสอบจริงครั้งแรก 26 ส.ค.) → เพิ่มประโยคระบุชัดว่าเป็น "อัปเดต" ต่อจากข่าวเก่า กันสับสน ✅

3. **Anthropic-Nscale $45B, 6 ปี, 460MW, West Virginia, ชิป Vera Rubin, เริ่มทำงานปลายปี 2027**
   - ไม่มี official statement จาก Anthropic/Nscale — cross-verify Bloomberg/CNBC/TechCrunch/Reuters (ตามที่ CNBC อ้างอิง) ตัวเลขตรงกันหมด ✅
   - **hedge ชัดเจนในดราฟท์**: ระบุว่ายังไม่มีแถลงการณ์ทางการ, Nscale บอกยืนยันรายละเอียดไม่ได้, Anthropic ยังไม่ตอบกลับสื่อ — ไม่นำเสนอเป็นข้อเท็จจริงยืนยันแล้ว ✅
   - Microsoft ถอนตัวจากดีล 1.35GW ที่แคมปัสเดียวกัน — ยืนยันจาก search results เดียวกัน (TechTimes) ตรงกับ context ที่ระบุ ✅
   - dedup: grep CONTENT_INDEX ไม่พบ "Nscale" มาก่อน ✅ (Vera Rubin เคยพูดถึงหลายครั้งในบริบทอื่น — ไม่ใช่ topic ซ้ำ เป็น product line ที่พูดถึงต่อเนื่องปกติ)

4. **ไม่มี quote ใดที่ไม่ได้เปิด primary** — quote เดียวในดราฟท์ (Jensen Huang) มาจาก WebFetch primary ตรง มีเครื่องหมายคำพูดถูกต้อง ✅ ส่วน OpenAI (X post, primary บล็อก) ไม่ได้ใส่ quote mark ในดราฟท์ เขียนเป็นความ (paraphrase) แทน (rule k) ✅

5. dedup รวม — fable-scan/grep CONTENT_INDEX.md ทั้งไฟล์ หา "Nvidia 96", "Jalapeño first results", "Nscale" ไม่พบซ้ำ (Jalapeño ตัวชิปเคยพูดถึงแต่คนละ event ตามข้อ 2) ✅
6. ไม่เอ่ยชื่อ Master J, ไม่มี credentials/secrets ในดราฟท์ ✅
7. Pillar: P1 AI News — ล่าสุด (27 ส.ค. กลางวัน) เป็น P3 ไม่ติดกัน ไม่ต้องสลับ ✅
8. ความยาว caption: 4,489 ตัวอักษร (อยู่ในช่วง 3,000–4,500 ตามเกณฑ์ SOP) ✅

## สรุป
พบ+แก้ 2 จุดระหว่างตรวจ: (1) URL Nvidia press release ผิดปีในการ fetch ครั้งแรก แก้ด้วยการค้นหา exact title ใหม่ (2) ระบุชื่อรุ่น GB300 ให้ชัดแทนคำกว้างๆ "เรือธง" — ไม่มีจุดอื่นที่ต้องแก้เพิ่ม draft พร้อมสำหรับขั้นถัดไป
