/* @ts-nocheck */
/// <reference lib="webworker" />
/* ══════════════════════════════════════════════════════════════════════════════
   THE LIVING WATER — Service Worker (New Covenant Shell)
   "Whosoever drinketh of the water that I shall give him shall never thirst."
   — John 4:14

   Strategy:
   • APP SHELL   → Cache-first, background refresh (fast loads)
   • NAVIGATION  → Network-first, offline fallback to cached index.html
   • FONTS       → Cache-first (immutable after first fetch)
   • PUSH        → Show notification; click → focus or open app
   ══════════════════════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'flockos-new-covenant-v1.25';
const OPTIONAL_CACHE_DELAY_MS = 650;
const BIBLE_DATA_BASE_URL = 'https://raw.githubusercontent.com/edidasken/do/main/app-bible/v1/';
const SHARED_DATA_BASE_URL = 'https://raw.githubusercontent.com/edidasken/do/main/shared-data/v1/';
const OFFLINE_TIER_LABELS = {
  10: 'Critical manifests',
  20: 'Scripture core',
  30: 'Cross references',
  40: 'Study tools',
  50: 'Original languages',
  60: 'Commentary indexes',
  70: 'Commentaries',
  90: 'Source archives',
};

/* Derive base path from SW location (works at root or any subpath) */
const SW_BASE = self.location.pathname.replace(/\/[^\/]+$/, '/');
// e.g. '/FlockOS/New_Covenant/' on GitHub Pages, or '/' at Firebase root

/* ─── Complete file manifest ─────────────────────────────────────────────────
   All JS modules, CSS, data files, and images needed to run the full app
   offline. On SW install every file is fetched individually — one 404 never
   blocks the rest (we use Promise.allSettled, not cache.addAll).

   Bump CACHE_NAME whenever you add/remove a file here so clients re-cache.
   ─────────────────────────────────────────────────────────────────────────── */
