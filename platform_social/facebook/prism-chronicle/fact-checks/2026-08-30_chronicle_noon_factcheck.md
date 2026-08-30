# Self fact-check — Chronicle กลางวัน 30 ส.ค. 2026 (หัวข้อ: Premortem technique — Gary Klein, HBR 2007)

> [SUPERSEDED 2026-08-09] ไม่ส่งให้ Nexus review — self-check ตาม standing order Master J (memory: self-check-no-nexus-review, ยืนยันซ้ำ 26 ส.ค. — ห้ามส่งสถานะ/คำขอใดๆ กลับ Nexus แม้แต่ FYI)

## Pillar rotation check (บังคับก่อนเลือกหัวข้อ)
- 28 ส.ค. กลางวัน = Pillar 1 (AI News), 29 ส.ค. กลางวัน = Pillar 1 (AI News) → ติดกัน 2 slot ติดต่อกัน (ยืนยันจาก logs/2026-08-29_daily.md บรรทัด "slot ถัดไปต้องสลับ P2/P3")
- วันนี้ (30 ส.ค. กลางวัน) เลือก **Pillar 2: กระบวนการความคิด** (premortem) → สลับตามกฎถูกต้อง ✅
- หมายเหตุ: chronicle_morning วันนี้ (30 ส.ค.) ไม่มี draft/post/status json ค้าง — ดูเหมือน slot เช้าพลาดไปเงียบๆ (กฎ "พลาด slot = ข้าม" ไม่ backfill) ไม่กระทบ slot กลางวันนี้

## Claims ที่ตรวจ — ทุกจุดยืนยันจาก primary เต็มฉบับ (WebFetch PDF)

**Primary source:** `http://homepages.se.edu/cvonbergen/files/2013/01/Performing-a-Project-Premortem.pdf` — พบว่าเป็น reprint เต็มฉบับของบทความ HBR กันยายน 2007 หน้า 18-19 (Reprint F0709A) ไม่ใช่แค่ abstract — อ่านเนื้อหาทั้งหมดตรงจาก PDF ผ่าน Read tool (ไม่ใช่ WebFetch summary จากโมเดลเล็ก — ได้ raw text เต็ม จึงเชื่อถือได้ระดับ primary จริง ตาม rule k)

1. **ผู้เขียน Gary Klein, chief scientist ของ Klein Associates (division of Applied Research Associates, Fairborn, Ohio)** — ตรงกับ byline ท้ายบทความในต้นฉบับ ✅ (เขียนหนังสือ *Sources of Power* (MIT Press, 1998) และ *The Power of Intuition* (Doubleday, 2004) — ตรงตาม bio ท้ายบทความ ไม่ได้ใส่ในดราฟท์เพราะไม่จำเป็นต่อประเด็นหลัก)
2. **ตีพิมพ์ HBR กันยายน 2007, section "Forethought/GRIST"** — ตรงตาม header หน้า 18 ของ PDF ✅
3. **วิจัยปี 1989 โดย Deborah J. Mitchell (Wharton School), Jay Russo (Cornell), Nancy Pennington (University of Colorado)** — ชื่อ+สถาบันตรงคำต่อคำจากต้นฉบับ ("Research conducted in 1989 by Deborah J. Mitchell, of the Wharton School; Jay Russo, of Cornell; and Nancy Pennington, of the University of Colorado") ✅
4. **prospective hindsight เพิ่มความสามารถระบุสาเหตุผลลัพธ์อนาคตถูกต้องขึ้น 30%** — ตรงคำต่อคำจากต้นฉบับ ("increases the ability to correctly identify reasons for future outcomes by 30%") ✅ ตัวเลขนี้เจอยืนยันซ้ำจาก WebSearch cross-source (get-alfred.ai, nesslabs.com) ตรงกันด้วย
5. **นิยาม premortem = ตรงข้าม postmortem, ถามว่า "อะไรทำให้มันตายไปแล้ว" แทน "อะไรอาจจะผิดพลาด"** — ตรงตามต้นฉบับ ("Unlike a typical critiquing session...the premortem operates on the assumption that the 'patient' has died, and so asks what did go wrong") ✅
6. **4 ขั้นตอน (ประกาศว่าล้มเหลว → เขียนสาเหตุแยกกันเงียบๆ → อ่านทีละคนวนจนครบ → PM ทบทวนแผน)** — สรุปตรงตาม paragraph "A typical premortem begins..." ของต้นฉบับ ครบทุกขั้น ไม่มีขั้นที่แต่งเพิ่ม ✅
7. **เคสตัวอย่าง military air-campaign algorithm — แล็ปท็อปสนามรันช้า, มี shortcut ที่ทีมไม่กล้าเสนอมาก่อน, โปรเจกต์สำเร็จหลังใช้ shortcut** — ตรงตาม paragraph "In a session regarding a project to make state-of-the-art computer algorithms available to military air-campaign planners..." คำต่อคำ ✅
8. **เคสตัวอย่าง research project — ผู้บริหารชี้ "insufficient time to prepare a business case", ไม่มีใครพูดถึงข้อจำกัดเวลาตลอด 90 นาที, PM แก้แผนทัน** — ตรงตาม paragraph สุดท้ายก่อน "Although many project teams..." คำต่อคำ ✅
9. **ตัดเคส Fortune 50 (billion-dollar environmental sustainability project) ออกจากดราฟท์** — มีในต้นฉบับจริง (CEO เกษียณ, การแก้กฎของหน่วยงานรัฐ) แต่ตัดออกเพื่อไม่ให้ดราฟท์ยาวเกิน ไม่ใช่ fact error — ไม่กระทบความถูกต้อง
10. **quote ภาษาอังกฤษที่ใช้ในดราฟท์ ("prospective hindsight", "damn-the-torpedoes")** — ทั้งสองคำนี้ใช้เป็น technical term ในวงเล็บ ไม่ได้ใส่เครื่องหมายคำพูดครอบเป็น quote ของบุคคล ("damn-the-torpedoes attitude" ในดราฟท์ท้ายบทความหมายถึงพฤติกรรม ไม่ใช่คำพูดของใครคนหนึ่ง — ไม่ผิด rule k)

## Dedup check
- grep CONTENT_INDEX.md ทั้งไฟล์: "premortem", "Klein", "prospective hindsight", "Mitchell", "Russo", "Pennington" → ไม่พบ (0 hit) — หัวข้อนี้ไม่เคยโพสมาก่อน ✅
- Pillar 2 ที่เคยโพส: 529 Overloaded (25 ส.ค.), Chesterton's Fence (17 ส.ค.), Automation Bias ×2, 5 Whys, Goodhart's Law, Lost in the Middle, Brain-on-ChatGPT, Escalation of Commitment — ไม่ซ้ำแนวคิด/เนื้อหากับ premortem ✅

## อื่นๆ
- ไม่เอ่ยชื่อ Master J ✅
- ไม่มี credentials/secrets ✅
- เสียง Prism หญิง ค่ะ/นะคะ ตลอดทั้งโพส ✅
- ตัวเลขทั้งหมดในดราฟท์ (1989, 30%, 2007, 90 นาที) ตรงกับต้นฉบับทุกจุด ไม่มีปัดเศษ/บิดเบือน ✅

## สถานะ
ผ่านทุกจุด — ไม่มีจุดค้างต้องแก้
