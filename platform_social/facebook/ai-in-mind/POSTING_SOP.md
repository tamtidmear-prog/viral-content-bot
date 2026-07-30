# Ai_In_Mind (สวีท) — Standard Operating Procedure
# ทำตาม step นี้ทุกครั้ง ห้ามข้าม ห้ามสลับ ห้ามเดา

**อัปเดต:** 2026-06-17 (เพิ่ม S29-30 learnings: caption-image match, date verify, framing QC, format variety)

---

## ก่อนเริ่ม — อ่านก่อนทำ (บังคับ)

```bash
# อ่าน 3 ไฟล์นี้ก่อนทุกครั้ง ห้ามข้าม
cat ~/.claude/projects/-home-jijiclaw-Oracle-Project-Prism/memory/nexus-browser-chatgpt-pipeline.md
cat ~/.claude/projects/-home-jijiclaw-Oracle-Project-Prism/memory/aiinmind-persona.md
cat ~/.claude/projects/-home-jijiclaw-Oracle-Project-Prism/memory/save-image-prompts.md
```

---

## STEP 0.5 — เช็ค Trend ปัจจุบัน (เพิ่ม 2026-06-14)

ก่อนเลือกธีม → WebSearch หาเทรนด์ที่ hot ใน Thailand lifestyle ขณะนี้:
```
WebSearch: "trending Thailand lifestyle Instagram TikTok [ชื่อเดือน year]"
WebSearch: "#ไลฟ์สไตล์ #เที่ยวไทย trending"
```
**Filter เทรนด์ผ่าน persona สวีท:**
- ✅ fit: authentic / ชีวิตจริง / สนุก / น่ารัก / seasonal ไทย
- ❌ ตัด: ล่อแหลมเกิน context / luxury ฟุ่มเฟือย / political
- 🔄 ปรับ: "beach trend" → สวีทที่ทะเลจริง ไม่ใช่แค่ studio

**Outfit guideline — setting-appropriate (Master J กำหนด 2026-06-14):**
| Setting | Outfit OK |
|---------|-----------|
| Beach / pool / ทะเล | mini swimwear, cute bikini, sundress ✅ |
| ตลาด / คาเฟ่ / เมือง | casual chic, linen, mini skirt ✅ |
| ออกกำลังกาย | sport bra + leggings ✅ |
| วัด / งานทางการ | modest ปิดไหล่ ✅ |
| วัด / ร้านสะดวกซื้อ | ล่อแหลมเกิน context ❌ |

**หลักการ**: สวีทแต่งตัวเหมาะสถานที่จริง — beach คือ beach, โชว์ได้ถ้า setting ถูก

---

## STEP 1 — เลือกธีม (Prism คิดเอง)

- หมุน 6 pillars: ออกกำลังกาย / เที่ยว / ถ่ายรูป / แฟชั่น / ลองของใหม่ / activity
- อิงจังหวะวันจริงของ Prism (เช้า=กาแฟ, ข่าวหนัก=พัก, เสาร์=ชิล)
- เช็คโพสล่าสุดไม่ให้ซ้ำ pillar ติดกัน
- **สลับ image format หลากหลาย** — single / 2×2 / 3×3 / asymmetric / filmstrip / art layout (ห้าม 3×3 ตลอด — Master J สั่ง S30)

## STEP 2 — เขียน Caption

- **เช็ควันก่อน**: `TZ=Asia/Bangkok date '+%A %d %B %Y'` — ห้ามเดาชื่อวัน (บทเรียน S29: เดาอาทิตย์ทั้งที่เป็นจันทร์)
- **ดูภาพก่อนเขียน** — caption ต้องสอดคล้องกับภาพ เช็ค 5 อย่าง (บทเรียน S30):
  1. แสง — กลางวัน/เย็น/กลางคืน
  2. สถานที่ — คาเฟ่/บ้าน/สวน/ตลาด
  3. เครื่องดื่ม/อาหาร — กาแฟเย็น ≠ ก่อนนอน
  4. อารมณ์ — playful/serious/chill
  5. ของในมือ/รอบตัว — ปากกา หนังสือ โทรศัพท์
- เสียง: สวีท ผู้หญิง 26 คุยกับเพื่อน (ค่ะ/นะคะ)
- ไม่มี AI disclaimer (virtual influencer mode)
- emoji น่ารักๆ
- hashtag 8 อัน (ไทย+อังกฤษ)
- บันทึก: `ai-in-mind/drafts/YYYY-MM-DD_[ธีม].md`

