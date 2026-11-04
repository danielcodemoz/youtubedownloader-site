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
- Codex does **not** deploy. Deploys are done separately after review.
- Small, focused PRs with a clear description; include screenshots for UI changes.
- Handoff: keep your branch pushed often, and keep a section "## Estado / Próximos passos" in the PR description up to date (what is done, what is left, how to test). Another agent (Codex or Grok Bot) may continue the same branch mid-way. Never deploy; deploys wait for Daniel's bot.
