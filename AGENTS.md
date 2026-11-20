# AGENTS.md — youtubedownloader-site

<!-- codex-setup -->
## Codex environment
- **Stack:** Static HTML/CSS/JS site
- **Setup:** `echo 'static site, no install'`
- **Check/test/build:** No build; open index.html. Check responsiveness.
- **Env vars:** none (dummy values only in Codex)
- **Notes:** updates/latest.json is the live updater manifest: do not edit unless asked. Professional dark style, subtle gradients.

## Daniel's rules for Codex / AI agents
- Work on a branch and open a PR. Never push to `main`.
- Never commit `.env`, secrets, signing keys (`*.key`), or `uploads/` / `public/uploads`.
- Never copy GPL code (e.g. OmniGet) — ideas only.
- Keep UI text PT/EN as already done in the repo; keep the existing visual style.
- Every site footer references **danielpro.dev**.
- Support modals: Lemon Squeezy stays hidden until activated; M-Pesa only as a QR code.
- Changes still go through a PR from a branch; merging to `main` is Daniel's approval (unless an auto-merge rule applies to this repo).
- Small, focused PRs with a clear description; include screenshots for UI changes.
- Handoff: keep your branch pushed often, and keep a section "## Estado / Próximos passos" in the PR description up to date (what is done, what is left, how to test). Another agent (Codex or Grok Bot) may continue the same branch mid-way.

## Publishing (https://youtubedownloader.danielpro.dev)
- This is a registered static site on the server (name `youtubedownloader`, published from the repo root).
- **Auto-publish:** every merge to `main` goes live within ~2 minutes via the server's `dots-static-sync` timer (a backup is taken first). No manual deploy needed.
- **Manual (Dots only):** publish now or a specific commit that is already on `main`: `ssh contabo-codex "sudo -n dots-deploy youtubedownloader [commit]"`; undo the last publish: `ssh contabo-codex "sudo -n dots-rollback youtubedownloader"`. Never copy files into `/var/www` yourself.
- `download/` on the server is preserved: deploys never delete it. Large binaries stay out of git (link GitHub Release assets instead).
- Never published: `*.md`, `.git*`, `*.php`, `.env`, `*secret*`, `uploads/`.
