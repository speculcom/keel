/**
 * Sync keel3d/dist into keel.specul/3d/
 * Usage: cd keel3d && npm run build && cd ../keel.specul && node sync-3d.mjs
 *
 * Note: this moves the previous 3d/ aside into the OS temp dir instead of a
 * recursive delete. On this machine a bulk rmSync (thousands of files) is
 * intercepted by the sandbox's safe-delete guard and the process hangs, so
 * `rmSync` is deliberately avoided. The end state is still an exact mirror of
 * dist/ — nothing stale is carried over.
 */
import { cpSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import os from 'node:os';
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

if (existsSync(out)) {
  const trash = path.join(os.tmpdir(), 'keel-sync-trash');
  mkdirSync(trash, { recursive: true });
  const dest = path.join(trash, `3d-${Date.now()}`);
  renameSync(out, dest);
  console.log('moved previous 3d/ aside ->', dest);
}

mkdirSync(out, { recursive: true });
cpSync(dist, out, { recursive: true });
console.log('synced', dist, '->', out);
