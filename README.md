# MernPixel Full Stack

This repository now includes:

- Frontend (React + Vite) in project root
- Backend (Express + MongoDB + OpenAI-compatible chatbot API) in `backend/`

## Frontend local

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend env:

- `VITE_API_BASE_URL` (example: `http://localhost:10000` locally, Render backend URL in Netlify production)

## Backend local

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Main backend routes:

- `GET /health`
- `POST /api/chat`

## Double checks

```bash
# frontend
npm run lint
npm run build

# backend syntax checks
node --check backend/src/server.js
node --check backend/src/routes/chat.js
```

## Netlify deployment (frontend)

- Base directory: `/`
- Build command: `npm run build`
- Publish directory: `dist`
- Set env var in Netlify:
  - `VITE_API_BASE_URL=https://<your-render-service>.onrender.com`

## Render deployment (backend)

- Use `render.yaml` (Blueprint) or manual setup.
- Service root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Required env vars:
  - `FRONTEND_URL=https://<your-netlify-domain>.netlify.app`
  - `MONGODB_URI=...`
  - `OPENAI_API_KEY=...`
  - `OPENAI_BASE_URL=https://openrouter.ai/api/v1`
  - `OPENAI_MODEL=openai/gpt-4o-mini`
