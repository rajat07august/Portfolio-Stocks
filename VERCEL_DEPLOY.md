# Deploy the Dashboard on Vercel

The repo includes a `vercel.json` configured to **serve only the `dashboard/` folder** — your Word reports, build scripts, and instruction files stay private (in GitHub) and are never exposed on the public URL. Search engines are also blocked (`X-Robots-Tag: noindex, nofollow`).

The live URL will be the dashboard at:
- `https://<project-name>.vercel.app/` → renders `dashboard/index.html`

Three ways to deploy. **Path A (GitHub integration)** is recommended — once set up, every `git push` auto-deploys.

---

## Path A — Connect GitHub repo (recommended, 2 minutes)

**Prerequisite:** repo pushed to https://github.com/rajat07august/Portfolio-Stocks (see [`PUSH_INSTRUCTIONS.md`](PUSH_INSTRUCTIONS.md)).

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"** → log in with GitHub if prompted → authorize Vercel to access `Portfolio-Stocks`.
3. Click **Import** next to the repo.
4. On the configuration screen:
   - **Project Name:** `portfolio-stocks` (or whatever you prefer — this becomes the URL slug)
   - **Framework Preset:** *Other*
   - **Root Directory:** *(leave as repo root — `vercel.json` handles routing)*
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (vercel.json sets it to `dashboard`)
5. Click **Deploy**.

After ~30 seconds you'll get a URL like `https://portfolio-stocks-<hash>.vercel.app`. Click it — your dashboard is live.

**That's it.** From now on, every `git push` updates the deployed dashboard automatically.

---

## Path B — Vercel CLI (no GitHub needed)

If you want to deploy directly without GitHub:

```bash
# 1. Install (one-time)
npm install -g vercel

# 2. From the repo folder
cd "<path-to>/equity-watchlist-repo"

# 3. Deploy
vercel

# Vercel will ask:
#   Set up and deploy? → Y
#   Which scope? → (your account)
#   Link to existing project? → N
#   Project name? → portfolio-stocks
#   In which directory is your code? → ./
#   Want to modify these settings? → N

# 4. Promote to production
vercel --prod
```

You get a production URL on the second command.

---

## Path C — Drag and drop (no CLI, no GitHub)

1. Zip the `dashboard/` folder: `zip -r dashboard.zip dashboard/`.
2. Go to https://vercel.com/new and drag the zip onto the page (or click "deploy a static site").
3. Project name → `portfolio-stocks` → Deploy.

Limitation: you'll redeploy manually each time (no auto-sync).

---

## 🔒 Privacy — important

Vercel Hobby (free) does **not** include password protection. Your URL will be hard to guess but **technically public**. If you want auth:

**Option 1 — Vercel Pro Password Protection** ($20/month)
- Project Settings → Deployment Protection → Password Protection → enable.
- Lets you set one shared password for the deployment.

**Option 2 — Cloudflare Pages + Cloudflare Access** (free for up to 50 users)
- Deploy the same `dashboard/` folder to Cloudflare Pages (similar one-click flow).
- In Cloudflare Zero Trust → Access → add an application → restrict to your email.
- You log in with email OTP; everyone else gets blocked.
- This is the cleanest free private-hosting path.

**Option 3 — Vercel Edge Middleware basic auth** (free, slightly fiddly)
- Add a `middleware.ts` that checks `Authorization` header against a hashed env var. Requires Vercel framework runtime — would need to switch the project from static to Next.js. Ask Claude to write this if you want it.

**Option 4 — Just keep the URL secret**
- The default `https://<name>-<random-hash>.vercel.app` URL is unguessable. The `X-Robots-Tag: noindex` in `vercel.json` keeps Google/Bing from indexing it. For personal use this is often "good enough." Don't share the URL publicly.

---

## After deploying

- **Test the live dashboard** — click the URL Vercel gives you. Confirm charts render, filters work, all 39 cards show up.
- **Set custom domain (optional)** — Vercel project → Settings → Domains → add e.g. `watchlist.yourdomain.com`. Free with any domain you own.
- **For bi-weekly Cowork refreshes** — once Path A is set up, after each Cowork refresh just run:
  ```bash
  cd "<path-to>/equity-watchlist-repo"
  git add dashboard/index.html
  git commit -m "Dashboard refresh $(date +%d-%b-%Y)"
  git push
  ```
  Vercel auto-deploys within ~30 seconds.

---

## Troubleshooting

- **404 on root URL** → check that `dashboard/index.html` exists in the repo and `vercel.json` has `"outputDirectory": "dashboard"`.
- **Charts don't render** → check the browser console; the dashboard loads Chart.js from cdn.jsdelivr.net which should work on any Vercel deployment.
- **"Build failed: no framework detected"** → fine to ignore; Vercel serves it as static. If it complains, set Framework Preset to "Other" in Project Settings.
- **Reports/build-scripts visible at `/reports/...`** → check `.vercelignore` exists and contains `reports/` and `build-scripts/`. Redeploy.
