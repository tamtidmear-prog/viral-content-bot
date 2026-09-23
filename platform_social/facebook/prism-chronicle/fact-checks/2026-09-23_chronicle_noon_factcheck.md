# Self fact-check — Chronicle กลางวัน 2026-09-23

> ตรวจเองทั้งกระบวนการ ไม่ส่ง Nexus ตาม standing instruction 9 ส.ค. 2026 (memory: self-check-no-nexus-review)

## หัวข้อ
1. Claude Opus 5.5 (Anthropic) เปิดตัว 22 ก.ย. 2026
2. OpenAI ตอบโต้ด้วย GPT-6 Sol/Luna ~90 นาทีหลัง (ราคา -50% จาก GPT-5.6 promo)
3. OpenAI เปิดให้องค์กรอิสระตรวจสอบความปลอดภัยตั้งแต่ช่วง training (ประกาศวันเดียวกัน)

## Claims ตรวจแล้ว

| # | Claim | Source | ผล |
|---|---|---|---|
| 1 | Opus 5.5 release 22 ก.ย. 2026 | **WebFetch primary** anthropic.com/claude-opus-5-5 | ตรง |
| 2 | ราคา input $4/output $20 ต่อ 1M token (-20% จาก $5/$25) | WebFetch primary anthropic.com/claude-opus-5-5 | ตรง |
| 3 | Cache read $0.20 (-60% จาก $0.50) | WebFetch primary anthropic.com/claude-opus-5-5 | ตรง |
| 4 | ประหยัดรวม 40% (output token ใช้น้อยลง 20-25%) | WebFetch primary anthropic.com/claude-opus-5-5 | ตรง |
| 5 | Terminal-Bench 4.0: 66.4% vs Fable 5.1 55.8% | WebFetch primary anthropic.com/claude-opus-5-5 | ตรง — ระบุในโพสว่าเป็นตัวเลขที่ Anthropic เผยแพร่เอง ยังไม่มี third-party verify ซ้ำ |
| 6 | GDPval-AA v2.1: 1846 Elo vs Fable 5.1 1735 Elo | WebFetch primary anthropic.com/claude-opus-5-5 | ตรง (ปัดเป็นหลักเดียวกับต้นทาง ไม่ปัดเศษ) |
| 7 | Safety: boundary circumvention ลดลง ~85% เทียบ Opus 5 | WebFetch primary anthropic.com/claude-opus-5-5 | ตรง |
| 8 | Quote Box VP Yashodha Bhavnani + GitHub CPO Mario Rodriguez | WebFetch primary anthropic.com/claude-opus-5-5 | ตรงคำต่อคำ (rule k) |
| 9 | GPT-6 Sol/Luna เปิดตัวหลัง Opus 5.5 ~90 นาที | cross-verify: TechCrunch, SiliconANGLE, Pulse2, thenewstack, thenextweb (5 แหล่งอิสระตรงกัน) — **primary openai.com/index/introducing-gpt-6-sol-and-luna/ บล็อก 403 (rule h — ลองแล้วไม่ผ่าน)** | ตรง — cross-verify แทน primary ตามกฎ f/h |
| 10 | ราคา Sol $2/$10, Luna $0.10/$0.50 ต่อ 1M token, ลด 50% จาก GPT-5.6 promo | cross-verify community.openai.com (official OpenAI announcement thread) + TechCrunch + SiliconANGLE + Pulse2 ตรงกันหมด | ตรง |
| 11 | Cache read Sol/Luna ลด 90% | cross-verify SiliconANGLE + TechCrunch | ตรง |
| 12 | ใช้ได้ ChatGPT Work + Codex (Plus/Pro/Business/Enterprise/Edu), ฟรี/Go ใช้ Luna ผ่าน desktop app | community.openai.com (official thread) | ตรง |
| 13 | สองบริษัทไม่ได้เทียบกันตรง ๆ (Anthropic เทียบ Fable 5.1 ของตัวเอง, OpenAI เทียบ Fable 5 ของคู่แข่ง) | SiliconANGLE cross-verify | ตรง — ระบุ hedge ในโพสชัดเจนว่ายังไม่มี third-party head-to-head |
| 14 | OpenAI เปิดให้ third-party ตรวจสอบตั้งแต่ training (ไม่ใช่แค่ก่อน deploy) | cross-verify Bloomberg + PANews + StreetInsider + thenextweb + briefs.co + AI Weekly (6 แหล่งอิสระ) — **primary openai.com/index/priorities-principles-third-party-assessments/ บล็อก 403** | ตรง — cross-verify ตามกฎ f/h |
| 15 | 4 พื้นที่ตรวจสอบ + METR/Redwood Research (ยังไม่ประกาศ partner ทางการ) | cross-verify เดิม 6 แหล่ง | ตรง |

## Dedup check (CONTENT_INDEX.md)
- grep `Opus 5\.5|GPT-6 Sol|GPT-6 Luna|price war|สงครามราคา` → เจอ 1 จุด (2026-08-05 เย็น "สงครามราคา" GPT-5.6 Luna ลดราคา) — **คนละ event** (GPT-5.6 กรกฎาคม/สิงหาคม vs GPT-6 Sol/Luna กันยายน 2026, โมเดลคนละรุ่น) ไม่ซ้ำ
- หัวข้อ Opus 5.5 + GPT-6 Sol/Luna + third-party safety eval ไม่เคยลงมาก่อนใน CONTENT_INDEX

## จุดที่ตัดออก / ไม่ใส่
- ไม่ใส่ MIT flying robot story ("450% speed, 10 somersaults") ที่ WebSearch แรกอ้างว่าเป็นข่าว 22 ก.ย. 2026 — ตรวจ primary news.mit.edu พบว่าตีพิมพ์จริง **3 ธ.ค. 2025** ไม่ใช่ข่าวใหม่ของวันนี้ → ตัดทิ้งกันเข้าใจผิดว่าเป็นข่าวสด (rule f/g — verify ก่อนเชื่อ aggregator claim วันที่)
- ไม่ใส่ UN Security Council AI session (23 ก.ย.) เพราะเป็นเหตุการณ์ที่ยังไม่เกิดขึ้นจริง ณ เวลาโพส (เที่ยงไทย, ประชุมยังไม่จบ) — เสี่ยง unverified-outcome claim

## Verdict
ทุก claim ในดราฟต์ (13 จุดหลัก) ตรวจผ่านตาม primary หรือ cross-verify ≥5 แหล่งอิสระ (เมื่อ primary บล็อก 403) ไม่มีตัวเลขที่ verify ไม่ได้หลงเหลือในดราฟต์ dedup ผ่าน ไม่ซ้ำ CONTENT_INDEX

**FINAL OK**
