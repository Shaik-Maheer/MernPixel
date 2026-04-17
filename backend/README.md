# MernPixel Backend

## Run locally

```bash
npm install
npm run dev
```

## API

- `GET /health`
- `POST /api/chat`
  - body: `{ "message": "hello", "history": [{ "role": "user", "content": "..." }] }`

## Render settings

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