const PRECACHE_URLS = [
  /* ── Entry points ─────────────────────────────────────────────────────── */
  '',
  'index.html',
  'manifest.json',

  /* ── The Flock Herald (primary app) ──────────────────────────────────── */
  'app.flocknews/flocknews.html',
  'Styles/flocknews.css',

  /* ── GROW public PWA (baked into index.html) ─────────────────────────── */
  'Scripts/grow_public.js',

  /* ── Invite standalone PWA ───────────────────────────────────────────── */
  'app.invite/app.invite.html',
  'app.invite/manifest.json',

  /* ── Bible standalone PWA shell ──────────────────────────────────────── */
  'app.bible/',
  'app.bible/index.html',
  'app.bible/app.bible.html',
  'app.bible/manifest.json',
  'app.bible/bible.css',
  'app.bible/bible.js',
  'app.bible/commentaries/catalog.json',
  'app.bible/commentaries/commentary-sources.js',

  /* ── Styles ───────────────────────────────────────────────────────────── */
  'Styles/new_covenant.css', /* american_garments merged in — one CSS file */

  /* ── Images ───────────────────────────────────────────────────────────── */
  'Images/FlockIcon.png',
  'Images/FlockIcon-512.webp',
  'Images/NewCovenant.png',
  'Images/icon-herald.svg',
  'Images/icon-pwa.svg',
  'Images/icon-flockos.svg',
  'Images/icon-grow.svg',
  'Images/icon-invite.svg',
  'Images/icon-chat.svg',
  'Images/icon-flockdocs.svg',
  'Images/icon-flockshamar.svg',
  'Images/icon-feed.svg',
  'Images/icon-wellspring.svg',
  'Images/icon-melchizedek.svg',
  'Images/icon-show.svg',
  'Images/icon-stand.svg',

  /* ── Boot scripts ─────────────────────────────────────────────────────── */
  'Scripts/the_ark.js',
  'Scripts/the_adornment.js',
  'Scripts/the_lampstand.js',
  'Scripts/the_oil.js',
  'Scripts/the_watchmen.js',
  'Scripts/the_living_water_register.js',
  'Scripts/fine_linen.js',
  'Scripts/firm_foundation.js',
  'Scripts/the_app_switcher.js',
  'Scripts/the_unity_header.js',
  'Scripts/the_unity_profile.js',
  'Scripts/the_unity_search.js',
  'Scripts/the_unity_session.js',

  /* ── Chrome / shell ───────────────────────────────────────────────────── */
  'Scripts/the_veil/index.js',
  'Scripts/the_veil/the_crown.js',
  'Scripts/the_veil/the_pillars.js',
  'Scripts/the_veil/the_hem.js',
  'Scripts/the_veil/the_courtyard.js',
  'Scripts/the_veil/the_refresh.js',

  /* ── Router ───────────────────────────────────────────────────────────── */
  'Scripts/the_scribes/index.js',
  'Scripts/the_scribes/the_chronicle.js',
  'Scripts/the_scribes/the_herald.js',
  'Scripts/the_scribes/the_path.js',

  /* ── Auth ─────────────────────────────────────────────────────────────── */
  'Scripts/the_priesthood/index.js',
  'Scripts/the_priesthood/the_anointing.js',
  'Scripts/the_priesthood/the_breastplate.js',
  'Scripts/the_priesthood/the_garments.js',

  /* ── Data / cache layer ───────────────────────────────────────────────── */
  'Scripts/the_manna.js',
  'Scripts/the_cistern.js',
  'Scripts/the_wellspring.js',
  'Scripts/the_wellspring/index.js',

  /* ── API layer ────────────────────────────────────────────────────────── */
  'Scripts/the_true_vine.js',
  'Scripts/the_window_bridge.js',
  'Scripts/the_living_water_adapter.js',

  /* ── Backend modules (Upper Room / Firestore) ─────────────────────────── */
  'Scripts/the_upper_room/index.js',
  'Scripts/the_upper_room/the_attachments.js',
  'Scripts/the_upper_room/the_channels.js',
  'Scripts/the_upper_room/the_dms.js',
  'Scripts/the_upper_room/the_emoji.js',
  'Scripts/the_upper_room/the_firebase_config.js',
  'Scripts/the_upper_room/the_identity.js',
  'Scripts/the_upper_room/the_mentions.js',
  'Scripts/the_upper_room/the_messages.js',
  'Scripts/the_upper_room/the_presence.js',
  'Scripts/the_upper_room/the_push.js',
  'Scripts/the_upper_room/the_seeding.js',
  'Scripts/the_upper_room/the_tenant.js',
  'Scripts/the_upper_room/the_typing.js',
  'Scripts/the_upper_room/the_unread.js',

  /* ── Domain modules ───────────────────────────────────────────────────── */
  'Scripts/the_life/index.js',
  'Scripts/the_harvest/index.js',
  'Scripts/the_seasons/index.js',
  'Scripts/the_truth/index.js',
  'Scripts/the_way/index.js',
  'Scripts/the_well/index.js',
  'Scripts/the_fold/index.js',
  'Scripts/the_shepherd/index.js',
  'Scripts/the_scrolls/index.js',
  'Scripts/the_scrolls/the_bible_link.js',
  'Scripts/the_shofar/index.js',
  'Scripts/the_trumpet/index.js',
  'Scripts/the_tabernacle/index.js',

  /* ── Domain flat-export shims (coexist alongside /index.js) ───────────── */
  'Scripts/the_life.js',
  'Scripts/the_harvest.js',
  'Scripts/the_seasons.js',
  'Scripts/the_truth.js',
  'Scripts/the_way.js',
  'Scripts/the_well.js',
  'Scripts/the_fold.js',
  'Scripts/the_shepherd.js',
  'Scripts/the_scrolls.js',
  'Scripts/the_upper_room.js',
  'Scripts/the_stones.js',
  'Scripts/the_tabernacle.js',

  /* ── Shared utilities ─────────────────────────────────────────────────── */
  'Scripts/the_comms.js',
  'Scripts/the_legacy_bridge.js',
  'Scripts/the_witness.js',

  /* ── Gospel sub-modules ───────────────────────────────────────────────── */
  'Scripts/the_gospel/the_gospel_shared.js',
  'Scripts/the_gospel/the_gospel_analytics.js',
  'Scripts/the_gospel/the_gospel_apologetics.js',
  'Scripts/the_gospel/the_gospel_certificates.js',
  'Scripts/the_gospel/the_gospel_counseling.js',
  'Scripts/the_gospel/the_gospel_courses.js',
  'Scripts/the_gospel/the_gospel_devotionals.js',
  'Scripts/the_gospel/the_gospel_genealogy.js',
  'Scripts/the_gospel/the_gospel_heart.js',
  'Scripts/the_gospel/the_gospel_invitation.js',
  'Scripts/the_gospel/the_gospel_journal.js',
  'Scripts/the_gospel/the_gospel_lexicon.js',
  'Scripts/the_gospel/the_gospel_library.js',
  'Scripts/the_gospel/the_gospel_mirror.js',
  'Scripts/the_gospel/the_gospel_missions.js',
  'Scripts/the_gospel/the_gospel_quizzes.js',
  'Scripts/the_gospel/the_gospel_reading.js',
  'Scripts/the_gospel/the_gospel_teaching_plans.js',
  'Scripts/the_gospel/the_gospel_theology.js',
  'Scripts/the_gospel/the_gospel_why.js',

  /* ── UI vessels ───────────────────────────────────────────────────────── */
  'Scripts/vessels/the_basin.js',
  'Scripts/vessels/the_censer.js',
  'Scripts/vessels/the_chalice.js',
  'Scripts/vessels/the_cup.js',
  'Scripts/vessels/the_mantle.js',
  'Scripts/vessels/the_menorah.js',
  'Scripts/vessels/the_rod.js',
  'Scripts/vessels/the_seal.js',
  'Scripts/vessels/the_signet.js',
  'Scripts/vessels/the_staff.js',

  /* ── Views — shared frame ─────────────────────────────────────────────── */
  'Views/_frame.js',

  /* ── Views — individual ───────────────────────────────────────────────── */
  'Views/about_flockos/index.js',
  'Views/bezalel/index.js',
  'Views/content-admin/index.js',
  'Views/fishing_for_data/index.js',
  'Views/fishing_for_men/index.js',
  'Views/learn_more/index.js',
  'Views/prayerful_action/index.js',
  'Views/quarterly_worship/index.js',
  'Views/software_deployment_referral/index.js',
  'Views/the_anatomy_of_worship/index.js',
  'Views/the_announcements/index.js',
  'Views/the_call_to_forgive/index.js',
  'Views/the_fellowship/index.js',
  'Views/the_fellowship/the_channel_list.js',
  'Views/the_fellowship/the_composer.js',
  'Views/the_fellowship/the_dm_drawer.js',
  'Views/the_fellowship/the_flockchat_pane.js',
  'Views/the_fellowship/the_interactions_pane.js',
  'Views/the_fellowship/the_member_pane.js',
  'Views/the_fellowship/the_message.js',
  'Views/the_fellowship/the_thread.js',
  'Views/the_fold/index.js',
  'Views/the_generations/index.js',
  'Views/the_gift_drift/index.js',
  'Views/the_good_shepherd/index.js',
  'Views/the_good_shepherd/the_birthdays.js',
  'Views/the_good_shepherd/the_call.js',
  'Views/the_good_shepherd/the_count.js',
  'Views/the_good_shepherd/the_flock_feed.js',
  'Views/the_good_shepherd/the_next_steps.js',
  'Views/the_good_shepherd/the_pasture.js',
  'Views/the_good_shepherd/the_prayer_hours.js',
  'Views/the_good_shepherd/the_today_events.js',
  'Views/the_good_shepherd/the_todos.js',
  'Views/the_good_shepherd/the_word.js',
  'Views/the_gospel_analytics/index.js',
  'Views/the_gospel_apologetics/index.js',
  'Views/the_gospel_certificates/index.js',
  'Views/the_gospel_counseling/index.js',
  'Views/the_gospel_courses/index.js',
  'Views/the_gospel_devotionals/index.js',
  'Views/the_gospel_genealogy/index.js',
  'Views/the_gospel_heart/index.js',
  'Views/the_gospel_invitation/index.js',
  'Views/the_gospel_journal/index.js',
  'Views/the_gospel_lexicon/index.js',
  'Views/the_gospel_library/index.js',
  'Views/the_gospel_mirror/index.js',
  'Views/the_gospel_quizzes/index.js',
  'Views/the_gospel_reading/index.js',
  'Views/the_gospel_teaching_plans/index.js',
  'Views/the_gospel_theology/index.js',
  'Views/the_great_commission/index.js',
  'Views/the_great_commission/bal_data.js',
  'Views/the_great_commission/ow_data.js',
  'Views/the_growth/index.js',
  'Views/the_harvest/index.js',
  'Views/the_invitation/index.js',
  'Views/the_life/index.js',
  'Views/the_pentecost/index.js',
  'Views/the_prayer_chain/index.js',
  'Views/the_seasons/index.js',
  'Views/the_truth/index.js',
  'Views/the_upper_room/index.js',
  'Views/the_upper_room/the_devotional.js',
  'Views/the_upper_room/the_journal.js',
  'Views/the_upper_room/the_reading.js',
  'Views/the_wall/index.js',
  'Views/the_way/index.js',
  'Views/the_weavers_plan/index.js',

  /* ── Offline data files (app content — no network needed) ─────────────── */
  'Data/apologetics.js',
  'Data/books-of-the-bible.js',
  'Data/counseling.js',
  'Data/devotionals.js',
  'Data/heart.js',
  'Data/library.js',
  'Data/mirror.js',
  'Data/missions.js',
  'Data/one_year_bible.js',
  'Data/psalms.js',
  'Data/quiz.js',
  'Data/reading-plans.js',
  'Data/strongs-greek.js',
  'Data/strongs-hebrew.js',
  'Data/teaching_plans.js',
  'Data/theology.js',
].map((p) => SW_BASE + p);

