#!/usr/bin/env node
/* Read-only site inventory. Run from project root: node scripts/site-inventory.mjs */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const skip = new Set(['.git', '.next', '.turbo', '.cache', 'node_modules', 'dist', 'build', 'coverage', '.vercel', '.pnpm-store']);
const includeExt = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css', '.html', '.xml', '.webmanifest']);
const files = [];
const maxBytes = 600_000;

async function walk(dir, depth = 0) {
  if (depth > 16) return;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.env') || skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) await walk(full, depth + 1);
    else if (entry.isFile() && includeExt.has(path.extname(entry.name))) files.push(full);
  }
}

function count(source, re) { return [...source.matchAll(re)].length; }
function toRelative(full) { return path.relative(root, full).replaceAll('\\', '/'); }
function routeFromFile(file) {
  const normalized = file.replace(/^src\//, '');
  const appMatch = normalized.match(/^app\/(.*)\/(page|route)\.(tsx|ts|jsx|js)$/);
  if (appMatch) return '/' + appMatch[1].split('/').filter(segment => !/^\(.*\)$/.test(segment) && !segment.startsWith('@')).join('/');
  if (/^app\/(page|route)\.(tsx|ts|jsx|js)$/.test(normalized)) return '/';
  const pagesMatch = normalized.match(/^pages\/(.*)\.(tsx|ts|jsx|js)$/);
  if (pagesMatch) return '/' + pagesMatch[1].replace(/\/index$/, '');
  return null;
}

await walk(root);
const report = {
  root, inspectedTextFiles: 0, pages: [],
  brandingHits: [], wideMinimums: [],
  indicative: { largePageFiles: [], clientBoundaries: 0, cardMentions: 0, longJsxParagraphs: 0 },
};
for (const full of files) {
  const relative = toRelative(full);
  if (/^(docs\/|\.agents\/|scripts\/)/.test(relative)) continue;
  const info = await stat(full);
  if (info.size > maxBytes) continue;
  const source = await readFile(full, 'utf8');
  report.inspectedTextFiles += 1;
  const route = routeFromFile(relative);
  if (route !== null) {
    report.pages.push({ path: route || '/', file: relative, lines: source.split('\n').length });
    if (source.split('\n').length > 280) report.indicative.largePageFiles.push(relative);
  }
  if (relative.endsWith('.tsx') || relative.endsWith('.jsx')) {
    report.indicative.cardMentions += count(source, /\bCard(?:Header|Content|Title|Description|Footer)?\b/g);
    report.indicative.longJsxParagraphs += count(source, /<p\b[^>]*>.{250,}<\/p>/gs);
    if (/^\s*['"]use client['"]/.test(source)) report.indicative.clientBoundaries += 1;
  }
  const hits = count(source, /\bBMI\b/gi);
  if (hits) report.brandingHits.push({ file: relative, occurrences: hits });
  if (/min-w-\[\d+px\]|min-w-160/.test(source)) report.wideMinimums.push(relative);
}
report.pages.sort((a, b) => a.path.localeCompare(b.path) || a.file.localeCompare(b.file));
report.brandingHits.sort((a,b) => b.occurrences - a.occurrences);
console.log(JSON.stringify(report, null, 2));
