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

## Deployment (Demo with Mock Data)

### Docker (Recommended)

One command to run the entire dashboard:

```bash
docker compose up --build
```

Opens at **http://localhost** — frontend + backend running together with demo data.

### Manual Deployment

**Frontend** (static build):

```bash
cd frontend
npm ci
npm run build
# Serve the dist/ folder with any static server
npx serve dist -l 5173
```

**Backend** (API server):

```bash
cd backend
npm ci
npm start
```

API runs at http://localhost:3001

### Cloud Deployment

| Service | Deploy Target | Notes |
|---------|---------------|-------|
| Frontend | Vercel, Netlify, Cloudflare Pages | Deploy `frontend/dist` after `npm run build` |
| Backend | Railway, Render, Fly.io | Deploy `backend/` with `npm start` |
| Full Stack | Any Docker host | Use `docker compose up --build` |

Set `ALLOWED_ORIGINS` environment variable on the backend to match your frontend URL.

## Streamlit Dashboard (Quick Preview)

A Python-based Streamlit version of the dashboard is included for quick deployment and previewing.

### Run Locally

```bash
pip install -r requirements-streamlit.txt
streamlit run streamlit_app.py
```

Opens at **http://localhost:8501**

### Deploy to Streamlit Community Cloud

1. Push this repo to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Select this repo, branch, and `streamlit_app.py` as the main file
4. Click **Deploy** — the app will be live in seconds

The Streamlit app includes all dashboard pages: Overview, Transactions, Sales Performance, Finance, Fuel Prices, Customers, and Cards Management — all running with the same demo data.

## Production Notes

To use with real data:
1. Configure `DATABASE_URL` in `backend/.env` to point to your PostgreSQL instance
2. Run Prisma migrations (schema in `backend/prisma/schema.prisma`)
3. Set `ANTHROPIC_API_KEY` to enable real Claude AI responses
4. Configure EFS API credentials for live transaction polling
