# MernPixel Frontend

Production frontend for the MernPixel website, built with React + Vite.

## Tech

- React 19
- Vite 8
- Framer Motion
- React Router
- Tailwind CSS (with custom CSS)

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Netlify Deployment (Frontend)

- Base directory: project root (`/`)
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect is configured via `public/_redirects`

## Render Deployment (Backend)

This repository currently contains frontend code only. Deploy your backend from a separate backend service/repository on Render (or add backend code here with its own service config).

## Note About `mernpixel-site/`

The `mernpixel-site/` folder is a separate starter/demo Vite app and not the main production frontend under `src/`.
