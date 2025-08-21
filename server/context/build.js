const { esbuild } = require('@chat/config')
esbuild({
    entryPoints: ['src/index.ts'],
    format: 'cjs',
    banner: {},
    splitting: false
})
