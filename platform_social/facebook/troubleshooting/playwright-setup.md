# Playwright Setup — วิธีใช้ที่ถูกต้อง

## สิ่งที่มีอยู่แล้ว (ห้าม install ใหม่)
- Chromium binary: `/home/jijiclaw/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`
- System Chrome: `/opt/google/chrome/chrome`
- npm playwright: `viral-content-bot/node_modules/playwright`

## วิธีรัน (env var จำเป็น)
```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/home/jijiclaw/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome \
  bun run scripts/<script>.ts
```

## FB Login Flow
1. ใช้ `pass master-j/facebook` → email: mamipogo1@hotmail.com
2. `chromium.launch({ headless: false, channel: "chrome" })` หรือ set env var
3. Login → fill email + password → press Enter
4. 2FA → poll loop เช็ค URL change ทุก 2 วิ (ห้าม fixed timeout)
5. Save state → `.fb-session/state.json`
6. ครั้งหน้า reuse state ไม่ต้อง login ใหม่

## ห้ามทำ
- ห้าม `bun add playwright` ซ้ำ
- ห้าม `npx playwright install` (ใช้ binary ที่มี)
- ห้ามใช้ `launchPersistentContext` กับ Chrome default profile
- ห้ามรัน login ใน background (ต้อง foreground เพื่อ 2FA)
