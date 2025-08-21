const { build } = require('esbuild')

build({
    entryPoints: ['src/server.ts'],
    bundle: true,
    sourcemap: true,
    outdir: 'build',
    format: 'cjs',
    minify: false,
    platform: "node",
    loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
    },
    external: []
}).catch(() => process.exit(1))
