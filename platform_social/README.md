# Social Media Platforms

> แต่ละ platform มี folder แยก — ข้อมูล account, page/channel info, daily logs, content strategy
> ห้ามเก็บ credentials ในไฟล์เหล่านี้ — อ้าง `pass` store เท่านั้น

## โครงสร้างมาตรฐานทุก Platform

```
{platform}/
├── accounts/           # ข้อมูล account/login (อ้าง pass store)
│   └── {account}.md
├── {page-or-channel}/  # แยกตาม page/account/channel
│   ├── page-info.md    # ข้อมูลเพจ + brand voice + token status
│   └── logs/           # daily log รายวัน (YYYY-MM-DD.md)
└── README.md           # สรุป platform + content plan
```

## Active

| Platform | Folder | Pages/Accounts | สถานะ |
|----------|--------|----------------|-------|
| **Facebook** | `facebook/` | 4 เพจ (ทุกเพจมี token) | ✅ Active |

### Facebook Pages

| เพจ | Folder | Token | Info |
|-----|--------|-------|------|
| **Prism Chronicle** | `facebook/prism-chronicle/` | ✅ Permanent | [page-info](facebook/prism-chronicle/page-info.md) |
| Ai_In_Mind | `facebook/ai-in-mind/` | ✅ Permanent | [page-info](facebook/ai-in-mind/page-info.md) |
| Forex EAI Expert | `facebook/forex-eai/` | ✅ Permanent | [page-info](facebook/forex-eai/page-info.md) |
| Cakekhunaoy | `facebook/cakekhunaoy/` | ✅ Permanent | [page-info](facebook/cakekhunaoy/page-info.md) |

**Account**: [PapaJinna Wirunputi](facebook/accounts/papajinna.md)

## Planned (ดู [PLATFORM_API_REFERENCE.md](PLATFORM_API_REFERENCE.md) สำหรับรายละเอียด API ครบทุก platform)

| Platform | Folder | ฟรี? | ความยาก | Priority | README |
|----------|--------|------|---------|----------|--------|
| **Instagram** | `instagram/` | ✅ ฟรี | ง่าย (ใช้ Meta API เดิม) | 🥇 Tier 1 | [README](instagram/README.md) |
| **Discord** | `discord/` | ✅ ฟรี | ง่ายมาก (webhook) | 🥇 Tier 1 | [README](discord/README.md) |
| **Threads** | `threads/` | ✅ ฟรี | กลาง (Meta App Review) | 🥇 Tier 1 | — |
| **YouTube** | `youtube/` | ✅ ฟรี | กลาง (OAuth one-time) | 🥈 Tier 2 | [README](youtube/README.md) |
| **X / Twitter** | `x-twitter/` | ❌ $0.01/post | ง่าย | 🥈 Tier 2 | [README](x-twitter/README.md) |
| **Reddit** | `reddit/` | ✅ ฟรี | ง่าย | 🥈 Tier 2 | — |
| **LINE OA** | `line-oa/` | ✅ 300 msg free | กลาง | 🥉 Tier 3 | [README](line-oa/README.md) |
| **Pinterest** | `pinterest/` | ✅ ฟรี | กลาง | 🥉 Tier 3 | — |
| **LinkedIn** | `linkedin/` | ✅ ฟรี | ยาก (1-8 wk approval) | 🥉 Tier 3 | — |
| **TikTok** | `tiktok/` | ✅ ฟรี | ยาก (4-10 wk audit) | 🥉 Tier 3 | [README](tiktok/README.md) |

---
*Owner: Prism_Of_Novus | Updated: 2026-05-27*
