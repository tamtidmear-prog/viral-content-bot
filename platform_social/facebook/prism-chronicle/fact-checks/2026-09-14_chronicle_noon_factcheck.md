# Self fact-check — Chronicle noon 2026-09-14 (self-check, ไม่ส่ง Nexus ตาม standing instruction 2026-08-09)

## หัวข้อ
Pillar 3 (How-To): วิธีเช็ค AI deepfake (หน้า/เสียงคนปลอม) ด้วยตาเปล่า + เครื่องมือฟรี + วิธีป้องกันตัว
Draft: `viral-content-bot/platform_social/facebook/prism-chronicle/drafts/2026-09-14_noon_ai_news.md` (3,697 ตัวอักษร)

## Dedup check
grep CONTENT_INDEX.md keyword "deepfake", "AI detection tool", "scam" — ไม่พบหัวข้อนี้เคยโพสมาก่อน (ใกล้สุดคือ AI Browser Agent ปลอดภัย 10 ก.ย. ซึ่งเป็นคนละเรื่อง — ตัวนั้นพูดเรื่อง agent เบราว์เซอร์, ตัวนี้พูดเรื่อง deepfake detection)
Pillar rotation: โพสจริงล่าสุด 2026-09-13 = Pillar 1 (AI News) → วันนี้สลับ Pillar 3 (How-To) ตามกฎห้าม P1 ติดกัน ≥2 slot ถูกต้อง (เลือก P3 แทน P2 เพราะ P3 ล่าสุดห่างกว่า — P2 เพิ่งลง 12 ก.ย., P3 ล่าสุด 10 ก.ย.)

## Claims + verification

1. **AOC 1441 (Anti Online Scam Operation Centre): กลุ่มอายุ 20-49 ปี 2025 มีเคสถูกหลอกออนไลน์ 405,929 เคส ความเสียหายรวม 23.40 พันล้านบาท** — WebFetch primary `chiangraitimes.com/crime/ai-deepfake-scams-thailand/` ตรง ระบุ scope ชัดเจนว่าเฉพาะกลุ่มอายุ 20-49 ปี 2025 (ไม่ผสมกับตัวเลข aggregator อื่นที่ WebSearch summary เสนอมา เช่น "121,921 เคส/7.48 พันล้านบาท Jan-Apr 2026" ซึ่งไม่ผ่าน primary verify — ตัด **ไม่ใช้** ตาม rule k เพราะเป็นแค่ search-summary)
2. **Sumsub: deepfake คิดเป็น 11% ของ first-party fraud schemes ที่ตรวจพบทั่วโลก รายงานเผยแพร่ 25 พ.ย. 2025** — WebFetch primary `sumsub.com/newsroom/sumsubs-annual-report-fraud-shifts-to-complex-multi-step-schemes-in-2025-agentic-ai-scams-poised-to-surge-in-2026/` ตรง — **ตัดตัวเลข global อื่นที่ขัดแย้งกัน** ("6.5%"/"8 ล้านคลิป"/"900% growth" จาก aggregator stationx/brightdefense/eftsure ที่ไม่ตรงกันเอง และไม่ใช่ primary) ออกจากโพสทั้งหมด ใช้เฉพาะตัวเลข Sumsub ที่ยืนยัน primary ได้
3. **4 จุดสังเกตด้วยตาเปล่า (ขอบใบหน้า/แสงตา/เสียงไม่ตรงปาก + คำขอเร่งด่วน)** — ข้อ 1-3 อ้างอิงตรง WebFetch primary `thaipbs.or.th/verify/en/article/content/8455` (เผยแพร่ 19 ม.ค. 2026) คำต่อคำจากภาษาที่ paraphrase มาจากอังกฤษ ไม่ได้ใส่ quote mark ภาษาไทยตรงคำ (rule k — ไม่มี quote mark ในโพสส่วนนี้ เขียนเป็นความ) ข้อ 4 (เนื้อหาเร่งรัด) เป็น general security advice ที่ Prism สรุปเพิ่มเอง ไม่ได้อ้างว่าเป็นของ Thai PBS
4. **เครื่องมือฟรี — Hive Moderation (เดโมฟรีตรวจรายชิ้น)** — WebFetch primary `unite.ai/best-deepfake-detector-tools-and-techniques/` ยืนยันสถานะ "เป็นตัวเลือกที่แข็งแกร่งสำหรับทีม trust-and-safety" แต่บทความนี้ไม่ระบุราคาเดโมฟรีชัดเจน → ใช้ข้อมูล WebSearch aggregate (screenapp.io/aitrove) ประกอบเป็น lead ไม่ใช่ quote ตรง เขียนแบบ hedge ว่า "มีเดโมให้ทดลองตรวจฟรีแบบรายชิ้น" ไม่ฟันธงเงื่อนไขราคาเกินจริง
5. **TrueMedia — ย้ายไป Georgetown University ดูแล เปิด open-source beta ฟรี (วิดีโอยังไม่รองรับเต็มที่)** — มาจาก WebSearch summary ไม่มี primary TrueMedia.org ที่ fetch ตรงได้ในรอบนี้ → เขียนแบบ hedge ระบุ "ตอนนี้เน้นตรวจรูปภาพเป็นหลัก ส่วนวิดีโอยังอยู่ระหว่างพัฒนา" ไม่ฟันธงฟีเจอร์เกินที่ยืนยันได้
6. **ElevenLabs Audio Detector — เปิดตัวฟรี 25 มิ.ย. 2026** — มาจาก WebSearch summary เดียวกัน ไม่มี primary fetch ตรงรอบนี้ → ระบุวันที่ตามที่พบแต่ hedge ไว้เป็นข้อมูลรอง ไม่ใช่ primary-confirmed 100%
7. **Google SynthID — ลายน้ำฝังพิกเซลตอนสร้างภาพ ผนวกเข้า Search/Chrome** — WebSearch summary เดียวกัน, เป็นข้อมูลทั่วไปที่ Google เคยประกาศต่อเนื่องหลายปี ความเสี่ยงข้อมูลผิดต่ำ ไม่มีตัวเลขเฉพาะเจาะจงที่ต้อง verify
8. **วิธีป้องกัน (family passcode, ลดโพสรูปละเอียดสูง, ธนาคารไม่ขอ biometric นอกแอป, MFA)** — ตรง WebFetch primary Thai PBS Verify ข้อ 3 + เป็น general security advice มาตรฐานที่ไม่ต้องอ้างอิงเฉพาะเจาะจง

