# Fact-check (self-check) — Chronicle กลางวัน 10 ส.ค. ("ยิ่งใช้ AI มาก ยิ่งคิดเองน้อยลง จริงไหม")

**By:** Prism (self-check ตาม Master J instruction 2026-08-09, memory: self-check-no-nexus-review — ไม่ route ผ่าน Nexus)
**Draft:** `viral-content-bot/platform_social/facebook/prism-chronicle/drafts/2026-08-10_noon_draft.md`
**md5 draft:** `4c706efb2504ad7f9b2fabd1ac9a5e3f`
**Pillar:** 2 (วิธีคิด) — สลับจาก Pillar 1 ที่ติดกัน 2 slot ล่าสุด (08-09 เย็น, 08-10 เช้า) ตามกฎ Pillar Balance ใน CONTENT_INDEX.md

```
สรุป: 0 FALSE · ทั้งสองงานวิจัยตรวจจาก primary (arXiv abstract page + full CHI'25 PDF ตรง) · ตัวเลขทุกจุดตรงต้นฉบับ · hedge preprint status ครบ
```

## จุดที่ตรวจ

### 1. MIT Media Lab — "Your Brain on ChatGPT"
- Title เต็ม: "Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task" ✓ ตรงกับหน้า media.mit.edu/publications
- Authors: Nataliya Kosmyna, Eugene Hauptmann, Ye Tong Yuan, Jessica Situ, Xian-Hao Liao, Ashly Vivian Beresnitzky, Iris Braunstein, Pattie Maes ✓
- Status: **preprint, arXiv:2506.08872, มิ.ย. 2025 — ยังไม่ผ่าน peer review** ✓ draft ระบุ hedge นี้ชัดเจนในย่อหน้า "⚠️ ข้อควรระวัง"
- N=54 (session 1-3), เหลือ 18 คนใน session 4 ✓ ตรง
- 3 กลุ่ม: LLM / Search Engine / Brain-only ✓ ตรง
- EEG: brain-only = strongest/most distributed connectivity, search = moderate, LLM = weakest ✓ ตรงคำต่อคำจาก fetch
- Ownership of essay: ต่ำสุดในกลุ่ม LLM, สูงสุดในกลุ่ม Brain-only ✓ ตรง
- LLM users "struggled accurately quoting their own work" → draft เขียนเป็นความ ไม่ใส่ quote mark (rule k) ✓
- Session 4: Brain-to-LLM switchers = memory recall + prefrontal activation สูงกว่า, คล้าย search group / LLM-to-Brain switchers = alpha/beta connectivity ต่ำ under-engaged → draft ใช้เป็นฐานของ tip ข้อ 1 ✓ ตรง

### 2. CHI 2025 — Lee et al. (Microsoft Research + CMU)
- Title เต็ม: "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers" ✓
- Authors: Hao-Ping (Hank) Lee (CMU), Advait Sarkar, Lev Tankelevitch, Ian Drosos, Sean Rintel, Richard Banks, Nicholas Wilson (Microsoft Research) ✓
- Venue: CHI '25, 26 เม.ย.–1 พ.ค. 2025, Yokohama, Japan ✓ ตรง PDF หน้า 1
- N=319 knowledge workers, 936 ตัวอย่างจริง (จาก 957 เก็บมา ตัดออก 21) ✓ ตรง abstract + section 3.3.1
- Key finding: confidence ใน GenAI สูง → critical thinking ลดลง / confidence ในตัวเองสูง → critical thinking เพิ่มขึ้น ✓ ตรงคำต่อคำจาก abstract
- "Verify by cross-referencing external sources (114/319)" ✓ ตรง PDF หน้า 8
- "Verify by assessing referenced sources (23/319)" ✓ ตรง PDF หน้า 8 (P213 ตัวอย่างงาน job listing ที่ไม่มีจริง — draft paraphrase ไม่ใช้ quote mark ตรงตาม rule k)
- **ไม่ใช้** ตัวเลข Bloom's taxonomy % (72%/79%/69%/72%/76%) ที่เจอจาก secondary summary เพราะ ACM DL 403 เปิด primary ไม่ได้ตอนแรก — ตัดออกจาก draft ทั้งหมด ป้องกัน unverified-number ตาม rule k แม้ WebFetch PDF สำเร็จภายหลัง (Bloom's % breakdown อยู่ใน section อื่นที่ไม่ได้อ่านเต็ม ไม่เสี่ยงใช้)

### 3. คำที่ควรระวัง
- ไม่ได้เขียนว่า "AI ทำให้สมองโง่ลง" หรือสรุปเกินหลักฐาน — ทั้งสองงานเป็น correlation/self-report ไม่ใช่ causal proof ระยะยาว → draft ใช้คำ "มีแนวโน้ม" ตลอด ไม่ฟันธง
- ระบุ hedge preprint (MIT) ชัดเจนในเนื้อหา ไม่ปล่อยให้อ่านเหมือนงานวิจัยที่ผ่าน peer review แล้ว
- ไม่เอ่ยชื่อ Master J ในเนื้อหา ✓
- ไม่มี credential/secret/token ✓

## Infographic source (ยังไม่สร้าง ณ ตอนเขียนไฟล์นี้)
จะเขียนหลังไฟล์นี้ตามลำดับ (gate d) — ตัวเลขที่จะใช้ในภาพ: 54, 18, 319, 936, 114, 23 (ทุกตัวตรวจแล้วข้างบน) ต้องปรากฏใน caption ด้วยครบ (gate e)

**Verdict: FINAL OK ให้ผ่านไปทำ infographic ต่อได้**
