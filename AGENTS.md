# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Swap Kids Global** is a Telegram Mini App for free exchange of children's items (clothes, toys, strollers, car seats). Users browse listings for free; viewing seller contacts requires a one-time payment of 500 Telegram Stars (premium access) or earning it by inviting 3 referrals.

## Running the App

Install dependencies:
```bash
pip install -r requirements.txt
```

Set required environment variables (or create a `.env` file):
```bash
export BOT_TOKEN="your_telegram_bot_token"
export ADMIN_ID="your_telegram_user_id"       # Optional: enables moderation flow
export REPLIT_DEV_DOMAIN="your.replit.dev"    # Optional: overrides BASE_URL (defaults to http://localhost:8080)
```

Start the server:
```bash
python main.py
```

The app runs on `http://localhost:8080`. There is no test suite and no build step.

## Architecture

The entire backend is a **single file** (`main.py`) that runs an **aiogram 3 Telegram bot** and an **aiohttp web server** concurrently in the same asyncio event loop. The bot handles Telegram interactions (start command, payment events, moderation callbacks) while aiohttp serves the Mini App frontend and REST API.

### Key Components

- **`main.py`** — All backend logic: DB init, bot handlers, all API route handlers, and the `main()` entry point that wires everything together and starts both the web server and bot polling.
- **`templates/index.html`** — The entire frontend SPA (Single Page Application). Uses vanilla JS, Tailwind CSS via CDN, FontAwesome via CDN, and the Telegram WebApp JS SDK.
- **`static/`** — Static assets: `app.js`, `favicon.svg`, etc., served by the `handle_static` route.
- **`swap_global.db`** — SQLite database, created automatically on first run.

### Database Schema (SQLite)

| Table | Purpose |
|-------|---------|
| `users` | Telegram user profiles + `is_premium`, `karma`, `given_count`, `referred_by` |
| `items` | Listings with `status` (`pending`/`active`/`given`/`rejected`) and `item_type` (`giveaway`/`wish`) |
| `favorites` | User ↔ item favorites |
| `likes` | User ↔ item likes (shown on cards) |
| `activities` | Community feed events (`new_item`, `new_wish`, `item_given`) |
| `chats` + `messages` | In-app messaging between users about an item |
| `visit_logs` | Analytics: country, city, lang per visit |

`init_db()` runs migrations via `ALTER TABLE ... ADD COLUMN` wrapped in `try/except` to handle existing columns.

### Important Flows

**Photo upload**: Frontend converts photos to base64 via `FileReader`. Backend detects `data:image` prefix in the submitted `image` field and uploads to the Telegraph API (`https://telegra.ph/upload`), storing only the returned URL in the DB.

**Moderation**: New items from real users are saved with `status = 'pending'`. If `ADMIN_ID` is set, `notify_admin_new_item()` sends the admin a Telegram message with Approve/Reject inline buttons. The callback handler `handle_moderation` (matched by `mod_approve_<id>` / `mod_reject_<id>`) updates the status accordingly.

**Payments (Telegram Stars)**: `GET /api/invoice` calls `bot.send_invoice` with `currency="XTR"`. The `@router.message(F.successful_payment)` handler sets `is_premium = 1` in the DB.

**Referral system**: `/start ref_<user_id>` deep links. Successful referrals give the referrer +30 karma. Reaching 3 referrals auto-grants premium and notifies the referrer. A separate `referrals` table is referenced in code but not created in `init_db()` — this is a known gap.

**Karma**: +10 for posting an item, +50 for marking an item as given, +30 per successful referral.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BOT_TOKEN` | Yes | Telegram bot token from @BotFather |
| `ADMIN_ID` | No | Telegram user ID for moderation notifications and `/admin` stats command |
| `REPLIT_DEV_DOMAIN` | No | Replit domain; if set, `BASE_URL = https://{REPLIT_DEV_DOMAIN}` |

### Known Technical Debt (from `project.md`)

1. The `referrals` table is used in bot code but never created in `init_db()`.
2. `api_get_user_stats` is registered as a route but is not defined anywhere in `main.py`.
3. Photo storage via Telegraph API is a temporary MVP solution; should move to S3 or similar.
4. Telegram `initData` signature is not verified on the backend — all `user_id` values come from query params/request bodies without cryptographic validation.
