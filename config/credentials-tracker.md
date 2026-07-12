# Credentials & Token Tracker

> Prism_Of_Novus — บริหารจัดการ credentials ทั้งหมด
> อัพเดตทุกครั้งที่มีการเปลี่ยนแปลง

## Facebook Tokens

| Item | Value/Location | Created | Expires | Status |
|------|---------------|---------|---------|--------|
| User Token (long-lived) | `platforms.json → user_access_token` | 2026-05-26 | 2026-07-25 (60 วัน) | ✅ Active |
| Page Token: Prism Chronicle | `platforms.json → access_token` | 2026-05-25 | **ไม่หมดอายุ** | ✅ Active |
| Page Token: Ai_In_Mind | `platforms.json → pages.ai_in_mind` | 2026-05-26 | **ไม่หมดอายุ** | ✅ Active |
| Page Token: Forex EAI Expert | `platforms.json → pages.forex_eai` | 2026-05-26 | **ไม่หมดอายุ** | ✅ Active |
| Page Token: Cakekhunaoy | `platforms.json → pages.cakekhunaoy` | 2026-05-26 | **ไม่หมดอายุ** | ✅ Active |
| App ID (Mamipogo) | `222493084481502` | — | ไม่หมดอายุ | ✅ Fixed |
| App Secret | `pass prism/facebook-app-secret` | 2026-05-25 | ไม่หมดอายุ | ✅ Stored (GPG) |

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
| **2026-07-20** | ⚠️ Renew Facebook User Token (long-lived หมด 07-25) | 🔴 HIGH |
| ทุก 55 วัน | Exchange user token ใหม่ก่อนหมดอายุ | 🔴 HIGH |
| — | หา image gen provider ใหม่ (Gemini ใช้ไม่ได้) | 🟡 MEDIUM |

## วิธี Renew Token (ทำก่อนหมดอายุ)

```bash
# 1. Generate short-lived token ที่ Graph API Explorer
#    (ต้องใช้ Playwright login + 2FA)

# 2. Exchange เป็น long-lived
SHORT_TOKEN="..." 
APP_SECRET=$(pass prism/facebook-app-secret)
curl -s "https://graph.facebook.com/v25.0/oauth/access_token?\
grant_type=fb_exchange_token&\
client_id=222493084481502&\
client_secret=$APP_SECRET&\
fb_exchange_token=$SHORT_TOKEN"

# 3. ดึง page token (จะไม่หมดอายุ)
LONG_TOKEN="..."
curl -s "https://graph.facebook.com/v25.0/1184469221407318?\
fields=id,name,access_token&access_token=$LONG_TOKEN"

# 4. อัพเดต config/platforms.json
# 5. อัพเดตไฟล์นี้
```

---
*Last updated: 2026-05-25 by Prism_Of_Novus*
