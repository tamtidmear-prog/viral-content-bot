# Fact-check: chronicle_noon draft 2026-07-31

**From**: Nexus · 2026-07-31 ~11:00 +07
**วิธีตรวจ**: Codex --search (primary sources: EC press release, CAC full text, Perplexity official pages) + WebSearch อิสระ (independent replication) — สองขาตรวจแยกกันแล้ว adjudicate จุดขัดแย้ง

## สรุปหัวไฟล์: ทั้ง 3 claims มีจุดต้องแก้ก่อนโพสต์ — จุดใหญ่สุดคือวันที่ 15 ก.ค. ของจีน (เป็นวันมีผลของกฎ**คนละฉบับ**)

---

## CLAIM 1 — EU AI Gigafactory · **PARTIALLY WRONG แก้ 4 จุด**

### ✓ ใช้ได้ตามเดิม
- EC เปิดรับ 30 ก.ค. 2026 (ทางการเรียก **call for tenders**) · ทุนรัฐสูงสุด €10B (~$11.4B — AP ใช้เลขนี้) · เอกชนสมทบ ≥€20B
- ปิดรับ 12 พ.ย. 2026 · ผลคาดต้นปี 2027 · เปิดใช้ภายใน 18 เดือนหลังเซ็นสัญญา
- Lot1: สูงสุด €100M/โครงการ phase 1 → เพิ่มได้ถึง €400M phase 2 (รองรับ 4 โครงการ) · Lot2: €200M→€800M (3 โครงการ)
- Source: [EC press release IP_26_1708](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_26_1708/IP_26_1708_EN.pdf)

### ✗ ต้องแก้
1. **"7 sites"** → "**สูงสุด 7 โครงการ Gigafactory**" — ทางการระบุ 1 Gigafactory อาจตั้งจุดเดียว หลายจุด หรือข้ามประเทศ ไม่เท่ากับ 7 physical sites
2. **"แต่ละแห่ง ≥100,000 AI chips"** → เอกสาร tender จริง (EuroHPC briefing): Lot1 ขั้นเต็ม **≥75,000 GPU-equivalents**, Lot2 **≥100,000** (ระยะแรกแค่ 25k/40k) — เลข "100k ทุกแห่ง" เป็น press simplification ของ AP/Euronews
3. **"แรงกว่า EU data center ปัจจุบันเฉลี่ย ~4 เท่า"** → ฐานเปรียบเทียบทางการคือ **จำนวน advanced AI processors เทียบกับ AI Factory ที่แรงที่สุดในยุโรป** (Lot1 ≥3×, Lot2 ≥4×) ไม่ใช่ "เฉลี่ย" และไม่ใช่ "กำลังประมวลผล"
4. **"งบรวม ~30B EUR"** → ทางการพูดว่า "คาดปลดล็อกการลงทุน**มากกว่า** €30B" (ไม่ใช่งบก้อนตายตัว) — แก้เป็น "คาดดึงการลงทุนรวม >€30B"

---

## CLAIM 2 — China AI agent regulation · **PARTIALLY WRONG แก้ 3 จุด (จุดอันตรายสุดของ draft)**

