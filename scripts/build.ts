import * as esbuild from 'esbuild';
import { addJsExtensions } from './util/addJsExtensions';
import fs from 'fs/promises';

const start = performance.now();

await fs.rm('dist', { recursive: true, force: true });

await esbuild.build({
  entryPoints: ['src/**/*'],
  outdir: 'dist',
  platform: 'node',
  loader: {
    '.sql': 'copy',
    '.json': 'copy',
  },
  target: ['node20.16'],
  // minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
});

addJsExtensions('dist');

console.log(`Built in ${Math.round(performance.now() - start)}ms`);
