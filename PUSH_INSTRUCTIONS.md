# Push to GitHub — one command

The local git repo is **already initialized, committed, and remote-configured**:

- Branch: `main`
- Initial commit: `6eba5a6`
- Remote: `https://github.com/rajat07august/Portfolio-Stocks.git`
- 13 files tracked (dashboard, 4 reports, 4 build scripts, README, .gitignore, this file)

You just need to push from your machine — the Cowork sandbox can't reach github.com.

## Run this in your terminal

```bash
cd "<path-to>/equity-watchlist-repo"
git push -u origin main
```

That's it.

## If `git push` asks for credentials

GitHub stopped accepting password auth in 2021. You need either:

**(a) HTTPS with a Personal Access Token (PAT)**
1. Go to https://github.com/settings/tokens → **Generate new token (classic)** → check `repo` scope → generate.
2. Copy the token (starts with `ghp_…`).
3. When `git push` prompts:
   - Username: `rajat07august`
   - Password: *paste the token*
4. Optional: cache it for future pushes via `git config --global credential.helper store` (Linux/Mac) or `manager` (Windows).

**(b) SSH (cleaner if you'll push often)**
1. Generate a key: `ssh-keygen -t ed25519 -C "rajat07august@gmail.com"`
2. Copy public key to GitHub: https://github.com/settings/keys → New SSH key → paste `~/.ssh/id_ed25519.pub`.
3. Switch the remote to SSH:
   ```bash
   git remote set-url origin git@github.com:rajat07august/Portfolio-Stocks.git
   ```
4. Push: `git push -u origin main`

**(c) GitHub CLI (easiest if you have it)**
```bash
gh auth login          # one-time login
git push -u origin main
```

## If the remote repo isn't empty

`git push` will reject the first time if the GitHub repo already has commits (e.g. an auto-generated README). Two options:

```bash
# Option 1: Force push (will overwrite GitHub's history — only if you don't care about what's there)
git push -u origin main --force

# Option 2: Pull-rebase first (safer)
git pull origin main --rebase --allow-unrelated-histories
git push -u origin main
```

## After pushing

- Make sure repo visibility is **Private** in GitHub Settings (it contains your watchlist + thesis views).
- (Optional) Enable GitHub Pages on a private repo if you have Pro plan → Settings → Pages → Branch `main`, folder `/dashboard`. Or use Netlify/Vercel for password-protected hosting.
- For the bi-weekly Cowork refresh: after each refresh, run from the same folder:
  ```bash
  git add dashboard/index.html
  git commit -m "Dashboard refresh $(date +%d-%b-%Y)"
  git push
  ```
  (Or ask Claude to write a tiny shell wrapper that does this automatically.)
