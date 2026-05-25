# Facebook Page — เปลี่ยน Profile Pic + Cover Photo

## ปัญหา 1: API ต้อง pages_manage_metadata
- `POST /{page_id}/picture` → error 283: Requires pages_manage_metadata
- `POST /{page_id}` with `cover_source` → same error
- **สาเหตุ:** token ไม่มี permission นี้
- **แก้:** ไป Graph API Explorer → เพิ่ม `pages_manage_metadata` → Generate token ใหม่
- **หรือ:** ใช้ Playwright automate ผ่าน facebook.com UI แทน API

## ปัญหา 2: Playwright chromium version mismatch
- npm playwright ต้อง `chromium-1223` แต่มีแค่ `chromium-1217`
- **แก้:** set env var `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/home/jijiclaw/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`

## ปัญหา 3: Chrome profile ใช้กับ Playwright persistent context ไม่ได้
- error: "DevTools remote debugging requires a non-default data directory"
- **แก้:** ใช้ `chromium.launch()` ปกติ (ไม่ใช่ persistent context) + login ด้วย credentials จาก pass store + save state เป็น `.fb-session/state.json`

## ปัญหา 4: FB Page UI ไม่มีปุ่ม "Edit profile picture" แยก
- หน้า "จัดการเพจ" (Page management) mode ไม่แสดงปุ่ม edit
- **แก้:** click ที่รูป profile ตรงๆ → จะเปิด menu ให้เปลี่ยนรูป

## Credentials
- บัญชีเจ้าของเพจ: **PapaJinna Wirunputi** (FB ID: 27630579793200254)
- Email: `mamipogo1@hotmail.com`
- Pass store: `master-j/facebook`
- App: Mamipogo (ID: 222493084481502)

## วิธีที่ใช้ได้จริง (2026-05-25)

### Prerequisites
- App Mamipogo ต้องเปิด **Standard Access** สำหรับ `pages_manage_metadata` ที่ App Dashboard
- URL: https://developers.facebook.com/apps/222493084481502/ → การตรวจพิจารณาแอพ → สิทธิ์และฟีเจอร์

### Set Profile Picture (API)
```bash
PAGE_TOKEN=$(python3 -c "import json; d=json.load(open('config/platforms.json')); print(d['facebook']['access_token'])")
curl -s -X POST "https://graph.facebook.com/v25.0/1184469221407318/picture" \
  -F "source=@<image.png>" \
  -F "access_token=$PAGE_TOKEN"
# Returns: {"success":true}
```

### Set Cover Photo (API — 2 steps)
```bash
# Step 1: Upload photo (unpublished)
PHOTO_ID=$(curl -s -X POST "https://graph.facebook.com/v25.0/1184469221407318/photos" \
  -F "source=@<cover.png>" \
  -F "published=false" \
  -F "access_token=$PAGE_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

# Step 2: Set as cover (pass photo ID directly, NOT JSON)
curl -s -X POST "https://graph.facebook.com/v25.0/1184469221407318" \
  -d "cover=$PHOTO_ID" \
  -d "access_token=$PAGE_TOKEN"
# Returns: {"success":true}
```

### ผิดพลาดที่เคยทำ
- `cover_source` → parameter ไม่มีจริง
- `cover={"photo_id":"xxx"}` → ต้องส่ง ID ตรงๆ ไม่ใช่ JSON
- ไม่ต้องใช้ Playwright automate FB UI — API ทำได้ถ้ามี Standard Access