### ✓ ใช้ได้ตามเดิม
- ชื่อ: Implementation Opinions on the Regulated Application and Innovative Development of AI Agents (《智能体规范应用与创新发展实施意见》)
- CAC+NDRC+MIIT ร่วมออก **8 พ.ค. 2026** ✓ ([CAC announcement](https://www.cac.gov.cn/2026-05/08/c_1779979789472520.htm))
- แบ่งอำนาจตัดสินใจ 3 ระดับ ✓ · ผู้ใช้มีสิทธิ์รู้+ตัดสินใจสุดท้าย ✓ ([CAC full text item 6](https://www.cac.gov.cn/2026-05/08/c_1779979789523320.htm))

### ✗ ต้องแก้
1. **"มีผลบังคับใช้ 15 ก.ค. 2026" — ผิด ตัดออก**: Implementation Opinions เป็นเอกสารนโยบาย **ไม่มีมาตรากำหนดวันบังคับใช้** · วันที่ 15 ก.ค. เป็นของกฎ**คนละฉบับ**: Interim Measures for Anthropomorphic AI Interaction Services (ประกาศ 10 เม.ย., [CAC Order No.21](https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm)) — สื่อตะวันตกหลายเจ้า conflate สองฉบับนี้ (machinebrief, aigovernance ก็พลาดตาม ๆ กัน — WebSearch ขาแรกของผมก็เกือบเชื่อ)
2. **"กรอบกฎหมายแรกของโลกเฉพาะ AI agent"** → เป็น **แนวนโยบาย (policy framework) ไม่ใช่กฎหมาย** และ "แรกของโลก" ทางการจีนไม่ได้เคลม (พูดแค่ 率先构建 = เป็นผู้นำในการสร้างกรอบ) → แก้เป็น "กรอบนโยบายเฉพาะ AI agent ฉบับแรกของจีน ซึ่งสื่อวิเคราะห์ว่าเป็นฉบับแรกของโลก"
3. **"sector เสี่ยงสูง (สาธารณสุข คมนาคม สื่อ ความปลอดภัยสาธารณะ) ต้องยื่นจดทะเบียน+ทดสอบ+เรียกคืนได้"** — รวมข้อกำหนดคนละส่วน: 4 สาขานี้ถูกระบุเรื่อง **จัดทำ mandatory standards** ส่วน filing/testing/recall ใช้ถ้อยคำกว้างกว่า ("sensitive fields and key industries" ที่หน่วยงานจะกำหนดภายหลัง) → เขียนแยกสองประโยค อย่าผูกเป็นเหตุผลเดียวกัน

---

## CLAIM 3 — Perplexity Personal Computer (Windows) · **PARTIALLY WRONG แก้ 2 จุด + soften 2**

### ✓ ใช้ได้ตามเดิม
- **เปิดตัว 28 ก.ค. 2026** ✓ — convergence หลายสำนักอิสระลงวันเดียวกัน (SiliconANGLE, TechTimes, Seeking Alpha) + blog ทางการ "[Personal Computer is now available on Windows](https://www.perplexity.ai/hub/blog/personal-computer-on-windows)" (หมายเหตุ: หน้า Perplexity 403 บอทเช็คตรงไม่ได้ — Codex เจอแต่หน้า "coming to Windows" ฉบับ 3 มิ.ย. เลย verdict unverifiable แต่ blog "now available" ที่ใหม่กว่ามีจริงใน index)
- เข้าถึง/แก้ไฟล์ Word/Excel local ✓ · default orchestrator **Claude Opus 4.7** ✓ (สลับ GPT-5.4/Sonnet 4.6 ได้ — [changelog 16 เม.ย.](https://www.perplexity.ai/changelog/personal-computer-on-mac-launch-and-computer-updates---april-17-2026)) · แตกงาน 20+ models ✓ · Max $200/เดือน ✓

### ✗ ต้องแก้
1. **"(ประมวลผลบนคลาวด์ ไม่ใช่ในเครื่อง)" — ผิดและขัดกับคำว่า hybrid ในประโยคเดียวกัน**: ระบบเป็น hybrid จริง — งานเบา/privacy-sensitive รันในเครื่อง (on-device models + on-device authorization), orchestrator+งานหนักอยู่คลาวด์ → แก้เป็น "(orchestrator อยู่คลาวด์ งานเบา/งานอ่อนไหวรันในเครื่อง)"
2. **"เปิดเฉพาะ Max/Enterprise Max (เริ่ม $200/เดือน)"** → "ทยอยเปิดให้ Max/Enterprise Max **ก่อน**" (ไม่ใช่ exclusive ถาวร) · "เริ่ม $200" ใช้ได้เฉพาะ Max — Enterprise Max จริง **$325/user/เดือน** อย่าให้เลขคลุมสอง tier

### ⚠️ ควร soften (ไม่ผิดแต่เกินหลักฐาน)
- **"4-layer hybrid"** — เลข "4 ชั้น" Perplexity ไม่เคยยืนยันเอง เป็นคำของสื่อ (MarkTechPost/VentureBeat จาก Computex) → ตัดเลขทิ้งเหลือ "hybrid" หรือ attribute ว่าสื่อวิเคราะห์
- **"แข่งกับ Microsoft Copilot"** — framing ของสื่อ ไม่ใช่คำ Perplexity/Microsoft → เขียนเป็นบทวิเคราะห์ได้ แต่อย่าเสนอเป็น fact

---

## Cross-check note (เพื่อความโปร่งใสตาม replication caveat)
- Codex อ่าน primary ตรง (EC PDF, CAC full text, Perplexity official) — น้ำหนักสูงสุด
- WebSearch ของผมเป็นขาอิสระ แต่รอบนี้**พลาดตาม secondary press 2 จุด** (100k chips ทุกแห่ง, มีผล 15 ก.ค.) — Codex จับได้เพราะเปิดเอกสารต้นทาง = ยืนยันอีกครั้งว่า secondary convergence ≠ ความจริง (หลายสำนักลอกผิดตามกันได้)
- จุดเดียวที่ผมกลับ verdict ของ Codex: วันเปิดตัว Perplexity 28 ก.ค. (Codex หยุดที่หน้าเก่า 3 มิ.ย. — มี blog "now available" ใหม่กว่าอยู่จริง)

— Nexus
