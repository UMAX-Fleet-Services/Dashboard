# UMAX Fleet Services Dashboard

A real-time business intelligence dashboard for UMAX Fleet Services — a B2B fuel card provider for trucking companies in the United States.

## Overview

This is a full-stack SPA (Single-Page Application) built with:

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4 + Recharts + TanStack Table
- **Backend**: Node.js + Express + Socket.io
- **State**: Zustand
- **Animations**: Framer Motion

## Features

- 📊 **Overview Dashboard** — 8 animated KPI cards with sparklines and count-up animations
- ⚡ **Live Transactions** — Real-time EFS transaction feed via WebSocket (15s updates)
- 🏆 **Sales Performance** — Leaderboard with employee drill-down, conversion funnel, channel attribution
- 💰 **Finance** — P&L waterfall chart, invoice tracker, fuel price impact analysis, revenue recognition timeline
- 💳 **Cards Management** — Card usage donut chart, card status management
- ⛽ **Fuel Prices** — Multi-vendor price tracker with alerts
- 👥 **Customers** — Retention funnel, at-risk customer identification
- 📈 **Reports** — Power BI-compatible Excel export, PDF generation
- 🤖 **AI Insights** — Claude-powered chat panel with streaming responses and proactive insights
- 🔔 **Notifications** — Real-time alert system for price spikes, overdue invoices, card limits

## Project Structure

```
├── frontend/          # React 18 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/          # AI chat panel
│   │   │   ├── charts/      # Recharts components
│   │   │   ├── layout/      # Sidebar, TopBar, FilterBar
│   │   │   ├── notifications/
│   │   │   └── ui/          # Shared UI components (KPICard, Badge, etc.)
│   │   ├── lib/
│   │   │   ├── mockData.ts  # Mock EFS transaction data
│   │   │   └── utils.ts
│   │   ├── pages/           # Route-level page components
│   │   └── store/           # Zustand global state
│   └── package.json
└── backend/           # Node.js + Express API
    ├── src/
    │   ├── data/        # Mock database
    │   ├── middleware/  # Auth, rate limiting
    │   └── routes/      # API endpoints
    └── package.json
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at http://localhost:5173

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API runs at http://localhost:3001

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/kpis?period=month` | 8 KPI card values + deltas |
| GET | `/api/transactions?page=1&limit=50` | Paginated EFS transaction feed |
| GET | `/api/employees/leaderboard?period=month` | Sales leaderboard |
| GET | `/api/employees/:id/detail` | Employee breakdown |
| GET | `/api/finance/pl?period=month` | P&L waterfall data |
| GET | `/api/finance/invoices` | Invoice tracker |
| GET | `/api/fuel-prices?days=30` | Multi-vendor price history |
| GET | `/api/customers?status=at_risk` | Customer list with retention |
| GET | `/api/dashboard-context` | AI context summary |
| POST | `/api/ai/chat` | SSE streaming AI responses |
| GET | `/api/export/powerbi` | Power BI Excel export data |

## Navigation

| Route | Page | Description |
|-------|------|-------------|
| `/` | Overview | Executive KPI summary |
| `/transactions` | Transactions | Live EFS feed |
| `/sales` | Sales Performance | Leaderboard + rep drill-down |
| `/cards` | Cards Management | Card status, limits |
| `/finance` | Finance | P&L, invoices, revenue |
| `/fuel-prices` | Fuel Prices | Vendor price tracking |
| `/customers` | Customers | CRM + retention metrics |
| `/reports` | Reports | Export center |
| `/ai-insights` | AI Insights | Full AI chat page |

## Design