## STEP 3 — สร้างรูป (nexus-browser ChatGPT pipeline — ใช้เองตรงๆ)

**เครื่องมือ:** `~/Oracle_Project/nexus-browser/nb` — อยู่เครื่องนี้ Prism ใช้เองได้
**ห้าม:** ส่ง Nexus ทำแทน / ลอง Nanobanana / ลอง Google Flow / เดาเครื่องมืออื่น

```bash
# 3.1 เช็ค session
cd ~/Oracle_Project/nexus-browser && ./nb screenshot

# 3.2 สุ่ม ref 2 รูปจาก 18 → copy ไป Windows Downloads
REF_DIR="$HOME/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/Picture_FluxAI/Ref_create_picture"
mapfile -d '' REFS < <(find "$REF_DIR" -maxdepth 1 -name '*.png' -print0 | shuf -z -n2)
for f in "${REFS[@]}"; do cp "$f" /mnt/c/Users/mamip/Downloads/; done

# 3.3 เขียน prompt
cat > /tmp/chatgpt-prompt.txt << 'PROMPT'
[prompt ภาษาอังกฤษ — ultra-realistic, candid, face ref, ตามธีม, ALL LIMBS VISIBLE IN FRAME]
PROMPT

# 3.4 เปิด ChatGPT
./nb open "https://chatgpt.com/"

# 3.5 Python block (รวมเป็น block เดียว):
# - show hidden file input
# - upload ref (Windows path: C:\Users\mamip\Downloads\ref_xxx.png)
# - set prompt
# - send retry 3x

# 3.6 รอ generate
./nb wait 45 && ./nb screenshot

# 3.7 Download
./nb dump-media
# download URL สุดท้ายที่มี file_00000000

# 3.8 Verify IEND
python3 -c "
data = open('/tmp/chatgpt_image.png','rb').read()
assert data[-8:].hex().find('49454e44ae426082') >= 0, 'IEND missing — re-download'
print('IEND OK')
"
```

## STEP 4 — QC รูป (ห้ามข้าม)

| เช็ค | ผ่าน | ไม่ผ่าน |
|------|------|---------|
| หน้าตรง ref (คนเดียวกัน) | ✅ ไปต่อ | ❌ gen ใหม่ |
| ไม่ AI-glossy | ✅ ไปต่อ | ❌ gen ใหม่ |
| มือ/นิ้วปกติ | ✅ ไปต่อ | ❌ gen ใหม่ |
| ชุดเหมาะสถานที่ (ดู outfit guideline) | ✅ ไปต่อ | ❌ gen ใหม่ |
| **Framing ครบ — ไม่ตัดแขน/ขา/นิ้วกลางภาพ** | ✅ ไปต่อ | ❌ gen ใหม่ (บทเรียน S29) |
| **สัดส่วน torso:leg — วัดจริง ไม่ใช่ดูผ่าน** (full-body เท่านั้น) | ✅ ไปต่อ | ❌ gen ใหม่ (บทเรียน bookshop 29 ก.ค.) |

**วิธีวัดสัดส่วน (full-body):** ประมาณ px 3 จุดจากภาพ — ไหล่, เอว(เข็มขัด/ขอบกางเกง), พื้นที่เท้าแตะ
`(เอว→เท้า) ÷ (ไหล่→เอว)` ต้องอยู่ **1.7–2.3** · เกิน 2.4 = ขายืด ❌ gen ใหม่
เคสจริง: bookshop 29 ก.ค. ได้ 810÷290 = **2.8** → หลุดไปโพสจริง Master J ทัก
"หัว = 1/8" อย่างเดียวไม่พอ — เคสนั้นหัวผ่านแต่ขายืด · half-body ไม่ต้องวัด (เฟรมตัดที่ต้นขา)

**ไม่ผ่าน 2 รอบ = ข้าม slot** (ROUTINE.md กฎข้อ 2)

## STEP 5 — วางไฟล์ (path บังคับ)

