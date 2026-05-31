# Sindhuri Alugolu — Portfolio

A modern portfolio website for **Sindhuri Alugolu**, Soft Skills Trainer & Communication Specialist (Visakhapatnam, India). Built with **Next.js**, **React**, and **TypeScript**, deployed on **GitHub Pages**.

## Live site

| Route | Purpose |
|---|---|
| `/` | Public portfolio homepage |
| `/resume` | Full CV / resume + print-to-PDF |
| `/admin` | Simple content editor |

**Production URL:** [https://sindhuri-alugolu.github.io](https://sindhuri-alugolu.github.io)

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin saves write to `data/resume.json` locally (no GitHub token needed in dev).

## GitHub Pages setup (one-time)

### 1. Enable GitHub Pages

In your repo on GitHub:

1. **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**

### 2. Add repository secrets

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Description |
|---|---|
| `ADMIN_GITHUB_TOKEN` | [Personal access token](https://github.com/settings/tokens) with **Contents: Read and write** for this repo |

Add any other secrets listed in `.env.example`.

The token lets the admin **Save** button commit updated content to GitHub. The site redeploys automatically within a few minutes.

### 3. Push to `main`

Every push to `main` runs `.github/workflows/deploy-pages.yml` and publishes the site.

```bash
git push origin main
```

## How admin Save works on GitHub Pages

1. Sindhu opens `/admin` and signs in
2. She edits content and clicks **Save**
3. The site commits `data/resume.json` and `public/data/resume.json` to GitHub
4. GitHub Actions rebuilds and redeploys the site (~2 minutes)

**Preview** saves first, then opens the homepage in a new tab.

## Build commands

| Command | Use |
|---|---|
| `npm run dev` | Local development with file-based save |
| `npm run build` | Standard Next.js build (local / optional hosting) |
| `npm run build:pages` | Static export for GitHub Pages (same as CI) |

## Replacing photos

Replace placeholder SVGs in `public/images/` with real photos:

- `sindhu.png` — profile photo
- `workshop-personality-development.png`
- `workshop-domestic-violence.png`
- `workshop-crpf-batch.png`

Update paths in admin if you change filenames.

## Download resume as PDF

On `/resume`, click **Download PDF** → choose “Save as PDF” in the print dialog.

## Contact

- Phone: +91 9390828532
- Email: sindhudimple.08@gmail.com
- Location: Visakhapatnam, Andhra Pradesh
