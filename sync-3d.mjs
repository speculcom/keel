/**
 * Sync keel3d/dist into keel.specul/3d/
 * Usage: cd keel3d && npm run build && cd ../keel.specul && node sync-3d.mjs
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'keel3d', 'dist');
const out = path.join(here, '3d');

if (!existsSync(path.join(dist, 'hub.html'))) {
  console.error('Missing keel3d/dist/hub.html - run npm run build in keel3d first');
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(dist, out, { recursive: true });
console.log('synced', dist, '->', out);
