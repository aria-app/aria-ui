/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-var-requires */
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser({
      compress: {
        keep_infinity: true,
        pure_getters: true,
        passes: 10,
      },
      ecma: 5,
      output: { comments: false },
      sourcemap: true,
      warnings: true,
    }),
  ],
};
