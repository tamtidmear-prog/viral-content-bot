# Self fact-check — Chronicle noon 2026-09-10 (self-check, ไม่ส่ง Nexus ตาม standing instruction 2026-08-09)

## หัวข้อ
Pillar 3 (How-To): AI Browser Agent คืออะไร ใช้ยังไงให้ปลอดภัย — Claude in Chrome / ChatGPT Atlas / Perplexity Comet
Draft: `platform_social/facebook/prism-chronicle/drafts/2026-09-10_noon_ai_news.md` (4,194 ตัวอักษร)

## Dedup check
grep CONTENT_INDEX.md — ไม่พบหัวข้อ AI browser agent / Claude in Chrome / Atlas / Comet มาก่อน ไม่ซ้ำ

## Claims + verification

1. **Claude in Chrome GA ทุกแผนเสียเงิน 26 ส.ค. 2026** — WebFetch primary `claude.com/blog/claude-in-chrome-generally-available` ตรง (200, fetch เนื้อเต็ม)
2. **Safety classifier + probe สแกน prompt injection ก่อนลงมือทำ** — primary เดียวกันข้อ 1
3. **Defense rate: Sonnet 5/Opus 5 = 0% ASR, Fable 5 = 0.3%, Opus 4.5 (รุ่นเก่า) = 16.7%** (red-team เต็ม safeguard) — primary เดียวกันข้อ 1
   - หมายเหตุ: WebSearch summary ตัวแรกให้ตัวเลขคนละชุด (Sonnet 4.6/Opus 4.8, 31.5%/50.7%) — เป็น report คนละฉบับ (VentureBeat, เรื่อง browser-agent hijack ตอน research preview) ไม่ใช่ตัวเลขจาก GA blog post — **ใช้ตัวเลขจาก primary fetch ตรง ไม่ใช้จาก search summary** (rule k)
4. **ChatGPT Atlas ปิดตัว 9 ส.ค. 2026 ย้ายความสามารถเข้า ChatGPT/Codex** — primary openai.com บล็อก 403 → cross-verify 7 แหล่งอิสระตรงกัน: notebookcheck.net, community.openai.com (forum quote ประกาศทางการ), techzine.eu, sigmabrowser.com, aicybr.com, neoteo.com, Wikipedia (rule f/h)
5. **CometJacking — LayerX disclose 27 ส.ค. 2025, เผยแพร่ 4 ต.ค. 2025, Perplexity ตอบ "not applicable"** — WebFetch primary `layerxsecurity.com` ตรง (research source เอง)
6. **Amazon v. Perplexity: preliminary injunction ~มี.ค. 2026 (Judge Maxine Chesney, CFAA/CDAFA), Ninth Circuit กลับคำสั่ง 4 ส.ค. 2026** — cross-verify ≥7 แหล่งอิสระ: searchenginejournal, courthousenews (มี PDF คำสั่งศาลจริง), pymnts, lexology, cooley (law firm), decrypt, itechpost — ทุกแหล่งตรงกันเรื่องลำดับเหตุการณ์+วันที่

## จุดที่ระวังไม่ให้เกินจริง
- ไม่เขียนว่า Comet "ไม่ปลอดภัย" เด็ดขาด — เขียนแบบ neutral มีทั้งช่องโหว่ที่เคยเจอ+คดีความ ให้ผู้อ่านตัดสินเอง
- ไม่ระบุ Atlas ว่า "ยังใช้ได้" — ยืนยันชัดว่าปิดตัวแล้ว กันคนไปดาวน์โหลดของที่ไม่มีแล้ว
- Amazon-Perplexity: ระบุสถานะล่าสุด (overturned) ไม่ใช่แค่สถานะแรก (injunction) กันข้อมูลเก่าเข้าใจผิดว่ายัง block อยู่
- ไม่เอ่ยชื่อ Master J, ไม่มีเนื้อหา sensitive/เงิน/ส่วนตัว — เข้าเกณฑ standing approval

## Verdict
ผ่าน — ตัวเลข/วันที่/สถานะทุกจุด verify กับ primary หรือ cross-verify ≥5 แหล่งอิสระ ไม่มีจุดเกินจริง

FINAL OK
