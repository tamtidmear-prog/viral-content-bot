# viral-content-bot

AI-powered social media content bot — give it a topic, it creates captions, hashtags, images, and posts to Facebook automatically.

```
Topic → AI Brain → Caption + Hashtags + Image → Post to Facebook
         (2s)                                       (total ~5s)
```

## Features

- **AI Content Generation** — Groq (free), Gemini, or Claude as AI backend
- **Template System** — auto-match topics to content templates (gaming, finance, lifestyle, etc.)
- **Facebook Graph API** — post text, single image, or multi-image to any Facebook Page
- **Web UI** — browser interface at `localhost:3939`
- **CLI** — one-command posting from terminal
- **Multi-Page** — manage multiple Facebook Pages from one config

## Quick Start

```bash
# 1. Install
bun install

# 2. Configure
cp config/platforms.example.json config/platforms.json
# Edit platforms.json with your Facebook Page token (see SETUP.md)

# 3. Set AI API key
export GROQ_API_KEY="your_key_here"    # Free at https://console.groq.com/

# 4. Run
bun run src/index.ts "AI trends 2026"
```

## Usage

### CLI
```bash
bun run src/index.ts "topic here"
```

### Web UI
```bash
bun run src/server.ts
# Open http://localhost:3939
```

### Examples
```bash
bun run src/index.ts "เกมส์ใหม่น่าเล่น 2026"     # matches gaming template
bun run src/index.ts "วิธีออมเงิน 50-30-20"        # matches finance template
bun run src/index.ts "ที่เที่ยวเชียงใหม่หน้าฝน"      # matches lifestyle template
bun run src/index.ts "Top 5 AI tools for work"     # default template
```

## How It Works

```
src/brain.ts        → AI generates caption + hashtags + image prompt
src/image.ts        → AI generates image (optional)
src/publisher/      → Posts to Facebook via Graph API v25.0
config/templates/   → Content templates auto-matched by keywords
config/app.json     → AI provider + model settings
config/platforms.json → Facebook tokens (gitignored)
```

### Content Flow
1. **Input** — topic string (Thai or English)
2. **Template Match** — scan `config/templates/*.json` for keyword match
3. **AI Brain** — send topic + template prompt to AI → get caption, hashtags, image prompt
4. **Image Gen** — generate image from prompt (optional, needs Gemini API key)
5. **Publish** — post caption + image to Facebook Page via Graph API
6. **Log** — save all outputs to `output/` folder

## Facebook Setup

> Full step-by-step guide: **[SETUP.md](SETUP.md)**

Key points:
1. Create a Meta Developer App at `developers.facebook.com`
2. **Switch to Live Mode** (Development Mode = posts invisible to public)
3. Generate Page Access Token via Graph API Explorer
4. Exchange for long-lived token (60 days)
5. Page tokens from long-lived user tokens are **permanent**

## Template System

Auto-matches topics to templates by keywords:

| Template | Keywords | Tone |
|----------|----------|------|
| gaming | เกมส์, gaming, esports | fun, viral |
| finance | การเงิน, ออมเงิน, ลงทุน | trustworthy |
| lifestyle | ไลฟ์สไตล์, อาหาร, ท่องเที่ยว | warm, inspiring |

Create custom templates in `config/templates/`:

```json
{
  "name": "tech",
  "keywords": ["tech", "AI", "gadget", "app"],
  "system_prompt": "You are a tech content creator...",
  "tone": "smart-casual",
  "hashtags_base": ["#Tech", "#AI"],
  "image_style": "modern tech aesthetic"
}
```

## Project Structure

```
viral-content-bot/
├── config/
│   ├── app.json                  # AI provider + model config
│   ├── platforms.json            # Facebook tokens (gitignored)
│   ├── platforms.example.json    # Template for platforms.json
│   └── templates/                # Content templates
├── src/
│   ├── index.ts                  # CLI entry point
│   ├── server.ts                 # Web UI server (port 3939)
│   ├── brain.ts                  # AI content generation
│   ├── image.ts                  # Image generation
│   ├── logger.ts                 # Output file management
│   ├── token.ts                  # Token management
│   └── publisher/
│       ├── index.ts              # Platform router
│       └── facebook.ts           # Facebook Graph API
├── platform_social/              # Per-page docs, logs, posted content
├── scripts/                      # Utility scripts
├── output/                       # Generated content output
├── SETUP.md                      # Full setup guide
├── POSTING_SOP.md                # Posting workflow (12 steps)
└── README.md
```

## AI Providers

| Provider | Model | Free? | Speed |
|----------|-------|-------|-------|
| **Groq** | llama-3.3-70b-versatile | Yes | Fast |
| Gemini | gemini-2.0-flash | Free tier | Medium |
| Claude | claude-sonnet-4-6 | Paid | Medium |

Change provider in `config/app.json`:
```json
{ "ai": { "provider": "groq", "model": "llama-3.3-70b-versatile" } }
```

## Facebook API Reference

| Action | Endpoint | Method |
|--------|----------|--------|
| Post text | `/{page_id}/feed` | POST |
| Post with image | `/{page_id}/photos` | POST |
| Multi-image | Upload unpublished → `/{page_id}/feed` with `attached_media` | POST |
| Delete post | `/{post_id}` | DELETE |

## Security

- `config/platforms.json` is **gitignored** — never commit tokens
- API keys read from environment variables, not hardcoded
- Use `platforms.example.json` as template when sharing

## Requirements

- [Bun](https://bun.sh/) v1.0+
- Facebook Page (admin access)
- API key: Groq (free) / Gemini / Anthropic

## License

MIT
