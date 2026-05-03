# 🚌 Cebu Jeepney Decoder

> Find the right jeepney — no more guessing.

A simple web app that helps you find which jeepney to ride in Cebu City based on your start and destination.

---

## 📦 Project Structure

```
sakay/
├── apps/
│   ├── api/   → Backend (Hono + Cloudflare Workers)
│   └── web/   → Frontend (Next.js) — coming soon
├── package.json
└── pnpm-workspace.yaml
```

---

## 🚀 Getting Started

### Requirements
- Node.js 18+
- pnpm
- Cloudflare account

### Install

```bash
git clone https://github.com/tan911/sakay.git
cd sakay
pnpm install
```

### Run locally

```bash
# Backend
cd apps/api
pnpm dev
```

---

## 🛠 Tech Stack

| | Tool |
|---|---|
| Backend | Hono, Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) |
| Frontend | Next.js (coming soon) |
| Validation | Zod + OpenAPI |

---

## 📄 License

MIT