/* ─── Install: cache the complete app ───────────────────────────────────────── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Use individual puts instead of addAll so one missing file never
      // aborts the install. Log failures but keep going.
      const results = await Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          fetch(url, { cache: 'no-store' }).then((res) => {
            if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + url);
            return cache.put(url, res);
          })
        )
      );
      const failed = results.filter((r) => r.status === 'rejected');
      if (failed.length) {
        console.warn('[SW] ' + failed.length + ' file(s) failed to precache:',
          failed.map((r) => r.reason && r.reason.message).join(', '));
      }
      try {
        await _warmGenealogyOffline(cache);
      } catch (err) {
        console.warn('[SW] genealogy shared-data warmup failed:', err);
      }
    })
  );
  /* Do NOT call self.skipWaiting() here — let the launcher detect the
     waiting SW and show the "Update Available" banner. The user then
     explicitly triggers the update, which sends SKIP_WAITING. */
});

/* ─── Activate: purge old caches ────────────────────────────────────────────── */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* ─── Listen for messages from the page ────────────────────────────────────── */
self.addEventListener('message', (event) => {
  if (!event.data) return;

  /* Standard update-on-demand signal sent by the_living_water_register.js */
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  /* Developer force-refresh: wipe all caches so next install re-fetches everything.
     Triggered by FlockSW.forceRefresh() in the browser console, or ?flock_refresh=1 */
  if (event.data.type === 'FORCE_REFRESH') {
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .then(() => self.skipWaiting())
    );
  }

  if (event.data.type === 'WARM_APP_BIBLE_OFFLINE') {
    event.waitUntil(_warmAppBibleOffline(event.source, event.data.limit));
  }
});

