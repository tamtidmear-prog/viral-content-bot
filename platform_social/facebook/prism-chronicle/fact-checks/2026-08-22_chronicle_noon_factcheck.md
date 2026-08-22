# Fact-check — chronicle_noon 22 ส.ค. 2026 (self-check, standing instruction 2026-08-09 — ห้ามโยนงานให้ Nexus)

หัวข้อ: Databricks ระดมทุน $5B/$190B valuation / Anthropic IPO เทียบ SpaceX record / ไต้หวันเจอ AI agent cyberattack near-autonomous (Pillar 1: AI News)

## ตรวจสอบแล้ว (WebFetch primary + WebSearch cross-check)

**1. Databricks $5B ที่ $190B valuation (13 ส.ค. 2026):**
- WebFetch techcrunch.com ตรง — $5B ที่ $190B valuation, จาก $134B เมื่อ 6 เดือนก่อน ✓
- Lead: Coatue + Blackstone, MGX, T. Rowe Price, Sixth Street Growth, ~24 VC ร่วม ✓ ตรง
- Revenue run-rate $7B (+80% YoY), Lakebase run-rate $100M ✓ ตรง (ตัวเลขเดียวกันซ้ำใน Bloomberg/CNBC/Yahoo cross-check)
- Quote Ali Ghodsi ("อยากระดม $1B... นักลงทุนเสนอเกิน $15B") — WebFetch primary TechCrunch (ผู้สัมภาษณ์ตรง ไม่ใช่ aggregator) ✓ ใช้ paraphrase ความหมายตรง ไม่ยกคำเป๊ะเป็น quote mark เพื่อความปลอดภัย

**2. Anthropic IPO เทียบ SpaceX record:**
- WebFetch siliconangle.com ตรง — เป้าไฟล์ IPO สิ้น ส.ค. 2026, ต้องการขนาดเท่า/มากกว่า SpaceX ✓ ตรง
- SpaceX: $75B (มิ.ย. 2026) + overallotment อาจแตะ $86.2B ✓ ตรง
- Anthropic: $965B valuation (พ.ค. 2026, ระดมได้ $65B), revenue Q2 2026 $11.5B vs $787M ปีก่อน (โต >14 เท่า), ขาดทุนสุทธิ 2025 $42B, ขอวงเงินสินเชื่อหมุนเวียน >$10B, แบงก์นำ Morgan Stanley/Goldman Sachs/JPMorgan ✓ ตรงทุกจุด
- Hedge: ระบุชัดในดราฟท์ว่าทั้งหมดเป็น "แผน/รายงาน" ไม่ใช่ยืนยันทางการ + เทียบ OpenAI ที่อาจเลื่อนไป 2027 ✓

**3. ไต้หวัน AI agent cyberattack near-autonomous:**
- Cross-check 3 แหล่ง (CNN/Tasnim summary ผ่าน WebSearch, ebuildersecurity.se WebFetch, kingy.ai WebFetch): ตัวเลขตรงกัน 21 ระบบ, 85+ บัญชี, 2,500+ records, ~4 วันต้น ก.ค. 2026, เปิดเผย/ยืนยันโดยกระทรวงกิจการดิจิทัลไต้หวัน 13 ส.ค. ✓
- Framework name: kingy.ai ระบุ "Hermes และ OpenClaw" สอดคล้องกับ WebSearch summary เดิม (CNN/Tasnim) — ebuildersecurity.se เขียนว่า "Dream framework" แต่เมื่ออ่าน context ต้นทางอีกครั้งพบว่า "Dream" คือชื่อบริษัทวิจัยที่ถูกอ้างถึง ("neither Taiwan nor Dream would confirm") ไม่ใช่ชื่อ framework — ใช้ Hermes/OpenClaw ตามที่ 2 แหล่งอิสระยืนยันตรงกัน
- 8 sub-agents ทำงานพร้อมกัน — ยืนยันตรงกัน 2 แหล่ง (WebSearch เดิม + kingy.ai) ✓
- Attribution: **สำคัญ — hedge ต้องคงไว้** ทุกแหล่งยืนยันตรงกันว่าเป็นเพียง "ข้อสงสัย" จากร่องรอยภาษาจีนตัวย่อในพื้นที่ทำงาน ไม่ใช่การยืนยันจากรัฐบาลไต้หวัน — ดราฟท์ใช้คำว่า "คาดว่า" + "ยังไม่ระบุอย่างเป็นทางการ" ตรงตามนี้ ไม่กล่าวหาเกินหลักฐาน
- ตัด quote ของ Cris Thomas (security researcher) ทิ้ง — มาจาก kingy.ai ซึ่งเป็น aggregator ไม่ใช่ primary ต้นตอ (rule k: search-summary ≠ quote) เขียนเป็นความแทนไม่ใส่เครื่องหมายคำพูด

## Dedup check
grep CONTENT_INDEX.md — ไม่พบ "Databricks", "SpaceX" (IPO context), หรือ "ไต้หวัน"/"Taiwan" มาก่อน ✓ ไม่ซ้ำ

## Sensitive-content check
เรื่องที่ 3 แตะประเด็นความมั่นคง/จีน — ตรวจแล้วเป็นการรายงานข่าวสาธารณะที่สื่อหลักหลายสำนักลงตรงกัน (CNN, Bloomberg-adjacent, ตรงกับที่เพจเคยรายงานข่าว AI cybersecurity/CVE มาก่อน) ไม่ใช่การวิเคราะห์การเมืองหรือกล่าวหาฝ่ายใดเกินหลักฐาน — ใช้ hedge ตรงตามแหล่งข่าวทุกจุด ประเมินว่าอยู่ในขอบเขต Pillar 1: AI News ปกติ ไม่ใช่เนื้อหา sensitive ที่ต้องหยุดถาม Master J

Draft: 4,440 ตัวอักษร (≥3,000, ≤4,500) ✓
