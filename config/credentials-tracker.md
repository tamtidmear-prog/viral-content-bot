# Credentials & Token Tracker

> Prism_Of_Novus — บริหารจัดการ credentials ทั้งหมด
> อัพเดตทุกครั้งที่มีการเปลี่ยนแปลง

## Facebook Tokens

| Item | Value/Location | Created | Expires | Status |
|------|---------------|---------|---------|--------|
| User Token (long-lived) | `platforms.json → user_access_token` | 2026-07-22 | **ไม่หมดอายุ** (exchanged via app2) | ✅ Active |
| Page Token: Prism Chronicle | `platforms.json → access_token` | 2026-05-25 | **ไม่หมดอายุ** | ✅ Active |
| Page Token: Ai_In_Mind | `platforms.json → pages.ai_in_mind` | 2026-05-26 | **ไม่หมดอายุ** | ✅ Active |
| Page Token: Forex EAI Expert | `platforms.json → pages.forex_eai` | 2026-05-26 | **ไม่หมดอายุ** | ✅ Active |
| Page Token: Cakekhunaoy | `platforms.json → pages.cakekhunaoy` | 2026-05-26 | **ไม่หมดอายุ** | ✅ Active |
| App ID (Mamipogo) | `222493084481502` | — | ไม่หมดอายุ | ✅ Fixed |
| App ID (App2 — token exchange) | `1934309713951680` | — | ไม่หมดอายุ | ✅ Fixed |
| App Secret (Mamipogo) | `pass prism/facebook-app-secret` | 2026-05-25 | ไม่หมดอายุ | ✅ Stored (GPG) |
| App Secret (App2) | `pass prism/facebook-app2-secret` | — | ไม่หมดอายุ | ✅ Stored (GPG) |

## Facebook Accounts (เจ้าของเพจ)

| FB Account | FB User ID | Email | Pass Store | Pages ที่จัดการ |
|------------|-----------|-------|------------|----------------|
| **PapaJinna Wirunputi** | `27630579793200254` | `mamipogo1@hotmail.com` | `master-j/facebook` | Prism Chronicle, Ai_In_Mind, Forex EAI, Cakekhunaoy |

> mamipogo1@hotmail.com = PapaJinna Wirunputi (ชื่อ FB กับ email ต่างกัน)

## Facebook Pages

| Page | Page ID | Owner Account | Role | Status |
|------|---------|--------------|------|--------|
| **Prism Chronicle** | `1184469221407318` | PapaJinna Wirunputi | เพจหลักของ Prism | ✅ Active (default) |
| Ai_In_Mind | `108423905655889` | PapaJinna Wirunputi | AI + ความรู้ทั่วไป | ✅ Active |
| Forex EAI Expert | `811730625603539` | PapaJinna Wirunputi | Forex + การเงิน | ✅ Active |
| Cakekhunaoy By Sweetjeed | `137411833080593` | PapaJinna Wirunputi | สำรอง | ✅ Active |

## Pass Store (GPG Encrypted)

| Path | Description | Created |
|------|-------------|---------|
| `master-j/apple-id` | Apple ID credentials | 2026-05-25 |
| `master-j/email` | Master J email | 2026-05-25 |
| `master-j/facebook` | Facebook login credentials | 2026-05-25 |
| `prism/facebook-app-id` | Mamipogo App ID | 2026-05-25 |
| `prism/facebook-app-secret` | Mamipogo App Secret | 2026-05-25 |
| `nexus/groq_api_key` | Groq AI API key | — |
| `nexus/gemini_api_key` | Gemini API key | — |
| `nexus/discord_token` | Discord bot token | — |
| `nexus/discord_app_id` | Discord app ID | — |
| `nexus/deepgram_api_key` | Deepgram STT API key | — |

## API Keys

| Service | Location | Used By | Status |
|---------|----------|---------|--------|
| Groq | `pass nexus/groq_api_key` | viral-content-bot (AI caption) | ✅ Active |
| Gemini | `pass nexus/gemini_api_key` | viral-content-bot (image gen) | ⚠️ Free tier ใช้ไม่ได้ |
| Discord | `pass nexus/discord_token` | Fleet communication | ✅ Active |
| Deepgram | `pass nexus/deepgram_api_key` | Voice-to-text | ✅ Active |

## Reminders & Schedule

| Date | Action | Priority |
|------|--------|----------|
| ~~2026-07-20~~ | ✅ Renewed 2026-07-22 — token ไม่หมดอายุแล้ว (app2 exchange) | ✅ DONE |
| ~~ทุก 55 วัน~~ | ไม่ต้องแล้ว — token ใหม่ expires=never | ✅ RESOLVED |
| — | หา image gen provider ใหม่ (Gemini ใช้ไม่ได้) | 🟡 MEDIUM |

## วิธี Renew Token (ทำก่อนหมดอายุ)

```bash
# 1. Generate short-lived token ที่ Graph API Explorer
#    (ต้องใช้ Playwright login + 2FA)

# 2. Exchange เป็น long-lived
# ใช้ app2 (1934309713951680) — token ปัจจุบันผูกกับ app นี้
# Mamipogo (222493084481502) และ PrismOracle (918491154577144) ใช้ไม่ได้
CURRENT_TOKEN="<จาก platforms.json → user_access_token>"
APP_SECRET=$(pass prism/facebook-app2-secret)
curl -s "https://graph.facebook.com/v25.0/oauth/access_token?\
grant_type=fb_exchange_token&\
client_id=1934309713951680&\
client_secret=$APP_SECRET&\
fb_exchange_token=$CURRENT_TOKEN"

# 3. ดึง page token (จะไม่หมดอายุ)
LONG_TOKEN="..."
curl -s "https://graph.facebook.com/v25.0/1184469221407318?\
fields=id,name,access_token&access_token=$LONG_TOKEN"

# 4. อัพเดต config/platforms.json
# 5. อัพเดตไฟล์นี้
```

---
*Last updated: 2026-07-22 by Nexus_Of_Novus (token exchange via app2)*
