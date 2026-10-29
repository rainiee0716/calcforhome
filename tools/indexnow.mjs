#!/usr/bin/env node
// Submit URLs to IndexNow (Bing, Yandex, Seznam and the other engines that
// share the endpoint). Google does not use IndexNow, so this is a Bing/others
// speed-up, not a replacement for the sitemap.
//
// The key file has to be live at https://<host>/<key>.txt before the first
// submission, or the endpoint answers 403.
//
// Usage:
//   node tools/indexnow.mjs                       # every URL in the sitemap
//   node tools/indexnow.mjs /frost-depth-by-state/  # just these paths
//
// Find the key with: ls public/*.txt

const HOST = 'www.calcforhome.com';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

async function findKey() {
  const files = await readdir(join(root, 'public'));
  const candidate = files.find((name) => /^[a-f0-9]{32}\.txt$/i.test(name));
  if (!candidate) {
    throw new Error('No 32-hex .txt key file in public/. Create one first.');
  }
  const key = (await readFile(join(root, 'public', candidate), 'utf8')).trim();
  if (key !== candidate.replace(/\.txt$/, '')) {
    throw new Error(`Key file ${candidate} does not contain its own name.`);
  }
  return key;
}

async function urlsFromSitemap() {
  const xml = await readFile(join(root, 'dist', 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const key = await findKey();
const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((path) => new URL(path, ORIGIN).href)
  : await urlsFromSitemap();

console.log(`Submitting ${urlList.length} URL(s) with key ${key}`);
for (const url of urlList) console.log(`  ${url}`);

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted but key still being validated, 403 = bad key.
console.log(`HTTP ${response.status} ${response.statusText}`);
if (response.status >= 400) {
  console.error((await response.text()).slice(0, 500));
  process.exit(1);
}
