import * as esbuild from 'esbuild';
import { addJsExtensions } from './util/addJsExtensions';

const start = performance.now();

await esbuild.build({
  entryPoints: ['src/**/*'],
  outdir: 'dist',
  platform: 'node',
  loader: {
    '.sql': 'copy',
    '.json': 'copy',
  },
  target: ['node20.16'],
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
});

addJsExtensions('dist');

console.log(`Built in ${Math.round(performance.now() - start)}ms`);
