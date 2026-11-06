# ytDownloader Marketing Website

Official marketing website for ytDownloader - a powerful Windows desktop application for downloading YouTube videos.

🌐 **Live Site:** [youtubedownloader.danielpro.dev](https://youtubedownloader.danielpro.dev)

## Overview

ytDownloader is a Tauri + React desktop application powered by yt-dlp and FFmpeg, designed to make downloading YouTube videos simple, fast, and elegant.

## Features

- 🎯 **Automatic URL Detection** - Clipboard monitoring for instant URL capture
- 📋 **Multi-URL Support** - Paste multiple URLs with Shift+Enter
- 🕐 **History & Notifications** - Track downloads and get completion alerts
- 🌓 **Light & Dark Mode** - Beautiful interface that adapts to your preference
- 🎬 **Quality Selection** - Choose video quality (720p, 1080p, 4K)
- ⚡ **Auto Updates** - Integrated yt-dlp and FFmpeg updates
- 🆕 **v1.1.0** - Other public sites (Vimeo, TikTok, X, Instagram, Facebook), MP3/M4A, subtitles, chapters, SponsorBlock, global shortcuts, FFmpeg tools and in-app updates

## Website Stack

- **Pure HTML/CSS/JS** - No build process required
- **WebP Images** - Optimized screenshots for fast loading
- **SVG Logo** - Scalable vector graphics for crisp display
- **Responsive Design** - Mobile-friendly layout
- **Smooth Animations** - Scroll reveals, parallax, and micro-interactions

## Structure

```
youtubedownloader-site/
├── index.html          # Main landing page
├── css/
│   └── style.css      # Styles with animations
├── version.json       # Releases list read by the download buttons
├── updates/
│   └── latest.json    # Live Tauri updater manifest (separate release step)
├── js/
│   ├── i18n.js        # PT/EN texts
│   ├── script.js      # Interactive features
│   └── version.js     # Reads version.json
├── assets/
│   └── logo.svg       # Brand logo
├── shots/
│   ├── dark-mode-downloads.webp
│   ├── light-mode-empty.webp
│   └── settings-modal.webp
└── download/
    └── README.md      # Download instructions
```

## Deployment

This site is designed to be served from an nginx document root:

```nginx
server {
    listen 443 ssl http2;
    server_name youtubedownloader.danielpro.dev;
    
    root /var/www/youtubedownloader;
    index index.html;
    
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
    
    # Redirect old legal page URL to new directory
    location = /uso-responsavel.html {
        return 301 /uso-responsavel/;
    }
    
    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|webp|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Note:** The `try_files $uri $uri/ $uri.html =404;` directive enables directory-based routing, allowing `/uso-responsavel/` to serve `/uso-responsavel/index.html` automatically.

## Versions and releases

The download buttons read **`/version.json`**. Releases are listed newest first. The buttons
point at the newest release with `"available": true`. The "All versions" list in the download
section shows every release, so older installers stay downloadable.

Without JavaScript, or if `version.json` can't be read, the HTML still links to v1.1.0 and lists all three releases.

### v1.2.0 site update / publishing

The site advertises the confirmed 1.2.0 improvements in PT and EN: Downloads spacing,
multi-site history PDF, clear-all links, card glow, Recent Jobs, Media Info TXT export,
and watched playlists. The conditional PR #5 deep link is omitted until its inclusion
in the app release is confirmed.

`version.json` declares `/download/ytDownloader_1.2.0_x64-setup.exe` as the newest
release with `available: false` and an empty size placeholder. The site shows
**1.2.0 coming soon**, while primary buttons, their version labels and sizes resolve
to **1.1.0**. Both 1.1.0 and 1.0.0 remain listed and downloadable. No installer is
built or uploaded by this site change.

1. Daniel builds the signed `ytDownloader_1.2.0_x64-setup.exe` on Windows.
2. Upload and verify it in Contabo `/var/www/youtubedownloader/download/`.
   Keep the 1.1.0 and 1.0.0 installers there.
3. Fill the actual release date/size in `version.json`, then set `available: true`
   for 1.2.0. The primary buttons, version labels, size and status badges switch
   automatically to 1.2.0.
4. After the signed installer exists, Grok Bot/Daniel may separately publish the
   update channel via `updates/latest.json`. This site PR leaves that live updater
   manifest and the updater public key unchanged.
5. After review/merge, Daniel syncs the site to Contabo. **There is no auto-deploy:
   merge does not make the site live. Codex does not deploy.**

Falta: upload exe + set `available: true` + optional `latest.json` publication by
Grok Bot/Daniel + manual Contabo sync.

Verify locally over HTTP in PT and EN: hero and What's new show 1.2.0, primary
buttons resolve to 1.1.0, all versions list 1.2.0 as coming soon and offer 1.1.0 /
1.0.0 downloads. Check mobile/desktop, footer danielpro.dev, and Apoiar (QR-only
M-Pesa, Lemon Squeezy hidden). Installer files live on Contabo and are not in this
repository, so a local server cannot serve the actual downloads.

### nginx: don't cache the release files

Add these blocks so a new `version.json` or `latest.json` is picked up at once:

```nginx
location = /version.json { add_header Cache-Control "no-cache"; }
location ^~ /updates/    { add_header Cache-Control "no-cache"; }
```

JS and CSS are cached for 1 year (`immutable`), so bump the `?v=` query in `index.html`
whenever `js/*.js` or `css/style.css` changes.

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Brand Colors

- **Primary Red:** `#DA4453`
- **Primary Red Light:** `#ff5a6e`
- **Primary Red Dark:** `#bf3a48`
- **Background:** `#0a0a0a`
- **Surface:** `#141414`
- **Text:** `#ffffff`

## Screenshots

All screenshots are converted to WebP format for optimal performance. Original PNGs are not committed to avoid bloating the repository.

## Legal

**Important:** This application is for personal use only. Users must only download content they are authorized to save and use. Always respect copyright and terms of service.

## License

Marketing website content © 2026. Application powered by open-source technologies:
- [Tauri](https://tauri.app) - MIT License
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Unlicense
- [FFmpeg](https://ffmpeg.org) - LGPL/GPL

---

Built with ❤️ in Mozambique by [Daniel Marcos](https://danielpro.dev)
