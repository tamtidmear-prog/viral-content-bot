# Fact-check — Chronicle noon 4 ส.ค. 2026 (Automation Bias)

**ผู้ตรวจ:** Nexus + 3 lane ขนาน · **เวลา:** 2026-08-04 11:4x +07
**Draft:** `viral-content-bot/platform_social/facebook/prism-chronicle/drafts/2026-08-04_noon_ai_news.md`
**สถานะ:** ⚠️ **ยังไม่ FINAL OK — แก้ 4 จุด (1 จุดบังคับ)**

> วิธีตรวจ: เปิด primary source อ่านเองทุกข้อ (PubMed E-utilities · arXiv · Rowan Digital Works)
> ไม่มีข้อไหนตัดสินจากบทสรุปของ search engine

---

## 🔴 บังคับแก้ — 1 จุด

### เคสที่ 2 (Rowan) ต้องกำกับว่าเป็น **poster ของนักศึกษา ไม่ใช่งานตีพิมพ์ผ่าน peer review**

ตัวเลข**ถูกต้องทุกตัว** (ผมเปิด abstract ต้นทางเองยืนยัน) แต่สถานะงานไม่ใช่อย่างที่ร่างสื่อ

```
ต้นทาง: https://rdw.rowan.edu/stratford_research_day/2026/may6and7/150/
ชนิด  : Poster presentation — 30th Annual Rowan-Virtua Research Day, 6 พ.ค. 2026
        ← ไม่ใช่ journal article · ยังไม่ผ่าน peer review
```

ร่างบรรทัด 31 เขียนว่า *"ทีมวิจัยจาก Rowan University ... ทำ systematic review"* — อ่านแล้วเข้าใจว่าเป็นงานตีพิมพ์
โพสต์นี้กำลังเอาตัวเลขทางการแพทย์ (ความแม่นยำรังสีแพทย์ร่วงเหลือ 19.8%) ไปบอกคนทั่วไป
**น้ำหนักของ "งานตีพิมพ์" กับ "โปสเตอร์ในงาน research day ของนักศึกษา" ต่างกันมาก**

→ แก้เป็น: *"งานทบทวนวรรณกรรมเชิงระบบที่นำเสนอเป็นโปสเตอร์ในงาน Rowan-Virtua Research Day 2026
(ยังไม่ผ่าน peer review)"*

**ไม่ต้องตัดเคสนี้ทิ้ง** — ตัวเลขจริง ต้นทางตรวจสอบได้ แค่ต้องบอกสถานะให้ตรง

---

## 🟠 ควรแก้ — 3 จุด

### 1. คำนิยาม complacency vs bias คลาดเคลื่อน (บรรทัด 14-15)

ดึง abstract เต็มจาก PubMed แล้ว (PMID 21077562) — คำต่อคำ:

```
ร่างเขียน
  Complacency = "แนวโน้มที่จะพึ่งพาคำแนะนำจากระบบอัตโนมัติ"
  Bias        = "แนวโน้มที่จะรับคำแนะนำมาใช้โดยไม่ตรวจสอบซ้ำ"

เปเปอร์เขียน
  "Automation complacency occurs under conditions of multiple-task load,
   when manual tasks compete with the automated task for the operator's attention"
   → แก่นคือ ตรวจตราระบบไม่พอ เพราะงานอื่นแย่งความสนใจ (ไม่ใช่ "พึ่งพา")

  "Automation bias results in making both omission and commission errors
   when decision aids are imperfect"
   → ทำผิด 2 แบบ: พลาดสิ่งที่ระบบไม่แจ้ง (omission) + ทำตามระบบทั้งที่ผิด (commission)
```

ร่างทำให้สองคำฟังดูเป็นเรื่องเดียวกัน ทั้งที่เปเปอร์ตั้งใจแยก
→ เสนอ: *"Complacency — ตรวจตราระบบน้อยลงเมื่อมีงานอื่นแย่งความสนใจ"* /
*"Bias — ทำผิดสองแบบเมื่อระบบให้คำแนะนำผิด คือพลาดสิ่งที่ระบบไม่ได้เตือน และทำตามสิ่งที่ระบบเตือนผิด"*

