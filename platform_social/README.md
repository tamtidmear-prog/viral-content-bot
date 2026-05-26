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

## Planned

| Platform | Folder | สถานะ | README |
|----------|--------|-------|--------|
| Instagram | `instagram/` | 📋 Planned | [README](instagram/README.md) |
| X / Twitter | `x-twitter/` | 📋 Planned | [README](x-twitter/README.md) |
| LINE OA | `line-oa/` | 📋 Planned | [README](line-oa/README.md) |
| TikTok | `tiktok/` | 📋 Planned | [README](tiktok/README.md) |
| YouTube | `youtube/` | 📋 Planned | [README](youtube/README.md) |
| Discord | `discord/` | 📋 Planned | [README](discord/README.md) |

---
*Owner: Prism_Of_Novus | Updated: 2026-05-26*
