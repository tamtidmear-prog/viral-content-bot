# Setup Guide — viral-content-bot

## What You Need (Checklist)

| # | สิ่งที่ต้องมี | หาได้จากไหน | ฟรี? |
|---|-------------|-----------|------|
| 1 | **Bun runtime** | https://bun.sh/ → `curl -fsSL https://bun.sh/install \| bash` | Yes |
| 2 | **Facebook Page** | สร้างที่ https://www.facebook.com/pages/create | Yes |
| 3 | **Meta Developer Account** | สมัครที่ https://developers.facebook.com/ → Get Started | Yes |
| 4 | **Meta App (Live Mode)** | สร้างที่ https://developers.facebook.com/apps/creation/ | Yes |
| 5 | **Facebook Page Access Token** | Generate ที่ https://developers.facebook.com/tools/explorer/ | Yes |
| 6 | **AI API Key** (เลือก 1) | ดูด้านล่าง | Yes |

### AI API Keys (เลือกอย่างน้อย 1 อัน)

| Provider | สมัครที่ | ฟรี? | ความเร็ว | แนะนำ |
|----------|---------|------|---------|-------|
| **Groq** | https://console.groq.com/keys | Yes (free tier) | เร็วมาก | **แนะนำ** |
| Gemini | https://ai.google.dev/gemini-api/docs/api-key | Yes (free tier) | ปานกลาง | |
| Anthropic | https://console.anthropic.com/settings/keys | Paid ($5 credit) | ปานกลาง | |

---

## Prerequisites

- [Bun](https://bun.sh/) runtime (v1.0+)
- Facebook Page (admin access)
- API key from one of: [Groq](https://console.groq.com/) (free), [Gemini](https://ai.google.dev/), or [Anthropic](https://console.anthropic.com/)

## Step 1: Clone & Install

```bash
git clone https://github.com/YOUR_USER/viral-content-bot.git
cd viral-content-bot
bun install
```

## Step 2: Facebook App Setup

### 2.1 Create Meta Developer App

1. Go to https://developers.facebook.com/apps/creation/
2. Click **Create App** → Use case: **Other** → Type: **Business**
3. App name: anything (e.g. `MyContentBot`)
4. Contact email: your email

### 2.2 Basic Settings (required before Live Mode)

Go to **Settings → Basic**:

| Field | Value |
|-------|-------|
| Privacy Policy URL | Any valid URL (e.g. your GitHub repo URL) |
| Data Deletion URL | Same URL or a page with deletion instructions |
| App Icon | Any image 512x512 to 1024x1024 px |
| Category | Business and Pages |

Click **Save Changes**.

### 2.3 Switch to Live Mode

Toggle **Development → Live** at the top of the dashboard.

> **Why this matters:** Posts made via an app in Development Mode are only visible to app admins/developers. Public users cannot see them. Live Mode makes posts publicly visible.

### 2.4 Generate Access Token

1. Go to https://developers.facebook.com/tools/explorer/
2. Select your app
3. Add permissions: `pages_manage_posts`, `pages_read_engagement`, `pages_manage_engagement`, `pages_show_list`
4. Click **Generate Access Token** → Login → Authorize
5. Switch from User Token → **Page Token** (select your page)
6. Copy the token

### 2.5 Exchange for Long-lived Token (recommended)

Short-lived tokens expire in ~2 hours. Exchange for 60-day token:

```bash
curl "https://graph.facebook.com/v25.0/oauth/access_token?\
grant_type=fb_exchange_token&\
client_id=YOUR_APP_ID&\
client_secret=YOUR_APP_SECRET&\
fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
```

Then get permanent page tokens:

```bash
curl "https://graph.facebook.com/v25.0/me/accounts?\
fields=name,id,access_token&\
access_token=YOUR_LONG_LIVED_TOKEN"
```

Page tokens derived from long-lived user tokens are **permanent** (never expire).

## Step 3: Configure

```bash
cp config/platforms.example.json config/platforms.json
```

Edit `config/platforms.json` with your real tokens:

```json
{
  "facebook": {
    "enabled": true,
    "user_access_token": "YOUR_LONG_LIVED_USER_TOKEN",
    "page_id": "YOUR_PAGE_ID",
    "access_token": "YOUR_PAGE_ACCESS_TOKEN",
    "api_version": "v25.0",
    "pages": {
      "my_page": {
        "id": "123456789",
        "name": "My Page",
        "access_token": "PERMANENT_PAGE_TOKEN"
      }
    }
  }
}
```

Set AI API key (choose one):

```bash
# Groq (free, fast — recommended)
export GROQ_API_KEY="your_groq_api_key"

# OR Gemini
export GEMINI_API_KEY="your_gemini_api_key"

# OR Anthropic Claude
export ANTHROPIC_API_KEY="your_anthropic_api_key"
```

## Step 4: Configure AI Provider

Edit `config/app.json`:

```json
{
  "ai": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "language": "th",
    "max_tokens": 1024
  }
}
```

Available providers: `groq`, `gemini`, `claude`

## Step 5: Run

### CLI Mode
```bash
bun run src/index.ts "your topic here"
```

### Web UI Mode
```bash
bun run src/server.ts
# Open http://localhost:3939
```

## Step 6: Create Content Templates (optional)

Add JSON files to `config/templates/`:

```json
{
  "name": "tech",
  "description": "Technology and gadgets",
  "keywords": ["tech", "gadget", "smartphone", "app"],
  "system_prompt": "You are a tech content creator...",
  "tone": "informative-exciting",
  "hashtags_base": ["#Tech", "#Technology"],
  "image_style": "modern tech aesthetic, clean design"
}
```

The bot auto-matches topics to templates by keywords.

## Facebook API Quick Reference

### Post text only
```bash
curl -X POST "https://graph.facebook.com/v25.0/PAGE_ID/feed" \
  -d "message=Hello World" \
  -d "access_token=PAGE_TOKEN"
```

### Post with image
```bash
curl -X POST "https://graph.facebook.com/v25.0/PAGE_ID/photos" \
  -F "message=Hello World" \
  -F "source=@image.png" \
  -F "access_token=PAGE_TOKEN"
```

### Post multiple images
```bash
# 1. Upload each photo as unpublished
ID1=$(curl -s -X POST "https://graph.facebook.com/v25.0/PAGE_ID/photos" \
  -F "source=@img1.png" -F "published=false" -F "access_token=TOKEN" \
  | jq -r '.id')

ID2=$(curl -s -X POST "https://graph.facebook.com/v25.0/PAGE_ID/photos" \
  -F "source=@img2.png" -F "published=false" -F "access_token=TOKEN" \
  | jq -r '.id')

# 2. Create multi-photo post
curl -X POST "https://graph.facebook.com/v25.0/PAGE_ID/feed" \
  -F "message=Caption here" \
  -F 'attached_media=[{"media_fbid":"'$ID1'"},{"media_fbid":"'$ID2'"}]' \
  -F "access_token=TOKEN"
```

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Posts not visible to public | App in Development Mode | Switch to Live Mode in App Dashboard |
| `(#200) Provide valid app ID` | Token expired or invalid | Generate new token via Graph API Explorer |
| `OAuthException code 190` | Token expired | Exchange for long-lived token |
| `(#10) Object does not exist` | Wrong app or missing permission | Check app owns the page + has correct permissions |

## Security

- `config/platforms.json` is **gitignored** — never commit tokens
- Use `platforms.example.json` as template
- Store secrets in environment variables or a password manager
- Facebook App Secret should never be in source code