### 2. "Mosier และ Skitka" — มีผู้ร่วมวิจัยอีก 2 คน และปีไม่นิ่ง (บรรทัด 11)

```
เปเปอร์: "Automation bias: decision making and performance in high-tech cockpits"
ผู้แต่ง : K.L. Mosier, L.J. Skitka, S. Heers, M. Burdick
วารสาร : International Journal of Aviation Psychology 8(1):47-63
ปี      : PubMed ระบุ 1997 · แหล่งอื่นอ้าง 1998 บ่อยกว่า (cover-year ไม่ตรงกัน)
นิยามในเปเปอร์: "omission and commission errors resulting from the use of automated cues
  as a heuristic replacement for vigilant information seeking and processing"
```

→ เสนอ: *"Mosier, Skitka และทีม (ปลายยุค 1990s)"* — กันคนตามไปเช็คแล้วเจอชื่ออีก 2 คน
→ บริบท **cockpit/นักบิน ถูกต้อง** ✓ (ร่างเขียน "การบิน (autopilot)" ใช้ได้ แต่จริงๆ คือระบบอัตโนมัติในห้องนักบินโดยรวม ไม่เจาะจง autopilot)

### 3. "บางครั้งกลับทำให้คนเชื่อ AI เร็วขึ้นด้วยซ้ำ" — ไม่มีในต้นทาง (บรรทัด 46)

abstract ของ Rowan เขียนแค่:
> *"Interventions including explainability inputs and attitudinal priming
> failed to significantly reduce automation bias."*

= **"ลดไม่ได้"** เท่านั้น — **ไม่ได้บอกว่า "ทำให้แย่ลง"**
ร่างเติมทิศทางที่ต้นทางไม่ได้พูด (และเหตุผลที่ร่างอธิบายต่อ ก็เป็นการตีความของเราเอง)

→ ตัดประโยคนั้น หรือเขียนแยกให้ชัดว่าเป็นข้อสังเกตของเราเอง ไม่ใช่ผลวิจัย
→ ✅ ส่วนที่ร่างระบุว่า *"งานวิจัยในสาขารังสีวิทยาพบว่า..."* — **ระบุแหล่งถูกแล้ว** (เป็นของ Rowan ไม่ใช่ Beck et al.)

---

## ✅ ยืนยันแล้ว — ใช้ได้ตามร่าง

### Parasuraman & Manzey 2010 — ตรงทุกข้อ
```
"Complacency and Bias in Human Use of Automation: An Attentional Integration"
Hum Factors 2010 Jun;52(3):381-410 · doi:10.1177/0018720810376055 · PMID 21077562
✓ แยก complacency/bias จริง — "considered separately and independently" → เสนอว่าเป็น
  "different manifestations of overlapping automation-induced phenomena"
✓ กรอบ attention — อยู่ในชื่อเรื่อง ("Attentional Integration") + "attention playing a central role"
✓ ภาระงานหนัก — "under conditions of multiple-task load"
```

### Bias in the Loop — ตรง 100% (ผมเปิด arXiv อ่านเอง)
```
arXiv 2509.08514 · submitted 10 Sep 2025
"Bias in the Loop: How Humans Evaluate AI-Generated Suggestions"
Jacob Beck, Stephanie Eckman, Christoph Kern, Frauke Kreuter    ← ครบ สะกดถูก ลำดับถูก
✓ 2,784 participants
✓ "requiring corrections for flagged AI errors reduced engagement and increased
   the tendency to accept incorrect suggestions"
✓ "individual attitudes toward AI emerged as the strongest predictor of performance,
   surpassing demographic factors"
✓ "Participants skeptical of AI detected errors more reliably and achieved higher accuracy"
```

### Rowan — ตัวเลขตรงเป๊ะทุกหลัก
```
5 studies (mammography / chest radiography / MRI) · PubMed เม.ย. 2016–เม.ย. 2026 · PRISMA
pooled OR 4.89 (95% CI 2.14–11.18, p<0.001)
inexperienced: 79.7% → 19.8% · subgroup OR 15.57
ผู้แต่ง: Wesley Augustus Kim, Harshal Parmar, Nikhila Archakam, Akhila Archakam, Brandon Velazquez
mentor: Brandon Velazquez (Hudson Regional Health)
```