/* ─── Fetch: routing strategies ─────────────────────────────────────────────── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* Skip non-GET and cross-origin API calls (Firebase, GAS) */
  if (request.method !== 'GET') return;
  if (!url.origin.includes(self.location.hostname) &&
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com')) return;

  /* Google Fonts — cache-first (essentially immutable) */
  if (url.hostname.includes('fonts.gstatic.com') ||
      url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(_cacheFirst(request));
    return;
  }

  /* Navigation requests (HTML pages) — network-first with offline fallback */
  if (request.mode === 'navigate') {
    event.respondWith(_networkFirstNav(request));
    return;
  }

  /* View modules — network-first so deploys are visible immediately.
     Falls back to cache when offline. */
  if (url.pathname.includes('/Views/') && /\.js$/.test(url.pathname)) {
    event.respondWith(_networkFirst(request));
    return;
  }

  /* Static assets (JS, CSS, SVG, images) — stale-while-revalidate */
  if (/\.(js|css|json|svg|png|jpg|webp|woff2?)$/.test(url.pathname)) {
    event.respondWith(_staleWhileRevalidate(request));
    return;
  }
});

/* ─── Push notifications ────────────────────────────────────────────────────── */
self.addEventListener('push', (event) => {
  let data = { title: 'FlockOS', body: 'You have a new notification.' };
  try { data = { ...data, ...event.data.json() }; } catch (_) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    '/Images/FlockIcon-512.webp',
      badge:   '/Images/FlockIcon-512.webp',
      data:    data,
      vibrate: [150, 60, 150],
      tag:     data.tag || 'flockos',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(self.location.origin));
      if (existing) return existing.focus().then((c) => c.navigate(target));
      return self.clients.openWindow(target);
    })
  );
});