- **Dark mode first** with light mode toggle
- Color palette: Blue (#3B82F6) primary, Emerald success, Amber warning, Red danger
- Typography: Inter font family
- Inspired by Linear, Vercel Dashboard, and Stripe Atlas

## Deployment

This project supports multiple deployment methods — from one-click cloud platforms to fully self-hosted Docker.

### Quick Deployment Summary

| Component | Platform | One-Click / Config File |
|-----------|----------|------------------------|
| Frontend | **GitHub Pages** | Automatic on push to `main` ([workflow](.github/workflows/deploy-pages.yml)) |
| Frontend | **Vercel** | [`frontend/vercel.json`](frontend/vercel.json) — connect repo in dashboard |
| Frontend | **Netlify** | [`frontend/netlify.toml`](frontend/netlify.toml) — connect repo in dashboard |
| Backend | **Fly.io** | [`fly.toml`](fly.toml) — `fly launch && fly deploy` |
| Full Stack | **Render** | [`render.yaml`](render.yaml) — one-click Blueprint |
| Full Stack | **Railway** | [`railway.toml`](railway.toml) — `railway up` |
| Full Stack | **Docker (GHCR)** | Auto-published on push to `main` ([workflow](.github/workflows/docker-publish.yml)) |
| Streamlit | **Streamlit Cloud** | Point to `streamlit_app.py` at [share.streamlit.io](https://share.streamlit.io) |

---

### 🚀 GitHub Pages (Frontend)

The frontend is **automatically deployed** to GitHub Pages on every push to `main`.

**Setup** (one-time):
1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the deploy workflow runs automatically

The deployment URL will be: `https://umax-fleet-services.github.io/Dashboard/`

> **Note**: GitHub Pages only hosts the static frontend. For the full dashboard with API + WebSocket, use one of the full-stack options below.

---

### ▲ Vercel (Frontend)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repo
3. Set **Root Directory** to `frontend`
4. Vercel auto-detects Vite — click **Deploy**
5. Set environment variable `VITE_API_URL` to your backend URL

Config: [`frontend/vercel.json`](frontend/vercel.json)

---

### ◆ Netlify (Frontend)

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Select this repo
3. Netlify auto-detects settings from `frontend/netlify.toml`
4. Set environment variable `BACKEND_URL` to your backend URL
5. Click **Deploy**

Or via CLI:
```bash
cd frontend
npx netlify-cli login
npx netlify-cli init
npx netlify-cli deploy --prod
```

Config: [`frontend/netlify.toml`](frontend/netlify.toml)

---

### 🪁 Fly.io (Backend API)

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login & deploy
fly auth login
fly launch --no-deploy
fly secrets set ANTHROPIC_API_KEY=your-key JWT_SECRET=your-secret
fly deploy
```

Your API will be live at `https://umax-dashboard.fly.dev`

Config: [`fly.toml`](fly.toml)

---

### 🟣 Render (Full Stack — One Click)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/UMAX-Fleet-Services/Dashboard)

1. Click the button above (or go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints))
2. Select this repo
3. Render creates **3 services** automatically: Frontend, Backend, and Streamlit
4. Set `ANTHROPIC_API_KEY` when prompted

Config: [`render.yaml`](render.yaml)

---

### 🚂 Railway (Full Stack)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login & deploy
railway login
railway init
railway up
```

Or connect the repo at [railway.app](https://railway.app) and Railway auto-detects the config.

Config: [`railway.toml`](railway.toml) / [`railway.json`](railway.json)

---

### 🐳 Docker (Self-Hosted / Any Cloud VM)

**Local:**

```bash
docker compose up --build
```

Opens at **http://localhost** — frontend + backend + Streamlit running together with demo data.

**Pre-built images from GitHub Container Registry:**

Docker images are automatically published to GHCR on every push to `main`:

```bash
# Pull the latest images
docker pull ghcr.io/umax-fleet-services/dashboard/frontend:latest
docker pull ghcr.io/umax-fleet-services/dashboard/backend:latest
docker pull ghcr.io/umax-fleet-services/dashboard/streamlit:latest

# Run individually
docker run -p 80:80 ghcr.io/umax-fleet-services/dashboard/frontend:latest
docker run -p 3001:3001 ghcr.io/umax-fleet-services/dashboard/backend:latest
docker run -p 8501:8501 ghcr.io/umax-fleet-services/dashboard/streamlit:latest
```

Or use docker compose with the published images:

```yaml
# docker-compose.prod.yml
services:
  frontend:
    image: ghcr.io/umax-fleet-services/dashboard/frontend:latest
    ports: ["80:80"]
  backend:
    image: ghcr.io/umax-fleet-services/dashboard/backend:latest
    ports: ["3001:3001"]
  streamlit:
    image: ghcr.io/umax-fleet-services/dashboard/streamlit:latest
    ports: ["8501:8501"]
```

CI workflow: [`.github/workflows/docker-publish.yml`](.github/workflows/docker-publish.yml)

---

### 🎈 Streamlit Community Cloud

1. Go to [share.streamlit.io](https://share.streamlit.io)
2. Select this repo, branch `main`, and `streamlit_app.py` as the main file
3. Click **Deploy** — the app will be live in seconds

The Streamlit app includes all dashboard pages: Overview, Transactions, Sales Performance, Finance, Fuel Prices, Customers, and Cards Management — all running with the same demo data.

---

### Environment Variables

| Variable | Required | Where | Description |
|----------|----------|-------|-------------|
| `VITE_API_URL` | Optional | Frontend | Backend API URL (for Vercel/Netlify — not needed for Docker) |
| `BACKEND_URL` | Optional | Netlify | Backend URL for API proxy redirects |
| `PORT` | Yes | Backend | Server port (default: `3001`) |
| `NODE_ENV` | Yes | Backend | Set to `production` |
| `ALLOWED_ORIGINS` | Yes | Backend | Comma-separated frontend URLs for CORS |
| `ANTHROPIC_API_KEY` | Optional | Backend | Enables Claude AI chat responses |
| `JWT_SECRET` | Optional | Backend | Secret for JWT token signing |
| `DATABASE_URL` | Optional | Backend | PostgreSQL connection string (for production data) |

---

## CI/CD Pipelines

| Workflow | Trigger | What it does |
|----------|---------|-------------|
| [CI & Docker Build](.github/workflows/ci.yml) | Push/PR to `main` | Lint, build, and Docker compose build |
| [Deploy to GitHub Pages](.github/workflows/deploy-pages.yml) | Push to `main` | Builds frontend and deploys to GitHub Pages |
| [Publish Docker Images](.github/workflows/docker-publish.yml) | Push to `main` / tags | Builds and pushes images to GHCR |

## Production Notes

To use with real data:
1. Configure `DATABASE_URL` in `backend/.env` to point to your PostgreSQL instance
2. Run Prisma migrations (schema in `backend/prisma/schema.prisma`)
3. Set `ANTHROPIC_API_KEY` to enable real Claude AI responses
4. Configure EFS API credentials for live transaction polling
