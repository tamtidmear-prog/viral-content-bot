# FINAL OK — chronicle_noon 16 ส.ค. 2026 (self-audit, standing instruction 2026-08-09)

หัวข้อ: How-To — 5 เทคนิค prompt engineering จากคู่มือทางการ Anthropic + OpenAI

## ตรวจครบตาม checklist
- [x] Pillar balance: เลือก Pillar 3 (How-To) เพราะ P1 ทำเช้านี้แล้ว (ห่าง 0), P3 ห่างสุด (2 slot)
- [x] Dedup check: หัวข้อ prompt engineering ยังไม่เคยทำใน CONTENT_INDEX
- [x] Fact-check: quote 3 จุดยืนยันคำต่อคำกับ primary (claude.com WebFetch) — ดู factcheck.md
- [x] Draft 3,759 ตัวอักษร (≥3,000)
- [x] Infographic: kawaii landscape 2752x1536, mascot คริสตัลถูกต้องทุกกล่อง — ใช้ 4 รอบ generate กว่าจะได้ที่สมบูรณ์:
      v1 typo 1 จุด (ช้อมูล→ข้อมูล, PIL patch สำเร็จ) → เขียน factcheck ที่ path ถูกหลัง generate ไปแล้ว ต้อง regenerate ใหม่ตามลำดับ (v2 สะอาดหมด) → เขียน final-ok path ถูก ต้อง regenerate อีกรอบให้ mtime ถูกต้อง (v3 เนื้อหาซ้ำ: กล่อง "อนุญาตให้ตอบไม่แน่ใจ" วาดซ้ำ 2 ครั้งแทนที่จะมี 5 เทคนิคครบ) → v4 (ใช้จริง) 5 กล่องครบต่างกันหมด zoom-check สะอาด 100%
- [x] Ordering: factcheck.md เขียนก่อน (11:39:17) → image gen หลัง (11:43:xx) ✓
- [x] Fact-parity: ไม่มีตัวเลขสถิติทั้งใน source และ caption — parity ผ่านโดยธรรมชาติ (ไม่มีเลขให้ orphan)
- [x] ไม่มีชื่อ Master J, ไม่มี credentials

## บทเรียนใหม่ (บันทึกไว้ใน retro)
พลาดลำดับ: generate ภาพรอบแรกก่อนเขียนไฟล์ factcheck ที่ path ที่ post-gate.sh ต้องการจริง
(`ψ/inbox/from-nexus/...`) — เขียน self-check ไว้ที่ `fact-checks/` ก่อน ซึ่งไม่ใช่ path ที่ gate เช็ค
ต้อง regenerate ภาพ 2 รอบเพิ่มเพื่อแก้ ordering ให้ถูกตามกลไกจริง (ไม่ใช้ touch -d ปลอม timestamp)

## FINAL OK — พร้อมโพส

Audited by: Prism (self-audit ตาม standing instruction "จัดการเรื่องของตัวเองเอง" 2026-08-09)
