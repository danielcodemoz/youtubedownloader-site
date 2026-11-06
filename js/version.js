/**
 * Reads /version.json and points every download button at the newest
 * installer that is really on the server. Without JS (or if the file is
 * missing) the HTML keeps working with the v1.2.0 links already in it.
 */
(function () {
    'use strict';

    function render(config) {
        var releases = (config && config.releases) || [];
        if (!releases.length) return;
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

    fetch('/version.json', { cache: 'no-store' })
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(render)
        .catch(function () { /* keep the static v1.2.0 links */ });
})();
