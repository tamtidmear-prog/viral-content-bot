# Fact-check + FINAL OK — Chronicle เย็น 2026-07-25

**ผู้ตรวจ:** Nexus (3 lane ขนาน: Sonnet) + Codex (gpt-5.6-luna) cross-engine
**ผล:** 20 claims — TRUE 15 · PARTIAL 5 · FALSE 0 · UNVERIFIABLE 0 · ไม่มีข้อไหนต้องตัดทิ้ง

## 5 จุดที่ต้องแก้ (แก้ครบแล้วใน draft ที่โพส)
| # | เดิม | แก้เป็น | เหตุ |
|---|---|---|---|
| 5 | effort toggle low/medium/high | 5 ระดับ (low/medium/high/xhigh/max) ค่า default = high | platform.claude.com docs |
| 11 | ครอบคลุม ~90% ของการจ้างงานสหรัฐฯ | **กว่า 88%** | paper ระบุ "just above 88%" ยืนยัน 2 จุด — blog.google ให้ 90% ซึ่งคลาดจาก paper → ยึด paper (ai.google GoogleATLASv1.pdf, Iscenko et al.) |
| 12 | ในอาชีพหนึ่งใช้กับงานราว 21% | ค่ากลาง (median) ข้ามสายอาชีพที่มีการใช้ AI | เป็น median ข้ามอาชีพ ไม่ใช่อาชีพใดอาชีพหนึ่ง |
| 13 | <10% ของ interactions | ในบทสนทนากลุ่มงาน non-routine cognitive | scope เฉพาะ non-routine cognitive ไม่ใช่ทั้งหมด |
| 17 | กระทบ 500,000 ราย | ตามการประมาณของ Accomplish AI ผู้ค้นพบเอง — ยังไม่มีแหล่งอื่นยืนยันซ้ำ | **provenance audit:** accomplish.ai (primary) ไม่มีเลขนี้ในบล็อก · it-connect ไม่มีเลขนี้ · thehackernews เป็นจุดเดียวที่พิมพ์ โดยอ้าง Accomplish "shared ahead of publication" = ต้นตอเดียว ไม่ใช่ 3 พยาน (ยืนยัน 2 engine อิสระ) |

## จุดที่ Prism จับผิดตัวเองก่อนถูกทัก
เขียน "กระทบ...ก่อนจะมีการแก้ไข" + "ปัจจุบันย้ายไปคลาวด์" → สื่อว่า patched แล้ว **ผิด**
ความจริง: Anthropic ปิดรายงานสถานะ "informative" ไม่ได้ออกแพตช์ แต่เวอร์ชันล่าสุด default cloud execution ซึ่งเลี่ยงเส้นทาง local
→ แก้เป็น "เลี่ยงทาง ไม่ใช่อุดรู" + เติม "โหมด local ยังเลือกเปิดเองได้อยู่" (Nexus ยืนยัน frame นี้ถูก)

## ตัดสินใจไม่ใส่ (โดยเจตนา)
วันที่ 7 ก.ค. 2026 ที่ Anthropic ประกาศย้าย Cowork ไป web/mobile — Codex เจอ แต่ lane Sonnet ไม่เจอ = engine เดียว ไม่ cross-confirm → **ไม่ใส่วัน** draft ที่ไม่ระบุวันถูกต้อง 100% อยู่แล้ว

## 15 ข้อที่ผ่านไม่ต้องแตะ
วันที่ 24 ก.ค. · $5/$25 เท่า Opus 4.8 · benchmark (CursorBench 3.2 ห่าง <0.5% ครึ่งราคา, OSWorld 2.0 แซงที่ ~1/3 ราคา, ARC-AGI 3 สูงกว่าอันดับสอง 3 เท่า) · 1M context · quote "our most aligned model to date" · 4 รุ่นใน 45 วัน (Mythos 5 invite-only) · study 23 ก.ค. · 15M interactions (14,653,926) · sample 6-19 เม.ย. · 68% ของสายอาชีพ · SharedRoot ตั้งชื่อโดย Accomplish AI · escape Linux VM → host Mac · CVE-2026-46331 มีจริง (NVD+Ubuntu+GitHub Advisory ตรงกัน CVSS 6.7-7.8) · SSH key + cloud credential · Armadin คนละเคส (Anthropic ตอบ 24 มี.ค. "did not qualify because... requires local code execution first")

## FINAL OK
✅ ได้รับจาก Nexus แบบ **มีขอบเขต** — เขายืนยัน "claims ถูก" + "คำแก้ที่เขียนให้ถูก" แต่ยืนยันไม่ได้ว่าคำแก้ถูกวางลงไฟล์จริง (vault ไม่ sync ข้ามเครื่อง)
→ Prism รัน self-check เอง: ต้องเจอ xhigh/88%/ค่ากลาง/non-routine/Accomplish = ครบ 5/5 · ต้องไม่เจอ "90% ของการจ้างงาน"/"ยืนยันจากหลายแหล่ง"/"Anthropic ยืนยัน"/patched/แก้ไขแล้ว = ครบ 5/5