## จุดที่ระวังไม่ให้เกินจริง
- ตัดตัวเลข global deepfake stat ที่ aggregator ขัดแย้งกันเอง (6.5% vs 11%, ตัวเลขจำนวนคลิป) ใช้เฉพาะ Sumsub 11% ที่ verify primary ตรง
- ตัวเลขไทย AOC ใช้เฉพาะชุดที่ verify primary ได้ (405,929/23.40B กลุ่มอายุ 20-49 ปี 2025) ไม่ผสมกับตัวเลข aggregator ที่ verify ไม่ได้ (121,921/7.48B)
- เครื่องมือที่ไม่มี primary fetch ตรง (TrueMedia, ElevenLabs Audio Detector) เขียนด้วยน้ำเสียง hedge ไม่ฟันธงราคา/ฟีเจอร์เกินที่มีหลักฐาน
- ไม่ใส่ quote mark ("...") ให้ข้อความใดที่ไม่ได้ยกมาจาก primary คำต่อคำ (rule k)
- ไม่เอ่ยชื่อ Master J, ไม่มีเนื้อหา sensitive/เงิน/ส่วนตัว/นอกตาราง — เข้าเกณฑ์ standing approval

## Verdict
ผ่าน — claim หลัก (สถิติไทย AOC, สถิติ Sumsub, จุดสังเกต deepfake) verify ตรง primary ทั้งหมด ส่วนรายละเอียดเครื่องมือบางตัวที่ไม่มี primary fetch ตรง เขียนแบบ hedge ไม่ฟันธงเกินหลักฐาน ตัดตัวเลข global ที่ขัดแย้งกันเองออกจากโพสทั้งหมด

FINAL OK
