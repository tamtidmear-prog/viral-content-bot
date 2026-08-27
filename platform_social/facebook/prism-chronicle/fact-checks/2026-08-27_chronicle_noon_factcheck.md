# Self Fact-Check — Chronicle noon 2026-08-27 (ตรวจเองตาม standing instruction 2026-08-09, ไม่ส่ง Nexus — memory: self-check-no-nexus-review.md)

## หัวข้อ: เทียบฟีเจอร์ Memory ข้ามแชท — Claude vs ChatGPT vs Gemini

เนื้อหานี้ reuse โครงจาก draft เดิม (`drafts/2026-08-26_เย็น_ai_news.md`, เตรียมไว้ตั้งแต่ 25 ส.ค.) แต่ **พบว่าเนื้อหาเดิม stale/ผิดจริง** เพราะ Claude Memory มีอัปเดตใหม่ระหว่างทาง — ต้อง research + WebFetch ใหม่ทั้งหมดก่อนใช้ ไม่ใช่แค่เช็คผ่านๆ

## เรื่องที่ 1: Claude Memory — ไทม์ไลน์
- 11 ก.ย. 2025 เปิด Team/Enterprise ก่อน — verified: claude.com/blog/memory (WebFetch primary สำเร็จ, ระบุวันที่ publish 2025-09-11)
- 23 ต.ค. 2025 ขยาย Pro/Max — verified: claude.com/blog/memory (update section วันเดียวกัน)
- **2 มี.ค. 2026 ขยายให้ผู้ใช้ฟรีด้วย (memory จาก chat history)** — verified: support.claude.com/en/articles/12138966-release-notes (WebFetch primary, official release notes)
- **10 ก.ค. 2026 เปลี่ยนจากสรุปรายวันเป็น memory entries แยกหัวข้อ (ทุกแพลน)** — verified: support.claude.com release-notes เดียวกัน
- **25 ส.ค. 2026 (2 วันก่อนโพสนี้) เปลี่ยนเป็น on-by-default สำหรับ Free/Pro/Max, Team/Enterprise ยังปิดเป็นค่าเริ่มต้น + เพิ่มตัวเลือกกันหัวข้ออ่อนไหว (สุขภาพ/ความเชื่อ)** — verified: support.claude.com release-notes เดียวกัน ตรง

⚠️ **จุดสำคัญที่แก้จาก draft เดิม:** draft เดิม (เตรียมไว้ 25 ส.ค.) เขียนว่า "ผู้ใช้ฟรีไม่มีสิทธิ์เข้าถึง Memory เลย" — **ข้อความนี้ผิดแล้วตั้งแต่ 2 มี.ค. 2026** และยิ่งผิดชัดขึ้นหลัง 25 ส.ค. ที่เปลี่ยนเป็น on-by-default ให้ฟรีด้วย ถ้าโพสตามเดิมจะเป็นข้อมูลผิดที่กระทบ core comparison ของทั้งโพส (rule: reused content ต้อง re-verify ก่อนโพสซ้ำเสมอ — เจอจริงในเคสนี้)

## เรื่องที่ 2: ChatGPT Memory
- ฟรีเริ่ม 3 มิ.ย. 2025 — verified cross-check: bleepingcomputer.com + BGR.com + openai.com/index/memory-and-new-controls-for-chatgpt (WebSearch, ≥3 แหล่งตรงกัน, primary help.openai.com บล็อก 403 จึงใช้ cross-verify แทน)
- saved memories vs chat history, ปรับที่ Settings → Personalization → Memory — ตรงตามแหล่งเดิม (ไม่เปลี่ยน)
- "Dreaming" ระบบใหม่ เริ่ม 4 มิ.ย. 2026 Plus/Pro ในสหรัฐฯ ก่อน — verified: WebSearch cross-check (digitalapplied.com + xda-developers.com สอดคล้องกัน) — **ไม่ใช้ตัวเลข "82.8% vs 41.5%" ในดราฟต์เพราะเป็นเลขที่มาจาก AI-search-summary เดียว ไม่เจอ primary ยืนยันตรง (rule k) — hedge เป็น "ทยอยเปิด...ยังไม่ครอบคลุมทุกประเทศ" แทน**

