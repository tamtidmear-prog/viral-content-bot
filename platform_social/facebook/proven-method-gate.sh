#!/usr/bin/env bash
# proven-method-gate.sh — อ่านก่อนทำ ห้ามเดา
# รันก่อนทำงานใดๆ ที่มี proven method — ค้น memory + แสดงวิธีที่เคยทำสำเร็จ + wound ที่เคยพลาด
# Usage: bash proven-method-gate.sh "คำค้น เช่น image gen, post aim, maw paradex"

set -euo pipefail

MEMORY_DIR="$HOME/.claude/projects/-home-jijiclaw-Oracle-Project-Prism/memory"
KEYWORDS="${1:-}"

if [ -z "$KEYWORDS" ]; then
  echo "❌ ระบุคำค้น: bash proven-method-gate.sh \"image gen\""
  echo ""
  echo "ตัวอย่าง:"
  echo "  bash proven-method-gate.sh \"image gen aim\""
  echo "  bash proven-method-gate.sh \"post chronicle\""
  echo "  bash proven-method-gate.sh \"maw paradex\""
  echo "  bash proven-method-gate.sh \"nexus send\""
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 PROVEN METHOD GATE — อ่านก่อนทำ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔑 คำค้น: $KEYWORDS"
echo ""

# Search memory files for keywords
FOUND=0

echo "📋 PROVEN METHODS (วิธีที่เคยทำสำเร็จ):"
echo "─────────────────────────────────────"
for keyword in $KEYWORDS; do
  grep -ril "$keyword" "$MEMORY_DIR"/*.md 2>/dev/null | while read -r file; do
    fname=$(basename "$file")
    desc=$(grep "^description:" "$file" 2>/dev/null | head -1 | sed 's/description: *//' | tr -d '"')
    echo "  📄 $fname"
    echo "     $desc"
    echo ""
    FOUND=1
  done
done

if [ "$FOUND" = "0" ]; then
  # Try broader search
  for keyword in $KEYWORDS; do
    grep -ril "$keyword" "$MEMORY_DIR"/*.md 2>/dev/null | while read -r file; do
      fname=$(basename "$file")
      echo "  📄 $fname"
    done
  done
fi

echo ""
echo "⚠️  WOUNDS (สิ่งที่เคยทำพลาด):"
echo "─────────────────────────────────────"
# Always show these critical wound memories
for wound in "use-proven-method-first" "wounds-from-playwright" "root-cause-before-retry" "face-ref-hard-gate" "sop-read-before-assume"; do
  if [ -f "$MEMORY_DIR/${wound}.md" ]; then
    desc=$(grep "^description:" "$MEMORY_DIR/${wound}.md" 2>/dev/null | head -1 | sed 's/description: *//' | tr -d '"')
    echo "  ⛔ ${wound}.md"
    echo "     $desc"
    echo ""
  fi
done

echo ""
echo "📖 COMMUNICATION ROUTES (ถ้าต้องส่งงาน):"
echo "─────────────────────────────────────"
echo "  Nexus (local):  curl localhost:3456/api/send -d '{\"target\":\"nexus\",\"text\":\"...\"}'"
echo "  Paradex (local): maw send-text paradex:0 \"...\""
echo "  Origin (remote): maw send-text oon:origin_discord:0 \"...\""
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⛔ กฎเหล็ก:"
echo "  1. อ่าน memory ที่เกี่ยวข้องก่อนทำ"
echo "  2. ใช้ proven method ก่อนเสมอ"
echo "  3. ห้ามลอง tool ใหม่ก่อนใช้ของเดิม"
echo "  4. ติดจริง → ถาม Nexus ก่อนมั่วเอง"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ อ่านครบ — ทำตาม proven method ได้"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
