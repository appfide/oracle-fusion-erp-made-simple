#!/usr/bin/env node
/**
 * Checks that every source URL cited in lessons still responds.
 *   node scripts/check-links.mjs
 * Run it before releases. (Not run in CI: some sites rate-limit bots.)
 */
import { pathToFileURL, fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { curriculum } = await import(pathToFileURL(path.join(root, 'content/curriculum.js')).href);

const urls = new Map();
for (const m of curriculum) {
  for (const l of m.lessons) {
    const file = path.join(root, 'content/lessons', m.id, `${l.slug}.js`);
    if (!existsSync(file)) continue;
    const lesson = (await import(pathToFileURL(file).href)).default;
    for (const s of lesson.sources || []) {
      if (!urls.has(s.url)) urls.set(s.url, []);
      urls.get(s.url).push(`${m.id}/${l.slug}`);
    }
  }
}

let bad = 0;
const list = [...urls.keys()];
const CONCURRENCY = 6;
let i = 0;
async function worker() {
  while (i < list.length) {
    const url = list[i++];
    let status = 0;
    try {
      const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (link-check; ERP Made Simple)' }, signal: AbortSignal.timeout(30000) });
      status = res.status;
    } catch (e) {
      status = `ERR ${e.cause?.code || e.name}`;
    }
    if (status !== 200) { bad++; console.log(`✖ ${status}  ${url}\n    used in: ${urls.get(url).join(', ')}`); }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`\nChecked ${list.length} unique URLs: ${list.length - bad} OK, ${bad} problem(s).`);
process.exit(bad ? 1 : 0);