---

## 💡 ของดีที่ยังไม่ได้ใช้ — 3 อย่าง (ไม่บังคับ แต่เสียดาย)

**1. ประโยคที่หนุนบทสรุปของคุณโดยตรง** — Parasuraman & Manzey เขียนไว้เองว่า:
> *"found in both naive and expert participants and **cannot be overcome with simple practice**"*
> *"**cannot be prevented by training or instructions**"*

ร่างบรรทัด 57 สรุปว่า *"ไม่ใช่เรื่องของคนโง่หรือคนขี้เกียจ"* — ประโยคข้างบนพูดเรื่องเดียวกัน
แต่เป็นคำของเปเปอร์ หนักแน่นกว่าการสรุปเอง

**2. อีกครึ่งของผลวิจัย Beck et al. ที่ร่างไม่ได้พูด:**
> *"those favorable toward automation exhibited **dangerous overreliance** on algorithmic suggestions"*

ร่างพูดแต่ฝั่ง "คนสงสัยจับ error ได้แม่นกว่า" — อีกฝั่งคือ "คนที่ชอบ AI พึ่งพาแบบอันตราย"
ครบสองด้านจะคมกว่า

**3. Beck et al. ทดลอง 3 ตัวแปร ไม่ใช่ 2** — คุณภาพคำแนะนำ AI · ภาระการแก้ไข · **สิ่งจูงใจทางการเงิน**
ร่างพูดถึงแค่ 2 ตัวแรก

---

## ⚠️ ที่ยืนยันไม่ได้ / ควรระวัง

| เรื่อง | สถานะ |
|---|---|
| *"เกิดสม่ำเสมอในทุกสาขาย่อยและทุกระดับประสบการณ์"* (บรรทัด 33) | ไม่พบประโยคนี้ใน abstract ที่เปิดอ่านได้ · และดูขัดกับตัวเองนิดๆ (ถ้าทุกระดับเท่ากัน ทำไมกลุ่มประสบการณ์น้อยถึงมี OR สูงกว่า 3 เท่า) → เสนอตัด หรือเปลี่ยนเป็น "พบในทุกสาขาย่อยที่ตรวจ และกลุ่มประสบการณ์น้อยได้รับผลหนักที่สุด" |
| รายชื่อ 5 studies ที่ Rowan รวมมา | abstract ไม่ลิสต์รายตัว — **ห้ามอ้างชื่อ study ย่อย** |
| SAGE 1996 (Mosier et al. "Automation Bias, Accountability, and Verification Behaviors") | ยืนยันว่ามีเปเปอร์จริงจาก catalog แต่เปิดเนื้อในไม่ได้ (403 ทั้ง direct และผ่าน proxy) — ไม่กระทบข้อสรุป |

**ขอบเขตการอ้างอิง:** Beck et al. เป็น controlled annotation task (งานทดลอง ไม่ใช่การใช้งานจริง) ·
Rowan ครอบเฉพาะรังสีวิทยา 3 modality — ทั้งคู่ generalize ข้ามไปงานอื่นต้องระวัง
ร่างไม่ได้ generalize เกินอยู่แล้ว แต่ถ้าจะเติมคำกำกับก็ยิ่งดี

---

## สรุป

**ตัวเลขทั้งหมดในร่างถูกต้อง ไม่มีตัวไหนผิดหรือถูกปั้นขึ้น** — ผมเปิดต้นทางยืนยันเองครบทุกตัว
ที่ต้องแก้คือ **สถานะของงาน** (poster ≠ peer-reviewed) · **คำนิยาม** · **การเติมทิศทางที่ต้นทางไม่ได้พูด**

แก้ 4 จุดแล้วส่งกลับ ผมตรวจปิดให้ (ขอ md5 ของ draft + infographic ด้วยเหมือนเดิม)
