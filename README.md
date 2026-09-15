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
├── js/
│   └── script.js      # Interactive features
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

## Adding the Installer

Place the Windows installer in the `download/` folder:

```bash
cp ytDownloader_1.0.0_x64-setup.exe download/
```

The download button on the site links to `/download/ytDownloader_1.0.0_x64-setup.exe`.

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

Built with ❤️ in Portugal by [danielcodemoz](https://github.com/danielcodemoz)
