/**
 * Reads /version.json and points every download button at the newest
 * installer that is really on the server. Without JS (or if the file is
 * missing) the HTML keeps working with the v1.2.0 links already in it.
 */
(function () {
    'use strict';

    function renderChecksums(releases) {
        var list = document.getElementById('installer-checksums');
        if (!list) return;
        var rows = releases.filter(function (release) {
            return release.available && typeof release.file === 'string';
        }).map(function (release) {
            var filename = release.file.split('/').pop();
            if (!/^[a-zA-Z0-9_.-]+\.exe$/i.test(filename)) return null;
            var row = document.createElement('li');
            var label = document.createElement('strong');
            label.textContent = filename;
            row.appendChild(label);
            if (/^[a-f0-9]{64}$/i.test(release.sha256 || '')) {
                var hash = document.createElement('code');
                hash.textContent = release.sha256;
                var command = document.createElement('code');
                command.textContent = "Get-FileHash -LiteralPath '.\\" + filename + "' -Algorithm SHA256";
                row.appendChild(hash);
                row.appendChild(command);
            } else {
                var unavailable = document.createElement('span');
                unavailable.setAttribute('data-i18n', 'safety.unavailable');
                unavailable.textContent = window.i18n ? window.i18n.t('safety.unavailable') : 'SHA-256 não publicado para esta versão.';
                row.appendChild(unavailable);
            }
            return row;
        }).filter(Boolean);
        if (rows.length) list.replaceChildren.apply(list, rows);
    }

    function initInstallerGuide() {
        var video = document.querySelector('.installer-safety-video');
        var demo = document.querySelector('.installer-safety-demo');
        if (!video || !demo) return;
        var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
        var visible = false;
        var autoAllowed = true;
        var automaticPause = false;
        video.muted = true;
        video.hidden = false;
        demo.hidden = true;

        function stopPlayback() {
            if (!video.paused) {
                automaticPause = true;
                video.pause();
            }
        }

        function updatePlayback() {
            if (!visible || document.hidden) {
                stopPlayback();
            } else if (!reducedMotion.matches && autoAllowed && !video.ended) {
                video.play().catch(function () { /* native controls remain available */ });
            }
        }

        video.addEventListener('pause', function () {
            if (!automaticPause) autoAllowed = false;
            automaticPause = false;
        });
        video.addEventListener('error', function () {
            video.hidden = true;
            demo.hidden = false;
        });
        reducedMotion.addEventListener('change', function () {
            if (reducedMotion.matches) stopPlayback();
            else updatePlayback();
        });
        document.addEventListener('visibilitychange', updatePlayback);
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .5;
                updatePlayback();
            }, { threshold: [.5] }).observe(video);
        }
        var assetBase = '/assets/installer-guide/install-guide-en-light-v5';
        video.poster = assetBase + '-poster.webp';
        video.src = assetBase + '.mp4';
        video.load();
        updatePlayback();
    }

    function render(config) {
        var releases = (config && config.releases) || [];
        if (!releases.length) return;
        renderChecksums(releases);
        var newest = releases[0];
        var current = releases.filter(function (r) { return r.available; })[0];
        if (!current) return;

        document.querySelectorAll('[data-download-link]').forEach(function (a) {
            a.setAttribute('href', current.file);
        });
        document.querySelectorAll('[data-version]').forEach(function (el) {
            el.textContent = 'v' + current.version;
        });
        document.querySelectorAll('[data-size]').forEach(function (el) {
            el.textContent = current.size;
        });

        var newestReady = newest.version === current.version;
        document.querySelectorAll('[data-release-ready]').forEach(function (el) {
            el.hidden = !newestReady;
        });
        document.querySelectorAll('[data-release-soon]').forEach(function (el) {
            el.hidden = newestReady;
        });

        var list = document.getElementById('older-versions-list');
        if (list) {
            list.innerHTML = '';
            releases.forEach(function (release) {
                var li = document.createElement('li');
                li.className = 'older-version';
                var label = document.createElement('span');
                label.className = 'older-version-name';
                label.textContent = 'v' + release.version;
                var meta = document.createElement('span');
                meta.className = 'older-version-meta';
                meta.textContent = [release.date, release.size].filter(Boolean).join(' · ');
                li.appendChild(label);
                li.appendChild(meta);
                if (release.available) {
                    var link = document.createElement('a');
                    link.href = release.file;
                    link.setAttribute('download', '');
                    link.className = 'older-version-link';
                    link.setAttribute('data-i18n', 'versions.download');
                    link.textContent = window.i18n ? window.i18n.t('versions.download') : 'Descarregar';
                    li.appendChild(link);
                } else {
                    var soon = document.createElement('span');
                    soon.className = 'older-version-soon';
                    soon.setAttribute('data-i18n', 'versions.soon');
                    soon.textContent = window.i18n ? window.i18n.t('versions.soon') : 'Em breve';
                    li.appendChild(soon);
                }
                list.appendChild(li);
            });
        }
    }

    initInstallerGuide();

    fetch('/version.json', { cache: 'no-store' })
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(render)
        .catch(function () { /* keep the static v1.2.0 links */ });
})();
