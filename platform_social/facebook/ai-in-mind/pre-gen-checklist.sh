#!/bin/bash
# AiM Pre-Gen Checklist — บังคับอ่านก่อน gen ทุกครั้ง
# ห้าม gen รูปโดยไม่รันสคริปต์นี้ก่อน

set -e

BASE="$HOME/Oracle_Project/Prism/viral-content-bot/platform_social/facebook/ai-in-mind"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 AiM PRE-GEN CHECKLIST"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "1️⃣  IMAGE_PROMPT_TEMPLATE v6 — 3 modes:"
echo "   CLOSE-UP (f/1.4) | HALF-BODY (f/2.0) | FULL-BODY (f/2.8)"
echo "   Template: $BASE/IMAGE_PROMPT_TEMPLATE.md"
echo ""

echo "2️⃣  THEME_INDEX — ธีมล่าสุด 7 วัน:"
tail -10 "$BASE/THEME_INDEX.md" 2>/dev/null || echo "   ⚠️ THEME_INDEX not found"
echo ""

echo "3️⃣  ห้ามใช้ธีม:"
grep -A3 "ห้ามใช้" "$BASE/THEME_INDEX.md" 2>/dev/null | head -5 || echo "   ไม่มีธีมห้าม"
echo ""

echo "4️⃣  วันนี้:"
TZ=Asia/Bangkok date '+%A %d %B %Y'
echo ""

echo "5️⃣  Prompt MUST include:"
echo "   ☐ FACE REF LINE (บนสุด)"
echo "   ☐ Mode header (Fine-Art/Editorial/Lifestyle)"
echo "   ☐ 👗 FASHION (specific items)"
echo "   ☐ 💄 MAKEUP"
echo "   ☐ 💇 HAIR (+ interaction)"
echo "   ☐ 🧍 POSE (specific)"
echo "   ☐ 😊 EXPRESSION (specific)"
echo "   ☐ 💡 LIGHTING (direction + quality + tone)"
echo "   ☐ 🏝️ BACKGROUND (detailed)"
echo "   ☐ 🎥 CAMERA (lens + aperture + style)"
echo "   ☐ QUALITY BLOCK"
echo "   ☐ 🚫 NEGATIVE PROMPT"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Checklist done — เขียน prompt ได้"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"