/* ─── Helpers ───────────────────────────────────────────────────────────────── */

async function _networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    if (fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (_) {
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

let _bibleWarmPromise = null;

async function _warmGenealogyOffline(cache) {
  const manifestUrl = new URL('genealogy/manifest.json', SHARED_DATA_BASE_URL).href;
  const response = await fetch(manifestUrl, { cache: 'no-store' });
  if (!response.ok) throw new Error('Genealogy manifest failed: HTTP ' + response.status);
  await cache.put(manifestUrl, response.clone());
  const manifest = await response.json();
  const chunks = Array.isArray(manifest.chunks) ? manifest.chunks : [];
  await Promise.all(chunks.map(async (chunk) => {
    if (!chunk || !chunk.file) return;
    const url = new URL('genealogy/' + chunk.file.replace(/^\/+/, ''), SHARED_DATA_BASE_URL).href;
    try {
      const fresh = await fetch(url, { cache: 'no-store' });
      if (fresh.ok) await cache.put(url, fresh);
    } catch (_) {}
  }));
}

async function _warmAppBibleOffline(client, limit = Infinity) {
  if (_bibleWarmPromise) return _bibleWarmPromise;
  _bibleWarmPromise = (async () => {
    const cache = await caches.open(CACHE_NAME);
    const manifestUrl = new URL('offline-assets.json', BIBLE_DATA_BASE_URL).href;
    const response = await fetch(manifestUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Bible offline manifest failed: HTTP ' + response.status);
    await cache.put(manifestUrl, response.clone());
    const manifest = await response.json();
    const assets = _prioritizeOfflineAssets(Array.isArray(manifest.assets) ? manifest.assets : []);
    const maxAssets = Number.isFinite(Number(limit)) ? Math.max(0, Number(limit)) : Infinity;
    const totalAssets = Number.isFinite(maxAssets) ? Math.min(maxAssets, assets.length) : assets.length;
    let cached = 0;
    let checked = 0;
    for (const asset of assets) {
      if (checked >= maxAssets) break;
      checked += 1;
      if (!asset.path) continue;
      const url = new URL(asset.path.replace(/^\/+/, ''), BIBLE_DATA_BASE_URL).href;
      const request = new Request(url, { cache: 'no-store' });
      if (await cache.match(url)) {
        cached += 1;
        if (client && cached > 0 && cached % 50 === 0) {
          client.postMessage(_offlineProgressMessage(cached, totalAssets, asset));
        }
        continue;
      }
      try {
        const fresh = await fetch(request);
        if (fresh.ok) {
          await cache.put(url, fresh);
          cached += 1;
        }
      } catch (_) {}
      if (client && cached > 0 && cached % 50 === 0) {
        client.postMessage(_offlineProgressMessage(cached, totalAssets, asset));
      }
      await _delay(OPTIONAL_CACHE_DELAY_MS);
    }
    if (client) client.postMessage({ type: 'BIBLE_OFFLINE_COMPLETE', cached, total: totalAssets });
  })().finally(() => {
    _bibleWarmPromise = null;
  });
  return _bibleWarmPromise;
}

function _prioritizeOfflineAssets(assets) {
  return assets.map((asset, index) => _normalizeOfflineAsset(asset, index)).filter((asset) => asset.path).sort((a, b) => (
    a.priority - b.priority
    || a.order - b.order
    || String(a.path).localeCompare(String(b.path))
  )).map(({ order, ...asset }) => asset);
}

function _normalizeOfflineAsset(asset, index) {
  const normalized = typeof asset === 'string' ? { path: asset } : { ...asset };
  normalized.priority = Number.isFinite(Number(normalized.priority))
    ? Number(normalized.priority)
    : _inferOfflinePriority(normalized.path);
  normalized.order = Number.isFinite(Number(normalized.order)) ? Number(normalized.order) : index;
  normalized.tier = normalized.tier || OFFLINE_TIER_LABELS[normalized.priority] || 'Supporting data';
  normalized.group = normalized.group || _inferOfflineGroup(normalized.path);
  return normalized;
}

function _inferOfflinePriority(path) {
  if (!path) return 999;
  if (path.endsWith('/manifest.json') || path.endsWith('/_manifest.json') || path.endsWith('/info.json')) return 10;
  if (path.startsWith('esv/books/') || path.startsWith('mdbible/')) return 20;
  if (path.startsWith('cross-references/')) return 30;
  if (path.startsWith('tsk/books/') || path.startsWith('original-languages/openscriptures-strongs/')) return 40;
  if (path.startsWith('original-languages/')) return 50;
  if (path.startsWith('commentaries/') && !path.startsWith('commentaries/chunks/')) return 60;
  if (path.startsWith('commentaries/chunks/')) return 70;
  if (path.includes('.parts/')) return 90;
  return 80;
}

function _inferOfflineGroup(path) {
  if (!path) return 'unknown';
  if (path.startsWith('commentaries/chunks/')) return 'commentary';
  if (path.startsWith('original-languages/')) return 'original-language';
  return path.split('/')[0] || 'dataset';
}

function _offlineProgressMessage(cached, total, asset) {
  return {
    type: 'BIBLE_OFFLINE_PROGRESS',
    cached,
    total,
    priority: asset.priority,
    tier: asset.tier,
    group: asset.group,
    path: asset.path,
  };
}

function _delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function _cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const fresh = await fetch(request);
  if (fresh.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, fresh.clone());
  }
  return fresh;
}

async function _staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((fresh) => {
    if (fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  }).catch(() => null);
  return cached || (await fetchPromise) || new Response('Offline', { status: 503 });
}

async function _networkFirstNav(request) {
  try {
    const fresh = await fetch(request);
    if (fresh.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (_) {
    const cached = await caches.match(request) ||
                   await caches.match(SW_BASE + 'index.html') ||
                   await caches.match(SW_BASE);
    if (cached) return cached;
    return new Response(
      '<!DOCTYPE html><html><body style="font-family:sans-serif;padding:2rem">' +
      '<h2>You\'re offline.</h2><p>FlockOS will be available when you reconnect.</p>' +
      '</body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}
