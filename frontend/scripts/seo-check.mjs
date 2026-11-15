#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-expressions */
// Usage: node scripts/seo-check.mjs https://www.dapoerdjawa.my.id
const BASE = (process.argv[2] || 'https://www.dapoerdjawa.my.id').replace(/\/$/, '');
const fails = [];
const passes = [];
const ok = (m) => passes.push(m);
const bad = (m) => fails.push(m);

async function head(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return r.status;
  } catch { return 0; }
}
async function get(url) {
  const r = await fetch(url, { redirect: 'follow' });
  return { status: r.status, text: await r.text(), headers: r.headers, url: r.url };
}

function meta(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1] : null;
}

function extractLd(html) {
  const out = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function collectAssetUrls(html) {
  const urls = new Set();
  const srcRe = /(?:src|srcset)="([^"]+)"/g;
  let m;
  while ((m = srcRe.exec(html))) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (!u) continue;
      if (u.startsWith('data:')) continue;
      if (u.startsWith('/_next/image')) continue;
      urls.add(u.startsWith('http') ? u : BASE + (u.startsWith('/') ? u : '/' + u));
    }
  }
  return [...urls];
}

(async () => {
  console.log(`SEO check: ${BASE}\n`);

  // robots.txt
  const robots = await get(`${BASE}/robots.txt`);
  robots.status === 200 ? ok('robots.txt 200') : bad(`robots.txt ${robots.status}`);
  /Sitemap:/i.test(robots.text) ? ok('robots has Sitemap line') : bad('robots missing Sitemap');

  // sitemap
  const sm = await get(`${BASE}/sitemap.xml`);
  sm.status === 200 ? ok('sitemap 200') : bad(`sitemap ${sm.status}`);
  const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  locs.length ? ok(`sitemap has ${locs.length} urls`) : bad('sitemap has no urls');
  for (const loc of locs) {
    const s = await head(loc);
    if (s !== 200) bad(`sitemap url ${loc} -> ${s}`);
  }
  if (!fails.some((f) => f.startsWith('sitemap url'))) ok('all sitemap urls 200');

  // home
  const home = await get(`${BASE}/`);
  const hTitle = meta(home.text, /<title[^>]*>([^<]*)<\/title>/i);
  const hDesc = meta(home.text, /<meta name="description" content="([^"]*)"/i);
  const hCanon = meta(home.text, /<link rel="canonical" href="([^"]+)"/i);
  const hOg = meta(home.text, /<meta property="og:title" content="([^"]*)"/i);
  hTitle ? ok('home title') : bad('home missing title');
  hDesc ? ok('home description') : bad('home missing description');
  hCanon ? ok('home canonical') : bad('home missing canonical');
  hOg ? ok('home og:title') : bad('home missing og:title');

  // dead references
  for (const dead of ['/og-image.png']) {
    home.text.includes(dead) ? bad(`home still references ${dead}`) : ok(`no ref to ${dead}`);
  }

  // broken images on home
  const homeAssets = collectAssetUrls(home.text);
  let homeBroken = 0;
  for (const u of homeAssets) { if ((await head(u)) !== 200) { homeBroken++; bad(`home asset 404: ${u}`); } }
  if (!homeBroken && homeAssets.length) ok(`all ${homeAssets.length} home assets 200`);

  // noindex pages (accept noindex meta OR redirect to login as protected)
  for (const p of ['/dashboard', '/cart']) {
    const r = await get(`${BASE}${p}`);
    const hasNoindex = /name="robots"[^>]*content="[^"]*noindex/i.test(r.text) || r.headers.get('x-robots-tag')?.includes('noindex');
    const redirectedToLogin = r.url && new URL(r.url).pathname === '/login';
    hasNoindex || redirectedToLogin
      ? ok(`${p} noindex`)
      : bad(`${p} missing noindex`);
  }

  // json-ld on home
  const lds = extractLd(home.text);
  lds.length ? ok(`${lds.length} json-ld block(s) on home`) : bad('no json-ld on home');
  for (const [i, l] of lds.entries()) {
    try { JSON.parse(l); } catch { bad(`json-ld block ${i} does not parse`); }
  }

  // product page
  const firstProduct = locs.find((l) => l.includes('/product/'));
  if (firstProduct) {
    const p = await get(firstProduct);
    p.status === 200 ? ok(`product page 200: ${firstProduct}`) : bad(`product page ${p.status}: ${firstProduct}`);
    meta(p.text, /<title[^>]*>([^<]*)<\/title>/i) ? ok('product title') : bad('product missing title');
    meta(p.text, /<link rel="canonical" href="([^"]+)"/i) ? ok('product canonical') : bad('product missing canonical');
    /"@type"\s*:\s*"Product"/.test(p.text) ? ok('product schema present') : bad('product schema missing');
    /"@type"\s*:\s*"(AggregateOffer|Offer)"/.test(p.text) ? ok('offer schema present') : bad('offer schema missing');

    // broken images on product
    const prodAssets = collectAssetUrls(p.text);
    let prodBroken = 0;
    for (const u of prodAssets) { if ((await head(u)) !== 200) { prodBroken++; bad(`product asset 404: ${u}`); } }
    if (!prodBroken && prodAssets.length) ok(`all ${prodAssets.length} product assets 200`);

    // product json-ld parses
    const pLds = extractLd(p.text);
    for (const [i, l] of pLds.entries()) {
      try { JSON.parse(l); } catch { bad(`product json-ld block ${i} does not parse`); }
    }
  } else {
    // Product URLs may be absent if Supabase query returned empty (e.g. CI with placeholder creds)
    ok('no product urls in sitemap (dynamic, needs Supabase)');
  }

  // llms.txt
  const llms = await head(`${BASE}/llms.txt`);
  llms === 200 ? ok('llms.txt 200') : bad(`llms.txt ${llms}`);

  // Results
  console.log('PASS');
  for (const p of passes) console.log('  + ' + p);
  if (fails.length) {
    console.log('\nFAIL');
    for (const f of fails) console.log('  - ' + f);
    process.exit(1);
  }
  console.log('\nAll checks passed.');
})();