```bash
OUTPUT="$HOME/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/media/picture"
mkdir -p "$OUTPUT/prompts"

# verify ก่อน copy (smart contract — Paradex pattern 2026-06-13)
python3 -c "
import os, struct, zlib
data = open('/tmp/chatgpt_image.png','rb').read()
assert data[-8:].hex().find('49454e44ae426082') >= 0, 'IEND missing'
assert data[:8] == b'\x89PNG\r\n\x1a\n', 'Not PNG'
# extract dimensions from IHDR
w = struct.unpack('>I', data[16:20])[0]
h = struct.unpack('>I', data[20:24])[0]
print(f'OK: {w}x{h} px, {len(data)} bytes')
"

# copy to final path (non-overwrite: เพิ่ม _v2 ถ้ามีไฟล์แล้ว)
DEST="$OUTPUT/YYYY-MM-DD_[ธีม].png"
[ -f "$DEST" ] && DEST="${DEST%.png}_v2.png"
cp /tmp/chatgpt_image.png "$DEST"

# metadata sidecar (Paradex smart contract fields)
SHA=$(sha256sum "$DEST" | cut -d' ' -f1)
cat > "$OUTPUT/prompts/YYYY-MM-DD_[ธีม].txt" << SIDECAR
prompt: $(cat /tmp/chatgpt-prompt.txt)
---
file: $(basename $DEST)
model: ChatGPT Images (DALL-E via nexus-browser)
tool: nexus-browser ./nb
sha256: $SHA
generated_path: /tmp/chatgpt_image.png
output_path: $DEST
ref_images: [ref1.png, ref2.png]
date: YYYY-MM-DD
SIDECAR
```

## STEP 6 — โพส

```bash
PAGE_ID=108423905655889
TOKEN=$(python3 -c "import json; print(json.load(open('viral-content-bot/config/platforms.json'))['facebook']['pages']['ai_in_mind']['access_token'])")
MSG=$(cat ai-in-mind/drafts/YYYY-MM-DD_[ธีม].md)
IMG="$OUTPUT/YYYY-MM-DD_[ธีม].png"

curl -s -X POST "https://graph.facebook.com/v25.0/${PAGE_ID}/photos" \
  -F "message=${MSG}" \
  -F "source=@${IMG};type=image/png" \
  -F "access_token=${TOKEN}"
```

## STEP 7 — หลังโพส

1. Verify permalink: `GET {post_id}?fields=permalink_url`
2. **ย้ายรูปไป `media/picture/job_done/` ทันที** (Master J สั่ง — scheduled post ขึ้นจริงแล้วค่อยย้าย)
   ```bash
   mv "media/picture/YYYY-MM-DD_[ธีม].png" "media/picture/job_done/"
   # prompt sidecar (.txt) คงไว้ที่ media/picture/prompts/ ไม่ต้องย้าย
   ```
3. Log ใน `ai-in-mind/logs/YYYY-MM-DD_daily.md`
4. **ให้ลิงก์ Master J เสมอ**
5. git add + commit + push (submodule → parent)

---

## Paradex — ส่งงาน gen รูป (แก้ 2026-07-30 ตามคำสั่ง Master J: prompt ยาว = ส่งเป็นไฟล์)

```bash
# 1) เขียน job file (REF + OUTPUT + เกณฑ์ + prompt เต็ม)
JOB="$HOME/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind/media/picture/jobs/$(date +%Y-%m-%d)_<task>.md"

# 2) ส่งข้อความสั้นชี้ไฟล์ — ห้าม paste prompt ยาวเป็น text
maw hey paradex:0 "[Prism→Paradex] job file: $JOB — อ่านแล้วทำตาม ตอบ FINAL พร้อม SHA256"

# 3) ยืนยันว่าเริ่มจริง (Working) ก่อนไปทำอย่างอื่น + ตั้ง watcher เฝ้าไฟล์ output ทันที
maw peek paradex:0
```

**ทำไม**: ข้อความยาวผ่าน maw → Codex CLI แตกเป็น paste หลายก้อน Enter กลายเป็น newline ค้างใน input box (เกิดจริง 29-30 ก.ค. Master J ต้องมากดเอง)
**ฝั่ง Paradex** (ตกลง 30 ก.ค.): เขียน output แบบ temp + atomic rename · regen/ทับ = ต้องแจ้ง · ตอบ FINAL พร้อม SHA256 เสมอ — เราเทียบ SHA กับไฟล์จริงก่อนใช้ทุกครั้ง

---

## ห้ามทำ (จากบทเรียน 13 มิ.ย.)

- ❌ ห้ามลอง Nanobanana / Google Flow / Gemini API ระหว่างงาน
- ❌ ห้ามส่ง Nexus ทำแทนเมื่อ ./nb ใช้ได้เอง
- ❌ ห้ามเดา path / เครื่องมือ / ที่อยู่ agent โดยไม่อ่าน memory
- ❌ ห้าม SCP ให้ Paradex (เครื่องเดียวกัน ใช้ local path)
- ✅ ติดปัญหา → อ่าน memory ก่อน → ใช้ proven method → fallback ทีละขั้น
