import path from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

const resolveExts = ['', '/index.mjs', '/index.js', '.mjs', '.js'];

/**
 * Rewrite relative js/mjs file imports to have a file extension
 *
 * See this issue
 * https://github.com/evanw/esbuild/issues/622
 * This is inspired by a combination of that thread and
 * https://github.com/unjs/mkdist/blob/main/src/make.ts
 */
export function addJsExtensions(distDir: string) {
  const outPaths = readdirSync(distDir, { recursive: true })
    .filter((p) => {
      if (p instanceof Buffer) return false;
      return p.endsWith('.js') || p.endsWith('.mjs');
    })
    .map((p) => 'dist/' + p);

  /** If using tsconfig paths this needs to be updated */
  function isRelative(path: string) {
    return path.startsWith('.');
  }

  function resolveId(from: string, id = '') {
    if (!isRelative(id)) return id;
    for (const extension of resolveExts) {
      const resolvedPath = path.join(path.dirname(from), id + extension);
      if (outPaths.includes(resolvedPath)) return id + extension;
    }
    return id;
  }

  for (const outPath of outPaths) {
    const contents = readFileSync(outPath, 'utf8')
      // Resolve import statements
      .replace(
        /(import|export)(\s+(?:.+|{[\s\w,]+})\s+from\s+["'])(.*)(["'])/g,
        (_, type, head, id, tail) => type + head + resolveId(outPath, id) + tail
      )
      // Resolve dynamic import
      .replace(
        /import\((["'])(.*)(["'])\)/g,
        (_, head, id, tail) =>
          'import(' + head + resolveId(outPath, id) + tail + ')'
      );

    writeFileSync(outPath, contents);
  }
}
