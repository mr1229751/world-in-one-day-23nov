// The World in One Day — 23 November 2026. An entry for make.fun's
// news-image-20261123 bounty ("Sum up 23 November's world news in one
// image"), Node 22, standard library only.
//
// The deliverable is the entry.png shipped beside this file: one
// 1024x1024 front page summing up Monday 23 November 2026. This program
// places that exact file at $MAKEFUN_OUTPUT_DIR/entry.png when run
// locally, or /output/entry.png in the grader's container. The bytes are
// moved as-is — no decode, no re-encode — so every run writes identical
// output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, 'entry.png'));
const target = join(outDir, 'entry.png');
writeFileSync(target, bytes);

// Self-check: the grader runs this program twice and demands identical
// bytes, so fail loudly here instead of silently writing a short file.
const written = readFileSync(target);
if (!written.equals(bytes)) {
  throw new Error(`entry.png write mismatch: wrote ${written.length} of ${bytes.length} bytes`);
}
