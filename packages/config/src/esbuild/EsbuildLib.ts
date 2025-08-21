import { build, BuildOptions } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import postCssPlugin from 'esbuild-style-plugin'
import tailwindcss from 'tailwindcss'
import autoPrefixer from 'autoprefixer'

export const esbuild = (params: BuildOptions) => {
    return build({
        entryPoints: ['src/index.tsx', 'src/main.css'],
        bundle: true,
        sourcemap: true,
        outdir: './dist',
        plugins: [
            nodeExternalsPlugin(),
            postCssPlugin({
                postcss: {
                    plugins: [tailwindcss, autoPrefixer],
                },
            }),
        ], 
        format: 'esm',
        splitting: true,
        minify: false,
        platform: "node",
        banner: {
            js: `import 'react'`
        },
        loader: {
            '.ts': 'ts',
            '.tsx': 'tsx',
            '.css': 'css',
            '.png': 'base64',
            '.jpg': 'base64',
            '.gif': 'base64',
            '.svg': 'base64',
            '.node': 'file',
            '.docx': 'file',
            '.doc': 'file',
            '.xlsx': 'file',
        },
        ...params
    }).catch(() => process.exit(1))
}
