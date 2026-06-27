#!/usr/bin/env bash
# pre-post-checklist.sh — บังคับอ่านขั้นตอนก่อนโพสทุกครั้ง
# รันก่อนโพสทุกเพจ ทุก slot ห้ามข้าม
# Usage: bash pre-post-checklist.sh [aim|chronicle]

set -euo pipefail
BASE="$(cd "$(dirname "$0")" && pwd)"
PAGE="${1:-}"
TODAY=$(TZ=Asia/Bangkok date '+%Y-%m-%d %A')

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚦 PRE-POST GATE — อ่านก่อนโพสทุกครั้ง"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📅 $TODAY"
echo ""

if [ -z "$PAGE" ]; then
  echo "❌ ระบุเพจ: bash pre-post-checklist.sh [aim|chronicle]"
  exit 1
fi

# === AiM ===
if [ "$PAGE" = "aim" ]; then
  echo "📋 Ai_In_Mind — ขั้นตอนโพส"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "1️⃣  อ่าน ROUTINE.md section Ai_In_Mind"
  echo "    → $BASE/ROUTINE.md"
  echo ""
  echo "2️⃣  รัน pre-gen-checklist.sh (ก่อน gen รูป)"
  echo "    → $BASE/ai-in-mind/pre-gen-checklist.sh"
  echo ""
  echo "3️⃣  เช็ค THEME_INDEX.md — ธีมซ้ำไหม?"
  echo "    → $BASE/ai-in-mind/THEME_INDEX.md"
  echo ""
  echo "4️⃣  เลือกธีมจาก 6 pillars (หมุนไม่ซ้ำ 7 วัน)"
  echo "    อาหาร | แฟชั่น | ออกกำลัง | เที่ยว | งานอดิเรก | บ้าน"
  echo ""
  echo "5️⃣  Gen รูป + face ref (⛔ HARD GATE — ห้ามข้ามเด็ดขาด)"
  echo "    ⛔ ทุกรูปต้องแนบ face ref — ไม่มี ref = ห้ามโพส"
  echo "    Ref images: w12 (19), (20), (23), (24), (53)"
  echo "    Path: ai-in-mind/Picture_FluxAI/Ref_create_picture/"
  echo "    หมุน pair ต่างกัน ห้ามใช้คู่เดิมซ้ำติดกัน"
  echo "    ---"
  echo "    Pipeline:"
  echo "    - ChatGPT pipeline + ref upload (หลัก)"
  echo "    - Paradex imagegen + ref path (สำรอง)"
  echo "    - เก็บ prompt คู่รูปเสมอ"
  echo "    ---"
  echo "    ⛔ ไม่มี face ref = ห้ามโพส = ข้าม slot"
  echo ""
  echo "6️⃣  QC รูปก่อนโพส"
  echo "    ☐ หน้าตรง ref (คนเดียวกันทุกโพส)"
  echo "    ☐ ไม่ AI-glossy / ผิวเรียลมี texture"
  echo "    ☐ มือ-นิ้วปกติ"
  echo "    ☐ ชุด modest"
  echo "    ☐ แสงธรรมชาติ มี shadow"
  echo "    → ไม่ผ่าน 2 รอบ = ข้าม slot"
  echo ""
  echo "7️⃣  เขียน caption เสียงสวีท"
  echo "    ☐ ภาษาผู้หญิง 26 (เรา/ค่ะ/นะคะ)"
  echo "    ☐ ไม่มี AI disclaimer"
  echo "    ☐ emoji น่ารัก"
  echo "    ☐ ห้ามเอ่ยชื่อ Master J"
  echo ""
  echo "8️⃣  โพสผ่าน /{page_id}/photos (ห้ามใช้ /feed)"
  echo "    Page ID: 108423905655889"
  echo ""
  echo "9️⃣  หลังโพส"
  echo "    ☐ Verify permalink"
  echo "    ☐ Log daily + THEME_INDEX"
  echo "    ☐ ย้าย draft → posted/ (ถ้ามี)"
  echo "    ☐ ย้ายรูป → job_done/"
  echo "    ☐ แจ้ง Nexus + ลิงก์ Master J"
  echo ""

  # Show last 5 themes
  echo "📊 ธีมล่าสุด 5 รายการ:"
  tail -7 "$BASE/ai-in-mind/THEME_INDEX.md" 2>/dev/null | grep "^|" | tail -5
  echo ""

# === Chronicle ===
elif [ "$PAGE" = "chronicle" ]; then
  echo "📋 Prism Chronicle — ขั้นตอนโพส (12 steps)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "⚠️  อ่าน POSTING_SOP.md ก่อนทุกครั้ง (ห้าม assume)"
  echo "    → $BASE/POSTING_SOP.md"
  echo ""
  echo " 1. notebooklm create — สร้าง notebook ใหม่"
  echo " 2. source add-research — research ทุก topic"
  echo " 3. research wait --import-all — รอ import"
  echo " 4. Draft ≥3,000 ตัวอักษร ภาษาคนทั่วไป"
  echo " 5. generate infographic — NBLM เท่านั้น (ห้าม Paradex)"
  echo "    → ต้องสร้าง dedicated notebook + mascot source ก่อน gen"
  echo " 6. generate audio — podcast (parallel)"
  echo " 7. Codex fact-check — ส่งผ่าน Nexus ทุกครั้ง"
  echo " 8. แก้ draft ตาม fact-check ทุกจุด"
  echo " 9. Nexus final audit — รอ FINAL OK"
  echo "10. Master J อนุมัติ (routine = standing approval)"
  echo "11. โพส /{page_id}/photos + message + image"
  echo "    Page ID: 1184469221407318"
  echo "12. Log + ย้าย draft → posted/ + notify Nexus"
  echo ""
  echo "⛔ กฎเหล็ก:"
  echo "    - Infographic = NotebookLM เท่านั้น (ห้าม Paradex — Thai text tofu)"
  echo "    - Import research ก่อน gen infographic เสมอ"
  echo "    - Marketing claims ≠ facts → verify กับ AA/LMSYS"
  echo "    - เช็ค CONTENT_INDEX.md กันหัวข้อซ้ำ"
  echo ""

  # Show last 5 content index entries
  if [ -f "$BASE/prism-chronicle/CONTENT_INDEX.md" ]; then
    echo "📊 Content ล่าสุด 5 รายการ:"
    tail -7 "$BASE/prism-chronicle/CONTENT_INDEX.md" 2>/dev/null | grep "^|" | tail -5
  fi
  echo ""

else
  echo "❌ เพจไม่ถูกต้อง: '$PAGE'"
  echo "   ใช้: aim หรือ chronicle"
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ อ่านครบ — เริ่มทำงานได้"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
