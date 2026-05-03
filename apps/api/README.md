# SAKAY API 

Backend powered by [Hono](https://hono.dev/) running on Cloudflare Workers with D1 as the database.

---

## 🛠 Tech Stack

- **Runtime** — Cloudflare Workers
- **Framework** — Hono
- **Database** — Cloudflare D1 (SQLite)
- **Validation** — Zod + OpenAPI

---

## 📡 Endpoints

### Health Check
```
GET /health
```

### Routes
```
GET /v1/routes
GET /v1/routes/:code
GET /v1/routes/search?from=&to=
```

### Stops
```
GET /v1/stops
```

---

## 💡 Example

**Find which jeepney to ride:**
```
GET /v1/routes/search?from=Persimmon&to=Metro Colon
```

**Response:**
```json
{
  "data": [
    { "id": 1, "code": "03B", "name": "Persimmon" },
    { "id": 1, "code": "03B", "name": "Hippodromo" },
    { "id": 1, "code": "03B", "name": "Fuente Osmena Circle" },
    { "id": 1, "code": "03B", "name": "Metro Colon" }
  ]
}
```

---

## 🚀 Run Locally

```bash
pnpm dev
# starts at http://localhost:8787
```

## 🗄 Database Setup

```bash
# Apply migrations (local)
wrangler d1 migrations apply jeepney-decoder-db --local

# Apply migrations (remote)
wrangler d1 migrations apply jeepney-decoder-db --remote
```

## 📦 Deploy

```bash
pnpm deploy
```