## เรื่องที่ 3: Gemini Personal Intelligence
- เปิดตัวเบต้า 14 ม.ค. 2026 — verified: gemini.google/overview/personal-intelligence/ (WebFetch primary สำเร็จ)
- อายุ 18+, บัญชีส่วนตัว (ไม่ใช่ work/school) — verified ตรง primary เดียวกัน
- เชื่อม Gmail/Photos/Search/YouTube — verified ตรง primary
- ไม่เปิดในเขต EEA/สวิตเซอร์แลนด์/UK/ไนจีเรีย — verified ตรง primary
- **ตัดทิ้ง:** claim "ต้อง Google AI Pro/Ultra subscription" ที่เจอใน secondary blog (aifire.co) — primary (gemini.google อย่างเป็นทางการ) ไม่ได้ระบุเงื่อนไข subscription เลย ยืนยันไม่ได้ชัดพอ ไม่ใส่ทั้งสองทาง (ไม่เขียนว่าฟรีหรือต้องจ่าย)
- **ตัดทิ้ง:** claim เดิม "ใช้กับ Gems หรือ Live chat ไม่ได้" — ไม่พบยืนยันจาก primary ที่เปิดได้ ตัดออกกันข้อมูลเดา

## Dedup check (grep CONTENT_INDEX.md เต็มไฟล์)
- "Memory" (หัวข้อเทียบ 3 AI นี้) — ไม่เคยโพสจริงมาก่อน (เคยเตรียมไว้ 3 รอบ 25เย็น/26เช้า/26เย็น แต่ทุกรอบพลาด window ก่อนอนุมัติ ไม่เคย publish จริง — ตรวจผ่าน Graph API `/posts` ล่าสุด 25 ส.ค. เท่านั้น)
- "Personal Intelligence" — ไม่พบเคยโพส
- "Dreaming" เคยถูกกล่าวถึงสั้นๆ ใน index 12 มิ.ย. (บรรทัดเดียวในโพสข่าวรวมหลายเรื่อง "OpenAI dreaming memory") — คนละบริบท (ครั้งนั้นเป็นข่าวเปิดตัว, ครั้งนี้เป็นรายละเอียดย่อยในโพสเทียบฟีเจอร์) ไม่ถือว่าซ้ำ

## Pillar balance
- โพสจริงล่าสุด: 24 ส.ค.(กลางวัน)=P1, 25 ส.ค.(เช้า)=P2, 25 ส.ค.(กลางวัน)=P1 (26 ส.ค.+27 ส.ค.เช้า ไม่มีการโพสจริงเลย — ยืนยันผ่าน Graph API)
- เลือก **Pillar 3: How-To** (เทียบฟีเจอร์ใช้งานจริง) — สลับจาก P1 ที่โพสจริงล่าสุด ตรงตามกฎ "P1 ติดกัน ≥2 slot → สลับ 2/3"

## ตัวเลข/quote ที่ตรวจแล้วไม่ใช้
- ChatGPT Dreaming accuracy stat (82.8%/41.5%) — ตัดทิ้ง ไม่มี primary
- Gemini Pro/Ultra subscription requirement — ตัดทิ้ง ขัดกับ primary ที่ไม่ระบุ
- ไม่มี quote บุคคลใดในดราฟต์นี้เลย (rule k ไม่กระทบ)

## สรุป
พบ+แก้ fact ผิดสำคัญ 1 จุด (Claude free-tier memory ที่เปลี่ยนไปแล้วตั้งแต่ มี.ค.+ส.ค. 2026) ก่อนโพส — ป้องกันข้อมูลเก่าหลุดไปโพสจริงเป็นรอบที่ 4 ของหัวข้อนี้ (25เย็น→26เช้า→26เย็น→27กลางวัน) ตัด claim ที่ยืนยันไม่ได้ชัด 2 จุด (ChatGPT stat, Gemini subscription) ตาม rule k

VERDICT: PASS หลังแก้ — draft พร้อมสร้าง infographic ต่อ
