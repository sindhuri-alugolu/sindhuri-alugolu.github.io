# Sindhuri Alugolu — Portfolio

Professional portfolio and admin editor for [Sindhuri Alugolu](https://github.com/Sindhu-9999-hash).

## Live URLs (after deploy)

| Page | Path |
|---|---|
| Portfolio (resume) | `/sindhu.html` |
| Public website | `/sindhu-website.html` |
| Admin editor | `/sindhu-admin.html` |

## For Sindhu — editing your portfolio

1. Open **Admin** (`/sindhu-admin.html`)
2. Edit your details
3. Tap **Save** — updates your portfolio immediately
4. Tap **Preview** — opens your portfolio page

## Local development

```bash
npm install
npm start
```

Open http://localhost:3000/sindhu-admin.html

## Deploy on Render (free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New +** → **Blueprint**
3. Connect the `Sindhu-9999-hash/portfolio` repo
4. Render reads `render.yaml` and deploys automatically
5. Share the Render URL with Sindhu for admin + portfolio

## Project structure

```
sindhu.html          ← Portfolio page (loads from data/resume.json)
sindhu-website.html  ← Public website (static)
sindhu-admin.html    ← Edit page (Save + Preview)
data/resume.json     ← All portfolio content
server.js            ← Serves site + save API
```
