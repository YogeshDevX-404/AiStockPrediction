# TradeGenius AI - Enterprise Stock Intelligence Platform

TradeGenius AI is an AI-powered stock market intelligence platform inspired by TradingView, Zerodha Kite, Bloomberg Terminal, Trendlyne, and ChatGPT.

This repository contains the **production-ready architecture foundation**, folder structure, reusable design system, Zustand stores, React Router routes, Express backend, Prisma ORM schemas, and Docker orchestration.

---

## 🏗️ Architecture & Tech Stack

### Frontend (`client/`)
- **Core**: React 19, Vite, TypeScript
- **Styling & UI**: TailwindCSS v4, Glassmorphism design tokens, Custom component library
- **Icons & Motion**: Lucide Icons, Framer Motion
- **State & Data**: Zustand (Auth, Theme, Portfolio, Watchlist, Prediction, Notifications, Settings), TanStack Query
- **Routing**: React Router v7 with Protected and Guest route guards
- **API & Forms**: Axios with interceptors, React Hook Form, Zod validation

### Backend (`backend/`)
- **Runtime & Server**: Node.js, Express, TypeScript
- **Database & Schema**: PostgreSQL, Prisma ORM (User, Portfolio, Watchlist, Prediction, Transaction, Alert, Chat, News, Settings)
- **Security & Utilities**: Helmet, CORS, Compression, Morgan, Winston logger, JWT, Bcrypt, Express Rate Limiter
- **Cache**: Redis client scaffold

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Docker & Docker Compose (optional for containerized setup)

### 1. Install Dependencies
```bash
# Frontend
cd client
npm install

# Backend
cd backend
npm install
```

### 2. Run Development Mode
```bash
# Run client (http://localhost:3000)
cd client
npm run dev

# Run backend (http://localhost:5000)
cd backend
npm run dev
```

### 3. Docker Compose Orchestration
```bash
docker-compose up --build
```

---

## 📁 Repository Directory Structure

```
TradeGenius/
├── client/                     # Vite + React 19 + TS Frontend App
│   ├── src/
│   │   ├── components/        # Design system UI components (buttons, cards, inputs, modals, layout)
│   │   ├── pages/             # Landing, Dashboard, Portfolio, Watchlist, Stock, Prediction, News, Chat, Settings, Admin, Auth, 404
│   │   ├── store/             # Zustand global state stores
│   │   ├── api/               # Axios client with interceptors
│   │   ├── routes/            # React Router setup & protected guards
│   │   ├── styles/            # Glassmorphism & theme CSS system
│   │   └── types/             # TypeScript definitions
├── backend/                    # Node.js + Express + TS Backend API
│   ├── src/
│   │   ├── config/            # Env validation & server config
│   │   ├── controllers/       # Route controllers
│   │   ├── middlewares/       # Error handler, rate limiters, auth, validation
│   │   ├── prisma/            # Prisma Schema
│   │   └── index.ts           # Server entrypoint
├── .github/workflows/ci.yml    # GitHub Actions CI Workflow
├── docker-compose.yml          # Postgres, Redis, Backend & Client orchestration
└── README.md
```
