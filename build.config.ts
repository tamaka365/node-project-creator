import path from 'node:path';
import url from 'node:url';

import { defineBuildConfig } from 'unbuild';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineBuildConfig({
  entries: ['./src/main'],
  clean: true,
  alias: { src: path.resolve(__dirname, './src') },
  rollup: {
    //     inlineDependencies: true,
    esbuild: {
      target: 'node18',
      minify: true,
    },
  },
});
