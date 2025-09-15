import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      source: {
        entry: {
          index: ['./src/**'],
        },
        tsconfigPath: './tsconfig.lib.json',

      },
      bundle: false,
      dts: true,
      format: 'esm',
      syntax: 'es2015',
    },
    {
      source: {
        entry: {
          index: './src/index.ts',
        },
      },
      bundle: true,
      dts: false,
      format: 'cjs',
    },
  ],
  plugins: [pluginReact()],
  output: {
    target: 'web',
  },
})
